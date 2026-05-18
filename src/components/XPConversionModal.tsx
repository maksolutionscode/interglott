import { useState } from "react";
import { useProgress } from "@/contexts/UserProgressContext";
import { useCredits } from "@/contexts/CreditsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, AlertTriangle, Zap, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentLevel } from "@/lib/gamification";
import { toast } from "sonner";

const XP_PER_CREDIT = 50;
const MAX_CREDITS_PER_DAY = 100;

interface XPConversionModalProps {
  open: boolean;
  onClose: () => void;
}

export function XPConversionModal({ open, onClose }: XPConversionModalProps) {
  const { xp, deductXP } = useProgress();
  const { buyCredits } = useCredits();
  const [step, setStep] = useState<"select" | "confirm">("select");

  const maxConvertibleCredits = Math.min(
    Math.floor(xp / XP_PER_CREDIT),
    MAX_CREDITS_PER_DAY
  );
  const [creditsToGain, setCreditsToGain] = useState(
    Math.min(5, maxConvertibleCredits)
  );

  const xpCost = creditsToGain * XP_PER_CREDIT;
  const newXP = xp - xpCost;
  const currentLevel = getCurrentLevel(xp);
  const newLevel = getCurrentLevel(newXP);
  const levelWillDrop = newLevel.name !== currentLevel.name;

  const handleConfirm = () => {
    if (deductXP(xpCost)) {
      buyCredits(creditsToGain);
      toast.success(`Converted ${xpCost} XP → ${creditsToGain} credits!`);
      setStep("select");
      onClose();
    }
  };

  const handleClose = () => {
    setStep("select");
    onClose();
  };

  if (maxConvertibleCredits < 1) {
    return (
      <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
        <DialogContent className="glass-card border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader className="text-center">
            <DialogTitle className="font-display text-xl text-foreground">
              Not Enough XP
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You need at least {XP_PER_CREDIT} XP to convert into credits. Keep learning to earn more!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleClose} className="w-full rounded-xl">
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="glass-card border-border rounded-2xl max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          {step === "select" ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <DialogHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="mx-auto mb-2"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                </motion.div>
                <DialogTitle className="font-display text-xl text-foreground">
                  Convert XP to Credits
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Trade your XP for learning credits. {XP_PER_CREDIT} XP = 1 credit.
                </DialogDescription>
              </DialogHeader>

              {/* Current XP display */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Your XP:</span>
                <span className="font-display font-bold text-primary text-lg">{xp}</span>
              </div>

              {/* Slider */}
              <div className="space-y-3 px-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Credits to gain</span>
                  <span className="font-display font-bold text-accent text-lg">{creditsToGain}</span>
                </div>
                <Slider
                  value={[creditsToGain]}
                  onValueChange={([v]) => setCreditsToGain(v)}
                  min={1}
                  max={maxConvertibleCredits}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>1 credit</span>
                  <span>{maxConvertibleCredits} credits</span>
                </div>
              </div>

              {/* Cost summary */}
              <div className="glass-card rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">XP cost</span>
                  <span className="font-semibold text-destructive">−{xpCost} XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">XP after</span>
                  <span className="font-semibold text-foreground">{newXP} XP</span>
                </div>
                {levelWillDrop && (
                  <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      Level will drop: {currentLevel.icon} {currentLevel.name} → {newLevel.icon} {newLevel.name}
                    </span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setStep("confirm")}
                className="w-full gradient-purple border-0 text-foreground rounded-xl py-5 font-display font-semibold"
              >
                Convert {xpCost} XP
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              <DialogHeader className="text-center">
                <DialogTitle className="font-display text-xl text-foreground">
                  Confirm Conversion
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  This action is permanent. Your XP will be deducted.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Spend</p>
                  <p className="font-display font-bold text-destructive text-2xl">{xpCost}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Gain</p>
                  <p className="font-display font-bold text-accent text-2xl">{creditsToGain}</p>
                  <p className="text-xs text-muted-foreground">Credits</p>
                </div>
              </div>

              {levelWillDrop && (
                <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>Your level will drop to {newLevel.icon} {newLevel.name}</span>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  onClick={handleConfirm}
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl py-5 font-display font-semibold"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Confirm Conversion
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setStep("select")}
                  className="w-full text-muted-foreground"
                >
                  Go Back
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
