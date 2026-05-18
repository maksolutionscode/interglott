import type { LearningLanguage } from "@/contexts/UserProgressContext";

export interface StoryOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface StoryStep {
  id: string;
  characterName: string;
  characterAvatar: string;
  dialogue: string;
  options: StoryOption[];
}

export interface Story {
  id: string;
  title: string;
  location: string;
  level: "beginner" | "intermediate" | "advanced";
  language: LearningLanguage;
  duration: string;
  xpReward: number;
  steps: StoryStep[];
}

const s = (storyId: string, stepNum: number) => `${storyId}-step${stepNum}`;
const o = (storyId: string, stepNum: number, optNum: number) => `${storyId}-s${stepNum}-o${optNum}`;

// ─── FRENCH STORIES ────────────────────────────────────────

const frenchStories: Story[] = [
  // BEGINNER
  {
    id: "fr-airport",
    title: "Arrival at the Airport",
    location: "Charles de Gaulle Airport, Paris",
    level: "beginner",
    language: "french",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("fr-airport", 1), characterName: "Agent", characterAvatar: "👮",
        dialogue: "Bonjour ! Bienvenue en France. Votre passeport, s'il vous plaît.",
        options: [
          { id: o("fr-airport", 1, 1), text: "Voici mon passeport.", isCorrect: true, feedback: "Parfait ! 'Voici' means 'Here is'." },
          { id: o("fr-airport", 1, 2), text: "Je suis passeport.", isCorrect: false, feedback: "'Je suis' means 'I am'. You want 'Voici mon passeport' (Here is my passport)." },
          { id: o("fr-airport", 1, 3), text: "Passeport non.", isCorrect: false, feedback: "You need to present your passport. Try 'Voici mon passeport'." },
        ],
      },
      {
        id: s("fr-airport", 2), characterName: "Agent", characterAvatar: "👮",
        dialogue: "Merci. Quel est le but de votre visite ?",
        options: [
          { id: o("fr-airport", 2, 1), text: "Je suis en vacances.", isCorrect: true, feedback: "Très bien ! 'En vacances' means 'on vacation'." },
          { id: o("fr-airport", 2, 2), text: "Je suis manger.", isCorrect: false, feedback: "'Manger' means 'to eat'. For vacation say 'Je suis en vacances'." },
          { id: o("fr-airport", 2, 3), text: "Oui.", isCorrect: false, feedback: "The agent asked the purpose of your visit. Try answering with 'Je suis en vacances'." },
        ],
      },
      {
        id: s("fr-airport", 3), characterName: "Agent", characterAvatar: "👮",
        dialogue: "Combien de temps restez-vous en France ?",
        options: [
          { id: o("fr-airport", 3, 1), text: "Une semaine.", isCorrect: true, feedback: "Bien ! 'Une semaine' means 'one week'." },
          { id: o("fr-airport", 3, 2), text: "Beaucoup de France.", isCorrect: false, feedback: "The question is about duration. 'Une semaine' (one week) is a good answer." },
          { id: o("fr-airport", 3, 3), text: "Je ne sais pas.", isCorrect: false, feedback: "'Je ne sais pas' means 'I don't know'. Try giving a duration like 'Une semaine'." },
        ],
      },
      {
        id: s("fr-airport", 4), characterName: "Agent", characterAvatar: "👮",
        dialogue: "Très bien. Où allez-vous loger ?",
        options: [
          { id: o("fr-airport", 4, 1), text: "À l'hôtel, dans le centre-ville.", isCorrect: true, feedback: "Excellent ! You specified a hotel in the city center." },
          { id: o("fr-airport", 4, 2), text: "Je vais manger.", isCorrect: false, feedback: "The agent asked where you'll stay, not what you'll eat. Try 'À l'hôtel'." },
          { id: o("fr-airport", 4, 3), text: "Paris est grand.", isCorrect: false, feedback: "True, but not an answer! Say 'À l'hôtel, dans le centre-ville'." },
        ],
      },
      {
        id: s("fr-airport", 5), characterName: "Agent", characterAvatar: "👮",
        dialogue: "Parfait. Bon séjour en France !",
        options: [
          { id: o("fr-airport", 5, 1), text: "Merci beaucoup !", isCorrect: true, feedback: "Bravo ! 'Merci beaucoup' means 'Thank you very much'." },
          { id: o("fr-airport", 5, 2), text: "Au revoir, merci.", isCorrect: true, feedback: "Also great! Polite farewell." },
          { id: o("fr-airport", 5, 3), text: "Oui oui.", isCorrect: false, feedback: "A bit casual! 'Merci beaucoup' is more appropriate here." },
        ],
      },
      {
        id: s("fr-airport", 6), characterName: "Taxi Driver", characterAvatar: "🚕",
        dialogue: "Bonjour ! Vous allez où ?",
        options: [
          { id: o("fr-airport", 6, 1), text: "Au centre-ville, s'il vous plaît.", isCorrect: true, feedback: "Parfait ! Polite and clear." },
          { id: o("fr-airport", 6, 2), text: "Je suis l'aéroport.", isCorrect: false, feedback: "You're AT the airport already. Say where you want to GO: 'Au centre-ville'." },
          { id: o("fr-airport", 6, 3), text: "Conduisez.", isCorrect: false, feedback: "Too commanding! Be polite: 'Au centre-ville, s'il vous plaît'." },
        ],
      },
    ],
  },
  {
    id: "fr-friend",
    title: "Meeting a New Friend",
    location: "A café in Lyon",
    level: "beginner",
    language: "french",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("fr-friend", 1), characterName: "Marie", characterAvatar: "👩",
        dialogue: "Salut ! Tu es nouveau ici ?",
        options: [
          { id: o("fr-friend", 1, 1), text: "Oui, je suis en visite.", isCorrect: true, feedback: "Nice! 'En visite' means visiting." },
          { id: o("fr-friend", 1, 2), text: "Je suis maison.", isCorrect: false, feedback: "'Maison' means house. Try 'Oui, je suis en visite'." },
          { id: o("fr-friend", 1, 3), text: "Non, je suis vieux.", isCorrect: false, feedback: "'Vieux' means old, not new. Try 'Oui, je suis en visite'." },
        ],
      },
      {
        id: s("fr-friend", 2), characterName: "Marie", characterAvatar: "👩",
        dialogue: "Super ! Comment tu t'appelles ?",
        options: [
          { id: o("fr-friend", 2, 1), text: "Je m'appelle Alex. Et toi ?", isCorrect: true, feedback: "Très bien ! 'Je m'appelle' means 'My name is'." },
          { id: o("fr-friend", 2, 2), text: "Je suis bien.", isCorrect: false, feedback: "She asked your name! Use 'Je m'appelle...'." },
          { id: o("fr-friend", 2, 3), text: "Toi aussi.", isCorrect: false, feedback: "'Toi aussi' means 'you too'. Answer with your name: 'Je m'appelle...'." },
        ],
      },
      {
        id: s("fr-friend", 3), characterName: "Marie", characterAvatar: "👩",
        dialogue: "Enchantée, Alex ! Tu viens d'où ?",
        options: [
          { id: o("fr-friend", 3, 1), text: "Je viens des États-Unis.", isCorrect: true, feedback: "Parfait ! 'Je viens de' means 'I come from'." },
          { id: o("fr-friend", 3, 2), text: "Je suis de bon.", isCorrect: false, feedback: "Say a country! 'Je viens des États-Unis' (I come from the US)." },
          { id: o("fr-friend", 3, 3), text: "D'ici.", isCorrect: false, feedback: "'D'ici' means 'from here', but you said you're visiting! Try 'Je viens des États-Unis'." },
        ],
      },
      {
        id: s("fr-friend", 4), characterName: "Marie", characterAvatar: "👩",
        dialogue: "C'est cool ! Tu parles bien français !",
        options: [
          { id: o("fr-friend", 4, 1), text: "Merci ! J'apprends depuis six mois.", isCorrect: true, feedback: "Génial ! 'J'apprends depuis' means 'I've been learning for'." },
          { id: o("fr-friend", 4, 2), text: "Non, je parle anglais.", isCorrect: false, feedback: "She complimented you! Accept it: 'Merci ! J'apprends depuis six mois'." },
          { id: o("fr-friend", 4, 3), text: "Français est difficile.", isCorrect: false, feedback: "Try being positive! 'Merci ! J'apprends depuis six mois'." },
        ],
      },
      {
        id: s("fr-friend", 5), characterName: "Marie", characterAvatar: "👩",
        dialogue: "Tu veux prendre un café avec moi ?",
        options: [
          { id: o("fr-friend", 5, 1), text: "Oui, avec plaisir !", isCorrect: true, feedback: "'Avec plaisir' means 'with pleasure'. Great response!" },
          { id: o("fr-friend", 5, 2), text: "Je mange café.", isCorrect: false, feedback: "You don't eat coffee! Say 'Oui, avec plaisir !'." },
          { id: o("fr-friend", 5, 3), text: "Café non merci au revoir.", isCorrect: false, feedback: "That's a bit abrupt! Try 'Oui, avec plaisir !' to accept friendly." },
        ],
      },
      {
        id: s("fr-friend", 6), characterName: "Marie", characterAvatar: "👩",
        dialogue: "Qu'est-ce que tu veux boire ?",
        options: [
          { id: o("fr-friend", 6, 1), text: "Un café crème, s'il te plaît.", isCorrect: true, feedback: "Parfait ! 'S'il te plaît' is informal for 'please'." },
          { id: o("fr-friend", 6, 2), text: "De l'eau chaude avec du lait.", isCorrect: true, feedback: "That works too! Hot water with milk." },
          { id: o("fr-friend", 6, 3), text: "Je boire.", isCorrect: false, feedback: "Incomplete! Try 'Un café crème, s'il te plaît'." },
        ],
      },
    ],
  },
  {
    id: "fr-coffee",
    title: "Buying Coffee",
    location: "A boulangerie in Montmartre",
    level: "beginner",
    language: "french",
    duration: "4 min",
    xpReward: 40,
    steps: [
      {
        id: s("fr-coffee", 1), characterName: "Barista", characterAvatar: "☕",
        dialogue: "Bonjour ! Qu'est-ce que je vous sers ?",
        options: [
          { id: o("fr-coffee", 1, 1), text: "Un café, s'il vous plaît.", isCorrect: true, feedback: "Très bien ! Simple and polite." },
          { id: o("fr-coffee", 1, 2), text: "Café moi.", isCorrect: false, feedback: "Try the polite form: 'Un café, s'il vous plaît'." },
          { id: o("fr-coffee", 1, 3), text: "Je veux manger un café.", isCorrect: false, feedback: "You drink coffee, not eat it! Say 'Un café, s'il vous plaît'." },
        ],
      },
      {
        id: s("fr-coffee", 2), characterName: "Barista", characterAvatar: "☕",
        dialogue: "Un expresso ou un café allongé ?",
        options: [
          { id: o("fr-coffee", 2, 1), text: "Un expresso, s'il vous plaît.", isCorrect: true, feedback: "Bon choix ! Espresso is classic in France." },
          { id: o("fr-coffee", 2, 2), text: "Un café allongé.", isCorrect: true, feedback: "Also good! 'Allongé' is a longer, milder coffee." },
          { id: o("fr-coffee", 2, 3), text: "Les deux.", isCorrect: false, feedback: "'Les deux' means both! Pick one: expresso or allongé." },
        ],
      },
      {
        id: s("fr-coffee", 3), characterName: "Barista", characterAvatar: "☕",
        dialogue: "Avec un croissant ?",
        options: [
          { id: o("fr-coffee", 3, 1), text: "Oui, un croissant au beurre.", isCorrect: true, feedback: "Délicieux ! Butter croissant is a French classic." },
          { id: o("fr-coffee", 3, 2), text: "Non merci, juste le café.", isCorrect: true, feedback: "That's fine too! 'Juste' means 'just'." },
          { id: o("fr-coffee", 3, 3), text: "Croissant est pain.", isCorrect: false, feedback: "True but not an answer! Say 'Oui' or 'Non merci'." },
        ],
      },
      {
        id: s("fr-coffee", 4), characterName: "Barista", characterAvatar: "☕",
        dialogue: "Ça fait trois euros cinquante.",
        options: [
          { id: o("fr-coffee", 4, 1), text: "Voilà. Je peux payer par carte ?", isCorrect: true, feedback: "Nice! 'Payer par carte' means 'pay by card'." },
          { id: o("fr-coffee", 4, 2), text: "Voilà, en espèces.", isCorrect: true, feedback: "'En espèces' means cash. Both ways work!" },
          { id: o("fr-coffee", 4, 3), text: "Trois est beaucoup.", isCorrect: false, feedback: "That's haggling! Just pay: 'Voilà' with your method." },
        ],
      },
      {
        id: s("fr-coffee", 5), characterName: "Barista", characterAvatar: "☕",
        dialogue: "Merci ! Bonne journée !",
        options: [
          { id: o("fr-coffee", 5, 1), text: "Merci, bonne journée à vous aussi !", isCorrect: true, feedback: "Parfait ! Very polite farewell." },
          { id: o("fr-coffee", 5, 2), text: "Au revoir !", isCorrect: true, feedback: "Also correct! A classic goodbye." },
          { id: o("fr-coffee", 5, 3), text: "Oui.", isCorrect: false, feedback: "A bit flat! Try 'Merci, bonne journée !'." },
        ],
      },
    ],
  },
  {
    id: "fr-hotel",
    title: "Checking into a Hotel",
    location: "Hôtel de la Paix, Nice",
    level: "beginner",
    language: "french",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("fr-hotel", 1), characterName: "Receptionist", characterAvatar: "🏨",
        dialogue: "Bonsoir ! Vous avez une réservation ?",
        options: [
          { id: o("fr-hotel", 1, 1), text: "Oui, au nom de Martin.", isCorrect: true, feedback: "'Au nom de' means 'under the name of'." },
          { id: o("fr-hotel", 1, 2), text: "Je suis hôtel.", isCorrect: false, feedback: "You're not a hotel! Say 'Oui, au nom de...' + your name." },
          { id: o("fr-hotel", 1, 3), text: "Réservation oui non.", isCorrect: false, feedback: "Be clear! 'Oui, au nom de Martin'." },
        ],
      },
      {
        id: s("fr-hotel", 2), characterName: "Receptionist", characterAvatar: "🏨",
        dialogue: "Pour combien de nuits ?",
        options: [
          { id: o("fr-hotel", 2, 1), text: "Trois nuits, s'il vous plaît.", isCorrect: true, feedback: "'Nuits' means nights. Great!" },
          { id: o("fr-hotel", 2, 2), text: "Beaucoup de nuits.", isCorrect: false, feedback: "Be specific! 'Trois nuits' (three nights)." },
          { id: o("fr-hotel", 2, 3), text: "Nuit.", isCorrect: false, feedback: "How many? Try 'Trois nuits, s'il vous plaît'." },
        ],
      },
      {
        id: s("fr-hotel", 3), characterName: "Receptionist", characterAvatar: "🏨",
        dialogue: "Voici votre clé. Chambre 204, au deuxième étage.",
        options: [
          { id: o("fr-hotel", 3, 1), text: "Merci. Il y a un ascenseur ?", isCorrect: true, feedback: "'Ascenseur' means elevator. Smart question!" },
          { id: o("fr-hotel", 3, 2), text: "Merci beaucoup.", isCorrect: true, feedback: "Simple and polite!" },
          { id: o("fr-hotel", 3, 3), text: "Clé est petite.", isCorrect: false, feedback: "That's not relevant! Thank them: 'Merci beaucoup'." },
        ],
      },
      {
        id: s("fr-hotel", 4), characterName: "Receptionist", characterAvatar: "🏨",
        dialogue: "Le petit-déjeuner est servi de sept heures à dix heures.",
        options: [
          { id: o("fr-hotel", 4, 1), text: "C'est inclus dans le prix ?", isCorrect: true, feedback: "'Inclus dans le prix' means 'included in the price'. Smart!" },
          { id: o("fr-hotel", 4, 2), text: "D'accord, merci.", isCorrect: true, feedback: "'D'accord' means OK. Simple and effective!" },
          { id: o("fr-hotel", 4, 3), text: "Je mange sept heures.", isCorrect: false, feedback: "You don't eat seven hours! Say 'D'accord, merci'." },
        ],
      },
      {
        id: s("fr-hotel", 5), characterName: "Receptionist", characterAvatar: "🏨",
        dialogue: "Bon séjour !",
        options: [
          { id: o("fr-hotel", 5, 1), text: "Merci, bonne soirée !", isCorrect: true, feedback: "'Bonne soirée' means good evening. Perfect!" },
          { id: o("fr-hotel", 5, 2), text: "Au revoir !", isCorrect: true, feedback: "Classic and polite!" },
          { id: o("fr-hotel", 5, 3), text: "Séjour.", isCorrect: false, feedback: "Say goodbye properly! 'Merci, bonne soirée !'." },
        ],
      },
    ],
  },
  // INTERMEDIATE
  {
    id: "fr-restaurant",
    title: "Ordering at a Restaurant",
    location: "Le Petit Bistrot, Bordeaux",
    level: "intermediate",
    language: "french",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("fr-restaurant", 1), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Bonsoir ! Vous avez réservé ?",
        options: [
          { id: o("fr-restaurant", 1, 1), text: "Non, est-ce qu'il y a une table pour deux ?", isCorrect: true, feedback: "Great! Asking for a table politely." },
          { id: o("fr-restaurant", 1, 2), text: "Oui, au nom de Dupont.", isCorrect: true, feedback: "If you reserved, this is perfect!" },
          { id: o("fr-restaurant", 1, 3), text: "Table maintenant.", isCorrect: false, feedback: "Too blunt! Try 'Est-ce qu'il y a une table pour deux ?'." },
        ],
      },
      {
        id: s("fr-restaurant", 2), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Voici le menu. Je vous laisse choisir.",
        options: [
          { id: o("fr-restaurant", 2, 1), text: "Qu'est-ce que vous recommandez ?", isCorrect: true, feedback: "Asking for a recommendation—very natural!" },
          { id: o("fr-restaurant", 2, 2), text: "Quel est le plat du jour ?", isCorrect: true, feedback: "'Plat du jour' means dish of the day. Excellent!" },
          { id: o("fr-restaurant", 2, 3), text: "Je veux tout.", isCorrect: false, feedback: "You can't eat everything! Ask 'Qu'est-ce que vous recommandez ?'." },
        ],
      },
      {
        id: s("fr-restaurant", 3), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Je recommande le confit de canard. C'est notre spécialité.",
        options: [
          { id: o("fr-restaurant", 3, 1), text: "Ça a l'air délicieux. Je vais prendre ça.", isCorrect: true, feedback: "'Ça a l'air délicieux' means 'That looks delicious'." },
          { id: o("fr-restaurant", 3, 2), text: "Je préfère quelque chose de plus léger.", isCorrect: true, feedback: "'Plus léger' means lighter. Good preference!" },
          { id: o("fr-restaurant", 3, 3), text: "Canard est animal.", isCorrect: false, feedback: "True but irrelevant! Respond to the recommendation." },
        ],
      },
      {
        id: s("fr-restaurant", 4), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Et comme boisson ?",
        options: [
          { id: o("fr-restaurant", 4, 1), text: "Un verre de vin rouge, s'il vous plaît.", isCorrect: true, feedback: "Classic choice with confit de canard!" },
          { id: o("fr-restaurant", 4, 2), text: "De l'eau plate, s'il vous plaît.", isCorrect: true, feedback: "'Eau plate' means still water. A fine choice!" },
          { id: o("fr-restaurant", 4, 3), text: "Boisson non.", isCorrect: false, feedback: "Pick a drink! 'Un verre de vin rouge' or 'De l'eau plate'." },
        ],
      },
      {
        id: s("fr-restaurant", 5), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Vous prendrez un dessert ?",
        options: [
          { id: o("fr-restaurant", 5, 1), text: "Oui, une crème brûlée, s'il vous plaît.", isCorrect: true, feedback: "A classic French dessert choice!" },
          { id: o("fr-restaurant", 5, 2), text: "Non merci, juste l'addition.", isCorrect: true, feedback: "'L'addition' means the bill. Direct and clear!" },
          { id: o("fr-restaurant", 5, 3), text: "Dessert est sucre.", isCorrect: false, feedback: "Yes, but answer the question! Say oui or non." },
        ],
      },
      {
        id: s("fr-restaurant", 6), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Voilà l'addition. Ça fait quarante-deux euros.",
        options: [
          { id: o("fr-restaurant", 6, 1), text: "Je peux payer par carte ?", isCorrect: true, feedback: "Practical question about payment!" },
          { id: o("fr-restaurant", 6, 2), text: "Voilà. C'était excellent, merci !", isCorrect: true, feedback: "Complimenting the meal while paying. Magnifique!" },
          { id: o("fr-restaurant", 6, 3), text: "C'est trop cher.", isCorrect: false, feedback: "That's rude in a restaurant! Pay gracefully." },
        ],
      },
      {
        id: s("fr-restaurant", 7), characterName: "Waiter", characterAvatar: "🧑‍🍳",
        dialogue: "Merci beaucoup ! Bonne soirée !",
        options: [
          { id: o("fr-restaurant", 7, 1), text: "Merci, le repas était délicieux. Bonne soirée !", isCorrect: true, feedback: "Perfect farewell! Complimenting the meal." },
          { id: o("fr-restaurant", 7, 2), text: "Au revoir et merci !", isCorrect: true, feedback: "Simple and warm goodbye." },
          { id: o("fr-restaurant", 7, 3), text: "Oui.", isCorrect: false, feedback: "Too brief! Say 'Merci, bonne soirée !'." },
        ],
      },
    ],
  },
  {
    id: "fr-directions",
    title: "Asking for Directions",
    location: "Streets of Marseille",
    level: "intermediate",
    language: "french",
    duration: "6 min",
    xpReward: 65,
    steps: [
      {
        id: s("fr-directions", 1), characterName: "Passerby", characterAvatar: "🚶",
        dialogue: "Vous cherchez quelque chose ?",
        options: [
          { id: o("fr-directions", 1, 1), text: "Oui, je cherche la gare.", isCorrect: true, feedback: "'La gare' means the train station." },
          { id: o("fr-directions", 1, 2), text: "Je suis perdu.", isCorrect: true, feedback: "'Je suis perdu' means 'I'm lost'. Good start!" },
          { id: o("fr-directions", 1, 3), text: "Non, je suis bien.", isCorrect: false, feedback: "But you need directions! Try 'Je cherche la gare'." },
        ],
      },
      {
        id: s("fr-directions", 2), characterName: "Passerby", characterAvatar: "🚶",
        dialogue: "La gare ? C'est à dix minutes à pied. Allez tout droit.",
        options: [
          { id: o("fr-directions", 2, 1), text: "Tout droit, d'accord. Et ensuite ?", isCorrect: true, feedback: "'Tout droit' means straight ahead. 'Ensuite' means 'then'." },
          { id: o("fr-directions", 2, 2), text: "C'est loin ?", isCorrect: true, feedback: "'C'est loin' means 'Is it far?' Good question!" },
          { id: o("fr-directions", 2, 3), text: "Je ne marche pas.", isCorrect: false, feedback: "But you asked for directions! Follow up: 'Et ensuite ?'." },
        ],
      },
      {
        id: s("fr-directions", 3), characterName: "Passerby", characterAvatar: "🚶",
        dialogue: "Tournez à gauche au feu rouge, puis continuez tout droit.",
        options: [
          { id: o("fr-directions", 3, 1), text: "À gauche au feu rouge, compris !", isCorrect: true, feedback: "'À gauche' = left, 'feu rouge' = traffic light. Well understood!" },
          { id: o("fr-directions", 3, 2), text: "Pouvez-vous répéter, s'il vous plaît ?", isCorrect: true, feedback: "Asking to repeat is perfectly fine!" },
          { id: o("fr-directions", 3, 3), text: "Gauche ou droite ?", isCorrect: false, feedback: "They said 'à gauche' (left)! Confirm: 'À gauche, compris'." },
        ],
      },
      {
        id: s("fr-directions", 4), characterName: "Passerby", characterAvatar: "🚶",
        dialogue: "Vous verrez la gare sur votre droite.",
        options: [
          { id: o("fr-directions", 4, 1), text: "Parfait, merci beaucoup pour votre aide !", isCorrect: true, feedback: "Polite and grateful. Well done!" },
          { id: o("fr-directions", 4, 2), text: "Sur la droite, d'accord. Merci !", isCorrect: true, feedback: "Confirming the direction. Great!" },
          { id: o("fr-directions", 4, 3), text: "Droite.", isCorrect: false, feedback: "Too brief! Thank them: 'Merci beaucoup !'." },
        ],
      },
      {
        id: s("fr-directions", 5), characterName: "Passerby", characterAvatar: "🚶",
        dialogue: "De rien ! Bon courage !",
        options: [
          { id: o("fr-directions", 5, 1), text: "Merci, bonne journée !", isCorrect: true, feedback: "A warm goodbye! 'Bonne journée' means 'have a good day'." },
          { id: o("fr-directions", 5, 2), text: "Au revoir !", isCorrect: true, feedback: "Simple and classic." },
          { id: o("fr-directions", 5, 3), text: "Courage.", isCorrect: false, feedback: "Respond with a proper goodbye: 'Merci, bonne journée !'." },
        ],
      },
    ],
  },
  {
    id: "fr-market",
    title: "Shopping at a Market",
    location: "Marché Provençal, Aix-en-Provence",
    level: "intermediate",
    language: "french",
    duration: "6 min",
    xpReward: 70,
    steps: [
      {
        id: s("fr-market", 1), characterName: "Vendor", characterAvatar: "🧑‍🌾",
        dialogue: "Bonjour ! Regardez ces belles tomates !",
        options: [
          { id: o("fr-market", 1, 1), text: "Elles ont l'air délicieuses ! C'est combien le kilo ?", isCorrect: true, feedback: "Asking the price per kilo—very natural at a market!" },
          { id: o("fr-market", 1, 2), text: "Je voudrais des tomates, s'il vous plaît.", isCorrect: true, feedback: "'Je voudrais' means 'I would like'. Polite!" },
          { id: o("fr-market", 1, 3), text: "Tomates rouges.", isCorrect: false, feedback: "That's just a description! Try asking the price or ordering." },
        ],
      },
      {
        id: s("fr-market", 2), characterName: "Vendor", characterAvatar: "🧑‍🌾",
        dialogue: "Trois euros le kilo. Combien vous en voulez ?",
        options: [
          { id: o("fr-market", 2, 1), text: "Un kilo, s'il vous plaît.", isCorrect: true, feedback: "Clear and polite order!" },
          { id: o("fr-market", 2, 2), text: "Deux kilos, s'il vous plaît.", isCorrect: true, feedback: "A bigger order! Both work." },
          { id: o("fr-market", 2, 3), text: "Euros non.", isCorrect: false, feedback: "Just say how much you want: 'Un kilo, s'il vous plaît'." },
        ],
      },
      {
        id: s("fr-market", 3), characterName: "Vendor", characterAvatar: "🧑‍🌾",
        dialogue: "Voilà ! Autre chose ?",
        options: [
          { id: o("fr-market", 3, 1), text: "Oui, vous avez des fraises ?", isCorrect: true, feedback: "'Des fraises' means strawberries. Yummy!" },
          { id: o("fr-market", 3, 2), text: "Non merci, c'est tout.", isCorrect: true, feedback: "'C'est tout' means 'that's all'. Perfect!" },
          { id: o("fr-market", 3, 3), text: "Chose oui.", isCorrect: false, feedback: "Be specific! 'Vous avez des fraises ?' or 'C'est tout'." },
        ],
      },
      {
        id: s("fr-market", 4), characterName: "Vendor", characterAvatar: "🧑‍🌾",
        dialogue: "Bien sûr ! Goûtez, elles sont sucrées !",
        options: [
          { id: o("fr-market", 4, 1), text: "Mmm, elles sont excellentes ! J'en prends une barquette.", isCorrect: true, feedback: "'Barquette' means a small basket/punnet. Market vocabulary!" },
          { id: o("fr-market", 4, 2), text: "Merci ! Elles sont très bonnes.", isCorrect: true, feedback: "Appreciating the taste. Natural!" },
          { id: o("fr-market", 4, 3), text: "Sucre non.", isCorrect: false, feedback: "They said the strawberries are sweet! Try 'Elles sont excellentes'." },
        ],
      },
      {
        id: s("fr-market", 5), characterName: "Vendor", characterAvatar: "🧑‍🌾",
        dialogue: "Ça fait sept euros en tout.",
        options: [
          { id: o("fr-market", 5, 1), text: "Voilà. Merci beaucoup, bonne journée !", isCorrect: true, feedback: "Perfect market farewell!" },
          { id: o("fr-market", 5, 2), text: "Tenez. Au revoir !", isCorrect: true, feedback: "'Tenez' means 'here you go'. Great!" },
          { id: o("fr-market", 5, 3), text: "Sept.", isCorrect: false, feedback: "Pay and say goodbye! 'Voilà, merci beaucoup !'." },
        ],
      },
    ],
  },
  {
    id: "fr-train",
    title: "Booking a Train Ticket",
    location: "Gare de Lyon, Paris",
    level: "intermediate",
    language: "french",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("fr-train", 1), characterName: "Agent", characterAvatar: "🚂",
        dialogue: "Bonjour ! Je peux vous aider ?",
        options: [
          { id: o("fr-train", 1, 1), text: "Oui, je voudrais un billet pour Lyon.", isCorrect: true, feedback: "'Un billet pour' means 'a ticket to'. Perfect!" },
          { id: o("fr-train", 1, 2), text: "Un aller-retour pour Marseille, s'il vous plaît.", isCorrect: true, feedback: "'Aller-retour' means round trip!" },
          { id: o("fr-train", 1, 3), text: "Train Lyon.", isCorrect: false, feedback: "Be polite! 'Je voudrais un billet pour Lyon'." },
        ],
      },
      {
        id: s("fr-train", 2), characterName: "Agent", characterAvatar: "🚂",
        dialogue: "Aller simple ou aller-retour ?",
        options: [
          { id: o("fr-train", 2, 1), text: "Aller-retour, s'il vous plaît.", isCorrect: true, feedback: "Round trip! Good choice." },
          { id: o("fr-train", 2, 2), text: "Aller simple.", isCorrect: true, feedback: "'Aller simple' means one-way. Also valid!" },
          { id: o("fr-train", 2, 3), text: "Je ne comprends pas la question.", isCorrect: false, feedback: "'Aller simple' = one-way, 'Aller-retour' = round trip." },
        ],
      },
      {
        id: s("fr-train", 3), characterName: "Agent", characterAvatar: "🚂",
        dialogue: "En première ou deuxième classe ?",
        options: [
          { id: o("fr-train", 3, 1), text: "Deuxième classe, s'il vous plaît.", isCorrect: true, feedback: "Économique ! Second class is standard." },
          { id: o("fr-train", 3, 2), text: "Première classe.", isCorrect: true, feedback: "First class! More spacious." },
          { id: o("fr-train", 3, 3), text: "La meilleure classe.", isCorrect: false, feedback: "Specify: 'Première' or 'Deuxième' classe." },
        ],
      },
      {
        id: s("fr-train", 4), characterName: "Agent", characterAvatar: "🚂",
        dialogue: "Le prochain train part à quatorze heures trente. Ça vous convient ?",
        options: [
          { id: o("fr-train", 4, 1), text: "Oui, c'est parfait.", isCorrect: true, feedback: "Great! 14h30 works for you." },
          { id: o("fr-train", 4, 2), text: "Il y a un train plus tôt ?", isCorrect: true, feedback: "'Plus tôt' means earlier. Smart question!" },
          { id: o("fr-train", 4, 3), text: "Quatorze non.", isCorrect: false, feedback: "Be specific! 'Il y a un train plus tôt ?' or 'Oui, c'est parfait'." },
        ],
      },
      {
        id: s("fr-train", 5), characterName: "Agent", characterAvatar: "🚂",
        dialogue: "Ça fait quarante-cinq euros. Vous payez comment ?",
        options: [
          { id: o("fr-train", 5, 1), text: "Par carte bancaire, s'il vous plaît.", isCorrect: true, feedback: "'Carte bancaire' means bank card. Very common!" },
          { id: o("fr-train", 5, 2), text: "En espèces.", isCorrect: true, feedback: "Cash payment. Still accepted!" },
          { id: o("fr-train", 5, 3), text: "Gratuit ?", isCorrect: false, feedback: "Trains aren't free! Pay: 'Par carte bancaire'." },
        ],
      },
      {
        id: s("fr-train", 6), characterName: "Agent", characterAvatar: "🚂",
        dialogue: "Voilà votre billet. Quai numéro sept. Bon voyage !",
        options: [
          { id: o("fr-train", 6, 1), text: "Merci beaucoup ! Bonne journée !", isCorrect: true, feedback: "'Quai' means platform. Bon voyage!" },
          { id: o("fr-train", 6, 2), text: "Le quai sept, compris. Merci !", isCorrect: true, feedback: "Confirming the platform number. Smart!" },
          { id: o("fr-train", 6, 3), text: "Voyage.", isCorrect: false, feedback: "Say goodbye properly! 'Merci beaucoup, bonne journée !'." },
        ],
      },
    ],
  },
  // ADVANCED
  {
    id: "fr-interview",
    title: "Job Interview",
    location: "Office in La Défense, Paris",
    level: "advanced",
    language: "french",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("fr-interview", 1), characterName: "HR Manager", characterAvatar: "💼",
        dialogue: "Bonjour, merci d'être venu. Parlez-moi un peu de vous.",
        options: [
          { id: o("fr-interview", 1, 1), text: "Bonjour. Je suis diplômé en marketing et j'ai trois ans d'expérience.", isCorrect: true, feedback: "Strong professional introduction!" },
          { id: o("fr-interview", 1, 2), text: "Je suis gentil et j'aime les chats.", isCorrect: false, feedback: "Too personal! Focus on professional experience." },
          { id: o("fr-interview", 1, 3), text: "Bonjour. J'ai étudié le commerce international à Toulouse.", isCorrect: true, feedback: "Good! Mentioning your studies and city." },
        ],
      },
      {
        id: s("fr-interview", 2), characterName: "HR Manager", characterAvatar: "💼",
        dialogue: "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
        options: [
          { id: o("fr-interview", 2, 1), text: "Votre entreprise est reconnue pour son innovation et ses valeurs.", isCorrect: true, feedback: "Formal and flattering. Well done!" },
          { id: o("fr-interview", 2, 2), text: "Parce que j'ai besoin d'argent.", isCorrect: false, feedback: "Too direct! Focus on company values, not money." },
          { id: o("fr-interview", 2, 3), text: "Je suis passionné par votre secteur et j'aimerais y contribuer.", isCorrect: true, feedback: "'Contribuer' means to contribute. Very professional!" },
        ],
      },
      {
        id: s("fr-interview", 3), characterName: "HR Manager", characterAvatar: "💼",
        dialogue: "Quels sont vos points forts ?",
        options: [
          { id: o("fr-interview", 3, 1), text: "Je suis rigoureux, créatif et j'ai un bon esprit d'équipe.", isCorrect: true, feedback: "'Esprit d'équipe' means team spirit. Great qualities!" },
          { id: o("fr-interview", 3, 2), text: "Je suis parfait.", isCorrect: false, feedback: "Too arrogant! List specific strengths with examples." },
          { id: o("fr-interview", 3, 3), text: "Je suis organisé et je m'adapte facilement aux nouvelles situations.", isCorrect: true, feedback: "Adaptability is valued! Excellent answer." },
        ],
      },
      {
        id: s("fr-interview", 4), characterName: "HR Manager", characterAvatar: "💼",
        dialogue: "Où vous voyez-vous dans cinq ans ?",
        options: [
          { id: o("fr-interview", 4, 1), text: "J'aimerais évoluer vers un poste de responsable d'équipe.", isCorrect: true, feedback: "'Évoluer' means to progress. Ambitious yet realistic!" },
          { id: o("fr-interview", 4, 2), text: "À votre place.", isCorrect: false, feedback: "Threatening the interviewer is not wise! Think growth." },
          { id: o("fr-interview", 4, 3), text: "Je souhaite approfondir mes compétences et prendre plus de responsabilités.", isCorrect: true, feedback: "'Approfondir' means to deepen. Very professional!" },
        ],
      },
      {
        id: s("fr-interview", 5), characterName: "HR Manager", characterAvatar: "💼",
        dialogue: "Avez-vous des questions pour nous ?",
        options: [
          { id: o("fr-interview", 5, 1), text: "Oui, comment se déroule une journée type dans ce poste ?", isCorrect: true, feedback: "Asking about daily routine shows genuine interest!" },
          { id: o("fr-interview", 5, 2), text: "Quelles sont les perspectives d'évolution au sein de l'entreprise ?", isCorrect: true, feedback: "'Perspectives d'évolution' means growth opportunities. Smart!" },
          { id: o("fr-interview", 5, 3), text: "Non, aucune question.", isCorrect: false, feedback: "Always ask questions! It shows interest in the role." },
        ],
      },
      {
        id: s("fr-interview", 6), characterName: "HR Manager", characterAvatar: "💼",
        dialogue: "Très bien. Nous vous recontacterons la semaine prochaine. Merci !",
        options: [
          { id: o("fr-interview", 6, 1), text: "Merci pour votre temps. J'ai hâte d'avoir de vos nouvelles.", isCorrect: true, feedback: "'J'ai hâte' means 'I look forward to'. Professional closure!" },
          { id: o("fr-interview", 6, 2), text: "Merci beaucoup. Bonne journée !", isCorrect: true, feedback: "Clean and professional farewell." },
          { id: o("fr-interview", 6, 3), text: "D'accord bye.", isCorrect: false, feedback: "Too casual for a job interview! Stay formal." },
        ],
      },
    ],
  },
  {
    id: "fr-business",
    title: "Business Meeting",
    location: "Conference room, Strasbourg",
    level: "advanced",
    language: "french",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("fr-business", 1), characterName: "Colleague", characterAvatar: "👔",
        dialogue: "Bonjour à tous. Commençons par le bilan du trimestre.",
        options: [
          { id: o("fr-business", 1, 1), text: "J'ai préparé un résumé des résultats. Puis-je commencer ?", isCorrect: true, feedback: "Taking initiative in a meeting. Very professional!" },
          { id: o("fr-business", 1, 2), text: "Les chiffres sont positifs ce trimestre.", isCorrect: true, feedback: "Direct and relevant comment." },
          { id: o("fr-business", 1, 3), text: "Je n'ai rien préparé.", isCorrect: false, feedback: "Not prepared for a meeting? Try being proactive!" },
        ],
      },
      {
        id: s("fr-business", 2), characterName: "Colleague", characterAvatar: "👔",
        dialogue: "Les ventes ont augmenté de 15%. Qu'en pensez-vous ?",
        options: [
          { id: o("fr-business", 2, 1), text: "C'est encourageant. Je pense que notre nouvelle stratégie porte ses fruits.", isCorrect: true, feedback: "'Porter ses fruits' means 'to bear fruit'. Idiomatic!" },
          { id: o("fr-business", 2, 2), text: "Il faudrait analyser quels produits ont le mieux performé.", isCorrect: true, feedback: "Analytical thinking! Great professional response." },
          { id: o("fr-business", 2, 3), text: "Quinze pourcent c'est bien.", isCorrect: false, feedback: "Too simple! Add analysis: 'Notre stratégie porte ses fruits'." },
        ],
      },
      {
        id: s("fr-business", 3), characterName: "Colleague", characterAvatar: "👔",
        dialogue: "Quels objectifs proposez-vous pour le prochain trimestre ?",
        options: [
          { id: o("fr-business", 3, 1), text: "Je propose d'augmenter notre présence sur les réseaux sociaux.", isCorrect: true, feedback: "'Réseaux sociaux' means social media. Strategic thinking!" },
          { id: o("fr-business", 3, 2), text: "Nous devrions viser une croissance de 20% et diversifier nos marchés.", isCorrect: true, feedback: "'Diversifier nos marchés' means diversify markets. Ambitious!" },
          { id: o("fr-business", 3, 3), text: "Plus de ventes.", isCorrect: false, feedback: "Too vague! Be specific about strategy and numbers." },
        ],
      },
      {
        id: s("fr-business", 4), characterName: "Colleague", characterAvatar: "👔",
        dialogue: "Y a-t-il des obstacles que nous devrions anticiper ?",
        options: [
          { id: o("fr-business", 4, 1), text: "La concurrence s'intensifie, nous devons innover davantage.", isCorrect: true, feedback: "'La concurrence' means competition. Strategic awareness!" },
          { id: o("fr-business", 4, 2), text: "Le budget marketing pourrait être un frein si on ne l'augmente pas.", isCorrect: true, feedback: "'Frein' means brake/obstacle. Good financial thinking!" },
          { id: o("fr-business", 4, 3), text: "Non, tout va bien.", isCorrect: false, feedback: "Being realistic about challenges is important in business!" },
        ],
      },
      {
        id: s("fr-business", 5), characterName: "Colleague", characterAvatar: "👔",
        dialogue: "Bien. Résumons les actions à prendre.",
        options: [
          { id: o("fr-business", 5, 1), text: "Je me charge du plan marketing et je vous envoie un rapport vendredi.", isCorrect: true, feedback: "'Je me charge de' means 'I'll take care of'. Taking ownership!" },
          { id: o("fr-business", 5, 2), text: "Je propose qu'on se retrouve la semaine prochaine pour valider le plan.", isCorrect: true, feedback: "Follow-up meetings show good project management!" },
          { id: o("fr-business", 5, 3), text: "D'accord.", isCorrect: false, feedback: "Take action! Volunteer for tasks." },
        ],
      },
    ],
  },
  {
    id: "fr-travel-problem",
    title: "Resolving a Travel Problem",
    location: "Train station, Toulouse",
    level: "advanced",
    language: "french",
    duration: "7 min",
    xpReward: 90,
    steps: [
      {
        id: s("fr-travel-problem", 1), characterName: "Station Agent", characterAvatar: "🚉",
        dialogue: "Je suis désolé, votre train a été annulé en raison d'une grève.",
        options: [
          { id: o("fr-travel-problem", 1, 1), text: "C'est ennuyeux. Quelles sont mes options ?", isCorrect: true, feedback: "'C'est ennuyeux' means 'that's annoying'. Calm and practical!" },
          { id: o("fr-travel-problem", 1, 2), text: "Est-ce qu'il y a un autre train aujourd'hui ?", isCorrect: true, feedback: "Direct question about alternatives. Smart!" },
          { id: o("fr-travel-problem", 1, 3), text: "C'est inacceptable, je veux un remboursement immédiat !", isCorrect: false, feedback: "Understandable frustration, but first ask about alternatives." },
        ],
      },
      {
        id: s("fr-travel-problem", 2), characterName: "Station Agent", characterAvatar: "🚉",
        dialogue: "Il y a un bus de remplacement dans deux heures, ou un train demain matin.",
        options: [
          { id: o("fr-travel-problem", 2, 1), text: "Je préfère le bus. Où est-ce que je le prends ?", isCorrect: true, feedback: "'Bus de remplacement' means replacement bus." },
          { id: o("fr-travel-problem", 2, 2), text: "Pouvez-vous me réserver une place sur le train de demain ?", isCorrect: true, feedback: "Planning ahead! Professional approach." },
          { id: o("fr-travel-problem", 2, 3), text: "Deux heures c'est trop long, non.", isCorrect: false, feedback: "Those are your options. Pick one!" },
        ],
      },
      {
        id: s("fr-travel-problem", 3), characterName: "Station Agent", characterAvatar: "🚉",
        dialogue: "Bien sûr. Voulez-vous un bon de remboursement ou un échange de billet ?",
        options: [
          { id: o("fr-travel-problem", 3, 1), text: "Un échange de billet serait préférable.", isCorrect: true, feedback: "'Échange de billet' means ticket exchange. Practical choice!" },
          { id: o("fr-travel-problem", 3, 2), text: "Je préfère un remboursement, s'il vous plaît.", isCorrect: true, feedback: "Getting your money back. Valid option!" },
          { id: o("fr-travel-problem", 3, 3), text: "Les deux.", isCorrect: false, feedback: "You can't have both! Pick one option." },
        ],
      },
      {
        id: s("fr-travel-problem", 4), characterName: "Station Agent", characterAvatar: "🚉",
        dialogue: "C'est fait. Désolé encore pour le désagrément.",
        options: [
          { id: o("fr-travel-problem", 4, 1), text: "Ce n'est pas grave. Merci pour votre aide.", isCorrect: true, feedback: "'Ce n'est pas grave' means 'it's no big deal'. Graceful!" },
          { id: o("fr-travel-problem", 4, 2), text: "Merci. Ces choses arrivent. Bonne journée !", isCorrect: true, feedback: "'Ces choses arrivent' = these things happen. Philosophical!" },
          { id: o("fr-travel-problem", 4, 3), text: "La prochaine fois, pas de grève.", isCorrect: false, feedback: "The agent can't control strikes! Be graceful." },
        ],
      },
    ],
  },
  {
    id: "fr-debate",
    title: "Debating an Opinion",
    location: "University café, Paris",
    level: "advanced",
    language: "french",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("fr-debate", 1), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Tu penses que l'intelligence artificielle va remplacer les professeurs ?",
        options: [
          { id: o("fr-debate", 1, 1), text: "Je ne pense pas. L'IA peut aider, mais le contact humain reste essentiel.", isCorrect: true, feedback: "Nuanced opinion with reasoning. Excellent!" },
          { id: o("fr-debate", 1, 2), text: "C'est possible à long terme, mais ça pose des questions éthiques.", isCorrect: true, feedback: "'Questions éthiques' means ethical questions. Deep thinking!" },
          { id: o("fr-debate", 1, 3), text: "Oui, les robots sont mieux.", isCorrect: false, feedback: "Too simplistic! Develop your argument with nuance." },
        ],
      },
      {
        id: s("fr-debate", 2), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Mais est-ce que les élèves n'apprennent pas mieux avec la technologie ?",
        options: [
          { id: o("fr-debate", 2, 1), text: "Ça dépend. La technologie est un outil, pas une fin en soi.", isCorrect: true, feedback: "'Une fin en soi' means 'an end in itself'. Philosophical!" },
          { id: o("fr-debate", 2, 2), text: "En partie, mais l'interaction avec un enseignant stimule la pensée critique.", isCorrect: true, feedback: "'Pensée critique' means critical thinking. Well argued!" },
          { id: o("fr-debate", 2, 3), text: "Non, les livres sont mieux.", isCorrect: false, feedback: "Too dismissive! Engage with the argument more deeply." },
        ],
      },
      {
        id: s("fr-debate", 3), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Intéressant. Et par rapport au marché du travail ?",
        options: [
          { id: o("fr-debate", 3, 1), text: "L'IA va transformer de nombreux métiers, mais en créer d'autres aussi.", isCorrect: true, feedback: "Balanced view on AI and employment. Mature reasoning!" },
          { id: o("fr-debate", 3, 2), text: "Il faudra s'adapter. La formation continue sera cruciale.", isCorrect: true, feedback: "'Formation continue' means continuing education. Forward-thinking!" },
          { id: o("fr-debate", 3, 3), text: "Tout le monde va perdre son travail.", isCorrect: false, feedback: "Too alarmist! A nuanced view is better." },
        ],
      },
      {
        id: s("fr-debate", 4), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Tu as raison. En tout cas, c'est un sujet passionnant.",
        options: [
          { id: o("fr-debate", 4, 1), text: "Absolument. C'est important d'en discuter pour se préparer à l'avenir.", isCorrect: true, feedback: "'Se préparer à l'avenir' means preparing for the future. Great conclusion!" },
          { id: o("fr-debate", 4, 2), text: "Oui, j'aime bien ces débats. On devrait en reparler !", isCorrect: true, feedback: "Expressing enthusiasm for future discussion. Friendly!" },
          { id: o("fr-debate", 4, 3), text: "Oui.", isCorrect: false, feedback: "Engage more! This is a rich topic deserving a thoughtful conclusion." },
        ],
      },
    ],
  },
];

