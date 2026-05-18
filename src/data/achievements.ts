export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}

export const achievements: Achievement[] = [
  { id: "first-lesson", title: "Premier Pas", description: "Complete your first lesson", icon: "🎯", condition: "completedLessons >= 1" },
  { id: "five-lessons", title: "Étudiant Assidu", description: "Complete 5 lessons", icon: "📚", condition: "completedLessons >= 5" },
  { id: "streak-3", title: "En Feu", description: "Maintain a 3-day streak", icon: "🔥", condition: "streak >= 3" },
  { id: "streak-7", title: "Semaine Parfaite", description: "Maintain a 7-day streak", icon: "⭐", condition: "streak >= 7" },
  { id: "streak-30", title: "Inarrêtable", description: "Maintain a 30-day streak", icon: "💎", condition: "streak >= 30" },
  { id: "vocab-10", title: "Collectionneur", description: "Master 10 vocabulary words", icon: "🃏", condition: "masteredWords >= 10" },
  { id: "xp-500", title: "Explorateur", description: "Earn 500 XP", icon: "🧭", condition: "xp >= 500" },
  { id: "xp-1500", title: "Aventurier", description: "Earn 1,500 XP", icon: "⚔️", condition: "xp >= 1500" },
  { id: "xp-5000", title: "Connaisseur", description: "Earn 5,000 XP", icon: "🎓", condition: "xp >= 5000" },
  { id: "first-convo", title: "Bavard", description: "Have your first AI conversation", icon: "💬", condition: "conversations >= 1" },
];

export function getUnlockedAchievements(stats: {
  completedLessons: number;
  streak: number;
  masteredWords: number;
  xp: number;
  conversations: number;
}): string[] {
  const unlocked: string[] = [];
  if (stats.completedLessons >= 1) unlocked.push("first-lesson");
  if (stats.completedLessons >= 5) unlocked.push("five-lessons");
  if (stats.streak >= 3) unlocked.push("streak-3");
  if (stats.streak >= 7) unlocked.push("streak-7");
  if (stats.streak >= 30) unlocked.push("streak-30");
  if (stats.masteredWords >= 10) unlocked.push("vocab-10");
  if (stats.xp >= 500) unlocked.push("xp-500");
  if (stats.xp >= 1500) unlocked.push("xp-1500");
  if (stats.xp >= 5000) unlocked.push("xp-5000");
  if (stats.conversations >= 1) unlocked.push("first-convo");
  return unlocked;
}
