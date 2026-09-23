/* Les pôles et leurs fiches (gabarit Article). */
import type { Action, Bloc } from './types';
import type { PhotoKey } from './images';
import { bilanPar } from './bilans';

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
    chapo: 'Kinésithérapeutes, étiopathes et orthoptiste consultent au centre. Prenez rendez-vous en ligne, directement auprès de chaque praticien.',
    seo: {
      title: 'Pôle santé : kinésithérapie, étiopathie, orthoptie à Avon',
      description: 'Kinésithérapeutes, étiopathes et orthoptiste au centre Hygie d’Avon (77). Prise de rendez-vous en ligne auprès de chaque praticien.',
    },
  },
  sport: {
    nom: 'Sport',
    etiquette: 'Sport',
    href: '/sport',
    couleur: 'jaune',
    chapo: 'Coaching individuel, sport-santé en petit groupe ou cross training : nos préparateurs physiques construisent vos séances à partir d’un bilan.',
    seo: {
      title: 'Coaching sportif et préparation physique à Avon',
      description:
        'Coaching individuel, sport-santé en petit groupe et cross training avec des préparateurs physiques diplômés, au centre Hygie d’Avon. Première séance offerte.',
    },
  },
  recuperation: {
    nom: 'Récupération & bien-être',
    etiquette: 'Récupération',
    href: '/recuperation',
    couleur: 'gris',
    chapo: 'Pressothérapie, massages et conseil en nutrition : des soins complémentaires pour récupérer, relâcher les tensions et retrouver de l’énergie.',
    seo: {
      title: 'Récupération et bien-être : pressothérapie, massages, nutrition',
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
      'Force, mobilité, asymétries, puissance : nos bilans font l’état des lieux de votre corps. Vous savez ensuite quoi travailler pour progresser sans vous blesser.',
    seo: {
      title: 'Bilans physiologiques : isocinétique, force, mobilité, sauts',
      description: 'Bilan isocinétique, forces musculaires, bilan fonctionnel, sauts et profil force-vitesse à Avon (77). Tarifs et réservation en ligne.',
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

const bilanAction = (id: string, label = 'Réserver') => {
  const b = bilanPar(id);
  return { label, href: b.reservation };
};

export const soins: Soin[] = [
  /* ---------------- Santé ---------------- */
  {
    pole: 'sante',
    slug: 'kinesitherapie',
    nom: 'Kinésithérapie',
    carte: {
      extrait: 'Rééducation fonctionnelle, kinésithérapie du sport, rééducation périnéale : dix kinésithérapeutes vous reçoivent au centre.',
      meta: '10 kinésithérapeutes · Doctolib',
    },
    chapo:
      'Dix kinésithérapeutes consultent au centre, chacun avec ses spécialités, du sport au pré et post-partum. Choisissez le vôtre et réservez directement sur Doctolib.',
    action: { label: 'Choisir un kiné', href: '#praticiens' },
    photo: 'kine',
    seo: {
      title: 'Kinésithérapeute à Avon : rééducation et kiné du sport',
      description:
        'Dix kinésithérapeutes au centre Hygie d’Avon : rééducation fonctionnelle, kinésithérapie du sport, périnéale, pré et post-partum. Rendez-vous sur Doctolib.',
    },
    corps: [
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Toute personne qui a besoin d’une rééducation, sur prescription médicale : après une blessure, une opération ou pour une douleur qui dure. Les sportifs trouvent aussi au centre une kinésithérapie du sport, en lien avec les préparateurs physiques.',
      },
      { t: 'h2', texte: 'Nos kinésithérapeutes', id: 'praticiens' },
      { t: 'praticiens', discipline: 'kinesitherapie' },
      { t: 'h2', texte: 'Honoraires' },
      {
        t: 'p',
        texte:
          'Les kinésithérapeutes du centre pratiquent des dépassements d’honoraires. Pour en connaître le montant, renseignez-vous directement auprès de votre praticien.',
      },
      { t: 'h2', texte: 'Après la rééducation' },
      {
        t: 'p',
        texte:
          'Au centre, la rééducation peut se prolonger par un [bilan isocinétique](/bilans/isocinetique) avant la reprise, puis par un [coaching individuel](/sport/coaching-individuel) pour retrouver votre niveau en sécurité.',
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
    proches: ['/sante/etiopathie', '/bilans/isocinetique', '/sport/coaching-individuel'],
  },
  {
    pole: 'sante',
    slug: 'etiopathie',
    nom: 'Étiopathie',
    carte: {
      extrait: 'Comprendre l’origine mécanique de vos douleurs pour traiter la cause, par des gestes manuels précis et sans médicament.',
      meta: '2 étiopathes · Réservation en ligne',
    },
    chapo: 'L’étiopathie recherche la cause mécanique de vos douleurs pour la traiter à la main, sans médicament. En général, peu de séances suffisent.',
    action: { label: 'Prendre rendez-vous', href: '#praticiens' },
    photo: 'manipulation',
    seo: {
      title: 'Étiopathe à Avon : dos, articulations, digestion',
      description:
        'Consultations d’étiopathie au centre Hygie d’Avon (77) avec Johan Pereira et Aubin Salmon. Douleurs de dos, articulations, troubles digestifs et ORL.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'L’étiopathe analyse le mécanisme de votre douleur pour remonter à sa cause, puis la traite par des manipulations précises. Cette méthode fondée sur le raisonnement vise des résultats durables.',
      },
      {
        t: 'p',
        texte:
          'Ignorer une douleur, c’est prendre le risque qu’elle s’installe : raideur, perte de mobilité, fatigue. Agir tôt préserve votre équilibre et votre qualité de vie.',
      },
      { t: 'h2', texte: 'Ce que l’étiopathie prend en charge' },
      {
        t: 'ul',
        items: [
          'Le dos et la nuque : lumbago, sciatique, torticolis, névralgie d’Arnold ou cervico-brachiale',
          'Les articulations et les tendons : entorse, tendinite, canal carpien, douleurs d’épaule, de coude, de genou ou de cheville',
          'La digestion : reflux, ballonnements, troubles du transit',
          'La sphère ORL : sinusite, otite séreuse, rhume à répétition',
        ],
      },
      { t: 'note', texte: 'L’étiopathie ne remplace pas un avis médical. En cas de symptôme inhabituel ou qui persiste, consultez d’abord votre médecin.' },
      { t: 'h2', texte: 'Déroulé d’une séance' },
      {
        t: 'p',
        texte:
          'La séance commence par un bilan complet pour comprendre votre douleur et son histoire. Le praticien traite ensuite la cause identifiée par des techniques manuelles adaptées à chacun.',
      },
      {
        t: 'p',
        texte:
          'Elle s’adresse à tous, du nourrisson au senior, de la femme enceinte au sportif. Le nombre de séances dépend de la nature et de l’ancienneté de la douleur.',
      },
      { t: 'h2', texte: 'Nos étiopathes', id: 'praticiens' },
      { t: 'praticiens', discipline: 'etiopathie' },
      { t: 'h2', texte: 'Remboursement' },
      {
        t: 'p',
        texte:
          'L’étiopathie n’est pas remboursée par la Sécurité sociale. Certaines mutuelles prennent en charge une partie des séances : renseignez-vous auprès de la vôtre.',
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Faut-il une ordonnance ?', r: 'Non. L’étiopathie se consulte en accès direct, sans prescription médicale.' },
          {
            q: 'L’étiopathie est-elle remboursée ?',
            r: 'Pas par la Sécurité sociale. De nombreuses mutuelles remboursent tout ou partie des séances dans leur forfait « médecines douces » : demandez une facture à votre étiopathe et renseignez-vous auprès de votre mutuelle.',
          },
          {
            q: 'Combien de séances faut-il ?',
            r: 'Cela dépend du motif. L’étiopathe vous l’indique dès la première séance, après son bilan, et le traitement demande souvent peu de séances.',
          },
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
      extrait: 'Dépistage, bilans orthoptiques et neurovisuels, rééducation et renouvellement de lunettes, du nourrisson au sportif.',
      meta: '1 orthoptiste · Doctolib',
    },
    chapo:
      'L’orthoptiste dépiste et rééduque les troubles de la vision, du nourrisson de 9 mois à l’adulte. Au centre, elle accompagne aussi les sportifs après une commotion.',
    action: { label: 'Réserver sur Doctolib', href: 'https://www.doctolib.fr/orthoptiste/avon/marie-couineau?pid=practice-466521' },
    photo: 'vision',
    seo: {
      title: 'Orthoptiste à Avon : bilans visuels et neurovisuels',
      description:
        'Marie Couineau, orthoptiste au centre Hygie d’Avon : dépistage dès 9 mois, bilans neurovisuels, rééducation, suivi après commotion et renouvellement de lunettes.',
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
      extrait:
        'Des séances individuelles avec un préparateur physique, construites à partir de votre bilan. Trois formules, d’une à trois séances par semaine.',
      meta: 'Dès 140 € par mois',
    },
    chapo:
      'Une à trois séances individuelles par semaine avec un préparateur physique, construites à partir de votre bilan. Votre première séance d’une heure est offerte.',
    action: { label: 'Réserver l’essai', href: '/rendez-vous?motif=sport&objet=essai' },
    photo: 'coachPompes',
    seo: {
      title: 'Coaching sportif individuel à Avon, dès 140 € par mois',
      description:
        'Séances individuelles avec un préparateur physique, à partir d’un bilan physiologique. Formules à 1, 2 ou 3 séances par semaine. Première séance offerte.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Tout commence par un bilan physiologique : mobilité, force, asymétries et objectifs. Votre préparateur physique en tire un programme, puis ajuste chaque séance à votre forme du jour.',
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
          { nom: 'Performance', detail: '3 séances individuelles par semaine et accès privilégié aux praticiens de santé du centre', prix: '300 € / mois' },
        ],
      },
      { t: 'p', texte: 'Le bilan physiologique d’entrée est offert pour un engagement de trois mois. Sans engagement, il est facturé 145 €.' },
      { t: 'h2', texte: 'Séance d’essai' },
      {
        t: 'p',
        texte:
          'Votre première séance d’une heure est gratuite et sans engagement. Elle permet de faire connaissance, de parler de vos objectifs et de tester la méthode.',
      },
      {
        t: 'actions',
        items: [{ label: 'Réserver l’essai', href: '/rendez-vous?motif=sport&objet=essai', variant: 'solid' }],
      },
      { t: 'h2', texte: 'Vos préparateurs' },
      {
        t: 'p',
        texte:
          'Johan Pereira, Martin Tondeur et Jean-Etienne Boilot, préparateurs physiques diplômés, vous accompagnent. Découvrez [la méthode Hygie](/methodologie).',
      },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          {
            q: 'La séance d’essai est-elle vraiment gratuite ?',
            r: 'Oui. Une première séance d’une heure, sans engagement, pour faire connaissance, parler de vos objectifs et tester la méthode.',
          },
          {
            q: 'Faut-il déjà être sportif ?',
            r: 'Non. Le programme part de votre bilan et de vos objectifs, quel que soit votre niveau : reprise, perte de poids, préparation d’une épreuve ou retour après une blessure.',
          },
          {
            q: 'Le coaching est-il remboursé ?',
            r: 'Non, ce n’est pas un soin médical. Certaines mutuelles et comités d’entreprise participent aux activités physiques : renseignez-vous auprès des vôtres.',
          },
          { q: 'Que dois-je apporter ?', r: 'Une tenue de sport, des chaussures propres pour la salle, une bouteille d’eau et une serviette.' },
          {
            q: 'Puis-je changer de formule ?',
            r: 'Oui, les formules sont mensuelles et s’ajustent avec votre préparateur. Le bilan d’entrée est offert pour un engagement de trois mois.',
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
      extrait:
        'Renforcement, étirements et prévention des chutes en groupe de quatre, deux fois par semaine, avec des éducateurs en activité physique adaptée.',
      meta: 'Groupes de 4 · 2 séances par semaine',
    },
    chapo:
      'Deux séances par semaine en groupe de quatre pour renforcer votre corps, gagner en souplesse et prévenir les chutes. Un programme pensé pour le bien-être au quotidien.',
    action: { label: 'Demander un créneau', href: '/rendez-vous?motif=sport&objet=sport-sante' },
    photo: 'senior',
    seo: {
      title: 'Sport-santé et activité physique adaptée à Avon',
      description:
        'Renforcement, étirements et prévention des chutes en groupe de quatre, encadrés par des éducateurs en activité physique adaptée. Sport sur ordonnance à Avon.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Les séances associent renforcement musculaire et étirements, avec un objectif : se sentir bien au quotidien et prévenir les chutes. Le petit groupe permet un suivi attentif de chacun.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Les personnes qui reprennent une activité, avancent en âge ou vivent avec une maladie chronique. Nos éducateurs en activité physique adaptée ajustent la pratique à votre état de santé, y compris dans le cadre du sport sur ordonnance.',
      },
      { t: 'h2', texte: 'Le déroulé' },
      {
        t: 'ul',
        items: [
          'un bilan d’entrée pour connaître votre point de départ',
          'deux séances par semaine en groupe de quatre personnes',
          'des exercices progressifs, adaptés au niveau de chacun',
        ],
      },
      { t: 'p', texte: 'Hygie est partenaire de la Maison Sport-Santé de Fontainebleau.' },
      { t: 'h2', texte: 'Tarif' },
      { t: 'p', texte: 'Contactez-nous pour connaître le tarif et les prochains créneaux disponibles.' },
      {
        t: 'actions',
        items: [{ label: 'Demander un créneau', href: '/rendez-vous?motif=sport&objet=sport-sante', variant: 'solid' }],
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
      extrait: 'Préparation physique et renforcement fonctionnel en petit groupe, une séance par semaine sur un créneau réservé.',
      meta: '60 € par mois · 6 personnes au plus',
    },
    chapo:
      'Une séance par semaine sur un créneau réservé, à six au plus. Endurance, force et mobilité progressent ensemble, sans négliger la prévention des blessures.',
    action: { label: 'Demander un créneau', href: '/rendez-vous?motif=sport&objet=cross-training' },
    photo: 'kettlebell',
    seo: {
      title: 'Cross training en petit groupe à Avon, 60 € par mois',
      description:
        'Préparation physique et renforcement fonctionnel en groupe de six au plus, une séance par semaine sur un créneau réservé, au centre Hygie d’Avon.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Le cross training combine préparation physique et renforcement fonctionnel dans des séances variées. Le petit groupe garde l’énergie du collectif tout en laissant au coach le temps de corriger chaque geste.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Les sportifs qui veulent un entraînement complet, y compris pour préparer un Hyrox. Chaque mouvement s’adapte à votre niveau, du débutant au confirmé.',
      },
      { t: 'h2', texte: 'Formule' },
      {
        t: 'tarifs',
        items: [{ nom: 'Forfait cross training', detail: '1 séance par semaine sur un créneau réservé, 6 personnes au plus', prix: '60 € / mois' }],
      },
      {
        t: 'actions',
        items: [{ label: 'Demander un créneau', href: '/rendez-vous?motif=sport&objet=cross-training', variant: 'solid' }],
      },
      { t: 'p', texte: 'À lire dans le journal : [le CrossFit, une discipline complète](/journal/crossfit) et [se préparer au Hyrox](/journal/hyrox).' },
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
    proches: ['/sport/coaching-individuel', '/bilans/sauts-force-vitesse', '/recuperation/pressotherapie'],
  },

  /* ---------------- Récupération & bien-être ---------------- */
  {
    pole: 'recuperation',
    slug: 'pressotherapie',
    nom: 'Pressothérapie',
    carte: {
      extrait: 'Des bottes gonflables exercent une compression par vagues pour stimuler la circulation et retrouver des jambes légères.',
      meta: '20 € · 30 min',
    },
    chapo:
      'Trente minutes allongé, les jambes dans des bottes qui se gonflent par vagues. La compression stimule la circulation et laisse une sensation de jambes légères.',
    action: { label: 'Réserver une séance', href: '/rendez-vous?motif=recuperation&objet=pressotherapie' },
    photo: 'pressotherapie',
    seo: {
      title: 'Pressothérapie à Avon : 20 € la séance de 30 minutes',
      description: 'Séances de pressothérapie au centre Hygie d’Avon pour récupérer après l’effort et soulager les jambes lourdes. 20 € les 30 minutes.',
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
          'Les sportifs après un effort intense ou avant une compétition, et toute personne qui a souvent les jambes lourdes. La séance est aussi un vrai moment de détente.',
      },
      { t: 'h2', texte: 'Ce que vous pouvez en attendre' },
      {
        t: 'ul',
        items: ['une sensation de jambes plus légères', 'une récupération facilitée entre deux entraînements', 'un moment de relâchement, allongé au calme'],
      },
      { t: 'h2', texte: 'Avant votre séance' },
      {
        t: 'p',
        texte:
          'La pressothérapie ne convient pas à tout le monde : certains troubles circulatoires, cardiaques ou cutanés la contre-indiquent. Un questionnaire de contre-indications est à remplir avant la première séance ; selon vos réponses, l’accord de votre médecin peut être demandé.',
      },
      { t: 'h2', texte: 'Tarifs' },
      {
        t: 'tarifs',
        items: [
          { nom: 'Séance', detail: '30 minutes', prix: '20 €' },
          { nom: 'Carte de 5 séances', detail: '30 minutes par séance', prix: 'Sur demande' },
          { nom: 'Carte de 10 séances', detail: '30 minutes par séance', prix: 'Sur demande' },
        ],
      },
      {
        t: 'actions',
        items: [{ label: 'Réserver une séance', href: '/rendez-vous?motif=recuperation&objet=pressotherapie', variant: 'solid' }],
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
    nom: 'Massages',
    carte: {
      extrait: 'Deep tissue, drainages lymphatiques et massage anti-cellulite, sur rendez-vous avec Malika Pereira.',
      meta: 'Sur rendez-vous',
    },
    chapo:
      'Malika Pereira propose quatre massages, du plus profond au plus doux. Chaque séance s’adapte à vos tensions, à votre récupération et à vos objectifs.',
    action: { label: 'Appeler Malika', href: 'tel:+33624114219' },
    photo: 'massage',
    seo: {
      title: 'Massages bien-être à Avon : deep tissue, drainage lymphatique',
      description:
        'Massage deep tissue, drainage lymphatique Renata França et Vodder, massage anti-cellulite avec Malika Pereira, sur rendez-vous au centre Hygie d’Avon.',
    },
    corps: [
      { t: 'h2', texte: 'Nos massages' },
      { t: 'h3', texte: 'Deep tissue' },
      {
        t: 'p',
        texte:
          'Un massage profond qui cible les couches musculaires et les fascias. Il relâche les tensions installées, aide à retrouver de la souplesse et accompagne la récupération des sportifs.',
      },
      { t: 'h3', texte: 'Drainage lymphatique, méthode Renata França' },
      {
        t: 'p',
        texte:
          'Un drainage tonique et rythmé, aux pressions fermes, qui stimule la circulation. Il laisse une sensation de corps dégonflé et se pratique volontiers en cure ou avant un événement.',
      },
      { t: 'h3', texte: 'Drainage lymphatique manuel, méthode Vodder' },
      {
        t: 'p',
        texte:
          'Une technique douce qui stimule à la main la circulation lymphatique. Elle soulage les jambes lourdes et gonflées et invite à une détente profonde.',
      },
      { t: 'h3', texte: 'Massage anti-cellulite' },
      { t: 'p', texte: 'Un massage ciblé qui stimule la circulation sanguine et lymphatique. Il vise à lisser l’aspect de la peau et à la raffermir.' },
      { t: 'h2', texte: 'Prendre rendez-vous' },
      { t: 'p', texte: 'Les massages se font sur rendez-vous, directement auprès de Malika Pereira, au 06 24 11 42 19.' },
      { t: 'actions', items: [{ label: 'Appeler Malika', href: 'tel:+33624114219', variant: 'solid' }] },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Les massages sont-ils remboursés ?', r: 'Non. Ce sont des massages bien-être, sans visée thérapeutique.' },
          { q: 'Combien de temps dure un massage ?', r: 'La durée dépend du massage choisi : Malika Pereira vous l’indique à la réservation.' },
          {
            q: 'Y a-t-il des contre-indications ?',
            r: 'Oui, en particulier pour les drainages (insuffisance cardiaque ou rénale, phlébite, infection en cours) et pendant la grossesse pour certains soins. Signalez tout traitement ou grossesse à la réservation.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Rien de particulier. Évitez un repas copieux juste avant et prévenez à la réservation si vous êtes enceinte ou suivez un traitement.',
          },
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
      extrait: 'Un accompagnement personnalisé vers une alimentation équilibrée, adaptée à votre rythme, à votre sport et à vos étapes de vie.',
      meta: 'Sur rendez-vous',
    },
    chapo:
      'Une alimentation saine et adaptée à vos besoins, construite à votre rythme. L’accompagnement est personnalisé et s’inscrit dans une démarche de prévention.',
    action: { label: 'Appeler Malika', href: 'tel:+33624114219' },
    photo: 'nutrition',
    seo: {
      title: 'Conseil en nutrition à Avon',
      description:
        'Accompagnement personnalisé en nutrition au centre Hygie d’Avon : énergie, poids, performance sportive, grossesse ou ménopause, dans une démarche de prévention.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que l’accompagnement vous apporte' },
      {
        t: 'ul',
        items: [
          'retrouver de l’énergie au quotidien',
          'gérer votre poids de façon durable',
          'mieux comprendre votre alimentation et vos besoins',
          'soutenir vos performances sportives',
          'mieux vivre certaines étapes : grossesse, post-partum, ménopause',
          'prévenir les déséquilibres liés au stress et aux rythmes de vie',
        ],
      },
      { t: 'p', texte: 'Chaque accompagnement respecte votre rythme, vos objectifs et vos préférences.' },
      { t: 'h2', texte: 'Les limites du conseil en nutrition' },
      {
        t: 'p',
        texte:
          'La conseillère en nutrition n’est ni diététicienne ni médecin. Elle ne pose pas de diagnostic, n’intervient pas sur les pathologies qui demandent un suivi thérapeutique (diabète, maladies cardiovasculaires, troubles du comportement alimentaire) et n’établit pas de régime prescrit.',
      },
      { t: 'p', texte: 'Si votre situation le demande, elle vous oriente vers le professionnel de santé adapté.' },
      { t: 'h2', texte: 'Prendre rendez-vous' },
      { t: 'p', texte: 'Le conseil en nutrition est assuré par Malika Pereira, sur rendez-vous au 06 24 11 42 19.' },
      { t: 'actions', items: [{ label: 'Appeler Malika', href: 'tel:+33624114219', variant: 'solid' }] },
      { t: 'h2', texte: 'Questions fréquentes' },
      {
        t: 'faq',
        items: [
          { q: 'Faut-il une ordonnance ?', r: 'Non. Le conseil en nutrition se prend directement, par téléphone.' },
          {
            q: 'Est-ce remboursé ?',
            r: 'Non. Le conseil en nutrition n’est pas un acte médical ; seule une consultation chez un diététicien ou un médecin nutritionniste peut, dans certains cas, être prise en charge.',
          },
          {
            q: 'Comment se passe le premier rendez-vous ?',
            r: 'C’est le plus long : il fait le point sur vos habitudes, votre activité, votre sommeil et vos objectifs. Les rendez-vous suivants ajustent le plan.',
          },
          {
            q: 'Que dois-je apporter ?',
            r: 'Vos derniers bilans sanguins si vous en avez, votre programme d’entraînement et, si possible, un relevé de vos repas sur quelques jours.',
          },
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
      'Le bilan isocinétique mesure la force de vos muscles pendant un mouvement à vitesse constante. C’est l’examen de référence avant un retour au sport, notamment après une rupture du ligament croisé.',
    action: bilanAction('isocinetique', 'Réserver le bilan'),
    photo: 'extensionJambe',
    seo: {
      title: 'Bilan isocinétique à Avon : 80 €, réservation en ligne',
      description:
        'Test isocinétique au centre Hygie d’Avon (77) : force, équilibre musculaire et asymétries, avant un retour au sport ou pendant une rééducation. 80 €, 1 h 30.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que mesure la machine' },
      {
        t: 'p',
        texte:
          'Vous réalisez des flexions et des extensions, du genou par exemple, sur un dynamomètre qui impose une vitesse constante. La machine enregistre :',
      },
      {
        t: 'ul',
        items: [
          'la force maximale que vous développez',
          'votre endurance musculaire à l’effort',
          'l’équilibre entre muscles opposés, quadriceps et ischio-jambiers par exemple',
          'les écarts entre votre côté droit et votre côté gauche',
        ],
      },
      { t: 'h2', texte: 'Pourquoi le faire' },
      {
        t: 'ul',
        items: [
          'prévenir les blessures, notamment ligamentaires et tendineuses',
          'décider d’un retour au sport en sécurité, après une blessure ou une opération',
          'évaluer l’efficacité d’une rééducation ou d’une préparation physique',
          'suivre vos progrès avec des repères objectifs',
        ],
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'p',
        texte:
          'Les sportifs en reprise ou en préparation, les personnes en rééducation après une blessure au genou, à la cheville ou à l’épaule, et toute personne qui veut connaître son profil musculaire.',
      },
      { t: 'h2', texte: 'Déroulé' },
      {
        t: 'p',
        texte:
          'Le test est indolore et non invasif. Installé sur la machine, vous réalisez les mouvements demandés à plusieurs vitesses, puis vous repartez avec un compte-rendu et des recommandations.',
      },
      { t: 'h3', texte: 'Pour bien le préparer' },
      {
        t: 'ul',
        items: [
          'évitez les efforts intenses la veille',
          'buvez suffisamment et portez une tenue de sport confortable',
          'apportez vos comptes rendus médicaux ou opératoires',
        ],
      },
      { t: 'h2', texte: 'Tarif' },
      {
        t: 'tarifs',
        items: [
          {
            nom: 'Bilan isocinétique',
            detail: '1 h 30',
            note: 'Non pris en charge par la Sécurité sociale.',
            prix: '80 €',
            action: bilanAction('isocinetique'),
          },
        ],
      },
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
    proches: ['/bilans/forces-musculaires', '/sante/kinesitherapie', '/sport/coaching-individuel'],
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
      'Mesurez votre force et vos asymétries pour vous entraîner plus juste. Nos préparateurs s’appuient sur les équipements VALD, utilisés par des clubs professionnels et des centres de rééducation.',
    action: { label: 'Voir les tarifs', href: '#tarifs' },
    photo: 'souleve',
    seo: {
      title: 'Bilan des forces musculaires à Avon, dès 80 €',
      description:
        'Mesure de la force et des asymétries musculaires avec les équipements VALD, au centre Hygie d’Avon. Bilan complet 120 €, membres supérieurs ou inférieurs 80 €.',
    },
    corps: [
      { t: 'h2', texte: 'Le principe' },
      {
        t: 'p',
        texte:
          'Des tests rapides et non invasifs mesurent la force de vos principaux groupes musculaires, côté droit et côté gauche. Les données révèlent les déséquilibres qu’un simple ressenti ne montre pas.',
      },
      { t: 'h2', texte: 'Pour qui' },
      {
        t: 'ul',
        items: [
          'les femmes à partir de 40 ans : tonus, renforcement, prévention des douleurs',
          'les hommes à partir de 35 ans : mobilité, performance, prévention des blessures',
          'les sportifs, en reprise ou confirmés : optimisation du geste et suivi de la performance',
          'les personnes en rééducation : suivi après une blessure ou une opération',
        ],
      },
      { t: 'h2', texte: 'Ce que vous obtenez' },
      {
        t: 'ul',
        items: [
          'un rapport clair et visuel de vos résultats',
          'l’analyse de votre préparateur physique',
          'un plan d’action : renforcement, mobilité, séances ciblées',
        ],
      },
      { t: 'h2', texte: 'Tarifs', id: 'tarifs' },
      {
        t: 'tarifs',
        items: [
          { nom: 'Bilan complet', detail: 'Membres supérieurs et inférieurs · 1 h', prix: '120 €', action: bilanAction('forces-complet') },
          { nom: 'Bilan partiel', detail: 'Membres supérieurs ou inférieurs · 1 h', prix: '80 €', action: bilanAction('forces-partiel') },
        ],
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
      'Un diagnostic complet pour bouger mieux, plus fort et plus longtemps. Que vous repreniez une activité, perdiez en mobilité ou cherchiez la performance, il révèle ce qui vous limite.',
    action: bilanAction('fonctionnel', 'Réserver le bilan'),
    photo: 'coachSouleve',
    seo: {
      title: 'Bilan fonctionnel à Avon : mobilité, équilibre, force',
      description:
        'Bilan fonctionnel au centre Hygie d’Avon : mobilité, forces isométriques, contrôle moteur et équilibre, pour un programme d’étirements et de renforcement ciblé. 60 €.',
    },
    corps: [
      { t: 'h2', texte: 'Ce que nous mesurons' },
      {
        t: 'ul',
        items: ['la force isométrique de vos chaînes musculaires', 'vos amplitudes articulaires et votre mobilité', 'votre contrôle moteur et votre équilibre'],
      },
      {
        t: 'p',
        texte: 'Les tests reposent sur des mouvements simples : équilibre sur une jambe, rotations d’épaules, squat bras tendus au-dessus de la tête, fentes.',
      },
      { t: 'h2', texte: 'Pour quoi faire' },
      {
        t: 'ul',
        items: [
          'identifier vos déséquilibres posturaux et moteurs',
          'repérer les faiblesses musculaires et les instabilités',
          'comprendre ce qui entretient une douleur ou freine votre performance',
          'personnaliser votre programme d’étirements et de renforcement',
        ],
      },
      { t: 'h2', texte: 'Tarif' },
      {
        t: 'tarifs',
        items: [{ nom: 'Bilan fonctionnel', detail: '1 h', prix: '60 €', action: bilanAction('fonctionnel') }],
      },
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
    action: { label: 'Voir les tarifs', href: '#tarifs' },
    photo: 'boxJump',
    seo: {
      title: 'Bilan des sauts et profil force-vitesse à Avon',
      description:
        'Tests de sauts sur plateformes de force et profil force-vitesse au centre Hygie d’Avon : puissance, explosivité et asymétries entre les jambes. 80 € par bilan.',
    },
    corps: [
      { t: 'h2', texte: 'Le bilan des sauts' },
      {
        t: 'p',
        texte:
          'Plusieurs sauts, sur deux jambes puis sur une seule, mesurent votre force, votre puissance et votre explosivité. La comparaison entre vos deux jambes met en évidence les asymétries à corriger.',
      },
      { t: 'h2', texte: 'Le profil force-vitesse' },
      {
        t: 'p',
        texte:
          'Des sauts réalisés avec des charges croissantes dessinent votre profil. Il indique s’il faut d’abord travailler la force ou la vitesse pour gagner en performance.',
      },
      { t: 'note', texte: 'Le profil force-vitesse demande de savoir sauter avec une barre chargée sur les épaules.' },
      { t: 'h2', texte: 'Tarifs', id: 'tarifs' },
      {
        t: 'tarifs',
        items: [
          { nom: 'Bilan des sauts', prix: '80 €', action: bilanAction('sauts') },
          { nom: 'Profil force-vitesse', prix: '80 €', action: bilanAction('force-vitesse') },
        ],
      },
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
    proches: ['/bilans/forces-musculaires', '/sport/cross-training', '/bilans/isocinetique'],
  },
];

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
