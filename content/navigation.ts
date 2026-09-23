export type Lien = { label: string; href: string };

/* Menu principal (header et menu mobile) */
export const menu: Lien[] = [
  { label: 'Méthode', href: '/methodologie' },
  { label: 'Santé', href: '/sante' },
  { label: 'Sport', href: '/sport' },
  { label: 'Récupération', href: '/recuperation' },
  { label: 'Bilans', href: '/bilans' },
  { label: 'Entreprises', href: '/entreprises' },
];

export const actionPrincipale: Lien = { label: 'Prendre rendez-vous', href: '/rendez-vous' };

/* Pied de page */
export const navigationPied: Lien[] = [
  { label: 'La méthode Hygie', href: '/methodologie' },
  { label: 'Santé', href: '/sante' },
  { label: 'Sport', href: '/sport' },
  { label: 'Récupération & bien-être', href: '/recuperation' },
  { label: 'Bilans', href: '/bilans' },
  { label: 'Entreprises et clubs', href: '/entreprises' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export const liensLegaux: Lien[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
