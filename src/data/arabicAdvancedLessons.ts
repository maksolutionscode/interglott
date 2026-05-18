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
  level: "advanced",
  category: params.category,
  xpReward: params.xpReward,
  estimatedMinutes: params.estimatedMinutes,
  icon: params.icon,
  exercises: buildExercises(params.prefix, params.packs.mc, params.packs.fb),
});

export const arabicAdvancedLessons: Lesson[] = [
  makeLesson({
    id: "ar-adv-gerund",
    title: "Verbal Nouns & Participles",
    titleFr: "المصادر وأسماء الفاعل والمفعول",
    description: "Master Arabic verbal noun and participle forms",
    category: "Grammar",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "📝",
    prefix: "ager",
    packs: makeVocabPacks(
      [
        { ar: "مصدر", en: "verbal noun (masdar)" },
        { ar: "اسم فاعل", en: "active participle" },
        { ar: "اسم مفعول", en: "passive participle" },
        { ar: "كاتب", en: "writer (اسم فاعل من كتب)" },
        { ar: "مكتوب", en: "written (اسم مفعول من كتب)" },
        { ar: "قراءة", en: "reading (مصدر)" },
        { ar: "مقروء", en: "read (passive participle)" },
      ],
      {
        extraMC: [
          { q: "اختر اسم الفاعل من الفعل «درس».", options: ["دارس", "مدروس", "درس", "دراسة"], a: "دارس" },
          { q: "اختر اسم المفعول من الفعل «كتب».", options: ["مكتوب", "كاتب", "كتابة", "يكتب"], a: "مكتوب" },
        ],
        extraFB: [
          { q: "أكمل: مصدر «تعلم» هو _____.", a: "تعلم" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-adv-argumentation",
    title: "Argumentation & Opinion",
    titleFr: "الحجج والرأي",
    description: "Build arguments and express opinions in Arabic",
    category: "Communication",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "⚖️",
    prefix: "aarg",
    packs: makeVocabPacks(
      [
        { ar: "برأيي", en: "in my opinion" },
        { ar: "أرى أن", en: "I think that" },
        { ar: "من وجهة نظري", en: "from my point of view" },
        { ar: "على الرغم من", en: "although" },
        { ar: "بالإضافة إلى ذلك", en: "in addition" },
        { ar: "من ناحية أخرى", en: "on the other hand" },
        { ar: "لذلك", en: "therefore" },
        { ar: "بالتالي", en: "thus" },
      ],
      {
        extraMC: [
          { q: "اختر عبارة تعني on the other hand:", options: ["من ناحية أخرى", "لذلك", "برأيي", "مع السلامة"], a: "من ناحية أخرى" },
        ],
        extraFB: [{ q: "أكمل: برأيي، هذا القرار _____.", a: "مهم" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-adv-social-topics",
    title: "Social Topics & Texts",
    titleFr: "المواضيع الاجتماعية والنصوص",
    description: "Discuss social issues and analyze Arabic texts",
    category: "Culture",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "📰",
    prefix: "asoc",
    packs: makeVocabPacks(
      [
        { ar: "مجتمع", en: "society" },
        { ar: "قضية", en: "issue" },
        { ar: "تعليم", en: "education" },
        { ar: "صحة عامة", en: "public health" },
        { ar: "اقتصاد", en: "economy" },
        { ar: "بطالة", en: "unemployment" },
        { ar: "هجرة", en: "migration" },
        { ar: "بيئة", en: "environment" },
        { ar: "مساواة", en: "equality" },
      ],
      {
        extraMC: [
          {
            q: "اقرأ: «تؤثر البطالة على الاستقرار الاجتماعي». ما معنى «البطالة»؟",
            options: ["unemployment", "education", "economy", "health"],
            a: "unemployment",
          },
        ],
        extraFB: [{ q: "أكمل: حماية ____ مسؤولية الجميع.", a: "البيئة" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-adv-relative-clauses",
    title: "Complex Relative Clauses",
    titleFr: "جمل الصلة المعقدة",
    description: "Master complex relative clause structures",
    category: "Grammar",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "🔗",
    prefix: "arel",
    packs: makeVocabPacks(
      [
        { ar: "الذي", en: "who/that (m.)" },
        { ar: "التي", en: "who/that (f.)" },
        { ar: "اللذان", en: "who/that (dual m.)" },
        { ar: "اللتان", en: "who/that (dual f.)" },
        { ar: "الذين", en: "who/that (pl. m.)" },
        { ar: "اللواتي", en: "who/that (pl. f.)" },
      ],
      {
        extraMC: [
          { q: "اختر الاسم الموصول المناسب: المرأة ____ تسكن هنا.", options: ["التي", "الذي", "الذين", "اللواتي"], a: "التي" },
          { q: "اختر الاسم الموصول المناسب: الطلاب ____ نجحوا.", options: ["الذين", "التي", "الذي", "اللتان"], a: "الذين" },
        ],
        extraFB: [{ q: "أكمل: هذا هو الكتاب ____ قرأته.", a: "الذي" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-adv-subjunctive",
    title: "Advanced Subjunctive Mood",
    titleFr: "المنصوب المتقدم",
    description: "Master advanced subjunctive mood usage in Arabic",
    category: "Grammar",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "💭",
    prefix: "asub",
    packs: makeVocabPacks(
      [
        { ar: "أنْ", en: "to (subjunctive particle)" },
        { ar: "كي", en: "so that" },
        { ar: "لن", en: "will not (causes نصب)" },
        { ar: "حتى", en: "until/so that" },
        { ar: "لِـ", en: "in order to" },
      ],
      {
        extraMC: [
          { q: "أي أداة تجعل الفعل منصوباً؟", options: ["لن", "لم", "لا", "هل"], a: "لن" },
          { q: "أكمل: أريد أن ____ العربية.", options: ["أتعلّم", "تعلّمتُ", "تعلم", "يتعلم"], a: "أتعلّم" },
        ],
        extraFB: [{ q: "أكمل: سأدرس كي ____.", a: "أنجح" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-adv-connectors",
    title: "Advanced Connectors",
    titleFr: "أدوات الربط المتقدمة",
    description: "Use advanced logical connectors and transitions",
    category: "Grammar",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "🔄",
    prefix: "acon",
    packs: makeVocabPacks(
      [
        { ar: "مع ذلك", en: "however" },
        { ar: "بالرغم من ذلك", en: "nevertheless" },
        { ar: "علاوة على ذلك", en: "moreover" },
        { ar: "نتيجةً لذلك", en: "as a result" },
        { ar: "من ثم", en: "thereafter" },
        { ar: "في المقابل", en: "in contrast" },
      ],
      {
        extraMC: [
          { q: "اختر رابطاً يدل على contrast:", options: ["في المقابل", "لذلك", "ثم", "لأن"], a: "في المقابل" },
        ],
        extraFB: [{ q: "أكمل: كان الجو بارداً، ____ خرجنا.", a: "مع ذلك" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-adv-complex-sentences",
    title: "Complex Sentence Structures",
    titleFr: "التراكيب المعقدة",
    description: "Build sophisticated multi-clause sentences",
    category: "Grammar",
    xpReward: 120,
    estimatedMinutes: 30,
    icon: "🏗️",
    prefix: "acpx",
    packs: makeVocabPacks(
      [
        { ar: "على الرغم من", en: "although" },
        { ar: "بما أن", en: "since (because)" },
        { ar: "حينما", en: "when" },
        { ar: "لكي", en: "so that" },
        { ar: "حيث إن", en: "given that" },
      ],
      {
        extraMC: [
          { q: "اختر الرابط المناسب: سأبقى في البيت ____ تمطر.", options: ["لأن", "أين", "كم", "لكن"], a: "لأن" },
        ],
        extraFB: [{ q: "أكمل: بما أن الوقت متأخر، ____ نغادر.", a: "فلن" }],
      }
    ),
  }),
];
