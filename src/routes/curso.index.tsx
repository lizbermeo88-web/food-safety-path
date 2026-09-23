import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site/Shell";
import { useAuth } from "@/hooks/useAuth";
import { buildState, useProgress } from "@/lib/progress";
import { modules, toneClasses } from "@/data/course";

export const Route = createFileRoute("/curso/")({
  head: () => ({
    meta: [
      { title: "Tus 6 módulos | Curso de Manipulador de Alimentos" },
      {
        name: "description",
        content:
          "Mapa de aprendizaje del curso de manipulador de alimentos: seis módulos con teoría y test, con tu progreso guardado.",
      },
      { property: "og:title", content: "Mapa de aprendizaje del curso" },
      { property: "og:description", content: "Seis módulos con teoría y evaluación, retoma donde lo dejaste." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Curso,
});

function Curso() {
  const { user, loading, fullName } = useAuth();
  const { data: progress, isLoading } = useProgress(user?.id);
  const state = buildState(progress);

  if (!loading && !user) {
    return (
      <Page>
        <section className="relative mx-auto max-w-md px-6 pt-16 pb-24 text-center">
          <div className="glass-strong rounded-[2rem] p-8">
            <h1 className="text-2xl font-bold">Entra para seguir el curso</h1>
            <p className="mt-2 text-sm text-ink-soft">Así guardamos tu progreso y tu certificado.</p>
            <Link
              to="/acceso"
              className="mt-6 inline-block rounded-full bg-mint-deep px-7 py-3 font-bold text-primary-foreground"
            >
              Acceder
            </Link>
          </div>
        </section>
      </Page>
    );
  }

  return (
    <Page>
      <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tu mapa de aprendizaje</h1>
            <p className="mt-1 text-ink-soft">
              {fullName ? `${fullName} · ` : ""}
              {state.passedCount} de {modules.length} módulos aprobados
            </p>
          </div>
          <span className="glass rounded-full px-3 py-1.5 text-sm font-bold">
            Progreso global {state.globalPercentage}%
          </span>
        </div>

        <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-card/60">
          <div
            className="h-full rounded-full bg-mint-deep transition-all duration-700"
            style={{ width: `${state.globalPercentage}%` }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {state.items.map(({ module, unlocked, passed, percentage, progress: p }) => {
            const tone = toneClasses[module.tone];
            const inProgress = unlocked && !passed && ((p?.attempts ?? 0) > 0 || (p?.last_section ?? 0) > 0);
            return (
              <div
                key={module.id}
                className={`rounded-3xl p-6 backdrop-blur-md outline-1 -outline-offset-1 outline-card/70 ${
                  unlocked ? `${tone.card} shadow-md` : "bg-card/50"
                } ${inProgress ? "ring-4 ring-lav/40" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-display text-2xl font-bold ${unlocked ? tone.num : "text-ink-soft/40"}`}>
                    {String(module.id).padStart(2, "0")}
                  </span>
                  {passed ? (
                    <span className={`rounded-full ${tone.badge} px-2 py-1 text-xs font-bold text-primary-foreground`}>
                      ✓ Aprobado {percentage}%
                    </span>
                  ) : unlocked ? (
                    <span className="rounded-full bg-lav-deep px-2 py-1 text-xs font-bold text-accent-foreground">
                      {inProgress ? "En curso" : "Disponible"}
                    </span>
                  ) : (
                    <span className="rounded-full bg-ink/5 px-2 py-1 text-xs font-bold text-ink-soft">Bloqueado</span>
                  )}
                </div>

                <img
                  src={module.image}
                  alt={module.title}
                  loading="lazy"
                  width={944}
                  height={704}
                  className={`mt-4 aspect-[4/3] w-full rounded-2xl object-cover ${unlocked ? "" : "opacity-50 grayscale"}`}
                />

                <h2 className="mt-4 font-display text-lg font-semibold">{module.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{module.summary}</p>

                <div className="mt-4">
                  {unlocked ? (
                    <Link
                      to="/curso/$moduleId"
                      params={{ moduleId: String(module.id) }}
                      className="inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-card"
                    >
                      {passed ? "Repasar" : inProgress ? "Continuar" : "Empezar"}
                    </Link>
                  ) : (
                    <p className="text-xs font-bold text-ink-soft">
                      Aprueba el módulo {module.id - 1} con un 80% para desbloquearlo
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-strong mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] p-8">
          <div>
            <h2 className="font-display text-xl font-bold">Certificado final</h2>
            <p className="mt-1 text-sm text-ink-soft">
              {state.allPassed
                ? "¡Has aprobado los 6 módulos! Ya puedes emitir tu certificado."
                : `Te quedan ${modules.length - state.passedCount} módulos para conseguirlo.`}
            </p>
          </div>
          <Link
            to="/certificado"
            className={`rounded-full px-7 py-3 font-bold ${
              state.allPassed
                ? "bg-mint-deep text-primary-foreground shadow-lg shadow-mint-deep/30"
                : "bg-card/70 text-ink-soft"
            }`}
          >
            Ir al certificado
          </Link>
        </div>

        {isLoading && <p className="mt-6 text-sm text-ink-soft">Cargando tu progreso…</p>}
      </section>
    </Page>
  );
}
