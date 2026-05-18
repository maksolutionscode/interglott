import { type Exercise, type Lesson, type LessonLevel } from "@/data/lessons";
import { getLessonsForLanguage } from "@/data/lessonsByLanguage";
import { vocabulary, type VocabWord } from "@/data/vocabulary";
import type { LearningLanguage } from "@/contexts/UserProgressContext";

// ── Types ──────────────────────────────────────────────────────────

export type ConversationExerciseType =
  | "translate"
  | "fill-blank"
  | "translate-reverse"
  | "correct-sentence"
  | "vocab-recall";

export interface ConversationPrompt {
  id: string;
  type: ConversationExerciseType;
  instruction: string;
  sentence: string;
  correctAnswer: string;
  hint?: string;
  category: string;
  lessonTitle: string;
  difficulty: LessonLevel;
  grammarNote?: string;
}

// ── Helpers ────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const langLabel: Record<LearningLanguage, string> = {
  french: "French",
  spanish: "Spanish",
  chinese: "Chinese",
  german: "German",
  arabic: "Arabic",
};

// ── Prompt Builders ────────────────────────────────────────────────

/**
 * Build translate prompt from fill-blank exercises that contain
 * an English hint in parentheses, e.g.  "Je _____ français. (I speak French)"
 * Task: given the English phrase, produce the full target-language sentence.
 */
function fromFillBlankTranslate(
  ex: Exercise,
  lesson: Lesson,
  lang: LearningLanguage
): ConversationPrompt | null {
  if (ex.type !== "fill-blank") return null;

  // Extract English from parentheses
  const enMatch = ex.question.match(/\(([^)]+)\)/);
  if (!enMatch) return null;
  const english = enMatch[1].trim();

  // Build the full target-language answer by filling the blank
  const fullSentence = ex.question
    .replace(/\([^)]+\)/g, "")
    .replace(/_+/g, ex.correctAnswer)
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();

  if (!fullSentence || !english) return null;

  return {
    id: `tr-${ex.id}`,
    type: "translate",
    instruction: `Translate into ${langLabel[lang]}:`,
    sentence: english,
    correctAnswer: fullSentence,
    hint: ex.hint,
    category: lesson.category,
    lessonTitle: lesson.title,
    difficulty: lesson.level,
    grammarNote: `"${ex.correctAnswer}" fills the blank in "${ex.question.replace(/\([^)]+\)/g, "").trim()}"`,
  };
}

/**
 * Build a fill-in-the-blank prompt.
 * Shows the target-language sentence with a blank; user provides the missing word.
 */
function fromFillBlank(
  ex: Exercise,
  lesson: Lesson,
  lang: LearningLanguage
): ConversationPrompt | null {
  if (ex.type !== "fill-blank" || !ex.question.includes("_")) return null;

  // Keep English hint if present — it helps learners
  const cleaned = ex.question.trim();

  return {
    id: `fb-${ex.id}`,
    type: "fill-blank",
    instruction: `Fill in the missing word (${langLabel[lang]}):`,
    sentence: cleaned,
    correctAnswer: ex.correctAnswer,
    hint: ex.hint,
    category: lesson.category,
    lessonTitle: lesson.title,
    difficulty: lesson.level,
  };
}

/**
 * Build a reverse-translation prompt from multiple-choice questions
 * that ask "What does 'X' mean?" or "'X' means:"
 * Task: given the target-language word/phrase, user provides the English meaning.
 */
function fromMCReverse(
  ex: Exercise,
  lesson: Lesson,
  lang: LearningLanguage
): ConversationPrompt | null {
  if (ex.type !== "multiple-choice") return null;

  // Pattern: "What does 'X' mean?" or "'X' means:"
  const quotedMatch = ex.question.match(/['']([^'']+)['']/);
  if (!quotedMatch) return null;

  const targetPhrase = quotedMatch[1].trim();
  const englishAnswer = ex.correctAnswer;

  // Skip if the answer is clearly not an English translation (e.g. "4", "Yes")
  if (!englishAnswer || englishAnswer.length < 2) return null;

  return {
    id: `rv-${ex.id}`,
    type: "translate-reverse",
    instruction: `What does this ${langLabel[lang]} word/phrase mean in English?`,
    sentence: targetPhrase,
    correctAnswer: englishAnswer,
    hint: ex.hint,
    category: lesson.category,
    lessonTitle: lesson.title,
    difficulty: lesson.level,
  };
}

/**
 * Build a translate prompt from MC questions like "How do you say 'X' in French?"
 */
