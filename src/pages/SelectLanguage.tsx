import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/UserProgressContext";
import { motion } from "framer-motion";

const languages = [
  {
    key: "tcf-tef" as const,
    flag: "🎓",
    name: "TCF/TEF Practice",
    description: "Prepare for the official French proficiency exams.",
  },
  {
    key: "french" as const,
    flag: "🇫🇷",
    name: "French",
    description: "Learn the language of culture, travel, and diplomacy.",
  },
  {
    key: "spanish" as const,
    flag: "🇪🇸",
    name: "Spanish",
    description: "Speak one of the world's most widely used languages.",
  },
  {
    key: "chinese" as const,
    flag: "🇨🇳",
    name: "Chinese",
    description: "Master Mandarin and communicate with millions.",
  },
  {
    key: "german" as const,
    flag: "🇩🇪",
    name: "German",
    description: "Speak the language of engineering, philosophy, and innovation.",
  },
  {
    key: "arabic" as const,
    flag: "🇸🇦",
    name: "Arabic",
    description: "Learn a rich language spoken across the Middle East and beyond.",
  },
];

const SelectLanguage = () => {
  const navigate = useNavigate();
  const { setLearningLanguage } = useProgress();

  const handleSelect = (lang: "french" | "spanish" | "chinese" | "german" | "arabic" | "tcf-tef") => {
    if (lang === "tcf-tef") {
      setLearningLanguage("french");
      navigate("/tcf-tef");
      return;
    }
    setLearningLanguage(lang);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10 pb-16 sm:pb-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/15 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative z-10"
      >
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          What would you like to learn today?
        </h1>
        <p className="text-muted-foreground">Select a package — you can add more later</p>
      </motion.div>

      <div className="w-full max-w-sm space-y-4 relative z-10">
        {languages.map(({ key, flag, name, description }, i) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelect(key)}
            className="w-full glass-card rounded-2xl p-6 text-left hover:glow-purple transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl group-hover:animate-float">{flag}</span>
              <div>
                <p className="font-display font-bold text-foreground text-xl">{name}</p>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SelectLanguage;
