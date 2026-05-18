import { useProgress } from "@/contexts/UserProgressContext";
import { useGameAudio } from "@/hooks/useGameAudio";
import { useState } from "react";
import { calculateXP } from "@/lib/gamification";
import { Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const challenges = [
  { question: "Translate: 'I am happy'", answer: "Je suis heureux", xp: 75 },
  { question: "What does 'bibliothèque' mean?", answer: "Library", xp: 75 },
  { question: "Conjugate 'avoir' for 'nous'", answer: "nous avons", xp: 75 },
  { question: "Translate: 'The weather is nice'", answer: "Il fait beau", xp: 75 },
  { question: "What is the plural of 'le journal'?", answer: "les journaux", xp: 75 },
];

export function DailyChallenge() {
  const { dailyChallengeCompleted, completeDailyChallenge, addXP, streak } = useProgress();
  const audio = useGameAudio();
  const [showAnswer, setShowAnswer] = useState(false);

  const today = new Date().getDay();
  const challenge = challenges[today % challenges.length];
  const earnedXP = calculateXP(challenge.xp, streak);

  if (dailyChallengeCompleted) {
    return (
      <div className="glass-card rounded-2xl p-5 border border-success/20">
        <div className="flex items-center gap-2 text-success">
          <Check className="h-5 w-5" />
          <span className="font-display font-semibold">Daily Challenge Complete!</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Come back tomorrow for a new challenge</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-5 border border-accent/20 animate-pulse-glow"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-accent" />
        <span className="font-display font-semibold text-foreground">Daily Challenge</span>
        <span className="ml-auto text-xs text-xp font-medium">+{earnedXP} XP</span>
      </div>
      <p className="text-sm text-foreground mb-4">{challenge.question}</p>
      {showAnswer ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-accent">Answer: {challenge.answer}</p>
          <Button
            onClick={() => { addXP(earnedXP); completeDailyChallenge(); audio.onMissionComplete(); setTimeout(() => audio.onXPReward(), 400); }}
            className="w-full gradient-purple border-0 text-foreground hover:opacity-90"
          >
            I got it right! +{earnedXP} XP
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setShowAnswer(true)}
          variant="outline"
          className="w-full border-accent/30 text-accent hover:bg-accent/10"
        >
          Reveal Answer
        </Button>
      )}
    </motion.div>
  );
}