function fromMCTranslate(
  ex: Exercise,
  lesson: Lesson,
  lang: LearningLanguage
): ConversationPrompt | null {
  if (ex.type !== "multiple-choice") return null;
  if (!ex.question.toLowerCase().includes("how do you say")) return null;

  const quotedMatch = ex.question.match(/['']([^'']+)['']/);
  if (!quotedMatch) return null;

  const english = quotedMatch[1].trim();

  return {
    id: `mct-${ex.id}`,
    type: "translate",
    instruction: `Translate into ${langLabel[lang]}:`,
    sentence: english,
    correctAnswer: ex.correctAnswer,
    hint: ex.hint,
    category: lesson.category,
    lessonTitle: lesson.title,
    difficulty: lesson.level,
  };
}

/**
 * Build vocab-recall prompts from the vocabulary database.
 * Randomly picks direction: English→Target or Target→English.
 */
function fromVocab(
  word: VocabWord,
  lang: LearningLanguage
): ConversationPrompt | null {
  // Vocabulary data is French-only for now
  if (lang !== "french") return null;

  const toTarget = Math.random() > 0.5;

  if (toTarget) {
    return {
      id: `voc-t-${word.id}`,
      type: "vocab-recall",
      instruction: `How do you say this in ${langLabel[lang]}?`,
      sentence: word.english,
      correctAnswer: word.french,
      hint: `Category: ${word.category}`,
      category: word.category,
      lessonTitle: "Vocabulary",
      difficulty: word.level,
      grammarNote: `Example: "${word.example}"`,
    };
  }

  return {
    id: `voc-e-${word.id}`,
    type: "translate-reverse",
    instruction: `What does this ${langLabel[lang]} word mean in English?`,
    sentence: word.french,
    correctAnswer: word.english,
    hint: `Category: ${word.category}`,
    category: word.category,
    lessonTitle: "Vocabulary",
    difficulty: word.level,
    grammarNote: `Example: "${word.example}"`,
  };
}

/**
 * Build a "correct the sentence" prompt by introducing a deliberate error.
 */
function fromFillBlankCorrection(
  ex: Exercise,
  lesson: Lesson,
  lang: LearningLanguage
): ConversationPrompt | null {
  if (ex.type !== "fill-blank") return null;

  const enMatch = ex.question.match(/\(([^)]+)\)/);
  if (!enMatch) return null;

  // Build the correct sentence
  const correct = ex.question
    .replace(/\([^)]+\)/g, "")
    .replace(/_+/g, ex.correctAnswer)
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();

  if (!correct || correct.length < 5) return null;

  // Introduce an error: scramble the key word
  const words = correct.split(" ");
  if (words.length < 3) return null;

  // Find the index of the correct answer word and replace it with a wrong version
  const answerIdx = words.findIndex(
    (w) => w.toLowerCase().replace(/[.,!?;:]/g, "") === ex.correctAnswer.toLowerCase()
  );

  if (answerIdx === -1) return null;

  // Simple error: reverse the word or replace with "___"
  const errorWord = ex.correctAnswer.split("").reverse().join("");
  const wrongSentence = words
    .map((w, i) => (i === answerIdx ? errorWord : w))
    .join(" ");

  // Only use if the error word is clearly different
  if (errorWord.toLowerCase() === ex.correctAnswer.toLowerCase()) return null;

  return {
    id: `cor-${ex.id}`,
    type: "correct-sentence",
    instruction: `This ${langLabel[lang]} sentence has an error. Write the corrected version:`,
    sentence: wrongSentence,
    correctAnswer: correct,
    hint: `The error is in the word "${errorWord}"`,
    category: lesson.category,
    lessonTitle: lesson.title,
    difficulty: lesson.level,
    grammarNote: `The correct word is "${ex.correctAnswer}"`,
  };
}

// ── Main Generator ─────────────────────────────────────────────────

/**
 * Generate conversation prompts with adaptive difficulty.
 *
 * @param level         Current user level
 * @param usedIds       Set of already-used prompt IDs (prevents repeats)
 * @param count         Number of prompts to return
 * @param lang          Learning language
 * @param correctRate   Recent correct-answer rate (0-1) for adaptive difficulty
 */
export function generatePrompts(
  level: LessonLevel,
  usedIds: Set<string>,
  count: number = 1,
  lang: LearningLanguage = "french",
  correctRate: number = 0.5
): ConversationPrompt[] {
  const levelOrder: LessonLevel[] = ["beginner", "intermediate", "advanced"];
  const levelIdx = levelOrder.indexOf(level);

  // Adaptive: if doing well, include harder; if struggling, include easier
  let allowedLevels: LessonLevel[];
  if (correctRate >= 0.8 && levelIdx < 2) {
    // Doing great → add next level
    allowedLevels = levelOrder.slice(levelIdx, levelIdx + 2);
  } else if (correctRate < 0.4 && levelIdx > 0) {
    // Struggling → drop down
    allowedLevels = levelOrder.slice(levelIdx - 1, levelIdx + 1);
  } else {
    // Normal → current level ± adjacent
    allowedLevels = levelOrder.slice(Math.max(0, levelIdx - 1), levelIdx + 2);
  }

  const allLessons = getLessonsForLanguage(lang);
  const filteredLessons = allLessons.filter((l) => allowedLevels.includes(l.level));

  const allPrompts: ConversationPrompt[] = [];

  // Build prompts from lesson exercises
  for (const lesson of filteredLessons) {
    for (const exercise of lesson.exercises) {
      const builders = [
        fromFillBlankTranslate,
        fromFillBlank,
        fromMCReverse,
        fromMCTranslate,
        fromFillBlankCorrection,
      ];
      for (const builder of builders) {
        const prompt = builder(exercise, lesson, lang);
        if (prompt && !usedIds.has(prompt.id)) {
          allPrompts.push(prompt);
        }
      }
    }
  }

  // Build prompts from vocabulary database
  const filteredVocab = vocabulary.filter((v) => allowedLevels.includes(v.level));
  for (const word of filteredVocab) {
    const prompt = fromVocab(word, lang);
    if (prompt && !usedIds.has(prompt.id)) {
      allPrompts.push(prompt);
    }
  }

  // Shuffle and return
  return shuffle(allPrompts).slice(0, count);
}

