/* Photos du site.
   Photos de sport : Unsplash (licence Unsplash, usage commercial libre, sans attribution obligatoire ;
   les auteurs sont crédités dans les mentions légales). Servies en haute définition par le CDN d'Unsplash,
   à la largeur utile et en AVIF ou WebP (voir components/Photo.tsx).
   Portraits de l'équipe : photos d'Hygie (assets/photos/equipe/), reprises en haute définition du site actuel ;
      celles de Marie Couineau, Pierre Becker et Thomas Crasson ont été agrandies (super-résolution) en attendant les originaux.
   Alexis Ballard, Antoine Gras, Jérémy Escriva : photo de profil Doctolib. Kevin Vautier : portrait fourni par Hygie (novembre 2026). Malika Pereira : publication Instagram d'Hygie. */
import type { StaticImageData } from 'next/image';
import johanPereira from '@/assets/photos/johan-pereira.jpg';
import alexisBallard from '@/assets/photos/equipe/alexis-ballard.jpg';
import antoineGras from '@/assets/photos/equipe/antoine-gras.jpg';
import aubinSalmon from '@/assets/photos/equipe/aubin-salmon.jpg';
import gauthierArcache from '@/assets/photos/equipe/gauthier-arcache.jpg';
import jeanEtienneBoilot from '@/assets/photos/equipe/jean-etienne-boilot.jpg';
import jeremyEscriva from '@/assets/photos/equipe/jeremy-escriva.jpg';
import kevinVautier from '@/assets/photos/equipe/kevin-vautier.jpg';
import malikaPereira from '@/assets/photos/equipe/malika-pereira.jpg';
import margotDeOliveira from '@/assets/photos/equipe/margot-de-oliveira.jpg';
import marieCouineau from '@/assets/photos/equipe/marie-couineau.jpg';
import martinTondeur from '@/assets/photos/equipe/martin-tondeur.jpg';
import mayaMaurer from '@/assets/photos/equipe/maya-maurer.jpg';
import naomeeAddra from '@/assets/photos/equipe/naomee-addra.jpg';
import pierreBecker from '@/assets/photos/equipe/pierre-becker.jpg';
import romainBrelierMurry from '@/assets/photos/equipe/romain-brelier-murry.jpg';
import thomasCrasson from '@/assets/photos/equipe/thomas-crasson.jpg';

export type Photo = {
  src: StaticImageData | string;
  width?: number;
  height?: number;
  alt: string;
  position?: string;
  /** Couleur dominante, affichée pendant le chargement */
  couleur?: string;
  credit?: { nom: string; profil: string };
};

function unsplash(chemin: string, width: number, height: number, alt: string, couleur: string, nom: string, profil: string, position?: string): Photo {
  return {
    src: `https://images.unsplash.com/${chemin}`,
    width,
    height,
    alt,
    position,
    couleur,
    credit: { nom, profil: `https://unsplash.com/@${profil}` },
  };
}

