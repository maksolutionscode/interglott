import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, MessageCircle, TrendingUp, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/15 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Language flags row */}
          <div className="flex items-center justify-center gap-3 text-4xl mb-6">
            <span className="animate-float" style={{ animationDelay: "0s" }}>🇫🇷</span>
            <span className="animate-float" style={{ animationDelay: "0.2s" }}>🇪🇸</span>
            <span className="animate-float" style={{ animationDelay: "0.4s" }}>🇨🇳</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-purple-text">Interglott</span>
          </h1>
          <p className="text-sm text-accent font-display font-medium tracking-wide mb-4">
            Multilingual AI learning platform
          </p>
          <p className="text-lg text-muted-foreground max-w-md mb-8">
            Learn languages smarter with AI. From your first word to real conversations.
          </p>

          <Button
            onClick={() => navigate("/select-language")}
            className="gradient-purple border-0 text-foreground text-lg px-8 py-6 rounded-2xl font-display font-semibold glow-purple hover:opacity-90 transition-opacity"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Start Learning Now
          </Button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12 relative z-10"
        >
          {[
            { icon: BookOpen, label: "Guided Lessons" },
            { icon: MessageCircle, label: "AI Conversations" },
            { icon: TrendingUp, label: "Progress Tracking" },
            { icon: Share2, label: "Share Progress" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" />
              <span className="text-sm text-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
