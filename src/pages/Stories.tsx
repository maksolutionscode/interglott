import { useProgress } from "@/contexts/UserProgressContext";
import { getStoriesForLanguage, type Story } from "@/data/stories";
import { languageLabels } from "@/data/lessonsByLanguage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Lock } from "lucide-react";
import { CompletionIndicator } from "@/components/CompletionIndicator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";

const levelOrder = ["beginner", "intermediate", "advanced"] as const;

const Stories = () => {
  const { learningLanguage, completedStories, level } = useProgress();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const stories = getStoriesForLanguage(learningLanguage);
  const langInfo = languageLabels[learningLanguage];

  const filteredStories = filter === "all" ? stories : stories.filter((s) => s.level === filter);

  const isUnlocked = (story: Story) => {
    const sameLevel = stories.filter((s) => s.level === story.level);
    const idx = sameLevel.indexOf(story);
    if (idx === 0) return true;
    return completedStories.includes(sameLevel[idx - 1].id);
  };

  return (
    <div className="pt-6 space-y-5">
      <BackButton to="/dashboard" label="Dashboard" />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Story Mode</h1>
        <p className="text-sm text-muted-foreground">
          Learn {langInfo.name} through interactive stories • {completedStories.length}/{stories.length} completed
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-xp rounded-full"
          animate={{ width: `${(completedStories.length / Math.max(stories.length, 1)) * 100}%` }}
        />
      </div>

      {/* Level filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", ...levelOrder].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filter === lvl ? "gradient-purple text-foreground" : "glass-card text-muted-foreground"
            )}
          >
            {lvl === "all" ? "All" : lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </button>
        ))}
      </div>

      {/* Story cards */}
      <div className="space-y-3">
        {filteredStories.map((story, i) => {
          const unlocked = isUnlocked(story);
          const completed = completedStories.includes(story.id);

          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => unlocked && navigate(`/stories/${story.id}`)}
                disabled={!unlocked}
                className={cn(
                  "w-full text-left glass-card rounded-2xl p-4 transition-all active-scale",
                  unlocked ? "hover:glow-purple hover:scale-[1.01]" : "opacity-50",
                  completed && "border border-success/30"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!unlocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-primary shrink-0" />
                      )}
                      <h3 className="font-display font-semibold text-sm text-foreground truncate">
                        {story.title}
                      </h3>
                      <CompletionIndicator completed={completed} xpEarned={story.xpReward} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 truncate">{story.location}</p>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                        story.level === "beginner" && "bg-success/10 text-success",
                        story.level === "intermediate" && "bg-primary/10 text-primary",
                        story.level === "advanced" && "bg-accent/10 text-accent",
                      )}>
                        {story.level}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {story.duration}
                      </span>
                      <span className="text-[10px] text-accent font-medium">+{story.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {filteredStories.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No stories for this level yet</p>
      )}
    </div>
  );
};

export default Stories;
