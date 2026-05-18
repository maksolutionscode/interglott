import { useParams, useNavigate } from "react-router-dom";
import { getLessonByIdForLanguage } from "@/data/lessonsByLanguage";
import { useProgress } from "@/contexts/UserProgressContext";
import { useCredits } from "@/contexts/CreditsContext";
import { useGameAudio } from "@/hooks/useGameAudio";
import { useVoiceSettings } from "@/hooks/useVoiceSettings";
import { useVoiceSynthesis } from "@/hooks/useVoiceSynthesis";
import { calculateXP } from "@/lib/gamification";
import { buildPronunciationFeedback } from "@/lib/voice/pronunciation";
import { getVoiceLanguage } from "@/lib/voice/language";
import type { PronunciationFeedback } from "@/lib/voice/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { OutOfCreditsModal } from "@/components/OutOfCreditsModal";
import { PronunciationFeedbackCard } from "@/components/voice/PronunciationFeedbackCard";
import { VoiceButton } from "@/components/voice/VoiceButton";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXP, completeLesson, streak, completedLessons, learningLanguage } = useProgress();
  const { canAfford, spendCredits } = useCredits();
  const audio = useGameAudio();
  const { settings } = useVoiceSettings();
  const lesson = getLessonByIdForLanguage(learningLanguage, id || "");
  const voiceLanguage = getVoiceLanguage(learningLanguage);
  const voice = useVoiceSynthesis({
    language: voiceLanguage,
    mode: "lesson",
    settings,
    realtimeConfig: {
      learningLanguage,
      level: lesson?.level ?? "beginner",
      tutorInstructions: `Pronounce each lesson option naturally and clearly in ${voiceLanguage}. Only say the provided option text.`,
    },
  });

  const [currentEx, setCurrentEx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [creditsDeducted, setCreditsDeducted] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<PronunciationFeedback | null>(null);
  const [activeVoiceTarget, setActiveVoiceTarget] = useState<string | null>(null);
  const exercise = lesson?.exercises[currentEx];
  const backUrl = lesson ? `/lessons?level=${lesson.level}` : "/lessons";

  if (!lesson || !exercise) {
    return (
      <div className="pt-6 text-center">
        <p className="text-muted-foreground">Lesson not found</p>
        <Button variant="ghost" onClick={() => navigate("/lessons")} className="mt-4">Back to Lessons</Button>
      </div>
    );
  }

  const isAlreadyCompleted = completedLessons.includes(lesson.id);

  const speakText = async (target: string, text: string) => {
    setActiveVoiceTarget(target);
    try {
      await voice.speak(text);
    } finally {
      setActiveVoiceTarget((currentTarget) =>
        currentTarget === target ? null : currentTarget
      );
    }
  };

  const checkAnswer = () => {
    // Deduct credits on first answer
    if (!creditsDeducted) {
      if (!canAfford("lesson")) {
        setShowCreditsModal(true);
        return;
      }
      spendCredits("lesson");
      setCreditsDeducted(true);
    }
    const userAnswer = exercise.type === "fill-blank" ? inputVal.trim() : selected;
    const isCorrect = userAnswer?.toLowerCase() === exercise.correctAnswer.toLowerCase();
    setCorrect(isCorrect);
    setAnswered(true);
    setPronunciationFeedback(
      exercise.type === "fill-blank" && inputVal.trim()
        ? buildPronunciationFeedback(exercise.correctAnswer, inputVal.trim())
        : null
    );
    if (isCorrect) {
      setScore((s) => s + 1);
      audio.onCorrectAnswer();
    } else {
      audio.onIncorrectAnswer();
    }
  };

  const next = () => {
    if (currentEx < lesson.exercises.length - 1) {
      setCurrentEx((c) => c + 1);
      setSelected(null);
      setInputVal("");
      setAnswered(false);
      setPronunciationFeedback(null);
      setActiveVoiceTarget(null);
    } else {
      setFinished(true);
      audio.onLessonComplete();
      if (!isAlreadyCompleted) {
        const xp = calculateXP(lesson.xpReward, streak);
        addXP(xp);
        completeLesson(lesson.id);
        // Small delay for XP sound to layer nicely
        setTimeout(() => audio.onXPReward(), 400);
      }
    }
  };

  if (finished) {
    const xp = calculateXP(lesson.xpReward, streak);
    return (
      <div className="pt-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <Trophy className="h-16 w-16 text-xp mx-auto mb-4" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Lesson Complete!</h2>
        <p className="text-muted-foreground mb-1">
          Score: {score}/{lesson.exercises.length}
        </p>
        {!isAlreadyCompleted && <p className="text-xp font-semibold text-lg">+{xp} XP earned!</p>}
        {isAlreadyCompleted && <p className="text-sm text-muted-foreground">Already completed — no XP awarded</p>}
         <Button
           onClick={() => navigate(backUrl)}
          className="gradient-purple border-0 text-foreground mt-6 rounded-xl"
        >
          Back to Lessons
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(backUrl)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-foreground">{lesson.icon} {lesson.title}</h1>
          <p className="text-xs text-muted-foreground">{lesson.titleFr}</p>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentEx + 1}/{lesson.exercises.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-xp rounded-full"
          animate={{ width: `${((currentEx + (answered ? 1 : 0)) / lesson.exercises.length) * 100}%` }}
        />
      </div>

      {/* Exercise */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass-card rounded-2xl p-6 space-y-5"
        >
          <p className="font-display font-semibold text-foreground text-lg">{exercise.question}</p>

          {exercise.type === "multiple-choice" && exercise.options && (
            <div className="space-y-2">
              {exercise.options.map((opt) => (
                <div key={opt} className="flex items-stretch gap-2">
                  <button
                    disabled={answered}
                    onClick={() => setSelected(opt)}
                    className={cn(
                      "min-h-12 flex-1 text-left px-4 py-3 rounded-xl border transition-all text-sm",
                      !answered && selected === opt && "border-primary bg-primary/10 text-foreground",
                      !answered && selected !== opt && "border-border bg-secondary/30 text-foreground hover:border-primary/50",
                      answered && opt.toLowerCase() === exercise.correctAnswer.toLowerCase() && "border-success bg-success/10 text-success",
                      answered && selected === opt && opt.toLowerCase() !== exercise.correctAnswer.toLowerCase() && "border-destructive bg-destructive/10 text-destructive"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{opt}</span>
                      {answered && opt.toLowerCase() === exercise.correctAnswer.toLowerCase() && <Check className="h-4 w-4 shrink-0" />}
                      {answered && selected === opt && opt.toLowerCase() !== exercise.correctAnswer.toLowerCase() && <X className="h-4 w-4 shrink-0" />}
                    </div>
                  </button>
                  <VoiceButton
                    isSpeaking={voice.isSpeaking && activeVoiceTarget === `option-${exercise.id}-${opt}`}
                    onSpeak={() => void speakText(`option-${exercise.id}-${opt}`, opt)}
                    className="self-center"
                  />
                </div>
              ))}
            </div>
          )}

          {exercise.type === "fill-blank" && (
            <div className="space-y-3">
              <Input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={answered}
                placeholder="Type your answer..."
                className={cn(
                  "bg-secondary/50 border-border text-foreground",
                  answered && correct && "border-success",
                  answered && !correct && "border-destructive"
                )}
                onKeyDown={(e) => e.key === "Enter" && !answered && (exercise.type === "fill-blank" ? inputVal.trim() : selected) && checkAnswer()}
              />
              {answered && !correct && (
                <p className="text-sm text-success">Correct answer: {exercise.correctAnswer}</p>
              )}
            </div>
          )}

          {exercise.hint && !answered && (
            <p className="text-xs text-muted-foreground italic">💡 Hint: {exercise.hint}</p>
          )}

          <PronunciationFeedbackCard feedback={pronunciationFeedback} />
        </motion.div>
      </AnimatePresence>

      {/* Action */}
      {!answered ? (
        <Button
          onClick={checkAnswer}
          disabled={exercise.type === "fill-blank" ? !inputVal.trim() : !selected}
          className="w-full gradient-purple border-0 text-foreground rounded-xl py-5 font-display font-semibold"
        >
          Check Answer
        </Button>
      ) : (
        <Button
          onClick={next}
          className={cn(
            "w-full border-0 text-foreground rounded-xl py-5 font-display font-semibold",
            correct ? "bg-success hover:bg-success/90" : "gradient-purple"
          )}
        >
          {currentEx < lesson.exercises.length - 1 ? "Next Question" : "Finish Lesson"}
        </Button>
      )}

      <OutOfCreditsModal open={showCreditsModal} onClose={() => setShowCreditsModal(false)} />
    </div>
  );
};

export default LessonDetail;
