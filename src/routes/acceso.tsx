import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

type Mode = "login" | "signup" | "forgot" | "update";

const fieldClass =
  "mt-1 w-full rounded-2xl bg-card/70 px-4 py-3 text-sm font-semibold outline-1 -outline-offset-1 outline-border placeholder:text-ink-soft/60 focus:outline-2 focus:outline-mint-deep";

function Acceso() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { user, recovering, clearRecovery } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (recovering) {
      setMode("update");
      setError(null);
      setMessage("Elige una contraseña nueva para tu cuenta.");
    }
  }, [recovering]);

  useEffect(() => {
    if (user && mode !== "update" && !recovering) void navigate({ to: "/curso" });
  }, [user, mode, recovering, navigate]);

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
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/curso`,
        },
      });
      if (err) setError(traducir(err.message));
      else if (!data.session)
        setMessage("Te hemos enviado un correo para confirmar tu cuenta. Ábrelo y vuelve a entrar.");
    } else if (mode === "forgot") {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) setError(traducir(err.message));
      else
        setMessage(
          "Si ese correo tiene cuenta, te hemos enviado un enlace para cambiar la contraseña. Revisa también el spam.",
        );
    } else if (mode === "update") {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) setError(traducir(err.message));
      else {
        clearRecovery();
        void navigate({ to: "/curso" });
      }
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(traducir(err.message));
    }
    setBusy(false);
  }

  const titulo =
    mode === "signup"
      ? "Crear tu cuenta"
      : mode === "forgot"
        ? "Recuperar contraseña"
        : mode === "update"
          ? "Nueva contraseña"
          : "Entrar al curso";

  const subtitulo =
    mode === "forgot"
      ? "Te enviaremos un correo con un enlace para elegir una contraseña nueva. Tu progreso no se pierde."
      : mode === "update"
        ? "Escribe una contraseña nueva (mínimo 6 caracteres). Después entrarás al curso."
        : `Tu progreso y tu certificado quedan guardados en tu cuenta. Certificado emitido por la ${ASSOCIATION}.`;

  const boton =
    busy
      ? "Un momento…"
      : mode === "signup"
        ? "Crear cuenta"
        : mode === "forgot"
          ? "Enviar enlace"
          : mode === "update"
            ? "Guardar contraseña"
            : "Entrar";

  return (
    <Page>
      <section className="relative mx-auto max-w-md px-6 pt-12 pb-24">
        <div className="glass-strong rounded-[2rem] p-8 shadow-xl shadow-lav/20">
          <h1 className="text-3xl font-bold">{titulo}</h1>
          <p className="mt-2 text-sm text-ink-soft">{subtitulo}</p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <label className="block">
                <span className="text-sm font-bold">Nombre y apellidos</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tal como aparecerá en el certificado"
                  className={fieldClass}
                />
              </label>
            )}
            {mode !== "update" && (
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
            )}
            {(mode === "login" || mode === "signup" || mode === "update") && (
              <label className="block">
                <span className="text-sm font-bold">{mode === "update" ? "Contraseña nueva" : "Contraseña"}</span>
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

          {mode !== "update" && (
            <button
              onClick={() => irA(mode === "login" ? "signup" : "login")}
              className="mt-5 w-full text-sm font-bold text-lav-deep"
            >
              {mode === "signup" ? "Ya tengo cuenta, quiero entrar" : "No tengo cuenta todavía"}
            </button>
          )}
        </div>
      </section>
    </Page>
  );
}

function traducir(msg: string) {
  if (/Invalid login credentials/i.test(msg)) return "El correo o la contraseña no son correctos.";
  if (/already registered/i.test(msg)) return "Ya existe una cuenta con ese correo. Prueba a entrar.";
  if (/Email not confirmed/i.test(msg)) return "Confirma tu correo desde el mensaje que te hemos enviado.";
  if (/Password should be/i.test(msg)) return "La contraseña debe tener al menos 6 caracteres.";
  if (/rate limit/i.test(msg)) return "Has pedido demasiados correos seguidos. Espera un minuto e inténtalo de nuevo.";
  if (/redirect/i.test(msg)) return "Hay que autorizar esta dirección en Supabase (Authentication → URL Configuration).";
  return msg;
}
