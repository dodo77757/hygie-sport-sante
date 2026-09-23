/* Bloc « Ils nous font confiance » de l'accueil : partenariat Maison Sport-Santé, logos de partenaires, avis Google.
   Les partenaires sont à renseigner avec les logos fournis par le centre (aucun logo ne doit être inventé) :
   déposer le fichier dans public/partenaires/ (SVG ou PNG sur fond transparent, environ 240 × 96 px) et l'ajouter ci-dessous. */

export type Partenaire = {
  nom: string;
  /** Chemin public du logo, par exemple /partenaires/club.svg */
  logo: string;
  url?: string;
  /** Club, entreprise, institution… affiché sous le logo */
  type?: string;
};

export const maisonSportSante = {
  nom: 'Maison Sport-Santé de Fontainebleau',
  url: 'https://www.fontainebleau-sport-sante.org/',
  texte:
    'Hygie est partenaire de la Maison Sport-Santé de Fontainebleau, dispositif labellisé par l’État qui accompagne vers une activité physique adaptée les personnes atteintes de maladies chroniques ou éloignées du sport.',
};

export const partenaires: Partenaire[] = [
  /* Exemple, à remplacer par les vrais partenaires :
  { nom: 'US Avon Football', logo: '/partenaires/us-avon.svg', url: 'https://…', type: 'Club' }, */
];
