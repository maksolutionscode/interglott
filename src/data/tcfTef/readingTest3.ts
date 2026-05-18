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

export const READING_TEST_3_DURATION_MIN = 30;

export const readingTest3: TestSection[] = [
  {
    heading: "Documents divers",
    label: "Texte 1",
    title: "PISCINE MUNICIPALE — HORAIRES DES VACANCES",
    passage: [
      "Du 15 juillet au 31 août :",
      "Lundi – vendredi : 10h – 19h",
      "Samedi – dimanche : 9h – 20h",
      "Fermeture le 14 juillet (fête nationale)",
    ],
    questions: [
      {
        id: 1,
        prompt: "La piscine est fermée :",
        options: {
          A: "Tous les dimanches",
          B: "Le 14 juillet",
          C: "Le 31 août",
          D: "Le samedi matin",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 2",
    title: "OFFRE D'EMPLOI",
    passage: [
      "Serveur/Serveuse pour restaurant gastronomique",
      "CDI 35 h/semaine",
      "Soir et week-end",
      "2 ans d'expérience minimum",
      "Anglais courant requis",
      "Candidature : cv@lebistrot.ca",
    ],
    questions: [
      {
        id: 2,
        prompt: "Cette annonce concerne :",
        options: {
          A: "Un poste en cuisine",
          B: "Un emploi dans la restauration",
          C: "Une formation en hôtellerie",
          D: "Un stage rémunéré",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 3",
    title: "FORTES CHALEURS — RECOMMANDATIONS",
    passage: [
      "Météo France déclenche la vigilance orange canicule. Recommandations :",
      "Buvez de l'eau régulièrement",
      "Fermez les volets la journée",
      "Évitez les activités physiques entre 12h et 16h",
      "Prenez des nouvelles des personnes âgées",
    ],
    questions: [
      {
        id: 3,
        prompt: "Ce document :",
        options: {
          A: "Annonce des orages",
          B: "Donne des conseils pour la chaleur",
          C: "Interdit de sortir",
          D: "Informe sur la pollution",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 4",
    title: "ÉGLISE SAINT MARTIN",
    passage: [
      "Visites guidées gratuites tous les samedis à 15h.",
      "Durée : 45 minutes.",
      "Départ : devant le portail principal.",
      "Réservation recommandée à l'office de tourisme.",
    ],
    questions: [
      {
        id: 4,
        prompt: "La visite :",
        options: {
          A: "Est payante",
          B: "A lieu le week-end",
          C: "Dure 1 heure",
          D: "Commence à 14h",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 5",
    title: "COVOITURAGE LYON – PARIS",
    passage: [
      "Départ dimanche 8h00 de Lyon Perrache.",
      "Arrivée prévue vers 12h30 à Paris Bercy.",
      "2 places disponibles.",
      "Participation : 25€/personne.",
      "Bagages : un sac par personne.",
      "Contact : luc.covoit@email.fr",
    ],
    questions: [
      {
        id: 5,
        prompt: "Le conducteur propose :",
        options: {
          A: "Un transport professionnel",
          B: "Un partage de frais pour le trajet",
          C: "Une livraison de colis",
          D: "Une location de voiture",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 6",
    title: "AVIS IMPORTANT",
    passage: [
      "En raison de travaux sur le réseau électrique, l'eau sera coupée dans tout l'immeuble le mercredi 20 mars de 9h à 12h. Merci de votre compréhension.",
    ],
    questions: [
      {
        id: 6,
        prompt: "Ce message annonce :",
        options: {
          A: "Une coupure d'électricité",
          B: "Une coupure d'eau temporaire",
          C: "Des travaux dans les appartements",
          D: "Une augmentation des charges",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 7",
    title: "VENTE DE GARAGE",
    passage: [
      "156 rue des Lilas, Montréal",
      "Samedi 5 octobre de 9h à 16h",
      "Meubles anciens, vêtements, livres, jouets.",
      "Tout doit être vendu !",
      "Stationnement facile dans la rue.",
    ],
    questions: [
      {
        id: 7,
        prompt: "Cette annonce :",
        options: {
          A: "Cherche des bénévoles",
          B: "Vend des objets d'occasion",
          C: "Propose des réparations",
          D: "Donne des meubles gratuitement",
        },
        answer: "B",
      },
    ],
  },

  // Phrases lacunaires
  {
    heading: "Phrases lacunaires",
    label: "Phrase 8",
    passage: ["Les étudiants doivent s'________ à la rentrée avant le 15 septembre."],
    questions: [
      {
        id: 8,
        prompt: "Choisissez le mot qui complète la phrase :",
        options: { A: "inscrire", B: "installer", C: "intéresser", D: "inviter" },
        answer: "A",
      },
    ],
  },
  {
    label: "Phrase 9",
    passage: ["Pour ________ votre colis, veuillez présenter une pièce d'identité."],
    questions: [
      {
        id: 9,
        prompt: "Choisissez le mot qui complète la phrase :",
        options: { A: "envoyer", B: "recevoir", C: "retirer", D: "trouver" },
        answer: "C",
      },
    ],
  },
  {
    label: "Phrase 10",
    passage: ["Le gala de charité a ________ d'énormes fonds pour la recherche médicale."],
    questions: [
      {
        id: 10,
        prompt: "Choisissez le mot qui complète la phrase :",
        options: { A: "collecté", B: "distribué", C: "utilisé", D: "gagné" },
        answer: "A",
      },
    ],
  },
  {
    label: "Phrase 11",
    passage: ["Les billets pour le concert sont ________ depuis hier, dépêchez-vous !"],
    questions: [
      {
        id: 11,
        prompt: "Choisissez le mot qui complète la phrase :",
        options: { A: "valables", B: "gratuits", C: "disponibles", D: "réservés" },
        answer: "C",
      },
    ],
  },
  {
    label: "Phrase 12",
    passage: ["Grâce à son ________, l'association a pu aider plus de 500 familles."],
    questions: [
      {
        id: 12,
        prompt: "Choisissez le mot qui complète la phrase :",
        options: { A: "bénévolat", B: "salaire", C: "achat", D: "voyage" },
        answer: "A",
      },
    ],
  },
  {
    label: "Phrase 13",
    passage: ["Le nouveau pont a été ________ après trois ans de travaux."],
    questions: [
      {
        id: 13,
        prompt: "Choisissez le mot qui complète la phrase :",
        options: { A: "démoli", B: "inauguré", C: "fermé", D: "retardé" },
        answer: "B",
      },
    ],
  },

  // Textes lacunaires
  {
    heading: "Textes lacunaires",
    label: "Texte lacunaire 1",
    passage: [
      "La consommation de plastique à usage unique est un véritable fléau environnemental. Chaque année, plus de 8 millions de tonnes de plastique (14) ______ dans les océans. Les animaux marins ingèrent ces déchets, ce qui cause leur mort. Plusieurs pays ont décidé d' (15) ______ les sacs plastiques et les pailles. D'autres solutions existent, comme les contenants réutilisables.",
    ],
    questions: [
      {
        id: 14,
        prompt: "Question 14 :",
        options: { A: "arrivent", B: "finissent", C: "commencent", D: "restent" },
        answer: "B",
      },
      {
        id: 15,
        prompt: "Question 15 :",
        options: { A: "interdire", B: "autoriser", C: "fabriquer", D: "recycler" },
        answer: "A",
      },
    ],
  },
  {
    label: "Texte lacunaire 2",
    passage: [
      "Le Centre Pompidou, musée d'art moderne à Paris, fête ses 50 ans. Plus de 200 000 œuvres sont (16) ______ dans ses collections. Pour célébrer cet anniversaire, l'établissement propose une exposition exceptionnelle des plus grands artistes du 20ᵉ siècle. Les billets sont en vente en ligne, mais la (17) ______ est très forte. Réservez dès maintenant !",
    ],
    questions: [
      {
        id: 16,
        prompt: "Question 16 :",
        options: { A: "perdues", B: "conservées", C: "vendues", D: "créées" },
        answer: "B",
      },
      {
        id: 17,
        prompt: "Question 17 :",
        options: { A: "demande", B: "offre", C: "construction", D: "réduction" },
        answer: "A",
      },
    ],
  },

  // Lecture rapide de textes
  {
    heading: "Lecture rapide de textes",
    label: "Destinations",
    passage: [
      "Destination A : Séjour en bord de mer avec activités nautiques. Parfait pour les amateurs de sports aquatiques.",
      "Destination B : Week-end culturel dans une capitale européenne. Musées et monuments historiques à visiter.",
      "Destination C : Voyage nature dans une réserve animalière. Observation des espèces protégées.",
      "Destination D : Séjour montagne avec randonnées et baignade dans les lacs d'altitude.",
    ],
    questions: [
      {
        id: 18,
        prompt: "Quelle destination convient à une personne qui veut faire du tourisme culturel ?",
        options: {
          A: "Destination A",
          B: "Destination B",
          C: "Destination C",
          D: "Destination D",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Livres",
    passage: [
      "Livre 1 : Roman policier où un détective enquête sur une disparition mystérieuse.",
      "Livre 2 : Guide pratique pour créer son entreprise : conseils juridiques et financiers.",
      "Livre 3 : Biographie d'un célèbre scientifique qui a changé le monde.",
      "Livre 4 : Recueil de poésie sur les thèmes de l'amour et de la nature.",
    ],
    questions: [
      {
        id: 19,
        prompt: "Quel livre un futur entrepreneur devrait-il lire ?",
        options: { A: "Livre 1", B: "Livre 2", C: "Livre 3", D: "Livre 4" },
        answer: "B",
      },
    ],
  },
  {
    label: "Avis clients — restaurant",
    passage: [
      "Avis 1 : « Service très lent, nous avons attendu 45 minutes pour une entrée. »",
      "Avis 2 : « Plats excellents mais portions un peu petites pour le prix. »",
      "Avis 3 : « Cadre magnifique, parfait pour un dîner en amoureux. »",
      "Avis 4 : « Rapport qualité-prix imbattable pour le déjeuner : 15€ le menu complet. »",
    ],
    questions: [
      {
        id: 20,
        prompt: "Quel avis critique le service ?",
        options: { A: "Avis 1", B: "Avis 2", C: "Avis 3", D: "Avis 4" },
        answer: "A",
      },
    ],
  },
  {
    label: "Offres d'emploi",
    passage: [
      "Offre 1 : Stage en marketing digital, 6 mois, rémunéré selon convention.",
      "Offre 2 : CDI comptable, 5 ans d'expérience, anglais obligatoire.",
      "Offre 3 : Poste d'infirmier en hôpital public, nuit et week-end.",
      "Offre 4 : Apprentissage pâtisserie, CAP requis, débutant accepté.",
    ],
    questions: [
      {
        id: 21,
        prompt: "Quelle offre s'adresse à un étudiant qui cherche une première expérience courte ?",
        options: { A: "Offre 1", B: "Offre 2", C: "Offre 3", D: "Offre 4" },
        answer: "A",
      },
    ],
  },
  {
    label: "Graphique",
    title: "Évolution du nombre de touristes au Canada (2020-2025)",
    passage: [
      "• 2020 : 3,2 millions",
      "• 2021 : 2,8 millions",
      "• 2022 : 5,1 millions",
      "• 2023 : 8,4 millions",
      "• 2024 : 9,2 millions",
      "• 2025 : 10,5 millions (estimation)",
    ],
    questions: [
      {
        id: 22,
        prompt: "Le nombre de touristes a connu :",
        options: {
          A: "Une baisse constante",
          B: "Une augmentation depuis 2022",
          C: "Une stabilité sur 5 ans",
          D: "Son pic en 2020",
        },
        answer: "B",
      },
    ],
  },

  // Documents administratifs et professionnels
  {
    heading: "Documents administratifs et professionnels",
    label: "Document 1",
    title: "Objet : CONVOCATION RÉUNION QUALITÉ",
    passage: [
      "Bonjour à tous,",
      "Je vous prie de trouver ci-joint l'ordre du jour de la réunion qualité qui aura lieu le lundi 12 novembre à 14 h en salle 301.",
      "Plusieurs sujets seront abordés :",
      "• Analyse des non-conformités du mois d'octobre",
      "• Proposition d'actions correctives",
      "• Mise à jour du processus de contrôle",
      "Merci d'apporter vos rapports mensuels.",
      "Cordialement,",
      "Marie Lambert — Responsable Qualité",
    ],
    questions: [
      {
        id: 23,
        prompt: "L'objectif de cette réunion est de :",
        options: {
          A: "Faire un bilan financier",
          B: "Discuter des problèmes de qualité",
          C: "Recruter de nouveaux employés",
          D: "Fêter un événement",
        },
        answer: "B",
      },
      {
        id: 24,
        prompt: "Les participants doivent apporter :",
        options: {
          A: "Leur ordinateur",
          B: "Leurs rapports mensuels",
          C: "Une pièce d'identité",
          D: "Un chéquier",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Document 2",
    title: "RÈGLEMENT DE LA BIBLIOTHÈQUE",
    passage: [
      "Article 3 : Prêt de documents",
      "• La durée de prêt est de 3 semaines",
      "• Renouvellement possible une fois (sauf si réservation)",
      "• Retard : 0,50€ par jour et par document",
      "• Perte ou détérioration : remboursement intégral",
      "Article 5 : Comportement",
      "• Le silence est exigé dans les salles de lecture",
      "• Téléphone éteint",
      "• Nourriture et boissons interdites",
    ],
    questions: [
      {
        id: 25,
        prompt: "Un livre rendu avec 10 jours de retard coûtera :",
        options: { A: "5€", B: "10€", C: "15€", D: "25€" },
        answer: "A",
      },
      {
        id: 26,
        prompt: "Que peut-on faire à la bibliothèque ?",
        options: {
          A: "Manger un sandwich",
          B: "Parler au téléphone",
          C: "Lire en silence",
          D: "Faire une sieste",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Document 3",
    title: "COMMUNIQUÉ : INAUGURATION DU PARC SOLAIRE",
    passage: [
      "La ville de Grenoble inaugurera le 5 mars le plus grand parc solaire urbain de France. Cet équipement, situé sur le toit du centre commercial, produira l'équivalent de la consommation électrique de 5 000 foyers.",
      "L'investissement de 25 millions d'euros a été financé par la région et des fonds européens. La construction a duré 18 mois et a créé 120 emplois locaux.",
      "La cérémonie d'inauguration aura lieu à 10h en présence du maire et des partenaires du projet.",
    ],
    questions: [
      {
        id: 27,
        prompt: "Ce document annonce :",
        options: {
          A: "La fermeture d'une entreprise",
          B: "L'ouverture d'une installation écologique",
          C: "Le lancement d'une enquête publique",
          D: "La construction d'un centre commercial",
        },
        answer: "B",
      },
      {
        id: 28,
        prompt: "Le projet a coûté :",
        options: {
          A: "5 millions d'euros",
          B: "12 millions d'euros",
          C: "25 millions d'euros",
          D: "50 millions d'euros",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Document 4",
    title: "Contrat — CLAUSE 7 : PÉRIODE D'ESSAI",
    passage: [
      "Le présent contrat de travail prévoit une période d'essai d'une durée de 3 mois, renouvelable une fois par accord des deux parties. Pendant cette période, l'employeur comme le salarié peuvent mettre fin au contrat sans indemnité, moyennant un préavis de 48 heures. La période d'essai court à compter du premier jour de travail effectif.",
    ],
    questions: [
      {
        id: 29,
        prompt: "La période d'essai peut durer au maximum :",
        options: { A: "3 mois", B: "4 mois", C: "6 mois", D: "9 mois" },
        answer: "C",
      },
      {
        id: 30,
        prompt: "Pendant la période d'essai :",
        options: {
          A: "Seul l'employeur peut rompre le contrat",
          B: "Aucune indemnité n'est due en cas de rupture",
          C: "Le salarié doit un préavis de 15 jours",
          D: "Le contrat ne peut pas être rompu",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Document 5",
    title: "NOTE DE SERVICE",
    passage: [
      "À tous les employés,",
      "Suite à l'incident survenu lundi dernier, nous vous rappelons les consignes de sécurité incendie :",
      "1. En cas d'alarme, évacuez immédiatement par l'escalier de secours le plus proche.",
      "2. Ne prenez PAS l'ascenseur.",
      "3. Rassemblez-vous au point de ralliement situé sur le parking extérieur.",
      "4. Attendez les consignes des secouristes.",
      "Un exercice d'évacuation aura lieu le 20 de ce mois à 10 h.",
      "La direction",
    ],
    questions: [
      {
        id: 31,
        prompt: "Cette note fait suite à :",
        options: {
          A: "Une panne d'ascenseur",
          B: "Un événement ayant eu lieu",
          C: "Un exercice réussi",
          D: "Une formation obligatoire",
        },
        answer: "B",
      },
      {
        id: 32,
        prompt: "L'exercice d'évacuation aura lieu :",
        options: {
          A: "Lundi prochain",
          B: "À 10h le 20 du mois",
          C: "Après un incident",
          D: "À une heure non précisée",
        },
        answer: "B",
      },
    ],
  },

  // Articles de presse
  {
    heading: "Articles de presse",
    label: "Article 1",
    title: "LE TÉLÉTRAVAIL : UNE RÉVOLUTION DURABLE",
    passage: [
      "Trois ans après la pandémie, le télétravail s'est imposé dans de nombreuses entreprises françaises. Selon une étude récente du ministère du Travail, 35% des salariés travaillent désormais à distance au moins un jour par semaine, contre seulement 5% avant 2020.",
      "Cette transformation profonde bouleverse l'organisation traditionnelle du travail. Les entreprises doivent repenser leurs espaces : réduction des bureaux individuels, développement des salles de réunion collaboratives, installation de technologies de communication performantes.",
      "Les bénéfices sont nombreux pour les salariés : réduction du temps de transport, meilleure conciliation vie professionnelle/vie personnelle, gain d'autonomie. Cependant, des risques émergent. L'isolement social et l'augmentation de la charge de travail sont les principales préoccupations des employés en télétravail.",
      "Face à ces défis, certaines entreprises expérimentent de nouveaux modèles hybrides. Chez Michelin, les équipes choisissent collectivement leurs jours de présence. À la SNCF, le télétravail est limité à deux jours par semaine pour maintenir le lien social.",
      "Les experts prévoient que cette tendance se consolidera dans les années à venir, avec des ajustements selon les secteurs et les cultures d'entreprise.",
    ],
    questions: [
      {
        id: 33,
        prompt: "Depuis la pandémie, le télétravail a :",
        options: {
          A: "Légèrement augmenté",
          B: "Fortement progressé",
          C: "Baissé chez les jeunes",
          D: "Disparu des entreprises",
        },
        answer: "B",
      },
      {
        id: 34,
        prompt: "Selon l'article, un des inconvénients du télétravail est :",
        options: {
          A: "Le coût des équipements",
          B: "L'augmentation des réunions",
          C: "Le risque d'isolement",
          D: "La réduction de productivité",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Article 2",
    title: "BIEN VIEILLIR : LES NOUVEAUX DÉFIS DE NOTRE SOCIÉTÉ",
    passage: [
      "La France compte aujourd'hui 17 millions de personnes de plus de 60 ans, soit un quart de sa population. D'ici 2035, ce chiffre devrait atteindre 20 millions. Cette réalité démographique impose de repenser notre modèle de société.",
      "Les pouvoirs publics multiplient les initiatives : développement des résidences autonomie, adaptation des logements, aide au maintien à domicile. Mais face à l'ampleur des besoins, les solutions restent insuffisantes. Les listes d'attente dans les EHPAD s'allongent, et le coût des services à domicile reste élevé pour de nombreux retraités.",
      "Parallèlement, des initiatives privées émergent. Des applications mettent en relation seniors et jeunes pour du covoiturage, de l'aide administrative ou des visites amicales. Le « babysitting inversé » se développe : des étudiants logent gratuitement chez des personnes âgées en échange de présence et de petits services.",
      "Le bénévolat joue également un rôle crucial. Selon la Fédération des associations de retraités, plus de 500 000 bénévoles interviennent auprès des personnes âgées isolées. Pour ces derniers, ces activités apportent du sens à leur retraite et maintiennent des liens sociaux.",
      "L'enjeu est majeur : permettre aux aînés de vieillir dignement tout en créant du lien entre générations. Une transformation profonde de notre société qui concerne chacun d'entre nous.",
    ],
    questions: [
      {
        id: 35,
        prompt: "D'ici 2035, le nombre de personnes de plus de 60 ans :",
        options: {
          A: "Diminuera",
          B: "Restera stable",
          C: "Augmentera",
          D: "Sera impossible à prévoir",
        },
        answer: "C",
      },
      {
        id: 36,
        prompt: "Le « babysitting inversé » consiste pour des étudiants à :",
        options: {
          A: "Garder des enfants",
          B: "Loger chez des seniors gratuitement",
          C: "Donner des cours aux retraités",
          D: "Travailler en EHPAD",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Article 3",
    title: "LE ZÉRO DÉCHET : MODE PASSAGÈRE OU CHANGEMENT PROFOND ?",
    passage: [
      "Les magasins en vrac se multiplient en France. On en compte désormais plus de 2 000, soit une augmentation de 50% en deux ans. Derrière ce phénomène commercial se dessine une véritable révolution des modes de consommation.",
      "Les consommateurs adeptes du « zéro déchet » ne se contentent plus d'acheter en vrac. Ils transforment leurs habitudes : troc de vêtements, réparation d'objets, fabrication de produits ménagers maison, compostage des déchets organiques. Un mode de vie plus contraignant, certes, mais perçu comme plus cohérent.",
      "Cependant, des critiques émergent. Dans un essai récent, la sociologue Claire Martin dénonce « l'élitisme écologique ». Selon elle, cette consommation responsable suppose du temps, de l'argent et un certain capital culturel. « Quand on cumule deux emplois précaires, on n'a pas le loisir de chercher un magasin en vrac ou de fabriquer sa lessive », explique-t-elle.",
      "La question se pose donc : le zéro déchet est-il réservé à une minorité aisée ? Pour y répondre, des associations militent pour une écologie populaire. À Marseille, le réseau « écologie pour tous » organise des ateliers gratuits et des repair cafés dans les quartiers défavorisés.",
      "L'avenir du mouvement dépendra de sa capacité à s'adresser à tous, au-delà des cercles déjà convaincus. Les pouvoirs publics ont un rôle à jouer : soutenir financièrement ces initiatives, légiférer contre l'obsolescence programmée, rendre le recyclable accessible à tous les budgets.",
    ],
    questions: [
      {
        id: 37,
        prompt: "Le nombre de magasins en vrac en France :",
        options: {
          A: "A diminué",
          B: "Est resté stable",
          C: "A beaucoup augmenté",
          D: "Est impossible à évaluer",
        },
        answer: "C",
      },
      {
        id: 38,
        prompt: "Selon Claire Martin, la consommation responsable zéro déchet :",
        options: {
          A: "Est accessible à tous",
          B: "Nécessite des privilèges financiers et culturels",
          C: "Ne demande aucun effort",
          D: "Est une mode sans avenir",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Article 4",
    title: "LE DROIT À LA DÉCONNEXION : BILAN D'UNE MESURE",
    passage: [
      "Cela fait maintenant 5 ans que la loi sur le droit à la déconnexion a été adoptée en France. Ce texte impose aux entreprises de plus de 50 salariés de définir les modalités d'usage des outils numériques en dehors des heures de travail.",
      "Quel bilan tirer de cette mesure ? Selon un rapport récent de l'inspection du travail, 85% des entreprises concernées ont effectivement mis en place une charte. Les résultats sont encourageants : 35% des salariés déclarent recevoir moins d'e-mails en soirée, et 40% ont l'impression de mieux déconnecter.",
      "Pourtant, tout n'est pas rose. Dans 20% des entreprises, la charte est purement formelle et n'est pas respectée. Les cadres, et particulièrement les jeunes cadres, restent très connectés. La pression hiérarchique informelle, la culture du résultat immédiat et l'hyperconcurrence annulent parfois les bonnes intentions.",
      "Les syndicats demandent aujourd'hui un durcissement de la loi. Ils proposent notamment la mise en place d'« amendes dissuasives » pour les entreprises qui ne respectent pas l'esprit du texte. Certains réclament également l'extension de la loi aux plus petites structures, les plus touchées par le phénomène.",
      "Alors que le télétravail se généralise, la frontière entre vie privée et professionnelle s'estompe. Le droit à la déconnexion reste plus que jamais un enjeu de santé publique, comme le rappellent les études sur le burn-out et le surmenage.",
    ],
    questions: [
      {
        id: 39,
        prompt: "Selon le rapport, la loi sur le droit à la déconnexion :",
        options: {
          A: "Est un échec complet",
          B: "Montre des résultats positifs mais insuffisants",
          C: "Ne concerne plus les entreprises",
          D: "A été supprimée par le gouvernement",
        },
        answer: "B",
      },
      {
        id: 40,
        prompt: "Les syndicats demandent désormais :",
        options: {
          A: "La suppression de la loi",
          B: "Des amendes pour les entreprises non conformes",
          C: "Moins de régulations",
          D: "L'interdiction des emails professionnels",
        },
        answer: "B",
      },
    ],
  },
];

export const READING_TEST_3_ALL_QUESTIONS = readingTest3.flatMap((s) => s.questions);
