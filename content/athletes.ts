/* Sportifs professionnels suivis par Johan Pereira, d'après la liste publiée sur le site actuel (page Étiopathe).
   Noms, disciplines et mentions vérifiés (Wikipédia, Fédération française d'athlétisme, publications d'Hygie).
   Photos, deux provenances :
   - Wikimedia Commons, sous licence libre : créditées sous la galerie et dans les mentions légales ;
   - publications Instagram d'Hygie (le sportif au centre, ou fêté par le centre) : à faire confirmer par le centre
     (accord du sportif, et du photographe quand il est cité).
   Pour ajouter ou remplacer une photo : déposer le fichier dans assets/photos/athletes/ et renseigner `photo`.
   Affichage : les sportifs avec photo forment la galerie, les autres la liste « Également suivis » juste en dessous. */
import type { StaticImageData } from 'next/image';
import boboSacko from '@/assets/photos/athletes/bobo-sacko.jpg';
import carolleZahi from '@/assets/photos/athletes/carolle-zahi.jpg';
import cheickDoucoure from '@/assets/photos/athletes/cheick-doucoure.jpg';
import leilaHadji from '@/assets/photos/athletes/leila-hadji.jpg';
import marieDivineKouame from '@/assets/photos/athletes/marie-divine-kouame.jpg';
import mekdesWoldu from '@/assets/photos/athletes/mekdes-woldu.jpg';
import oualyTandia from '@/assets/photos/athletes/oualy-tandia.jpg';
import treyVimalin from '@/assets/photos/athletes/trey-vimalin.jpg';

type CreditLibre = { type: 'libre'; auteur: string; licence: string; licenceUrl: string; source: string };
type CreditHygie = { type: 'hygie'; source: string; photographe?: string };

export type PhotoAthlete = {
  src: StaticImageData;
  alt: string;
  position?: string;
  credit: CreditLibre | CreditHygie;
};

export type Athlete = {
  nom: string;
  discipline: string;
  /** Mention courte, vérifiée */
  detail?: string;
  photo?: PhotoAthlete;
};

const cc0 = { type: 'libre' as const, licence: 'CC0', licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.fr' };
const ccBySa4 = { type: 'libre' as const, licence: 'CC BY-SA 4.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr' };

export const athletes: Athlete[] = [
  {
    nom: 'Mekdes Woldu',
    discipline: 'Marathon',
    detail: 'Jeux olympiques de Paris 2024',
    photo: {
      src: mekdesWoldu,
      alt: 'Mekdes Woldu en séance de renforcement sur le plateau d’Hygie',
      position: '50% 30%',
      credit: { type: 'hygie', source: 'https://www.instagram.com/p/DXopKu8iOfV/' },
    },
  },
  {
    nom: 'Cheick Doucouré',
    discipline: 'Football',
    detail: 'Milieu de terrain, international malien',
    photo: {
      src: cheickDoucoure,
      alt: 'Cheick Doucouré à l’échauffement, sous le maillot du RC Lens',
      position: '50% 20%',
      credit: { auteur: 'Supporterhéninois', ...cc0, source: 'https://commons.wikimedia.org/wiki/File:RC_Lens_-_FC_Metz_(14-03-2021)_73.jpg' },
    },
  },
  {
    nom: 'Bobo Sacko',
    discipline: 'Muay-thaï',
    detail: 'Champion du monde WPMF et WMC',
    photo: {
      src: boboSacko,
      alt: 'Bobo Sacko sur le ring, gants aux poings et ceinture de champion à la taille',
      position: '50% 12%',
      credit: { type: 'hygie', source: 'https://www.instagram.com/stories/highlights/18059104609327785/' },
    },
  },
  {
    nom: 'Marie-Divine Kouamé',
    discipline: 'Cyclisme sur piste',
    detail: 'Championne du monde du 500 m 2022',
    photo: {
      src: marieDivineKouame,
      alt: 'Marie-Divine Kouamé en maillot de l’équipe de France, sur un vélodrome',
      position: '50% 30%',
      credit: { auteur: 'Nicola', ...ccBySa4, source: 'https://commons.wikimedia.org/wiki/File:2019_UCI_Juniors_Track_World_Championships_055.jpg' },
    },
  },
  {
    nom: 'Carolle Zahi',
    discipline: 'Athlétisme, sprint',
    detail: '100 m et relais 4 × 100 m',
    photo: {
      src: carolleZahi,
      alt: 'Carolle Zahi en maillot de l’équipe de France, aux Jeux méditerranéens de 2018',
      position: '50% 30%',
      credit: { auteur: 'Vanbasten 23', ...ccBySa4, source: 'https://commons.wikimedia.org/wiki/File:Carolle_Zahi_2018_(cropped).jpg' },
    },
  },
  {
    nom: 'Oualy Tandia',
    discipline: 'MMA',
    photo: {
      src: oualyTandia,
      alt: 'Oualy Tandia sur le rameur, en préparation au centre Hygie',
      position: '50% 18%',
      credit: { type: 'hygie', source: 'https://www.instagram.com/p/DKaVMR3tVYn/' },
    },
  },
  {
    nom: 'Leila Hadji',
    discipline: 'Athlétisme, fond',
    photo: {
      src: leilaHadji,
      alt: 'Leila Hadji, souriante, lors d’une séance au centre Hygie',
      position: '50% 20%',
      credit: { type: 'hygie', source: 'https://www.instagram.com/p/C581ZertcDI/', photographe: 'Paolla Pix' },
    },
  },
  {
    nom: 'Diana Iscaye',
    discipline: 'Athlétisme, sprint',
    detail: 'Athle Sud 77',
  },
  {
    nom: 'Trey Vimalin',
    discipline: 'Football',
    detail: 'Gardien de but',
    photo: {
      src: treyVimalin,
      alt: 'Trey Vimalin en séance de soulevé de terre au centre Hygie',
      position: '60% 20%',
      credit: { type: 'hygie', source: 'https://www.instagram.com/p/C558blCiIFo/' },
    },
  },
];

/** Photos sous licence libre à créditer (auteur et licence), pour la galerie et les mentions légales */
export function creditsAthletes() {
  return athletes.flatMap((a) => (a.photo && a.photo.credit.type === 'libre' ? [{ nom: a.nom, ...a.photo.credit }] : []));
}

/** Sportifs dont la photo vient des publications d'Hygie (avec le photographe quand il est cité) */
export function photosHygie() {
  return athletes.flatMap((a) =>
    a.photo && a.photo.credit.type === 'hygie' ? [a.photo.credit.photographe ? `${a.nom} (photo ${a.photo.credit.photographe})` : a.nom] : [],
  );
}
