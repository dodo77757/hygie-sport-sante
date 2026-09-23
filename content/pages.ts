/* Identité de chaque page pour le rideau de transition : le nom de l'onglet (ou de la rubrique) et sa couleur.
   Les couleurs sont celles des points du logo : Santé en bleu, Sport en jaune, Récupération en gris, Bilans en encre. */

type Couleur = 'jaune' | 'bleu' | 'bleu-fonce' | 'gris-logo' | 'encre' | 'fond';
/** fond du rideau, couleur du nom, couleur du point qui le termine */
export type Rideau = { nom: string; fond: Couleur; texte: 'encre' | 'fond'; point: Couleur };

const rubriques: Array<[prefixe: string, rideau: Rideau]> = [
  ['/sante', { nom: 'Santé', fond: 'bleu', texte: 'encre', point: 'jaune' }],
  ['/sport', { nom: 'Sport', fond: 'jaune', texte: 'encre', point: 'bleu' }],
  ['/recuperation', { nom: 'Récupération', fond: 'gris-logo', texte: 'encre', point: 'jaune' }],
  ['/bilans', { nom: 'Bilans', fond: 'encre', texte: 'fond', point: 'jaune' }],
  ['/methodologie', { nom: 'Méthode', fond: 'jaune', texte: 'encre', point: 'bleu' }],
  ['/entreprises', { nom: 'Entreprises', fond: 'bleu-fonce', texte: 'fond', point: 'jaune' }],
  ['/clubs', { nom: 'Clubs', fond: 'bleu-fonce', texte: 'fond', point: 'jaune' }],
  ['/rendez-vous', { nom: 'Rendez-vous', fond: 'jaune', texte: 'encre', point: 'bleu' }],
  ['/contact', { nom: 'Contact', fond: 'bleu', texte: 'encre', point: 'jaune' }],
  ['/journal', { nom: 'Journal', fond: 'encre', texte: 'fond', point: 'jaune' }],
  ['/soins', { nom: 'Soins', fond: 'jaune', texte: 'encre', point: 'bleu' }],
  ['/mentions-legales', { nom: 'Mentions légales', fond: 'encre', texte: 'fond', point: 'jaune' }],
  ['/confidentialite', { nom: 'Confidentialité', fond: 'encre', texte: 'fond', point: 'jaune' }],
];

const accueil: Rideau = { nom: 'Hygie', fond: 'jaune', texte: 'encre', point: 'bleu' };

export function rideauDe(pathname: string): Rideau {
  if (pathname === '/') return accueil;
  const trouve = rubriques.find(([prefixe]) => pathname === prefixe || pathname.startsWith(`${prefixe}/`));
  return trouve ? trouve[1] : accueil;
}
