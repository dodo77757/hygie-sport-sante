/* Sportifs professionnels suivis par Johan Pereira, d'après la liste publiée sur le site actuel (page Étiopathe).
   Photos : Wikimedia Commons, sous licence libre ; chacune est créditée sous la galerie et dans les mentions légales.
   Le centre peut remplacer ces photos par les siennes (Johan avec les athlètes) : il suffit de changer `photo`.
   Sans photo, la carte affiche les initiales sur un aplat de couleur. */
import type { StaticImageData } from 'next/image';
import carolleZahi from '@/assets/photos/athletes/carolle-zahi.jpg';
import cheickDoucoure from '@/assets/photos/athletes/cheick-doucoure.jpg';
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

export const athletes: Athlete[] = [
  {
    nom: 'Mekdes Woldu',
    discipline: 'Marathon',
    detail: 'Jeux olympiques de Paris 2024',
  },
  {
    nom: 'Cheick Doucouré',
    discipline: 'Football',
    detail: 'Milieu de terrain, international malien',
    photo: {
      src: cheickDoucoure,
      alt: 'Cheick Doucouré à l’échauffement, sous le maillot du RC Lens',
      position: '50% 20%',
      credit: {
        auteur: 'Supporterhéninois',
        licence: 'CC0',
        licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.fr',
        source: 'https://commons.wikimedia.org/wiki/File:RC_Lens_-_FC_Metz_(14-03-2021)_73.jpg',
      },
    },
  },
  {
    nom: 'Bobo Sacko',
    discipline: 'Muay-thaï',
  },
  {
    nom: 'Marie-Divine Kouamé',
    discipline: 'Cyclisme sur piste',
    detail: 'Championne du monde du 500 m 2022',
    photo: {
      src: marieDivineKouame,
      alt: 'Marie-Divine Kouamé en maillot de l’équipe de France, sur un vélodrome',
      position: '50% 30%',
      credit: {
        auteur: 'Nicola',
        licence: 'CC BY-SA 4.0',
        licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
        source: 'https://commons.wikimedia.org/wiki/File:2019_UCI_Juniors_Track_World_Championships_055.jpg',
      },
    },
  },
  {
    nom: 'Trey Vimalin',
    discipline: 'Football',
  },
  {
    nom: 'Iscaye Diana',
    discipline: 'Athlétisme',
  },
  {
    nom: 'Leïla Hadji',
    discipline: 'Athlétisme',
  },
  {
    nom: 'Carolle Zahi',
    discipline: 'Athlétisme, sprint',
    detail: '100 m et relais 4 × 100 m',
    photo: {
      src: carolleZahi,
      alt: 'Carolle Zahi en maillot de l’équipe de France, aux Jeux méditerranéens de 2018',
      position: '50% 30%',
      credit: {
        auteur: 'Vanbasten 23',
        licence: 'CC BY-SA 4.0',
        licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
        source: 'https://commons.wikimedia.org/wiki/File:Carolle_Zahi_2018_(cropped).jpg',
      },
    },
  },
  {
    nom: 'Oualy Tandia',
    discipline: 'MMA',
  },
];

/** Photos à créditer (auteur et licence), pour la galerie et les mentions légales */
export function creditsAthletes() {
  return athletes.flatMap((a) => (a.photo ? [{ nom: a.nom, ...a.photo.credit }] : []));
}
