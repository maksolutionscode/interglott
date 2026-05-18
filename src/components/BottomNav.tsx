import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, MessageCircle, BookText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/lessons", icon: BookOpen, label: "Lessons" },
  { to: "/conversation", icon: MessageCircle, label: "Chat" },
  { to: "/stories", icon: BookText, label: "Stories" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all active-scale",
                active ? "text-accent" : "text-muted-foreground"
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full gradient-purple"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_8px_hsl(320,80%,55%)]")} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
