import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/site/Shell";
import { useAuth } from "@/hooks/useAuth";
import { buildState, useProgress, useSaveSection } from "@/lib/progress";
import { getModule, toneClasses, type Block } from "@/data/course";

export const Route = createFileRoute("/curso/$moduleId/")({
  head: ({ params }) => {
    const mod = getModule(Number(params.moduleId));
    const title = mod ? `Módulo ${mod.id}: ${mod.title}` : "Módulo del curso";
    const description = mod?.summary ?? "Contenido teórico del curso de manipulador de alimentos.";
    return {
      meta: [
        { title: `${title} | Manipulador de Alimentos` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: Teoria,
});

function Bloque({ block }: { block: Block }) {
  if (block.kind === "p") return <p className="mt-4 leading-relaxed text-ink-soft">{block.text}</p>;
  if (block.kind === "list")
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-ink-soft">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-mint-deep" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  if (block.kind === "note")
    return (
      <div className="mt-5 rounded-2xl bg-butter/60 p-4 text-sm outline-1 -outline-offset-1 outline-ink/5">
        <p className="font-bold">{block.title}</p>
        <p className="mt-1 leading-relaxed text-ink-soft">{block.text}</p>
      </div>
    );
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl bg-card/70 p-1">
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            {block.head.map((h) => (
              <th key={h} className="px-3 py-2 font-display font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top text-ink-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Teoria() {
  const { moduleId } = Route.useParams();
  const navigate = useNavigate();
  const mod = getModule(Number(moduleId));
  const { user, loading } = useAuth();
  const { data: progress } = useProgress(user?.id);
  const state = buildState(progress);
  const saveSection = useSaveSection(user?.id);
  const [current, setCurrent] = useState(0);

  const entry = state.items.find((i) => i.module.id === Number(moduleId));

  useEffect(() => {
    if (entry?.progress?.last_section) setCurrent(Math.min(entry.progress.last_section, (mod?.sections.length ?? 1) - 1));
  }, [entry?.progress?.last_section, mod?.sections.length]);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/acceso" });
  }, [loading, user, navigate]);

  if (!mod) {
    return (
      <Page>
        <section className="mx-auto max-w-md px-6 py-24 text-center">
          <h1 className="text-2xl font-bold">Ese módulo no existe</h1>
          <Link to="/curso" className="mt-4 inline-block font-bold text-lav-deep">
            Volver a los módulos
          </Link>
        </section>
      </Page>
    );
  }

  if (entry && !entry.unlocked) {
    return (
      <Page>
        <section className="mx-auto max-w-md px-6 py-24 text-center">
          <div className="glass-strong rounded-[2rem] p-8">
            <h1 className="text-2xl font-bold">Módulo bloqueado</h1>
            <p className="mt-2 text-sm text-ink-soft">
              Necesitas aprobar el módulo {mod.id - 1} con al menos un 80% para acceder.
            </p>
            <Link to="/curso" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-bold text-card">
              Volver a los módulos
            </Link>
          </div>
        </section>
      </Page>
    );
  }

  const section = mod.sections[current]!;
  const tone = toneClasses[mod.tone];
  const isLast = current === mod.sections.length - 1;

  function goTo(index: number) {
    setCurrent(index);
    saveSection.mutate({ moduleId: mod.id, section: index });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Page>
      <section className="relative mx-auto grid max-w-6xl gap-6 px-6 pt-10 pb-16 lg:grid-cols-5">
        <aside className="glass h-fit rounded-[2rem] p-6 lg:col-span-2">
          <img
            src={mod.image}
            alt={mod.title}
            loading="lazy"
            width={944}
            height={704}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <p className={`mt-4 rounded-full ${tone.chip} inline-block px-3 py-1 text-xs font-bold`}>
            Módulo {mod.id} · {mod.duration}
          </p>
          <h1 className="mt-3 font-display text-xl font-bold">{mod.title}</h1>

          <p className="mt-6 text-xs font-bold tracking-wider text-ink-soft uppercase">Contenido del módulo</p>
          <ol className="mt-3 space-y-2">
            {mod.sections.map((s, i) => (
              <li key={s.title}>
                <button
                  onClick={() => goTo(i)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold ${
                    i === current ? "bg-card/80 text-ink" : "text-ink-soft hover:bg-card/50"
                  }`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ol>

          <Link
            to="/curso/$moduleId/test"
            params={{ moduleId: String(mod.id) }}
            className="mt-6 block rounded-full bg-lav-deep py-3 text-center font-bold text-accent-foreground"
          >
            Ir al test del módulo
          </Link>
        </aside>

        <article className="glass-strong rounded-[2rem] p-8 shadow-xl shadow-lav/20 lg:col-span-3">
          <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-lav-deep uppercase">
            <span className={`rounded-full ${tone.chip} px-2 py-1`}>Módulo {mod.id}</span>
            <span className="text-ink-soft">
              Apartado {current + 1} de {mod.sections.length}
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold">{section.title}</h2>

          {section.blocks.map((block, i) => (
            <Bloque key={i} block={block} />
          ))}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={() => goTo(Math.max(0, current - 1))}
              disabled={current === 0}
              className="rounded-full bg-card/70 px-5 py-2.5 text-sm font-bold disabled:opacity-40"
            >
              ← Anterior
            </button>
            {isLast ? (
              <Link
                to="/curso/$moduleId/test"
                params={{ moduleId: String(mod.id) }}
                className="rounded-full bg-mint-deep px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-mint-deep/30"
              >
                Hacer el test →
              </Link>
            ) : (
              <button
                onClick={() => goTo(current + 1)}
                className="rounded-full bg-lav-deep px-5 py-2.5 text-sm font-bold text-accent-foreground"
              >
                Siguiente apartado →
              </button>
            )}
          </div>
        </article>
      </section>
    </Page>
  );
}
