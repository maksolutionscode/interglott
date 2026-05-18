import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eraser,
  Send,
  Trophy,
} from "lucide-react";
import {
  readingTest1,
  READING_TEST_1_ALL_QUESTIONS,
  READING_TEST_1_DURATION_MIN,
  type Choice,
} from "@/data/tcfTef/readingTest1";
import { useProgress } from "@/contexts/UserProgressContext";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "interglott-tcf-reading-test-1";
const PROGRESS_STORAGE_KEY = "interglott-tcf-progress";
const TOTAL_SECONDS = READING_TEST_1_DURATION_MIN * 60;

type State = {
  answers: Record<number, Choice>;
  submitted: boolean;
  startedAt: number | null;
  endedAt: number | null;
};

const defaultState: State = {
  answers: {},
  submitted: false,
  startedAt: null,
  endedAt: null,
};

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return defaultState;
}

function saveState(s: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function fmtTime(secs: number): string {
  const m = Math.max(0, Math.floor(secs / 60));
  const s = Math.max(0, secs % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const TcfTefReadingTest1 = () => {
  const navigate = useNavigate();
  const { addXP } = useProgress();

  const [state, setState] = useState<State>(() => {
    const s = loadState();
    if (!s.startedAt && !s.submitted) s.startedAt = Date.now();
    return s;
  });

  const [now, setNow] = useState(Date.now());
  const xpAwardedRef = useRef(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Timer tick
  useEffect(() => {
    if (state.submitted) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.submitted]);

  const total = READING_TEST_1_ALL_QUESTIONS.length;
  const answeredCount = Object.keys(state.answers).length;

  const elapsed = state.startedAt
    ? Math.floor(((state.endedAt ?? now) - state.startedAt) / 1000)
    : 0;
  const remaining = Math.max(0, TOTAL_SECONDS - elapsed);

  const score = useMemo(() => {
    let correct = 0;
    for (const q of READING_TEST_1_ALL_QUESTIONS) {
      if (state.answers[q.id] === q.answer) correct += 1;
    }
    return correct;
  }, [state.answers]);

  // Auto-submit on time-out
  useEffect(() => {
    if (!state.submitted && state.startedAt && remaining <= 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  // Mark category test 1 complete & award XP once submitted
  useEffect(() => {
    if (state.submitted && !xpAwardedRef.current) {
      xpAwardedRef.current = true;
      try {
        const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : {};
        const reading: number[] = data.reading ?? [];
        if (!reading.includes(1)) {
          data.reading = [...reading, 1];
          localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
        }
      } catch {}
      // Award XP proportional to score
      const xp = Math.round((score / total) * 60);
      if (xp > 0) addXP(xp);
    }
  }, [state.submitted, score, total, addXP]);

  const select = (qId: number, choice: Choice) => {
    if (state.submitted) return;
    setState((s) => ({ ...s, answers: { ...s.answers, [qId]: choice } }));
  };

  const handleClear = () => {
    if (state.submitted) return;
    if (!confirm("Effacer toutes vos réponses ?")) return;
    setState((s) => ({ ...s, answers: {} }));
  };

  const handleSubmit = () => {
    setState((s) => ({ ...s, submitted: true, endedAt: Date.now() }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    const fresh: State = {
      answers: {},
      submitted: false,
      startedAt: Date.now(),
      endedAt: null,
    };
    xpAwardedRef.current = false;
    setState(fresh);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const timeWarning = !state.submitted && remaining <= 60;
  const percent = Math.round((score / total) * 100);

  return (
    <div className="pt-6 pb-12 space-y-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/tcf-tef/reading")}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reading
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
          Written Comprehension Assessment (A2–B1)
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
          Compréhension écrite – Test 1
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Lisez chaque texte. Pour chaque question, choisissez la bonne réponse (A, B, C, ou D).
        </p>
      </motion.div>

      {/* Sticky status bar: timer + counter */}
      <div className="sticky top-2 z-20">
        <div
          className={cn(
            "rounded-2xl border bg-card/95 backdrop-blur p-3 md:p-4 shadow-sm",
            "flex items-center justify-between gap-3",
            timeWarning ? "border-destructive/60" : "border-border",
          )}
        >
          <div
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold",
              timeWarning ? "text-destructive" : "text-foreground",
            )}
          >
            <Clock className="h-4 w-4" />
            {state.submitted ? (
              <span>Terminé</span>
            ) : (
              <>
                <span className="tabular-nums">{fmtTime(remaining)}</span>
                <span className="text-muted-foreground font-normal hidden sm:inline">
                  / {READING_TEST_1_DURATION_MIN}:00
                </span>
              </>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {answeredCount}
            </span>{" "}
            sur {total} répondues
          </div>
        </div>
      </div>

      {/* Score panel after submit */}
      {state.submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-accent/40 bg-card p-5 md:p-6 text-center"
        >
          <Trophy className="h-10 w-10 text-accent mx-auto mb-2" />
          <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Votre score
          </p>
          <p className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
            {score} / {total}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{percent}%</p>
          <button
            onClick={handleRestart}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Recommencer
          </button>
        </motion.div>
      )}

      {/* Sections */}
      <div className="space-y-8">
        {readingTest1.map((section, sIdx) => (
          <div key={`${section.label}-${sIdx}`} className="space-y-4">
            {section.heading && (
              <div className="pt-2">
                <div className="h-px bg-border mb-4" />
                <h2 className="font-display text-lg md:text-xl font-bold text-accent">
                  {section.heading}
                </h2>
              </div>
            )}

            {/* Passage card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {section.label}
              </p>
              {section.title && (
                <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-2 text-sm md:text-[15px] leading-relaxed text-foreground/90">
                {section.passage.map((para, i) => (
                  <p key={i} className="whitespace-pre-wrap">
                    {para}
                  </p>
                ))}
              </div>
              {section.source && (
                <p className="text-xs text-muted-foreground italic mt-3">
                  {section.source}
                </p>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {section.questions.map((q) => {
                const selected = state.answers[q.id];
                const isCorrect = selected === q.answer;
                const qNumberDisplayed =
                  READING_TEST_1_ALL_QUESTIONS.findIndex((x) => x.id === q.id) + 1;
                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Question {qNumberDisplayed} sur {total}
                      </p>
                      {state.submitted && selected !== undefined && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-semibold",
                            isCorrect ? "text-success" : "text-destructive",
                          )}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                          {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      )}
                    </div>

                    <p className="font-display text-base font-bold text-foreground mb-3">
                      {q.prompt}
                    </p>

                    <div role="radiogroup" className="space-y-2">
                      {(["A", "B", "C", "D"] as Choice[]).map((c) => {
                        const isSelected = selected === c;
                        const isAnswer = q.answer === c;
                        const showCorrect = state.submitted && isAnswer;
                        const showIncorrect =
                          state.submitted && isSelected && !isAnswer;
                        return (
                          <button
                            key={c}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            disabled={state.submitted}
                            onClick={() => select(q.id, c)}
                            className={cn(
                              "w-full text-left rounded-xl border px-3 py-2.5 flex items-start gap-3 transition-all",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              !state.submitted &&
                                "hover:border-accent hover:bg-accent/5",
                              isSelected && !state.submitted
                                ? "border-accent bg-accent/10"
                                : "border-border",
                              showCorrect &&
                                "border-success/60 bg-success/10 text-foreground",
                              showIncorrect &&
                                "border-destructive/60 bg-destructive/10 text-foreground",
                              state.submitted && "cursor-default",
                            )}
                          >
                            <span
                              className={cn(
                                "h-6 w-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold",
                                isSelected && !state.submitted
                                  ? "border-accent bg-accent text-accent-foreground"
                                  : "border-border bg-background text-muted-foreground",
                                showCorrect &&
                                  "border-success bg-success text-success-foreground",
                                showIncorrect &&
                                  "border-destructive bg-destructive text-destructive-foreground",
                              )}
                            >
                              {c}
                            </span>
                            <span className="text-sm md:text-[15px] leading-snug pt-0.5">
                              {q.options[c]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {state.submitted && !isCorrect && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        <span className="font-semibold text-success">
                          Bonne réponse : {q.answer}.
                        </span>{" "}
                        {q.options[q.answer]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit / Clear */}
      {!state.submitted ? (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <Eraser className="h-4 w-4" />
            Effacer mes réponses
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Send className="h-4 w-4" />
            Soumettre mes réponses
          </button>
        </div>
      ) : (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
};

export default TcfTefReadingTest1;