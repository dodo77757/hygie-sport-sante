/* Praticiens qui consultent au centre et leur lien de réservation.
   Sans lien en ligne, le bouton propose d'appeler le centre (ou le praticien).
   parcours : deux phrases rédigées d'après les présentations publiques des praticiens (Doctolib), à faire relire par chacun.
      photo : clé dans content/images.ts (portraits dans assets/photos/equipe/) ; sans photo, la carte affiche les initiales.
      Portraits d'Alexis Ballard, Antoine Gras et Jérémy Escriva : leur photo de profil Doctolib ; Malika Pereira : présentation de l'équipe
   publiée par Hygie sur Instagram (fond uniformisé). À faire valider par chacun. */
import type { PhotoKey } from './images';

export type Discipline = 'kinesitherapie' | 'etiopathie' | 'orthoptie' | 'bien-etre' | 'preparation';

export type Reservation = { type: 'doctolib'; url: string } | { type: 'calendly'; url: string } | { type: 'telephone'; affichage: string; lien: string };

export type Praticien = {
  nom: string;
  discipline: Discipline;
  fonction: string;
  specialites: string[];
  /** Deux phrases de parcours */
  parcours?: string;
  langues?: string[];
  photo?: PhotoKey;
  reservation: Reservation;
};

export const disciplines: Record<Discipline, { nom: string; fiche?: string; note?: string }> = {
  kinesitherapie: {
    nom: 'Kinésithérapie',
    fiche: '/sante/kinesitherapie',
    note: 'Les kinésithérapeutes du centre pratiquent des dépassements d’honoraires.',
  },
  etiopathie: {
    nom: 'Étiopathie',
    fiche: '/sante/etiopathie',
    note: 'Non remboursée par la Sécurité sociale ; certaines mutuelles participent.',
  },
  orthoptie: {
    nom: 'Orthoptie',
    fiche: '/sante/orthoptie',
    note: 'Sans créneau en ligne, écrivez via la messagerie Doctolib.',
  },
  'bien-etre': {
    nom: 'Massages et nutrition',
    fiche: '/recuperation/massages',
    note: 'Sur rendez-vous, par téléphone.',
  },
  preparation: {
    nom: 'Préparation physique',
    fiche: '/sport/coaching-individuel',
    note: 'Première séance d’une heure offerte.',
  },
};

const essai: Reservation = { type: 'calendly', url: '/rendez-vous?motif=sport&objet=essai' };

