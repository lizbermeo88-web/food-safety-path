import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site/Shell";
import { useAuth } from "@/hooks/useAuth";
import { buildState, useProgress } from "@/lib/progress";
import { ASSOCIATION, modules } from "@/data/course";
import heroImg from "@/assets/hero-lavado-manos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Curso de Manipulador de Alimentos | Asociación Álvaro Cunqueiro" },
      {
        name: "description",
        content:
          "Curso online de manipulador de alimentos en 6 módulos con test de evaluación y certificado de la Asociación de Empresarios de Hostelería Álvaro Cunqueiro.",
      },
      { property: "og:title", content: "Curso de Manipulador de Alimentos" },
      {
        property: "og:description",
        content: "Seis módulos, evaluación en cada uno y certificado al superarlos todos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { user, loading } = useAuth();
  const { data: progress } = useProgress(user?.id);
  const state = buildState(progress);

  return (
    <Page>
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pt-10 pb-16 lg:grid-cols-2">
        <div>
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider text-lav-deep uppercase">
            <span className="size-2 rounded-full bg-mint-deep" /> Formación en higiene alimentaria
          </div>
          <h1 className="mt-5 text-5xl leading-[1.05] font-bold md:text-6xl">
            Manipulador de <span className="text-mint-deep">Alimentos</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            Aprende las normas de higiene y seguridad alimentaria y obtén tu certificado emitido por la{" "}
            <strong className="text-ink">{ASSOCIATION}</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-ink-soft">
            <span className="rounded-full bg-mint/70 px-3 py-1.5">6 módulos</span>
            <span className="rounded-full bg-sky/70 px-3 py-1.5">Test en cada módulo</span>
            <span className="rounded-full bg-butter/80 px-3 py-1.5">Se aprueba con 80%</span>
            <span className="rounded-full bg-lav/70 px-3 py-1.5">Certificado</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={user ? "/curso" : "/acceso"}
              className="rounded-full bg-mint-deep px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30"
            >
              {loading ? "Cargando…" : user ? "Continuar curso" : "Empezar el curso"}
            </Link>
            <a href="#temario" className="glass rounded-full px-7 py-3.5 font-bold">
              Ver temario
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-[2rem] p-5 shadow-xl shadow-lav/30">
            <div className="overflow-hidden rounded-3xl bg-butter/40">
              <img
                src={heroImg}
                alt="Manipuladora de alimentos lavándose las manos en una cocina profesional"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-display font-semibold">
                  Módulo {state.nextModule.id} · {state.nextModule.title.split(",")[0]}
                </p>
                <p className="text-xs text-ink-soft">
                  {state.passedCount} de {modules.length} módulos aprobados
                </p>
              </div>
              <div className="grid size-12 place-items-center rounded-full bg-mint-deep/10 text-sm font-bold text-mint-deep outline-2 outline-mint-deep/30">
                {state.globalPercentage}%
              </div>
            </div>
          </div>
          <div className="floaty glass absolute top-6 -left-6 rounded-2xl px-4 py-2 text-sm font-bold shadow-md">
            ✓ Test repetible
          </div>
          <div className="floaty-slow absolute -right-4 -bottom-5 rounded-2xl bg-peach/80 px-4 py-2 text-sm font-bold shadow-md backdrop-blur-md">
            ★ Progreso guardado
          </div>
        </div>
      </section>

      <section id="temario" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 pb-24">
        <h2 className="font-display text-3xl font-bold">Temario del curso</h2>
        <p className="mt-2 max-w-xl text-ink-soft">
          Seis módulos con teoría y un test final en cada uno. Necesitas un 80% de aciertos para pasar al siguiente, y
          puedes repetir el test tantas veces como quieras.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <article key={mod.id} className="glass overflow-hidden rounded-[1.75rem] p-4">
              <img
                src={mod.image}
                alt={mod.title}
                loading="lazy"
                width={944}
                height={704}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <p className="mt-4 text-xs font-bold tracking-wider text-lav-deep uppercase">
                Módulo {mod.id} · {mod.duration}
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug font-bold">{mod.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{mod.summary}</p>
            </article>
          ))}
        </div>

        <div className="glass-strong mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] p-7">
          <div>
            <h3 className="font-display text-xl font-bold">Certificado al terminar</h3>
            <p className="mt-1 max-w-lg text-sm text-ink-soft">
              Al aprobar los seis módulos se emite automáticamente tu certificado con tu nombre, la fecha y el código de
              registro de la {ASSOCIATION}.
            </p>
          </div>
          <Link
            to={user ? "/curso" : "/acceso"}
            className="rounded-full bg-ink px-7 py-3.5 font-bold text-card"
          >
            {user ? "Ir a mis módulos" : "Crear mi cuenta"}
          </Link>
        </div>
      </section>
    </Page>
  );
}
