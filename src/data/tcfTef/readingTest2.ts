import type { Choice, TestSection } from "./readingTest1";
export type { Choice, TestSection } from "./readingTest1";

export const READING_TEST_2_DURATION_MIN = 30;

export const readingTest2: TestSection[] = [
  // ===== Documents divers =====
  {
    heading: "Documents divers",
    label: "Texte 1",
    title: "À la « Cabane à sucre »",
    passage: [
      "Nouveau restaurant dans votre quartier, La Cabane à Sucre.",
      "Notre équipe professionnelle vous accueille tous les jours de 12h00 à 22h00.",
      "Poutine, fèves au lard, queues de castor … dégustez les spécialités canadiennes.",
      "Sur place, à emporter, ou en livraison.",
      "-10% lors de votre première visite",
    ],
    questions: [
      {
        id: 1,
        prompt: "Ce document est :",
        options: {
          A: "un menu de restaurant",
          B: "une publicité",
          C: "une offre d’emploi",
          D: "un courrier administratif",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 2",
    title: "Restaurant Le Castor d’érable",
    passage: [
      "Nous cherchons un nouveau chef de cuisine pour notre restaurant à Toronto.",
      "Horaires : du lundi au vendredi, de 10h à 15h",
      "Salaire : à négocier",
      "Contactez-nous au : 514-123-4567",
      "Email : lecastorderable@email.ca",
    ],
    questions: [
      {
        id: 2,
        prompt: "Cette annonce concerne :",
        options: {
          A: "une offre promotionnelle",
          B: "l’ouverture d’un nouveau restaurant",
          C: "un poste de travail",
          D: "une formation de cuisinier",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 3",
    title: "Information importante",
    passage: [
      "Bonjour,",
      "Nous vous informons qu’il y a une épidémie de grippe à l’école maternelle.",
      "Plusieurs enfants sont malades. Pour la santé de tous, nous vous demandons de garder votre enfant à la maison s’il est malade (fièvre, toux, fatigue).",
      "Merci de votre compréhension.",
      "Cordialement,",
      "La direction",
    ],
    questions: [
      {
        id: 3,
        prompt: "Le document :",
        options: {
          A: "concerne les professeurs de l’école",
          B: "annonce la fermeture de l’école",
          C: "s’adresse aux parents",
          D: "s’adresse aux élèves de l’école",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 4",
    passage: [
      "Chers collègues,",
      "Le nouveau logiciel est en place depuis plusieurs semaines et a changé nos habitudes de travail. Je pense qu’il est important que nous nous rencontrions pour échanger sur son utilisation optimale et sur les problèmes rencontrés.",
    ],
    questions: [
      {
        id: 4,
        prompt: "Ce message :",
        options: {
          A: "critique le nouveau logiciel",
          B: "annonce la mise en place d’un nouveau logiciel",
          C: "demande un changement de logiciel",
          D: "propose de collaborer",
        },
        answer: "D",
      },
    ],
  },
  {
    label: "Texte 5",
    title: "Salon de l’expatriation au Québec",
    passage: [
      "Vous souhaitez vous installer au Québec pour travailler ou étudier ?",
      "Participez à notre salon de l’expatriation !",
      "Lieu : Centre des congrès",
      "Date : Samedi 15 juin",
      "Horaires : de 10h à 17h",
      "Au programme :",
      "• Conférences sur la vie au Québec",
      "• Conseils pour trouver un logement et un emploi",
      "• Rencontres avec des professionnels de l’immigration",
      "Entrée gratuite sur inscription.",
    ],
    questions: [
      {
        id: 5,
        prompt: "Au salon vous pouvez :",
        options: {
          A: "regarder des films sur la vie au Québec",
          B: "obtenir des informations pour changer de pays",
          C: "prendre des cours de langues",
          D: "découvrir des universités",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 6",
    passage: [
      "Venez aux portes ouvertes de votre nouvelle salle de sport du quartier !",
      "Venez découvrir notre espace dédié à la remise en forme et au bien-être en bas de chez vous.",
      "Pour notre ouverture, venez profiter d’une séance d’essai gratuite, rencontrer nos coachs professionnels et découvrir nos équipements modernes.",
      "Au programme : démonstrations, conseils personnalisés et offres spéciales pour les nouveaux membres.",
      "N’hésitez pas à venir seul(e) ou accompagné(e) ! Nous serons ravis de vous accueillir et de répondre à toutes vos questions.",
    ],
    questions: [
      {
        id: 6,
        prompt: "L’annonce propose :",
        options: {
          A: "une offre promotionnelle si on s’inscrit à deux ou plus",
          B: "des cours de sports en ligne gratuits",
          C: "des séances sportives à domicile",
          D: "des tarifs réduits pour les nouvelles inscriptions",
        },
        answer: "D",
      },
    ],
  },
  {
    label: "Texte 7",
    title: "« On plante ICI »",
    passage: [
      "La Ville de Trois-Rivières invite les entreprises à participer à son programme de plantation d’arbres. L’objectif est de verdir les zones urbaines et de créer des espaces plus frais.",
      "Chaque établissement peut recevoir jusqu’à 5 arbres parmi plusieurs espèces. Le programme est gratuit et comprend la plantation ainsi que l’entretien pendant 3 ans.",
      "Les inscriptions sont ouvertes jusqu’à la fin du mois.",
      "Les places sont limitées (premier arrivé, premier servi).",
      "Conditions : l’établissement doit être situé en zone urbaine et disposer d’un espace végétalisé adapté.",
    ],
    source: "source : v3r.net",
    questions: [
      {
        id: 7,
        prompt: "Selon le document, ce programme est destiné :",
        options: {
          A: "aux services de la ville en charge des espaces verts",
          B: "aux jardiniers professionnels",
          C: "à développer les espaces verts dans la ville",
          D: "encourager les établissements à mieux entretenir leurs espaces verts",
        },
        answer: "C",
      },
    ],
  },
  // ===== Les phrases lacunaires =====
  {
    heading: "Les phrases lacunaires",
    label: "Phrase 1",
    passage: ["Au ………………… de la rue, se trouve l’église St-Eustache."],
    questions: [
      {
        id: 8,
        prompt: "Choisissez le mot qui convient :",
        options: { A: "dessus", B: "dessous", C: "bout", D: "dedans" },
        answer: "C",
      },
    ],
  },
  {
    label: "Phrase 2",
    passage: [
      "La fondue au fromage est un plat d’hiver ………………… de la région de Haute-Savoie.",
    ],
    questions: [
      {
        id: 9,
        prompt: "Choisissez le mot qui convient :",
        options: { A: "typique", B: "habituel", C: "ancien", D: "national" },
        answer: "A",
      },
    ],
  },
  {
    label: "Phrase 3",
    passage: [
      "Les étudiants peuvent recevoir ………………… d’études pour financer leurs études à l’étranger.",
    ],
    questions: [
      {
        id: 10,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "un salaire",
          B: "une bourse",
          C: "une réduction",
          D: "un avantage",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Phrase 4",
    passage: [
      "Le minimalisme est un concept qui met ………………… sur la simplicité, la conscience et la qualité plutôt que sur la quantité.",
    ],
    source: "source : minimaliste.green",
    questions: [
      {
        id: 11,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "le principe",
          B: "l’encouragement",
          C: "l’idée",
          D: "l’accent",
        },
        answer: "D",
      },
    ],
  },
  {
    label: "Phrase 5",
    passage: [
      "Réduire le déficit national à 3% du PIB, telle était ………………… du président lors de son nouveau mandat.",
    ],
    questions: [
      {
        id: 12,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "la passion",
          B: "le travail",
          C: "l’ambition",
          D: "la persévérance",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Phrase 6",
    passage: [
      "Les experts ont été unanimes et ont ………………… les avancées fondamentales que cette découverte va apporter dans la recherche contre le cancer.",
    ],
    questions: [
      {
        id: 13,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "saboté",
          B: "salué",
          C: "précisé",
          D: "débattu",
        },
        answer: "B",
      },
    ],
  },
  // ===== Les textes lacunaires =====
  {
    heading: "Les textes lacunaires",
    label: "Texte 8",
    passage: [
      "Les centres de données, essentiels dans la course à l'IA, sont passés de 200 à 350 sur tout le territoire français depuis 2020. Et ………………… (1) pourrait s'accélérer dans les mois à venir. Depuis le 15 avril dernier, une loi de simplification les a rendus ………………… (2) au statut de projet d'intérêt national majeur. Ce texte doit permettre, concrètement, d'accélérer leur déploiement en simplifiant la compatibilité des documents d'urbanisme, le raccordement au réseau électrique et la reconnaissance de raisons impératives d'intérêt public majeur.",
    ],
    source: "source : Les Echos",
    questions: [
      {
        id: 14,
        prompt: "Choisissez la suite qui convient pour (1) :",
        options: {
          A: "ce déploiement",
          B: "ce projet",
          C: "cette évolution",
          D: "ce progrès",
        },
        answer: "C",
      },
      {
        id: 15,
        prompt: "Choisissez la suite qui convient pour (2) :",
        options: {
          A: "bannis",
          B: "potentiels",
          C: "contraires",
          D: "éligibles",
        },
        answer: "D",
      },
    ],
  },
  {
    label: "Texte 9",
    passage: [
      "L'arrivée des véhicules autonomes dans ………………… (1) a longtemps ressemblé à une promesse plus qu'à une réalité. En Europe, les expérimentations se sont succédé sans jamais aboutir à un service payant pour le grand public. Le lancement des robotaxis à Zagreb change ………………… (2) pour l'ensemble du secteur.",
    ],
    source: "source : Science et Vie",
    questions: [
      {
        id: 16,
        prompt: "Choisissez la suite qui convient pour (1) :",
        options: {
          A: "l’environnement",
          B: "la ville",
          C: "l’espace public",
          D: "les habitudes",
        },
        answer: "C",
      },
      {
        id: 17,
        prompt: "Choisissez la suite qui convient pour (2) :",
        options: {
          A: "la donne",
          B: "les fluctuations",
          C: "les prévisions",
          D: "les perceptions",
        },
        answer: "A",
      },
    ],
  },
  // ===== Pétitions =====
  {
    heading: "Comparaison de pétitions",
    label: "Pétitions 1 à 4",
    passage: [
      "Pétition 1 : Nous demandons aux supermarchés de mieux gérer les produits proches de leur date limite. Chaque jour, de nombreux produits encore consommables sont jetés alors qu'ils pourraient être donnés à des associations ou vendus à prix réduit. Nous proposons que les magasins développent davantage de partenariats avec des organisations locales afin d'éviter ces pertes et d'aider les personnes dans le besoin.",
      "Pétition 2 : Nous demandons aux grandes entreprises de réduire l'utilisation des emballages en plastique pour leurs produits. Aujourd'hui, beaucoup d'articles sont entourés de plusieurs couches d'emballage inutiles. Cette situation crée une grande quantité de déchets. Nous encourageons les entreprises à utiliser des matériaux recyclables et à proposer des solutions plus écologiques.",
      "Pétition 3 : Nous exigeons des magasins de vêtements de promouvoir une consommation plus responsable. La production de vêtements augmente chaque année et beaucoup de produits sont portés seulement quelques fois avant d'être jetés. Les marques pourraient proposer des programmes de recyclage et encourager les clients à acheter moins mais de meilleure qualité et ainsi éviter le gaspillage des ressources.",
      "Pétition 4 : Il est primordial que les fabricants d'appareils électroniques facilitent la réparation de leurs produits. Trop souvent, lorsqu'un téléphone ou un appareil tombe en panne, il est difficile ou très coûteux de remplacer une petite pièce. Les entreprises devraient proposer des pièces accessibles et des guides simples pour prolonger la durée de vie des appareils.",
    ],
    questions: [
      {
        id: 18,
        prompt: "Quelle pétition met en lumière les problèmes de gaspillage alimentaire ?",
        options: {
          A: "Pétition 1",
          B: "Pétition 2",
          C: "Pétition 3",
          D: "Pétition 4",
        },
        answer: "A",
      },
    ],
  },
];

export const READING_TEST_2_ALL_QUESTIONS = readingTest2.flatMap((s) => s.questions);

// Re-export the Choice type usage for the page
export type _Choice = Choice;
export type _TestSection = TestSection;