export const praticiens: Praticien[] = [
  /* Kinésithérapeutes */
  {
    nom: 'Naomée Addra',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kinésithérapie du sport', 'Rééducation de l’épaule', 'Enfants et adolescents'],
    parcours:
      'Elle reçoit tous les âges, du jeune enfant au senior, avec une attention particulière au sport et à la récupération. Formée à la technique des ventouses.',
    langues: ['Anglais'],
    photo: 'naomeeAddra',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/naomee-addra' },
  },
  {
    nom: 'Gauthier Arcache',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute, ostéopathe',
    specialites: ['Ostéopathie', 'Méthode McKenzie', 'Rééducation de l’épaule'],
    parcours:
      'Diplômé en kinésithérapie et en ostéopathie, il fonde chaque prise en charge sur un bilan pour fixer avec vous les objectifs du traitement. Formé à la méthode McKenzie et à l’épaule opérée.',
    langues: ['Anglais', 'Espagnol'],
    photo: 'gauthierArcache',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/paris/gauthier-arcache?pid=practice-478056' },
  },
  {
    nom: 'Alexis Ballard',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kinésithérapie du sport', 'Main et poignet', 'Course à pied'],
    parcours:
      'Il accompagne surtout les troubles musculo-squelettiques, avec une expertise en rééducation de la main et du poignet et dans les pathologies de la course à pied. Il se forme régulièrement pour une prise en charge fondée sur les connaissances actuelles.',
    photo: 'alexisBallard',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/alexis-ballard' },
  },
  {
    nom: 'Antoine Gras',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kinésithérapie du sport', 'Rééducation post-opératoire', 'Massage thérapeutique', 'Réathlétisation'],
    parcours:
      'Il prend en charge les douleurs du dos, du cou, de l’épaule, du genou, de la cheville et de la hanche, la rééducation orthopédique et post-opératoire (fractures, prothèses, chirurgie ligamentaire) et la récupération sportive.',
    photo: 'antoineGras',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/paris/antoine-gras' },
  },

  {
    nom: 'Romain Brelier-Murry',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kinésithérapie du sport', 'Épaule', 'Traumatologie', 'Rééducation de la cheville'],
    parcours:
      'Kinésithérapeute du sport, spécialisé dans les troubles articulaires et musculaires et la traumatologie, en particulier l’épaule et les atteintes nerveuses périphériques. Chaque suivi commence par un bilan et un échange approfondi.',
    langues: ['Anglais'],
    photo: 'romainBrelierMurry',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/romain-brelier-murry' },
  },
  {
    nom: 'Thomas Crasson',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Dos et cervicales', 'Blessures sportives', 'Rééducation après opération', 'Téléconsultation'],
    parcours:
      'Une prise en charge globale des douleurs et des blessures, fondée sur les sciences du mouvement : dos et cervicales, tendinites, entorses, rééducation après opération, troubles de la posture. Chaque suivi part d’un bilan complet.',
    photo: 'thomasCrasson',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/thomas-crasson' },
  },
  {
    nom: 'Margot De Oliveira',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kinésithérapie du sport', 'Rééducation de l’épaule', 'Rééducation de la cheville'],
    parcours:
      'Kinésithérapeute du sport, spécialisée dans les troubles articulaires et musculaires et la traumatologie. Formée à l’optimisation du renforcement musculaire, au centre depuis 2023.',
    photo: 'margotDeOliveira',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/margot-de-oliveira' },
  },
  {
    nom: 'Pierre Becker',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Thérapie manuelle', 'Dry needling', 'Mâchoire (dysfonction temporo-mandibulaire)', 'Kinésithérapie du sport'],
    parcours:
      'Spécialisé dans les thérapies manuelles et la rééducation, il accompagne ses patients vers l’autonomie : mobilité, douleurs, bien-être. Pensez à apporter votre ordonnance et votre carte de mutuelle.',
    photo: 'pierreBecker',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/pierre-becker' },
  },
  {
    nom: 'Jérémy Escriva',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Orthopédie', 'Tendinopathies et lombalgies', 'Membre inférieur', 'Rééducation de l’épaule'],
    parcours:
      'Orienté vers l’orthopédie (entorses, déchirures, fractures) et les douleurs rhumatismales (tendinopathies, lombalgies, névralgies). Il se forme régulièrement, dernièrement sur les lésions musculaires du membre inférieur.',
    langues: ['Anglais'],
    photo: 'jeremyEscriva',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/jeremy-escriva' },
  },
  {
    nom: 'Maya Maurer',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Santé de la femme', 'Rééducation périnéale et abdominale', 'Pré et post-partum', 'Après un cancer du sein', 'Drainage lymphatique'],
    parcours:
      'Spécialisée en santé de la femme : rééducation périnéale et abdominale, accompagnement pré et post-partum, endométriose, suivi après un cancer du sein et drainage lymphatique. Une prise en charge avant tout individualisée.',
    photo: 'mayaMaurer',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/maya-maurer' },
  },

  /* Étiopathes */
  {
    nom: 'Johan Pereira',
    discipline: 'etiopathie',
    fonction: 'Étiopathe, fondateur d’Hygie',
    specialites: ['Sportifs', 'Biomécanique du sport'],
    parcours:
      'Ancien footballeur à l’ESTAC, diplômé de la faculté d’étiopathie de Paris, où il est chargé de cours. Il a complété sa formation par deux diplômes universitaires, en préparation physique et réathlétisation, puis en biomécanique du sport.',
    photo: 'johanPereira',
    reservation: { type: 'calendly', url: 'https://calendly.com/pereira-johan/etiopatheavon' },
  },
  {
    nom: 'Aubin Salmon',
    discipline: 'etiopathie',
    fonction: 'Étiopathe',
    specialites: ['Grimpeurs et sportifs'],
    parcours: 'Chargé de cours à la faculté d’étiopathie de Paris. Grimpeur, il suit en particulier les pratiquants d’escalade.',
    photo: 'aubinSalmon',
    reservation: { type: 'calendly', url: 'https://calendly.com/aubinsalmon-etio' },
  },

  /* Orthoptiste */
  {
    nom: 'Marie Couineau',
    discipline: 'orthoptie',
    fonction: 'Orthoptiste',
    specialites: ['Bilan orthoptique', 'Bilan neurovisuel', 'Troubles des apprentissages', 'Commotion cérébrale', 'Performance visuelle'],
    parcours:
      'Elle dépiste et prend en charge les troubles de la vision, strabisme, amblyopie, fatigue visuelle, ainsi que les troubles des apprentissages, chez l’enfant comme chez l’adulte. Elle accompagne aussi les athlètes, de la commotion cérébrale à la performance visuelle.',
    langues: ['Anglais'],
    photo: 'marieCouineau',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/orthoptiste/avon/marie-couineau?pid=practice-466521' },
  },

  /* Bien-être */
  {
    nom: 'Malika Pereira',
    discipline: 'bien-etre',
    fonction: 'Massages bien-être et conseil en nutrition',
    specialites: ['Deep tissue', 'Drainages lymphatiques', 'Anti-cellulite', 'Nutrition'],
    parcours: 'Massages bien-être en profondeur, drainages et conseil en nutrition, au centre sur rendez-vous.',
    photo: 'malikaPereira',
    reservation: { type: 'telephone', affichage: '06 24 11 42 19', lien: 'tel:+33624114219' },
  },

  /* Préparateurs physiques */
  {
    nom: 'Johan Pereira',
    discipline: 'preparation',
    fonction: 'Préparateur physique, étiopathe',
    specialites: ['Réathlétisation', 'Biomécanique du sport', 'Bilans physiologiques'],
    parcours:
      'Ancien footballeur à l’ESTAC, diplômé en préparation physique et réathlétisation, puis en biomécanique du sport. Il a fondé Hygie pour réunir santé, sport et prévention au même endroit.',
    photo: 'johanPereira',
    reservation: essai,
  },
  {
    nom: 'Martin Tondeur',
    discipline: 'preparation',
    fonction: 'Préparateur physique',
    specialites: ['Coaching individuel', 'Cross training'],
    photo: 'martinTondeur',
    reservation: essai,
  },
  {
    nom: 'Jean-Etienne Boilot',
    discipline: 'preparation',
    fonction: 'Préparateur physique',
    specialites: ['Coaching individuel', 'Sport-santé'],
    photo: 'jeanEtienneBoilot',
    reservation: essai,
  },
];

export function praticiensDe(discipline: Discipline) {
  return praticiens.filter((p) => p.discipline === discipline);
}

/* Libellé du bouton : « Prendre rendez-vous » pour les praticiens (Doctolib ou agenda en ligne),
   « Réserver l’essai » pour la séance de sport offerte, le numéro pour les prises de rendez-vous par téléphone. */
export function libelleReservation(r: Reservation) {
  if (r.type === 'calendly' && r.url.startsWith('/')) return 'Réserver l’essai';
  if (r.type === 'telephone') return `Appeler le ${r.affichage}`;
  return 'Prendre rendez-vous';
}

/* Initiales pour la carte sans photo (deux lettres) */
export function initiales(nom: string) {
  return nom
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0]?.toUpperCase() ?? '')
    .join('');
}
