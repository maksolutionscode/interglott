import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/UserProgressContext";
import { motion } from "framer-motion";

const levels = [
  { key: "beginner" as const, emoji: "🌱", title: "Beginner", titleFr: "Débutant", desc: "I'm just starting out" },
  { key: "intermediate" as const, emoji: "📖", title: "Intermediate", titleFr: "Intermédiaire", desc: "I know some basics" },
  { key: "advanced" as const, emoji: "🚀", title: "Advanced", titleFr: "Avancé", desc: "I want to perfect my French" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUserLevel, setOnboarded } = useProgress();

  const handleSelect = (level: "beginner" | "intermediate" | "advanced") => {
    setUserLevel(level);
    setOnboarded();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">What's your level?</h1>
        <p className="text-muted-foreground">We'll customize your experience</p>
      </motion.div>

      <div className="w-full max-w-sm space-y-4">
        {levels.map(({ key, emoji, title, titleFr, desc }, i) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelect(key)}
            className="w-full glass-card rounded-2xl p-5 text-left hover:glow-purple transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:animate-float">{emoji}</span>
              <div>
                <p className="font-display font-bold text-foreground text-lg">{title}</p>
                <p className="text-sm text-accent">{titleFr}</p>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
