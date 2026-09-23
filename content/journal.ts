/* Articles du journal, réécrits à partir du blog actuel.
   Retirés : l'article sur la cryothérapie et le billet d'attente « Nouveau sur Hygie ». */
import type { Bloc } from './types';
import type { PhotoKey } from './images';

export type Categorie = 'methode' | 'bilans' | 'sport' | 'recuperation' | 'entreprises';

export const categories: Record<Categorie, string> = {
  methode: 'Méthode',
  bilans: 'Bilans',
  sport: 'Sport',
  recuperation: 'Récupération',
  entreprises: 'Entreprises',
};

/* Couleur d'étiquette de chaque catégorie : les points du logo */
export const couleursCategories: Record<Categorie, 'bleu' | 'jaune' | 'gris' | 'encre'> = {
  methode: 'encre',
  bilans: 'encre',
  sport: 'jaune',
  recuperation: 'gris',
  entreprises: 'bleu',
};

export type Auteur = { nom: string; photo?: PhotoKey; initiales: string };

const johan: Auteur = { nom: 'Johan Pereira', photo: 'johanPereira', initiales: 'JP' };
const bryan: Auteur = { nom: 'Bryan Stimec', initiales: 'BS' };

export type Article = {
  slug: string;
  titre: string;
  date: string;
  categorie: Categorie;
  auteur: Auteur;
  photo?: PhotoKey;
  vignette: string;
  chapo: string;
  description: string;
  corps: Bloc[];
};

