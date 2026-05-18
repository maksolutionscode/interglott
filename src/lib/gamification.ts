export interface Level {
  name: string;
  minXP: number;
  icon: string;
}

export const LEVELS: Level[] = [
  { name: "Débutant", minXP: 0, icon: "🌱" },
  { name: "Explorateur", minXP: 500, icon: "🧭" },
  { name: "Aventurier", minXP: 1500, icon: "⚔️" },
  { name: "Voyageur", minXP: 3500, icon: "🌍" },
  { name: "Connaisseur", minXP: 6000, icon: "🎓" },
  { name: "Maître", minXP: 10000, icon: "👑" },
];

export function getCurrentLevel(xp: number) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXP) level = l;
    else break;
  }
  return level;
}

export function getNextLevel(xp: number) {
  for (const l of LEVELS) {
    if (xp < l.minXP) return l;
  }
  return null;
}

export function getLevelProgress(xp: number): number {
  const current = getCurrentLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.round((progress / range) * 100);
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.0;
  if (streak >= 7) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
}

export function calculateXP(baseXP: number, streak: number): number {
  return Math.round(baseXP * getStreakMultiplier(streak));
}
