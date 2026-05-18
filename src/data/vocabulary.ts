export interface VocabWord {
  id: string;
  french: string;
  english: string;
  category: string;
  example: string;
  level: "beginner" | "intermediate" | "advanced";
}

export const vocabulary: VocabWord[] = [
  { id: "v1", french: "Bonjour", english: "Hello", category: "Greetings", example: "Bonjour, comment allez-vous?", level: "beginner" },
  { id: "v2", french: "Merci", english: "Thank you", category: "Greetings", example: "Merci beaucoup!", level: "beginner" },
  { id: "v3", french: "S'il vous plaît", english: "Please", category: "Greetings", example: "Un café, s'il vous plaît.", level: "beginner" },
  { id: "v4", french: "Oui", english: "Yes", category: "Basics", example: "Oui, je comprends.", level: "beginner" },
  { id: "v5", french: "Non", english: "No", category: "Basics", example: "Non, merci.", level: "beginner" },
  { id: "v6", french: "Le chat", english: "The cat", category: "Animals", example: "Le chat dort sur le canapé.", level: "beginner" },
  { id: "v7", french: "Le chien", english: "The dog", category: "Animals", example: "Le chien joue dans le jardin.", level: "beginner" },
  { id: "v8", french: "La maison", english: "The house", category: "Places", example: "La maison est grande.", level: "beginner" },
  { id: "v9", french: "L'école", english: "The school", category: "Places", example: "Je vais à l'école.", level: "beginner" },
  { id: "v10", french: "Manger", english: "To eat", category: "Verbs", example: "Je mange une pomme.", level: "beginner" },
  { id: "v11", french: "Cependant", english: "However", category: "Connectors", example: "Il pleut, cependant je sors.", level: "intermediate" },
  { id: "v12", french: "Néanmoins", english: "Nevertheless", category: "Connectors", example: "C'est difficile, néanmoins j'essaie.", level: "intermediate" },
  { id: "v13", french: "Quotidien", english: "Daily", category: "Adjectives", example: "Mon travail quotidien est intéressant.", level: "intermediate" },
  { id: "v14", french: "Éprouver", english: "To feel/experience", category: "Verbs", example: "J'éprouve de la joie.", level: "intermediate" },
  { id: "v15", french: "Auparavant", english: "Previously", category: "Time", example: "Auparavant, je vivais à Paris.", level: "intermediate" },
  { id: "v16", french: "Épanouissement", english: "Fulfillment", category: "Abstract", example: "L'épanouissement personnel est important.", level: "advanced" },
  { id: "v17", french: "Bouleverser", english: "To overwhelm", category: "Verbs", example: "Cette nouvelle m'a bouleversé.", level: "advanced" },
  { id: "v18", french: "Davantage", english: "More", category: "Adverbs", example: "Je voudrais en savoir davantage.", level: "advanced" },
  { id: "v19", french: "Incontournable", english: "Essential/Unavoidable", category: "Adjectives", example: "Ce livre est incontournable.", level: "advanced" },
  { id: "v20", french: "Désormais", english: "From now on", category: "Time", example: "Désormais, je parle français.", level: "advanced" },
];

export const vocabCategories = [...new Set(vocabulary.map((v) => v.category))];
