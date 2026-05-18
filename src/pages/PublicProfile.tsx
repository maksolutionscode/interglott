import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { achievements, getUnlockedAchievements } from "@/data/achievements";
import { AchievementBadge } from "@/components/AchievementBadge";
import { Sparkles, Flame, BookOpen, MessageCircle, Trophy, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicProfileData {
  display_name: string;
  avatar_url: string | null;
  level: string;
  xp: number;
  streak: number;
  completed_lessons: string[] | null;
  mastered_words: string[] | null;
  conversations: number;
  completed_stories: string[] | null;
  privacy_setting: string;
  learning_language: string;
}

const XP_PER_LEVEL = 500;

const levelLabel: Record<string, string> = {
  beginner: "Explorer",
  intermediate: "Adventurer",
  advanced: "Master",
};

const languageFlag: Record<string, string> = {
  french: "🇫🇷",
  spanish: "🇪🇸",
  chinese: "🇨🇳",
  german: "🇩🇪",
  arabic: "🇸🇦",
};

export default function PublicProfile() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!shareToken) { setNotFound(true); setLoading(false); return; }

    supabase
      .from("profiles")
      .select("display_name, avatar_url, level, xp, streak, completed_lessons, mastered_words, conversations, completed_stories, privacy_setting, learning_language")
      .eq("share_token", shareToken)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); }
        else if (data.privacy_setting === "private") { setNotFound(true); }
        else { setProfile(data as PublicProfileData); }
        setLoading(false);
      });
  }, [shareToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <Lock className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>
        <p className="text-muted-foreground mb-6">This progress link is private or doesn't exist.</p>
        <Button onClick={() => navigate("/")} className="gradient-purple border-0 text-foreground">
          <Sparkles className="h-4 w-4 mr-2" />
          Try Interglott
        </Button>
      </div>
    );
  }

  const completedCount = profile.completed_lessons?.length ?? 0;
  const xpProgress = profile.xp % XP_PER_LEVEL;
  const xpPercent = Math.round((xpProgress / XP_PER_LEVEL) * 100);
  const flag = languageFlag[profile.learning_language] ?? "🌐";

  const unlocked = getUnlockedAchievements({
    completedLessons: completedCount,
    streak: profile.streak,
    masteredWords: profile.mastered_words?.length ?? 0,
    xp: profile.xp,
    conversations: profile.conversations,
  });

  const recentActivity = [
    completedCount > 0 && { icon: "📚", label: "Completed lessons", value: completedCount },
    profile.conversations > 0 && { icon: "💬", label: "AI conversations", value: profile.conversations },
    (profile.completed_stories?.length ?? 0) > 0 && { icon: "📖", label: "Stories read", value: profile.completed_stories!.length },
    profile.streak > 0 && { icon: "🔥", label: "Day streak", value: profile.streak },
  ].filter(Boolean) as { icon: string; label: string; value: number }[];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="max-w-lg mx-auto px-4 py-8 relative z-10 space-y-5">
        {/* Header badge */}
        <div className="flex justify-center">
          <div className="glass-card rounded-full px-4 py-1.5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs text-muted-foreground font-medium">Progress shared via Interglott</span>
          </div>
        </div>

        {/* Profile hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 text-center"
        >
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="w-20 h-20 rounded-full ring-2 ring-primary/40 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full ring-2 ring-primary/40 gradient-purple flex items-center justify-center text-3xl">
                😊
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 text-xl">{flag}</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground">{profile.display_name}</h1>
          <p className="text-sm text-accent font-medium capitalize mt-0.5">
            {profile.learning_language} {levelLabel[profile.level] ?? profile.level}
          </p>

          {/* XP bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{profile.xp} XP total</span>
              <span>{xpProgress} / {XP_PER_LEVEL} to next level</span>
            </div>
            <Progress value={xpPercent} className="h-2.5 bg-muted" />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Flame className="h-5 w-5 text-primary" />, label: "Day Streak", value: profile.streak },
            { icon: <BookOpen className="h-5 w-5 text-primary" />, label: "Lessons", value: completedCount },
            { icon: <MessageCircle className="h-5 w-5 text-accent" />, label: "Chats", value: profile.conversations },
          ].map(({ icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card rounded-xl p-3 text-center"
            >
              <div className="flex justify-center mb-1">{icon}</div>
              <p className="font-display font-bold text-foreground text-xl">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-xp" />
            <h2 className="font-display font-semibold text-foreground">
              Achievements <span className="text-muted-foreground text-sm font-normal">({unlocked.length}/{achievements.length})</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {achievements.slice(0, 6).map((a) => (
              <AchievementBadge key={a.id} achievement={a} unlocked={unlocked.includes(a.id)} />
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        {recentActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-5"
          >
            <h2 className="font-display font-semibold text-foreground mb-3">Recent Activity</h2>
            <div className="space-y-2.5">
              {recentActivity.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm text-foreground">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <div className="glass-card rounded-2xl p-5 text-center">
          <p className="text-sm text-muted-foreground mb-3">Want to start your own language journey?</p>
          <Button
            onClick={() => navigate("/")}
            className="gradient-purple border-0 text-foreground font-semibold glow-purple hover:opacity-90"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Start Learning Free
          </Button>
        </div>
      </div>
    </div>
  );
}
