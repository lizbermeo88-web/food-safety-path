import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Page } from "@/components/site/Shell";
import { ASSOCIATION } from "@/data/course";

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Acceso al curso | Manipulador de Alimentos" },
      {
        name: "description",
        content: "Entra o crea tu cuenta para seguir el curso de manipulador de alimentos y guardar tu progreso.",
      },
      { property: "og:title", content: "Acceso al curso de Manipulador de Alimentos" },
      { property: "og:description", content: "Entra con tu correo para retomar el curso donde lo dejaste." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Acceso,
});

type Mode = "login" | "signup" | "forgot";

const fieldClass =
  "mt-1 w-full rounded-2xl bg-card/70 px-4 py-3 text-sm font-semibold outline-1 -outline-offset-1 outline-border placeholder:text-ink-soft/60 focus:outline-2 focus:outline-mint-deep";

// Validador matemático de la letra del DNI/NIE de España (Aportado por Grok)
const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
function isValidDniNie(value: string): boolean {
  const v = value.trim().toUpperCase().replace(/[\s-]/g, "");
  const nie = v.replace(/^X/, "0").replace(/^Y/, "1").replace(/^Z/, "2");
  if (!/^\d{8}[A-Z]\$/.test(nie)) return false;
  const num = Number(nie.slice(0, 8));
  return DNI_LETTERS[num % 23] === nie[8];
}

const dniSchema = z
  .string()
  .trim()
  .toUpperCase()
  .refine(isValidDniNie, "Introduce un DNI o NIE válido con su letra correspondiente.");

function Acceso() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { user, recovering } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (recovering) void navigate({ to: "/reset-password" });
  }, [recovering, navigate]);

  useEffect(() => {
    if (user && !recovering) void navigate({ to: "/curso" });
  }, [user, recovering, navigate]);

  function irA(next: Mode) {
    setMode(next);
    setError(null);
    setMessage(null);
    setPassword("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signup") {
      const parsedDni = dniSchema.safeParse(dni);
      if (!parsedDni.success) {
        setError(parsedDni.error.issues[0]?.message ?? "Introduce un DNI o NIE válido.");
        setBusy(false);
        return;
      }
      
      // MODO PREPARADO PARA MYSQL: En desarrollo local simula el éxito
      setMessage("¡Simulación de alta con MySQL correcta! (Esperando integración del Webmaster).");
    } else if (mode === "forgot") {
      setMessage("Si este correo existe en la base de datos de la escuela, se enviará un enlace de recuperación.");
    } else {
      // Simulación de entrada provisional para desarrollo
      void navigate({ to: "/curso" });
    }
    setBusy(false);
  }

  const titulo = mode === "signup" ? "Crear tu cuenta" : mode === "forgot" ? "Recuperar contraseña" : "Entrar al curso";
  const subtitulo =
    mode === "forgot"
      ? "Te enviaremos un correo con un enlace para elegir una contraseña nueva. Tu progreso no se pierde."
      : `Tu progreso y tu certificado quedan guardados en tu cuenta. Certificado emitido por la ${ASSOCIATION}.`;
  const boton = busy ? "Un momento…" : mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Enviar enlace" : "Entrar";

  return (
    <Page>
      <section className="relative mx-auto max-w-md px-6 pt-12 pb-24">
        <div className="glass-strong rounded-[2rem] p-8 shadow-xl shadow-lav/20">
          <h1 className="text-3xl font-bold">{titulo}</h1>
          <p className="mt-2 text-sm text-ink-soft">{subtitulo}</p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <>
                {/* ⚠️ RECUADRO LUMINOSO DE ADVERTENCIA PARA LA DIRECTORA */}
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 shadow-sm leading-relaxed">
                  <p className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                    <span>⚠️</span> ¡ATENCIÓN IMPORTANTE!
                  </p>
                  Introduce tu nombre completo y tu DNI/NIE exactamente como aparecen en tu documento oficial. Estos datos se utilizarán para emitir tu certificado legal y no podrán ser modificados posteriormente.
                </div>

                <label className="block">
                  <span className="text-sm font-bold">Nombre y apellidos</span>
                  <input
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tal como aparecerá en el certificado"
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold">DNI / NIE</span>
                  <input
                    required
                    autoComplete="off"
                    inputMode="text"
                    maxLength={9}
                    value={dni}
                    onChange={(e) => setDni(e.target.value.toUpperCase().replace(/\s|-/g, ""))}
                    placeholder="12345678A o X1234567A"
                    className={fieldClass}
                  />
                </label>
              </>
            )}
            <label className="block">
              <span className="text-sm font-bold">Correo electrónico</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </label>
            {mode !== "forgot" && (
              <label className="block">
                <span className="text-sm font-bold">Contraseña</span>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                />
              </label>
            )}

            {mode === "login" && (
              <button type="button" onClick={() => irA("forgot")} className="text-sm font-bold text-lav-deep">
                He olvidado mi contraseña
              </button>
            )}

            {error && <p className="rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">{error}</p>}
            {message && <p className="rounded-2xl bg-mint/60 p-3 text-sm font-semibold">{message}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-mint-deep py-3 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30 disabled:opacity-60"
            >
              {boton}
            </button>
          </form>

          <button
            onClick={() => irA(mode === "login" ? "signup" : "login")}
            className="mt-5 w-full text-sm font-bold text-lav-deep"
          >
            {mode === "signup"
              ? "Ya tengo cuenta, quiero entrar"
              : mode === "forgot"
                ? "Volver a entrar"
                : "No tengo cuenta todavía"}
          </button>
        </div>
      </section>
    </Page>
  );
}
