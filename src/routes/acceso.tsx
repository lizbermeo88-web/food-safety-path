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

function Acceso() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) void navigate({ to: "/curso" });
  }, [user, navigate]);

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
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(traducir(err.message));
    }
    setBusy(false);
  }

  return (
    <Page>
      <section className="relative mx-auto max-w-md px-6 pt-12 pb-24">
        <div className="glass-strong rounded-[2rem] p-8 shadow-xl shadow-lav/20">
          <h1 className="text-3xl font-bold">{mode === "login" ? "Entrar al curso" : "Crear tu cuenta"}</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Tu progreso y tu certificado quedan guardados en tu cuenta. Certificado emitido por la {ASSOCIATION}.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {mode === "signup" && (
              <label className="block">
                <span className="text-sm font-bold">Nombre y apellidos</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tal como aparecerá en el certificado"
                  className="mt-1 w-full rounded-2xl bg-card/70 px-4 py-3 text-sm font-semibold outline-1 -outline-offset-1 outline-border placeholder:text-ink-soft/60 focus:outline-2 focus:outline-mint-deep"
                />
              </label>
            )}
            <label className="block">
              <span className="text-sm font-bold">Correo electrónico</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-2xl bg-card/70 px-4 py-3 text-sm font-semibold outline-1 -outline-offset-1 outline-border focus:outline-2 focus:outline-mint-deep"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold">Contraseña</span>
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl bg-card/70 px-4 py-3 text-sm font-semibold outline-1 -outline-offset-1 outline-border focus:outline-2 focus:outline-mint-deep"
              />
            </label>

            {error && <p className="rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">{error}</p>}
            {message && <p className="rounded-2xl bg-mint/60 p-3 text-sm font-semibold">{message}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-mint-deep py-3 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30 disabled:opacity-60"
            >
              {busy ? "Un momento…" : mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
              setMessage(null);
            }}
            className="mt-5 w-full text-sm font-bold text-lav-deep"
          >
            {mode === "login" ? "No tengo cuenta todavía" : "Ya tengo cuenta, quiero entrar"}
          </button>
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
  return msg;
}
