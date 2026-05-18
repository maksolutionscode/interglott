import type { Lesson } from "./lessons";
import { buildExercises, makeVocabPacks, type MCItem, type FBItem } from "./arabicExerciseFactory";

const makeLesson = (params: {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  category: string;
  xpReward: number;
  estimatedMinutes: number;
  icon: string;
  prefix: string;
  packs: { mc: MCItem[]; fb: FBItem[] };
}): Lesson => ({
  id: params.id,
  title: params.title,
  titleFr: params.titleFr,
  description: params.description,
  level: "intermediate",
  category: params.category,
  xpReward: params.xpReward,
  estimatedMinutes: params.estimatedMinutes,
  icon: params.icon,
  exercises: buildExercises(params.prefix, params.packs.mc, params.packs.fb),
});

export const arabicIntermediateExtended: Lesson[] = [
  makeLesson({
    id: "ar-int-uncertainty",
    title: "Expressing Uncertainty",
    titleFr: "التعبير عن عدم اليقين",
    description: "Express doubt and uncertainty in Arabic",
    category: "Communication",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "🤔",
    prefix: "unc",
    packs: makeVocabPacks(
      [
        { ar: "ربما", en: "maybe" },
        { ar: "أظن", en: "I think" },
        { ar: "لست متأكداً", en: "I'm not sure" },
        { ar: "من المحتمل", en: "it's likely" },
        { ar: "غير متأكد", en: "uncertain" },
        { ar: "قد", en: "might/may" },
      ],
      {
        extraMC: [
          { q: "اختر عبارة عدم اليقين:", options: ["لست متأكداً", "بالطبع", "أكيد", "نعم"], a: "لست متأكداً" },
        ],
        extraFB: [{ q: "أكمل: ____ نذهب غداً.", a: "ربما" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-real-life",
    title: "Real-Life Conversations",
    titleFr: "محادثات واقعية",
    description: "Practice real-life Arabic conversations",
    category: "Communication",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "💬",
    prefix: "rl",
    packs: makeVocabPacks(
      [
        { ar: "أريد…", en: "I want…" },
        { ar: "من فضلك", en: "please" },
        { ar: "كم السعر؟", en: "How much is it?" },
        { ar: "أين يقع…؟", en: "Where is… located?" },
        { ar: "هل يوجد…؟", en: "Is there…?" },
        { ar: "هذا جيد", en: "That's good" },
        { ar: "لا مشكلة", en: "No problem" },
      ],
      {
        extraMC: [
          { q: "في مطعم: كيف تطلب ماء؟", options: ["أريد ماءً من فضلك", "أنا طالب", "أين البنك؟", "هذا غالي"], a: "أريد ماءً من فضلك" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-clarification",
    title: "Asking for Clarification",
    titleFr: "طلب التوضيح",
    description: "Learn to ask for clarification",
    category: "Communication",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "❓",
    prefix: "clr",
    packs: makeVocabPacks(
      [
        { ar: "ماذا تقصد؟", en: "What do you mean?" },
        { ar: "هل يمكنك التوضيح؟", en: "Can you clarify?" },
        { ar: "لم أفهم", en: "I didn't understand" },
        { ar: "هل يمكنك أن تعيد؟", en: "Can you repeat?" },
        { ar: "ببطء من فضلك", en: "Slowly, please" },
      ],
      {
        extraFB: [{ q: "أكمل: هل يمكنك ____؟ (clarify)", a: "التوضيح" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-obligation",
    title: "Expressing Obligation",
    titleFr: "التعبير عن الالتزام",
    description: "Express obligation in Arabic",
    category: "Grammar",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "⚠️",
    prefix: "obl",
    packs: makeVocabPacks(
      [
        { ar: "يجب أن", en: "must" },
        { ar: "لازم", en: "have to (common)" },
        { ar: "من الضروري أن", en: "it's necessary to" },
        { ar: "ممنوع", en: "forbidden" },
        { ar: "مسموح", en: "allowed" },
      ],
      {
        extraMC: [
          { q: "اختر كلمة تعني forbidden:", options: ["ممنوع", "مسموح", "ضروري", "ربما"], a: "ممنوع" },
          { q: "أكمل: ____ تدرس اليوم.", options: ["يجب أن", "لن", "لم", "أمام"], a: "يجب أن" },
        ],
        extraFB: [{ q: "أكمل: من ____ أن نبدأ الآن.", a: "الضروري" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-conditional",
    title: "Conditional Tense",
    titleFr: "الشرط (Ash-Sharṭ)",
    description: "Master conditional structures",
    category: "Grammar",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "🔀",
    prefix: "cnd",
    packs: makeVocabPacks(
      [
        { ar: "إذا", en: "if (likely)" },
        { ar: "لو", en: "if (hypothetical)" },
        { ar: "إنْ", en: "if (jussive)" },
        { ar: "كلما", en: "whenever" },
        { ar: "حتى لو", en: "even if" },
      ],
      {
        extraFB: [{ q: "أكمل: ____ درستَ نجحتَ.", a: "إذا" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-probability",
    title: "Expressing Probability",
    titleFr: "التعبير عن الاحتمال",
    description: "Express likelihood in Arabic",
    category: "Communication",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "📈",
    prefix: "prb",
    packs: makeVocabPacks(
      [
        { ar: "غالباً", en: "often / usually" },
        { ar: "على الأرجح", en: "most likely" },
        { ar: "من الممكن", en: "possible" },
        { ar: "من غير المحتمل", en: "unlikely" },
        { ar: "قد", en: "might" },
      ],
      {
        extraMC: [{ q: "اختر عبارة تعني most likely:", options: ["على الأرجح", "ممنوع", "أمام", "قليل"], a: "على الأرجح" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-advice",
    title: "Giving Advice",
    titleFr: "تقديم النصائح (Taqdīm An-Naṣāʾiḥ)",
    description: "Give and receive advice in Arabic",
    category: "Communication",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "💡",
    prefix: "advc",
    packs: makeVocabPacks(
      [
        { ar: "أنصحك أن…", en: "I advise you to…" },
        { ar: "من الأفضل أن…", en: "It's better to…" },
        { ar: "لا تنسَ", en: "Don't forget" },
        { ar: "حاول أن…", en: "Try to…" },
        { ar: "خذ قسطاً من الراحة", en: "Take a rest" },
      ],
      {
        extraFB: [{ q: "أكمل: من الأفضل ____ تنام مبكراً.", a: "أن" }],
      }
    ),
  }),
];