// ─── SPANISH STORIES ───────────────────────────────────────

const spanishStories: Story[] = [
  // BEGINNER
  {
    id: "es-airport",
    title: "Llegada al Aeropuerto",
    location: "Aeropuerto de Barajas, Madrid",
    level: "beginner",
    language: "spanish",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("es-airport", 1), characterName: "Agente", characterAvatar: "👮",
        dialogue: "¡Hola! Bienvenido a España. Su pasaporte, por favor.",
        options: [
          { id: o("es-airport", 1, 1), text: "Aquí tiene mi pasaporte.", isCorrect: true, feedback: "'Aquí tiene' means 'Here you go'. Polite!" },
          { id: o("es-airport", 1, 2), text: "Yo soy pasaporte.", isCorrect: false, feedback: "'Yo soy' means 'I am'. Say 'Aquí tiene mi pasaporte'." },
          { id: o("es-airport", 1, 3), text: "Pasaporte no.", isCorrect: false, feedback: "You need to present it! 'Aquí tiene mi pasaporte'." },
        ],
      },
      {
        id: s("es-airport", 2), characterName: "Agente", characterAvatar: "👮",
        dialogue: "Gracias. ¿Cuál es el motivo de su visita?",
        options: [
          { id: o("es-airport", 2, 1), text: "Estoy de vacaciones.", isCorrect: true, feedback: "'De vacaciones' means 'on vacation'. Great!" },
          { id: o("es-airport", 2, 2), text: "Soy comer.", isCorrect: false, feedback: "'Comer' means to eat. Say 'Estoy de vacaciones'." },
          { id: o("es-airport", 2, 3), text: "Sí.", isCorrect: false, feedback: "The agent asked for a reason. Try 'Estoy de vacaciones'." },
        ],
      },
      {
        id: s("es-airport", 3), characterName: "Agente", characterAvatar: "👮",
        dialogue: "¿Cuánto tiempo se queda en España?",
        options: [
          { id: o("es-airport", 3, 1), text: "Una semana.", isCorrect: true, feedback: "'Una semana' means one week." },
          { id: o("es-airport", 3, 2), text: "Mucho España.", isCorrect: false, feedback: "Specify a duration! 'Una semana'." },
          { id: o("es-airport", 3, 3), text: "No lo sé.", isCorrect: false, feedback: "Try giving a duration: 'Una semana'." },
        ],
      },
      {
        id: s("es-airport", 4), characterName: "Agente", characterAvatar: "👮",
        dialogue: "Muy bien. ¡Que disfrute de España!",
        options: [
          { id: o("es-airport", 4, 1), text: "¡Muchas gracias!", isCorrect: true, feedback: "Perfect! Polite and warm." },
          { id: o("es-airport", 4, 2), text: "Adiós, gracias.", isCorrect: true, feedback: "Also a good farewell." },
          { id: o("es-airport", 4, 3), text: "Sí sí.", isCorrect: false, feedback: "Be more polite! '¡Muchas gracias!'." },
        ],
      },
      {
        id: s("es-airport", 5), characterName: "Taxista", characterAvatar: "🚕",
        dialogue: "¡Hola! ¿Adónde va?",
        options: [
          { id: o("es-airport", 5, 1), text: "Al centro de la ciudad, por favor.", isCorrect: true, feedback: "Clear destination. Polite!" },
          { id: o("es-airport", 5, 2), text: "Soy aeropuerto.", isCorrect: false, feedback: "You're AT the airport. Say where you're GOING!" },
          { id: o("es-airport", 5, 3), text: "Conduzca.", isCorrect: false, feedback: "Too commanding! Say 'Al centro, por favor'." },
        ],
      },
    ],
  },
  {
    id: "es-friend",
    title: "Conocer a un Nuevo Amigo",
    location: "Una plaza en Barcelona",
    level: "beginner",
    language: "spanish",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("es-friend", 1), characterName: "Carlos", characterAvatar: "👨",
        dialogue: "¡Hola! ¿Eres nuevo aquí?",
        options: [
          { id: o("es-friend", 1, 1), text: "Sí, estoy de visita.", isCorrect: true, feedback: "'De visita' means visiting." },
          { id: o("es-friend", 1, 2), text: "Soy casa.", isCorrect: false, feedback: "'Casa' means house. Try 'Estoy de visita'." },
          { id: o("es-friend", 1, 3), text: "No, soy viejo.", isCorrect: false, feedback: "'Viejo' means old. Try 'Sí, estoy de visita'." },
        ],
      },
      {
        id: s("es-friend", 2), characterName: "Carlos", characterAvatar: "👨",
        dialogue: "¡Genial! ¿Cómo te llamas?",
        options: [
          { id: o("es-friend", 2, 1), text: "Me llamo Alex. ¿Y tú?", isCorrect: true, feedback: "'Me llamo' means 'My name is'." },
          { id: o("es-friend", 2, 2), text: "Estoy bien.", isCorrect: false, feedback: "He asked your name! Use 'Me llamo...'." },
          { id: o("es-friend", 2, 3), text: "Tú también.", isCorrect: false, feedback: "'Tú también' means 'you too'. Say your name!" },
        ],
      },
      {
        id: s("es-friend", 3), characterName: "Carlos", characterAvatar: "👨",
        dialogue: "Encantado, Alex. ¿De dónde eres?",
        options: [
          { id: o("es-friend", 3, 1), text: "Soy de Estados Unidos.", isCorrect: true, feedback: "'Soy de' means 'I'm from'." },
          { id: o("es-friend", 3, 2), text: "Soy de bueno.", isCorrect: false, feedback: "Say a country! 'Soy de Estados Unidos'." },
          { id: o("es-friend", 3, 3), text: "De aquí.", isCorrect: false, feedback: "But you said you're visiting! Try 'Soy de Estados Unidos'." },
        ],
      },
      {
        id: s("es-friend", 4), characterName: "Carlos", characterAvatar: "👨",
        dialogue: "¡Qué bien! ¡Hablas muy bien español!",
        options: [
          { id: o("es-friend", 4, 1), text: "¡Gracias! Llevo seis meses aprendiendo.", isCorrect: true, feedback: "'Llevo... aprendiendo' means 'I've been learning for...'." },
          { id: o("es-friend", 4, 2), text: "No, hablo inglés.", isCorrect: false, feedback: "Accept the compliment! '¡Gracias!'." },
          { id: o("es-friend", 4, 3), text: "Español es difícil.", isCorrect: false, feedback: "Stay positive! '¡Gracias! Llevo seis meses aprendiendo'." },
        ],
      },
      {
        id: s("es-friend", 5), characterName: "Carlos", characterAvatar: "👨",
        dialogue: "¿Quieres tomar algo conmigo?",
        options: [
          { id: o("es-friend", 5, 1), text: "¡Sí, con mucho gusto!", isCorrect: true, feedback: "'Con mucho gusto' means 'with pleasure'!" },
          { id: o("es-friend", 5, 2), text: "Yo como café.", isCorrect: false, feedback: "You don't eat coffee! Say '¡Sí, con mucho gusto!'." },
          { id: o("es-friend", 5, 3), text: "Café no gracias adiós.", isCorrect: false, feedback: "That's rude! Try '¡Sí, con mucho gusto!'." },
        ],
      },
    ],
  },
  {
    id: "es-coffee",
    title: "Comprando un Café",
    location: "Una cafetería en Sevilla",
    level: "beginner",
    language: "spanish",
    duration: "4 min",
    xpReward: 40,
    steps: [
      {
        id: s("es-coffee", 1), characterName: "Barista", characterAvatar: "☕",
        dialogue: "¡Buenos días! ¿Qué le pongo?",
        options: [
          { id: o("es-coffee", 1, 1), text: "Un café con leche, por favor.", isCorrect: true, feedback: "'Café con leche' is coffee with milk. Classic!" },
          { id: o("es-coffee", 1, 2), text: "Café yo.", isCorrect: false, feedback: "Try: 'Un café con leche, por favor'." },
          { id: o("es-coffee", 1, 3), text: "Quiero comer un café.", isCorrect: false, feedback: "You drink coffee! 'Un café, por favor'." },
        ],
      },
      {
        id: s("es-coffee", 2), characterName: "Barista", characterAvatar: "☕",
        dialogue: "¿Grande o pequeño?",
        options: [
          { id: o("es-coffee", 2, 1), text: "Grande, por favor.", isCorrect: true, feedback: "'Grande' means large. Good choice!" },
          { id: o("es-coffee", 2, 2), text: "Pequeño, por favor.", isCorrect: true, feedback: "'Pequeño' means small. Also fine!" },
          { id: o("es-coffee", 2, 3), text: "Los dos.", isCorrect: false, feedback: "'Los dos' means both. Pick one!" },
        ],
      },
      {
        id: s("es-coffee", 3), characterName: "Barista", characterAvatar: "☕",
        dialogue: "¿Con algo de comer?",
        options: [
          { id: o("es-coffee", 3, 1), text: "Sí, una tostada con tomate.", isCorrect: true, feedback: "Toast with tomato—very Spanish!" },
          { id: o("es-coffee", 3, 2), text: "No gracias, solo el café.", isCorrect: true, feedback: "Just the coffee. Clear!" },
          { id: o("es-coffee", 3, 3), text: "Comer es bueno.", isCorrect: false, feedback: "Answer the question! 'Sí' or 'No gracias'." },
        ],
      },
      {
        id: s("es-coffee", 4), characterName: "Barista", characterAvatar: "☕",
        dialogue: "Son tres euros con cincuenta.",
        options: [
          { id: o("es-coffee", 4, 1), text: "Aquí tiene. ¿Puedo pagar con tarjeta?", isCorrect: true, feedback: "'Pagar con tarjeta' means pay by card." },
          { id: o("es-coffee", 4, 2), text: "Aquí tiene, en efectivo.", isCorrect: true, feedback: "'En efectivo' means cash." },
          { id: o("es-coffee", 4, 3), text: "Tres es mucho.", isCorrect: false, feedback: "Just pay! 'Aquí tiene'." },
        ],
      },
      {
        id: s("es-coffee", 5), characterName: "Barista", characterAvatar: "☕",
        dialogue: "¡Gracias! ¡Que tenga un buen día!",
        options: [
          { id: o("es-coffee", 5, 1), text: "¡Gracias, igualmente!", isCorrect: true, feedback: "'Igualmente' means 'likewise'. Perfect!" },
          { id: o("es-coffee", 5, 2), text: "¡Adiós!", isCorrect: true, feedback: "Simple goodbye!" },
          { id: o("es-coffee", 5, 3), text: "Sí.", isCorrect: false, feedback: "Try '¡Gracias, igualmente!'." },
        ],
      },
    ],
  },
  {
    id: "es-hotel",
    title: "Registrándose en el Hotel",
    location: "Hotel Sol, Valencia",
    level: "beginner",
    language: "spanish",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("es-hotel", 1), characterName: "Recepcionista", characterAvatar: "🏨",
        dialogue: "¡Buenas tardes! ¿Tiene una reserva?",
        options: [
          { id: o("es-hotel", 1, 1), text: "Sí, a nombre de García.", isCorrect: true, feedback: "'A nombre de' means 'under the name of'." },
          { id: o("es-hotel", 1, 2), text: "Soy hotel.", isCorrect: false, feedback: "Say 'Sí, a nombre de...' + your name." },
          { id: o("es-hotel", 1, 3), text: "Reserva sí no.", isCorrect: false, feedback: "Be clear! 'Sí, a nombre de García'." },
        ],
      },
      {
        id: s("es-hotel", 2), characterName: "Recepcionista", characterAvatar: "🏨",
        dialogue: "¿Para cuántas noches?",
        options: [
          { id: o("es-hotel", 2, 1), text: "Tres noches, por favor.", isCorrect: true, feedback: "'Noches' means nights." },
          { id: o("es-hotel", 2, 2), text: "Muchas noches.", isCorrect: false, feedback: "Be specific! 'Tres noches'." },
          { id: o("es-hotel", 2, 3), text: "Noche.", isCorrect: false, feedback: "How many? 'Tres noches, por favor'." },
        ],
      },
      {
        id: s("es-hotel", 3), characterName: "Recepcionista", characterAvatar: "🏨",
        dialogue: "Aquí tiene su llave. Habitación 305, en el tercer piso.",
        options: [
          { id: o("es-hotel", 3, 1), text: "Gracias. ¿Hay ascensor?", isCorrect: true, feedback: "'Ascensor' means elevator." },
          { id: o("es-hotel", 3, 2), text: "Muchas gracias.", isCorrect: true, feedback: "Simple and polite!" },
          { id: o("es-hotel", 3, 3), text: "Llave es pequeña.", isCorrect: false, feedback: "Not relevant! Say 'Gracias'." },
        ],
      },
      {
        id: s("es-hotel", 4), characterName: "Recepcionista", characterAvatar: "🏨",
        dialogue: "El desayuno se sirve de siete a diez de la mañana.",
        options: [
          { id: o("es-hotel", 4, 1), text: "¿Está incluido en el precio?", isCorrect: true, feedback: "'Incluido en el precio' means included in the price." },
          { id: o("es-hotel", 4, 2), text: "De acuerdo, gracias.", isCorrect: true, feedback: "'De acuerdo' means OK." },
          { id: o("es-hotel", 4, 3), text: "Yo como siete horas.", isCorrect: false, feedback: "You don't eat seven hours! Say 'De acuerdo, gracias'." },
        ],
      },
      {
        id: s("es-hotel", 5), characterName: "Recepcionista", characterAvatar: "🏨",
        dialogue: "¡Que disfrute de su estancia!",
        options: [
          { id: o("es-hotel", 5, 1), text: "¡Gracias, buenas tardes!", isCorrect: true, feedback: "Polite farewell!" },
          { id: o("es-hotel", 5, 2), text: "¡Adiós!", isCorrect: true, feedback: "Classic goodbye!" },
          { id: o("es-hotel", 5, 3), text: "Estancia.", isCorrect: false, feedback: "Say goodbye properly! '¡Gracias!'." },
        ],
      },
    ],
  },
  // INTERMEDIATE
  {
    id: "es-restaurant",
    title: "Pidiendo en un Restaurante",
    location: "Restaurante El Rincón, Granada",
    level: "intermediate",
    language: "spanish",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("es-restaurant", 1), characterName: "Camarero", characterAvatar: "🧑‍🍳",
        dialogue: "¡Buenas noches! ¿Tienen reserva?",
        options: [
          { id: o("es-restaurant", 1, 1), text: "No, ¿hay una mesa para dos?", isCorrect: true, feedback: "Asking for a table politely." },
          { id: o("es-restaurant", 1, 2), text: "Sí, a nombre de López.", isCorrect: true, feedback: "If you have a reservation, perfect!" },
          { id: o("es-restaurant", 1, 3), text: "Mesa ahora.", isCorrect: false, feedback: "Too blunt! Try '¿Hay una mesa para dos?'." },
        ],
      },
      {
        id: s("es-restaurant", 2), characterName: "Camarero", characterAvatar: "🧑‍🍳",
        dialogue: "Aquí tienen la carta. Les dejo un momento.",
        options: [
          { id: o("es-restaurant", 2, 1), text: "¿Qué nos recomienda?", isCorrect: true, feedback: "Asking for a recommendation. Very natural!" },
          { id: o("es-restaurant", 2, 2), text: "¿Cuál es el plato del día?", isCorrect: true, feedback: "'Plato del día' = dish of the day." },
          { id: o("es-restaurant", 2, 3), text: "Quiero todo.", isCorrect: false, feedback: "You can't eat everything! Ask for a recommendation." },
        ],
      },
      {
        id: s("es-restaurant", 3), characterName: "Camarero", characterAvatar: "🧑‍🍳",
        dialogue: "Les recomiendo la paella. Es nuestra especialidad.",
        options: [
          { id: o("es-restaurant", 3, 1), text: "Suena delicioso. Voy a pedir eso.", isCorrect: true, feedback: "'Suena delicioso' means 'sounds delicious'." },
          { id: o("es-restaurant", 3, 2), text: "Prefiero algo más ligero.", isCorrect: true, feedback: "'Más ligero' means lighter." },
          { id: o("es-restaurant", 3, 3), text: "Paella es comida.", isCorrect: false, feedback: "Obviously! Respond to the recommendation." },
        ],
      },
      {
        id: s("es-restaurant", 4), characterName: "Camarero", characterAvatar: "🧑‍🍳",
        dialogue: "¿Y para beber?",
        options: [
          { id: o("es-restaurant", 4, 1), text: "Una copa de vino tinto, por favor.", isCorrect: true, feedback: "Red wine with paella. Classic!" },
          { id: o("es-restaurant", 4, 2), text: "Agua mineral sin gas, por favor.", isCorrect: true, feedback: "'Sin gas' means still (no bubbles)." },
          { id: o("es-restaurant", 4, 3), text: "Bebida no.", isCorrect: false, feedback: "Pick a drink! 'Una copa de vino tinto'." },
        ],
      },
      {
        id: s("es-restaurant", 5), characterName: "Camarero", characterAvatar: "🧑‍🍳",
        dialogue: "¿Desean postre?",
        options: [
          { id: o("es-restaurant", 5, 1), text: "Sí, un flan, por favor.", isCorrect: true, feedback: "Flan is a classic Spanish dessert!" },
          { id: o("es-restaurant", 5, 2), text: "No gracias, solo la cuenta.", isCorrect: true, feedback: "'La cuenta' means the bill." },
          { id: o("es-restaurant", 5, 3), text: "Postre es azúcar.", isCorrect: false, feedback: "Answer yes or no! 'Sí' or 'No gracias'." },
        ],
      },
      {
        id: s("es-restaurant", 6), characterName: "Camarero", characterAvatar: "🧑‍🍳",
        dialogue: "Aquí tienen la cuenta. Son treinta y ocho euros.",
        options: [
          { id: o("es-restaurant", 6, 1), text: "¿Puedo pagar con tarjeta?", isCorrect: true, feedback: "Practical payment question!" },
          { id: o("es-restaurant", 6, 2), text: "Aquí tiene. ¡Estaba todo riquísimo!", isCorrect: true, feedback: "'Riquísimo' means delicious. Great compliment!" },
          { id: o("es-restaurant", 6, 3), text: "Es muy caro.", isCorrect: false, feedback: "Rude! Pay and compliment the meal." },
        ],
      },
    ],
  },
  {
    id: "es-directions",
    title: "Pidiendo Direcciones",
    location: "Calles de Sevilla",
    level: "intermediate",
    language: "spanish",
    duration: "6 min",
    xpReward: 65,
    steps: [
      {
        id: s("es-directions", 1), characterName: "Transeúnte", characterAvatar: "🚶",
        dialogue: "¿Busca algo?",
        options: [
          { id: o("es-directions", 1, 1), text: "Sí, busco la estación de tren.", isCorrect: true, feedback: "'Estación de tren' means train station." },
          { id: o("es-directions", 1, 2), text: "Estoy perdido.", isCorrect: true, feedback: "'Estoy perdido' means 'I'm lost'." },
          { id: o("es-directions", 1, 3), text: "No, estoy bien.", isCorrect: false, feedback: "But you need directions! Try 'Busco la estación'." },
        ],
      },
      {
        id: s("es-directions", 2), characterName: "Transeúnte", characterAvatar: "🚶",
        dialogue: "La estación está a diez minutos a pie. Siga todo recto.",
        options: [
          { id: o("es-directions", 2, 1), text: "Todo recto, de acuerdo. ¿Y después?", isCorrect: true, feedback: "'Todo recto' = straight ahead. '¿Y después?' = and then?" },
          { id: o("es-directions", 2, 2), text: "¿Está lejos?", isCorrect: true, feedback: "'¿Está lejos?' means 'Is it far?'." },
          { id: o("es-directions", 2, 3), text: "No camino.", isCorrect: false, feedback: "But you asked! Follow up: '¿Y después?'." },
        ],
      },
      {
        id: s("es-directions", 3), characterName: "Transeúnte", characterAvatar: "🚶",
        dialogue: "Gire a la izquierda en el semáforo, luego siga recto.",
        options: [
          { id: o("es-directions", 3, 1), text: "A la izquierda en el semáforo, ¡entendido!", isCorrect: true, feedback: "'Izquierda' = left, 'semáforo' = traffic light." },
          { id: o("es-directions", 3, 2), text: "¿Puede repetir, por favor?", isCorrect: true, feedback: "Asking to repeat is fine!" },
          { id: o("es-directions", 3, 3), text: "¿Izquierda o derecha?", isCorrect: false, feedback: "They said 'izquierda' (left)! Confirm it." },
        ],
      },
      {
        id: s("es-directions", 4), characterName: "Transeúnte", characterAvatar: "🚶",
        dialogue: "Verá la estación a su derecha.",
        options: [
          { id: o("es-directions", 4, 1), text: "Perfecto, ¡muchas gracias por su ayuda!", isCorrect: true, feedback: "Polite and grateful!" },
          { id: o("es-directions", 4, 2), text: "A la derecha, de acuerdo. ¡Gracias!", isCorrect: true, feedback: "Confirming. Great!" },
          { id: o("es-directions", 4, 3), text: "Derecha.", isCorrect: false, feedback: "Too brief! Thank them: '¡Muchas gracias!'." },
        ],
      },
      {
        id: s("es-directions", 5), characterName: "Transeúnte", characterAvatar: "🚶",
        dialogue: "¡De nada! ¡Buen viaje!",
        options: [
          { id: o("es-directions", 5, 1), text: "¡Gracias, buen día!", isCorrect: true, feedback: "Warm goodbye!" },
          { id: o("es-directions", 5, 2), text: "¡Adiós!", isCorrect: true, feedback: "Simple and classic." },
          { id: o("es-directions", 5, 3), text: "Viaje.", isCorrect: false, feedback: "Say goodbye properly! '¡Gracias, buen día!'." },
        ],
      },
    ],
  },
  {
    id: "es-market",
    title: "Comprando en el Mercado",
    location: "Mercado de la Boquería, Barcelona",
    level: "intermediate",
    language: "spanish",
    duration: "6 min",
    xpReward: 70,
    steps: [
      {
        id: s("es-market", 1), characterName: "Vendedor", characterAvatar: "🧑‍🌾",
        dialogue: "¡Buenos días! ¡Mire qué tomates tan bonitos!",
        options: [
          { id: o("es-market", 1, 1), text: "¡Se ven deliciosos! ¿A cuánto el kilo?", isCorrect: true, feedback: "Asking the price per kilo. Natural!" },
          { id: o("es-market", 1, 2), text: "Quisiera tomates, por favor.", isCorrect: true, feedback: "'Quisiera' means 'I would like'. Polite!" },
          { id: o("es-market", 1, 3), text: "Tomates rojos.", isCorrect: false, feedback: "Just a description! Ask the price or order." },
        ],
      },
      {
        id: s("es-market", 2), characterName: "Vendedor", characterAvatar: "🧑‍🌾",
        dialogue: "A dos euros el kilo. ¿Cuánto quiere?",
        options: [
          { id: o("es-market", 2, 1), text: "Un kilo, por favor.", isCorrect: true, feedback: "Clear order!" },
          { id: o("es-market", 2, 2), text: "Medio kilo, por favor.", isCorrect: true, feedback: "'Medio kilo' = half a kilo." },
          { id: o("es-market", 2, 3), text: "Euros no.", isCorrect: false, feedback: "Say how much! 'Un kilo, por favor'." },
        ],
      },
      {
        id: s("es-market", 3), characterName: "Vendedor", characterAvatar: "🧑‍🌾",
        dialogue: "¡Aquí tiene! ¿Algo más?",
        options: [
          { id: o("es-market", 3, 1), text: "Sí, ¿tiene fresas?", isCorrect: true, feedback: "'Fresas' means strawberries." },
          { id: o("es-market", 3, 2), text: "No gracias, eso es todo.", isCorrect: true, feedback: "'Eso es todo' means 'that's all'." },
          { id: o("es-market", 3, 3), text: "Algo sí.", isCorrect: false, feedback: "Be specific! '¿Tiene fresas?' or 'Eso es todo'." },
        ],
      },
      {
        id: s("es-market", 4), characterName: "Vendedor", characterAvatar: "🧑‍🌾",
        dialogue: "¡Claro! Pruebe, están muy dulces.",
        options: [
          { id: o("es-market", 4, 1), text: "¡Mmm, están buenísimas! Me llevo una caja.", isCorrect: true, feedback: "'Buenísimas' means really good!" },
          { id: o("es-market", 4, 2), text: "¡Gracias! Están muy ricas.", isCorrect: true, feedback: "'Ricas' means tasty. Natural!" },
          { id: o("es-market", 4, 3), text: "Dulce no.", isCorrect: false, feedback: "They're offering a taste! Try 'Están buenísimas'." },
        ],
      },
      {
        id: s("es-market", 5), characterName: "Vendedor", characterAvatar: "🧑‍🌾",
        dialogue: "Son cinco euros en total.",
        options: [
          { id: o("es-market", 5, 1), text: "Aquí tiene. ¡Muchas gracias, buen día!", isCorrect: true, feedback: "Perfect market farewell!" },
          { id: o("es-market", 5, 2), text: "Tome. ¡Adiós!", isCorrect: true, feedback: "'Tome' means 'take it'. Great!" },
          { id: o("es-market", 5, 3), text: "Cinco.", isCorrect: false, feedback: "Pay and say goodbye! 'Aquí tiene, ¡gracias!'." },
        ],
      },
    ],
  },
  {
    id: "es-train",
    title: "Comprando un Billete de Tren",
    location: "Estación de Atocha, Madrid",
    level: "intermediate",
    language: "spanish",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("es-train", 1), characterName: "Agente", characterAvatar: "🚂",
        dialogue: "¡Buenos días! ¿En qué puedo ayudarle?",
        options: [
          { id: o("es-train", 1, 1), text: "Quisiera un billete para Sevilla.", isCorrect: true, feedback: "'Quisiera un billete para' = I'd like a ticket to." },
          { id: o("es-train", 1, 2), text: "Un ida y vuelta a Barcelona, por favor.", isCorrect: true, feedback: "'Ida y vuelta' = round trip!" },
          { id: o("es-train", 1, 3), text: "Tren Sevilla.", isCorrect: false, feedback: "Be polite! 'Quisiera un billete para Sevilla'." },
        ],
      },
      {
        id: s("es-train", 2), characterName: "Agente", characterAvatar: "🚂",
        dialogue: "¿Solo ida o ida y vuelta?",
        options: [
          { id: o("es-train", 2, 1), text: "Ida y vuelta, por favor.", isCorrect: true, feedback: "Round trip!" },
          { id: o("es-train", 2, 2), text: "Solo ida.", isCorrect: true, feedback: "One-way. Also valid!" },
          { id: o("es-train", 2, 3), text: "No entiendo.", isCorrect: false, feedback: "'Solo ida' = one-way, 'Ida y vuelta' = round trip." },
        ],
      },
      {
        id: s("es-train", 3), characterName: "Agente", characterAvatar: "🚂",
        dialogue: "¿Clase turista o preferente?",
        options: [
          { id: o("es-train", 3, 1), text: "Clase turista, por favor.", isCorrect: true, feedback: "Standard class. Economical!" },
          { id: o("es-train", 3, 2), text: "Preferente.", isCorrect: true, feedback: "First class equivalent!" },
          { id: o("es-train", 3, 3), text: "La mejor.", isCorrect: false, feedback: "Specify: 'Turista' or 'Preferente'." },
        ],
      },
      {
        id: s("es-train", 4), characterName: "Agente", characterAvatar: "🚂",
        dialogue: "El próximo tren sale a las dos y media. ¿Le viene bien?",
        options: [
          { id: o("es-train", 4, 1), text: "Sí, perfecto.", isCorrect: true, feedback: "2:30 works!" },
          { id: o("es-train", 4, 2), text: "¿Hay alguno más temprano?", isCorrect: true, feedback: "'Más temprano' means earlier." },
          { id: o("es-train", 4, 3), text: "Dos no.", isCorrect: false, feedback: "Be specific! '¿Hay alguno más temprano?'." },
        ],
      },
      {
        id: s("es-train", 5), characterName: "Agente", characterAvatar: "🚂",
        dialogue: "Son cuarenta euros. ¿Cómo paga?",
        options: [
          { id: o("es-train", 5, 1), text: "Con tarjeta, por favor.", isCorrect: true, feedback: "Card payment. Common!" },
          { id: o("es-train", 5, 2), text: "En efectivo.", isCorrect: true, feedback: "'En efectivo' = cash." },
          { id: o("es-train", 5, 3), text: "¿Gratis?", isCorrect: false, feedback: "Trains aren't free! 'Con tarjeta, por favor'." },
        ],
      },
      {
        id: s("es-train", 6), characterName: "Agente", characterAvatar: "🚂",
        dialogue: "Aquí tiene su billete. Andén número tres. ¡Buen viaje!",
        options: [
          { id: o("es-train", 6, 1), text: "¡Muchas gracias! ¡Buen día!", isCorrect: true, feedback: "'Andén' means platform. Buen viaje!" },
          { id: o("es-train", 6, 2), text: "Andén tres, entendido. ¡Gracias!", isCorrect: true, feedback: "Confirming the platform. Smart!" },
          { id: o("es-train", 6, 3), text: "Viaje.", isCorrect: false, feedback: "Say goodbye! '¡Muchas gracias, buen día!'." },
        ],
      },
    ],
  },
  // ADVANCED
  {
    id: "es-interview",
    title: "Entrevista de Trabajo",
    location: "Oficina en el Paseo de la Castellana, Madrid",
    level: "advanced",
    language: "spanish",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("es-interview", 1), characterName: "Jefa de RRHH", characterAvatar: "💼",
        dialogue: "Buenos días, gracias por venir. Hábleme un poco de usted.",
        options: [
          { id: o("es-interview", 1, 1), text: "Buenos días. Soy licenciado en marketing y tengo tres años de experiencia.", isCorrect: true, feedback: "Strong professional introduction!" },
          { id: o("es-interview", 1, 2), text: "Soy simpático y me gustan los gatos.", isCorrect: false, feedback: "Too personal! Focus on professional experience." },
          { id: o("es-interview", 1, 3), text: "Estudié comercio internacional en Salamanca.", isCorrect: true, feedback: "Good academic background mention!" },
        ],
      },
      {
        id: s("es-interview", 2), characterName: "Jefa de RRHH", characterAvatar: "💼",
        dialogue: "¿Por qué quiere trabajar en nuestra empresa?",
        options: [
          { id: o("es-interview", 2, 1), text: "Su empresa es reconocida por su innovación y sus valores.", isCorrect: true, feedback: "Flattering and formal. Well done!" },
          { id: o("es-interview", 2, 2), text: "Porque necesito dinero.", isCorrect: false, feedback: "Too direct! Focus on company values." },
          { id: o("es-interview", 2, 3), text: "Me apasiona su sector y me gustaría contribuir.", isCorrect: true, feedback: "'Contribuir' means to contribute. Professional!" },
        ],
      },
      {
        id: s("es-interview", 3), characterName: "Jefa de RRHH", characterAvatar: "💼",
        dialogue: "¿Cuáles son sus puntos fuertes?",
        options: [
          { id: o("es-interview", 3, 1), text: "Soy organizado, creativo y trabajo bien en equipo.", isCorrect: true, feedback: "'Trabajo en equipo' = teamwork." },
          { id: o("es-interview", 3, 2), text: "Soy perfecto.", isCorrect: false, feedback: "Too arrogant! List specific strengths." },
          { id: o("es-interview", 3, 3), text: "Me adapto fácilmente a nuevas situaciones.", isCorrect: true, feedback: "Adaptability is valued!" },
        ],
      },
      {
        id: s("es-interview", 4), characterName: "Jefa de RRHH", characterAvatar: "💼",
        dialogue: "¿Dónde se ve en cinco años?",
        options: [
          { id: o("es-interview", 4, 1), text: "Me gustaría crecer hacia un puesto de responsabilidad.", isCorrect: true, feedback: "Ambitious yet realistic!" },
          { id: o("es-interview", 4, 2), text: "En su puesto.", isCorrect: false, feedback: "Threatening! Think professional growth." },
          { id: o("es-interview", 4, 3), text: "Quiero profundizar mis competencias y asumir más responsabilidades.", isCorrect: true, feedback: "'Profundizar' means to deepen. Professional!" },
        ],
      },
      {
        id: s("es-interview", 5), characterName: "Jefa de RRHH", characterAvatar: "💼",
        dialogue: "¿Tiene alguna pregunta para nosotros?",
        options: [
          { id: o("es-interview", 5, 1), text: "Sí, ¿cómo es un día típico en este puesto?", isCorrect: true, feedback: "Shows genuine interest!" },
          { id: o("es-interview", 5, 2), text: "¿Cuáles son las oportunidades de crecimiento en la empresa?", isCorrect: true, feedback: "Smart career-focused question!" },
          { id: o("es-interview", 5, 3), text: "No, ninguna pregunta.", isCorrect: false, feedback: "Always ask questions! It shows interest." },
        ],
      },
    ],
  },
  {
    id: "es-business",
    title: "Reunión de Negocios",
    location: "Sala de conferencias, Barcelona",
    level: "advanced",
    language: "spanish",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("es-business", 1), characterName: "Colega", characterAvatar: "👔",
        dialogue: "Buenos días a todos. Empecemos con el balance del trimestre.",
        options: [
          { id: o("es-business", 1, 1), text: "He preparado un resumen de los resultados. ¿Puedo empezar?", isCorrect: true, feedback: "Taking initiative. Very professional!" },
          { id: o("es-business", 1, 2), text: "Las cifras son positivas este trimestre.", isCorrect: true, feedback: "Direct and relevant." },
          { id: o("es-business", 1, 3), text: "No he preparado nada.", isCorrect: false, feedback: "Not prepared? Try being proactive!" },
        ],
      },
      {
        id: s("es-business", 2), characterName: "Colega", characterAvatar: "👔",
        dialogue: "Las ventas han aumentado un 15%. ¿Qué opinan?",
        options: [
          { id: o("es-business", 2, 1), text: "Es alentador. Creo que nuestra estrategia está dando frutos.", isCorrect: true, feedback: "'Dando frutos' = bearing fruit. Idiomatic!" },
          { id: o("es-business", 2, 2), text: "Habría que analizar qué productos han funcionado mejor.", isCorrect: true, feedback: "Analytical thinking!" },
          { id: o("es-business", 2, 3), text: "Quince por ciento está bien.", isCorrect: false, feedback: "Too simple! Add analysis." },
        ],
      },
      {
        id: s("es-business", 3), characterName: "Colega", characterAvatar: "👔",
        dialogue: "¿Qué objetivos proponen para el próximo trimestre?",
        options: [
          { id: o("es-business", 3, 1), text: "Propongo aumentar nuestra presencia en redes sociales.", isCorrect: true, feedback: "'Redes sociales' = social media." },
          { id: o("es-business", 3, 2), text: "Deberíamos apuntar a un crecimiento del 20% y diversificar mercados.", isCorrect: true, feedback: "Ambitious and strategic!" },
          { id: o("es-business", 3, 3), text: "Más ventas.", isCorrect: false, feedback: "Too vague! Be specific." },
        ],
      },
      {
        id: s("es-business", 4), characterName: "Colega", characterAvatar: "👔",
        dialogue: "Bien. Resumamos las acciones a tomar.",
        options: [
          { id: o("es-business", 4, 1), text: "Me encargo del plan de marketing y les envío un informe el viernes.", isCorrect: true, feedback: "'Me encargo de' = I'll take care of." },
          { id: o("es-business", 4, 2), text: "Propongo que nos reunamos la próxima semana para validar el plan.", isCorrect: true, feedback: "Follow-up meetings. Good management!" },
          { id: o("es-business", 4, 3), text: "De acuerdo.", isCorrect: false, feedback: "Take action! Volunteer for tasks." },
        ],
      },
    ],
  },
  {
    id: "es-travel-problem",
    title: "Resolviendo un Problema de Viaje",
    location: "Estación de tren, Sevilla",
    level: "advanced",
    language: "spanish",
    duration: "7 min",
    xpReward: 90,
    steps: [
      {
        id: s("es-travel-problem", 1), characterName: "Agente", characterAvatar: "🚉",
        dialogue: "Lo siento, su tren ha sido cancelado por una huelga.",
        options: [
          { id: o("es-travel-problem", 1, 1), text: "Vaya. ¿Cuáles son mis opciones?", isCorrect: true, feedback: "'Vaya' expresses mild frustration. Calm!" },
          { id: o("es-travel-problem", 1, 2), text: "¿Hay otro tren hoy?", isCorrect: true, feedback: "Direct question about alternatives." },
          { id: o("es-travel-problem", 1, 3), text: "¡Es inaceptable! ¡Quiero un reembolso inmediato!", isCorrect: false, feedback: "First ask about alternatives." },
        ],
      },
      {
        id: s("es-travel-problem", 2), characterName: "Agente", characterAvatar: "🚉",
        dialogue: "Hay un autobús de reemplazo en dos horas, o un tren mañana por la mañana.",
        options: [
          { id: o("es-travel-problem", 2, 1), text: "Prefiero el autobús. ¿Dónde lo tomo?", isCorrect: true, feedback: "'Autobús de reemplazo' = replacement bus." },
          { id: o("es-travel-problem", 2, 2), text: "¿Puede reservarme un asiento en el tren de mañana?", isCorrect: true, feedback: "Planning ahead!" },
          { id: o("es-travel-problem", 2, 3), text: "Dos horas es demasiado.", isCorrect: false, feedback: "Those are your options. Pick one!" },
        ],
      },
      {
        id: s("es-travel-problem", 3), characterName: "Agente", characterAvatar: "🚉",
        dialogue: "Listo. Disculpe las molestias.",
        options: [
          { id: o("es-travel-problem", 3, 1), text: "No se preocupe. Gracias por su ayuda.", isCorrect: true, feedback: "'No se preocupe' = don't worry. Graceful!" },
          { id: o("es-travel-problem", 3, 2), text: "Gracias. Estas cosas pasan. ¡Buen día!", isCorrect: true, feedback: "Understanding attitude!" },
          { id: o("es-travel-problem", 3, 3), text: "La próxima vez, nada de huelgas.", isCorrect: false, feedback: "The agent can't control strikes!" },
        ],
      },
    ],
  },
  {
    id: "es-debate",
    title: "Debatiendo una Opinión",
    location: "Cafetería universitaria, Madrid",
    level: "advanced",
    language: "spanish",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("es-debate", 1), characterName: "Estudiante", characterAvatar: "🎓",
        dialogue: "¿Crees que la inteligencia artificial va a reemplazar a los profesores?",
        options: [
          { id: o("es-debate", 1, 1), text: "No lo creo. La IA puede ayudar, pero el contacto humano es esencial.", isCorrect: true, feedback: "Nuanced opinion!" },
          { id: o("es-debate", 1, 2), text: "Es posible a largo plazo, pero plantea cuestiones éticas.", isCorrect: true, feedback: "'Cuestiones éticas' = ethical questions." },
          { id: o("es-debate", 1, 3), text: "Sí, los robots son mejores.", isCorrect: false, feedback: "Too simplistic! Develop your argument." },
        ],
      },
      {
        id: s("es-debate", 2), characterName: "Estudiante", characterAvatar: "🎓",
        dialogue: "Pero, ¿no aprenden mejor los alumnos con la tecnología?",
        options: [
          { id: o("es-debate", 2, 1), text: "Depende. La tecnología es una herramienta, no un fin en sí misma.", isCorrect: true, feedback: "'Un fin en sí misma' = an end in itself." },
          { id: o("es-debate", 2, 2), text: "En parte, pero la interacción con un profesor estimula el pensamiento crítico.", isCorrect: true, feedback: "'Pensamiento crítico' = critical thinking." },
          { id: o("es-debate", 2, 3), text: "No, los libros son mejores.", isCorrect: false, feedback: "Too dismissive! Engage more." },
        ],
      },
      {
        id: s("es-debate", 3), characterName: "Estudiante", characterAvatar: "🎓",
        dialogue: "Tienes razón. En todo caso, es un tema fascinante.",
        options: [
          { id: o("es-debate", 3, 1), text: "Totalmente. Es importante debatirlo para prepararnos para el futuro.", isCorrect: true, feedback: "Great conclusion!" },
          { id: o("es-debate", 3, 2), text: "Sí, me gustan estos debates. ¡Deberíamos repetirlo!", isCorrect: true, feedback: "Friendly and enthusiastic!" },
          { id: o("es-debate", 3, 3), text: "Sí.", isCorrect: false, feedback: "Engage more! This is a rich topic." },
        ],
      },
    ],
  },
];

