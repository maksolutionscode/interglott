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
  pairs: { ar: string; en: string }[];
  extraMC?: MCItem[];
  extraFB?: FBItem[];
}): Lesson => {
  const { mc, fb } = makeVocabPacks(params.pairs, { extraMC: params.extraMC, extraFB: params.extraFB });
  return {
    id: params.id,
    title: params.title,
    titleFr: params.titleFr,
    description: params.description,
    level: "beginner",
    category: params.category,
    xpReward: params.xpReward,
    estimatedMinutes: params.estimatedMinutes,
    icon: params.icon,
    exercises: buildExercises(params.prefix, mc, fb),
  };
};

export const arabicBeginnerSet2: Lesson[] = [
  makeLesson({
    id: "ar-sports-hobbies",
    title: "Sports and Hobbies",
    titleFr: "الرياضة والهوايات (Ar-Riyāḍa wal-Hiwāyāt)",
    description: "Talk about sports and hobbies in Arabic",
    category: "Vocabulary",
    xpReward: 60,
    estimatedMinutes: 25,
    icon: "⚽",
    prefix: "sph",
    pairs: [
      { ar: "كرة القدم", en: "football" },
      { ar: "كرة السلة", en: "basketball" },
      { ar: "سباحة", en: "swimming" },
      { ar: "جري", en: "running" },
      { ar: "تنس", en: "tennis" },
      { ar: "موسيقى", en: "music" },
      { ar: "قراءة", en: "reading" },
      { ar: "طبخ", en: "cooking" },
      { ar: "رسم", en: "drawing" },
      { ar: "تصوير", en: "photography" },
    ],
    extraMC: [
      { q: "اختر الجملة الصحيحة:", options: ["أحب كرة القدم", "أحب كرة قدم", "أحب قدم الكرة", "أحب كرت القدم"], a: "أحب كرة القدم" },
    ],
  }),
  makeLesson({
    id: "ar-imperative",
    title: "Simple Imperative & Commands",
    titleFr: "الأمر (Al-Amr)",
    description: "Learn to give commands in Arabic",
    category: "Grammar",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "📢",
    prefix: "imp",
    pairs: [
      { ar: "اكتب", en: "write!" },
      { ar: "اقرأ", en: "read!" },
      { ar: "اذهب", en: "go!" },
      { ar: "تعال", en: "come!" },
      { ar: "اجلس", en: "sit!" },
      { ar: "قف", en: "stand!" },
      { ar: "اسمع", en: "listen!" },
      { ar: "انتظر", en: "wait!" },
    ],
    extraMC: [
      { q: "ما صيغة الأمر من الفعل «جلس»؟", options: ["اجلس", "يجلس", "جلست", "يجلسون"], a: "اجلس" },
      { q: "اختر الطلب اللطيف:", options: ["اجلس لو سمحت", "اجلس الآن!", "اجلس!", "اجلس بسرعة!"], a: "اجلس لو سمحت" },
    ],
    extraFB: [
      { q: "أكمل: _____ هنا. (come!)", a: "تعال" },
    ],
  }),
  makeLesson({
    id: "ar-daily-routine-verbs",
    title: "Daily Routine with Key Verbs",
    titleFr: "الروتين اليومي مع الأفعال الأساسية",
    description: "Practice key Arabic verbs in daily routines",
    category: "Grammar",
    xpReward: 65,
    estimatedMinutes: 25,
    icon: "🔄",
    prefix: "drv",
    pairs: [
      { ar: "أستيقظ", en: "I wake up" },
      { ar: "أتناول الفطور", en: "I have breakfast" },
      { ar: "أذهب إلى العمل", en: "I go to work" },
      { ar: "أعود إلى البيت", en: "I return home" },
      { ar: "أتناول العشاء", en: "I have dinner" },
      { ar: "أنام", en: "I sleep" },
      { ar: "أدرس", en: "I study" },
      { ar: "أتمرن", en: "I exercise" },
      { ar: "أستحم", en: "I shower" },
    ],
    extraFB: [
      { q: "أكمل: في الصباح أنا _____. (I wake up)", a: "أستيقظ" },
      { q: "أكمل: في الليل أنا _____. (I sleep)", a: "أنام" },
    ],
  }),
  makeLesson({
    id: "ar-shopping",
    title: "Shopping",
    titleFr: "التسوق (At-Tasawwuq)",
    description: "Learn shopping vocabulary in Arabic",
    category: "Vocabulary",
    xpReward: 60,
    estimatedMinutes: 25,
    icon: "🛍️",
    prefix: "shop",
    pairs: [
      { ar: "سعر", en: "price" },
      { ar: "كم هذا؟", en: "How much is this?" },
      { ar: "غالي", en: "expensive" },
      { ar: "رخيص", en: "cheap" },
      { ar: "خصم", en: "discount" },
      { ar: "فاتورة", en: "receipt" },
      { ar: "مقاس", en: "size" },
      { ar: "نقداً", en: "cash" },
      { ar: "بطاقة", en: "card" },
      { ar: "متجر", en: "store" },
    ],
    extraMC: [
      { q: "أي عبارة تستخدم للسؤال عن السعر؟", options: ["كم هذا؟", "أين الحمام؟", "كيف حالك؟", "متى؟"], a: "كم هذا؟" },
    ],
  }),
  makeLesson({
    id: "ar-fashion-clothing",
    title: "Fashion and Clothing",
    titleFr: "الأزياء والملابس (Al-Azyāʾ wal-Malābis)",
    description: "Learn clothing vocabulary in Arabic",
    category: "Vocabulary",
    xpReward: 60,
    estimatedMinutes: 25,
    icon: "👗",
    prefix: "fash",
    pairs: [
      { ar: "قميص", en: "shirt" },
      { ar: "بنطال", en: "pants" },
      { ar: "فستان", en: "dress" },
      { ar: "حذاء", en: "shoes" },
      { ar: "سترة", en: "jacket" },
      { ar: "قبعة", en: "hat" },
      { ar: "حقيبة", en: "bag" },
      { ar: "مقاس", en: "size" },
      { ar: "لون", en: "color" },
    ],
    extraFB: [{ q: "أكمل: أريد ____ كبيراً.", a: "قميصاً" }],
  }),
  makeLesson({
    id: "ar-places",
    title: "Places Around Us",
    titleFr: "الأماكن حولنا (Al-Amākin Ḥawlanā)",
    description: "Learn places and locations in Arabic",
    category: "Vocabulary",
    xpReward: 60,
    estimatedMinutes: 25,
    icon: "🏙️",
    prefix: "plc",
    pairs: [
      { ar: "مدرسة", en: "school" },
      { ar: "جامعة", en: "university" },
      { ar: "مستشفى", en: "hospital" },
      { ar: "صيدلية", en: "pharmacy" },
      { ar: "سوق", en: "market" },
      { ar: "مطعم", en: "restaurant" },
      { ar: "بنك", en: "bank" },
      { ar: "فندق", en: "hotel" },
      { ar: "مطار", en: "airport" },
      { ar: "محطة", en: "station" },
    ],
    extraMC: [{ q: "أين تذهب لشراء الدواء؟", options: ["صيدلية", "مدرسة", "بنك", "فندق"], a: "صيدلية" }],
  }),
  makeLesson({
    id: "ar-talking-about-work",
    title: "Talking About Work",
    titleFr: "الحديث عن العمل (Al-Ḥadīth ʿan Al-ʿAmal)",
    description: "Learn work and profession vocabulary",
    category: "Communication",
    xpReward: 60,
    estimatedMinutes: 25,
    icon: "💼",
    prefix: "wrk",
    pairs: [
      { ar: "عمل", en: "work" },
      { ar: "وظيفة", en: "job" },
      { ar: "شركة", en: "company" },
      { ar: "مدير", en: "manager" },
      { ar: "زميل", en: "colleague" },
      { ar: "اجتماع", en: "meeting" },
      { ar: "بريد إلكتروني", en: "email" },
      { ar: "دوام", en: "shift / working hours" },
      { ar: "راتب", en: "salary" },
      { ar: "إجازة", en: "vacation" },
    ],
    extraFB: [{ q: "أكمل: أنا أعمل في _____.", a: "شركة" }],
  }),
];
