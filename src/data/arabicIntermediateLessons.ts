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

export const arabicIntermediateLessons: Lesson[] = [
  makeLesson({
    id: "ar-int-negation",
    title: "Negation",
    titleFr: "النفي (An-Nafī)",
    description: "Master Arabic negation patterns",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🚫",
    prefix: "neg",
    packs: makeVocabPacks(
      [
        { ar: "لا", en: "not (present)" },
        { ar: "ليس", en: "is not" },
        { ar: "لم", en: "did not (past)" },
        { ar: "لن", en: "will not" },
        { ar: "ما", en: "not (colloquial/varies)" },
      ],
      {
        extraMC: [
          { q: "اختر أداة النفي المناسبة: أنا ____ طالباً.", options: ["لستُ", "لم", "لن", "لا"], a: "لستُ" },
          { q: "اختر أداة النفي للماضي: ____ ذهبتُ إلى المدرسة أمس.", options: ["لم", "لن", "لا", "ليس"], a: "لم" },
          { q: "اختر أداة النفي للمستقبل: ____ أسافر غداً.", options: ["لن", "لم", "لا", "ليس"], a: "لن" },
        ],
        extraFB: [
          { q: "أكمل: أنا ____ متعباً. (I am not tired)", a: "لستُ" },
          { q: "أكمل: ____ أكلتُ. (I did not eat)", a: "لم" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-asking-help",
    title: "Asking for Help",
    titleFr: "طلب المساعدة (Ṭalab Al-Musāʿada)",
    description: "Learn to ask for help in Arabic",
    category: "Communication",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🆘",
    prefix: "hlp",
    packs: makeVocabPacks(
      [
        { ar: "هل يمكنك مساعدتي؟", en: "Can you help me?" },
        { ar: "أحتاج إلى مساعدة", en: "I need help" },
        { ar: "لو سمحت", en: "please" },
        { ar: "أين…؟", en: "Where is…?" },
        { ar: "لا أفهم", en: "I don't understand" },
        { ar: "هل يمكنك الإعادة؟", en: "Can you repeat?" },
        { ar: "ما معنى هذا؟", en: "What does this mean?" },
        { ar: "هل تتكلم الإنجليزية؟", en: "Do you speak English?" },
      ],
      {
        extraMC: [
          { q: "أي عبارة تعني: I need help", options: ["أحتاج إلى مساعدة", "أنا بخير", "مع السلامة", "لا بأس"], a: "أحتاج إلى مساعدة" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-directions",
    title: "Prepositions & Directions",
    titleFr: "حروف الجر والاتجاهات",
    description: "Master prepositions and directions in Arabic",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🧭",
    prefix: "dir",
    packs: makeVocabPacks(
      [
        { ar: "أمام", en: "in front of" },
        { ar: "خلف", en: "behind" },
        { ar: "بجانب", en: "next to" },
        { ar: "بين", en: "between" },
        { ar: "فوق", en: "above" },
        { ar: "تحت", en: "under" },
        { ar: "قريب من", en: "near" },
        { ar: "بعيد عن", en: "far from" },
        { ar: "يمين", en: "right" },
        { ar: "يسار", en: "left" },
      ],
      {
        extraMC: [
          { q: "أكمل: البنك ____ المطعم. (next to)", options: ["بجانب", "تحت", "خلف", "بين"], a: "بجانب" },
        ],
        extraFB: [
          { q: "أكمل: امشِ إلى ____ ثم انعطف يميناً. (left)", a: "اليسار" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-city",
    title: "Talking About the City",
    titleFr: "الحديث عن المدينة",
    description: "Describe cities in Arabic",
    category: "Vocabulary",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🏙️",
    prefix: "cty",
    packs: makeVocabPacks(
      [
        { ar: "مدينة", en: "city" },
        { ar: "شارع", en: "street" },
        { ar: "ساحة", en: "square" },
        { ar: "حديقة", en: "park" },
        { ar: "متحف", en: "museum" },
        { ar: "مسجد", en: "mosque" },
        { ar: "مترو", en: "metro" },
        { ar: "ازدحام", en: "traffic" },
        { ar: "مركز المدينة", en: "city center" },
        { ar: "ضاحية", en: "suburb" },
      ]
    ),
  }),

  makeLesson({
    id: "ar-int-quantities",
    title: "Talking About Quantities",
    titleFr: "الحديث عن الكميات",
    description: "Express quantities in Arabic",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "⚖️",
    prefix: "qty",
    packs: makeVocabPacks(
      [
        { ar: "كثير", en: "a lot" },
        { ar: "قليل", en: "a little" },
        { ar: "بعض", en: "some" },
        { ar: "كل", en: "all" },
        { ar: "معظم", en: "most" },
        { ar: "نصف", en: "half" },
        { ar: "ربع", en: "quarter" },
        { ar: "أكثر", en: "more" },
        { ar: "أقل", en: "less" },
      ],
      {
        extraFB: [
          { q: "أكمل: أريد ____ ماء. (a little)", a: "قليلاً" },
          { q: "أكمل: عندي ____ أسئلة. (a lot)", a: "الكثير" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-adverbs",
    title: "Adverbs",
    titleFr: "الظروف (Aẓ-Ẓurūf)",
    description: "Learn and use Arabic adverbs",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "📝",
    prefix: "adv",
    packs: makeVocabPacks(
      [
        { ar: "الآن", en: "now" },
        { ar: "دائماً", en: "always" },
        { ar: "أحياناً", en: "sometimes" },
        { ar: "نادراً", en: "rarely" },
        { ar: "سريعاً", en: "quickly" },
        { ar: "ببطء", en: "slowly" },
        { ar: "هنا", en: "here" },
        { ar: "هناك", en: "there" },
      ],
      {
        extraMC: [
          { q: "اختر الظرف المناسب: أنا أدرس ____ . (always)", options: ["دائماً", "أمس", "غداً", "قليلاً"], a: "دائماً" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-verb-tenses",
    title: "Verb Conjugation: Past, Present & Future",
    titleFr: "تصريف الأفعال",
    description: "Master Arabic verb tenses",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "⏳",
    prefix: "vt",
    packs: makeVocabPacks(
      [
        { ar: "ذهب", en: "he went" },
        { ar: "يذهب", en: "he goes" },
        { ar: "سيذهب", en: "he will go" },
        { ar: "كتب", en: "he wrote" },
        { ar: "يكتب", en: "he writes" },
        { ar: "سيكتب", en: "he will write" },
        { ar: "قرأ", en: "he read" },
        { ar: "يقرأ", en: "he reads" },
        { ar: "سيقرأ", en: "he will read" },
      ],
      {
        extraMC: [
          { q: "اختر علامة المستقبل في العربية الفصحى.", options: ["سـ", "لم", "قد", "ليس"], a: "سـ" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-comparatives",
    title: "Comparatives & Superlatives",
    titleFr: "المقارنة والتفضيل",
    description: "Compare things in Arabic",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "📊",
    prefix: "comp",
    packs: makeVocabPacks(
      [
        { ar: "أكبر", en: "bigger" },
        { ar: "أصغر", en: "smaller" },
        { ar: "أسرع", en: "faster" },
        { ar: "أبطأ", en: "slower" },
        { ar: "أفضل", en: "better / best" },
        { ar: "أسوأ", en: "worse" },
        { ar: "أكثر", en: "more" },
        { ar: "أقل", en: "less" },
      ],
      {
        extraFB: [{ q: "أكمل: هذا الكتاب ____ من ذاك. (bigger)", a: "أكبر" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-pronouns",
    title: "Pronouns",
    titleFr: "الضمائر (Aḍ-Ḍamāʾir)",
    description: "Master Arabic pronouns",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "👤",
    prefix: "pro",
    packs: makeVocabPacks(
      [
        { ar: "أنا", en: "I" },
        { ar: "أنتَ", en: "you (m.)" },
        { ar: "أنتِ", en: "you (f.)" },
        { ar: "هو", en: "he" },
        { ar: "هي", en: "she" },
        { ar: "نحن", en: "we" },
        { ar: "أنتم", en: "you (pl.)" },
        { ar: "هم", en: "they" },
      ],
      {
        extraMC: [
          { q: "اختر الضمير المناسب: ____ طالب. (he)", options: ["هو", "هي", "أنا", "نحن"], a: "هو" },
        ],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-agree-disagree",
    title: "Agreeing & Disagreeing",
    titleFr: "الموافقة والاعتراض",
    description: "Express agreement and disagreement",
    category: "Communication",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🤝",
    prefix: "agr",
    packs: makeVocabPacks(
      [
        { ar: "نعم", en: "yes" },
        { ar: "لا", en: "no" },
        { ar: "أتفق", en: "I agree" },
        { ar: "لا أتفق", en: "I disagree" },
        { ar: "ربما", en: "maybe" },
        { ar: "بالطبع", en: "of course" },
        { ar: "ليس بالضرورة", en: "not necessarily" },
      ],
      {
        extraMC: [{ q: "اختر الرد المناسب: هل تريد قهوة؟", options: ["نعم، من فضلك", "إلى اللقاء", "أمس", "لماذا؟"], a: "نعم، من فضلك" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-suggestions",
    title: "Making Suggestions",
    titleFr: "تقديم الاقتراحات",
    description: "Make and respond to suggestions",
    category: "Communication",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "💡",
    prefix: "sug",
    packs: makeVocabPacks(
      [
        { ar: "ما رأيك أن…؟", en: "What do you think about…?" },
        { ar: "لنذهب إلى…", en: "Let's go to…" },
        { ar: "لماذا لا…؟", en: "Why don't we…?" },
        { ar: "يمكننا أن…", en: "We can…" },
        { ar: "فكرة جيدة", en: "Good idea" },
        { ar: "فكرة ممتازة", en: "Great idea" },
      ]
    ),
  }),

  makeLesson({
    id: "ar-int-giving-reasons",
    title: "Giving Reasons",
    titleFr: "تقديم الأسباب",
    description: "Express reasons in Arabic",
    category: "Communication",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🔍",
    prefix: "rea",
    packs: makeVocabPacks(
      [
        { ar: "لأن", en: "because" },
        { ar: "بسبب", en: "due to" },
        { ar: "لذلك", en: "therefore" },
        { ar: "لهذا السبب", en: "for this reason" },
        { ar: "على الرغم من", en: "although" },
      ],
      {
        extraFB: [{ q: "أكمل: لم أذهب ____ كنتُ مريضاً.", a: "لأن" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-travel",
    title: "Travel & Tourism",
    titleFr: "السفر والسياحة (As-Safar was-Siyāḥa)",
    description: "Essential travel vocabulary in Arabic",
    category: "Vocabulary",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "✈️",
    prefix: "trv",
    packs: makeVocabPacks(
      [
        { ar: "مطار", en: "airport" },
        { ar: "جواز سفر", en: "passport" },
        { ar: "تذكرة", en: "ticket" },
        { ar: "فندق", en: "hotel" },
        { ar: "حجز", en: "reservation" },
        { ar: "غرفة", en: "room" },
        { ar: "خريطة", en: "map" },
        { ar: "سائح", en: "tourist" },
        { ar: "رحلة", en: "trip" },
      ],
      {
        extraMC: [{ q: "أي كلمة تعني passport؟", options: ["جواز سفر", "تذكرة", "خريطة", "غرفة"], a: "جواز سفر" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-social",
    title: "Social Interactions",
    titleFr: "التفاعلات الاجتماعية",
    description: "Navigate social situations in Arabic",
    category: "Communication",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🗣️",
    prefix: "soc",
    packs: makeVocabPacks(
      [
        { ar: "تشرفت بلقائك", en: "Nice to meet you" },
        { ar: "كيف حالك؟", en: "How are you?" },
        { ar: "أنا بخير", en: "I'm fine" },
        { ar: "من أين أنت؟", en: "Where are you from?" },
        { ar: "تفضل", en: "Go ahead / Here you go" },
        { ar: "سعيد جداً", en: "Very happy" },
      ]
    ),
  }),

  makeLesson({
    id: "ar-int-health",
    title: "Health & Illness",
    titleFr: "الصحة والمرض (Aṣ-Ṣiḥḥa wal-Maraḍ)",
    description: "Discuss health topics in Arabic",
    category: "Vocabulary",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🏥",
    prefix: "hlt",
    packs: makeVocabPacks(
      [
        { ar: "طبيب", en: "doctor" },
        { ar: "ممرضة", en: "nurse" },
        { ar: "دواء", en: "medicine" },
        { ar: "ألم", en: "pain" },
        { ar: "حمّى", en: "fever" },
        { ar: "صداع", en: "headache" },
        { ar: "سعال", en: "cough" },
        { ar: "حساسية", en: "allergy" },
      ],
      {
        extraFB: [{ q: "أكمل: لدي ____ شديد.", a: "صداع" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-complex-sentences",
    title: "Complex Sentence Structures",
    titleFr: "تراكيب الجمل المعقدة",
    description: "Build complex Arabic sentences",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "🔗",
    prefix: "cpx",
    packs: makeVocabPacks(
      [
        { ar: "عندما", en: "when" },
        { ar: "بينما", en: "while" },
        { ar: "قبل أن", en: "before" },
        { ar: "بعد أن", en: "after" },
        { ar: "لكي", en: "so that" },
        { ar: "حتى", en: "until" },
        { ar: "رغم أن", en: "although" },
      ],
      {
        extraFB: [{ q: "أكمل: سأدرس ____ أنجح.", a: "لكي" }],
      }
    ),
  }),

  makeLesson({
    id: "ar-int-imparfait",
    title: "Narrating Past Events",
    titleFr: "سرد الأحداث الماضية",
    description: "Tell stories using Arabic past tense forms",
    category: "Grammar",
    xpReward: 70,
    estimatedMinutes: 25,
    icon: "📖",
    prefix: "nar",
    packs: makeVocabPacks(
      [
        { ar: "ثم", en: "then" },
        { ar: "بعد ذلك", en: "after that" },
        { ar: "في النهاية", en: "in the end" },
        { ar: "في البداية", en: "at first" },
        { ar: "فجأة", en: "suddenly" },
        { ar: "عندما", en: "when" },
      ],
      {
        extraMC: [
          { q: "اختر الفعل الماضي من: يذهب / ذهب", options: ["ذهب", "يذهب", "سيذهب", "يذهبون"], a: "ذهب" },
        ],
        extraFB: [{ q: "أكمل: أمس ____ إلى السوق.", a: "ذهبتُ" }],
      }
    ),
  }),
];
