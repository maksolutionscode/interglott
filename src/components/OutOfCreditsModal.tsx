import { useState } from "react";
import { useCredits } from "@/contexts/CreditsContext";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Crown, ShoppingCart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { XPConversionModal } from "@/components/XPConversionModal";

interface OutOfCreditsModalProps {
  open: boolean;
  onClose: () => void;
}

export function OutOfCreditsModal({ open, onClose }: OutOfCreditsModalProps) {
  const { timeUntilReset, buyCredits } = useCredits();
  const navigate = useNavigate();
  const [showConversion, setShowConversion] = useState(false);

  return (
    <>
      <Dialog open={open && !showConversion} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="glass-card border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="mx-auto mb-2"
            >
              <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-destructive" />
              </div>
            </motion.div>
            <DialogTitle className="font-display text-xl text-foreground">
              Out of Credits!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You've used all your daily credits. Upgrade to keep learning without limits.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {/* Reset timer */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Next reset in <span className="font-mono font-semibold text-foreground">{timeUntilReset}</span></span>
            </div>

            {/* Upgrade */}
            <Button
              onClick={() => { onClose(); navigate("/upgrade"); }}
              className="w-full gradient-purple border-0 text-foreground rounded-xl py-5 font-display font-semibold"
            >
              <Crown className="h-4 w-4 mr-2" />
              Keep learning without limits
            </Button>

            {/* Convert XP */}
            <Button
              variant="outline"
              onClick={() => setShowConversion(true)}
              className="w-full rounded-xl border-primary/30 text-foreground"
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Convert XP to Credits
            </Button>

            {/* Buy credits */}
            <Button
              variant="outline"
              onClick={() => { buyCredits(10); onClose(); }}
              className="w-full rounded-xl border-border text-foreground"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy 10 Credits
            </Button>

            {/* Wait */}
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-muted-foreground"
            >
              Continue free tomorrow
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <XPConversionModal
        open={showConversion}
        onClose={() => setShowConversion(false)}
      />
    </>
  );
}
