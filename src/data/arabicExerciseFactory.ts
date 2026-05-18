import type { Exercise } from "./lessons";

export type MCItem = { q: string; options: string[]; a: string; hint?: string };
export type FBItem = { q: string; a: string; hint?: string };

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeOptions(options: string[], answer: string): string[] {
  const base = uniq([answer, ...options]).filter((x) => typeof x === "string" && x.trim().length > 0);
  while (base.length < 4) base.push(answer);

  const shuffled = shuffle(base);
  const picked = shuffled.slice(0, 4);
  if (!picked.includes(answer)) {
    picked[Math.floor(Math.random() * picked.length)] = answer;
  }
  return picked;
}

export function buildExercises(prefix: string, mc: MCItem[], fb: FBItem[]): Exercise[] {
  const mcSafe = mc.length ? mc : [{ q: "اختر الإجابة الصحيحة.", options: ["نعم", "لا", "ربما", "حسناً"], a: "نعم" }];
  const fbSafe = fb.length ? fb : [{ q: "أكمل: أنا _____.", a: "هنا" }];

  const exercises: Exercise[] = [];
  for (let i = 1; i <= 50; i++) {
    const isMC = i % 2 === 1;
    if (isMC) {
      const item = mcSafe[(i - 1) % mcSafe.length];
      exercises.push({
        id: `ar-${prefix}${i}`,
        type: "multiple-choice",
        question: item.q,
        options: normalizeOptions(item.options, item.a),
        correctAnswer: item.a,
        hint: item.hint,
      });
    } else {
      const item = fbSafe[(i - 1) % fbSafe.length];
      exercises.push({
        id: `ar-${prefix}${i}`,
        type: "fill-blank",
        question: item.q,
        correctAnswer: item.a,
        hint: item.hint,
      });
    }
  }
  return exercises;
}

export function makeVocabPacks(
  pairs: { ar: string; en: string }[],
  opts?: { extraMC?: MCItem[]; extraFB?: FBItem[] }
): { mc: MCItem[]; fb: FBItem[] } {
  const safePairs = pairs.filter((p) => p.ar && p.en);
  const allEn = safePairs.map((p) => p.en);
  const allAr = safePairs.map((p) => p.ar);

  const mc: MCItem[] = safePairs.flatMap((p) => {
    const enDistractors = shuffle(allEn.filter((x) => x !== p.en)).slice(0, 3);
    const arDistractors = shuffle(allAr.filter((x) => x !== p.ar)).slice(0, 3);

    return [
      {
        q: `ما معنى «${p.ar}»؟`,
        options: [p.en, ...enDistractors],
        a: p.en,
      },
      {
        q: `اختر الترجمة العربية الصحيحة لـ “${p.en}”.`,
        options: [p.ar, ...arDistractors],
        a: p.ar,
      },
    ];
  });

  const fb: FBItem[] = safePairs.map((p) => ({
    q: `أكمل: الترجمة العربية لـ “${p.en}” هي _____.`,
    a: p.ar,
  }));

  return {
    mc: [...(opts?.extraMC ?? []), ...mc],
    fb: [...(opts?.extraFB ?? []), ...fb],
  };
}
