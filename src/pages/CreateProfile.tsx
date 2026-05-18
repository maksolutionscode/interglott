import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress, LearningLanguage } from "@/contexts/UserProgressContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Clock, Target, BarChart3, Globe, ChevronDown } from "lucide-react";

const languageMap: Record<LearningLanguage, { flag: string; name: string }> = {
  french: { flag: "🇫🇷", name: "French" },
  spanish: { flag: "🇪🇸", name: "Spanish" },
  chinese: { flag: "🇨🇳", name: "Chinese" },
  german: { flag: "🇩🇪", name: "German" },
  arabic: { flag: "🇸🇦", name: "Arabic" },
};

const learningGoals = [
  "Travel & Tourism",
  "Career or work",
  "School or exams",
  "Conversation practice",
  "Not sure yet",
];

const levels = [
  { key: "beginner" as const, label: "Beginner" },
  { key: "intermediate" as const, label: "Intermediate" },
  { key: "advanced" as const, label: "Advanced" },
];

const dailyGoals = [
  { minutes: 5, label: "5 min", emoji: "⚡" },
  { minutes: 10, label: "10 min", emoji: "🔥" },
  { minutes: 15, label: "15 min", emoji: "💪" },
  { minutes: 30, label: "30 min", emoji: "🚀" },
];

const avatarOptions = ["😊", "🧑‍🎓", "🌍", "🎯", "🦊", "🐱", "🦉", "🌸"];

const CreateProfile = () => {
  const navigate = useNavigate();
  const {
    learningLanguage,
    setLearningLanguage,
    setUserLevel,
    setOnboarded,
    setDisplayName: saveDisplayName,
    setLearningGoal,
    setDailyGoalMinutes,
    setAvatar: saveAvatar,
  } = useProgress();

  const [displayName, setDisplayName] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [dailyMinutes, setDailyMinutes] = useState(10);
  const [avatar, setAvatar] = useState("😊");
  const [showLangPicker, setShowLangPicker] = useState(false);

  const lang = languageMap[learningLanguage];

  const handleSubmit = () => {
    saveDisplayName(displayName);
    setLearningGoal(goal);
    setDailyGoalMinutes(dailyMinutes);
    saveAvatar(avatar);
    setUserLevel(level);
    setOnboarded();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 py-10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/15 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Create your learning profile
        </h1>
        <p className="text-muted-foreground">Tell us a little about your learning journey.</p>
      </motion.div>

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Avatar Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center text-4xl glow-purple">
            {avatar}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {avatarOptions.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                  avatar === a
                    ? "glass-card glow-purple scale-110"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Display Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label className="text-foreground flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary" /> Display Name
          </Label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="What should we call you?"
            className="glass-card border-border/50 focus:glow-purple text-foreground placeholder:text-muted-foreground"
          />
        </motion.div>

        {/* Learning Goal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label className="text-foreground flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" /> Learning Goal
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {learningGoals.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  goal === g
                    ? "gradient-purple text-primary-foreground glow-purple"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Current Level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label className="text-foreground flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Current Level
          </Label>
          <div className="flex gap-2">
            {levels.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setLevel(key)}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  level === key
                    ? "gradient-purple text-primary-foreground glow-purple"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Daily Learning Goal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label className="text-foreground flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" /> Daily Learning Goal
          </Label>
          <div className="flex gap-2">
            {dailyGoals.map(({ minutes, label, emoji }) => (
              <button
                key={minutes}
                onClick={() => setDailyMinutes(minutes)}
                className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 rounded-xl text-sm font-medium transition-all ${
                  dailyMinutes === minutes
                    ? "gradient-purple text-primary-foreground glow-purple"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-lg">{emoji}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Language Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label className="text-foreground flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-primary" /> Language
          </Label>
          <button
            onClick={() => setShowLangPicker(!showLangPicker)}
            className="w-full glass-card rounded-xl p-3 flex items-center justify-between text-foreground hover:border-primary/30 transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">You are learning: {lang.name}</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showLangPicker ? "rotate-180" : ""}`} />
          </button>
          {showLangPicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 space-y-1"
            >
              {(Object.entries(languageMap) as [LearningLanguage, { flag: string; name: string }][]).map(
                ([key, { flag, name }]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setLearningLanguage(key);
                      setShowLangPicker(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      learningLanguage === key
                        ? "gradient-purple text-primary-foreground"
                        : "glass-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="text-xl">{flag}</span>
                    <span>{name}</span>
                  </button>
                )
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="pt-2"
        >
          <Button
            onClick={handleSubmit}
            className="w-full gradient-purple text-primary-foreground font-display font-bold text-lg py-6 rounded-2xl glow-purple hover:scale-[1.02] transition-transform"
          >
            Let's go! 🚀
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProfile;
