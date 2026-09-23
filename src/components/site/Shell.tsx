import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Backdrop() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-mint/60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-[-120px] size-[460px] rounded-full bg-peach/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 size-[380px] rounded-full bg-lav/50 blur-3xl" />
    </>
  );
}

export function SiteHeader() {
  const { user, fullName, signOut } = useAuth();

  return (
    <header className="no-print relative mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-10 place-items-center rounded-2xl bg-mint-deep font-display text-lg font-bold text-primary-foreground">
          A
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          Aula<span className="text-mint-deep">Cunqueiro</span>
        </span>
      </Link>

     <nav className="flex items-center gap-4 text-sm font-bold text-ink-soft md:gap-7">
        <Link to="/curso" className="hover:text-ink">
          Módulos
        </Link>
        <Link to="/certificado" className="hover:text-ink">
          Certificado
        </Link>
      </nav>

      {user ? (
        <button
          onClick={() => void signOut()}
          className="glass rounded-full px-5 py-2.5 text-sm font-bold shadow-sm"
          title={fullName}
        >
          Salir
        </button>
      ) : (
        <Link to="/acceso" className="glass rounded-full px-5 py-2.5 text-sm font-bold shadow-sm">
          Acceder
        </Link>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 pb-10 text-sm text-ink-soft md:flex-row">
      <span>Asociación de Empresarios de Hostelería Álvaro Cunqueiro · Formación en higiene alimentaria</span>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-ink">
      <Backdrop />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
