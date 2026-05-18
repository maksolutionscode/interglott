import type { Story } from "./stories";

const s = (storyId: string, stepNum: number) => `${storyId}-step${stepNum}`;
const o = (storyId: string, stepNum: number, optNum: number) => `${storyId}-s${stepNum}-o${optNum}`;

export const arabicStories: Story[] = [
  // BEGINNER
  {
    id: "ar-airport",
    title: "Arrival at the Airport",
    location: "Dubai International Airport",
    level: "beginner",
    language: "arabic",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("ar-airport", 1), characterName: "ضابط الجوازات", characterAvatar: "👮",
        dialogue: "مرحباً! جواز السفر، من فضلك.",
        options: [
          { id: o("ar-airport", 1, 1), text: "تفضل، هذا جواز سفري.", isCorrect: true, feedback: "Excellent! 'تفضل' (Here you go) is polite and appropriate." },
          { id: o("ar-airport", 1, 2), text: "أنا جواز سفر.", isCorrect: false, feedback: "This means 'I am a passport'. Try 'تفضل، هذا جواز سفري'." },
          { id: o("ar-airport", 1, 3), text: "لا، شكراً.", isCorrect: false, feedback: "You cannot refuse! Say 'تفضل، هذا جواز سفري'." },
        ],
      },
      {
        id: s("ar-airport", 2), characterName: "ضابط الجوازات", characterAvatar: "👮",
        dialogue: "ما هو سبب زيارتك لدبي؟",
        options: [
          { id: o("ar-airport", 2, 1), text: "أنا هنا للسياحة.", isCorrect: true, feedback: "Perfect! 'للسياحة' means 'for tourism'." },
          { id: o("ar-airport", 2, 2), text: "أنا آكل.", isCorrect: false, feedback: "'أنا آكل' means 'I am eating'. Try 'أنا هنا للسياحة'." },
          { id: o("ar-airport", 2, 3), text: "دبي كبيرة.", isCorrect: false, feedback: "While true, this doesn't answer the question." },
        ],
      },
      {
        id: s("ar-airport", 3), characterName: "ضابط الجوازات", characterAvatar: "👮",
        dialogue: "كم يوماً ستبقى هنا؟",
        options: [
          { id: o("ar-airport", 3, 1), text: "أسبوع واحد.", isCorrect: true, feedback: "Great! 'أسبوع واحد' means 'one week'." },
          { id: o("ar-airport", 3, 2), text: "أين الفندق؟", isCorrect: false, feedback: "You're asking where the hotel is. Answer the duration instead." },
          { id: o("ar-airport", 3, 3), text: "لا أفهم.", isCorrect: false, feedback: "Try giving a duration, like 'أسبوع واحد' (one week)." },
        ],
      },
      {
        id: s("ar-airport", 4), characterName: "ضابط الجوازات", characterAvatar: "👮",
        dialogue: "حسناً، إقامة سعيدة في دبي!",
        options: [
          { id: o("ar-airport", 4, 1), text: "شكراً جزيلاً!", isCorrect: true, feedback: "Very good! 'شكراً جزيلاً' means 'Thank you very much'." },
          { id: o("ar-airport", 4, 2), text: "نعم.", isCorrect: false, feedback: "A bit too brief. 'شكراً جزيلاً' is more polite." },
          { id: o("ar-airport", 4, 3), text: "صباح الخير.", isCorrect: false, feedback: "That means 'Good morning'. Better to say 'شكراً' (Thank you)." },
        ],
      }
    ],
  },
  {
    id: "ar-friend",
    title: "Meeting a New Friend",
    location: "A café in Amman",
    level: "beginner",
    language: "arabic",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("ar-friend", 1), characterName: "أحمد", characterAvatar: "👨",
        dialogue: "السلام عليكم! هل أنت جديد هنا؟",
        options: [
          { id: o("ar-friend", 1, 1), text: "وعليكم السلام! نعم، أنا أدرس هنا.", isCorrect: true, feedback: "Excellent response! 'وعليكم السلام' is the correct reply." },
          { id: o("ar-friend", 1, 2), text: "أنا سيارة.", isCorrect: false, feedback: "That means 'I am a car'. Reply with 'وعليكم السلام'." },
          { id: o("ar-friend", 1, 3), text: "مع السلامة.", isCorrect: false, feedback: "That means 'Goodbye'. Try saying hello instead." },
        ],
      },
      {
        id: s("ar-friend", 2), characterName: "أحمد", characterAvatar: "👨",
        dialogue: "أهلاً بك! ما اسمك؟",
        options: [
          { id: o("ar-friend", 2, 1), text: "اسمي سامي. وأنت؟", isCorrect: true, feedback: "Great! 'اسمي' means 'My name is'." },
          { id: o("ar-friend", 2, 2), text: "أنا بخير.", isCorrect: false, feedback: "That means 'I am fine'. The question was about your name." },
          { id: o("ar-friend", 2, 3), text: "من أين أنت؟", isCorrect: false, feedback: "Answer the question first! 'اسمي...' (My name is...)." },
        ],
      },
      {
        id: s("ar-friend", 3), characterName: "أحمد", characterAvatar: "👨",
        dialogue: "تشرفنا يا سامي! أنا من الأردن، من أين أنت؟",
        options: [
          { id: o("ar-friend", 3, 1), text: "أنا من الولايات المتحدة.", isCorrect: true, feedback: "Perfect! 'أنا من' means 'I am from'." },
          { id: o("ar-friend", 3, 2), text: "أنا في المقهى.", isCorrect: false, feedback: "That means 'I am in the café'. He asked where you are from." },
          { id: o("ar-friend", 3, 3), text: "هذا كتاب.", isCorrect: false, feedback: "That means 'This is a book'. Irrelevant here!" },
        ],
      }
    ],
  },
  {
    id: "ar-coffee",
    title: "Buying Coffee",
    location: "A local roastery in Cairo",
    level: "beginner",
    language: "arabic",
    duration: "4 min",
    xpReward: 40,
    steps: [
      {
        id: s("ar-coffee", 1), characterName: "البائع", characterAvatar: "☕",
        dialogue: "أهلاً بك، ماذا تشرب؟",
        options: [
          { id: o("ar-coffee", 1, 1), text: "قهوة لو سمحت.", isCorrect: true, feedback: "Very polite. 'لو سمحت' means 'please'." },
          { id: o("ar-coffee", 1, 2), text: "أنا أشرب.", isCorrect: false, feedback: "Incomplete! Say what you want to drink." },
          { id: o("ar-coffee", 1, 3), text: "أريد أن أقرأ.", isCorrect: false, feedback: "That means 'I want to read'. You're ordering a drink!" },
        ],
      },
      {
        id: s("ar-coffee", 2), characterName: "البائع", characterAvatar: "☕",
        dialogue: "قهوة بسكر أم بدون سكر؟",
        options: [
          { id: o("ar-coffee", 2, 1), text: "بدون سكر، شكراً.", isCorrect: true, feedback: "Good! 'بدون سكر' means 'without sugar'." },
          { id: o("ar-coffee", 2, 2), text: "قهوة كبيرة.", isCorrect: false, feedback: "He asked about sugar, not size." },
          { id: o("ar-coffee", 2, 3), text: "أنا لا أحب الشاي.", isCorrect: false, feedback: "Irrelevant! He asked how you want your coffee." },
        ],
      },
      {
        id: s("ar-coffee", 3), characterName: "البائع", characterAvatar: "☕",
        dialogue: "الحساب عشرون جنيهاً.",
        options: [
          { id: o("ar-coffee", 3, 1), text: "تفضل.", isCorrect: true, feedback: "Polite and simple! 'تفضل' (Here you go)." },
          { id: o("ar-coffee", 3, 2), text: "هذا كثير.", isCorrect: false, feedback: "Don't haggle over coffee! Just pay the man." },
          { id: o("ar-coffee", 3, 3), text: "أين الحمام؟", isCorrect: false, feedback: "Pay first, then ask!" },
        ],
      }
    ],
  },
  {
    id: "ar-hotel",
    title: "Checking into a Hotel",
    location: "A resort in Sharm El-Sheikh",
    level: "beginner",
    language: "arabic",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("ar-hotel", 1), characterName: "موظف الاستقبال", characterAvatar: "🏨",
        dialogue: "مساء الخير، كيف يمكنني مساعدتك؟",
        options: [
          { id: o("ar-hotel", 1, 1), text: "لدي حجز باسم محمد.", isCorrect: true, feedback: "Perfect! 'لدي حجز' means 'I have a reservation'." },
          { id: o("ar-hotel", 1, 2), text: "أريد أن أسبح.", isCorrect: false, feedback: "Check in first!" },
          { id: o("ar-hotel", 1, 3), text: "أين السرير؟", isCorrect: false, feedback: "Too direct! Make sure you check in first." },
        ],
      },
      {
        id: s("ar-hotel", 2), characterName: "موظف الاستقبال", characterAvatar: "🏨",
        dialogue: "نعم، حجز لمدة ثلاث ليالٍ. هل هذا صحيح؟",
        options: [
          { id: o("ar-hotel", 2, 1), text: "نعم، صحيح.", isCorrect: true, feedback: "Good! 'صحيح' means 'Correct'." },
          { id: o("ar-hotel", 2, 2), text: "لا، أنا لا أعرف.", isCorrect: false, feedback: "You should know your reservation!" },
          { id: o("ar-hotel", 2, 3), text: "غرفة صغيرة.", isCorrect: false, feedback: "Just confirm the duration." },
        ],
      },
      {
        id: s("ar-hotel", 3), characterName: "موظف الاستقبال", characterAvatar: "🏨",
        dialogue: "تفضل مفتاح الغرفة. غرفتك في الطابق الثاني.",
        options: [
          { id: o("ar-hotel", 3, 1), text: "شكراً، أين المصعد؟", isCorrect: true, feedback: "Great! Asking where the elevator (المصعد) is." },
          { id: o("ar-hotel", 3, 2), text: "أريد مفتاحاً آخر.", isCorrect: false, feedback: "Why? Take the key and go to your room." },
          { id: o("ar-hotel", 3, 3), text: "الطابق الثاني بعيد.", isCorrect: false, feedback: "That's a complaint. Just take the key and say thanks." },
        ],
      }
    ],
  },

  // INTERMEDIATE
  {
    id: "ar-restaurant",
    title: "Ordering at a Restaurant",
    location: "A traditional restaurant in Beirut",
    level: "intermediate",
    language: "arabic",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("ar-restaurant", 1), characterName: "النادل", characterAvatar: "🧑‍🍳",
        dialogue: "أهلاً وسهلاً بكم. هل طلبتم أم بعد؟",
        options: [
          { id: o("ar-restaurant", 1, 1), text: "ليس بعد، هل يمكنني رؤية قائمة الطعام؟", isCorrect: true, feedback: "Perfect! 'قائمة الطعام' means 'the menu'." },
          { id: o("ar-restaurant", 1, 2), text: "أريد أن أذهب.", isCorrect: false, feedback: "You just arrived! Ask for the menu." },
          { id: o("ar-restaurant", 1, 3), text: "أنا جائع جداً.", isCorrect: false, feedback: "While true, asking for the menu is more practical." },
        ],
      },
      {
        id: s("ar-restaurant", 2), characterName: "النادل", characterAvatar: "🧑‍🍳",
        dialogue: "تفضل القائمة. بماذا تنصح؟ لدينا مشويات ممتازة اليوم.",
        options: [
          { id: o("ar-restaurant", 2, 1), text: "جيد، سأطلب طبق المشويات المشكل.", isCorrect: true, feedback: "Great choice! 'طبق المشويات' is a mixed grill platter." },
          { id: o("ar-restaurant", 2, 2), text: "أنا لا أحب المطعم.", isCorrect: false, feedback: "Very rude! Try ordering something." },
          { id: o("ar-restaurant", 2, 3), text: "هل يوجد ماء؟", isCorrect: false, feedback: "Order food first, then ask for drinks." },
        ],
      },
      {
        id: s("ar-restaurant", 3), characterName: "النادل", characterAvatar: "🧑‍🍳",
        dialogue: "وماذا تحب أن تشرب مع الطعام؟",
        options: [
          { id: o("ar-restaurant", 3, 1), text: "عصير ليمون طازج، من فضلك.", isCorrect: true, feedback: "Fresh lemon juice (عصير ليمون طازج) is an excellent choice." },
          { id: o("ar-restaurant", 3, 2), text: "أريد لحماً.", isCorrect: false, feedback: "He asked for your drink order, not food." },
          { id: o("ar-restaurant", 3, 3), text: "لا شيء.", isCorrect: false, feedback: "You should probably order something to drink with your meal." },
        ],
      }
    ],
  },
  {
    id: "ar-directions",
    title: "Asking for Directions",
    location: "Streets of Casablanca",
    level: "intermediate",
    language: "arabic",
    duration: "6 min",
    xpReward: 60,
    steps: [
      {
        id: s("ar-directions", 1), characterName: "مواطن", characterAvatar: "🚶",
        dialogue: "تفضل يا أخي، هل تبحث عن شيء؟",
        options: [
          { id: o("ar-directions", 1, 1), text: "نعم، أين تقع محطة القطار؟", isCorrect: true, feedback: "Spot on! 'أين تقع' means 'Where is located...'" },
          { id: o("ar-directions", 1, 2), text: "أنا ضائع.", isCorrect: false, feedback: "You are lost, but ask where you want to go!" },
          { id: o("ar-directions", 1, 3), text: "لا أريد مساعدتك.", isCorrect: false, feedback: "Very rude! He's trying to help." },
        ],
      },
      {
        id: s("ar-directions", 2), characterName: "مواطن", characterAvatar: "🚶",
        dialogue: "محطة القطار قريبة. اذهب بشكل مستقيم ثم انعطف يميناً.",
        options: [
          { id: o("ar-directions", 2, 1), text: "شكراً! هل هي بعيدة من هنا؟", isCorrect: true, feedback: "Good follow-up question! 'هل هي بعيدة' = 'Is it far?'" },
          { id: o("ar-directions", 2, 2), text: "يمين أم يسار؟", isCorrect: false, feedback: "He just told you right (يميناً)." },
          { id: o("ar-directions", 2, 3), text: "القطار سريع.", isCorrect: false, feedback: "Irrelevant." },
        ],
      },
      {
        id: s("ar-directions", 3), characterName: "مواطن", characterAvatar: "🚶",
        dialogue: "لا، ليست بعيدة. ربما خمس دقائق مشياً على الأقدام.",
        options: [
          { id: o("ar-directions", 3, 1), text: "شكراً جزيلاً لمساعدتك، يومك سعيد.", isCorrect: true, feedback: "Very polite way to end the conversation." },
          { id: o("ar-directions", 3, 2), text: "سأركب تاكسي.", isCorrect: false, feedback: "It's only 5 minutes! Just walk and thank him." },
          { id: o("ar-directions", 3, 3), text: "خمس دقائق كثيرة.", isCorrect: false, feedback: "Stop complaining and say thank you!" },
        ],
      }
    ],
  },
  {
    id: "ar-market",
    title: "Shopping at a Market",
    location: "Khan el-Khalili, Cairo",
    level: "intermediate",
    language: "arabic",
    duration: "7 min",
    xpReward: 70,
    steps: [
      {
        id: s("ar-market", 1), characterName: "التاجر", characterAvatar: "🏪",
        dialogue: "تفضل يا باشا! عندنا أفضل الهدايا.",
        options: [
          { id: o("ar-market", 1, 1), text: "بكم هذا التمثال الصغير؟", isCorrect: true, feedback: "Good! 'بكم' means 'How much?'" },
          { id: o("ar-market", 1, 2), text: "أنا لا أشتري.", isCorrect: false, feedback: "Then why are you asking?" },
          { id: o("ar-market", 1, 3), text: "الهدايا سيئة.", isCorrect: false, feedback: "Very insulting!" },
        ],
      },
      {
        id: s("ar-market", 2), characterName: "التاجر", characterAvatar: "🏪",
        dialogue: "هذا التمثال بمئة جنيه فقط، سعر خاص لك!",
        options: [
          { id: o("ar-market", 2, 1), text: "هل يمكنني الحصول على تخفيض؟", isCorrect: true, feedback: "Excellent! Asking for a discount (تخفيض) is standard practice." },
          { id: o("ar-market", 2, 2), text: "سأدفع مئتين.", isCorrect: false, feedback: "Never pay more than the asking price!" },
          { id: o("ar-market", 2, 3), text: "هذا غالي جداً، سأذهب.", isCorrect: false, feedback: "Try negotiating first before walking away." },
        ],
      },
      {
        id: s("ar-market", 3), characterName: "التاجر", characterAvatar: "🏪",
        dialogue: "حسناً، ثمانون جنيهاً ولن نختلف.",
        options: [
          { id: o("ar-market", 3, 1), text: "موافق، سآخذه. تفضل النقود.", isCorrect: true, feedback: "Great! Deal closed." },
          { id: o("ar-market", 3, 2), text: "أريد مجاناً.", isCorrect: false, feedback: "Nothing is free!" },
          { id: o("ar-market", 3, 3), text: "لا أريده.", isCorrect: false, feedback: "You just haggled for it! Better take it." },
        ],
      }
    ],
  },
  {
    id: "ar-train",
    title: "Booking a Train Ticket",
    location: "Ramses Station, Cairo",
    level: "intermediate",
    language: "arabic",
    duration: "6 min",
    xpReward: 60,
    steps: [
      {
        id: s("ar-train", 1), characterName: "موظف التذاكر", characterAvatar: "🎫",
        dialogue: "أهلاً بك، إلى أين تود السفر؟",
        options: [
          { id: o("ar-train", 1, 1), text: "تذكرة واحدة إلى الإسكندرية، من فضلك.", isCorrect: true, feedback: "Perfect!" },
          { id: o("ar-train", 1, 2), text: "أريد القطار.", isCorrect: false, feedback: "You need to say where to." },
          { id: o("ar-train", 1, 3), text: "أنا في المحطة.", isCorrect: false, feedback: "He knows that. Where do you want to go?" },
        ],
      },
      {
        id: s("ar-train", 2), characterName: "موظف التذاكر", characterAvatar: "🎫",
        dialogue: "ذهاب فقط أم ذهاب وعودة؟",
        options: [
          { id: o("ar-train", 2, 1), text: "ذهاب وعودة، لو سمحت.", isCorrect: true, feedback: "Round trip (ذهاب وعودة). Excellent." },
          { id: o("ar-train", 2, 2), text: "أريد الجلوس.", isCorrect: false, feedback: "He asked what type of ticket." },
          { id: o("ar-train", 2, 3), text: "غداً.", isCorrect: false, feedback: "Answer the type of ticket first." },
        ],
      },
      {
        id: s("ar-train", 3), characterName: "موظف التذاكر", characterAvatar: "🎫",
        dialogue: "القطار القادم يغادر في الساعة الثالثة عصراً. الدرجة الأولى أم الثانية؟",
        options: [
          { id: o("ar-train", 3, 1), text: "الدرجة الأولى. كم السعر؟", isCorrect: true, feedback: "First class! Very nice." },
          { id: o("ar-train", 3, 2), text: "الدرجة الثالثة.", isCorrect: false, feedback: "He didn't offer a third class." },
          { id: o("ar-train", 3, 3), text: "الساعة الرابعة.", isCorrect: false, feedback: "He said it leaves at 3 PM." },
        ],
      }
    ],
  },

  // ADVANCED
  {
    id: "ar-interview",
    title: "Job Interview",
    location: "A tech company in Dubai",
    level: "advanced",
    language: "arabic",
    duration: "10 min",
    xpReward: 100,
    steps: [
      {
        id: s("ar-interview", 1), characterName: "المدير", characterAvatar: "👔",
        dialogue: "أهلاً بك. هل يمكنك أن تخبرنا عن خبرتك السابقة؟",
        options: [
          { id: o("ar-interview", 1, 1), text: "لدي خبرة خمس سنوات في مجال التكنولوجيا وإدارة المشاريع.", isCorrect: true, feedback: "Professional and concise!" },
          { id: o("ar-interview", 1, 2), text: "أنا أحب الكمبيوتر.", isCorrect: false, feedback: "Too simple for a job interview." },
          { id: o("ar-interview", 1, 3), text: "لا يوجد لدي خبرة.", isCorrect: false, feedback: "Try to highlight your skills!" },
        ],
      },
      {
        id: s("ar-interview", 2), characterName: "المدير", characterAvatar: "👔",
        dialogue: "ممتاز. كيف تتعامل مع ضغط العمل؟",
        options: [
          { id: o("ar-interview", 2, 1), text: "أقوم بتنظيم وقتي وتحديد الأولويات لإنجاز المهام.", isCorrect: true, feedback: "Great answer showing time management skills." },
          { id: o("ar-interview", 2, 2), text: "أنا أغضب بسرعة.", isCorrect: false, feedback: "Red flag for the employer!" },
          { id: o("ar-interview", 2, 3), text: "لا أحب الضغط.", isCorrect: false, feedback: "Everyone faces pressure; show how you handle it." },
        ],
      },
      {
        id: s("ar-interview", 3), characterName: "المدير", characterAvatar: "👔",
        dialogue: "هل لديك أي أسئلة لنا؟",
        options: [
          { id: o("ar-interview", 3, 1), text: "نعم، ما هي فرص التطور الوظيفي في شركتكم؟", isCorrect: true, feedback: "A very professional question to ask." },
          { id: o("ar-interview", 3, 2), text: "كم الراتب؟", isCorrect: false, feedback: "Too direct for the first interview." },
          { id: o("ar-interview", 3, 3), text: "لا، مع السلامة.", isCorrect: false, feedback: "Try to show more interest in the company." },
        ],
      }
    ],
  },
  {
    id: "ar-meeting",
    title: "Business Meeting",
    location: "Corporate office in Riyadh",
    level: "advanced",
    language: "arabic",
    duration: "8 min",
    xpReward: 90,
    steps: [
      {
        id: s("ar-meeting", 1), characterName: "الشريك", characterAvatar: "💼",
        dialogue: "لقد راجعنا اقتراحكم، ولكن الميزانية تبدو مرتفعة قليلاً.",
        options: [
          { id: o("ar-meeting", 1, 1), text: "نتفهم قلقكم، لكن السعر يعكس الجودة العالية للخدمة.", isCorrect: true, feedback: "Excellent negotiation tactic!" },
          { id: o("ar-meeting", 1, 2), text: "هذا هو السعر، اقبلوه أو ارفضوه.", isCorrect: false, feedback: "Too aggressive for a business meeting." },
          { id: o("ar-meeting", 1, 3), text: "الميزانية ليست مشكلتي.", isCorrect: false, feedback: "Very unprofessional." },
        ],
      },
      {
        id: s("ar-meeting", 2), characterName: "الشريك", characterAvatar: "💼",
        dialogue: "هل هناك مجال لتخفيض التكلفة بنسبة عشرة بالمئة؟",
        options: [
          { id: o("ar-meeting", 2, 1), text: "يمكننا النظر في ذلك إذا قمتم بتوقيع عقد طويل الأمد.", isCorrect: true, feedback: "A great compromise!" },
          { id: o("ar-meeting", 2, 2), text: "لا، مستحيل.", isCorrect: false, feedback: "Too rigid." },
          { id: o("ar-meeting", 2, 3), text: "سنعطيكم خصماً بنسبة خمسين بالمئة.", isCorrect: false, feedback: "You just lost the company a lot of money!" },
        ],
      },
      {
        id: s("ar-meeting", 3), characterName: "الشريك", characterAvatar: "💼",
        dialogue: "هذا يبدو عادلاً. لنقم بصياغة العقد النهائي.",
        options: [
          { id: o("ar-meeting", 3, 1), text: "ممتاز، سأرسل لكم المسودة غداً صباحاً.", isCorrect: true, feedback: "Perfect follow-up action." },
          { id: o("ar-meeting", 3, 2), text: "أنا متعب الآن.", isCorrect: false, feedback: "Keep it professional." },
          { id: o("ar-meeting", 3, 3), text: "لا أحب العقود.", isCorrect: false, feedback: "How do you do business then?" },
        ],
      }
    ],
  },
  {
    id: "ar-problem",
    title: "Resolving a Travel Problem",
    location: "A travel agency in Doha",
    level: "advanced",
    language: "arabic",
    duration: "8 min",
    xpReward: 90,
    steps: [
      {
        id: s("ar-problem", 1), characterName: "الموظف", characterAvatar: "🎧",
        dialogue: "يؤسفني إبلاغك بأنه تم إلغاء رحلتك بسبب سوء الأحوال الجوية.",
        options: [
          { id: o("ar-problem", 1, 1), text: "هذا مزعج، ما هي الخيارات البديلة المتاحة لي؟", isCorrect: true, feedback: "A calm and productive response." },
          { id: o("ar-problem", 1, 2), text: "أنا غاضب جداً، أعد لي أموالي الآن!", isCorrect: false, feedback: "Aggressive. Try to find a solution first." },
          { id: o("ar-problem", 1, 3), text: "سأسافر مشياً.", isCorrect: false, feedback: "Unrealistic!" },
        ],
      },
      {
        id: s("ar-problem", 2), characterName: "الموظف", characterAvatar: "🎧",
        dialogue: "يمكننا حجز مقعد لك على الرحلة القادمة غداً صباحاً.",
        options: [
          { id: o("ar-problem", 2, 1), text: "حسناً، هل ستتكفل شركة الطيران بالإقامة الليلة؟", isCorrect: true, feedback: "Smart question regarding accommodation." },
          { id: o("ar-problem", 2, 2), text: "لا أريد السفر غداً.", isCorrect: false, feedback: "It's your best option!" },
          { id: o("ar-problem", 2, 3), text: "الصباح وقت سيء.", isCorrect: false, feedback: "Beggars can't be choosers." },
        ],
      },
      {
        id: s("ar-problem", 3), characterName: "الموظف", characterAvatar: "🎧",
        dialogue: "نعم بالتأكيد، سنرتب لك غرفة في الفندق القريب من المطار.",
        options: [
          { id: o("ar-problem", 3, 1), text: "أشكرك على تعاونك، يرجى إتمام الحجز الجديد.", isCorrect: true, feedback: "Very professional conclusion." },
          { id: o("ar-problem", 3, 2), text: "الفندق يجب أن يكون خمس نجوم.", isCorrect: false, feedback: "Too demanding." },
          { id: o("ar-problem", 3, 3), text: "أريد العودة للمنزل.", isCorrect: false, feedback: "You just agreed to the flight!" },
        ],
      }
    ],
  },
  {
    id: "ar-debate",
    title: "Debating an Opinion",
    location: "A university campus in Algiers",
    level: "advanced",
    language: "arabic",
    duration: "9 min",
    xpReward: 95,
    steps: [
      {
        id: s("ar-debate", 1), characterName: "الطالب", characterAvatar: "🎓",
        dialogue: "أعتقد أن التعليم عن بعد أفضل بكثير من التعليم التقليدي.",
        options: [
          { id: o("ar-debate", 1, 1), text: "أتفق معك جزئياً، لكن التعليم التقليدي يتيح تفاعلاً اجتماعياً مهماً.", isCorrect: true, feedback: "A balanced and thoughtful argument." },
          { id: o("ar-debate", 1, 2), text: "أنت مخطئ تماماً.", isCorrect: false, feedback: "Too combative for a respectful debate." },
          { id: o("ar-debate", 1, 3), text: "التعليم غير مهم.", isCorrect: false, feedback: "A very pessimistic view!" },
        ],
      },
      {
        id: s("ar-debate", 2), characterName: "الطالب", characterAvatar: "🎓",
        dialogue: "ولكن التعليم عن بعد يوفر الوقت والمرونة للطلاب.",
        options: [
          { id: o("ar-debate", 2, 1), text: "هذا صحيح، والمرونة ميزة قوية، لكنها تتطلب انضباطاً ذاتياً عالياً.", isCorrect: true, feedback: "Great point about self-discipline (انضباط ذاتي)." },
          { id: o("ar-debate", 2, 2), text: "الطلاب كسالى.", isCorrect: false, feedback: "An unfair generalization." },
          { id: o("ar-debate", 2, 3), text: "لا يهم الوقت.", isCorrect: false, feedback: "Time management is important!" },
        ],
      },
      {
        id: s("ar-debate", 3), characterName: "الطالب", characterAvatar: "🎓",
        dialogue: "يبدو أن لكل نظام إيجابياته وسلبياته.",
        options: [
          { id: o("ar-debate", 3, 1), text: "بالضبط، والدمج بينهما قد يكون الحل الأمثل للمستقبل.", isCorrect: true, feedback: "An excellent concluding thought." },
          { id: o("ar-debate", 3, 2), text: "أنا دائماً على حق.", isCorrect: false, feedback: "Very arrogant!" },
          { id: o("ar-debate", 3, 3), text: "لا أحب النقاش.", isCorrect: false, feedback: "But you just had a great debate!" },
        ],
      }
    ],
  }
];
