/* Praticiens qui consultent au centre et leur lien de réservation.
   Sans lien en ligne, le bouton propose d'appeler le centre (ou le praticien).
   parcours : deux phrases rédigées d'après les présentations publiques des praticiens (Doctolib), à faire relire par chacun.
      photo : clé dans content/images.ts (portraits dans assets/photos/equipe/) ; sans photo, la carte affiche les initiales.
      Portraits d'Alexis Ballard, Antoine Gras et Jérémy Escriva : leur photo de profil Doctolib ; Malika Pereira : présentation de l'équipe
   publiée par Hygie sur Instagram (fond uniformisé). À faire valider par chacun. */
import type { PhotoKey } from './images';
import { site } from './site';
import { LIEN_ESSAI } from './valeurs';

export type Discipline = 'kinesitherapie' | 'etiopathie' | 'orthoptie' | 'bien-etre' | 'preparation';

export type Reservation =
  | { type: 'doctolib'; url: string }
  | { type: 'calendly'; url: string }
  | { type: 'essai'; url: string }
  | { type: 'telephone'; affichage: string; lien: string };

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
  /** Retiré de l'affichage (cartes, fiches, rendez-vous, décompte), données conservées */
  masque?: boolean;
};

/* note : mention affichée sur la page de rendez-vous (textes du site, onglet Praticiens de santé) */
export const disciplines: Record<Discipline, { nom: string; fiche?: string; note?: string }> = {
  kinesitherapie: {
    nom: 'Kinésithérapie',
    fiche: '/sante/kinesitherapie',
    note: 'Tarifs variables selon le praticien ; certains appliquent des dépassements d’honoraires.',
  },
  etiopathie: {
    nom: 'Étiopathie',
    fiche: '/sante/etiopathie',
    note: 'Non remboursée par la Sécurité sociale ; de nombreuses mutuelles participent.',
  },
  orthoptie: {
    nom: 'Orthoptie',
    fiche: '/sante/orthoptie',
    note: 'Sans créneau en ligne, écrivez via la messagerie Doctolib.',
  },
  'bien-etre': {
    nom: 'Massages et nutrition',
    fiche: '/recuperation/massages',
    note: 'Sur rendez-vous, par l’accueil au 01 84 74 34 20.',
  },
  preparation: {
    nom: 'Préparation physique',
    fiche: '/sport/coaching-individuel',
    note: 'Première séance d’une heure offerte.',
  },
};

/* Réservation d'étiopathie de Johan Pereira (bouton « Consulter Johan » de la page Méthode) */
export const RESERVATION_ETIOPATHIE_JOHAN = 'https://calendly.com/pereira-johan/etiopatheavon';

/* Séance d'essai : son lien de réservation (content/valeurs.ts), sinon le formulaire de rappel */
const essai: Reservation = { type: 'essai', url: LIEN_ESSAI };