// ── Answer Evaluation ──────────────────────────────────────────────

export function evaluateAnswer(
  userAnswer: string,
  prompt: ConversationPrompt
): { isCorrect: boolean; isClose: boolean; similarity: number } {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[''`]/g, "'")
      .replace(/[\u00A0]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[?!.,;:"""«»]/g, "")
      .trim();

  const na = normalize(userAnswer);
  const nb = normalize(prompt.correctAnswer);

  if (na === nb) return { isCorrect: true, isClose: false, similarity: 1 };

  // Word-level similarity
  const wordsA = na.split(" ");
  const wordsB = nb.split(" ");
  const matching = wordsA.filter((w) => wordsB.includes(w)).length;
  const sim = matching / Math.max(wordsA.length, wordsB.length);

  // For single-word answers, use character-level check
  if (wordsB.length === 1 && wordsA.length === 1) {
    const charSim = levenshteinSimilarity(na, nb);
    return {
      isCorrect: charSim >= 0.9,
      isClose: charSim >= 0.6 && charSim < 0.9,
      similarity: charSim,
    };
  }

  return {
    isCorrect: sim >= 0.85,
    isClose: sim >= 0.5 && sim < 0.85,
    similarity: sim,
  };
}

function levenshteinSimilarity(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [i];
    for (let j = 1; j <= b.length; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  }
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - matrix[a.length][b.length] / maxLen;
}

// ── Feedback Builder ───────────────────────────────────────────────

export function buildFeedback(
  result: { isCorrect: boolean; isClose: boolean },
  prompt: ConversationPrompt
): string {
  const correct = [
    "Perfect! 🎉",
    "Excellent! 🌟",
    "That's right! 👏",
    "Bravo! 🎊",
    "Great job! 💪",
    "Nailed it! ✨",
    "Spot on! 🏆",
  ];
  const close = [
    "Almost there! 🟡",
    "So close! 🟡",
    "Nearly perfect! 🟡",
    "Good attempt! 🟡",
  ];
  const wrong = [
    "Not quite — keep practicing! ❌",
    "Keep trying, you'll get it! ❌",
    "That's okay — learning takes time! ❌",
    "Not this time, but you're improving! ❌",
  ];

  let msg: string;

  if (result.isCorrect) {
    msg = `${pickRandom(correct)}\n\n✅ **"${prompt.correctAnswer}"**`;
  } else if (result.isClose) {
    msg = `${pickRandom(close)}\n\n✅ Correct answer: **"${prompt.correctAnswer}"**`;
  } else {
    msg = `${pickRandom(wrong)}\n\n✅ Correct answer: **"${prompt.correctAnswer}"**`;
  }

  // Add grammar note for learning
  if (prompt.grammarNote) {
    msg += `\n\n📖 ${prompt.grammarNote}`;
  } else if (prompt.hint && !result.isCorrect) {
    msg += `\n\n💡 ${prompt.hint}`;
  }

  return msg;
}

// ── Prompt Display ─────────────────────────────────────────────────

const typeIcons: Record<ConversationExerciseType, string> = {
  translate: "🔄",
  "fill-blank": "📝",
  "translate-reverse": "🔁",
  "correct-sentence": "✏️",
  "vocab-recall": "💬",
};

const typeLabels: Record<ConversationExerciseType, string> = {
  translate: "Translation",
  "fill-blank": "Fill in the Blank",
  "translate-reverse": "Translate to English",
  "correct-sentence": "Correct the Sentence",
  "vocab-recall": "Vocabulary Recall",
};

export function buildPromptMessage(prompt: ConversationPrompt): string {
  const icon = typeIcons[prompt.type];
  const label = typeLabels[prompt.type];

  return `**${icon} ${label}** — *${prompt.lessonTitle}*\n\n${prompt.instruction}\n\n> ${prompt.sentence}`;
}
