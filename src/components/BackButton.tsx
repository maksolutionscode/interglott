import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BackButtonProps {
  to: string;
  label?: string;
}

export function BackButton({ to, label = "Back" }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
      aria-label={label}
      className="glass-card inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-3.5 py-2 text-sm font-medium text-foreground hover:glow-purple transition-all"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </motion.button>
  );
}
