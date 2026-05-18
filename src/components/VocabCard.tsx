import { useState } from "react";
import { VocabWord } from "@/data/vocabulary";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";

interface VocabCardProps {
  word: VocabWord;
  onMaster?: () => void;
}

export function VocabCard({ word, onMaster }: VocabCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-48 cursor-pointer" onClick={() => setFlipped(!flipped)}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden">
          <p className="font-display text-2xl font-bold text-foreground mb-2">{word.french}</p>
          <p className="text-sm text-muted-foreground">Tap to reveal</p>
          <RotateCw className="h-4 w-4 text-muted-foreground mt-2" />
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 glass-card rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-display text-xl font-bold text-accent mb-1">{word.english}</p>
          <p className="text-sm text-muted-foreground italic text-center mb-3">"{word.example}"</p>
          {onMaster && (
            <button
              onClick={(e) => { e.stopPropagation(); onMaster(); }}
              className="text-xs gradient-purple text-foreground px-3 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              ✓ Mastered
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
