/* Sportifs professionnels suivis par Johan Pereira, d'après la liste publiée sur le site actuel (page Étiopathe).
   Noms, disciplines et mentions vérifiés (Wikipédia, Fédération française d'athlétisme).
   Photos : seules celles publiées sous licence libre (Wikimedia Commons) sont utilisées ; chacune est créditée sous la galerie
   et dans les mentions légales. Pour les autres sportifs, aucune photo libre n'existe : il faut une photo du centre
   (Johan avec l'athlète) ou l'accord de l'athlète ou du photographe. Il suffit alors de renseigner `photo`.
   Affichage : les sportifs avec photo forment la galerie, les autres la liste « Également suivis » juste en dessous. */
import type { StaticImageData } from 'next/image';
import carolleZahi from '@/assets/photos/athletes/carolle-zahi.jpg';
import cheickDoucoure from '@/assets/photos/athletes/cheick-doucoure.jpg';
import leilaHadji from '@/assets/photos/athletes/leila-hadji.jpg';
import marieDivineKouame from '@/assets/photos/athletes/marie-divine-kouame.jpg';

export type PhotoAthlete = {
  src: StaticImageData;
  alt: string;
  position?: string;
  /** Auteur, licence et page source, pour l'attribution */
  credit: { auteur: string; licence: string; licenceUrl: string; source: string };
};

export type Athlete = {
  nom: string;
  discipline: string;
  /** Mention courte, vérifiée */
  detail?: string;
  photo?: PhotoAthlete;
};

const cc0 = { licence: 'CC0', licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.fr' };
const ccBySa4 = { licence: 'CC BY-SA 4.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr' };

export const athletes: Athlete[] = [
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
    nom: 'Leila Hadji',
    discipline: 'Athlétisme, fond',
    photo: {
      src: leilaHadji,
      alt: 'Portrait de Leila Hadji, souriante, en tenue de sport',
      position: '50% 30%',
      credit: { auteur: 'JPHUBI', ...cc0, source: 'https://commons.wikimedia.org/wiki/File:IMG_E6985_Leila_Hadji_french_athlete.jpg' },
    },
  },
  {
    nom: 'Mekdes Woldu',
    discipline: 'Marathon',
    detail: 'Jeux olympiques de Paris 2024',
  },
  {
    nom: 'Bobo Sacko',
    discipline: 'Muay-thaï',
    detail: 'Champion du monde WPMF et WMC',
  },
  {
    nom: 'Diana Iscaye',
    discipline: 'Athlétisme, sprint',
    detail: 'Athle Sud 77',
  },
  {
    nom: 'Oualy Tandia',
    discipline: 'MMA',
  },
  {
    nom: 'Trey Vimalin',
    discipline: 'Football',
  },
];

/** Photos à créditer (auteur et licence), pour la galerie et les mentions légales */
export function creditsAthletes() {
  return athletes.flatMap((a) => (a.photo ? [{ nom: a.nom, ...a.photo.credit }] : []));
}
