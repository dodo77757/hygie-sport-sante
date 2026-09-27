/* Les pôles et leurs fiches (gabarit Article).
   Textes : « Hygie — Textes du site, page par page » (25 septembre 2026). « Texte actuel conservé » : questions fréquentes
   de la kinésithérapie, de l'orthoptie, du sport-santé, du cross training, de la pressothérapie et des bilans ; page Orthoptie ;
   limites du conseil en nutrition. Valeurs à renseigner : content/valeurs.ts.
   seo.title est le titre complet de la page, utilisé tel quel. */
import type { Action, Bloc } from './types';
import type { PhotoKey } from './images';
import { bilanPar, texteBilanEntree } from './bilans';
import { site } from './site';
import { aRenseigner, LIEN_ESSAI, SUR_DEMANDE, siRenseigne } from './valeurs';

export type Pole = 'sante' | 'sport' | 'recuperation' | 'bilans';

export type CouleurPole = 'bleu' | 'jaune' | 'gris' | 'encre';

export const poles: Record<
  Pole,
  { nom: string; etiquette: string; href: string; couleur: CouleurPole; chapo: string; seo: { title: string; description: string } }
> = {
  sante: {
    nom: 'Santé',
    etiquette: 'Santé',
    href: '/sante',
    couleur: 'bleu',
    chapo:
      'Kinésithérapeutes, étiopathe et orthoptiste consultent au centre. Chacun exerce en libéral, avec son propre agenda en ligne. Tous travaillent en lien avec les préparateurs physiques : quand la rééducation se termine, l’entraînement prend le relais sans rupture.',
    seo: {
      title: 'Kiné, étiopathe et orthoptiste à Avon (77) · Hygie',
      description: '10 kinésithérapeutes, 1 étiopathe et 1 orthoptiste au centre Hygie d’Avon. Rendez-vous en ligne auprès de chaque praticien.',
    },
  },
  sport: {
    nom: 'Sport',
    etiquette: 'Sport',
    href: '/sport',
    couleur: 'jaune',
    chapo:
      'Coaching individuel, sport-santé en petit groupe, cross training ou préparation spécifique à votre discipline : nos préparateurs physiques construisent chaque séance à partir d’un bilan chiffré.',
    seo: {
      title: 'Coaching sportif et préparation physique à Avon · Hygie',
      description:
        'Coaching individuel, sport-santé, cross training et préparation par discipline avec des préparateurs physiques diplômés à Avon. Essai offert.',
    },
  },
  recuperation: {
    nom: 'Récupération & bien-être',
    etiquette: 'Récupération',
    href: '/recuperation',
    couleur: 'gris',
    chapo:
      'L’entraînement ne fait progresser que si l’on récupère. Pressothérapie, massages et conseil en nutrition complètent votre suivi, que vous sortiez d’une compétition ou d’une semaine chargée.',
    seo: {
      title: 'Récupération à Avon : pressothérapie, massages, nutrition',
      description:
        'Pressothérapie, massages bien-être et conseil en nutrition au centre Hygie d’Avon (77), pour récupérer après l’effort et prendre soin de soi.',
    },
  },
  bilans: {
    nom: 'Bilans',
    etiquette: 'Bilans',
    href: '/bilans',
    couleur: 'encre',
    chapo:
      'Force, asymétries, mobilité, puissance, endurance : nos bilans font l’état des lieux de votre corps avec les outils des clubs professionnels. Vous repartez avec un compte rendu chiffré et vos priorités de travail.',
    seo: {
      title: 'Bilans physiologiques à Avon : isocinétique, force, sauts',
      description:
        'Bilan isocinétique, force musculaire, fonctionnel, sauts, profil force-vitesse et aérobie à Avon (77). Compte rendu chiffré, réservation en ligne.',
    },
  },
};

export type Soin = {
  pole: Pole;
  slug: string;
  nom: string;
  carte: { titre?: string; extrait: string; meta: string };
  chapo: string;
  /** Action principale, affichée sous le chapo */
  action: Action;
  photo?: PhotoKey;
  seo: { title: string; description: string };
  corps: Bloc[];
  proches: string[];
};

/* Rendez-vous par l'accueil (massages, nutrition, réathlétisation, bilans sans lien de réservation) */
const appelAccueil: Action = { label: `Appeler le ${site.telephone.affichage}`, href: site.telephone.lien };

const bilanAction = (id: string, label = 'Réserver le bilan'): Action => {
  const b = bilanPar(id);
  return b.reservation.startsWith('tel:') ? appelAccueil : { label, href: b.reservation };
};

const essai: Action = { label: 'Réserver l’essai', href: LIEN_ESSAI };

const v = aRenseigner;

/* Détail d'une ligne de tableau : le texte, puis la durée si elle est renseignée */
const avecDuree = (texte: string, duree: string) => [texte, duree].filter(Boolean).join(' · ');