// ─── CHINESE STORIES ───────────────────────────────────────

const chineseStories: Story[] = [
  // BEGINNER
  {
    id: "zh-airport",
    title: "到达机场",
    location: "北京首都国际机场",
    level: "beginner",
    language: "chinese",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("zh-airport", 1), characterName: "工作人员", characterAvatar: "👮",
        dialogue: "你好！欢迎来到中国。请出示您的护照。",
        options: [
          { id: o("zh-airport", 1, 1), text: "这是我的护照。", isCorrect: true, feedback: "'这是' means 'this is'. Well done!" },
          { id: o("zh-airport", 1, 2), text: "我是护照。", isCorrect: false, feedback: "'我是' means 'I am'. Say '这是我的护照' (This is my passport)." },
          { id: o("zh-airport", 1, 3), text: "护照没有。", isCorrect: false, feedback: "You need to present it! '这是我的护照'." },
        ],
      },
      {
        id: s("zh-airport", 2), characterName: "工作人员", characterAvatar: "👮",
        dialogue: "谢谢。您来中国的目的是什么？",
        options: [
          { id: o("zh-airport", 2, 1), text: "我来旅游。", isCorrect: true, feedback: "'旅游' means tourism. Great!" },
          { id: o("zh-airport", 2, 2), text: "我是吃饭。", isCorrect: false, feedback: "'吃饭' means eating. Say '我来旅游'." },
          { id: o("zh-airport", 2, 3), text: "是。", isCorrect: false, feedback: "Give a reason! '我来旅游' (I'm here for tourism)." },
        ],
      },
      {
        id: s("zh-airport", 3), characterName: "工作人员", characterAvatar: "👮",
        dialogue: "您在中国待多长时间？",
        options: [
          { id: o("zh-airport", 3, 1), text: "一个星期。", isCorrect: true, feedback: "'一个星期' means one week." },
          { id: o("zh-airport", 3, 2), text: "很多中国。", isCorrect: false, feedback: "Give a duration! '一个星期'." },
          { id: o("zh-airport", 3, 3), text: "我不知道。", isCorrect: false, feedback: "Try a duration: '一个星期' (one week)." },
        ],
      },
      {
        id: s("zh-airport", 4), characterName: "工作人员", characterAvatar: "👮",
        dialogue: "好的。祝您在中国玩得开心！",
        options: [
          { id: o("zh-airport", 4, 1), text: "谢谢！", isCorrect: true, feedback: "Simple and polite!" },
          { id: o("zh-airport", 4, 2), text: "再见，谢谢。", isCorrect: true, feedback: "Also great!" },
          { id: o("zh-airport", 4, 3), text: "对对。", isCorrect: false, feedback: "Be polite! '谢谢！'." },
        ],
      },
      {
        id: s("zh-airport", 5), characterName: "出租车司机", characterAvatar: "🚕",
        dialogue: "你好！去哪里？",
        options: [
          { id: o("zh-airport", 5, 1), text: "去市中心，谢谢。", isCorrect: true, feedback: "'市中心' means city center." },
          { id: o("zh-airport", 5, 2), text: "我是机场。", isCorrect: false, feedback: "You're AT the airport. Say where you want to GO!" },
          { id: o("zh-airport", 5, 3), text: "开车。", isCorrect: false, feedback: "Too blunt! '去市中心，谢谢'." },
        ],
      },
    ],
  },
  {
    id: "zh-friend",
    title: "认识新朋友",
    location: "上海的一家咖啡馆",
    level: "beginner",
    language: "chinese",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("zh-friend", 1), characterName: "小美", characterAvatar: "👩",
        dialogue: "你好！你是新来的吗？",
        options: [
          { id: o("zh-friend", 1, 1), text: "是的，我在这里旅游。", isCorrect: true, feedback: "'旅游' means traveling." },
          { id: o("zh-friend", 1, 2), text: "我是房子。", isCorrect: false, feedback: "'房子' means house. Try '我在这里旅游'." },
          { id: o("zh-friend", 1, 3), text: "不是，我很老。", isCorrect: false, feedback: "'老' means old. Try '是的，我在这里旅游'." },
        ],
      },
      {
        id: s("zh-friend", 2), characterName: "小美", characterAvatar: "👩",
        dialogue: "太好了！你叫什么名字？",
        options: [
          { id: o("zh-friend", 2, 1), text: "我叫Alex。你呢？", isCorrect: true, feedback: "'我叫' means 'my name is'." },
          { id: o("zh-friend", 2, 2), text: "我很好。", isCorrect: false, feedback: "She asked your name! Use '我叫...'." },
          { id: o("zh-friend", 2, 3), text: "你也是。", isCorrect: false, feedback: "'你也是' means 'you too'. Say your name!" },
        ],
      },
      {
        id: s("zh-friend", 3), characterName: "小美", characterAvatar: "👩",
        dialogue: "很高兴认识你，Alex！你从哪里来？",
        options: [
          { id: o("zh-friend", 3, 1), text: "我从美国来。", isCorrect: true, feedback: "'我从...来' means 'I come from'." },
          { id: o("zh-friend", 3, 2), text: "我是好的地方。", isCorrect: false, feedback: "Say a country! '我从美国来'." },
          { id: o("zh-friend", 3, 3), text: "从这里。", isCorrect: false, feedback: "But you're visiting! Try '我从美国来'." },
        ],
      },
      {
        id: s("zh-friend", 4), characterName: "小美", characterAvatar: "👩",
        dialogue: "很酷！你的中文说得很好！",
        options: [
          { id: o("zh-friend", 4, 1), text: "谢谢！我学了六个月了。", isCorrect: true, feedback: "'学了...了' means 'have been learning for'." },
          { id: o("zh-friend", 4, 2), text: "不，我说英语。", isCorrect: false, feedback: "Accept the compliment! '谢谢！'." },
          { id: o("zh-friend", 4, 3), text: "中文很难。", isCorrect: false, feedback: "Stay positive! '谢谢！我学了六个月了'." },
        ],
      },
      {
        id: s("zh-friend", 5), characterName: "小美", characterAvatar: "👩",
        dialogue: "你想一起喝杯咖啡吗？",
        options: [
          { id: o("zh-friend", 5, 1), text: "好啊，很高兴！", isCorrect: true, feedback: "'好啊' means 'sure!'. Friendly!" },
          { id: o("zh-friend", 5, 2), text: "我吃咖啡。", isCorrect: false, feedback: "You don't eat coffee! Say '好啊！'." },
          { id: o("zh-friend", 5, 3), text: "咖啡不要再见。", isCorrect: false, feedback: "That's rude! Try '好啊，很高兴！'." },
        ],
      },
    ],
  },
  {
    id: "zh-coffee",
    title: "买咖啡",
    location: "成都的一家咖啡店",
    level: "beginner",
    language: "chinese",
    duration: "4 min",
    xpReward: 40,
    steps: [
      {
        id: s("zh-coffee", 1), characterName: "店员", characterAvatar: "☕",
        dialogue: "你好！请问要点什么？",
        options: [
          { id: o("zh-coffee", 1, 1), text: "一杯美式咖啡，谢谢。", isCorrect: true, feedback: "'美式咖啡' = Americano. Classic!" },
          { id: o("zh-coffee", 1, 2), text: "咖啡我。", isCorrect: false, feedback: "Try: '一杯美式咖啡，谢谢'." },
          { id: o("zh-coffee", 1, 3), text: "我要吃咖啡。", isCorrect: false, feedback: "You drink coffee! '一杯咖啡，谢谢'." },
        ],
      },
      {
        id: s("zh-coffee", 2), characterName: "店员", characterAvatar: "☕",
        dialogue: "大杯还是小杯？",
        options: [
          { id: o("zh-coffee", 2, 1), text: "大杯，谢谢。", isCorrect: true, feedback: "'大杯' means large cup." },
          { id: o("zh-coffee", 2, 2), text: "小杯，谢谢。", isCorrect: true, feedback: "'小杯' means small cup." },
          { id: o("zh-coffee", 2, 3), text: "两个都要。", isCorrect: false, feedback: "'两个都要' means both. Pick one!" },
        ],
      },
      {
        id: s("zh-coffee", 3), characterName: "店员", characterAvatar: "☕",
        dialogue: "要配点心吗？",
        options: [
          { id: o("zh-coffee", 3, 1), text: "好的，一个蛋糕。", isCorrect: true, feedback: "'蛋糕' means cake." },
          { id: o("zh-coffee", 3, 2), text: "不用了，只要咖啡。", isCorrect: true, feedback: "'不用了' means 'no need'. Clear!" },
          { id: o("zh-coffee", 3, 3), text: "点心是吃的。", isCorrect: false, feedback: "Obviously! Say '好的' or '不用了'." },
        ],
      },
      {
        id: s("zh-coffee", 4), characterName: "店员", characterAvatar: "☕",
        dialogue: "一共二十五块。",
        options: [
          { id: o("zh-coffee", 4, 1), text: "好的。可以用微信支付吗？", isCorrect: true, feedback: "'微信支付' = WeChat Pay. Very Chinese!" },
          { id: o("zh-coffee", 4, 2), text: "给你现金。", isCorrect: true, feedback: "'现金' means cash." },
          { id: o("zh-coffee", 4, 3), text: "二十五太多了。", isCorrect: false, feedback: "Just pay! '好的'." },
        ],
      },
      {
        id: s("zh-coffee", 5), characterName: "店员", characterAvatar: "☕",
        dialogue: "谢谢！祝你有美好的一天！",
        options: [
          { id: o("zh-coffee", 5, 1), text: "谢谢，你也是！", isCorrect: true, feedback: "'你也是' means 'you too'. Perfect!" },
          { id: o("zh-coffee", 5, 2), text: "再见！", isCorrect: true, feedback: "Simple goodbye!" },
          { id: o("zh-coffee", 5, 3), text: "对。", isCorrect: false, feedback: "Try '谢谢，你也是！'." },
        ],
      },
    ],
  },
  {
    id: "zh-hotel",
    title: "入住酒店",
    location: "西安的和平酒店",
    level: "beginner",
    language: "chinese",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("zh-hotel", 1), characterName: "前台", characterAvatar: "🏨",
        dialogue: "晚上好！请问您有预订吗？",
        options: [
          { id: o("zh-hotel", 1, 1), text: "有，我姓王。", isCorrect: true, feedback: "'我姓' means 'my surname is'." },
          { id: o("zh-hotel", 1, 2), text: "我是酒店。", isCorrect: false, feedback: "You're not a hotel! Say '有，我姓...'." },
          { id: o("zh-hotel", 1, 3), text: "预订有没有。", isCorrect: false, feedback: "Be clear! '有，我姓王'." },
        ],
      },
      {
        id: s("zh-hotel", 2), characterName: "前台", characterAvatar: "🏨",
        dialogue: "住几晚？",
        options: [
          { id: o("zh-hotel", 2, 1), text: "三晚。", isCorrect: true, feedback: "'三晚' = three nights." },
          { id: o("zh-hotel", 2, 2), text: "很多晚。", isCorrect: false, feedback: "Be specific! '三晚'." },
          { id: o("zh-hotel", 2, 3), text: "晚。", isCorrect: false, feedback: "How many? '三晚'." },
        ],
      },
      {
        id: s("zh-hotel", 3), characterName: "前台", characterAvatar: "🏨",
        dialogue: "这是您的房卡。208房间，在二楼。",
        options: [
          { id: o("zh-hotel", 3, 1), text: "谢谢。有电梯吗？", isCorrect: true, feedback: "'电梯' means elevator." },
          { id: o("zh-hotel", 3, 2), text: "谢谢。", isCorrect: true, feedback: "Simple and polite!" },
          { id: o("zh-hotel", 3, 3), text: "房卡很小。", isCorrect: false, feedback: "Not relevant! Say '谢谢'." },
        ],
      },
      {
        id: s("zh-hotel", 4), characterName: "前台", characterAvatar: "🏨",
        dialogue: "早餐时间是早上七点到十点。",
        options: [
          { id: o("zh-hotel", 4, 1), text: "包含在房价里吗？", isCorrect: true, feedback: "'包含在房价里' = included in the room price." },
          { id: o("zh-hotel", 4, 2), text: "好的，谢谢。", isCorrect: true, feedback: "Simple acknowledgment!" },
          { id: o("zh-hotel", 4, 3), text: "我吃七个小时。", isCorrect: false, feedback: "You don't eat for seven hours! Say '好的，谢谢'." },
        ],
      },
      {
        id: s("zh-hotel", 5), characterName: "前台", characterAvatar: "🏨",
        dialogue: "祝您住得愉快！",
        options: [
          { id: o("zh-hotel", 5, 1), text: "谢谢，晚安！", isCorrect: true, feedback: "'晚安' means good night." },
          { id: o("zh-hotel", 5, 2), text: "再见！", isCorrect: true, feedback: "Classic goodbye!" },
          { id: o("zh-hotel", 5, 3), text: "愉快。", isCorrect: false, feedback: "Say goodbye properly! '谢谢，晚安！'." },
        ],
      },
    ],
  },
  // INTERMEDIATE
  {
    id: "zh-restaurant",
    title: "在餐厅点餐",
    location: "杭州的一家餐厅",
    level: "intermediate",
    language: "chinese",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("zh-restaurant", 1), characterName: "服务员", characterAvatar: "🧑‍🍳",
        dialogue: "晚上好！请问几位？",
        options: [
          { id: o("zh-restaurant", 1, 1), text: "两位，请问有位子吗？", isCorrect: true, feedback: "'几位' asks how many people. Good response!" },
          { id: o("zh-restaurant", 1, 2), text: "我们预订了，姓李。", isCorrect: true, feedback: "If you reserved, perfect!" },
          { id: o("zh-restaurant", 1, 3), text: "现在要桌子。", isCorrect: false, feedback: "Too blunt! '两位，请问有位子吗？'." },
        ],
      },
      {
        id: s("zh-restaurant", 2), characterName: "服务员", characterAvatar: "🧑‍🍳",
        dialogue: "这是菜单。请慢慢看。",
        options: [
          { id: o("zh-restaurant", 2, 1), text: "有什么推荐的菜吗？", isCorrect: true, feedback: "Asking for recommendations. Natural!" },
          { id: o("zh-restaurant", 2, 2), text: "你们的招牌菜是什么？", isCorrect: true, feedback: "'招牌菜' = signature dish. Excellent!" },
          { id: o("zh-restaurant", 2, 3), text: "我要全部。", isCorrect: false, feedback: "You can't eat everything! Ask for a recommendation." },
        ],
      },
      {
        id: s("zh-restaurant", 3), characterName: "服务员", characterAvatar: "🧑‍🍳",
        dialogue: "推荐西湖醋鱼，是我们的特色菜。",
        options: [
          { id: o("zh-restaurant", 3, 1), text: "听起来不错！就要这个。", isCorrect: true, feedback: "'听起来不错' = sounds good!" },
          { id: o("zh-restaurant", 3, 2), text: "有没有比较清淡的菜？", isCorrect: true, feedback: "'清淡' means light/mild. Good preference!" },
          { id: o("zh-restaurant", 3, 3), text: "鱼是动物。", isCorrect: false, feedback: "True but irrelevant! Respond to the recommendation." },
        ],
      },
      {
        id: s("zh-restaurant", 4), characterName: "服务员", characterAvatar: "🧑‍🍳",
        dialogue: "要喝点什么？",
        options: [
          { id: o("zh-restaurant", 4, 1), text: "一壶茶，谢谢。", isCorrect: true, feedback: "'一壶茶' = a pot of tea. Very Chinese!" },
          { id: o("zh-restaurant", 4, 2), text: "两瓶啤酒，谢谢。", isCorrect: true, feedback: "'啤酒' = beer. Casual meal!" },
          { id: o("zh-restaurant", 4, 3), text: "喝的不要。", isCorrect: false, feedback: "Pick a drink! '一壶茶' or '啤酒'." },
        ],
      },
      {
        id: s("zh-restaurant", 5), characterName: "服务员", characterAvatar: "🧑‍🍳",
        dialogue: "请问还需要别的吗？",
        options: [
          { id: o("zh-restaurant", 5, 1), text: "不用了，可以买单吗？", isCorrect: true, feedback: "'买单' = pay the bill. Essential phrase!" },
          { id: o("zh-restaurant", 5, 2), text: "再来一份米饭。", isCorrect: true, feedback: "'米饭' = rice. Good addition!" },
          { id: o("zh-restaurant", 5, 3), text: "别的是什么。", isCorrect: false, feedback: "Answer the question! '不用了' or order more." },
        ],
      },
      {
        id: s("zh-restaurant", 6), characterName: "服务员", characterAvatar: "🧑‍🍳",
        dialogue: "一共一百二十块。",
        options: [
          { id: o("zh-restaurant", 6, 1), text: "可以用支付宝吗？", isCorrect: true, feedback: "'支付宝' = Alipay. Very practical in China!" },
          { id: o("zh-restaurant", 6, 2), text: "给你。菜非常好吃！", isCorrect: true, feedback: "'好吃' = delicious. Great compliment!" },
          { id: o("zh-restaurant", 6, 3), text: "太贵了。", isCorrect: false, feedback: "Rude! Pay gracefully." },
        ],
      },
    ],
  },
  {
    id: "zh-directions",
    title: "问路",
    location: "南京的街道",
    level: "intermediate",
    language: "chinese",
    duration: "6 min",
    xpReward: 65,
    steps: [
      {
        id: s("zh-directions", 1), characterName: "路人", characterAvatar: "🚶",
        dialogue: "你在找什么吗？",
        options: [
          { id: o("zh-directions", 1, 1), text: "是的，我在找火车站。", isCorrect: true, feedback: "'火车站' means train station." },
          { id: o("zh-directions", 1, 2), text: "我迷路了。", isCorrect: true, feedback: "'迷路' means lost." },
          { id: o("zh-directions", 1, 3), text: "不，我很好。", isCorrect: false, feedback: "But you need directions! Try '我在找火车站'." },
        ],
      },
      {
        id: s("zh-directions", 2), characterName: "路人", characterAvatar: "🚶",
        dialogue: "火车站？走路大概十分钟。一直往前走。",
        options: [
          { id: o("zh-directions", 2, 1), text: "一直往前走，好的。然后呢？", isCorrect: true, feedback: "'一直往前走' = go straight." },
          { id: o("zh-directions", 2, 2), text: "远不远？", isCorrect: true, feedback: "'远不远' = is it far?" },
          { id: o("zh-directions", 2, 3), text: "我不走路。", isCorrect: false, feedback: "But you asked! Follow up: '然后呢？'." },
        ],
      },
      {
        id: s("zh-directions", 3), characterName: "路人", characterAvatar: "🚶",
        dialogue: "在红绿灯那里左转，然后继续直走。",
        options: [
          { id: o("zh-directions", 3, 1), text: "红绿灯左转，明白了！", isCorrect: true, feedback: "'红绿灯' = traffic light, '左转' = turn left." },
          { id: o("zh-directions", 3, 2), text: "请再说一遍好吗？", isCorrect: true, feedback: "Asking to repeat. Fine!" },
          { id: o("zh-directions", 3, 3), text: "左还是右？", isCorrect: false, feedback: "They said '左转' (left)! Confirm it." },
        ],
      },
      {
        id: s("zh-directions", 4), characterName: "路人", characterAvatar: "🚶",
        dialogue: "火车站就在你的右边。",
        options: [
          { id: o("zh-directions", 4, 1), text: "太好了，非常感谢你的帮助！", isCorrect: true, feedback: "Polite and grateful!" },
          { id: o("zh-directions", 4, 2), text: "右边，好的。谢谢！", isCorrect: true, feedback: "Confirming. Great!" },
          { id: o("zh-directions", 4, 3), text: "右边。", isCorrect: false, feedback: "Thank them! '非常感谢！'." },
        ],
      },
      {
        id: s("zh-directions", 5), characterName: "路人", characterAvatar: "🚶",
        dialogue: "不客气！祝你一路顺利！",
        options: [
          { id: o("zh-directions", 5, 1), text: "谢谢，祝你有美好的一天！", isCorrect: true, feedback: "Warm goodbye!" },
          { id: o("zh-directions", 5, 2), text: "再见！", isCorrect: true, feedback: "Simple and classic." },
          { id: o("zh-directions", 5, 3), text: "顺利。", isCorrect: false, feedback: "Say goodbye properly! '谢谢，再见！'." },
        ],
      },
    ],
  },
  {
    id: "zh-market",
    title: "在市场购物",
    location: "广州的一个市场",
    level: "intermediate",
    language: "chinese",
    duration: "6 min",
    xpReward: 70,
    steps: [
      {
        id: s("zh-market", 1), characterName: "摊主", characterAvatar: "🧑‍🌾",
        dialogue: "你好！看看这些新鲜的西红柿！",
        options: [
          { id: o("zh-market", 1, 1), text: "看起来很好！多少钱一斤？", isCorrect: true, feedback: "'一斤' is the Chinese unit (500g). Market vocabulary!" },
          { id: o("zh-market", 1, 2), text: "我要买西红柿。", isCorrect: true, feedback: "Direct and clear!" },
          { id: o("zh-market", 1, 3), text: "西红柿红色。", isCorrect: false, feedback: "Just a description! Ask the price or order." },
        ],
      },
      {
        id: s("zh-market", 2), characterName: "摊主", characterAvatar: "🧑‍🌾",
        dialogue: "五块钱一斤。你要多少？",
        options: [
          { id: o("zh-market", 2, 1), text: "两斤，谢谢。", isCorrect: true, feedback: "Clear order!" },
          { id: o("zh-market", 2, 2), text: "一斤就好。", isCorrect: true, feedback: "'就好' = that's enough. Natural!" },
          { id: o("zh-market", 2, 3), text: "块钱不要。", isCorrect: false, feedback: "Say how much! '两斤，谢谢'." },
        ],
      },
      {
        id: s("zh-market", 3), characterName: "摊主", characterAvatar: "🧑‍🌾",
        dialogue: "给你！还要别的吗？",
        options: [
          { id: o("zh-market", 3, 1), text: "有草莓吗？", isCorrect: true, feedback: "'草莓' = strawberries." },
          { id: o("zh-market", 3, 2), text: "不用了，就这些。", isCorrect: true, feedback: "'就这些' = just these. Clear!" },
          { id: o("zh-market", 3, 3), text: "别的要。", isCorrect: false, feedback: "Be specific! '有草莓吗？' or '就这些'." },
        ],
      },
      {
        id: s("zh-market", 4), characterName: "摊主", characterAvatar: "🧑‍🌾",
        dialogue: "有啊！尝尝，很甜！",
        options: [
          { id: o("zh-market", 4, 1), text: "嗯，真好吃！来一盒。", isCorrect: true, feedback: "'一盒' = a box/punnet." },
          { id: o("zh-market", 4, 2), text: "谢谢！很新鲜。", isCorrect: true, feedback: "'新鲜' = fresh. Natural!" },
          { id: o("zh-market", 4, 3), text: "甜不要。", isCorrect: false, feedback: "They're offering a taste! Try '真好吃'." },
        ],
      },
      {
        id: s("zh-market", 5), characterName: "摊主", characterAvatar: "🧑‍🌾",
        dialogue: "一共二十块。",
        options: [
          { id: o("zh-market", 5, 1), text: "给你。谢谢，再见！", isCorrect: true, feedback: "Perfect market farewell!" },
          { id: o("zh-market", 5, 2), text: "好的，扫码支付。", isCorrect: true, feedback: "'扫码支付' = scan to pay. Very modern China!" },
          { id: o("zh-market", 5, 3), text: "二十。", isCorrect: false, feedback: "Pay and say goodbye! '给你，谢谢！'." },
        ],
      },
    ],
  },
  {
    id: "zh-train",
    title: "买火车票",
    location: "上海虹桥站",
    level: "intermediate",
    language: "chinese",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("zh-train", 1), characterName: "售票员", characterAvatar: "🚂",
        dialogue: "你好！需要什么帮助？",
        options: [
          { id: o("zh-train", 1, 1), text: "我想买一张去南京的票。", isCorrect: true, feedback: "'一张票' = one ticket. Perfect!" },
          { id: o("zh-train", 1, 2), text: "一张去杭州的往返票。", isCorrect: true, feedback: "'往返票' = round trip ticket!" },
          { id: o("zh-train", 1, 3), text: "火车南京。", isCorrect: false, feedback: "Be polite! '我想买一张去南京的票'." },
        ],
      },
      {
        id: s("zh-train", 2), characterName: "售票员", characterAvatar: "🚂",
        dialogue: "单程还是往返？",
        options: [
          { id: o("zh-train", 2, 1), text: "往返的。", isCorrect: true, feedback: "Round trip!" },
          { id: o("zh-train", 2, 2), text: "单程的。", isCorrect: true, feedback: "One-way. Also valid!" },
          { id: o("zh-train", 2, 3), text: "听不懂。", isCorrect: false, feedback: "'单程' = one-way, '往返' = round trip." },
        ],
      },
      {
        id: s("zh-train", 3), characterName: "售票员", characterAvatar: "🚂",
        dialogue: "一等座还是二等座？",
        options: [
          { id: o("zh-train", 3, 1), text: "二等座，谢谢。", isCorrect: true, feedback: "Standard class. Economical!" },
          { id: o("zh-train", 3, 2), text: "一等座。", isCorrect: true, feedback: "First class! More spacious." },
          { id: o("zh-train", 3, 3), text: "最好的。", isCorrect: false, feedback: "Specify: '一等座' or '二等座'." },
        ],
      },
      {
        id: s("zh-train", 4), characterName: "售票员", characterAvatar: "🚂",
        dialogue: "下一班车下午两点半出发。可以吗？",
        options: [
          { id: o("zh-train", 4, 1), text: "可以，没问题。", isCorrect: true, feedback: "2:30 PM works!" },
          { id: o("zh-train", 4, 2), text: "有没有更早的？", isCorrect: true, feedback: "'更早的' means earlier." },
          { id: o("zh-train", 4, 3), text: "两点不行。", isCorrect: false, feedback: "Be specific! '有没有更早的？'." },
        ],
      },
      {
        id: s("zh-train", 5), characterName: "售票员", characterAvatar: "🚂",
        dialogue: "一共一百五十块。怎么付？",
        options: [
          { id: o("zh-train", 5, 1), text: "微信支付可以吗？", isCorrect: true, feedback: "WeChat Pay is everywhere in China!" },
          { id: o("zh-train", 5, 2), text: "付现金。", isCorrect: true, feedback: "'现金' = cash." },
          { id: o("zh-train", 5, 3), text: "免费吗？", isCorrect: false, feedback: "Trains aren't free! '微信支付可以吗？'." },
        ],
      },
      {
        id: s("zh-train", 6), characterName: "售票员", characterAvatar: "🚂",
        dialogue: "这是你的票。三号站台。祝旅途愉快！",
        options: [
          { id: o("zh-train", 6, 1), text: "谢谢！祝你有美好的一天！", isCorrect: true, feedback: "'站台' = platform. Have a nice trip!" },
          { id: o("zh-train", 6, 2), text: "三号站台，知道了。谢谢！", isCorrect: true, feedback: "Confirming the platform. Smart!" },
          { id: o("zh-train", 6, 3), text: "旅途。", isCorrect: false, feedback: "Say goodbye! '谢谢！'." },
        ],
      },
    ],
  },
  // ADVANCED
  {
    id: "zh-interview",
    title: "工作面试",
    location: "深圳科技园的办公室",
    level: "advanced",
    language: "chinese",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("zh-interview", 1), characterName: "人事经理", characterAvatar: "💼",
        dialogue: "你好，谢谢你来面试。请简单介绍一下自己。",
        options: [
          { id: o("zh-interview", 1, 1), text: "你好。我是市场营销专业毕业的，有三年工作经验。", isCorrect: true, feedback: "Strong professional introduction!" },
          { id: o("zh-interview", 1, 2), text: "我很善良，喜欢猫。", isCorrect: false, feedback: "Too personal! Focus on professional experience." },
          { id: o("zh-interview", 1, 3), text: "我在北京大学学的国际贸易。", isCorrect: true, feedback: "Good academic background!" },
        ],
      },
      {
        id: s("zh-interview", 2), characterName: "人事经理", characterAvatar: "💼",
        dialogue: "你为什么想加入我们公司？",
        options: [
          { id: o("zh-interview", 2, 1), text: "贵公司以创新和企业文化闻名。", isCorrect: true, feedback: "'贵公司' is a formal way to say 'your company'." },
          { id: o("zh-interview", 2, 2), text: "因为我需要钱。", isCorrect: false, feedback: "Too direct! Focus on company values." },
          { id: o("zh-interview", 2, 3), text: "我对你们的行业很有热情，希望能做出贡献。", isCorrect: true, feedback: "'贡献' means contribution. Professional!" },
        ],
      },
      {
        id: s("zh-interview", 3), characterName: "人事经理", characterAvatar: "💼",
        dialogue: "你的优势是什么？",
        options: [
          { id: o("zh-interview", 3, 1), text: "我做事严谨、有创意，而且有很好的团队合作精神。", isCorrect: true, feedback: "'团队合作精神' = team spirit!" },
          { id: o("zh-interview", 3, 2), text: "我很完美。", isCorrect: false, feedback: "Too arrogant! List specific strengths." },
          { id: o("zh-interview", 3, 3), text: "我有很强的组织能力，能快速适应新环境。", isCorrect: true, feedback: "'适应新环境' = adapt to new environments." },
        ],
      },
      {
        id: s("zh-interview", 4), characterName: "人事经理", characterAvatar: "💼",
        dialogue: "你对未来五年有什么规划？",
        options: [
          { id: o("zh-interview", 4, 1), text: "我希望能成长为团队负责人。", isCorrect: true, feedback: "'团队负责人' = team leader. Ambitious!" },
          { id: o("zh-interview", 4, 2), text: "坐你的位子。", isCorrect: false, feedback: "Threatening! Think professional growth." },
          { id: o("zh-interview", 4, 3), text: "我想深化自己的专业能力，承担更多责任。", isCorrect: true, feedback: "'深化' means to deepen. Very professional!" },
        ],
      },
      {
        id: s("zh-interview", 5), characterName: "人事经理", characterAvatar: "💼",
        dialogue: "你有什么问题想问我们吗？",
        options: [
          { id: o("zh-interview", 5, 1), text: "请问这个岗位的日常工作是怎样的？", isCorrect: true, feedback: "Shows genuine interest!" },
          { id: o("zh-interview", 5, 2), text: "公司的晋升机会怎么样？", isCorrect: true, feedback: "'晋升' = promotion. Smart question!" },
          { id: o("zh-interview", 5, 3), text: "没有问题。", isCorrect: false, feedback: "Always ask questions! It shows interest." },
        ],
      },
    ],
  },
  {
    id: "zh-business",
    title: "商务会议",
    location: "北京的会议室",
    level: "advanced",
    language: "chinese",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("zh-business", 1), characterName: "同事", characterAvatar: "👔",
        dialogue: "大家好。我们先来看看这个季度的总结。",
        options: [
          { id: o("zh-business", 1, 1), text: "我准备了一份业绩报告。我先来介绍吧？", isCorrect: true, feedback: "Taking initiative!" },
          { id: o("zh-business", 1, 2), text: "这个季度的数据很不错。", isCorrect: true, feedback: "Direct and relevant." },
          { id: o("zh-business", 1, 3), text: "我什么都没准备。", isCorrect: false, feedback: "Not prepared? Be proactive!" },
        ],
      },
      {
        id: s("zh-business", 2), characterName: "同事", characterAvatar: "👔",
        dialogue: "销售额增长了15%。大家怎么看？",
        options: [
          { id: o("zh-business", 2, 1), text: "很令人鼓舞。我觉得新策略开始见效了。", isCorrect: true, feedback: "'见效' = showing results." },
          { id: o("zh-business", 2, 2), text: "我们应该分析哪些产品表现最好。", isCorrect: true, feedback: "Analytical thinking!" },
          { id: o("zh-business", 2, 3), text: "百分之十五不错。", isCorrect: false, feedback: "Too simple! Add analysis." },
        ],
      },
      {
        id: s("zh-business", 3), characterName: "同事", characterAvatar: "👔",
        dialogue: "下个季度大家有什么目标建议？",
        options: [
          { id: o("zh-business", 3, 1), text: "我建议加强我们在社交媒体上的推广。", isCorrect: true, feedback: "'社交媒体' = social media." },
          { id: o("zh-business", 3, 2), text: "我们应该争取20%的增长，并开拓新市场。", isCorrect: true, feedback: "'开拓新市场' = develop new markets." },
          { id: o("zh-business", 3, 3), text: "卖更多。", isCorrect: false, feedback: "Too vague! Be specific." },
        ],
      },
      {
        id: s("zh-business", 4), characterName: "同事", characterAvatar: "👔",
        dialogue: "好的。让我们总结一下行动计划。",
        options: [
          { id: o("zh-business", 4, 1), text: "营销方案我来负责，周五之前发给大家。", isCorrect: true, feedback: "'我来负责' = I'll be responsible for it." },
          { id: o("zh-business", 4, 2), text: "建议下周再开一次会来确认计划。", isCorrect: true, feedback: "Follow-up meeting. Good management!" },
          { id: o("zh-business", 4, 3), text: "好的。", isCorrect: false, feedback: "Take action! Volunteer for tasks." },
        ],
      },
    ],
  },
  {
    id: "zh-travel-problem",
    title: "解决旅行问题",
    location: "武汉火车站",
    level: "advanced",
    language: "chinese",
    duration: "7 min",
    xpReward: 90,
    steps: [
      {
        id: s("zh-travel-problem", 1), characterName: "站务员", characterAvatar: "🚉",
        dialogue: "很抱歉，您的列车因故取消了。",
        options: [
          { id: o("zh-travel-problem", 1, 1), text: "这很麻烦。我有什么选择？", isCorrect: true, feedback: "'麻烦' = troublesome. Calm reaction!" },
          { id: o("zh-travel-problem", 1, 2), text: "今天还有别的车吗？", isCorrect: true, feedback: "Direct question about alternatives." },
          { id: o("zh-travel-problem", 1, 3), text: "不能接受！我要马上退款！", isCorrect: false, feedback: "First ask about alternatives." },
        ],
      },
      {
        id: s("zh-travel-problem", 2), characterName: "站务员", characterAvatar: "🚉",
        dialogue: "两小时后有替代大巴，或者明天早上有列车。",
        options: [
          { id: o("zh-travel-problem", 2, 1), text: "我坐大巴吧。在哪里上车？", isCorrect: true, feedback: "'替代大巴' = replacement bus." },
          { id: o("zh-travel-problem", 2, 2), text: "能帮我订明天的车票吗？", isCorrect: true, feedback: "Planning ahead!" },
          { id: o("zh-travel-problem", 2, 3), text: "两个小时太久了。", isCorrect: false, feedback: "Those are your options. Pick one!" },
        ],
      },
      {
        id: s("zh-travel-problem", 3), characterName: "站务员", characterAvatar: "🚉",
        dialogue: "已经办好了。给您添麻烦了，非常抱歉。",
        options: [
          { id: o("zh-travel-problem", 3, 1), text: "没关系。谢谢你的帮助。", isCorrect: true, feedback: "'没关系' = it's okay. Graceful!" },
          { id: o("zh-travel-problem", 3, 2), text: "谢谢。这种事难免。祝你工作顺利！", isCorrect: true, feedback: "Understanding attitude!" },
          { id: o("zh-travel-problem", 3, 3), text: "下次不要取消了。", isCorrect: false, feedback: "The agent can't control cancellations!" },
        ],
      },
    ],
  },
  {
    id: "zh-debate",
    title: "辩论观点",
    location: "北京大学的咖啡馆",
    level: "advanced",
    language: "chinese",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("zh-debate", 1), characterName: "同学", characterAvatar: "🎓",
        dialogue: "你觉得人工智能会取代老师吗？",
        options: [
          { id: o("zh-debate", 1, 1), text: "我不这么认为。AI可以辅助，但人与人之间的交流是不可替代的。", isCorrect: true, feedback: "Nuanced opinion!" },
          { id: o("zh-debate", 1, 2), text: "从长远来看有可能，但这涉及伦理问题。", isCorrect: true, feedback: "'伦理问题' = ethical issues." },
          { id: o("zh-debate", 1, 3), text: "会的，机器人更好。", isCorrect: false, feedback: "Too simplistic! Develop your argument." },
        ],
      },
      {
        id: s("zh-debate", 2), characterName: "同学", characterAvatar: "🎓",
        dialogue: "但学生用科技不是学得更好吗？",
        options: [
          { id: o("zh-debate", 2, 1), text: "要看情况。科技是工具，不是目的。", isCorrect: true, feedback: "'不是目的' = not the goal." },
          { id: o("zh-debate", 2, 2), text: "部分是，但和老师互动能培养批判性思维。", isCorrect: true, feedback: "'批判性思维' = critical thinking." },
          { id: o("zh-debate", 2, 3), text: "不是，书更好。", isCorrect: false, feedback: "Too dismissive! Engage more." },
        ],
      },
      {
        id: s("zh-debate", 3), characterName: "同学", characterAvatar: "🎓",
        dialogue: "你说得对。不管怎样，这是个很有意思的话题。",
        options: [
          { id: o("zh-debate", 3, 1), text: "确实。讨论这些问题对我们面对未来很重要。", isCorrect: true, feedback: "Great conclusion!" },
          { id: o("zh-debate", 3, 2), text: "是啊，我喜欢这样的讨论。下次再聊！", isCorrect: true, feedback: "Friendly and enthusiastic!" },
          { id: o("zh-debate", 3, 3), text: "对。", isCorrect: false, feedback: "Engage more with this rich topic!" },
        ],
      },
    ],
  },
];

// ─── GERMAN STORIES (external file) ────────────────────────
import { germanStories } from "./germanStories";

// ─── ARABIC STORIES (external file) ────────────────────────
import { arabicStories } from "./arabicStories";

// ─── AGGREGATOR ────────────────────────────────────────────

const allStories: Story[] = [...frenchStories, ...spanishStories, ...chineseStories, ...germanStories, ...arabicStories];

export function getStoriesForLanguage(lang: LearningLanguage): Story[] {
  return allStories.filter((s) => s.language === lang);
}

export function getStoryById(id: string): Story | undefined {
  return allStories.find((s) => s.id === id);
}

export function getStoriesByLevel(lang: LearningLanguage, level: Story["level"]): Story[] {
  return getStoriesForLanguage(lang).filter((s) => s.level === level);
}
