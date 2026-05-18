export type Choice = "A" | "B" | "C" | "D";

export interface TestQuestion {
  id: number;
  prompt: string;
  options: Record<Choice, string>;
  answer: Choice;
}

export interface TestSection {
  heading?: string;
  label: string;
  title?: string;
  passage: string[];
  source?: string;
  questions: TestQuestion[];
}

export const READING_TEST_4_DURATION_MIN = 30;

export const readingTest4: TestSection[] = [
  // --- Documents divers ---
  {
    heading: "Documents divers",
    label: "Texte 1",
    title: "RECETTE CRÊPES (4 personnes)",
    passage: [
      "Ingrédients :",
      "- 250g de farine",
      "- 3 œufs",
      "- 50cl de lait",
      "- 1 pincée de sel",
      "- 2 cuillères à soupe de sucre (pour les crêpes sucrées)",
      "Préparation : Mélanger la farine et les œufs. Ajouter progressivement le lait tout en remuant.",
    ],
    questions: [
      {
        id: 1,
        prompt: "Ce document est :",
        options: {
          A: "Une liste de courses",
          B: "Une recette de cuisine",
          C: "Un menu de restaurant",
          D: "Un régime alimentaire",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 2",
    title: "PARACÉTAMOL 500 mg — NOTICE",
    passage: [
      "Posologie adulte : 1 à 2 comprimés par prise, à renouveler si besoin toutes les 4 heures, sans dépasser 6 comprimés par jour.",
      "Contre-indications : insuffisance hépatique sévère.",
      "À conserver hors de portée des enfants.",
    ],
    questions: [
      {
        id: 2,
        prompt: "Combien de comprimés peut-on prendre par jour au maximum ?",
        options: {
          A: "4 comprimés",
          B: "6 comprimés",
          C: "8 comprimés",
          D: "10 comprimés",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 3",
    title: "PROGRAMME DU MOIS — THÉÂTRE DE LA VILLE",
    passage: [
      "Mardi 5 mai : « Le Malade imaginaire » de Molière (20h)",
      "Jeudi 7 mai : Conférence sur l'opéra (18h30, gratuit)",
      "Samedi 9 mai : Spectacle jeune public « Les contes de la forêt » (15h)",
    ],
    questions: [
      {
        id: 3,
        prompt: "Quel événement est gratuit ?",
        options: {
          A: "La pièce de Molière",
          B: "La conférence sur l'opéra",
          C: "Le spectacle jeune public",
          D: "Aucun",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 4",
    title: "Avis de décès",
    passage: [
      "Madame Jeanne DURAND, née MARTIN, âgée de 87 ans, domiciliée à Lyon 3e, nous a quittés le 12 mars.",
      "La cérémonie religieuse aura lieu le 18 mars à 14h30 en l'église Saint-Pothin.",
      "Ni fleurs, ni couronnes. Dons à la recherche contre le cancer.",
    ],
    questions: [
      {
        id: 4,
        prompt: "Ce document annonce :",
        options: {
          A: "Un mariage",
          B: "Une naissance",
          C: "Un décès",
          D: "Un anniversaire",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 5",
    title: "BULLETIN TRIMESTRIEL — Collège Victor Hugo",
    passage: [
      "Élève : Lucas MARTIN — Classe : 4e B",
      "Mathématiques : 12/20 (moyenne classe : 11/20)",
      "Français : 8/20 (moyenne classe : 12/20) — Attention, des efforts sont nécessaires",
      "Anglais : 15/20 (moyenne classe : 13/20)",
      "Commentaire général : Des progrès en mathématiques mais des difficultés persistantes en français.",
    ],
    questions: [
      {
        id: 5,
        prompt: "Dans quelle matière Lucas doit-il faire des efforts ?",
        options: {
          A: "Mathématiques",
          B: "Français",
          C: "Anglais",
          D: "Histoire",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 6",
    title: "FACTURE EDF — Détail de la consommation",
    passage: [
      "Période : 15 novembre au 14 février",
      "Consommation : 2 450 kWh",
      "Montant total : 287,50€",
      "Dont abonnement : 45€",
      "Dont consommation : 242,50€",
      "Date d'échéance : 28 février",
    ],
    questions: [
      {
        id: 6,
        prompt: "Quel est le montant de l'abonnement ?",
        options: {
          A: "242,50€",
          B: "287,50€",
          C: "45€",
          D: "2 450€",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 7",
    title: "SALON DE COIFFURE « LES CISELLES D'OR »",
    passage: [
      "Horaires d'ouverture :",
      "Mardi — vendredi : 9h — 19h",
      "Samedi : 8h — 17h",
      "Fermeture hebdomadaire : lundi et dimanche",
      "Sur rendez-vous uniquement",
      "Tél : 01 23 45 67 89",
    ],
    questions: [
      {
        id: 7,
        prompt: "Ce salon est fermé :",
        options: {
          A: "Le samedi",
          B: "Le lundi et le dimanche",
          C: "Le mercredi après-midi",
          D: "Tous les jours à midi",
        },
        answer: "B",
      },
    ],
  },

  // --- Phrases lacunaires ---
  {
    heading: "Phrases lacunaires",
    label: "Phrase 8",
    passage: ["Le médecin m'a prescrit des _______ à prendre matin et soir."],
    questions: [
      {
        id: 8,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "examens",
          B: "médicaments",
          C: "ordonnances",
          D: "vaccins",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Phrase 9",
    passage: ["Pour postuler à ce logement, vous devez fournir un _______ de paie."],
    questions: [
      {
        id: 9,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "bulletin",
          B: "justificatif",
          C: "certificat",
          D: "attestation",
        },
        answer: "D",
      },
    ],
  },
  {
    label: "Phrase 10",
    passage: ["La réunion a été _______ en raison de la grève des transports."],
    questions: [
      {
        id: 10,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "maintenue",
          B: "annulée",
          C: "raccourcie",
          D: "prolongée",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Phrase 11",
    passage: ["Vous devez _______ votre abonnement avant le 30 pour éviter une interruption."],
    questions: [
      {
        id: 11,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "résilier",
          B: "renouveler",
          C: "changer",
          D: "suspendre",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Phrase 12",
    passage: ["Le musée propose une _______ de réduction pour les groupes de plus de 10 personnes."],
    questions: [
      {
        id: 12,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "interdiction",
          B: "majoration",
          C: "tarification",
          D: "augmentation",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Phrase 13",
    passage: ["En cas de _______, composez le 15 (SAMU)."],
    questions: [
      {
        id: 13,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "urgence",
          B: "question",
          C: "information",
          D: "réclamation",
        },
        answer: "A",
      },
    ],
  },

  // --- Textes lacunaires ---
  {
    heading: "Textes lacunaires",
    label: "Texte 8",
    title: "MODE D'EMPLOI — LAVE-VAISSELLE",
    passage: [
      "Avant la première utilisation, retirez tous les éléments d'emballage et vérifiez que l'appareil n'a pas été (14) ______ pendant le transport. Versez le sel régénérant dans le compartiment prévu à cet effet (environ 500g). Ce sel permet de (15) ______ le calcaire et de protéger votre machine. Ajoutez ensuite le liquide de rinçage et la poudre ou pastille de lavage. Sélectionnez le programme adapté à votre vaisselle (éco pour un lavage quotidien, intensif pour les casseroles très sales). N'ouvrez pas la porte pendant le (16) ______, risque de brûlure par la vapeur.",
    ],
    questions: [
      {
        id: 14,
        prompt: "Question 14 :",
        options: { A: "nettoyé", B: "endommagé", C: "ouvert", D: "testé" },
        answer: "B",
      },
      {
        id: 15,
        prompt: "Question 15 :",
        options: { A: "ajouter", B: "enlever", C: "combattre", D: "créer" },
        answer: "C",
      },
      {
        id: 16,
        prompt: "Question 16 :",
        options: { A: "repos", B: "séchage", C: "remplissage", D: "fonctionnement" },
        answer: "D",
      },
    ],
  },
  {
    label: "Texte 9",
    title: "AVIS D'IMPOSITION 2024",
    passage: [
      "Monsieur, votre situation fiscale a été (17) ______. Après étude de votre déclaration de revenus 2023, nous vous informons que vous êtes redevable d'un montant total de 1 250€. Un avoir de 300€ (crédit d'impôt pour dons aux associations) a été (18) ______, ramenant le solde à payer à 950€. Le prélèvement à la source sera (19) ______ à compter du mois prochain. En cas de difficultés de paiement, vous pouvez demander un échéancier en vous connectant à votre espace particulier sur impots.gouv.fr.",
    ],
    questions: [
      {
        id: 17,
        prompt: "Question 17 :",
        options: { A: "refusée", B: "perdue", C: "traitée", D: "rejetée" },
        answer: "C",
      },
      {
        id: 18,
        prompt: "Question 18 :",
        options: { A: "ajouté", B: "déduit", C: "oublié", D: "multiplié" },
        answer: "B",
      },
      {
        id: 19,
        prompt: "Question 19 :",
        options: { A: "supprimé", B: "augmenté", C: "ajusté", D: "suspendu" },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 10",
    title: "FICHE TECHNIQUE — SMARTPHONE XYZ 10",
    passage: [
      "L'écran de 6,5 pouces offre une définition 4K. Sa batterie de 5000 mAh permet une autonomie de 2 jours en usage modéré. Le processeur octa-core assure une fluidité parfaite, même pour les jeux les plus (20) ______. L'appareil photo triple module (48+12+5 mégapixels) capture des images détaillées, même en basse lumière. Ce modèle est (21) ______ à la poussière et à l'eau (indice IP68). Attention : le chargeur n'est pas fourni dans le (22) ______, vendez-le séparément.",
    ],
    questions: [
      {
        id: 20,
        prompt: "Question 20 :",
        options: { A: "lents", B: "anciens", C: "exigeants", D: "faciles" },
        answer: "C",
      },
      {
        id: 21,
        prompt: "Question 21 :",
        options: { A: "sensible", B: "résistant", C: "collé", D: "ouvert" },
        answer: "B",
      },
      {
        id: 22,
        prompt: "Question 22 :",
        options: { A: "boîte", B: "boutique", C: "magasin", D: "catalogue" },
        answer: "A",
      },
    ],
  },

  // --- Lecture rapide ---
  {
    heading: "Lecture rapide",
    label: "Document A",
    title: "Offres d'abonnement (salle de sport)",
    passage: [
      "Formule A — Accès illimité à la salle, sans cours collectifs. 25€/mois. Engagement 1 an.",
      "Formule B — Accès illimité + tous les cours collectifs (yoga, zumba, body pump). 40€/mois. Sans engagement.",
      "Formule C — Accès uniquement le week-end (samedi-dimanche). 15€/mois. Engagement 6 mois.",
      "Formule D — Forfait « 10 séances » valable 3 mois. 60€. Idéal pour les petits budgets occasionnels.",
    ],
    questions: [
      {
        id: 23,
        prompt: "Une personne qui veut essayer le yoga doit choisir :",
        options: {
          A: "Formule A",
          B: "Formule B",
          C: "Formule C",
          D: "Formule D",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Document B",
    title: "Avis de consommateurs (lave-linge)",
    passage: [
      "Avis 1 : « Mon lave-linge est tombé en panne après 3 mois. Service après-vente catastrophique, personne ne répond. À fuir ! »",
      "Avis 2 : « Très silencieux, parfait pour un appartement. Laverie de 8 kg suffisante pour une famille de 4. Je recommande. »",
      "Avis 3 : « Les programmes sont compliqués à comprendre. La notice n'est pas claire. Par contre, le lavage est efficace. »",
      "Avis 4 : « Installation facile, attention aux pieds mal fixés. Le tambour bouge un peu en essorage. Bon rapport qualité-prix. »",
    ],
    questions: [
      {
        id: 24,
        prompt: "Quel avis signale un problème de bruit ou de vibrations ?",
        options: { A: "Avis 1", B: "Avis 2", C: "Avis 3", D: "Avis 4" },
        answer: "D",
      },
    ],
  },
  {
    label: "Document C",
    title: "Profils de demandeurs",
    passage: [
      "Profil 1 : Personne handicapée à mobilité réduite nécessitant une aide humaine quotidienne.",
      "Profil 2 : Étudiant boursier vivant en résidence universitaire, sans ressources.",
      "Profil 3 : Famille monoparentale avec 2 enfants en bas âge, logement insalubre.",
      "Profil 4 : Chômeur de longue durée de plus de 50 ans, logé à l'hôtel social.",
    ],
    questions: [
      {
        id: 25,
        prompt: "Lequel de ces profils bénéficie déjà du logement universitaire ?",
        options: { A: "Profil 1", B: "Profil 2", C: "Profil 3", D: "Profil 4" },
        answer: "B",
      },
    ],
  },

  // --- Documents administratifs ---
  {
    heading: "Documents administratifs",
    label: "Texte 11",
    title: "CERTIFICAT MÉDICAL D'APTITUDE PHYSIQUE",
    passage: [
      "Je soussigné, Dr. Philippe GARNIER, certifie avoir examiné ce jour Monsieur Thomas LEROY, né le 15 mars 1985.",
      "À l'issue de cet examen clinique, je déclare Monsieur LEROY :",
      "- Apte à la pratique de la plongée sous-marine (niveau 2)",
      "- Apte à la pratique de l'alpinisme jusqu'à 4 000 m",
      "- Inapte à la pratique du parachutisme (antécédents de fracture vertébrale L4)",
      "Ce certificat est valable pour une durée d'un an à compter de ce jour.",
      "Fait à Chamonix, le 12 mai 2024.",
    ],
    questions: [
      {
        id: 26,
        prompt: "Quelle activité Thomas LEROY ne peut-il PAS pratiquer ?",
        options: {
          A: "La plongée sous-marine",
          B: "L'alpinisme",
          C: "Le parachutisme",
          D: "Aucune, il est apte à tout",
        },
        answer: "C",
      },
      {
        id: 27,
        prompt: "Ce certificat est valable pendant :",
        options: { A: "6 mois", B: "1 an", C: "2 ans", D: "3 ans" },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 12",
    title: "EXTRAIT DU RÈGLEMENT — BIBLIOTHÈQUE UNIVERSITAIRE",
    passage: [
      "Article 12 — Consultation sur place : Les documents de la réserve (thèses, ouvrages rares, manuscrits anciens) sont exclusivement consultables sur place, dans la salle de lecture dédiée. Il est strictement interdit de les photographier sans l'autorisation préalable du bibliothécaire.",
      "Article 13 — Prêt à domicile : Le prêt à domicile est réservé aux étudiants inscrits, aux enseignants-chercheurs et au personnel administratif de l'université. La durée de prêt est de 3 semaines pour les livres, 1 semaine pour les DVD. Le renouvellement est possible 2 fois consécutives, sauf si un autre usager a réservé le document.",
      "Article 14 — Sanctions : Tout retard de restitution entraîne une suspension de 15 jours des droits d'emprunt par document rendu en retard. En cas de perte ou de détérioration, l'usager devra rembourser l'intégralité de l'ouvrage, majoré de 20% de frais de traitement.",
    ],
    questions: [
      {
        id: 28,
        prompt: "Qui peut emprunter des livres à domicile ?",
        options: {
          A: "Toute personne munie d'une carte d'identité",
          B: "Uniquement les professeurs",
          C: "Les membres de l'université uniquement",
          D: "Les habitants de la ville",
        },
        answer: "C",
      },
      {
        id: 29,
        prompt: "Quelle est la conséquence d'un retour en retard ?",
        options: {
          A: "Une amende de 15€",
          B: "Une suspension temporaire des droits d'emprunt",
          C: "L'annulation de l'inscription",
          D: "Un avertissement sans gravité",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 13",
    title: "CONTRAT DE TRAVAIL À DURÉE DÉTERMINÉE",
    passage: [
      "Article 1 — Parties : Entre la société XEROX France, et Madame Sophie LAMBERT.",
      "Article 2 — Objet du contrat : CDD de remplacement d'un salarié absent (congé maternité).",
      "Article 3 — Durée : 6 mois à compter du 1er juin 2024, renouvelable une fois pour une durée maximale de 12 mois.",
      "Article 4 — Fonctions : Assistante de direction, niveau 5, coefficient 275.",
      "Article 5 — Rémunération : Salaire brut mensuel : 2 200€, sur 13 mois.",
      "Article 6 — Période d'essai : 1 mois renouvelable une fois.",
      "Article 7 — Lieu de travail : Siège social de Levallois-Perret. Des déplacements occasionnels en région parisienne sont à prévoir.",
    ],
    questions: [
      {
        id: 30,
        prompt: "Quelle est la durée maximale possible de ce contrat (avec renouvellement) ?",
        options: { A: "6 mois", B: "9 mois", C: "12 mois", D: "18 mois" },
        answer: "C",
      },
      {
        id: 31,
        prompt: "La salariée devra-t-elle voyager ?",
        options: {
          A: "Oui, régulièrement à l'étranger",
          B: "Oui, occasionnellement en région parisienne",
          C: "Non, uniquement au siège",
          D: "Non, le contrat est en télétravail",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 14",
    title: "BAIL D'HABITATION (CLAUSES PARTICULIÈRES)",
    passage: [
      "Clause 1 — Dépôt de garantie : 900€ (un mois de loyer hors charges).",
      "Clause 2 — Charges locatives : Provision sur charges : 80€/mois. Régularisation annuelle sur justificatifs.",
      "Clause 3 — Interdiction des animaux : Autorisés : animaux de petite taille (rongeurs, poissons, oiseaux). Interdits : chiens de catégorie 1 ou 2 (chiens d'attaque et de défense).",
      "Clause 4 — Travaux : Le locataire ne peut réaliser aucun travail sans l'accord écrit du bailleur.",
      "Clause 5 — Sous-location : Formellement interdite, même avec autorisation préalable.",
      "Clause 6 — Dépannage d'urgence : En cas de fuite d'eau ou de panne d'électricité, composez le 01 23 45 67 89 (service 24h/24). Les frais sont à la charge du bailleur sauf si le sinistre est dû à une négligence du locataire.",
    ],
    questions: [
      {
        id: 32,
        prompt: "Un locataire peut-il avoir un hamster ?",
        options: {
          A: "Oui, les petits animaux sont autorisés",
          B: "Non, tous les animaux sont interdits",
          C: "Uniquement avec autorisation écrite",
          D: "Oui, moyennant un supplément",
        },
        answer: "A",
      },
      {
        id: 33,
        prompt: "En cas de fuite d'eau un dimanche à 3h du matin, que faire ?",
        options: {
          A: "Attendre le lendemain pour appeler le propriétaire",
          B: "Contacter le service d'urgence 24h/24",
          C: "Faire intervenir un plombier à ses frais",
          D: "Rien, car c'est un jour férié",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 15",
    title: "CATALOGUE DE FORMATION 2024 — AFPA",
    passage: [
      "FORMATION 1 : Devenir soudeur industriel — Durée : 6 mois (840h), stage : 3 mois en entreprise. Prérequis : aucun diplôme, mais savoir lire et compter. Débouchés : industrie automobile, naval, nucléaire. Salaire débutant : 1 800€ — 2 200€ brut.",
      "FORMATION 2 : Responsable de secteur commerce — Durée : 12 mois (1 400h), Bac+2 visé. Prérequis : niveau bac, expérience commerciale souhaitée. Débouchés : chef de rayon, manager de boutique. Alternance possible (2 jours école / 3 jours entreprise).",
      "FORMATION 3 : Développeur web full stack — Durée : 8 mois (formation intensive), titre RNCP niveau 6 (Bac+3). Prérequis : logique et goût pour l'informatique, test d'entrée. Langages : HTML, CSS, JavaScript, PHP, SQL. 100% en ligne, rythme libre.",
      "FORMATION 4 : Auxiliaire de puériculture — Durée : 10 mois (dont 4 mois de stage). Prérequis : avoir 18 ans minimum, entretien de motivation. Conditions : casier judiciaire vierge (obligatoire pour travailler avec enfants). Débouchés : crèche, hôpital, école maternelle, halte-garderie.",
    ],
    questions: [
      {
        id: 34,
        prompt: "Quelle formation est compatible avec un emploi à temps partiel (car rythme libre) ?",
        options: {
          A: "Formation 1 (soudeur)",
          B: "Formation 2 (commerce)",
          C: "Formation 3 (développeur web)",
          D: "Formation 4 (puériculture)",
        },
        answer: "C",
      },
      {
        id: 35,
        prompt: "Pour devenir auxiliaire de puériculture, quelle condition spécifique doit être remplie ?",
        options: {
          A: "Avoir un baccalauréat",
          B: "Justifier de 3 ans d'expérience",
          C: "Présenter un extrait de casier judiciaire vierge",
          D: "Avoir moins de 30 ans",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 16",
    title: "NOTICE D'INFORMATION — ANTIBIOTIQUES",
    passage: [
      "Veuillez lire attentivement cette notice avant de prendre ce médicament. Elle contient des informations importantes pour votre traitement.",
      "QU'EST-CE QUE L'AMOXICILLINE ET DANS QUEL CAS EST-ELLE UTILISÉE ?",
      "L'amoxicilline est un antibiotique de la famille des pénicillines. Elle est utilisée pour traiter les infections bactériennes : angine, otite, sinusite, pneumonie, infection urinaire, infection dentaire.",
      "QUAND NE PAS PRENDRE CE MÉDICAMENT ?",
      "Si vous êtes allergique aux pénicillines ; si vous avez déjà eu une réaction grave à un antibiotique ; en cas de mononucléose infectieuse (risque d'éruption cutanée sévère) ; chez l'enfant de moins de 6 ans (forme à adapter).",
      "COMMENT PRENDRE CE MÉDICAMENT ?",
      "La posologie habituelle chez l'adulte est de 1 g trois fois par jour, pendant 7 jours. À prendre de préférence au début du repas pour éviter les nausées. Il est impératif de terminer le traitement, même si les symptômes disparaissent avant la fin. L'arrêt prématuré peut entraîner une reprise de l'infection et favoriser l'apparition de bactéries résistantes.",
      "EFFETS INDÉSIRABLES POSSIBLES — Fréquents : diarrhées, nausées, éruptions cutanées. Rares : candidose (mycose), colite. Très rares : choc anaphylactique (urgence médicale).",
      "Si vous présentez une respiration sifflante, un gonflement du visage ou de la gorge, appelez immédiatement le 15.",
    ],
    questions: [
      {
        id: 36,
        prompt: "L'amoxicilline est contre-indiquée en cas d'allergie à :",
        options: {
          A: "L'aspirine",
          B: "Les pénicillines",
          C: "Le paracétamol",
          D: "Les antihistaminiques",
        },
        answer: "B",
      },
      {
        id: 37,
        prompt: "Que risque-t-on si on arrête le traitement trop tôt ?",
        options: {
          A: "Une accoutumance au médicament",
          B: "Des nausées plus sévères",
          C: "Une reprise de l'infection et des bactéries résistantes",
          D: "Une hospitalisation immédiate",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 17",
    title: "LETTRE DE RÉSILIATION — ABONNEMENT SALLE DE SPORT",
    passage: [
      "Objet : Résiliation de contrat — adhésion n° 4587921.",
      "Madame, Monsieur,",
      "Par la présente, je souhaite résilier mon abonnement à votre salle de sport « Fitness Plus », conformément aux conditions générales de vente.",
      "Motif : déménagement dans une autre région (voir justificatif ci-joint). Conformément à l'article 5 de mon contrat, un déménagement supérieur à 50 km de l'établissement le plus proche permet une résiliation sans frais, sous réserve d'un préavis de 15 jours.",
      "Je vous remercie de bien vouloir procéder à l'arrêt des prélèvements automatiques à compter du 1er du mois prochain et de me confirmer par écrit la prise en compte de ma demande.",
      "Je vous prie de trouver ci-joint : copie de mon contrat d'abonnement, justificatif de domicile (nouvelle adresse), relevé d'identité bancaire pour le remboursement des sommes indûment prélevées.",
      "Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
      "Marie DUPONT",
    ],
    questions: [
      {
        id: 38,
        prompt: "Quel document n'est PAS demandé par Marie dans son courrier ?",
        options: {
          A: "Une copie du contrat d'abonnement",
          B: "Un certificat de radiation fiscale",
          C: "Un justificatif de nouvelle adresse",
          D: "Un RIB pour remboursement",
        },
        answer: "B",
      },
      {
        id: 39,
        prompt: "La résiliation sans frais est possible car :",
        options: {
          A: "Marie n'a plus d'argent",
          B: "La salle de sport a fermé temporairement",
          C: "Marie a déménagé loin de la salle de sport",
          D: "Marie n'est pas satisfaite des services",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 18",
    title: "GUIDE PRATIQUE — DROITS DES LOCATAIRES",
    passage: [
      "L'ÉTAT DES LIEUX D'ENTRÉE — L'état des lieux d'entrée est un document obligatoire qui décrit précisément l'état du logement au moment où le locataire prend possession des clés. Il doit être réalisé contradictoirement (en présence du propriétaire ET du locataire). Chaque pièce est inspectée : murs (fissures, traces d'humidité), sols (parquet qui grince, moquette tâchée), plomberie (fuites, pression), électricité (prises qui fonctionnent), menuiseries (fenêtres qui ferment correctement).",
      "CONSÉQUENCES EN CAS D'ABSENCE D'ÉTAT DES LIEUX — Si aucun état des lieux n'est réalisé à l'entrée, la loi considère que le logement a été remis en parfait état. En conséquence, le propriétaire ne pourra retenir aucune somme sur le dépôt de garantie pour des dégâts constatés à la sortie, faute de pouvoir prouver qu'ils n'existaient pas à l'entrée. Cette situation est très défavorable au bailleur.",
      "L'ÉTAT DES LIEUX DE SORTIE — Il se déroule de la même manière que l'état des lieux d'entrée, à la différence qu'il compare l'état actuel du logement avec l'état initial. Seules les différences entre les deux états des lieux peuvent justifier une retenue sur le dépôt de garantie. La vétusté (usure normale due au temps et à l'usage) ne peut pas être facturée au locataire.",
    ],
    questions: [
      {
        id: 40,
        prompt: "Si aucun état des lieux d'entrée n'est fait, que dit la loi ?",
        options: {
          A: "Le propriétaire peut garder le dépôt de garantie",
          B: "Le logement est considéré comme donné en parfait état",
          C: "Le locataire doit en réaliser un lui-même",
          D: "Le contrat de location est automatiquement nul",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 19",
    title: "BROCHURE MÉDICALE — DÉPISTAGE DU CANCER COLORECTAL",
    passage: [
      "Chaque année en France, le cancer colorectal est diagnostiqué chez plus de 43 000 personnes. S'il est détecté tôt, 9 cas sur 10 peuvent être guéris. Pourtant, 35% des personnes invitées ne réalisent pas le test de dépistage.",
      "QUI EST CONCERNÉ ? Le dépistage organisé s'adresse aux hommes et aux femmes âgés de 50 à 74 ans, sans symptômes et sans facteur de risque particulier. Tous les deux ans, ils reçoivent un courrier de l'Assurance Maladie les invitant à retirer gratuitement un test chez leur médecin traitant ou en pharmacie.",
      "COMMENT SE DÉROULE LE TEST ? Le test immunologique (OC Sensor) est simple et indolore. Il consiste à prélever un tout petit échantillon de selles à l'aide d'un bâtonnet, directement dans les toilettes. L'échantillon est placé dans un tube, puis envoyé par la poste dans un laboratoire d'analyse. Les résultats sont transmis au médecin sous 48 à 72 heures.",
      "QUE SIGNIFIENT LES RÉSULTATS ? Test négatif (97% des cas) : aucun signe de saignement détecté. Le dépistage est renouvelé dans 2 ans. Test positif (3% des cas) : présence de sang dans les selles. Cela ne signifie PAS nécessairement un cancer (peut être un polype bénin, une hémorroïde, une maladie inflammatoire). Une coloscopie est alors prescrite pour identifier la cause exacte.",
    ],
    questions: [
      {
        id: 41,
        prompt: "À quelle fréquence faut-il faire ce test de dépistage ?",
        options: {
          A: "Tous les ans",
          B: "Tous les 2 ans",
          C: "Tous les 5 ans",
          D: "Une fois dans sa vie",
        },
        answer: "B",
      },
      {
        id: 42,
        prompt: "En cas de test positif, la procédure recommandée est :",
        options: {
          A: "Attendre 2 ans pour refaire le test",
          B: "Ne rien faire car c'est probablement bénin",
          C: "Faire une coloscopie pour identifier la cause",
          D: "Prendre des antibiotiques immédiatement",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 20",
    title: "NOTICE DE MONTAGE — BIBLIOTHÈQUE 5 ÉTAGÈRES",
    passage: [
      "Pièces fournies : 2 montants latéraux (M1 et M2), 5 étagères (E1 à E5), 1 traverse arrière (T), 20 vis courtes (VC) pour étagères, 4 vis longues (VL) pour traverse, chevilles murales + vis (option antidéversement).",
      "Outils nécessaires (non fournis) : tournevis cruciforme (PH2), mètre, niveau à bulle, perceuse si fixation murale.",
      "ÉTAPE 1 — Assemblage des montants : positionnez les deux montants au sol, face intérieure vers le haut. Les trous de fixation doivent être orientés vers l'intérieur.",
      "ÉTAPE 2 — Fixation de la traverse arrière : insérez la traverse (T) entre les deux montants, à 5 cm du bord supérieur. Vérifiez l'équerrage (90°). Vissez les 4 vis longues (VL) sans les serrer complètement.",
      "ÉTAPE 3 — Pose des étagères : les étagères sont identiques, leur position est libre (hauteur réglable tous les 5 cm). Insérez chaque étagère dans les rainures des montants, puis fixez avec 4 vis courtes (VC) par étagère (2 à gauche, 2 à droite).",
      "ÉTAPE 4 — Serrage final et mise à niveau : placez la bibliothèque debout. À l'aide du niveau à bulle, vérifiez l'aplomb. Une fois la bibliothèque droite, serrez fermement toutes les vis.",
      "IMPORTANT — Sécurité antidéversement : Cette bibliothèque est haute (180 cm). Pour éviter tout risque de basculement, surtout si vous avez de jeunes enfants, fixez-la au mur à l'aide des chevilles fournies.",
    ],
    questions: [
      {
        id: 43,
        prompt: "Combien de vis courtes faut-il pour fixer TOUTES les étagères ?",
        options: { A: "4 vis", B: "16 vis", C: "20 vis", D: "25 vis" },
        answer: "C",
      },
      {
        id: 44,
        prompt: "La fixation murale est recommandée par le fabricant car :",
        options: {
          A: "La bibliothèque risque de se déformer",
          B: "La bibliothèque est lourde et haute, dangereuse pour les enfants",
          C: "Le bois peut se fissurer sans fixation",
          D: "Les vis fournies sont en surplus",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 21",
    title: "INFORMATION VOYAGEURS — SNCF",
    passage: [
      "Ligne Paris-Lyon (TGV) — Mise à jour du 15 mars, 8h15.",
      "Suite à un mouvement social local, le trafic est perturbé sur l'ensemble de la ligne. Horaires modifiés :",
      "- TGV 6113 Paris-Lyon : prévu 8h00 → modifié 8h45 (Retard 45 min)",
      "- TGV 6117 Paris-Lyon : prévu 9h00 → MAINTENU (À l'heure)",
      "- TGV 6121 Paris-Lyon : prévu 10h00 → modifié 11h15 (Retard 1h15)",
      "- TGV 6125 Paris-Lyon : prévu 11h00 → SUPPRIMÉ (Report au 12h00)",
      "Mesures commerciales : Tous les billets pour les trains de ce matin sont échangeables et remboursables sans frais jusqu'à 23h59 ce soir. Les voyageurs des trains supprimés seront automatiquement reportés sur le train suivant. Une collation sera offerte à bord des trains retardés de plus d'une heure.",
    ],
    questions: [
      {
        id: 45,
        prompt: "Un passager du TGV 6117 (9h00) doit-il s'inquiéter ?",
        options: {
          A: "Oui, son train a 45 minutes de retard",
          B: "Oui, son train a été supprimé",
          C: "Non, son train est à l'heure",
          D: "Non, mais il sera reporté sur le suivant",
        },
        answer: "C",
      },
    ],
  },
];

export const READING_TEST_4_ALL_QUESTIONS = readingTest4.flatMap((s) => s.questions);