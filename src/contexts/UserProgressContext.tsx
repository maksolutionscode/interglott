import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type LearningLanguage = "french" | "spanish" | "chinese" | "german" | "arabic";

interface UserProgress {
  xp: number;
  streak: number;
  level: "beginner" | "intermediate" | "advanced";
  completedLessons: string[];
  masteredWords: string[];
  completedStories: string[];
  conversations: number;
  lastActiveDate: string;
  onboarded: boolean;
  dailyChallengeCompleted: boolean;
  learningLanguage: LearningLanguage;
  displayName: string;
  learningGoal: string;
  dailyGoalMinutes: number;
  avatar: string;
  soundEnabled: boolean;
}

interface UserProgressContextType extends UserProgress {
  addXP: (amount: number) => void;
  deductXP: (amount: number) => boolean;
  completeLesson: (lessonId: string) => void;
  masterWord: (wordId: string) => void;
  completeStory: (storyId: string) => void;
  incrementConversations: () => void;
  setUserLevel: (level: "beginner" | "intermediate" | "advanced") => void;
  completeDailyChallenge: () => void;
  setOnboarded: () => void;
  setLearningLanguage: (lang: LearningLanguage) => void;
  setDisplayName: (name: string) => void;
  setLearningGoal: (goal: string) => void;
  setDailyGoalMinutes: (minutes: number) => void;
  setAvatar: (avatar: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  xp: 0,
  streak: 0,
  level: "beginner",
  completedLessons: [],
  masteredWords: [],
  completedStories: [],
  conversations: 0,
  lastActiveDate: "",
  onboarded: false,
  dailyChallengeCompleted: false,
  learningLanguage: "french",
  displayName: "",
  learningGoal: "",
  dailyGoalMinutes: 10,
  avatar: "😊",
  soundEnabled: true,
};

const UserProgressContext = createContext<UserProgressContextType | null>(null);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem("interglott-progress");
      if (stored) {
        const parsed = JSON.parse(stored);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
          parsed.streak = 0;
        }
        if (parsed.lastActiveDate !== today) {
          parsed.dailyChallengeCompleted = false;
        }
        return { ...defaultProgress, ...parsed };
      }
    } catch {}
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem("interglott-progress", JSON.stringify(progress));
  }, [progress]);

  const updateDate = useCallback(() => {
    const today = new Date().toDateString();
    setProgress((p) => {
      if (p.lastActiveDate === today) return p;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = p.lastActiveDate === yesterday ? p.streak + 1 : p.lastActiveDate === today ? p.streak : 1;
      return { ...p, lastActiveDate: today, streak: newStreak };
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    updateDate();
    setProgress((p) => ({ ...p, xp: p.xp + amount }));
  }, [updateDate]);

  const deductXP = useCallback((amount: number): boolean => {
    let success = false;
    setProgress((p) => {
      if (p.xp < amount) return p;
      success = true;
      return { ...p, xp: p.xp - amount };
    });
    return success;
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    updateDate();
    setProgress((p) =>
      p.completedLessons.includes(lessonId) ? p : { ...p, completedLessons: [...p.completedLessons, lessonId] }
    );
  }, [updateDate]);

  const masterWord = useCallback((wordId: string) => {
    updateDate();
    setProgress((p) =>
      p.masteredWords.includes(wordId) ? p : { ...p, masteredWords: [...p.masteredWords, wordId] }
    );
  }, [updateDate]);

  const completeStory = useCallback((storyId: string) => {
    updateDate();
    setProgress((p) =>
      p.completedStories.includes(storyId) ? p : { ...p, completedStories: [...p.completedStories, storyId] }
    );
  }, [updateDate]);

  const incrementConversations = useCallback(() => {
    updateDate();
    setProgress((p) => ({ ...p, conversations: p.conversations + 1 }));
  }, [updateDate]);

  const setUserLevel = useCallback((level: "beginner" | "intermediate" | "advanced") => {
    setProgress((p) => ({ ...p, level }));
  }, []);

  const completeDailyChallenge = useCallback(() => {
    updateDate();
    setProgress((p) => ({ ...p, dailyChallengeCompleted: true }));
  }, [updateDate]);

  const setOnboarded = useCallback(() => {
    setProgress((p) => ({ ...p, onboarded: true }));
  }, []);

  const setLearningLanguage = useCallback((lang: LearningLanguage) => {
    setProgress((p) => ({ ...p, learningLanguage: lang }));
  }, []);

  const setDisplayName = useCallback((name: string) => {
    setProgress((p) => ({ ...p, displayName: name }));
  }, []);

  const setLearningGoal = useCallback((goal: string) => {
    setProgress((p) => ({ ...p, learningGoal: goal }));
  }, []);

  const setDailyGoalMinutes = useCallback((minutes: number) => {
    setProgress((p) => ({ ...p, dailyGoalMinutes: minutes }));
  }, []);

  const setAvatar = useCallback((avatar: string) => {
    setProgress((p) => ({ ...p, avatar }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setProgress((p) => ({ ...p, soundEnabled: enabled }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return (
    <UserProgressContext.Provider
      value={{
        ...progress,
        addXP,
        deductXP,
        completeLesson,
        masterWord,
        completeStory,
        incrementConversations,
        setUserLevel,
        completeDailyChallenge,
        setOnboarded,
        setLearningLanguage,
        setDisplayName,
        setLearningGoal,
        setDailyGoalMinutes,
        setAvatar,
        setSoundEnabled,
        resetProgress,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(UserProgressContext);
  if (!ctx) throw new Error("useProgress must be used within UserProgressProvider");
  return ctx;
}
