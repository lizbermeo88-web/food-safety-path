import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Page } from "@/components/site/Shell";
import { useAuth } from "@/hooks/useAuth";
import { buildState, useCertificate, useIssueCertificate, useProgress } from "@/lib/progress";
import { ASSOCIATION, modules } from "@/data/course";
import logoCoruna from "@/assets/logo-coruna.jpg";

export const Route = createFileRoute("/certificado")({
  head: () => ({
    meta: [
      { title: "Certificado de Manipulador de Alimentos | Asociación Álvaro Cunqueiro" },
      {
        name: "description",
        content:
          "Certificado de manipulador de alimentos emitido por la Asociación de Empresarios de Hostelería Álvaro Cunqueiro al superar los 6 módulos.",
      },
      { property: "og:title", content: "Certificado de Manipulador de Alimentos" },
      { property: "og:description", content: "Se emite automáticamente al aprobar los seis módulos del curso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Certificado,
});

function Certificado() {
  const { user, loading, fullName } = useAuth();
  const navigate = useNavigate();
  const { data: progress, isLoading } = useProgress(user?.id);
  const { data: certificate, isLoading: loadingCert } = useCertificate(user?.id);
  const issue = useIssueCertificate(user?.id);
  const state = buildState(progress);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/acceso" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (
      state.allPassed &&
      !certificate &&
      !loadingCert &&
      !isLoading &&
      !issue.isPending &&
      !issue.isSuccess &&
      fullName
    ) {
      issue.mutate({ fullName, average: state.average });
    }
  }, [state.allPassed, state.average, certificate, loadingCert, isLoading, issue, fullName]);

  if (!state.allPassed) {
    return (
      <Page>
        <section className="relative mx-auto max-w-2xl px-6 pt-12 pb-24 text-center">
          <div className="glass-strong rounded-[2rem] p-8 md:p-12">
            <h1 className="font-display text-2xl font-bold">Tu certificado todavía no está disponible</h1>
            <p className="mt-3 text-ink-soft">
              Has aprobado {state.passedCount} de {modules.length} módulos. El certificado se emite automáticamente
              cuando superas los seis con al menos un 80%.
            </p>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-card/60">
              <div className="h-full rounded-full bg-mint-deep" style={{ width: `${state.globalPercentage}%` }} />
            </div>
            <Link
              to="/curso"
              className="mt-8 inline-block rounded-full bg-mint-deep px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30"
            >
              Continuar el curso
            </Link>
          </div>
        </section>
      </Page>
    );
  }

  const name = certificate?.full_name || fullName;
  const code = certificate?.code ?? "—";
  const issued = certificate?.issued_at ? new Date(certificate.issued_at) : new Date();
  const average = certificate?.average_percentage ?? state.average;

  return (
    <Page>
      <section className="relative mx-auto max-w-4xl px-6 pt-10 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-card/80 p-8 text-center shadow-2xl shadow-mint-deep/20 outline-1 -outline-offset-1 outline-card backdrop-blur-xl md:p-12">
          <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-mint/50 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-lav/50 blur-2xl" />
          <div className="absolute inset-4 rounded-[1.5rem] outline-2 -outline-offset-2 outline-mint-deep/25" />

          <div className="relative">
            <img
              src={logoCoruna}
              alt="Hostelería A Coruña"
              className="mx-auto h-24 w-auto object-contain"
            />
            <p className="mt-5 text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">{ASSOCIATION}</p>
            <h1 className="mt-4 font-display text-3xl font-bold">Certificado de Manipulador de Alimentos</h1>
            <p className="mt-6 text-sm text-ink-soft">Se certifica que</p>
            <p className="mt-1 font-display text-4xl font-bold">{name}</p>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              ha superado satisfactoriamente el curso de formación en higiene alimentaria para manipuladores de
              alimentos, compuesto por seis módulos con evaluación, con una calificación media de{" "}
              <strong className="text-mint-deep">{average}%</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-end justify-center gap-8 text-xs font-bold text-ink-soft">
              <span>
                Fecha de finalización
                <br />
                <span className="text-ink">{issued.toLocaleDateString("es-ES")}</span>
              </span>
              <span className="grid size-20 place-items-center rounded-full text-[9px] tracking-widest uppercase outline-2 outline-mint-deep/40">
                Sello
                <br />
                oficial
              </span>
              <span>
                Código de registro
                <br />
                <span className="text-ink">{code}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="no-print mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="rounded-full bg-mint-deep px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30"
          >
            Descargar o imprimir
          </button>
          <Link to="/curso" className="glass rounded-full px-7 py-3.5 font-bold">
            Volver a los módulos
          </Link>
        </div>
        {issue.isPending && <p className="mt-4 text-center text-sm text-ink-soft">Emitiendo tu certificado…</p>}
      </section>
    </Page>
  );
}