export const praticiens: Praticien[] = [
  /* Kinésithérapeutes : bio courte et spécialités des textes du site (25 septembre 2026), validées par chaque kiné */
  {
    nom: 'Naomée Addra',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kiné du sport', 'Épaule', 'Enfants et adolescents'],
    parcours: 'Reçoit tous les âges, du jeune enfant au senior, avec une attention particulière au sport et à la récupération. Formée aux ventouses.',
    langues: ['Anglais'],
    photo: 'naomeeAddra',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/naomee-addra' },
  },
  {
    nom: 'Gauthier Arcache',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute, ostéopathe',
    specialites: ['Ostéopathie', 'McKenzie', 'Épaule'],
    parcours:
      'Kinésithérapeute et ostéopathe. Fonde chaque prise en charge sur un bilan et des objectifs fixés ensemble. Formé à la méthode McKenzie et à l’épaule opérée.',
    langues: ['Anglais', 'Espagnol'],
    photo: 'gauthierArcache',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/paris/gauthier-arcache?pid=practice-478056' },
  },
  {
    nom: 'Alexis Ballard',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kiné du sport', 'Main et poignet', 'Course à pied'],
    parcours: 'Troubles musculo-squelettiques, expertise main et poignet et pathologies du coureur.',
    photo: 'alexisBallard',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/alexis-ballard' },
  },
  {
    nom: 'Antoine Gras',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kiné du sport', 'Post-opératoire', 'Réathlétisation'],
    parcours:
      'Dos, cou, épaule, genou, cheville, hanche ; rééducation orthopédique et post-opératoire (fractures, prothèses, ligaments) ; récupération sportive.',
    photo: 'antoineGras',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/paris/antoine-gras' },
  },
  {
    nom: 'Romain Brelier-Murry',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kiné du sport', 'Épaule', 'Traumatologie', 'Cheville'],
    parcours: 'Kiné du sport : troubles articulaires et musculaires, traumatologie, épaule, atteintes nerveuses périphériques.',
    langues: ['Anglais'],
    photo: 'romainBrelierMurry',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/romain-brelier-murry' },
  },
  {
    nom: 'Thomas Crasson',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Dos et cervicales', 'Blessures sportives', 'Post-opératoire', 'Téléconsultation'],
    parcours: 'Prise en charge globale fondée sur les sciences du mouvement : dos, tendinites, entorses, post-opératoire, posture.',
    photo: 'thomasCrasson',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/thomas-crasson' },
  },
  {
    nom: 'Margot De Oliveira',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Kiné du sport', 'Épaule', 'Cheville'],
    parcours: 'Kiné du sport, traumatologie, formée à l’optimisation du renforcement musculaire. Au centre depuis 2023.',
    photo: 'margotDeOliveira',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/margot-de-oliveira' },
  },
  {
    nom: 'Pierre Becker',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Thérapie manuelle', 'Dry needling', 'Mâchoire', 'Kiné du sport'],
    parcours: 'Thérapies manuelles et rééducation, vers l’autonomie du patient.',
    photo: 'pierreBecker',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/pierre-becker' },
  },
  {
    nom: 'Jérémy Escriva',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Orthopédie', 'Tendinopathies', 'Membre inférieur', 'Épaule'],
    parcours: 'Orthopédie (entorses, déchirures, fractures) et douleurs rhumatismales. Formé récemment aux lésions musculaires du membre inférieur.',
    langues: ['Anglais'],
    photo: 'jeremyEscriva',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/jeremy-escriva' },
  },
  {
    nom: 'Maya Maurer',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Santé de la femme', 'Périnée', 'Post-partum', 'Drainage'],
    parcours: 'Santé de la femme : périnée et abdominaux, pré et post-partum, endométriose, suivi après cancer du sein, drainage lymphatique.',
    photo: 'mayaMaurer',
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/maya-maurer' },
  },

  /* Étiopathe : Johan Pereira (« Votre étiopathe », textes du site) */
  {
    nom: 'Johan Pereira',
    discipline: 'etiopathie',
    fonction: 'Étiopathe, fondateur d’Hygie',
    specialites: ['Sportifs', 'Biomécanique du sport'],
    parcours:
      'Formé comme footballeur à l’ESTAC, diplômé de la faculté d’étiopathie de Paris, où il est chargé de cours. Deux diplômes universitaires en préparation physique et réathlétisation puis en biomécanique du sport.',
    photo: 'johanPereira',
    reservation: { type: 'calendly', url: RESERVATION_ETIOPATHIE_JOHAN },
  },
  {
    nom: 'Aubin Salmon',
    discipline: 'etiopathie',
    fonction: 'Étiopathe',
    specialites: ['Grimpeurs et sportifs'],
    parcours: 'Chargé de cours à la faculté d’étiopathie de Paris. Grimpeur, il suit en particulier les pratiquants d’escalade.',
    photo: 'aubinSalmon',
    reservation: { type: 'calendly', url: 'https://calendly.com/aubinsalmon-etio' },
    /* Un seul étiopathe affiché, Johan Pereira, comme dans les textes du site (25 septembre 2026) */
    masque: true,
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
    /* Les rendez-vous passent par l'accueil */
    reservation: { type: 'telephone', affichage: site.telephone.affichage, lien: site.telephone.lien },
  },

  /* Préparateurs physiques (« L’équipe sport », textes du site) */
  {
    nom: 'Johan Pereira',
    discipline: 'preparation',
    fonction: 'Préparateur physique, étiopathe',
    specialites: ['Réathlétisation', 'Biomécanique du sport', 'Bilans physiologiques', 'Sportifs de haut niveau'],
    /* Parcours actuel conservé : les textes du site ne donnent que la fonction et les spécialités pour l'équipe sport */
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
    nom: 'Jean-Étienne Boilot',
    discipline: 'preparation',
    fonction: 'Préparateur physique',
    specialites: ['Coaching individuel', 'Sport-santé'],
    photo: 'jeanEtienneBoilot',
    reservation: essai,
  },
];

/** Praticiens affichés (sans ceux retirés de l'affichage) */
export const praticiensAffiches = praticiens.filter((p) => !p.masque);

export function praticiensDe(discipline: Discipline) {
  return praticiensAffiches.filter((p) => p.discipline === discipline);
}

/* Libellé du bouton : « Prendre rendez-vous » pour les praticiens (Doctolib ou agenda en ligne),
   « Réserver l’essai » pour la séance de sport offerte, le numéro pour les prises de rendez-vous par téléphone. */
export function libelleReservation(r: Reservation) {
  if (r.type === 'essai') return 'Réserver l’essai';
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