export const soins: Soin[] = [
  /* ---------------- Santé ---------------- */
  {
    pole: 'sante',
    slug: 'kinesitherapie',
    nom: 'Kinésithérapie',
    carte: {
      extrait: 'Rééducation fonctionnelle et post-opératoire, kinésithérapie du sport, santé de la femme.',
      meta: '10 kinésithérapeutes · Doctolib',
    },
    chapo:
      'Dix kinésithérapeutes consultent au centre, chacun avec ses spécialités, du sport à la santé de la femme. Choisissez le vôtre et réservez directement sur Doctolib.',
    action: { label: 'Choisir un kiné', href: '#praticiens' },
    photo: 'kine',
    seo: {
      title: 'Kinésithérapeute à Avon : rééducation et kiné du sport',
      description: '10 kinés au centre Hygie d’Avon : rééducation post-opératoire, kiné du sport, périnée, pré et post-partum. Rendez-vous sur Doctolib.',
    },
    corps: [
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Toute personne qui a besoin d’une rééducation, sur prescription médicale : après une blessure, une opération ou pour une douleur qui dure. Les sportifs bénéficient en plus d’un plateau technique partagé avec les préparateurs physiques : isocinétisme, plateformes de force, capteurs de force.',
      },
      { t: 'h2', texte: 'Nos kinésithérapeutes', id: 'praticiens' },
      { t: 'praticiens', discipline: 'kinesitherapie' },
      { t: 'h2', texte: 'Honoraires' },
      {
        t: 'p',
        texte:
          'Les tarifs varient selon le praticien et l’acte. Certains kinésithérapeutes du centre appliquent des dépassements d’honoraires : demandez le montant à votre praticien avant la première séance.',
      },
      { t: 'h2', texte: 'Après la rééducation' },
      {
        t: 'p',
        texte:
          'Au centre, la rééducation se prolonge naturellement : un [bilan isocinétique](/bilans/isocinetique) objective votre récupération avant la reprise, puis un [coaching individuel](/sport/coaching-individuel) vous ramène à votre niveau, en sécurité, avec des critères de retour au sport mesurés.',
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'Faut-il une ordonnance ?',
            r: 'Le plus souvent, oui : pour être remboursées, les séances doivent être prescrites par un médecin. Apportez votre ordonnance à la première séance ; le kinésithérapeute fait alors son bilan et fixe le nombre de séances avec vous.',
          },
          {
            q: 'Les séances sont-elles remboursées ?',
            r: 'Oui, sur prescription : l’Assurance maladie prend en charge 60 % du tarif conventionnel et votre mutuelle le complément. Les kinésithérapeutes du centre pratiquent des dépassements d’honoraires, remboursés ou non selon votre contrat de mutuelle : demandez-leur le montant avant la première séance.',
          },
          {
            q: 'Combien de temps dure une séance ?',
            r: 'Environ trente minutes. Votre kinésithérapeute adapte la durée et le rythme des séances à votre prise en charge.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Votre ordonnance, votre carte Vitale et votre carte de mutuelle, vos comptes rendus (imagerie, opération) et une tenue souple qui laisse accès à la zone à traiter.',
          },
        ],
      },
    ],
    proches: ['/sante/etiopathie', '/bilans/isocinetique', '/sport/reathletisation'],
  },
  {
    pole: 'sante',
    slug: 'etiopathie',
    nom: 'Étiopathie',
    carte: {
      extrait: 'Rechercher l’origine mécanique d’une douleur et la traiter par des gestes manuels précis, sans médicament.',
      meta: '1 étiopathe · Réservation en ligne',
    },
    chapo:
      'L’étiopathie recherche la cause mécanique de vos douleurs pour la traiter à la main, sans médicament. Le plus souvent, peu de séances sont nécessaires.',
    action: { label: 'Prendre rendez-vous', href: '#praticiens' },
    photo: 'manipulation',
    seo: {
      title: 'Étiopathe à Avon : dos, articulations, sportifs · Hygie',
      description: 'Consultations d’étiopathie à Avon (77) avec Johan Pereira : dos, nuque, articulations, tendons, sportifs. Sans ordonnance.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'L’étiopathe analyse le mécanisme de votre douleur pour remonter à sa cause, puis agit par des manipulations précises. C’est une démarche fondée sur le raisonnement : chaque geste répond à une hypothèse posée pendant le bilan.',
      },
      {
        t: 'p',
        texte: 'Une douleur ignorée a tendance à s’installer : raideur, perte de mobilité, compensations. Consulter tôt limite ces effets.',
      },
      { t: 'h2', texte: 'Motifs fréquents de consultation' },
      {
        t: 'ul',
        items: [
          'Le dos et la nuque : lumbago, sciatique, torticolis, névralgie d’Arnold ou cervico-brachiale',
          'Les articulations et les tendons : suites d’entorse, tendinite, canal carpien, douleurs d’épaule, de coude, de genou ou de cheville',
          'Les troubles fonctionnels digestifs et ORL, en complément du suivi médical',
          'Les sportifs : douleurs liées à l’entraînement, préparation d’une échéance, retour après blessure',
        ],
      },
      {
        t: 'note',
        texte:
          'L’étiopathie ne remplace pas un avis médical. En cas de symptôme inhabituel, de fièvre ou d’une douleur qui persiste, consultez d’abord votre médecin.',
      },
      { t: 'h2', texte: 'Déroulé d’une séance' },
      {
        t: 'p',
        texte:
          'La séance commence par un interrogatoire et un examen pour comprendre votre douleur et son histoire. Le praticien traite ensuite la cause identifiée par des techniques manuelles adaptées à votre âge et à votre condition. Il vous indique dès la première séance si un suivi est utile, ou s’il faut vous orienter vers un médecin ou un kiné.',
      },
      { t: 'h2', texte: 'Votre étiopathe', id: 'praticiens' },
      { t: 'praticiens', discipline: 'etiopathie' },
      { t: 'h2', texte: 'Tarif et remboursement' },
      {
        t: 'p',
        texte: [
          ...siRenseigne(v.prix.etiopathie, (prix) => `Consultation : ${prix}.`),
          'L’étiopathie n’est pas remboursée par la Sécurité sociale. De nombreuses mutuelles prennent en charge tout ou partie des séances dans leur forfait « médecines douces » : demandez une facture à votre étiopathe.',
        ].join(' '),
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Faut-il une ordonnance ?', r: 'Non, l’étiopathie se consulte en accès direct.' },
          { q: 'Combien de séances faut-il ?', r: 'Cela dépend du motif ; l’étiopathe vous l’indique après son bilan.' },
          { q: 'Que dois-je apporter ?', r: 'Vos examens s’ils existent (radiographies, IRM, comptes rendus) et une tenue confortable.' },
        ],
      },
    ],
    proches: ['/sante/kinesitherapie', '/sante/orthoptie', '/recuperation/massages'],
  },
  {
    pole: 'sante',
    slug: 'orthoptie',
    nom: 'Orthoptie',
    carte: {
      extrait: 'Dépistage, bilans orthoptiques et neurovisuels, rééducation, renouvellement de lunettes, suivi après commotion.',
      meta: '1 orthoptiste · Doctolib',
    },
    chapo:
      'L’orthoptiste dépiste et rééduque les troubles de la vision, du nourrisson de 9 mois à l’adulte. Au centre, elle accompagne aussi les sportifs après une commotion.',
    action: { label: 'Réserver sur Doctolib', href: 'https://www.doctolib.fr/orthoptiste/avon/marie-couineau?pid=practice-466521' },
    photo: 'vision',
    seo: {
      title: 'Orthoptiste à Avon : bilans visuels et neurovisuels · Hygie',
      description:
        'Marie Couineau, orthoptiste à Avon : dépistage dès 9 mois, bilans neurovisuels, rééducation, suivi après commotion et renouvellement de lunettes.',
    },
    corps: [
      { t: 'h2', texte: 'Quand consulter' },
      { t: 'h3', texte: 'Les bébés' },
      {
        t: 'p',
        texte:
          'Un dépistage est recommandé pour tous les enfants dès 9 mois. Il recherche trois troubles : l’amblyopie, les fortes amétropies (myopie, hypermétropie, astigmatisme) et le strabisme.',
      },
      {
        t: 'p',
        texte:
          'Consultez si votre bébé ne suit pas du regard un objet qui bouge, louche après 6 mois, plisse ou ferme un œil, pleure quand on lui cache un œil ou se cogne souvent.',
      },
      { t: 'h3', texte: 'Les enfants' },
      {
        t: 'p',
        texte: 'La Haute Autorité de santé recommande un bilan visuel vers 2 ou 3 ans, puis vers 5 ou 6 ans. À l’école, certains signes doivent alerter :',
      },
      {
        t: 'ul',
        items: [
          'des sauts de lettres, de mots ou de lignes à la lecture ou à la copie',
          'une lenteur et une fatigue qui augmentent au fil de la journée',
          'de meilleurs résultats à l’oral qu’à l’écrit',
          'des difficultés en géométrie ou pour écrire sur la ligne',
          'des maux de tête pendant le travail, des yeux qui pleurent, une mauvaise posture',
        ],
      },
      { t: 'h3', texte: 'Les adultes' },
      {
        t: 'p',
        texte:
          'Maux de tête, fatigue visuelle, vertiges, vision double ou trouble, mal des transports, gêne à la conduite de nuit ou difficultés d’adaptation aux lunettes : l’orthoptiste évalue ces troubles et propose une rééducation adaptée.',
      },
      { t: 'h3', texte: 'Les sportifs' },
      {
        t: 'p',
        texte:
          'Après une commotion cérébrale, des symptômes peuvent persister : maux de tête, sensibilité à la lumière, vertiges, nausées, troubles de la concentration ou de la mémoire. Ils augmentent souvent après un effort, et une prise en charge neurovisuelle permet de les travailler.',
      },
      {
        t: 'p',
        texte:
          'Au centre, le suivi neurovisuel après commotion se coordonne avec le kiné et le préparateur physique, pour une reprise progressive et encadrée.',
      },
      {
        t: 'p',
        texte:
          'Sans symptôme, le travail neurovisuel sert aussi la performance : temps de réaction, anticipation, lecture des trajectoires et vision périphérique.',
      },
      { t: 'h2', texte: 'Renouveler vos lunettes' },
      {
        t: 'p',
        texte:
          'L’orthoptiste peut renouveler vos lunettes et vos lentilles à partir de votre dernière ordonnance, sauf opposition du médecin. Celle-ci doit dater de moins de :',
      },
      {
        t: 'ul',
        items: [
          'pour les lunettes : 1 an avant 16 ans, 5 ans de 16 à 42 ans, 3 ans après 42 ans',
          'pour les lentilles : 1 an avant 16 ans, 3 ans après 16 ans',
        ],
      },
      { t: 'h2', texte: 'Prendre rendez-vous' },
      { t: 'praticiens', discipline: 'orthoptie' },
      {
        t: 'note',
        texte: 'Pour un bilan orthoptique ou neurovisuel, si aucun créneau n’apparaît en ligne, écrivez à l’orthoptiste via la messagerie Doctolib.',
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'Faut-il une ordonnance ?',
            r: 'Pour un bilan ou une rééducation remboursés, oui : la prescription vient d’un médecin (ophtalmologiste, généraliste, pédiatre…). Le renouvellement de lunettes ou de lentilles, le dépistage et le travail de performance visuelle se font sans ordonnance.',
          },
          {
            q: 'Les séances sont-elles remboursées ?',
            r: 'Sur prescription, le bilan et les séances d’orthoptie sont pris en charge à 60 % du tarif conventionnel par l’Assurance maladie, avec le complément de votre mutuelle.',
          },
          {
            q: 'Combien de temps dure un bilan ?',
            r: 'Comptez environ quarante-cinq minutes pour un bilan orthoptique, davantage pour un bilan neurovisuel complet.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'L’ordonnance et la carte Vitale, votre dernière ordonnance de lunettes ou de lentilles et vos lunettes actuelles. Pour un enfant, les bilans déjà réalisés (orthophonie, psychomotricité, école).',
          },
        ],
      },
    ],
    proches: ['/sante/kinesitherapie', '/sante/etiopathie', '/bilans/fonctionnel'],
  },

  /* ---------------- Sport ---------------- */
  {
    pole: 'sport',
    slug: 'coaching-individuel',
    nom: 'Coaching individuel',
    carte: {
      extrait: 'Une à trois séances individuelles par semaine avec un préparateur physique, construites à partir de votre bilan.',
      meta: 'Dès 140 € par mois',
    },
    chapo:
      'Une à trois séances individuelles par semaine avec un préparateur physique, construites à partir de votre bilan. Votre première séance d’une heure est offerte.',
    action: essai,
    photo: 'coachPompes',
    seo: {
      title: 'Coaching sportif individuel à Avon, dès 140 € par mois',
      description:
        'Séances individuelles avec un préparateur physique, à partir d’un bilan physiologique. 1, 2 ou 3 séances par semaine. Première séance offerte.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Tout commence par un bilan physiologique : mobilité, force, asymétries, explosivité et objectifs. Votre préparateur en tire un programme écrit, puis ajuste chaque séance à votre forme du jour. Des bilans intermédiaires mesurent vos progrès et recalent le programme.',
      },
      {
        t: 'p',
        texte: 'Reprise après une blessure, prévention, perte de poids, performance ou autonomie au quotidien : la méthode s’adapte à votre objectif.',
      },
      { t: 'h2', texte: 'Nos formules' },
      {
        t: 'tarifs',
        items: [
          { nom: 'Essentiel', detail: '1 séance individuelle par semaine', prix: '140 € / mois' },
          { nom: 'Avancé', detail: '2 séances individuelles par semaine', prix: '250 € / mois' },
          { nom: 'Performance', detail: '3 séances individuelles par semaine et accès prioritaire aux praticiens du centre', prix: '300 € / mois' },
        ],
      },
      { t: 'p', texte: 'Le bilan physiologique d’entrée (145 €) est offert pour un engagement de trois mois.' },
      { t: 'h3', texte: 'Bilan physiologique d’entrée' },
      { t: 'p', texte: texteBilanEntree },
      { t: 'h2', texte: 'Ce que comprend votre suivi' },
      {
        t: 'ul',
        items: [
          'Un bilan d’entrée et un compte rendu chiffré',
          'Un préparateur référent qui suit votre dossier',
          'Un programme écrit, ajusté à chaque séance',
          'Des bilans intermédiaires pour mesurer vos progrès',
          'Un lien direct avec les kinés et l’étiopathe du centre en cas de douleur',
        ],
      },
      { t: 'h2', texte: 'Séance d’essai' },
      {
        t: 'p',
        texte: 'Votre première séance d’une heure est gratuite et sans engagement : faire connaissance, parler de vos objectifs, tester la méthode.',
      },
      { t: 'actions', items: [{ ...essai, variant: 'solid' }] },
      { t: 'h2', texte: 'Vos préparateurs' },
      {
        t: 'p',
        texte: 'Johan Pereira, Martin Tondeur et Jean-Étienne Boilot, préparateurs physiques diplômés, vous accompagnent.',
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Faut-il déjà être sportif ?', r: 'Non. Le programme part de votre bilan et de vos objectifs, quel que soit votre niveau.' },
          {
            q: 'Le coaching est-il remboursé ?',
            r: 'Non, ce n’est pas un soin médical. Certaines mutuelles et comités d’entreprise participent aux activités physiques.',
          },
          { q: 'Que dois-je apporter ?', r: 'Une tenue de sport, des chaussures propres pour la salle, une bouteille d’eau et une serviette.' },
          { q: 'Puis-je changer de formule ?', r: 'Oui, les formules sont mensuelles et s’ajustent avec votre préparateur.' },
          {
            q: 'Comment arrêter ?',
            r: 'L’abonnement est mensuel et se renouvelle chaque mois ; prévenez l’accueil avant le prochain prélèvement.',
          },
        ],
      },
    ],
    proches: ['/bilans/fonctionnel', '/sport/cross-training', '/sport/sport-sante'],
  },
  {
    pole: 'sport',
    slug: 'sport-sante',
    nom: 'Sport-santé',
    carte: {
      extrait: 'Renforcement, mobilité et prévention des chutes, adaptés à votre état de santé.',
      meta: 'Groupes de 4 · 2 séances par semaine',
    },
    chapo:
      'Deux séances par semaine en groupe de quatre pour renforcer votre corps, gagner en mobilité et prévenir les chutes. Un programme pensé pour le bien-être au quotidien.',
    action: { label: 'Demander un créneau', href: '/rendez-vous?motif=sport&objet=sport-sante' },
    photo: 'senior',
    seo: {
      title: 'Sport-santé et activité physique adaptée à Avon · Hygie',
      description:
        'Renforcement, mobilité et prévention des chutes en groupe de 4, deux fois par semaine. Sport sur ordonnance, partenaire Maison Sport-Santé.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Les séances associent renforcement musculaire, équilibre et mobilité. À quatre, l’encadrant corrige chacun et adapte les exercices séance après séance.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Les personnes qui reprennent une activité, avancent en âge ou vivent avec une maladie chronique. Les séances s’adaptent à votre état de santé, y compris dans le cadre du sport sur ordonnance. Hygie est partenaire de la Maison Sport-Santé de Fontainebleau.',
      },
      { t: 'h2', texte: 'Le déroulé' },
      {
        t: 'ol',
        items: [
          'Un bilan d’entrée : force de préhension, équilibre, mobilité, test de marche.',
          'Deux séances par semaine en groupe de quatre.',
          'Un bilan de suivi pour mesurer les progrès et ajuster.',
        ],
      },
      { t: 'h2', texte: 'Tarif' },
      {
        t: 'p',
        texte: [...siRenseigne(v.prix.sportSante, (prix) => `${prix} par mois.`), 'Contactez-nous pour les prochains créneaux.'].join(' '),
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'Qu’est-ce que le sport sur ordonnance ?',
            r: 'Depuis 2017, un médecin peut prescrire une activité physique adaptée aux personnes atteintes d’une maladie chronique ou d’une affection de longue durée. Nos éducateurs construisent alors les séances à partir de cette prescription.',
          },
          {
            q: 'Est-ce remboursé ?',
            r: 'L’activité physique adaptée n’est pas remboursée par la Sécurité sociale. Certaines mutuelles et collectivités participent à son financement : renseignez-vous auprès de la vôtre.',
          },
          {
            q: 'Faut-il un certificat médical ?',
            r: 'Si vous vivez avec une maladie chronique ou reprenez après une longue interruption, l’avis de votre médecin est demandé, sous forme de prescription ou de certificat. Il guide l’éducateur pour adapter les exercices.',
          },
          {
            q: 'Comment se déroulent les séances ?',
            r: 'Après un bilan d’entrée, deux séances par semaine en groupe de quatre personnes, avec des exercices progressifs, adaptés au niveau de chacun.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Une tenue souple, des chaussures de sport propres, de l’eau, et votre prescription ou certificat lors de la première séance.',
          },
        ],
      },
    ],
    proches: ['/sport/coaching-individuel', '/bilans/fonctionnel', '/recuperation/pressotherapie'],
  },
  {
    pole: 'sport',
    slug: 'cross-training',
    nom: 'Cross training',
    carte: {
      extrait: 'Force, endurance et mobilité en petit groupe, une séance par semaine sur un créneau réservé.',
      meta: '60 € par mois · 6 personnes au plus',
    },
    chapo:
      'Une séance par semaine sur un créneau réservé, à six au plus. Force, endurance et mobilité progressent ensemble, sans négliger la prévention des blessures.',
    action: essai,
    photo: 'kettlebell',
    seo: {
      title: 'Cross training en petit groupe à Avon, 60 € par mois',
      description: 'Force, endurance et mobilité en groupe de six au plus, une séance par semaine sur un créneau réservé. Préparation Hyrox. Essai offert.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Des séances variées qui combinent haltérophilie technique, gymnastique et travail cardio. Le petit groupe garde l’énergie du collectif et laisse au coach le temps de corriger chaque geste.',
      },
      { t: 'h2', texte: 'Pour qui' },
      { t: 'p', texte: 'Du débutant au confirmé, et pour préparer un Hyrox. Chaque mouvement se décline à votre niveau.' },
      { t: 'h2', texte: 'Formule' },
      {
        t: 'tarifs',
        items: [{ nom: 'Forfait cross training', detail: '1 séance par semaine sur un créneau réservé, 6 personnes au plus', prix: '60 € / mois' }],
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'Faut-il un niveau minimum ?',
            r: 'Non. Chaque mouvement se décline du débutant au confirmé et le coach corrige les gestes : le groupe de six personnes au plus le permet.',
          },
          { q: 'Puis-je essayer avant de m’engager ?', r: 'Oui, la première séance est offerte. Réservez-la depuis la page de rendez-vous.' },
          {
            q: 'Est-ce remboursé ?',
            r: 'Non, c’est une activité sportive. Certaines mutuelles et comités d’entreprise participent aux activités physiques : renseignez-vous auprès des vôtres.',
          },
          { q: 'Que dois-je apporter ?', r: 'Une tenue de sport, des chaussures propres pour la salle, une bouteille d’eau et une serviette.' },
        ],
      },
    ],
    proches: ['/sport/coaching-individuel', '/bilans/sauts-force-vitesse', '/bilans/aerobie'],
  },
  {
    pole: 'sport',
    slug: 'reathletisation',
    nom: 'Réathlétisation',
    carte: {
      extrait: 'Le pont entre la fin de la rééducation et le retour au terrain, avec des critères de reprise mesurés.',
      meta: 'Sur devis',
    },
    chapo:
      'La rééducation vous rend la fonction ; la réathlétisation vous rend le terrain. Nous faisons le lien entre les deux, avec des critères de reprise mesurés.',
    action: appelAccueil,
    photo: 'traineau',
    seo: {
      title: 'Réathlétisation et retour au sport à Avon · Hygie',
      description:
        'Après une blessure ou une opération, un retour au terrain encadré par critères mesurés : isocinétisme, sauts, force. Lien direct avec votre kiné.',
    },
    corps: [
      { t: 'h2', texte: 'Le parcours' },
      {
        t: 'ol',
        items: [
          'Bilan de départ en lien avec votre kiné : isocinétisme, force, sauts.',
          'Reconstruction : force, puissance, course, changements de direction, spécifique à votre sport.',
          'Tests de retour au sport : asymétries sous les seuils de reprise, qualités athlétiques retrouvées.',
          'Retour progressif à l’entraînement collectif puis à la compétition.',
        ],
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte: 'Les sportifs amateurs comme professionnels, après une rupture du ligament croisé, une lésion musculaire, une entorse grave ou une opération.',
      },
      { t: 'p', texte: 'Tarif : sur devis, selon la durée du protocole.' },
    ],
    proches: ['/sante/kinesitherapie', '/bilans/isocinetique', '/sport/coaching-individuel'],
  },

  /* ---------------- Récupération & bien-être ---------------- */
  {
    pole: 'recuperation',
    slug: 'pressotherapie',
    nom: 'Pressothérapie',
    carte: {
      extrait: 'Des bottes gonflables compressent les jambes par vagues, du pied vers la cuisse, pour des jambes plus légères.',
      meta: '20 € · 30 min',
    },
    chapo:
      'Trente minutes allongé, les jambes dans des bottes qui se gonflent par vagues. La compression stimule la circulation et laisse une sensation de jambes légères.',
    action: { label: 'Réserver une séance', href: '/rendez-vous?motif=recuperation&objet=pressotherapie' },
    photo: 'pressotherapie',
    seo: {
      title: 'Pressothérapie à Avon : 20 € la séance de 30 minutes',
      description:
        'Pressothérapie au centre Hygie d’Avon pour récupérer après l’effort et soulager les jambes lourdes. 20 € les 30 minutes, cartes de 5 et 10.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Des bottes gonflables exercent une pression séquentielle, du pied vers la cuisse. Ce massage mécanique favorise le retour veineux et la circulation lymphatique.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Les sportifs après un effort intense, entre deux séances en période de charge ou avant une compétition, et toute personne qui a souvent les jambes lourdes.',
      },
      { t: 'h2', texte: 'Ce que vous pouvez en attendre' },
      {
        t: 'ul',
        items: ['Une sensation de jambes plus légères', 'Une récupération facilitée entre deux entraînements', 'Un moment de relâchement, allongé au calme'],
      },
      { t: 'h2', texte: 'Avant votre séance' },
      {
        t: 'p',
        texte:
          'Un questionnaire de contre-indications est à remplir avant la première séance. Certains troubles circulatoires (phlébite, thrombose), cardiaques ou rénaux, une infection, une plaie ou une grossesse la contre-indiquent ; l’accord de votre médecin peut être demandé.',
      },
      { t: 'h2', texte: 'Tarifs' },
      {
        t: 'tarifs',
        items: [
          { nom: 'Séance', detail: '30 min', prix: '20 €' },
          { nom: 'Carte de 5 séances', detail: '30 min par séance', prix: v.prix.pressotherapie.carte5 },
          { nom: 'Carte de 10 séances', detail: '30 min par séance', prix: v.prix.pressotherapie.carte10 },
        ],
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Combien de temps dure une séance ?', r: 'Trente minutes, allongé, bottes ou manchons en place.' },
          {
            q: 'Est-ce remboursé ?',
            r: 'Non : en récupération et bien-être, la pressothérapie n’est pas un acte médical pris en charge. Prescrite par un médecin dans le cadre d’un traitement, elle relève alors d’un kinésithérapeute.',
          },
          {
            q: 'Y a-t-il des contre-indications ?',
            r: 'Oui : certains troubles circulatoires (phlébite, thrombose), cardiaques ou rénaux, une infection ou une plaie, une grossesse… Un questionnaire est à remplir avant la première séance ; selon vos réponses, l’accord de votre médecin est demandé.',
          },
          {
            q: 'À quelle fréquence venir ?',
            r: 'Selon votre objectif : ponctuellement après un gros effort ou une compétition, ou régulièrement en période de charge. Les cartes de 5 et 10 séances sont faites pour cela.',
          },
          { q: 'Que dois-je apporter ?', r: 'Rien de particulier. Venez en tenue souple : la séance se fait habillé.' },
        ],
      },
    ],
    proches: ['/recuperation/massages', '/sport/cross-training', '/recuperation/nutrition'],
  },
  {
    pole: 'recuperation',
    slug: 'massages',
    nom: 'Massages bien-être',
    carte: {
      extrait: 'Deep tissue, drainage esthétique, anti-cellulite, avec Malika Pereira.',
      meta: 'Sur rendez-vous',
    },
    chapo: 'Malika Pereira propose des massages de bien-être, du plus profond au plus doux. Chaque séance s’adapte à vos tensions et à vos objectifs.',
    action: appelAccueil,
    photo: 'massage',
    seo: {
      title: 'Massages bien-être à Avon : deep tissue, drainage · Hygie',
      description: 'Massages bien-être deep tissue, drainage esthétique méthode Renata França et anti-cellulite avec Malika Pereira, sur rendez-vous à Avon.',
    },
    corps: [
      { t: 'h2', texte: 'Nos massages' },
      {
        t: 'tarifs',
        items: [
          {
            nom: 'Deep tissue',
            detail: avecDuree('Relâcher les tensions installées, retrouver de la souplesse, récupérer après l’effort', v.durees.massages.deepTissue),
            prix: v.prix.massages.deepTissue,
          },
          {
            nom: 'Drainage méthode Renata França',
            detail: avecDuree(
              'Un drainage tonique et rythmé qui laisse une sensation de corps dégonflé, en cure ou avant un événement',
              v.durees.massages.renataFranca,
            ),
            prix: v.prix.massages.renataFranca,
          },
          {
            nom: 'Drainage doux, méthode Vodder',
            detail: avecDuree('Une technique douce pour des jambes plus légères et une détente profonde', v.durees.massages.vodder),
            prix: v.prix.massages.vodder,
          },
          {
            nom: 'Anti-cellulite',
            detail: avecDuree('Stimuler la circulation, lisser et raffermir l’aspect de la peau', v.durees.massages.antiCellulite),
            prix: v.prix.massages.antiCellulite,
          },
        ],
      },
      {
        t: 'p',
        texte:
          'Ces massages sont des soins de bien-être, sans visée thérapeutique. Pour une rééducation ou un drainage prescrit, adressez-vous aux [kinésithérapeutes du centre](/sante/kinesitherapie).',
      },
      { t: 'h2', texte: 'Prendre rendez-vous' },
      { t: 'p', texte: `Sur rendez-vous, par l’accueil au ${site.telephone.affichage}.` },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Sont-ils remboursés ?', r: 'Non, ce sont des massages bien-être.' },
          {
            q: 'Y a-t-il des contre-indications ?',
            r: 'Oui, surtout pour les drainages (insuffisance cardiaque ou rénale, phlébite, infection) et pendant la grossesse. Signalez tout traitement ou grossesse à la réservation.',
          },
          { q: 'Que dois-je apporter ?', r: 'Rien. Évitez un repas copieux juste avant.' },
        ],
      },
    ],
    proches: ['/recuperation/pressotherapie', '/recuperation/nutrition', '/sante/kinesitherapie'],
  },
  {
    pole: 'recuperation',
    slug: 'nutrition',
    nom: 'Conseil en nutrition',
    carte: {
      extrait: 'Une alimentation équilibrée, adaptée à votre rythme, à votre sport et à vos étapes de vie.',
      meta: 'Sur rendez-vous',
    },
    chapo: 'Une alimentation adaptée à vos besoins, construite à votre rythme. L’accompagnement est personnalisé et s’inscrit dans une démarche de prévention.',
    action: appelAccueil,
    photo: 'nutrition',
    seo: {
      title: 'Conseil en nutrition à Avon · Hygie',
      description:
        'Accompagnement en nutrition à Avon : énergie, poids, performance sportive, grossesse ou ménopause, dans une démarche de prévention, sans régime prescrit.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que l’accompagnement vous apporte' },
      {
        t: 'ul',
        items: [
          'Retrouver de l’énergie au quotidien',
          'Gérer votre poids de façon durable',
          'Comprendre votre alimentation et vos besoins',
          'Soutenir vos entraînements et votre récupération, en lien avec votre préparateur physique',
          'Mieux vivre certaines étapes : grossesse, post-partum, ménopause',
        ],
      },
      { t: 'h2', texte: 'Les limites du conseil en nutrition' },
      {
        t: 'p',
        texte:
          'La conseillère en nutrition n’est ni diététicienne ni médecin. Elle ne pose pas de diagnostic, n’intervient pas sur les pathologies qui demandent un suivi thérapeutique (diabète, maladies cardiovasculaires, troubles du comportement alimentaire) et n’établit pas de régime prescrit.',
      },
      { t: 'p', texte: 'Si votre situation le demande, elle vous oriente vers le professionnel de santé adapté.' },
      { t: 'h2', texte: 'Déroulé' },
      {
        t: 'p',
        texte:
          'Le premier rendez-vous fait le point sur vos habitudes, votre activité, votre sommeil et vos objectifs. Les suivants ajustent le plan, à votre rythme.',
      },
      ...tarifNutrition(),
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Faut-il une ordonnance ?', r: 'Non.' },
          { q: 'Est-ce remboursé ?', r: 'Non, ce n’est pas un acte médical.' },
          { q: 'Que dois-je apporter ?', r: 'Votre programme d’entraînement et, si possible, un relevé de vos repas sur quelques jours.' },
        ],
      },
    ],
    proches: ['/recuperation/massages', '/sport/coaching-individuel', '/recuperation/pressotherapie'],
  },

  /* ---------------- Bilans ---------------- */
  {
    pole: 'bilans',
    slug: 'isocinetique',
    nom: 'Bilan isocinétique',
    carte: {
      extrait: 'La référence pour mesurer la force de vos muscles à vitesse constante, préparer un retour au sport ou suivre une rééducation.',
      meta: '80 € · 1 h 30',
    },
    chapo:
      'Le bilan isocinétique mesure la force de vos muscles pendant un mouvement à vitesse constante. C’est l’examen de référence pour décider d’un retour au sport, notamment après une rupture du ligament croisé.',
    action: bilanAction('isocinetique'),
    photo: 'extensionJambe',
    seo: {
      title: 'Bilan isocinétique à Avon : 80 €, 1 h 30',
      description:
        'Test isocinétique à Avon (77) : force, ratio ischio-jambiers/quadriceps et asymétries, avant un retour au sport ou pendant une rééducation. 80 €.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que mesure la machine' },
      {
        t: 'p',
        texte: 'Vous réalisez des flexions et des extensions, du genou le plus souvent, sur un dynamomètre qui impose la vitesse. La machine enregistre :',
      },
      {
        t: 'ul',
        items: [
          'le pic de force de chaque muscle, à vitesse lente et à vitesse rapide',
          'votre endurance musculaire sur une série prolongée',
          'le ratio entre muscles opposés, ischio-jambiers et quadriceps',
          'le déficit entre votre côté fort et votre côté faible',
        ],
      },
      { t: 'h2', texte: 'Comment nous lisons vos résultats' },
      {
        t: 'p',
        texte:
          'Le déficit se calcule toujours en rapportant le côté faible au côté fort : (force du côté fort − force du côté faible) / force du côté fort. Le compte rendu indique clairement le côté déficitaire. Ces chiffres, rapprochés des repères de reprise, aident votre chirurgien, votre kiné et votre préparateur à décider de la suite.',
      },
      { t: 'h2', texte: 'Pourquoi le faire' },
      {
        t: 'ul',
        items: [
          'Décider d’un retour au sport en sécurité, après une blessure ou une opération',
          'Mesurer l’efficacité d’une rééducation ou d’une préparation physique',
          'Prévenir les blessures ligamentaires et musculaires en repérant les déséquilibres',
          'Suivre vos progrès avec des repères objectifs, d’un bilan à l’autre',
        ],
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Les sportifs en reprise ou en préparation, les personnes en rééducation (genou, cheville, épaule) et toute personne qui veut connaître son profil musculaire.',
      },
      { t: 'h2', texte: 'Déroulé' },
      {
        t: 'ol',
        items: [
          'Entretien : blessure, opération, date, sport pratiqué.',
          'Échauffement et familiarisation avec la machine.',
          'Tests à plusieurs vitesses, côté sain puis côté opéré.',
          'Restitution des résultats et recommandations.',
        ],
      },
      { t: 'p', texte: 'Le test est indolore et non invasif ; il demande un effort maximal sur quelques répétitions.' },
      { t: 'h2', texte: 'Pour bien le préparer' },
      {
        t: 'ul',
        items: [
          'évitez les efforts intenses la veille',
          'buvez suffisamment et portez une tenue de sport confortable',
          'apportez vos comptes rendus médicaux ou opératoires',
        ],
      },
      { t: 'p', texte: 'Tarif : 80 €, 1 h 30. Non pris en charge par la Sécurité sociale.' },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'Le bilan est-il remboursé ?',
            r: 'Non, il n’est pas pris en charge par la Sécurité sociale. Une facture vous est remise pour votre mutuelle, qui peut participer selon votre contrat.',
          },
          { q: 'Combien de temps dure le bilan ?', r: 'Une heure trente, compte rendu et recommandations compris.' },
          {
            q: 'Faut-il une ordonnance ?',
            r: 'Non. Le bilan est souvent conseillé par votre chirurgien ou votre kinésithérapeute avant une reprise : apportez alors leur courrier ou vos comptes rendus.',
          },
          {
            q: 'Est-ce douloureux ?',
            r: 'Non, le test est indolore et non invasif. Il demande un effort maximal sur quelques répétitions, à plusieurs vitesses.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Une tenue de sport, de l’eau et vos comptes rendus médicaux ou opératoires. Évitez les efforts intenses la veille.',
          },
        ],
      },
    ],
    proches: ['/bilans/forces-musculaires', '/sante/kinesitherapie', '/sport/reathletisation'],
  },
  {
    pole: 'bilans',
    slug: 'forces-musculaires',
    nom: 'Bilan des forces musculaires',
    carte: {
      extrait: 'Mesurer votre force et vos asymétries, membres supérieurs et inférieurs, avec les équipements VALD des clubs professionnels.',
      meta: 'Dès 80 € · 1 h',
    },
    chapo:
      'Mesurez votre force et vos asymétries pour vous entraîner plus juste. Nous utilisons les capteurs VALD et KINVENT, présents dans les clubs professionnels et les centres de rééducation.',
    action: bilanAction('forces-complet'),
    photo: 'souleve',
    seo: {
      title: 'Bilan des forces musculaires à Avon, dès 80 €',
      description: 'Force et asymétries musculaires mesurées sur capteurs VALD et KINVENT à Avon. Bilan complet 120 €, membres supérieurs ou inférieurs 80 €.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Des tests isométriques courts mesurent la force de vos principaux groupes musculaires, côté droit et côté gauche : hanches, cuisses, ischio-jambiers, mollets, épaules, préhension. Les données révèlent les déséquilibres que le ressenti ne montre pas.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'ul',
        items: [
          'Les sportifs, en reprise ou confirmés, qui veulent optimiser leur préparation',
          'Les personnes en rééducation, pour suivre la récupération après une blessure',
          'Les adultes qui veulent garder leur force avec l’âge : prévention des douleurs et des chutes',
        ],
      },
      { t: 'h2', texte: 'Ce que vous obtenez' },
      {
        t: 'ul',
        items: [
          'Un rapport visuel de vos résultats, muscle par muscle',
          'Les écarts gauche-droite et entre muscles opposés',
          'L’analyse de votre préparateur et un plan d’action : renforcement, mobilité, séances ciblées',
        ],
      },
      {
        t: 'p',
        texte: 'Tarifs : bilan complet (supérieurs et inférieurs) 120 € · 1 h ; bilan partiel (supérieurs ou inférieurs) 80 € · 1 h.',
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Le bilan est-il remboursé ?', r: 'Non, il n’est pas pris en charge par la Sécurité sociale. Une facture vous est remise pour votre mutuelle.' },
          { q: 'Combien de temps dure le bilan ?', r: 'Une heure, pour le bilan complet comme pour le bilan partiel.' },
          { q: 'Faut-il une ordonnance ?', r: 'Non, le bilan se réserve directement en ligne.' },
          {
            q: 'Que dois-je apporter ?',
            r: 'Une tenue de sport, de l’eau et, si vous en avez, vos comptes rendus médicaux ou vos derniers bilans. Évitez les efforts intenses la veille.',
          },
        ],
      },
    ],
    proches: ['/bilans/sauts-force-vitesse', '/bilans/isocinetique', '/sport/coaching-individuel'],
  },
  {
    pole: 'bilans',
    slug: 'fonctionnel',
    nom: 'Bilan fonctionnel',
    carte: {
      extrait: 'Un diagnostic de votre mobilité, de vos forces et de votre équilibre pour bouger mieux, plus fort et plus longtemps.',
      meta: '60 € · 1 h',
    },
    chapo:
      'Un état des lieux pour bouger mieux, plus fort et plus longtemps. Que vous repreniez une activité, perdiez en mobilité ou cherchiez la performance, il révèle ce qui vous limite.',
    action: bilanAction('fonctionnel'),
    photo: 'coachSouleve',
    seo: {
      title: 'Bilan fonctionnel à Avon : mobilité, équilibre, force · 60 €',
      description:
        'Mobilité, force isométrique, contrôle moteur et équilibre au centre Hygie d’Avon, pour un programme d’étirements et de renforcement ciblé. 60 €.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que nous mesurons' },
      {
        t: 'ul',
        items: [
          'Vos amplitudes articulaires : hanches, chevilles, épaules, colonne',
          'La force isométrique de vos chaînes musculaires, sur capteurs',
          'Votre contrôle moteur : squat bras tendus au-dessus de la tête, fentes, rotations d’épaules',
          'Votre équilibre, sur une jambe puis l’autre',
        ],
      },
      { t: 'h2', texte: 'Pour quoi faire' },
      {
        t: 'ul',
        items: [
          'Identifier vos déséquilibres et vos compensations',
          'Repérer les faiblesses et les instabilités',
          'Comprendre ce qui entretient une douleur ou freine votre performance',
          'Construire votre programme d’étirements et de renforcement',
        ],
      },
      { t: 'p', texte: 'Tarif : 60 €, 1 h, rapport et plan d’action compris.' },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Le bilan est-il remboursé ?', r: 'Non, il n’est pas pris en charge par la Sécurité sociale. Une facture vous est remise pour votre mutuelle.' },
          { q: 'Combien de temps dure le bilan ?', r: 'Une heure, rapport et plan d’action compris.' },
          {
            q: 'Faut-il être sportif ?',
            r: 'Non. Le bilan s’adresse autant à ceux qui reprennent une activité ou perdent en mobilité qu’aux sportifs qui cherchent la performance.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Une tenue souple, des chaussures de sport propres et de l’eau. Signalez vos douleurs et vos antécédents au préparateur.',
          },
        ],
      },
    ],
    proches: ['/bilans/forces-musculaires', '/sport/coaching-individuel', '/sante/kinesitherapie'],
  },
  {
    pole: 'bilans',
    slug: 'sauts-force-vitesse',
    nom: 'Sauts et profil force-vitesse',
    carte: {
      extrait: 'Évaluer votre puissance et votre explosivité, et savoir s’il faut d’abord travailler la force ou la vitesse.',
      meta: '80 € par bilan',
    },
    chapo:
      'Deux bilans sur plateformes de force pour mesurer ce qui fait la différence sur le terrain : la puissance, l’explosivité et l’équilibre entre force et vitesse.',
    action: bilanAction('sauts'),
    photo: 'boxJump',
    seo: {
      title: 'Bilan des sauts et profil force-vitesse à Avon · 80 €',
      description:
        'Sauts sur plateformes de force et profil force-vitesse à Avon : puissance, explosivité, réactivité et asymétries entre les jambes. 80 € par bilan.',
    },
    corps: [
      { t: 'h2', texte: 'Le bilan des sauts' },
      { t: 'p', texte: 'Une batterie de sauts, sur deux jambes puis sur une seule :' },
      {
        t: 'ul',
        items: [
          'Saut vertical avec contre-mouvement : puissance et hauteur de saut.',
          'Sauts unipodaux : comparaison gauche-droite, asymétries à corriger.',
          'Drop jump (saut après une chute depuis une caisse) : réactivité et raideur, via l’indice de force réactive (RSI).',
        ],
      },
      {
        t: 'p',
        texte:
          'Les plateformes mesurent la force au sol milliseconde par milliseconde : au-delà de la hauteur, nous analysons comment vous produisez cette hauteur.',
      },
      { t: 'h2', texte: 'Le profil force-vitesse' },
      {
        t: 'p',
        texte:
          'Des sauts avec charges croissantes dessinent votre profil. Il indique s’il faut d’abord travailler la force ou la vitesse pour gagner en performance. Ce test demande de savoir sauter avec une barre chargée sur les épaules.',
      },
      { t: 'p', texte: 'Tarifs : bilan des sauts 80 € ; profil force-vitesse 80 €. Les deux peuvent se faire le même jour.' },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'Les bilans sont-ils remboursés ?',
            r: 'Non, ils ne sont pas pris en charge par la Sécurité sociale. Une facture vous est remise pour votre mutuelle.',
          },
          { q: 'Faut-il une ordonnance ?', r: 'Non, les bilans se réservent directement en ligne.' },
          {
            q: 'Puis-je faire les deux bilans le même jour ?',
            r: 'Oui, si vous êtes en forme : demandez-le à la réservation. Le profil force-vitesse demande de savoir sauter avec une barre chargée sur les épaules.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Une tenue de sport, des chaussures propres et de l’eau. Évitez les efforts intenses la veille pour que les mesures reflètent votre niveau réel.',
          },
        ],
      },
    ],
    proches: ['/bilans/forces-musculaires', '/bilans/aerobie', '/bilans/isocinetique'],
  },
  {
    pole: 'bilans',
    slug: 'aerobie',
    nom: 'Bilan aérobie',
    carte: {
      extrait: 'Un masque relié à l’analyseur métabolique PNOE mesure l’oxygène que vous consommez et le CO2 que vous rejetez pendant un effort progressif.',
      meta: [v.prix.aerobie, v.durees.aerobie].filter(Boolean).join(' · ') || SUR_DEMANDE,
    },
    chapo:
      'Un masque relié à l’analyseur métabolique PNOE mesure l’oxygène que vous consommez et le CO2 que vous rejetez pendant un effort progressif. On en déduit vos seuils et vos zones d’entraînement réelles, au lieu de formules théoriques.',
    action: bilanAction('aerobie'),
    photo: 'course',
    seo: {
      title: 'Bilan aérobie PNOE à Avon : vos zones d’entraînement',
      description:
        'Analyse des échanges gazeux avec le PNOE à Avon : VO2, seuils ventilatoires et zones d’entraînement personnalisées pour la course et le vélo.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que vous obtenez' },
      {
        t: 'ul',
        items: [
          'Votre consommation d’oxygène et vos seuils ventilatoires',
          'Vos zones de fréquence cardiaque et d’allure, personnalisées',
          'L’utilisation des graisses et des glucides selon l’intensité',
          'Un plan pour structurer vos semaines d’entraînement',
        ],
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte: 'Coureurs, traileurs, marathoniens, cyclistes, triathlètes, et toute personne qui veut s’entraîner à la bonne intensité.',
      },
      ...siRenseigne(v.prix.aerobie, (prix): Bloc => ({
        t: 'p',
        texte: `Tarif : ${[prix, v.durees.aerobie].filter(Boolean).join(', ')}.`,
      })),
    ],
    proches: ['/sport/cross-training', '/bilans/sauts-force-vitesse', '/sport/coaching-individuel'],
  },
];

/* Tarif du conseil en nutrition : la phrase n'apparaît qu'avec au moins un prix renseigné */
function tarifNutrition(): Bloc[] {
  const n = aRenseigner.prix.nutrition;
  const parties = [...siRenseigne(n.premierRendezVous, (p) => `premier rendez-vous ${p}`), ...siRenseigne(n.suivi, (p) => `suivi ${p}`)];
  return parties.length ? [{ t: 'p', texte: `Tarif : ${parties.join(', ')}.` }] : [];
}

export function soinsDu(pole: Pole) {
  return soins.filter((s) => s.pole === pole);
}

export function trouverSoin(pole: Pole, slug: string) {
  return soins.find((s) => s.pole === pole && s.slug === slug);
}

export function cheminSoin(s: Soin) {
  return `${poles[s.pole].href}/${s.slug}`;
}

export function soinParChemin(chemin: string) {
  return soins.find((s) => cheminSoin(s) === chemin);
}