export const photos = {
  johanPereira: { src: johanPereira, alt: 'Johan Pereira, fondateur d’Hygie', position: '50% 22%' } as Photo,

  /* Équipe : portraits 2/3, le visage dans le tiers supérieur (position réglée pour le recadrage 4/5 des cartes) */
  alexisBallard: { src: alexisBallard, alt: 'Alexis Ballard, kinésithérapeute', position: '50% 22%' } as Photo,
  antoineGras: { src: antoineGras, alt: 'Antoine Gras, kinésithérapeute', position: '50% 20%' } as Photo,
  aubinSalmon: { src: aubinSalmon, alt: 'Aubin Salmon, étiopathe', position: '50% 24%' } as Photo,
  gauthierArcache: { src: gauthierArcache, alt: 'Gauthier Arcache, kinésithérapeute et ostéopathe', position: '50% 24%' } as Photo,
  jeanEtienneBoilot: { src: jeanEtienneBoilot, alt: 'Jean-Étienne Boilot, préparateur physique', position: '50% 28%' } as Photo,
  jeremyEscriva: { src: jeremyEscriva, alt: 'Jérémy Escriva, kinésithérapeute', position: '50% 20%' } as Photo,
  kevinVautier: { src: kevinVautier, alt: 'Kevin Vautier, kinésithérapeute', position: '50% 24%' } as Photo,
  malikaPereira: { src: malikaPereira, alt: 'Malika Pereira, massages bien-être et conseil en nutrition', position: '50% 30%' } as Photo,
  margotDeOliveira: { src: margotDeOliveira, alt: 'Margot De Oliveira, kinésithérapeute', position: '50% 28%' } as Photo,
  marieCouineau: { src: marieCouineau, alt: 'Marie Couineau, orthoptiste', position: '50% 26%' } as Photo,
  martinTondeur: { src: martinTondeur, alt: 'Martin Tondeur, préparateur physique', position: '50% 30%' } as Photo,
  mayaMaurer: { src: mayaMaurer, alt: 'Maya Maurer, kinésithérapeute', position: '50% 24%' } as Photo,
  naomeeAddra: { src: naomeeAddra, alt: 'Naomée Addra, kinésithérapeute', position: '50% 26%' } as Photo,
  pierreBecker: { src: pierreBecker, alt: 'Pierre Becker, kinésithérapeute', position: '50% 26%' } as Photo,
  romainBrelierMurry: { src: romainBrelierMurry, alt: 'Romain Brelier-Murry, kinésithérapeute', position: '50% 24%' } as Photo,
  thomasCrasson: { src: thomasCrasson, alt: 'Thomas Crasson, kinésithérapeute', position: '50% 26%' } as Photo,

  depart: unsplash(
    'photo-1644492097455-d5f39f458fcd',
    6024,
    4015,
    'Une sportive en position de départ sur une piste d’athlétisme, une attelle au genou',
    '#8ca6a6',
    'Eagle Media Pro',
    'eaglemediapro',
    '52% 58%', // image de partage : la sportive entière. Sur l'accueil, la planche d'anatomie la cadre au centre (calques calés sur ce cadrage)
  ),
  mainsDos: unsplash(
    'photo-1699523229208-be1e1dd9252d',
    6016,
    4016,
    'Les mains d’un praticien posées sur le dos d’un patient',
    '#594040',
    'Edward Muntinga',
    'edwardmuntinga',
    '50% 40%',
  ),
  kine: unsplash(
    'photo-1770012905139-713758ded6ec',
    1862,
    2800,
    'Une kinésithérapeute guide les exercices d’une patiente à la barre',
    '#6F5C49',
    'Performance Medicine',
    'performance_medicine1',
    '50% 45%',
  ),
  manipulation: unsplash(
    'photo-1768507423533-b87b62769758',
    3376,
    6000,
    'Un praticien manipule le haut du dos d’un patient allongé',
    '#756D6B',
    'Julius Toltesi',
    'julius_toltesi',
    '50% 55%',
  ),
  vision: unsplash(
    'photo-1757386320806-e3f03c9f41e8',
    5088,
    3392,
    'Une patiente regarde à travers un appareil d’examen de la vue',
    '#59585C',
    'Judy Beth Morris',
    'judy_beth_morris_idaho',
    '50% 45%',
  ),
  coachSquat: unsplash(
    'photo-1541534741688-6078c6bfb5c5',
    5192,
    3466,
    'Une sportive soulève une barre au-dessus de la tête, vue de dos',
    '#484C4C',
    'John Arano',
    'johnarano',
    '50% 40%',
  ),
  coachPompes: unsplash(
    'photo-1584466977773-e625c37cdd50',
    4294,
    6441,
    'Un coach encadre un sportif au développé couché, dans une salle sombre',
    '#3F3E39',
    'Nathan Dumlao',
    'nate_dumlao',
    '50% 45%',
  ),
  coachEcoute: unsplash(
    'photo-1616279969722-d81a5a3944ef',
    5028,
    6844,
    'Un coach accompagne une sportive pendant un exercice au banc',
    '#717678',
    'Graham Mansfield',
    'grahammansfield1',
    '50% 40%',
  ),
  coachTablette: unsplash(
    'photo-1745872708309-98f3f13bb842',
    6000,
    4000,
    'Une tablette affiche un chronomètre devant un rameur, dans une salle d’entraînement',
    '#373B37',
    'Marco Angelo',
    'marcoangelo',
    '50% 55%',
  ),
  coachSouleve: unsplash(
    'photo-1595155323552-ca2b04582536',
    4480,
    5600,
    'Une sportive pose le pied sur une box, dans une salle d’entraînement',
    '#73716B',
    'Alexander Jawfox',
    'jawfox_photography',
    '55% 50%',
  ),
  senior: unsplash(
    'photo-1657289174053-fc19f9fd9aab',
    2658,
    4726,
    'Un sportif monte sur une box, dans une salle d’entraînement',
    '#3A3022',
    'Federico Faccipieri',
    'efecubo',
    '50% 55%',
  ),
  kettlebell: unsplash(
    'photo-1644085159448-1659fd88a217',
    4000,
    4000,
    'Une main serre la poignée d’un kettlebell dans un nuage de magnésie',
    '#201613',
    'Jan Gunnar Nygård',
    'jangnyg',
    '50% 45%',
  ),
  football: unsplash(
    'photo-1739550635585-484633b21450',
    6369,
    4246,
    'Des joueurs de football à l’entraînement',
    '#d9d9d9',
    'Omar Ramadan',
    'omarvellous14',
    '50% 50%',
  ),
  dribble: unsplash(
    'photo-1638027611086-3b1b8f63611d',
    6000,
    3689,
    'Un footballeur conduit le ballon sur un terrain synthétique',
    '#264026',
    'Amr Taha',
    'amr_taha',
    '50% 50%',
  ),
  pressotherapie: unsplash(
    'photo-1598890265610-87f7d133647e',
    2987,
    2987,
    'Un sportif ajuste des bottes de pressothérapie sur ses jambes',
    '#534543',
    'Michael DeMoya',
    'demoya',
    '50% 50%',
  ),
  massage: unsplash(
    'photo-1745327883508-b6cd32e5dde5',
    4000,
    6000,
    'Les mains d’un praticien massent le dos d’une personne allongée',
    '#A68973',
    'Jakub Klucký',
    'jakubklucky',
    '50% 50%',
  ),
  nutrition: unsplash(
    'photo-1540189549336-e6e99c3679fe',
    4000,
    6000,
    'Une salade composée dans une assiette sombre, avec un jus d’orange',
    '#5A5239',
    'Eiliv Aceron',
    'shootdelicious',
    '50% 55%',
  ),
  extensionJambe: unsplash(
    'photo-1743944701179-487518476c3a',
    6453,
    4300,
    'Un sportif travaille la force du genou sur une machine',
    '#260c0c',
    'john livingstone',
    'johnliv',
    '45% 45%',
  ),
  presseJambes: unsplash(
    'photo-1675026482808-33f7515ecddd',
    7189,
    4795,
    'Une sportive sur une presse à cuisses',
    '#d9d9d9',
    'Nate Johnston',
    'natejohnston',
    '45% 50%',
  ),
  souleve: unsplash(
    'photo-1521804906057-1df8fdb718b7',
    5184,
    3456,
    'Un sportif saisit une barre chargée posée au sol',
    '#65645D',
    'Victor Freitas',
    'victorfreitas',
    '50% 50%',
  ),
  boxJump: unsplash(
    'photo-1536922246289-88c42f957773',
    3960,
    2541,
    'Deux sportives sautent sur des box en bois',
    '#737368',
    'Meghan Holmes',
    'yellowteapot',
    '50% 40%',
  ),
  agilite: unsplash(
    'photo-1698671823406-035c77ff6fcd',
    2711,
    3795,
    'Un sprinteur au départ d’une course, vu d’en haut',
    '#742827',
    'Tom Morbey',
    'tommorbey',
    '50% 45%',
  ),
  groupe: unsplash(
    'photo-1723117417879-2effcca63cda',
    6624,
    4416,
    'Une séance collective en salle, fentes avec haltères',
    '#d9c0c0',
    'Gold’s Gym Nepal',
    'goldsgymnepal',
    '50% 45%',
  ),
  groupeExterieur: unsplash(
    'photo-1607962837359-5e7e89f86776',
    5377,
    3585,
    'Un groupe s’entraîne en extérieur',
    '#262626',
    'Gabin Vallet',
    'gabinvallet',
    '50% 45%',
  ),
  course: unsplash(
    'photo-1499438075715-fc23ef376ab9',
    4821,
    3409,
    'Un cycliste en plein effort, en noir et blanc',
    '#131313',
    'Josh Nuttall',
    'jjnuttall',
    '40% 50%',
  ),
  traineau: unsplash(
    'photo-1739283180408-e64cfd394c5e',
    6240,
    4160,
    'Un athlète pousse un traîneau lesté',
    '#404040',
    'Alexandre Ricart',
    'alexandriart007',
    '50% 45%',
  ),
  sprintDepart: unsplash(
    'photo-1526676317768-d9b14f15615a',
    4000,
    6000,
    'Un sprinteur s’élance des starting-blocks sur une piste',
    '#894C46',
    'Nicolas Hoizey',
    'nhoizey',
    '50% 40%',
  ),
  etirement: unsplash('photo-1597586594276-456f8c50b82d', 5466, 3644, 'Une femme s’étire au sol dans un loft', '#262626', 'Alex Shaw', 'matt909', '40% 55%'),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/* Auteurs des photos Unsplash, pour les mentions légales */
export function creditsPhotos() {
  const vus = new Map<string, string>();
  for (const p of Object.values(photos) as Photo[]) if (p.credit) vus.set(p.credit.nom, p.credit.profil);
  return [...vus.entries()].map(([nom, profil]) => ({ nom, profil }));
}

/* Image de partage (Open Graph, données structurées) : 1 200 × 630, recadrée sur le point d'intérêt de la photo. */
export function imagePartage(photo: Photo): { url: string; width: number; height: number; alt: string } {
  if (typeof photo.src !== 'string') return { url: photo.src.src, width: photo.src.width, height: photo.src.height, alt: photo.alt };
  const [x = 50, y = 50] = (photo.position ?? '50% 50%').split(' ').map((v) => parseFloat(v));
  const base = photo.src.split('?')[0];
  return {
    url: `${base}?fm=jpg&q=80&w=1200&h=630&fit=crop&crop=focalpoint&fp-x=${(x / 100).toFixed(2)}&fp-y=${(y / 100).toFixed(2)}`,
    width: 1200,
    height: 630,
    alt: photo.alt,
  };
}
