/* Les bilans physiologiques : tarifs et réservation en ligne (Calendly de Johan Pereira). */

export type Bilan = {
  id: string;
  nom: string;
  detail: string;
  duree?: string;
  prix: string;
  note?: string;
  reservation: string;
  fiche: string;
};

const calendly = {
  isocinetique: 'https://calendly.com/pereira-johan/bilanisocinetique',
  fonctionnel: 'https://calendly.com/pereira-johan/bilanfonctionnel',
  forces: 'https://calendly.com/pereira-johan/bilanforcemusculaire',
};

export const bilans: Bilan[] = [
  {
    id: 'isocinetique',
    nom: 'Bilan isocinétique',
    detail: 'Prévention des blessures, rééducation et retour au sport, notamment après une rupture du ligament croisé.',
    duree: '1 h 30',
    prix: '80 €',
    note: 'Non pris en charge par la Sécurité sociale.',
    reservation: calendly.isocinetique,
    fiche: '/bilans/isocinetique',
  },
  {
    id: 'forces-complet',
    nom: 'Forces musculaires, bilan complet',
    detail: 'Force et asymétries des membres supérieurs et inférieurs.',
    duree: '1 h',
    prix: '120 €',
    reservation: calendly.forces,
    fiche: '/bilans/forces-musculaires',
  },
  {
    id: 'forces-partiel',
    nom: 'Forces musculaires, bilan partiel',
    detail: 'Membres supérieurs ou membres inférieurs.',
    duree: '1 h',
    prix: '80 €',
    reservation: calendly.forces,
    fiche: '/bilans/forces-musculaires',
  },
  {
    id: 'fonctionnel',
    nom: 'Bilan fonctionnel',
    detail: 'Mobilité, forces isométriques, contrôle moteur et équilibre.',
    duree: '1 h',
    prix: '60 €',
    reservation: calendly.fonctionnel,
    fiche: '/bilans/fonctionnel',
  },
  {
    id: 'sauts',
    nom: 'Bilan des sauts',
    detail: 'Force, puissance et explosivité, comparaison des deux jambes.',
    prix: '80 €',
    reservation: calendly.forces,
    fiche: '/bilans/sauts-force-vitesse',
  },
  {
    id: 'force-vitesse',
    nom: 'Profil force-vitesse',
    detail: 'Savoir s’il faut d’abord travailler la force ou la vitesse.',
    prix: '80 €',
    note: 'Demande de savoir sauter avec une barre chargée sur les épaules.',
    reservation: calendly.forces,
    fiche: '/bilans/sauts-force-vitesse',
  },
];

export const bilanEntree = {
  nom: 'Bilan physiologique d’entrée',
  detail: 'Avant un forfait de coaching individuel.',
  prix: '145 €',
  note: 'Offert pour un engagement de trois mois.',
};

export function bilanPar(id: string) {
  const b = bilans.find((x) => x.id === id);
  if (!b) throw new Error(`Bilan inconnu : ${id}`);
  return b;
}
