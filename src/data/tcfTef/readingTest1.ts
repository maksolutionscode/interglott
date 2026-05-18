export type Choice = "A" | "B" | "C" | "D";

export interface TestQuestion {
  id: number;
  prompt: string;
  options: Record<Choice, string>;
  answer: Choice;
}

export interface TestSection {
  /** Optional section heading (e.g. "Les phrases lacunaires"). */
  heading?: string;
  /** Label shown above the passage card (e.g. "Texte 1"). */
  label: string;
  /** Optional sub-title for the passage. */
  title?: string;
  /** Passage paragraphs / bullet lines. */
  passage: string[];
  /** Optional source caption. */
  source?: string;
  questions: TestQuestion[];
}

export const READING_TEST_1_DURATION_MIN = 30;

export const readingTest1: TestSection[] = [
  // Texte 1 — Q1
  {
    label: "Texte 1",
    passage: [
      "Rendez-vous à la fête des voisins samedi 13 avril",
      "Partagez un moment festif avec vos voisins.",
      "Apportez un plat ou une boisson à partager.",
      "Au programme : jeux de carte, danse et Karaoké",
    ],
    questions: [
      {
        id: 1,
        prompt: "À la fête des voisins vous pourrez :",
        options: {
          A: "cuisiner avec vos voisins",
          B: "partager un repas",
          C: "faire le ménage dans le bâtiment",
          D: "jouer aux jeux vidéos",
        },
        answer: "B",
      },
    ],
  },
  // Texte 2 — Q2
  {
    label: "Texte 2",
    passage: [
      "LeNOVO ideapad 1",
      "design ultra-slim",
      "stockage : 150 Go",
      "autonomie de la batterie : 5 heures",
      "couleur : gris",
      "chargeur universel et souris intégrée",
      "connexion HDMI et USB-C intégrée",
      "idéal pour les recherches Internet",
    ],
    questions: [
      {
        id: 2,
        prompt: "Cette annonce concerne :",
        options: {
          A: "un vêtement",
          B: "un ordinateur",
          C: "un véhicule",
          D: "une offre d’emploi",
        },
        answer: "B",
      },
    ],
  },
  // Texte 3 — Q3
  {
    label: "Texte 3",
    passage: [
      "La mairie sera fermée ce vendredi 25 mai à cause des élections. Merci de faire vos demandes en ligne. Nos portes seront ouvertes à partir de samedi 10h00 comme d’habitude.",
    ],
    questions: [
      {
        id: 3,
        prompt: "La Mairie annonce :",
        options: {
          A: "elle est fermée ce week-end",
          B: "le site Internet ne fonctionne pas",
          C: "une fermeture exceptionnelle",
          D: "de nouveaux horaires",
        },
        answer: "C",
      },
    ],
  },
  // Texte 4 — Q4
  {
    label: "Texte 4",
    passage: [
      "Un dîner d’anniversaire ? un déjeuner entre collègues ?",
      "Ne cherchez plus : « A la belle du Berry » est le lieu parfait pour tous vos évènements.",
      "Des menus variés, des produits locaux et de saison.",
      "Une atmosphère sympathique comme à la maison.",
    ],
    questions: [
      {
        id: 4,
        prompt: "Vous allez au restaurant A la belle du Berry :",
        options: {
          A: "pour recevoir des repas au bureau",
          B: "pour recevoir des repas à domicile",
          C: "commander un gâteau d’anniversaire",
          D: "pour des bons repas",
        },
        answer: "D",
      },
    ],
  },
  // Texte 5 — Q5
  {
    label: "Texte 5",
    title: "Salon de l’expatriation au Québec",
    passage: [
      "Vous souhaitez vous installer au Québec pour travailler ou étudier ?",
      "Participez à notre salon de l’expatriation !",
      "📍 Lieu : Centre des congrès",
      "📅 Date : Samedi 15 juin",
      "🕘 Horaires : de 10h à 17h",
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
  // Texte 6 — Q6
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
  // Texte 7 — Q7
  {
    label: "Texte 7",
    title: "« On plante ICI »",
    passage: [
      "La Ville de Trois-Rivières invite les entreprises à participer à son programme de plantation d’arbres. L’objectif est de verdir les zones urbaines et de créer des espaces plus frais.",
      "Chaque établissement peut recevoir jusqu’à 5 arbres parmi plusieurs espèces. Le programme est gratuit et comprend la plantation ainsi que l’entretien pendant 3 ans.",
      "Les inscriptions sont ouvertes jusqu’à la fin du mois. Les places sont limitées (premier arrivé, premier servi).",
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
  // ===== Les phrases lacunaires (Q8–Q13) =====
  {
    heading: "Les phrases lacunaires",
    label: "Phrase 1",
    passage: ["Marion …………………………. toujours des vêtements en ligne."],
    questions: [
      {
        id: 8,
        prompt: "Choisissez le mot qui convient :",
        options: { A: "demande", B: "commande", C: "livre", D: "visite" },
        answer: "B",
      },
    ],
  },
  {
    label: "Phrase 2",
    passage: [
      "Le bus en direction de Ottawa est retardé de 30 minutes. ……………… aura lieu à 20h30.",
    ],
    questions: [
      {
        id: 9,
        prompt: "Choisissez le mot qui convient :",
        options: { A: "le départ", B: "le trajet", C: "la durée", D: "l’horaire" },
        answer: "A",
      },
    ],
  },
  {
    label: "Phrase 3",
    passage: [
      "Le cirque du soleil est heureux de vous …………………… une place à moitié prix pour tout achat d’un billet adulte.",
    ],
    questions: [
      {
        id: 10,
        prompt: "Choisissez le mot qui convient :",
        options: { A: "annoncer", B: "présente", C: "offrir", D: "accueillir" },
        answer: "C",
      },
    ],
  },
  {
    label: "Phrase 4",
    passage: [
      "Le télétravail a connu une ………………….. exponentielle depuis la pandémie et s’est démocratisé dans toutes les entreprises.",
    ],
    questions: [
      {
        id: 11,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "développement",
          B: "augmentation",
          C: "stagnation",
          D: "croissance",
        },
        answer: "D",
      },
    ],
  },
  {
    label: "Phrase 5",
    passage: [
      "La Grande Barrière de corail est une étendue de 2 300 kilomètres de coraux tropicaux ………………….. une incroyable diversité biologique.",
    ],
    questions: [
      {
        id: 12,
        prompt: "Choisissez le mot qui convient :",
        options: {
          A: "abritant",
          B: "progressant",
          C: "accroissant",
          D: "élargissant",
        },
        answer: "A",
      },
    ],
  },
  {
    label: "Phrase 6",
    passage: [
      "La ménopause est inéluctable, elle touche 100 % des femmes et provoque un arrêt ……………………. et l'infertilité.",
    ],
    questions: [
      {
        id: 13,
        prompt: "Choisissez la suite qui convient :",
        options: {
          A: "du processus de ménopause",
          B: "évitable de la production d’hormones",
          C: "de la sécrétion d’hormones",
          D: "hormonale réversible",
        },
        answer: "C",
      },
    ],
  },
  // ===== Les textes lacunaires (Q14–Q17) =====
  {
    heading: "Les textes lacunaires",
    label: "Texte 8",
    passage: [
      "L'enquête du cabinet Bodyguard, spécialisé dans la modération en ligne pour le journal Les Échos, montre que les messages haineux ont augmenté de près de 9 %. Cette augmentation grimpe à plus de 22 % pour l'ensemble du mois de janvier. Le sport est ………………………… (1) où on retrouve le plus de commentaires haineux. On note, aussi, une ……………………………… (2) du harcèlement moral, mais aussi des messages ayant trait au terrorisme, en augmentation de 60 %.",
    ],
    source: "source : RFI savoirs",
    questions: [
      {
        id: 14,
        prompt: "Choisissez la suite qui convient pour (1) :",
        options: {
          A: "le plus concerné",
          B: "la thématique",
          C: "l’accroissement",
          D: "potentiellement",
        },
        answer: "B",
      },
      {
        id: 15,
        prompt: "Choisissez la suite qui convient pour (2) :",
        options: {
          A: "recrudescence",
          B: "descente",
          C: "stagnation",
          D: "inflation",
        },
        answer: "A",
      },
    ],
  },
  {
    label: "Texte 9",
    passage: [
      "Le « suivi acoustique passif » consiste à recueillir, à capter, les sons des animaux, le paysage sonore, sur une longue durée, dans une très grande variété d'environnements, via des enregistreurs acoustiques.",
      "Très utilisé pour suivre le comportement et la répartition des différentes populations ………………………. (16) – que ce soit des insectes, des poissons, des oiseaux ou des mammifères –, ce suivi acoustique ………………………… (17) aussi particulièrement utile pour mesurer l'état de santé général d'un écosystème, le déclin ou l'évolution de sa biodiversité, notamment en lien avec le changement climatique.",
    ],
    source: "source : RFI savoirs",
    questions: [
      {
        id: 16,
        prompt: "Choisissez la suite qui convient pour (16) :",
        options: {
          A: "humaines",
          B: "animales",
          C: "aquatiques",
          D: "sociétales",
        },
        answer: "B",
      },
      {
        id: 17,
        prompt: "Choisissez la suite qui convient pour (17) :",
        options: {
          A: "s’étend",
          B: "s’assure",
          C: "se confirme",
          D: "se révèle",
        },
        answer: "D",
      },
    ],
  },
  // ===== Documents administratifs et professionnels =====
  {
    heading: "Les documents administratifs et professionnels",
    label: "Texte 10",
    title: "Objet : Confirmation de rendez-vous — Service d’immigration",
    passage: [
      "Madame, Monsieur,",
      "Nous vous confirmons votre rendez-vous au bureau d’accueil des nouveaux résidents le 14 mai à 9 h 30.",
      "Lors de cette rencontre, un agent vérifiera votre dossier et vous présentera les services d’intégration disponibles dans votre région.",
      "Merci d’apporter les documents suivants :",
      "• votre passeport ou carte d’identité ;",
      "• votre confirmation de résidence permanente ;",
      "• un justificatif d’adresse récent.",
      "Si vous ne pouvez pas être présent à la date indiquée, nous vous invitons à modifier votre rendez-vous au moins 48 heures à l’avance en utilisant le portail en ligne.",
      "Pour toute question, vous pouvez contacter notre service au 1-800-555-2145.",
      "Cordialement,",
      "Service d’accueil des nouveaux résidents",
    ],
    questions: [
      {
        id: 18,
        prompt: "Cet e-mail est envoyé :",
        options: {
          A: "suite à l’installation dans un nouveau pays",
          B: "pour demander la résidence permanente",
          C: "pour visiter et découvrir la région",
          D: "suite à une demande de changement d’adresse",
        },
        answer: "A",
      },
      {
        id: 19,
        prompt: "Les documents demandés :",
        options: {
          A: "sont périmés et doivent être renouvelés",
          B: "doivent servir de justificatif pour constituer un dossier",
          C: "seront remis par l’agent le jour de la visite",
          D: "sont prêts et doivent être récupérés au service d’immigration",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 11",
    title: "À l’attention de tous les services",
    passage: [
      "Afin d’améliorer l’équilibre entre vie professionnelle et personnelle, la direction autorise désormais deux jours de télétravail par semaine.",
      "Conditions principales :",
      "• Les employés doivent être présents au bureau au moins trois jours par semaine.",
      "• Les jours de télétravail doivent être validés par le responsable d’équipe.",
      "• Les réunions importantes auront lieu prioritairement en présentiel.",
      "Les employés travaillant à distance doivent rester joignables entre 9 h et 17 h et utiliser les outils numériques de l’entreprise (messagerie interne et plateforme de visioconférence).",
      "Cette mesure sera appliquée à partir du 1er juin et fera l’objet d’une évaluation après trois mois. Les services techniques ne sont pour l’instant pas concernés.",
      "Direction des ressources humaines",
    ],
    questions: [
      {
        id: 20,
        prompt: "Le document :",
        options: {
          A: "rappelle les règles de télétravail applicables dans l’entreprise",
          B: "est destiné aux nouveaux salariés",
          C: "concerne les salariés bénéficiant déjà de la mesure",
          D: "annonce un changement dans l’entreprise",
        },
        answer: "D",
      },
      {
        id: 21,
        prompt: "La mesure :",
        options: {
          A: "concerne tous les services de l’entreprise",
          B: "est soumise à une autorisation préalable",
          C: "est applicable uniquement 3 mois",
          D: "dépend de la distance domicile-travail",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 12",
    title: "Communiqué de presse — Ville de Montclair",
    passage: [
      "La Ville de Montclair annonce le lancement d’un nouveau programme destiné à soutenir les initiatives locales en faveur de la transition écologique.",
      "Ce programme prévoit une aide financière pour les associations et petites entreprises qui développent des projets liés à :",
      "• la réduction des déchets ;",
      "• l’économie d’énergie ;",
      "• la sensibilisation du public aux pratiques durables.",
      "Les organisations intéressées pourront déposer leur candidature entre le 10 avril et le 30 juin via le site officiel de la municipalité.",
      "Selon la maire de Montclair, cette initiative vise à encourager les acteurs économiques et sociaux à participer activement à la transformation environnementale de la ville.",
      "Les projets sélectionnés seront annoncés à l’automne prochain.",
    ],
    questions: [
      {
        id: 27,
        prompt: "Le document :",
        options: {
          A: "est un appel à candidature",
          B: "souhaite sensibiliser les citoyens au développement durable",
          C: "annonce les projets sélectionnés",
          D: "rappelle les objectifs de développement durable de la ville",
        },
        answer: "A",
      },
      {
        id: 28,
        prompt: "Le programme :",
        options: {
          A: "est ouvert à tous les citoyens canadiens",
          B: "ne s’adresse pas à des personnes individuelles",
          C: "a pour objectif de soutenir le tourisme local et durable",
          D: "a pour but de promouvoir la ville",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 13",
    title: "Clause 7 — Conditions de résiliation",
    passage: [
      "Le présent contrat peut être résilié par l’une ou l’autre des parties dans les situations suivantes :",
      "1. non-respect des obligations contractuelles après notification écrite ;",
      "2. retard de paiement supérieur à 30 jours ;",
      "3. cessation d’activité de l’une des parties.",
      "La résiliation doit être communiquée par lettre recommandée avec accusé de réception. Un préavis minimum de 15 jours est exigé, sauf en cas de faute grave.",
      "Pendant la période de préavis, les prestations prévues au contrat doivent continuer à être assurées conformément aux conditions initialement convenues.",
      "Toute résiliation anticipée ne dispense pas les parties de régler les sommes dues pour les services déjà fournis.",
    ],
    questions: [
      {
        id: 29,
        prompt: "Le document :",
        options: {
          A: "énonce les conditions du licenciement pour faute grave",
          B: "indique le moyen de notification de la résiliation du contrat",
          C: "fixe les conditions de remboursement des sommes indues",
          D: "fixe la durée légale minimum du contrat",
        },
        answer: "B",
      },
      {
        id: 30,
        prompt: "D’après le document, la période de préavis :",
        options: {
          A: "doit être notifiée 15 jours avant",
          B: "entraîne une cessation d’activité de 15 jours",
          C: "ne change pas l'exécution normale du contrat",
          D: "dispense d’une information préalable écrite",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 14",
    title: "Le bien-être au travail : un enjeu stratégique pour les entreprises",
    passage: [
      "De plus en plus d’entreprises reconnaissent l’importance du bien-être au travail pour améliorer la performance et la fidélisation des employés. Plusieurs études montrent qu’un environnement professionnel positif contribue à réduire l’absentéisme et à renforcer la motivation.",
      "Les organisations adoptent ainsi différentes mesures telles que des horaires flexibles, des programmes de soutien psychologique, des activités favorisant la cohésion d’équipe…",
      "Cependant, les spécialistes soulignent que ces initiatives ne peuvent être efficaces que si elles s’inscrivent dans une véritable culture organisationnelle. Autrement dit, le bien-être ne doit pas être considéré comme un simple avantage, mais comme un élément central de la stratégie de gestion des ressources humaines.",
      "Les entreprises qui réussissent cette transition constatent souvent une amélioration durable de leur productivité.",
    ],
    questions: [
      {
        id: 31,
        prompt:
          "D’après le document, pourquoi certaines compagnies valorisent davantage l’épanouissement professionnel interne ?",
        options: {
          A: "Pour diminuer les dépenses liées aux accidents du travail et au mal-être au travail",
          B: "Pour rendre l'entreprise attractive et attirer de nouveaux salariés",
          C: "Pour renforcer les résultats globaux et l’engagement durable des salariés",
          D: "Pour remplacer la formation continue par l’apprentissage autonome",
        },
        answer: "C",
      },
      {
        id: 32,
        prompt: "Quel phénomène diminue grâce au climat professionnel harmonieux ?",
        options: {
          A: "Le nombre de congés maladie fréquents parmi le personnel salarié",
          B: "Les demandes de remboursement de frais de transport domicile-bureau",
          C: "Les ruptures anticipées des contrats",
          D: "La participation aux réunions stratégiques par des cadres dirigeants",
        },
        answer: "A",
      },
    ],
  },
  // ===== Les articles de presse =====
  {
    heading: "Les articles de presse",
    label: "Texte 15",
    title: "Les villes face au défi des transports durables",
    passage: [
      "Dans de nombreuses grandes villes, la question des transports est devenue un enjeu majeur. L’augmentation du nombre d’habitants et la croissance économique ont entraîné une circulation plus dense et une pollution plus importante. Face à ces défis, plusieurs municipalités cherchent des solutions pour encourager des modes de déplacement plus durables.",
      "Parmi les mesures les plus répandues figure le développement des transports publics. De nouvelles lignes de métro, de tramway ou de bus rapides sont construites afin de réduire la dépendance à la voiture individuelle. Les autorités espèrent ainsi limiter les embouteillages et améliorer la qualité de l’air.",
      "Parallèlement, certaines villes investissent dans les infrastructures pour les cyclistes et les piétons. Des pistes cyclables protégées sont aménagées et des zones réservées aux piétons apparaissent dans les centres urbains. Ces initiatives visent non seulement à diminuer la pollution, mais aussi à rendre les villes plus agréables à vivre.",
      "Toutefois, ces transformations ne sont pas toujours faciles à mettre en œuvre. Les commerçants et certains automobilistes craignent parfois que la réduction de la circulation automobile affecte leurs activités. Les responsables municipaux doivent donc trouver un équilibre entre les différents intérêts.",
      "Malgré ces difficultés, les experts considèrent que ces changements sont nécessaires. Dans un contexte de transition écologique, repenser la mobilité urbaine apparaît comme une priorité pour de nombreuses sociétés.",
    ],
    questions: [
      {
        id: 33,
        prompt:
          "Pourquoi les grandes agglomérations rencontrent-elles davantage de problèmes de circulation ? À cause de…",
        options: {
          A: "la croissance démographique et l’expansion des activités économiques",
          B: "la baisse de la fréquentation des transports collectifs urbains récents",
          C: "la fermeture progressive de nombreuses artères centrales principales",
          D: "la diminution du nombre d’entreprises installées en centres urbains",
        },
        answer: "A",
      },
      {
        id: 34,
        prompt: "Quelle difficulté rencontrent les décideurs municipaux lors des réformes ?",
        options: {
          A: "La sensibilisation des citoyens aux enjeux environnementaux",
          B: "L’espace urbain réduit ne permet pas de transformations durables",
          C: "Le risque de pertes de revenus de certains acteurs économiques",
          D: "La réticence des habitants dont les taxes augmentent pour financer ces projets",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 16",
    title: "Faut-il rendre le vote obligatoire ?",
    passage: [
      "Dans de nombreuses démocraties, la participation aux élections reste relativement faible. Une partie importante des citoyens ne se rend pas aux urnes, ce qui suscite des interrogations sur la représentativité des résultats électoraux. Face à ce phénomène, certains spécialistes proposent de rendre le vote obligatoire.",
      "Plusieurs pays ont déjà adopté ce système. Dans ces États, les citoyens doivent participer aux élections, sous peine de sanctions telles qu’une amende ou certaines restrictions administratives. L’objectif principal est d’augmenter la participation électorale et de renforcer la légitimité des gouvernements élus.",
      "Les défenseurs de cette mesure affirment que le vote obligatoire permet de mieux représenter l’ensemble de la population. Dans les systèmes où le vote est facultatif, les électeurs les plus engagés — souvent plus âgés ou plus favorisés socialement — participent davantage. L’obligation de voter réduirait donc ces écarts et favoriserait une représentation plus équilibrée des différentes catégories sociales.",
      "Toutefois, cette proposition ne fait pas l’unanimité. Les opposants estiment qu’imposer le vote porte atteinte à la liberté individuelle. Selon eux, choisir de ne pas voter peut aussi être une forme d’expression politique. Ils craignent également que certains électeurs, contraints de participer, prennent leur décision sans réelle information.",
      "Le débat reste donc ouvert. Entre participation citoyenne et liberté individuelle, la question du vote obligatoire soulève des enjeux fondamentaux pour le fonctionnement des démocraties modernes.",
    ],
    questions: [
      {
        id: 35,
        prompt: "Quelle conséquence démocratique inquiète certains analystes politiques ?",
        options: {
          A: "Les résultats électoraux risquent de refléter seulement une minorité active",
          B: "Un accroissement de la défiance des citoyens envers les institutions",
          C: "Un maintien des personnes élues au pouvoir",
          D: "Un manque de candidats aux élections nationales",
        },
        answer: "A",
      },
      {
        id: 36,
        prompt: "Quel déséquilibre apparaît lorsque la participation reste volontaire ?",
        options: {
          A: "Les habitants ruraux sont exclus des réformes électives",
          B: "Les fonctionnaires publics influencent fortement les consultations nationales",
          C: "Les catégories sociales favorisées participent davantage aux décisions",
          D: "Les électeurs votent sans information suffisante",
        },
        answer: "C",
      },
    ],
  },
  {
    label: "Texte 17",
    title: "La chirurgie esthétique : une pratique de plus en plus répandue",
    passage: [
      "Au cours des dernières décennies, la chirurgie esthétique s’est largement développée dans de nombreuses régions du monde. Autrefois associée à une minorité de personnes fortunées, elle est aujourd’hui plus accessible et concerne des publics variés. Hommes et femmes, jeunes adultes et personnes plus âgées y ont recours pour améliorer leur apparence ou corriger certains complexes.",
      "Selon plusieurs études internationales, des dizaines de millions d’interventions esthétiques, chirurgicales ou non chirurgicales, sont réalisées chaque année dans le monde. Cette croissance s’explique notamment par les progrès techniques, qui rendent les opérations plus sûres et plus rapides, mais aussi par l’évolution des normes sociales concernant l’apparence physique.",
      "Les réseaux sociaux jouent également un rôle important dans cette évolution. Les images diffusées sur Internet, souvent retouchées ou mises en scène, contribuent à renforcer certains idéaux de beauté. De nombreuses personnes souhaitent ainsi modifier certains traits afin de correspondre à ces modèles.",
      "Cependant, cette popularité soulève aussi des inquiétudes. Certains spécialistes craignent que la pression sociale liée à l’apparence n’encourage des décisions précipitées. D’autres rappellent que, malgré les progrès médicaux, toute intervention comporte des risques et nécessite une réflexion approfondie.",
      "Face à ces préoccupations, plusieurs pays cherchent à renforcer la réglementation du secteur. L’objectif est de mieux informer les patients et de garantir la qualité des pratiques médicales. Dans ce contexte, le débat se poursuit entre ceux qui considèrent la chirurgie esthétique comme une liberté individuelle et ceux qui s’inquiètent de son impact sur la perception du corps et de la beauté.",
    ],
    questions: [
      {
        id: 37,
        prompt: "D’après le document, la chirurgie esthétique :",
        options: {
          A: "concerne avant tout les personnes dont le métier est lié à l’apparence physique",
          B: "est plus sûre qu’une intervention médicale classique",
          C: "est devenue un moyen d’afficher sa richesse",
          D: "s’est démocratisée parmi une large part de la population",
        },
        answer: "D",
      },
      {
        id: 38,
        prompt: "Pourquoi certains gouvernements souhaitent-ils encadrer davantage ce domaine ?",
        options: {
          A: "Afin de réduire le nombre d’opérations réalisées chaque année",
          B: "Afin d’améliorer l’information aux patients et assurer la qualité des soins",
          C: "Afin de supprimer la publicité en ligne concernant les services médicaux esthétiques",
          D: "Pour réduire les coûts supportés par l’assurance maladie",
        },
        answer: "B",
      },
    ],
  },
  {
    label: "Texte 18",
    title: "Tourisme durable : voyager moins, voyager mieux ?",
    passage: [
      "Longtemps célébré comme un moteur de croissance mondiale, le tourisme apparaît aujourd’hui sous un jour plus ambivalent. Si l’industrie des voyages représente l’un des secteurs économiques les plus dynamiques de la planète, son expansion rapide n’est pas sans effets secondaires. Pression sur les écosystèmes, saturation de sites emblématiques, tensions avec les habitants : dans de nombreuses régions, le succès touristique se transforme parfois en fardeau. Face à ces dérives, un concept gagne progressivement du terrain : celui du tourisme durable.",
      "L’idée repose sur un principe simple : repenser la manière de voyager afin de réduire l’empreinte environnementale tout en soutenant les économies locales. De plus en plus de voyageurs s’orientent ainsi vers des hébergements écologiques, des transports moins polluants ou des activités conçues dans le respect des milieux naturels. Ce changement de comportement reflète une prise de conscience croissante des conséquences que peut avoir un tourisme de masse mal encadré.",
      "Dans le même temps, certaines destinations tentent de reprendre la main sur la gestion de leur fréquentation. Dans plusieurs sites particulièrement prisés, les autorités ont choisi de limiter l’accès afin de préserver des écosystèmes fragiles. L’objectif est d’éviter que la surfréquentation ne conduise à une dégradation irréversible des paysages qui font justement la renommée de ces lieux.",
      "D’autres initiatives misent sur une stratégie différente : encourager les visiteurs à explorer des territoires moins connus. En redistribuant les flux touristiques, cette approche permet de réduire la pression sur les destinations saturées tout en favorisant le développement économique de régions restées en marge des grands circuits internationaux.",
      "Pour autant, la transition vers un modèle plus responsable reste un exercice d’équilibriste. Les professionnels du secteur doivent répondre aux attentes d’une clientèle en quête d’expériences authentiques tout en protégeant les ressources naturelles et culturelles qui constituent l’attrait même des destinations. Dans ce contexte, l’avenir du tourisme dépendra largement de la capacité des acteurs à concilier mobilité, développement économique et préservation de l’environnement.",
    ],
    questions: [
      {
        id: 39,
        prompt: "D’après le document, certains lieux touristiques :",
        options: {
          A: "subissent une diminution drastique des investissements",
          B: "peinent à renouveler leur clientèle et essayent de se diversifier",
          C: "les questions écologiques orientent de plus en plus le choix des touristes",
          D: "le tourisme de proximité est une solution durable aux écueils du tourisme de masse",
        },
        answer: "C",
      },
      {
        id: 40,
        prompt: "Quel principe guide cette nouvelle approche touristique ?",
        options: {
          A: "Accroître la fréquentation internationale dans des destinations authentiques",
          B: "Réduire l’empreinte écologique tout en soutenant les économies locales",
          C: "Développer les offres de mobilité des destinations privilégiées",
          D: "Inclure les habitants dans les décisions stratégiques afin d’éviter les tensions",
        },
        answer: "B",
      },
    ],
  },
];

export const READING_TEST_1_ALL_QUESTIONS = readingTest1.flatMap((s) => s.questions);