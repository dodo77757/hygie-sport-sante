/* Praticiens qui consultent au centre et leur lien de réservation.
   Sans lien en ligne, le bouton propose d'appeler le centre (ou le praticien). */

export type Discipline = 'kinesitherapie' | 'etiopathie' | 'orthoptie' | 'bien-etre';

export type Reservation =
  | { type: 'doctolib'; url: string }
  | { type: 'calendly'; url: string }
  | { type: 'telephone'; affichage: string; lien: string };

export type Praticien = {
  nom: string;
  discipline: Discipline;
  fonction: string;
  specialites: string[];
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
};

const centre: Reservation = { type: 'telephone', affichage: '01 84 74 34 20', lien: 'tel:+33184743420' };

export const praticiens: Praticien[] = [
  /* Kinésithérapeutes */
  {
    nom: 'Naomée Addra',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle', 'Kinésithérapie du sport', 'Adolescents'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/naomee-addra' },
  },
  {
    nom: 'Gauthier Arcache',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute, ostéopathe',
    specialites: ['Rééducation fonctionnelle', 'Ostéopathie'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/paris/gauthier-arcache?pid=practice-478056' },
  },
  {
    nom: 'Alexis Ballard',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle'],
    reservation: centre,
  },
  {
    nom: 'Théo Borragini',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/theo-borragini' },
  },
  {
    nom: 'Romain Brelier-Murry',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle', 'Kinésithérapie du sport'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/romain-brelier-murry' },
  },
  {
    nom: 'Thomas Crasson',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle', 'Téléconsultation'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/thomas-crasson' },
  },
  {
    nom: 'Margot De Oliveira',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/margot-de-oliveira' },
  },
  {
    nom: 'Pierre Becker',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle', 'Dry needling'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/pierre-becker' },
  },
  {
    nom: 'Jérémy Escriva',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/jeremy-escriva' },
  },
  {
    nom: 'Maya Maurer',
    discipline: 'kinesitherapie',
    fonction: 'Kinésithérapeute',
    specialites: ['Rééducation fonctionnelle', 'Rééducation périnéale', 'Pré et post-partum', 'Cancer du sein', 'Drainage lymphatique'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/masseur-kinesitherapeute/avon/maya-maurer' },
  },

  /* Étiopathes */
  {
    nom: 'Johan Pereira',
    discipline: 'etiopathie',
    fonction: 'Étiopathe, fondateur d’Hygie',
    specialites: ['Chargé de cours à la faculté d’étiopathie de Paris', 'Sportifs'],
    reservation: { type: 'calendly', url: 'https://calendly.com/pereira-johan/etiopatheavon' },
  },
  {
    nom: 'Aubin Salmon',
    discipline: 'etiopathie',
    fonction: 'Étiopathe',
    specialites: ['Chargé de cours à la faculté d’étiopathie de Paris', 'Escalade'],
    reservation: { type: 'calendly', url: 'https://calendly.com/aubinsalmon-etio' },
  },

  /* Orthoptiste */
  {
    nom: 'Marie Couineau',
    discipline: 'orthoptie',
    fonction: 'Orthoptiste',
    specialites: ['Bilans orthoptiques et neurovisuels', 'Rééducation', 'Commotion cérébrale'],
    reservation: { type: 'doctolib', url: 'https://www.doctolib.fr/orthoptiste/avon/marie-couineau?pid=practice-466521' },
  },

  /* Bien-être */
  {
    nom: 'Malika Pereira',
    discipline: 'bien-etre',
    fonction: 'Massages bien-être et conseil en nutrition',
    specialites: ['Deep tissue', 'Drainages lymphatiques', 'Anti-cellulite', 'Nutrition'],
    reservation: { type: 'telephone', affichage: '06 24 11 42 19', lien: 'tel:+33624114219' },
  },
];

export function praticiensDe(discipline: Discipline) {
  return praticiens.filter((p) => p.discipline === discipline);
}

export function libelleReservation(r: Reservation) {
  if (r.type === 'doctolib') return 'Réserver sur Doctolib';
  if (r.type === 'calendly') return 'Réserver en ligne';
  return `Appeler le ${r.affichage}`;
}