export const articles: Article[] = [
  {
    slug: 'cout-bilan-isocinetique',
    titre: 'Bilan isocinétique : ce que recouvre son prix',
    date: '2026-05-05',
    categorie: 'bilans',
    auteur: johan,
    photo: 'extensionJambe',
    vignette: 'Isocinétique',
    chapo:
      'Le bilan isocinétique évalue avec précision la force musculaire et le fonctionnement d’une articulation. Voici ce que comprend son prix, et ce qu’il vous apporte.',
    description: 'Combien coûte un bilan isocinétique, que comprend le tarif et comment le préparer ? Les réponses de Johan Pereira, au centre Hygie d’Avon.',
    corps: [
      { t: 'h2', texte: 'Ce que comprend le tarif' },
      {
        t: 'p',
        texte:
          'Le prix d’un bilan isocinétique varie selon les centres et la complexité des tests : il se situe en général entre 80 et 200 euros. Il comprend le plus souvent :',
      },
      {
        t: 'ul',
        items: [
          'un entretien préalable',
          'les tests sur la machine isocinétique',
          'l’analyse des résultats',
          'un compte-rendu détaillé, avec des recommandations personnalisées',
        ],
      },
      { t: 'p', texte: "Chez Hygie, le bilan isocinétique coûte 80 euros pour une séance d'1 h 30. Il n’est pas pris en charge par la Sécurité sociale." },
      { t: 'h2', texte: 'Pourquoi le faire' },
      {
        t: 'ul',
        items: [
          'prévenir les blessures en détectant les déséquilibres musculaires',
          'ajuster votre entraînement sur des données précises',
          'suivre une rééducation après une blessure ou une opération',
          'compléter l’examen clinique par une mesure objective',
        ],
      },
      { t: 'h2', texte: 'Comment il se déroule' },
      {
        t: 'p',
        texte:
          'Installé sur un dynamomètre isocinétique, vous réalisez des flexions et des extensions à différentes vitesses. L’appareil mesure la force produite et révèle les déséquilibres ; le test est indolore et non invasif.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'ul',
        items: [
          'les sportifs qui veulent progresser',
          'les personnes en rééducation après une blessure',
          'les personnes qui souffrent de douleurs articulaires durables',
          'les entreprises attentives à la santé de leurs salariés',
        ],
      },
      { t: 'h2', texte: 'Bien choisir son centre' },
      {
        t: 'ul',
        items: [
          'un dynamomètre isocinétique récent et bien entretenu',
          'des professionnels formés à la rééducation ou à la préparation physique',
          'un suivi possible après le bilan, en rééducation ou en entraînement',
          'un tarif clair, annoncé à l’avance',
        ],
      },
      { t: 'h2', texte: 'Préparer votre bilan' },
      {
        t: 'ul',
        items: [
          'évitez les efforts intenses la veille',
          'hydratez-vous correctement',
          'portez une tenue de sport confortable',
          'apportez vos antécédents médicaux',
          'signalez toute douleur pendant le test',
        ],
      },
      { t: 'p', texte: 'Pour réserver, rendez-vous sur la page du [bilan isocinétique](/bilans/isocinetique).' },
    ],
  },
  {
    slug: 'approche-hygie',
    titre: 'L’approche Hygie : sport et santé au même endroit',
    date: '2026-04-13',
    categorie: 'methode',
    auteur: johan,
    photo: 'course',
    vignette: 'Approche',
    chapo:
      'Allier activité physique et hygiène de vie pour préserver sa santé globale : c’est le principe de l’approche Hygie, ouverte à tous les âges et à tous les niveaux.',
    description: 'Évaluation, programmation, nutrition, suivi : les quatre piliers de l’approche Hygie pour progresser sans risque, à tout âge.',
    corps: [
      { t: 'h2', texte: 'Un équilibre entre sport et santé' },
      {
        t: 'p',
        texte:
          'L’approche Hygie ne se limite pas à la pratique sportive. Elle réunit l’entraînement, les conseils en nutrition, la récupération et un suivi personnalisé, pour progresser sans risque et dans le respect de votre corps.',
      },
      {
        t: 'p',
        texte: 'Elle s’appuie sur des outils de mesure habituellement réservés aux sportifs professionnels, mis à la portée de tous dans un cadre sécurisé.',
      },
      { t: 'h2', texte: 'Quatre piliers' },
      {
        t: 'ul',
        items: [
          'l’évaluation : un bilan complet de votre condition physique et de vos besoins',
          'la programmation : des séances sur mesure, qui équilibrent effort et récupération',
          'la nutrition : des conseils pour une alimentation adaptée à votre activité',
          'le suivi : des ajustements réguliers pour des résultats durables',
        ],
      },
      { t: 'h2', texte: 'Ce que vous y gagnez' },
      {
        t: 'ul',
        items: [
          'une meilleure condition physique générale',
          'moins de risques de blessure',
          'une meilleure gestion du stress et de la fatigue',
          'une récupération facilitée après l’effort',
          'un sommeil de meilleure qualité',
        ],
      },
      { t: 'h2', texte: 'Commencer simplement' },
      { t: 'p', texte: 'Inutile de bouleverser votre quotidien : de nouvelles habitudes, installées progressivement, suffisent.' },
      {
        t: 'ol',
        items: [
          'faites évaluer votre condition physique par un professionnel',
          'fixez-vous des objectifs réalistes',
          'planifiez vos séances selon votre emploi du temps',
          'adoptez une alimentation équilibrée',
          'respectez le repos et la récupération',
          'suivez vos progrès pour ajuster votre programme',
        ],
      },
      {
        t: 'p',
        texte:
          'La qualité compte plus que la quantité : vous apprenez à écouter votre corps et à progresser à votre rythme. Pour commencer, découvrez [la méthode Hygie](/methodologie).',
      },
    ],
  },
  {
    slug: 'pressotherapie-jambes-legeres',
    titre: 'Pressothérapie : récupérer avec des jambes légères',
    date: '2025-02-10',
    categorie: 'recuperation',
    auteur: johan,
    photo: 'pressotherapie',
    vignette: 'Pressothérapie',
    chapo:
      'Longtemps réservée aux athlètes, la pressothérapie a trouvé sa place dans la récupération de tous les sportifs. Voici comment elle fonctionne et ce que vous pouvez en attendre.',
    description: 'Comment fonctionne la pressothérapie, ce qu’elle apporte aux sportifs et à ceux qui ont les jambes lourdes, et les précautions à connaître.',
    corps: [
      { t: 'h2', texte: 'Comment ça marche' },
      {
        t: 'p',
        texte:
          'Des bottes gonflables exercent une pression séquentielle sur les jambes, du pied vers la cuisse. Cette compression stimule le retour veineux et la circulation lymphatique.',
      },
      { t: 'h2', texte: 'Pour les sportifs' },
      {
        t: 'ul',
        items: [
          'une sensation de jambes légères après un entraînement intense',
          'une récupération facilitée entre deux séances',
          'moins de lourdeur liée à la rétention d’eau',
        ],
      },
      { t: 'h2', texte: 'Pour tous' },
      {
        t: 'p',
        texte:
          'Nul besoin d’être sportif pour en profiter. Les personnes qui ont souvent les jambes lourdes y trouvent un soulagement, et la séance, allongé au calme, est un vrai moment de détente.',
      },
      { t: 'h2', texte: 'Précautions' },
      {
        t: 'p',
        texte:
          'La pressothérapie ne convient pas à tout le monde : certains troubles circulatoires, cardiaques ou cutanés la contre-indiquent. Un questionnaire est donc à remplir avant la première séance.',
      },
      { t: 'p', texte: 'Au centre, une [séance de 30 minutes coûte 20 euros](/recuperation/pressotherapie).' },
    ],
  },
  {
    slug: 'hyrox',
    titre: 'Hyrox : se préparer au défi hybride',
    date: '2025-02-06',
    categorie: 'sport',
    auteur: bryan,
    photo: 'traineau',
    vignette: 'Hyrox',
    chapo: 'Course à pied et fitness fonctionnel : le Hyrox séduit des sportifs de tous niveaux. Voici ce qui vous attend, et comment vous y préparer.',
    description: 'Les huit épreuves du Hyrox, les qualités qu’il développe et la façon de s’y préparer avec les préparateurs physiques d’Hygie, à Avon.',
    corps: [
      { t: 'h2', texte: 'Une discipline hybride' },
      {
        t: 'p',
        texte:
          'Né en Allemagne en 2017, le Hyrox se situe entre les courses d’obstacles et les compétitions de fitness fonctionnel. Il enchaîne 8 kilomètres de course et 8 épreuves, avec un kilomètre de course avant chacune.',
      },
      { t: 'p', texte: 'Des catégories existent pour tous les niveaux, du débutant à l’élite, en solo comme en duo.' },
      { t: 'h2', texte: 'Les huit épreuves' },
      {
        t: 'ol',
        items: [
          'SkiErg : 1 000 mètres qui sollicitent le haut du corps',
          'Sled Push : pousser un traîneau lesté',
          'Sled Pull : tirer un traîneau lesté',
          'Burpee Broad Jumps : des burpees enchaînés avec des sauts en longueur',
          'Rameur : 1 000 mètres',
          'Farmer’s Carry : porter des charges lourdes sur une distance donnée',
          'Fentes avec un sac lesté',
          'Wall Balls : 100 lancers de ballon contre un mur',
        ],
      },
      { t: 'h2', texte: 'Ce que le Hyrox développe' },
      {
        t: 'ul',
        items: [
          'l’endurance, avec la course entre chaque épreuve',
          'la force, avec le traîneau ou le Farmer’s Carry',
          'la coordination, pour enchaîner les exercices efficacement',
          'le mental, pour gérer son effort jusqu’à la ligne d’arrivée',
        ],
      },
      { t: 'h2', texte: 'S’y préparer avec Hygie' },
      {
        t: 'ul',
        items: [
          'une évaluation complète de votre condition physique, pour repérer vos points forts et vos axes de progrès',
          'un programme d’entraînement ciblé sur les épreuves du Hyrox',
          'le suivi régulier de votre coach tout au long de la préparation',
        ],
      },
      {
        t: 'p',
        texte:
          'Les séances de [cross training](/sport/cross-training) en petit groupe recréent l’esprit du Hyrox ; le [coaching individuel](/sport/coaching-individuel) permet un travail plus précis. Votre première séance est offerte.',
      },
    ],
  },
  {
    slug: 'crossfit',
    titre: 'CrossFit : une discipline complète',
    date: '2025-02-03',
    categorie: 'sport',
    auteur: bryan,
    photo: 'souleve',
    vignette: 'CrossFit',
    chapo:
      'Le CrossFit est bien plus qu’une tendance : une discipline complète qui travaille toutes les qualités physiques. Voici ses bienfaits, et comment le pratiquer sans vous blesser.',
    description: 'Les bienfaits du CrossFit pour le corps et le mental, et nos conseils pour bien commencer, par l’équipe Hygie Sport Santé et Performance.',
    corps: [
      { t: 'h2', texte: 'Une approche globale' },
      {
        t: 'p',
        texte:
          'Le CrossFit associe des exercices fonctionnels variés, exécutés à haute intensité. Il développe l’endurance, la force, la souplesse, la puissance, la vitesse, la coordination et l’équilibre, ce qui le rend adaptable à tous les profils.',
      },
      { t: 'h2', texte: 'Les bienfaits pour le corps' },
      {
        t: 'ul',
        items: [
          'une meilleure condition physique, avec des muscles et des articulations renforcés',
          'une activité physique régulière, qui contribue à réduire le risque de maladies chroniques',
          'plus de mobilité, utile pour la posture et contre les douleurs',
        ],
      },
      { t: 'h2', texte: 'Les bienfaits pour le mental' },
      {
        t: 'ul',
        items: [
          'moins de stress, grâce aux endorphines libérées par l’effort',
          'plus de confiance en soi, à chaque mouvement maîtrisé',
          'une concentration entretenue par l’attention que demande chaque exercice',
        ],
      },
      { t: 'h2', texte: 'Pourquoi l’adopter' },
      {
        t: 'ul',
        items: [
          'il s’adapte à tous les niveaux : chaque mouvement se module en intensité et en difficulté',
          'les progrès se voient vite, ce qui entretient la motivation',
          'le groupe soutient et encourage',
          'la variété des séances évite la lassitude',
        ],
      },
      { t: 'h2', texte: 'Bien commencer' },
      {
        t: 'ul',
        items: [
          'commencez doucement et laissez votre corps s’adapter',
          'entraînez-vous avec des coachs qualifiés qui corrigent vos gestes',
          'fixez-vous des objectifs clairs',
          'soyez régulier',
          'soignez votre récupération : étirements, hydratation, sommeil',
        ],
      },
      { t: 'p', texte: 'Chez Hygie, le [forfait cross training](/sport/cross-training) propose une séance par semaine en petit groupe, à six au plus.' },
    ],
  },
  {
    slug: 'sport-en-entreprise',
    titre: 'Le sport en entreprise, un levier de santé',
    date: '2025-01-27',
    categorie: 'entreprises',
    auteur: johan,
    photo: 'groupeExterieur',
    vignette: 'Entreprises',
    chapo:
      'Intégrer le sport à la vie professionnelle améliore la santé des salariés, la cohésion des équipes et l’image de l’entreprise. Voici pourquoi, et comment s’y prendre.',
    description:
      'Santé des salariés, cohésion, marque employeur : ce que le sport apporte à l’entreprise, et comment Hygie construit un programme sur mesure à Avon.',
    corps: [
      { t: 'h2', texte: 'Ce que le sport apporte aux salariés' },
      {
        t: 'p',
        texte:
          'L’activité physique réduit le stress, améliore le sommeil et aide à prévenir les troubles musculo-squelettiques, fréquents au bureau. Des séances de renforcement ciblées corrigent les postures et soulagent les douleurs.',
      },
      { t: 'p', texte: 'Le sport favorise aussi l’humeur et la concentration : une pause active dans la journée aide à repartir l’esprit plus clair.' },
      { t: 'h2', texte: 'Ce qu’il apporte à l’entreprise' },
      {
        t: 'ul',
        items: [
          'des collaborateurs en meilleure santé, moins exposés à l’absentéisme',
          'une cohésion renforcée : les séances collectives créent du lien et rapprochent managers et équipes',
          'une marque employeur valorisée, qui attire et fidélise',
          'des compétences entretenues : discipline, gestion du stress, travail en équipe',
        ],
      },
      { t: 'h2', texte: 'L’offre Hygie' },
      {
        t: 'ul',
        items: [
          'une équipe pluridisciplinaire : préparateurs physiques, coachs et professionnels de santé',
          'des programmes sur mesure : prévention des troubles musculo-squelettiques, gestion du stress, team building, remise en forme',
          'des bilans réalisés par nos kinésithérapeutes pour mesurer l’état de forme de chacun',
          'un suivi pour mesurer les progrès et ajuster le programme',
        ],
      },
      { t: 'h2', texte: 'Comment commencer' },
      {
        t: 'p',
        texte:
          'Contactez-nous pour parler de vos besoins : nous construisons avec vous un programme adapté à la culture de votre entreprise. Une séance d’essai permet à vos collaborateurs de découvrir le centre et la méthode.',
      },
      { t: 'p', texte: 'Découvrez [nos forfaits entreprises](/entreprises).' },
    ],
  },
  {
    slug: 'football-athlete-complet',
    titre: 'Football : devenir un athlète complet',
    date: '2025-01-27',
    categorie: 'sport',
    auteur: johan,
    photo: 'dribble',
    vignette: 'Football',
    chapo:
      'Pour briller sur le terrain, la technique ne suffit plus. Voici pourquoi les jeunes footballeurs ont intérêt à travailler leur condition physique en dehors du club.',
    description:
      'Proprioception, coordination, prévention des blessures : pourquoi et comment un jeune footballeur travaille sa condition physique avec Hygie, à Avon.',
    corps: [
      { t: 'h2', texte: 'Au-delà de la technique' },
      {
        t: 'p',
        texte:
          'Le football demande de la force, de l’explosivité, de la coordination et une bonne résistance aux blessures. Travailler ces qualités change votre jeu.',
      },
      {
        t: 'ul',
        items: [
          'la proprioception, pour être plus stable sur vos appuis et plus efficace dans les duels',
          'la coordination et l’agilité, pour des mouvements fluides et des changements de direction rapides',
          'la prévention des blessures : entorses et déchirures se préviennent par le renforcement et la stabilité des appuis',
        ],
      },
      { t: 'h2', texte: 'La préparation physique chez Hygie' },
      { t: 'p', texte: 'Nous ne proposons pas d’entraînement de football : nous travaillons votre condition d’athlète pour qu’elle serve votre jeu.' },
      {
        t: 'ul',
        items: [
          'des programmes sur mesure, construits à partir de vos besoins',
          'des préparateurs physiques spécialisés dans l’accompagnement des sportifs',
          'des équipements issus du sport de haut niveau',
          'un environnement motivant, avec d’autres joueurs qui partagent vos ambitions',
        ],
      },
      {
        t: 'p',
        texte: 'Réservez votre [séance d’essai](/rendez-vous?motif=sport&objet=essai). Vous êtes un club ? Découvrez [nos offres pour les clubs](/clubs).',
      },
    ],
  },
  {
    slug: 'test-isocinetique',
    titre: 'Le test isocinétique, c’est quoi ?',
    date: '2024-11-21',
    categorie: 'bilans',
    auteur: johan,
    photo: 'presseJambes',
    vignette: 'Isocinétique',
    chapo:
      'Rééducation, prévention des blessures, performance : le test isocinétique est devenu un outil de référence. À Avon, Hygie le met à la portée des patients comme des sportifs.',
    description:
      'Principe, intérêts et indications du test isocinétique, outil de référence de la rééducation et de la prévention des blessures, au centre Hygie d’Avon.',
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Le test mesure la force musculaire à vitesse constante. Comme la machine maintient cette vitesse tout au long du mouvement, les résultats sont fiables et comparables d’un test à l’autre.',
      },
      { t: 'h2', texte: 'Ce qu’il apporte' },
      {
        t: 'ul',
        items: [
          'une mesure précise de la force maximale, dans différentes amplitudes',
          'le suivi d’une rééducation, en comparant les mesures dans le temps',
          'une préparation physique ajustée aux besoins de chaque athlète',
          'la prévention des blessures, grâce aux déséquilibres repérés',
        ],
      },
      { t: 'h2', texte: 'Quand le réaliser' },
      {
        t: 'ul',
        items: [
          'avant le retour au sport après une blessure, pour vérifier l’équilibre entre muscles agonistes et antagonistes',
          'dans le cadre d’un bilan de santé ou de performance',
          'avant une compétition importante, pour repérer un point faible',
          'chez les sportifs plus âgés ou déjà blessés, pour prévenir les problèmes liés à la faiblesse musculaire',
        ],
      },
      { t: 'h2', texte: 'Au centre Hygie' },
      {
        t: 'p',
        texte:
          'Le centre est équipé pour réaliser des tests isocinétiques dans de bonnes conditions, encadrés par des professionnels qualifiés. La [réservation se fait en ligne](/bilans/isocinetique).',
      },
    ],
  },
  {
    slug: 'mobilite-fonctionnelle',
    titre: 'La mobilité fonctionnelle, clé de la performance',
    date: '2024-11-05',
    categorie: 'sport',
    auteur: johan,
    photo: 'etirement',
    vignette: 'Mobilité',
    chapo:
      'La mobilité fonctionnelle désigne la capacité à bouger efficacement et sans douleur. Souvent négligée, elle conditionne pourtant la performance et la prévention des blessures.',
    description: 'Ce qu’est la mobilité fonctionnelle, pourquoi elle compte pour la performance et la prévention des blessures, et comment l’améliorer.',
    corps: [
      { t: 'h2', texte: 'Plus que de la souplesse' },
      {
        t: 'p',
        texte:
          'La mobilité fonctionnelle réunit souplesse, force et coordination. Là où la souplesse mesure l’amplitude d’une articulation, la mobilité évalue votre capacité à utiliser cette amplitude dans les gestes de votre sport.',
      },
      { t: 'h2', texte: 'Pourquoi elle compte' },
      {
        t: 'ul',
        items: [
          'moins de blessures : des muscles et des articulations mobiles supportent mieux les efforts intenses',
          'plus de performance : des hanches et des chevilles mobiles améliorent le saut et les changements de direction',
          'une récupération facilitée, et un retour plus rapide à l’amplitude normale après une blessure',
        ],
      },
      { t: 'h2', texte: 'Comment l’améliorer' },
      {
        t: 'ul',
        items: [
          'l’échauffement dynamique, qui prépare articulations et muscles avant l’effort',
          'les étirements actifs, qui font gagner de l’amplitude sans perdre de force',
          'le renforcement polyarticulaire : squats, fentes, soulevés de terre',
          'les techniques de mobilisation : rouleau, balle de massage, relâchement myofascial',
        ],
      },
      {
        t: 'p',
        texte: 'Le [bilan fonctionnel](/bilans/fonctionnel) mesure vos restrictions de mobilité et oriente le travail d’étirement et de renforcement.',
      },
    ],
  },
  {
    slug: 'methode-hygie',
    titre: 'La méthode Hygie, du bilan à l’autonomie',
    date: '2024-09-29',
    categorie: 'methode',
    auteur: johan,
    photo: 'coachTablette',
    vignette: 'Méthode',
    chapo:
      'Et si chacun s’entraînait comme un sportif de haut niveau ? C’est le principe de la méthode Hygie : partir d’un bilan physiologique complet pour construire un accompagnement sur mesure.',
    description: 'Bilan de départ, accompagnement individualisé, objectifs variés : comment fonctionne la méthode Hygie Sport Santé et Performance, à Avon.',
    corps: [
      { t: 'h2', texte: 'Un bilan de départ complet' },
      { t: 'p', texte: 'Tout commence par un état des lieux précis de votre corps. Il comprend plusieurs évaluations :' },
      {
        t: 'ul',
        items: [
          'la mobilité fonctionnelle, pour repérer restrictions et compensations, et cibler étirements et renforcement',
          'la force musculaire, pour détecter les asymétries qui exposent aux blessures',
          'les capacités aérobies, par un test de marche ou la mesure de vos zones d’entraînement avec l’analyseur PNOE',
          'la composition corporelle, par impédancemétrie si nécessaire',
          'les sauts sur plateforme de force, pour mesurer puissance et explosivité',
        ],
      },
      { t: 'h2', texte: 'Un accompagnement individualisé' },
      {
        t: 'p',
        texte:
          'À partir des résultats et de vos objectifs, nos préparateurs physiques conçoivent vos séances. Chaque programme est unique, parce que chaque corps l’est.',
      },
      { t: 'h2', texte: 'Des objectifs variés' },
      {
        t: 'ul',
        items: [
          'reprendre le sport après une blessure ou une longue pause',
          'prévenir les blessures en renforçant les zones fragiles',
          'optimiser vos performances',
          'perdre du poids de façon saine et durable',
          'gagner en autonomie pour continuer à progresser seul',
        ],
      },
      { t: 'p', texte: 'Envie de commencer ? Votre [première séance est offerte](/rendez-vous?motif=sport&objet=essai).' },
    ],
  },
];

export function articlesTries() {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function trouverArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function tempsDeLecture(a: Article) {
  const texte = [
    a.chapo,
    ...a.corps.flatMap((b) => ('texte' in b ? [b.texte] : 'items' in b && Array.isArray(b.items) ? b.items.map((i) => (typeof i === 'string' ? i : '')) : [])),
  ].join(' ');
  const mots = texte.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 200));
}

export function dateLongue(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(`${iso}T12:00:00`));
}

export function dateCourte(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(`${iso}T12:00:00`));
}
