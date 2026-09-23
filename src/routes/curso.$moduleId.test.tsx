import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/site/Shell";
import { useAuth } from "@/hooks/useAuth";
import { buildState, useProgress, useSaveAttempt } from "@/lib/progress";
import { getModule, modules, PASS_MARK } from "@/data/course";

export const Route = createFileRoute("/curso/$moduleId/test")({
  head: ({ params }) => {
    const mod = getModule(Number(params.moduleId));
    const title = mod ? `Test del módulo ${mod.id}: ${mod.title}` : "Test de evaluación";
    return {
      meta: [
        { title: `${title} | Manipulador de Alimentos` },
        {
          name: "description",
          content: "Test de evaluación del módulo. Se aprueba con un 80% de aciertos y puede repetirse las veces necesarias.",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: "Evaluación del módulo, repetible hasta aprobar con un 80%." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: Test,
});

function Test() {
  const { moduleId } = Route.useParams();
  const mod = getModule(Number(moduleId));
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { data: progress } = useProgress(user?.id);
  const state = buildState(progress);
  const saveAttempt = useSaveAttempt(user?.id);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<{ percentage: number; passed: boolean } | null>(null);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/acceso" });
  }, [loading, user, navigate]);

  if (!mod) {
    return (
      <Page>
        <section className="mx-auto max-w-md px-6 py-24 text-center">
          <h1 className="text-2xl font-bold">Ese test no existe</h1>
          <Link to="/curso" className="mt-4 inline-block font-bold text-lav-deep">
            Volver a los módulos
          </Link>
        </section>
      </Page>
    );
  }

  const entry = state.items.find((i) => i.module.id === mod.id);
  if (entry && !entry.unlocked) {
    return (
      <Page>
        <section className="mx-auto max-w-md px-6 py-24 text-center">
          <div className="glass-strong rounded-[2rem] p-8">
            <h1 className="text-2xl font-bold">Test bloqueado</h1>
            <p className="mt-2 text-sm text-ink-soft">Aprueba primero el módulo {mod.id - 1}.</p>
            <Link to="/curso" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-bold text-card">
              Volver a los módulos
            </Link>
          </div>
        </section>
      </Page>
    );
  }

  const total = mod.quiz.length;
  const question = mod.quiz[index]!;
  const isFinal = mod.id === modules.length;
  const modId = mod.id;

  function reset() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setDone(false);
    setResult(null);
  }

  function check() {
    if (selected === null) return;
    setChecked(true);
    if (selected === question.correct) setScore((s) => s + 1);
  }

  async function next() {
    const finalScore = score;
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
      return;
    }
    setDone(true);
    const res = await saveAttempt.mutateAsync({ moduleId: modId, score: finalScore, total });
    setResult(res);
  }

  if (done) {
    const percentage = result?.percentage ?? Math.round((score / total) * 100);
    const passed = result?.passed ?? percentage >= PASS_MARK;
    const nextId = mod.id + 1;
    return (
      <Page>
        <section className="relative mx-auto max-w-2xl px-6 pt-12 pb-24">
          <div className="glass-strong rounded-[2rem] p-8 text-center shadow-xl shadow-lav/20 md:p-12">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase ${
                passed ? "bg-mint-deep/10 text-mint-deep" : "bg-destructive/10 text-destructive"
              }`}
            >
              {passed ? "Módulo aprobado" : "No superado"}
            </div>
            <h1 className="mt-5 text-4xl font-bold">{percentage}%</h1>
            <p className="mt-2 text-ink-soft">
              {score} respuestas correctas de {total}. Se aprueba con un {PASS_MARK}%.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              {passed
                ? isFinal
                  ? "Has completado la evaluación final del curso."
                  : `Ya tienes acceso al módulo ${nextId}.`
                : "Puedes repetir el test tantas veces como necesites. Repasa la teoría y vuelve a intentarlo."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={reset} className="glass rounded-full px-7 py-3.5 font-bold">
                Repetir el test
              </button>
              <Link
                to="/curso/$moduleId"
                params={{ moduleId: String(mod.id) }}
                className="rounded-full bg-card/70 px-7 py-3.5 font-bold"
              >
                Repasar la teoría
              </Link>
              {passed && (
                <Link
                  to={isFinal ? "/certificado" : "/curso"}
                  className="rounded-full bg-mint-deep px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30"
                >
                  {isFinal ? "Ver mi certificado" : "Siguiente módulo"}
                </Link>
              )}
            </div>
          </div>
        </section>
      </Page>
    );
  }

  return (
    <Page>
      <section className="relative mx-auto max-w-2xl px-6 pt-10 pb-20">
        <div className="mb-4 flex items-center justify-between text-sm font-bold text-ink-soft">
          <span>
            Módulo {mod.id} {isFinal ? "· Evaluación final" : "· Test de evaluación"}
          </span>
          <span>
            Pregunta {index + 1} de {total}
          </span>
        </div>
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-card/60">
          <div
            className="h-full rounded-full bg-mint-deep transition-all duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>

        <div className="glass-strong rounded-[2rem] p-8 shadow-xl shadow-lav/20">
          <p className="text-xs font-bold tracking-wider text-lav-deep uppercase">
            {question.type === "boolean" ? "Verdadero o falso" : "Opción múltiple"}
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold">{question.question}</h1>

          <div className="mt-6 space-y-2">
            {question.options.map((option, i) => {
              const isCorrect = i === question.correct;
              const isPicked = i === selected;
              let cls = "bg-card/60 outline-1 -outline-offset-1 outline-card/70";
              if (checked && isCorrect) cls = "bg-mint-deep text-primary-foreground";
              else if (checked && isPicked) cls = "bg-destructive/15 text-destructive";
              else if (isPicked) cls = "bg-lav/70 outline-2 -outline-offset-1 outline-lav-deep/40";
              return (
                <button
                  key={i}
                  disabled={checked}
                  onClick={() => setSelected(i)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold ${cls}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {checked && (
            <div
              className={`mt-5 rounded-2xl p-4 text-sm ${
                selected === question.correct ? "bg-mint/60" : "bg-peach/70"
              }`}
            >
              <p className="font-bold">{selected === question.correct ? "¡Correcto!" : "Respuesta incorrecta"}</p>
              <p className="mt-1 text-ink-soft">{question.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-ink-soft">
              Aciertos: {score} / {total}
            </span>
            {checked ? (
              <button
                onClick={() => void next()}
                className="rounded-full bg-ink px-6 py-3 font-bold text-card"
                disabled={saveAttempt.isPending}
              >
                {index + 1 === total ? "Ver resultado" : "Siguiente pregunta →"}
              </button>
            ) : (
              <button
                onClick={check}
                disabled={selected === null}
                className="rounded-full bg-mint-deep px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-mint-deep/30 disabled:opacity-40"
              >
                Comprobar
              </button>
            )}
          </div>
        </div>
      </section>
    </Page>
  );
}
