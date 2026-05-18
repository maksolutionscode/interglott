import { useParams, useNavigate } from "react-router-dom";
import { getStoryById } from "@/data/stories";
import { useProgress } from "@/contexts/UserProgressContext";
import { useCredits } from "@/contexts/CreditsContext";
import { useGameAudio } from "@/hooks/useGameAudio";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, XCircle, Star, Zap } from "lucide-react";
import { OutOfCreditsModal } from "@/components/OutOfCreditsModal";

const StoryPlay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addXP, completeStory, completedStories } = useProgress();
  const { canAfford, spendCredits } = useCredits();
  const audio = useGameAudio();

  const story = getStoryById(id || "");

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [creditsDeducted, setCreditsDeducted] = useState(false);

  const handleSelectOption = useCallback((optionId: string) => {
    if (showFeedback) return;
    if (!creditsDeducted) {
      if (!canAfford("story")) {
        setShowCreditsModal(true);
        return;
      }
      spendCredits("story");
      setCreditsDeducted(true);
    }
    setSelectedOption(optionId);
    setShowFeedback(true);

    const step = story!.steps[currentStep];
    const option = step.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      setCorrectCount((c) => c + 1);
      audio.onCorrectAnswer();
    } else {
      audio.onIncorrectAnswer();
    }
  }, [showFeedback, story, currentStep]);

  const handleContinue = useCallback(() => {
    const step = story!.steps[currentStep];
    const option = step.options.find((o) => o.id === selectedOption);

    if (!option?.isCorrect) {
      // Allow retry on wrong answer
      setSelectedOption(null);
      setShowFeedback(false);
      return;
    }

    if (currentStep < story!.steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Story complete
      setIsComplete(true);
      audio.onMissionComplete();
      if (!completedStories.includes(story!.id)) {
        completeStory(story!.id);
        addXP(story!.xpReward);
        setTimeout(() => audio.onXPReward(), 400);
      }
    }
  }, [story, currentStep, selectedOption, completedStories, completeStory, addXP]);

  if (!story) {
    return (
      <div className="pt-6 text-center">
        <p className="text-muted-foreground">Story not found.</p>
        <button onClick={() => navigate("/stories")} className="text-accent text-sm mt-2">
          ← Back to Stories
        </button>
      </div>
    );
  }

  if (isComplete) {
    const accuracy = Math.round((correctCount / story.steps.length) * 100);
    return (
      <div className="pt-6 flex flex-col items-center justify-center min-h-[70vh] space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-24 h-24 rounded-full gradient-purple flex items-center justify-center">
            <Star className="h-12 w-12 text-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-2"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">Story Complete!</h1>
          <p className="text-muted-foreground">{story.title}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6 w-full max-w-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Accuracy</span>
            <span className="font-display font-bold text-foreground">{accuracy}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", accuracy >= 80 ? "bg-success" : accuracy >= 50 ? "bg-primary" : "bg-destructive")}
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">XP Earned</span>
            <span className="flex items-center gap-1 font-display font-bold text-accent">
              <Zap className="h-4 w-4" /> +{story.xpReward}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Steps</span>
            <span className="font-display font-bold text-foreground">{story.steps.length}/{story.steps.length}</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => navigate("/stories")}
          className="gradient-purple text-foreground px-8 py-3 rounded-full font-display font-semibold hover:opacity-90 transition-opacity"
        >
          Continue
        </motion.button>
      </div>
    );
  }

  const step = story.steps[currentStep];
  const selectedOpt = step.options.find((o) => o.id === selectedOption);

  return (
    <div className="pt-4 flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate("/stories")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-purple rounded-full"
              animate={{ width: `${((currentStep + 1) / story.steps.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {currentStep + 1}/{story.steps.length}
        </span>
      </div>

      {/* Story location */}
      <p className="text-xs text-muted-foreground mb-4">{story.location}</p>

      {/* Dialogue area */}
      <div className="flex-1 space-y-4">
        {/* Character dialogue */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            dir={story.language === "arabic" ? "rtl" : "ltr"}
            initial={{ opacity: 0, x: story.language === "arabic" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: story.language === "arabic" ? -20 : 20 }}
            className="flex gap-3"
          >
            <div className={cn("w-10 h-10 rounded-full glass-card flex items-center justify-center text-lg shrink-0", story.language === "arabic" && "order-last")}>
              {step.characterAvatar}
            </div>
            <div className={cn("glass-card rounded-2xl px-4 py-3 max-w-[85%]", story.language === "arabic" ? "rounded-br-sm" : "rounded-bl-sm")}>
              <p className={cn("text-xs text-accent font-medium mb-1", story.language === "arabic" && "text-right")}>{step.characterName}</p>
              <p className={cn("text-sm text-foreground leading-relaxed", story.language === "arabic" && "text-right")}>{step.dialogue}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Response options */}
        <div className="space-y-2 pt-4" dir={story.language === "arabic" ? "rtl" : "ltr"}>
          <p className={cn("text-xs text-muted-foreground mb-2", story.language === "arabic" && "text-right")}>
            {story.language === "arabic" ? "اختر ردك:" : "Choose your response:"}
          </p>
          {step.options.map((option, i) => {
            const isSelected = selectedOption === option.id;
            const showResult = showFeedback && isSelected;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => handleSelectOption(option.id)}
                disabled={showFeedback && !isSelected}
                className={cn(
                  "w-full text-left rounded-xl px-4 py-3 text-sm transition-all border",
                  !showFeedback && "glass-card border-transparent hover:border-accent/30 hover:glow-purple",
                  showFeedback && !isSelected && "glass-card border-transparent opacity-40",
                  showResult && option.isCorrect && "border-success/50 bg-success/10",
                  showResult && !option.isCorrect && "border-destructive/50 bg-destructive/10",
                  story.language === "arabic" && "text-right"
                )}
              >
                <div className={cn("flex items-start gap-2", story.language === "arabic" && "flex-row-reverse")}>
                  {showResult && (
                    option.isCorrect
                      ? <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      : <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  )}
                  <span className="text-foreground">{option.text}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && selectedOpt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              dir={story.language === "arabic" ? "rtl" : "ltr"}
              className={cn(
                "rounded-xl px-4 py-3 text-sm",
                selectedOpt.isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                story.language === "arabic" && "text-right"
              )}
            >
              <p>{selectedOpt.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue button */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 pb-2"
        >
          <button
            onClick={handleContinue}
            className={cn(
              "w-full py-3 rounded-full font-display font-semibold text-sm transition-opacity hover:opacity-90",
              selectedOpt?.isCorrect
                ? "gradient-purple text-foreground"
                : "bg-destructive/20 text-destructive"
            )}
          >
            {selectedOpt?.isCorrect
              ? currentStep < story.steps.length - 1 ? "Continue →" : "Complete Story 🎉"
              : "Try Again"
            }
          </button>
        </motion.div>
      )}
      <OutOfCreditsModal open={showCreditsModal} onClose={() => setShowCreditsModal(false)} />
    </div>
  );
};

export default StoryPlay;
