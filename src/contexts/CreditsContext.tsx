import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const FREE_DAILY_CREDITS = 10;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000;

export const CREDIT_COSTS: Record<string, number> = {
  lesson: 2,
  exercise: 1,
  story: 2,
  conversation: 3,
};

export type PlanType = "free" | "basic_premium" | "pro";

interface CreditsState {
  creditsRemaining: number;
  dailyCredits: number;
  lastResetTimestamp: string;
  plan: PlanType;
  bonusCredits: number;
  shareBonus: boolean;
}

interface CreditsContextType extends CreditsState {
  spendCredits: (activityType: string) => boolean;
  canAfford: (activityType: string) => boolean;
  timeUntilReset: string;
  isPremium: boolean;
  upgradePlan: (plan: PlanType) => void;
  buyCredits: (amount: number) => void;
  awardLoginBonus: () => void;
  awardStreakBonus: (streakDays: number) => void;
}

const defaultState: CreditsState = {
  creditsRemaining: FREE_DAILY_CREDITS,
  dailyCredits: FREE_DAILY_CREDITS,
  lastResetTimestamp: new Date().toISOString(),
  plan: "free",
  bonusCredits: 0,
  shareBonus: false,
};

const CreditsContext = createContext<CreditsContextType | null>(null);

function getTimeUntilReset(lastReset: string): string {
  const resetTime = new Date(lastReset).getTime() + RESET_INTERVAL_MS;
  const now = Date.now();
  const diff = Math.max(0, resetTime - now);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shouldReset(lastReset: string): boolean {
  return Date.now() - new Date(lastReset).getTime() >= RESET_INTERVAL_MS;
}

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CreditsState>(() => {
    try {
      const stored = localStorage.getItem("interglott-credits");
      if (stored) {
        const parsed = JSON.parse(stored) as CreditsState;
        if (shouldReset(parsed.lastResetTimestamp)) {
          return {
            ...parsed,
            creditsRemaining: parsed.dailyCredits + parsed.bonusCredits,
            lastResetTimestamp: new Date().toISOString(),
            bonusCredits: 0,
          };
        }
        return { ...defaultState, ...parsed };
      }
    } catch {}
    return defaultState;
  });

  const [resetTimer, setResetTimer] = useState(() => getTimeUntilReset(state.lastResetTimestamp));

  // Persist
  useEffect(() => {
    localStorage.setItem("interglott-credits", JSON.stringify(state));
  }, [state]);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldReset(state.lastResetTimestamp)) {
        setState((s) => ({
          ...s,
          creditsRemaining: s.dailyCredits + s.bonusCredits,
          lastResetTimestamp: new Date().toISOString(),
          bonusCredits: 0,
        }));
      }
      setResetTimer(getTimeUntilReset(state.lastResetTimestamp));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.lastResetTimestamp, state.dailyCredits, state.bonusCredits]);

  const isPremium = state.plan !== "free";

  const canAfford = useCallback(
    (activityType: string) => {
      if (isPremium) return true;
      const cost = CREDIT_COSTS[activityType] ?? 1;
      return state.creditsRemaining >= cost;
    },
    [state.creditsRemaining, isPremium]
  );

  const spendCredits = useCallback(
    (activityType: string): boolean => {
      if (isPremium) return true;
      const cost = CREDIT_COSTS[activityType] ?? 1;
      if (state.creditsRemaining < cost) return false;
      setState((s) => ({ ...s, creditsRemaining: s.creditsRemaining - cost }));
      return true;
    },
    [state.creditsRemaining, isPremium]
  );

  const upgradePlan = useCallback((plan: PlanType) => {
    setState((s) => ({
      ...s,
      plan,
      dailyCredits: plan === "free" ? FREE_DAILY_CREDITS : 9999,
      creditsRemaining: plan === "free" ? s.creditsRemaining : 9999,
    }));
  }, []);

  const buyCredits = useCallback((amount: number) => {
    setState((s) => ({ ...s, creditsRemaining: s.creditsRemaining + amount }));
  }, []);

  const awardLoginBonus = useCallback(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem("interglott-last-login-bonus");
    if (lastLogin === today) return;
    localStorage.setItem("interglott-last-login-bonus", today);
    setState((s) => ({ ...s, creditsRemaining: s.creditsRemaining + 2 }));
  }, []);

  const awardStreakBonus = useCallback((streakDays: number) => {
    let bonus = 0;
    if (streakDays >= 30) bonus = 15;
    else if (streakDays >= 7) bonus = 5;
    if (bonus > 0) {
      setState((s) => ({ ...s, bonusCredits: s.bonusCredits + bonus }));
    }
  }, []);

  return (
    <CreditsContext.Provider
      value={{
        ...state,
        spendCredits,
        canAfford,
        timeUntilReset: resetTimer,
        isPremium,
        upgradePlan,
        buyCredits,
        awardLoginBonus,
        awardStreakBonus,
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error("useCredits must be used within CreditsProvider");
  return ctx;
}
