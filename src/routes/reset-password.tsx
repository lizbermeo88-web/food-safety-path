import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Page } from "@/components/site/Shell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nueva contraseña | Manipulador de Alimentos" },
      { name: "description", content: "Elige una contraseña nueva para tu cuenta del curso." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Nueva contraseña | Manipulador de Alimentos" },
      { property: "og:description", content: "Elige una contraseña nueva para tu cuenta del curso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

const fieldClass =
  "mt-1 w-full rounded-2xl bg-card/70 px-4 py-3 text-sm font-semibold outline-1 -outline-offset-1 outline-border placeholder:text-ink-soft/60 focus:outline-2 focus:outline-mint-deep";

function esRecuperacion() {
  if (typeof window === "undefined") return false;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const search = new URLSearchParams(window.location.search);
  return (
    hash.get("type") === "recovery" ||
    search.get("type") === "recovery" ||
    hash.has("access_token") ||
    search.has("code")
  );
}

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [valid, setValid] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const llegaDesdeCorreo = esRecuperacion();
    if (llegaDesdeCorreo) setValid(true);

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && llegaDesdeCorreo)) {
        setValid(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setValid((current) => current ?? Boolean(data.session));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => void navigate({ to: "/curso" }), 2000);
    return () => clearTimeout(t);
  }, [done, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden. Escríbelas de nuevo.");
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) {
      setError(traducir(err.message));
      return;
    }
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setDone(true);
  }

  return (
    <Page>
      <section className="relative mx-auto max-w-md px-6 pt-12 pb-24">
        <div className="glass-strong rounded-[2rem] p-8 shadow-xl shadow-lav/20">
          <h1 className="text-3xl font-bold">Nueva contraseña</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Escribe una contraseña nueva para tu cuenta. Después entrarás directamente al curso.
          </p>

          {valid === false && !done ? (
            <div className="mt-6 space-y-4">
              <p className="rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
                Este enlace no es válido o ha caducado. Pide uno nuevo desde la pantalla de acceso.
              </p>
              <button
                onClick={() => void navigate({ to: "/acceso" })}
                className="w-full rounded-full bg-mint-deep py-3 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30"
              >
                Ir a acceso
              </button>
            </div>
          ) : done ? (
            <p className="mt-6 rounded-2xl bg-mint/60 p-3 text-sm font-semibold">
              ¡Contraseña actualizada! Te llevamos al curso…
            </p>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="block">
                <span className="text-sm font-bold">Nueva contraseña</span>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">Confirmar nueva contraseña</span>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={fieldClass}
                />
              </label>

              {error && (
                <p className="rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-sky-deep py-3 font-bold text-primary-foreground shadow-lg shadow-sky-deep/30 disabled:opacity-60"
              >
                {busy ? "Un momento…" : "Actualizar contraseña"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Page>
  );
}

function traducir(msg: string) {
  if (/Password should be/i.test(msg)) return "La contraseña debe tener al menos 6 caracteres.";
  if (/same as the old/i.test(msg)) return "La contraseña nueva debe ser distinta de la anterior.";
  if (/rate limit/i.test(msg)) return "Demasiados intentos seguidos. Espera un minuto e inténtalo de nuevo.";
  return msg;
}
