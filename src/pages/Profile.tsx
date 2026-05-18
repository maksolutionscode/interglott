import { useState } from "react";
import { useProgress, type LearningLanguage } from "@/contexts/UserProgressContext";
import { useCredits } from "@/contexts/CreditsContext";
import { XPBar } from "@/components/XPBar";
import { AchievementBadge } from "@/components/AchievementBadge";
import { achievements, getUnlockedAchievements } from "@/data/achievements";
import { lessons } from "@/data/lessons";
import { vocabulary } from "@/data/vocabulary";
import { languageLabels } from "@/data/lessonsByLanguage";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  RotateCcw, Globe, Volume2, VolumeX, Share2, Copy, Check, Loader2, ExternalLink, Sparkles, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { XPConversionModal } from "@/components/XPConversionModal";
import { BackButton } from "@/components/BackButton";
import { VoiceSettingsControls } from "@/components/voice/VoiceSettingsControls";
import { useVoiceSettings } from "@/hooks/useVoiceSettings";

const Profile = () => {
  const progress = useProgress();
  const { creditsRemaining, isPremium } = useCredits();
  const navigate = useNavigate();
  const { settings: voiceSettings, updateSettings: updateVoiceSettings } = useVoiceSettings();
  const [showConversion, setShowConversion] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(() => {
    return localStorage.getItem("interglott-share-token");
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const unlocked = getUnlockedAchievements({
    completedLessons: progress.completedLessons.length,
    streak: progress.streak,
    masteredWords: progress.masteredWords.length,
    xp: progress.xp,
    conversations: progress.conversations,
  });

  const stats = [
    { label: "XP Earned", value: progress.xp, icon: "⚡" },
    { label: "Day Streak", value: progress.streak, icon: "🔥" },
    { label: "Lessons Done", value: `${progress.completedLessons.length}/${lessons.length}`, icon: "📚" },
    { label: "Words Mastered", value: `${progress.masteredWords.length}/${vocabulary.length}`, icon: "🃏" },
    { label: "Conversations", value: progress.conversations, icon: "💬" },
    { label: "Achievements", value: `${unlocked.length}/${achievements.length}`, icon: "🏆" },
  ];

  const publicUrl = shareToken 
    ? `${window.location.origin}/u/${shareToken}` 
    : null;

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      // Generate a unique token
      const { data: tokenData, error: tokenError } = await supabase.rpc("generate_share_token");
      if (tokenError) throw tokenError;
      
      const newToken = tokenData as string;
      const uniqueId = crypto.randomUUID();

      // Save progress snapshot to Supabase
      const { error } = await supabase.from("profiles").insert({
        id: uniqueId,
        email: `anonymous-${uniqueId}@interglott.app`,
        display_name: progress.displayName || "Language Learner",
        avatar_url: progress.avatar || null,
        level: progress.level,
        xp: progress.xp,
        streak: progress.streak,
        completed_lessons: progress.completedLessons,
        mastered_words: progress.masteredWords,
        completed_stories: progress.completedStories,
        conversations: progress.conversations,
        learning_language: progress.learningLanguage,
        privacy_setting: "public",
        share_token: newToken,
        daily_goal_minutes: progress.dailyGoalMinutes,
        sound_enabled: progress.soundEnabled,
      });

      if (error) throw error;

      // Save token locally
      localStorage.setItem("interglott-share-token", newToken);
      localStorage.setItem("interglott-profile-id", uniqueId);
      setShareToken(newToken);

      // Award XP for first share
      if (!localStorage.getItem("interglott-share-rewarded")) {
        progress.addXP(50);
        localStorage.setItem("interglott-share-rewarded", "true");
        toast.success("Link created! +50 XP bonus for sharing!");
      } else {
        toast.success("Share link created!");
      }
    } catch (err) {
      console.error("Failed to generate share link:", err);
      toast.error("Failed to create share link. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSharedProgress = async () => {
    const profileId = localStorage.getItem("interglott-profile-id");
    if (!profileId || !shareToken) return;

    try {
      await supabase.from("profiles").update({
        display_name: progress.displayName || "Language Learner",
        avatar_url: progress.avatar || null,
        level: progress.level,
        xp: progress.xp,
        streak: progress.streak,
        completed_lessons: progress.completedLessons,
        mastered_words: progress.masteredWords,
        completed_stories: progress.completedStories,
        conversations: progress.conversations,
        learning_language: progress.learningLanguage,
      }).eq("id", profileId);

      toast.success("Shared progress updated!");
    } catch {
      toast.error("Failed to update shared progress.");
    }
  };

  const copyLink = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-6 space-y-6 pb-4">
      <BackButton to="/dashboard" label="Dashboard" />
      {/* User Identity */}
      <div className="flex items-center gap-4">
        <div className="text-4xl w-14 h-14 flex items-center justify-center rounded-full bg-primary/10">
          {progress.avatar || "😊"}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {progress.displayName || "Learner"}
          </h1>
          <p className="text-sm text-accent capitalize">{progress.level} Level</p>
        </div>
      </div>

      <XPBar />

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-3 text-center"
          >
            <div className="text-xl mb-1">{icon}</div>
            <p className="font-display font-bold text-foreground text-lg">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Share My Progress */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="h-4 w-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Share My Progress</h2>
        </div>
        
        {shareToken ? (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Share your learning journey with friends and family!
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground truncate font-mono">
                {publicUrl}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={copyLink}
                className="shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(publicUrl!, "_blank")}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={updateSharedProgress}
              className="w-full text-xs"
            >
              Update shared progress
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Create a public link to share your progress with others. You'll earn +50 XP for sharing!
            </p>
            <Button
              onClick={generateShareLink}
              disabled={isGenerating}
              className="w-full gradient-purple border-0 text-foreground"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating link...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Create Share Link
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* XP to Credits Conversion */}
      {!isPremium && (
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground">Manage Credits</h2>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">
              <span>Credits: </span>
              <span className="font-semibold text-accent">{creditsRemaining}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span>XP: </span>
              <span className="font-semibold text-primary">{progress.xp}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Convert your XP into credits to keep learning. 50 XP = 1 credit.
          </p>
          <Button
            onClick={() => setShowConversion(true)}
            disabled={progress.xp < 50}
            variant="outline"
            className="w-full rounded-xl border-primary/30"
          >
            <Zap className="h-4 w-4 mr-2 text-primary" />
            Convert XP to Credits
          </Button>
        </div>
      )}

      <XPConversionModal open={showConversion} onClose={() => setShowConversion(false)} />

      {/* Language Switcher */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Learning Language</h2>
        </div>
        <Select
          value={progress.learningLanguage}
          onValueChange={(val) => {
            const newLang = val as LearningLanguage;
            if (newLang === progress.learningLanguage) return;
            const prev = languageLabels[progress.learningLanguage];
            const next = languageLabels[newLang];
            progress.setLearningLanguage(newLang);
            toast.success(`Switched from ${prev.flag} ${prev.name} to ${next.flag} ${next.name}`);
            navigate("/dashboard");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(languageLabels) as [LearningLanguage, { name: string; flag: string; nativeName: string }][]).map(
              ([key, { name, flag, nativeName }]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span>{flag}</span>
                    <span>{name}</span>
                    <span className="text-muted-foreground text-xs">({nativeName})</span>
                  </span>
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Sound Settings */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {progress.soundEnabled ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="font-display font-semibold text-foreground text-sm">Sound Effects</span>
          </div>
          <Switch
            checked={progress.soundEnabled}
            onCheckedChange={(checked) => progress.setSoundEnabled(checked)}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          Audio feedback for correct answers, XP rewards, and milestones
        </p>
      </div>

      <div className="glass-card rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-primary" />
          <div>
            <h2 className="font-display font-semibold text-foreground">AI Voice Assistant</h2>
            <p className="text-xs text-muted-foreground">
              Set the tutor voice and persona once, then use it across lessons, stories, and chat.
            </p>
          </div>
        </div>
        <VoiceSettingsControls
          settings={voiceSettings}
          updateSettings={updateVoiceSettings}
        />
      </div>

      {/* Achievements */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-3">Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a) => (
            <AchievementBadge key={a.id} achievement={a} unlocked={unlocked.includes(a.id)} />
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        onClick={() => { if (confirm("Reset all progress?")) progress.resetProgress(); }}
        variant="outline"
        className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset Progress
      </Button>
    </div>
  );
};

export default Profile;
