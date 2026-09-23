/* Photos du site.
   Photos de sport : Unsplash (licence Unsplash, usage commercial libre, sans attribution obligatoire ;
   les auteurs sont crédités dans les mentions légales). Servies en haute définition par le CDN d'Unsplash,
   à la largeur utile et en AVIF ou WebP (voir components/Photo.tsx).
   Portrait de Johan Pereira : photo d'Hygie. */
import type { StaticImageData } from 'next/image';
import johanPereira from '@/assets/photos/johan-pereira.jpg';

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

  depart: unsplash('photo-1644492097455-d5f39f458fcd', 6024, 4015, 'Une sportive en position de départ sur une piste d’athlétisme, une attelle au genou', '#8ca6a6', 'Eagle Media Pro', 'eaglemediapro', '52% 100%'),
  mainsDos: unsplash('photo-1699523229208-be1e1dd9252d', 6016, 4016, 'Les mains d’un praticien posées sur le dos d’un patient', '#594040', 'Edward Muntinga', 'edwardmuntinga', '50% 40%'),
  kine: unsplash('photo-1649751361457-01d3a696c7e6', 3701, 2468, 'Un kinésithérapeute examine la jambe d’un patient allongé', '#d9d9d9', 'yury kirillov', 'relievemassage', '55% 45%'),
  manipulation: unsplash('photo-1706353399656-210cca727a33', 5412, 3608, 'Un praticien réalise une manipulation sur une patiente allongée sur le côté', '#f3f3f3', 'Marc Zeman', 'der_zeman', '50% 40%'),
  vision: unsplash('photo-1616163477138-508df4131a38', 3556, 2595, 'Un réfracteur d’examen de la vue, en noir et blanc', '#262626', 'Quincy Follweiler', 'fortress', '50% 45%'),
  coachSquat: unsplash('photo-1648542036561-e1d66a5ae2b1', 7900, 5267, 'Un coach corrige le squat d’une sportive avec un kettlebell', '#262626', 'maxhome fitness', 'maxhomefitness_9252382_sink', '45% 40%'),
  coachPompes: unsplash('photo-1571019614242-c5c5dee9f50b', 5472, 3648, 'Une coach accompagne un sportif pendant des pompes', '#8c7359', 'Jonathan Borba', 'jonathanborba', '50% 45%'),
  coachEcoute: unsplash('photo-1738523686619-1b3b5d2405ee', 7008, 4672, 'Un coach échange avec une sportive dans la salle d’entraînement', '#0c2626', 'Sergio Kian', 'sergiokian', '62% 40%'),
  coachTablette: unsplash('photo-1758875568756-37a9c5c1a4f2', 3840, 2160, 'Un coach commente des résultats sur une tablette avec une sportive', '#405959', 'Vitaly Gariev', 'silverkblack', '45% 50%'),
  coachSouleve: unsplash('photo-1758875569256-f37c438cac65', 3840, 2160, 'Un coach observe une sportive pendant un soulevé de terre', '#f3f3f3', 'Vitaly Gariev', 'silverkblack', '50% 50%'),
  senior: unsplash('photo-1702648159730-00699257be79', 6048, 4024, 'Une femme court dans un parc', '#26260c', 'Centre for Ageing Better', 'ageing_better', '62% 40%'),
  kettlebell: unsplash('photo-1601422407692-ec4eeec1d9b3', 5200, 4160, 'Un sportif réalise un relevé avec un kettlebell dans une salle d’entraînement', '#262626', 'Alonso Reyes', 'alonsoreyes', '50% 45%'),
  football: unsplash('photo-1739550635585-484633b21450', 6369, 4246, 'Des joueurs de football à l’entraînement', '#d9d9d9', 'Omar Ramadan', 'omarvellous14', '50% 50%'),
  dribble: unsplash('photo-1638027611086-3b1b8f63611d', 6000, 3689, 'Un footballeur conduit le ballon sur un terrain synthétique', '#264026', 'Amr Taha', 'amr_taha', '50% 50%'),
  pressotherapie: unsplash('photo-1626440861753-c763534349b2', 5616, 3744, 'Un sportif ajuste des manchons de compression sur ses mollets, au bord d’une piste', '#8ca6a6', 'Michael DeMoya', 'demoya', '40% 45%'),
  massage: unsplash('photo-1617952986600-802f965dcdbc', 6034, 4022, 'Les mains d’une masseuse travaillent un mollet posé sur une serviette bleue', '#d9a68c', 'Bas Peperzak', 'bastroloog', '50% 45%'),
  nutrition: unsplash('photo-1606858374191-c18040e98ad7', 6720, 4480, 'Un repas équilibré préparé dans une boîte en verre', '#d9d9d9', 'Ello', 'elloproducts', '40% 50%'),
  extensionJambe: unsplash('photo-1743944701179-487518476c3a', 6453, 4300, 'Un sportif travaille la force du genou sur une machine', '#260c0c', 'john livingstone', 'johnliv', '45% 45%'),
  presseJambes: unsplash('photo-1675026482808-33f7515ecddd', 7189, 4795, 'Une sportive sur une presse à cuisses', '#d9d9d9', 'Nate Johnston', 'natejohnston', '45% 50%'),
  souleve: unsplash('photo-1517836357463-d25dfeac3438', 4933, 3289, 'Un sportif s’apprête à soulever une barre chargée', '#0c2626', 'Victor Freitas', 'victorfreitas', '50% 50%'),
  boxJump: unsplash('photo-1573858129432-f3bef7802595', 3008, 2000, 'Les pieds d’un sportif sur une plateforme de saut', '#c0c0c0', 'Eduardo Cano', 'eduardocanophotoco', '40% 50%'),
  agilite: unsplash('photo-1608138278545-366680accc66', 5568, 3712, 'Un athlète enchaîne des exercices d’appuis entre des plots', '#f3f3f3', 'Gabin Vallet', 'gabinvallet', '42% 45%'),
  groupe: unsplash('photo-1723117417879-2effcca63cda', 6624, 4416, 'Une séance collective en salle, fentes avec haltères', '#d9c0c0', 'Gold’s Gym Nepal', 'goldsgymnepal', '50% 45%'),
  groupeExterieur: unsplash('photo-1607962837359-5e7e89f86776', 5377, 3585, 'Un groupe s’entraîne en extérieur', '#262626', 'Gabin Vallet', 'gabinvallet', '50% 45%'),
  course: unsplash('photo-1553012547-284d8c582b1f', 6000, 4000, 'Une femme court au bord de l’eau, face à la ville', '#262626', 'Robert V. Ruggiero', 'rvrmakes', '50% 40%'),
  traineau: unsplash('photo-1739283180408-e64cfd394c5e', 6240, 4160, 'Un athlète pousse un traîneau lesté', '#404040', 'Alexandre Ricart', 'alexandriart007', '50% 45%'),
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
