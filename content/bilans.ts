/* Les bilans physiologiques : tableau des tarifs (textes du site, 25 septembre 2026) et réservation en ligne.
   Liens propres à renseigner dans content/valeurs.ts ; sans lien propre, un bilan garde son lien actuel (Calendly de Johan Pereira).
   Durée ou prix vides : la durée n'affiche rien, le prix affiche « Sur demande ». */
import { site } from './site';
import { aRenseigner } from './valeurs';

export type Bilan = {
  id: string;
  /** Nom tel qu'il figure dans le tableau des tarifs */
  nom: string;
  duree: string;
  prix: string;
  reservation: string;
  fiche: string;
};

const calendly = {
  isocinetique: 'https://calendly.com/pereira-johan/bilanisocinetique',
  fonctionnel: 'https://calendly.com/pereira-johan/bilanfonctionnel',
  forces: 'https://calendly.com/pereira-johan/bilanforcemusculaire',
};

const liens = aRenseigner.liens.bilans;

export const bilans: Bilan[] = [
  {
    id: 'isocinetique',
    nom: 'Bilan isocinétique',
    duree: '1 h 30',
    prix: '80 €',
    reservation: liens.isocinetique || calendly.isocinetique,
    fiche: '/bilans/isocinetique',
  },
  {
    id: 'forces-complet',
    nom: 'Forces musculaires, complet (membres supérieurs et inférieurs)',
    duree: '1 h',
    prix: '120 €',
    reservation: liens.forcesMusculaires || calendly.forces,
    fiche: '/bilans/forces-musculaires',
  },
  {
    id: 'forces-partiel',
    nom: 'Forces musculaires, partiel (supérieurs ou inférieurs)',
    duree: '1 h',
    prix: '80 €',
    reservation: liens.forcesMusculaires || calendly.forces,
    fiche: '/bilans/forces-musculaires',
  },
  {
    id: 'fonctionnel',
    nom: 'Bilan fonctionnel',
    duree: '1 h',
    prix: '60 €',
    reservation: liens.fonctionnel || calendly.fonctionnel,
    fiche: '/bilans/fonctionnel',
  },
  {
    id: 'sauts',
    nom: 'Bilan des sauts',
    duree: aRenseigner.durees.sauts,
    prix: '80 €',
    reservation: liens.sauts || calendly.forces,
    fiche: '/bilans/sauts-force-vitesse',
  },
  {
    id: 'force-vitesse',
    nom: 'Profil force-vitesse',
    duree: aRenseigner.durees.forceVitesse,
    prix: '80 €',
    reservation: liens.forceVitesse || calendly.forces,
    fiche: '/bilans/sauts-force-vitesse',
  },
  {
    /* Pas encore de lien de réservation : le bouton appelle l'accueil */
    id: 'aerobie',
    nom: 'Bilan aérobie PNOE',
    duree: aRenseigner.durees.aerobie,
    prix: aRenseigner.prix.aerobie,
    reservation: liens.aerobie || site.telephone.lien,
    fiche: '/bilans/aerobie',
  },
];

/* Bilan d'entrée du coaching individuel : sans lien propre, il mène à la demande de coaching (onglet sport des rendez-vous) */
export const bilanEntree: Bilan = {
  id: 'entree',
  nom: 'Bilan physiologique d’entrée (offert pour 3 mois de coaching)',
  duree: aRenseigner.durees.bilanEntree,
  prix: '145 €',
  reservation: liens.entree || '/rendez-vous?motif=sport&objet=coaching',
  fiche: '/sport/coaching-individuel',
};

/* Paragraphe du bilan d'entrée (page Coaching individuel et page Bilans) */
export const texteBilanEntree =
  'Avant un coaching individuel, un bilan complet réunit mobilité, force et asymétries, sauts et, si besoin, composition corporelle. 145 €, offert pour un engagement de trois mois.';

/** Libellé du bouton d'un bilan : « Réserver », ou « Appeler » tant que la réservation passe par l'accueil */
export function libelleBilan(reservation: string) {
  return reservation.startsWith('tel:') ? 'Appeler' : 'Réserver';
}

/** Lignes du tableau des tarifs (page Bilans et onglet Bilans des rendez-vous) : durée, tarif, bouton */
export function lignesTarifsBilans() {
  return [...bilans, bilanEntree].map((b) => ({
    nom: b.nom,
    detail: b.duree || undefined,
    prix: b.prix,
    action: { label: libelleBilan(b.reservation), href: b.reservation },
  }));
}

export function bilanPar(id: string) {
  const b = [...bilans, bilanEntree].find((x) => x.id === id);
  if (!b) throw new Error(`Bilan inconnu : ${id}`);
  return b;
}
