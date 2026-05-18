import { vocabulary } from "@/data/vocabulary";
import { VocabCard } from "@/components/VocabCard";
import { useProgress } from "@/contexts/UserProgressContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Vocabulary = () => {
  const { masteredWords, masterWord, addXP, level } = useProgress();
  const [filter, setFilter] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const levelVocab = vocabulary.filter((v) => filter === "all" ? v.level === level : v.category === filter);
  const categories = [...new Set(vocabulary.filter((v) => v.level === level).map((v) => v.category))];

  const handleMaster = (wordId: string) => {
    if (!masteredWords.includes(wordId)) {
      masterWord(wordId);
      addXP(10);
    }
    if (currentIndex < levelVocab.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div className="pt-6 space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Vocabulary</h1>
        <p className="text-sm text-muted-foreground">
          {masteredWords.length} words mastered • {vocabulary.length} total
        </p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-xp rounded-full"
          animate={{ width: `${(masteredWords.length / vocabulary.length) * 100}%` }}
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => { setFilter("all"); setCurrentIndex(0); }}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            filter === "all" ? "gradient-purple text-foreground" : "glass-card text-muted-foreground"
          )}
        >
          All ({level})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setCurrentIndex(0); }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filter === cat ? "gradient-purple text-foreground" : "glass-card text-muted-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      {levelVocab.length > 0 ? (
        <div className="space-y-4">
          <VocabCard
            key={levelVocab[currentIndex]?.id}
            word={levelVocab[currentIndex]}
            onMaster={() => handleMaster(levelVocab[currentIndex].id)}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
            >
              ← Previous
            </button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {levelVocab.length}
            </span>
            <button
              onClick={() => setCurrentIndex((i) => Math.min(levelVocab.length - 1, i + 1))}
              disabled={currentIndex >= levelVocab.length - 1}
              className="text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">No words in this category</p>
      )}

      {/* Mastered list */}
      {masteredWords.length > 0 && (
        <div>
          <h2 className="font-display font-semibold text-foreground mb-3">Mastered ✓</h2>
          <div className="flex flex-wrap gap-2">
            {masteredWords.map((wid) => {
              const w = vocabulary.find((v) => v.id === wid);
              return w ? (
                <span key={wid} className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  {w.french}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
