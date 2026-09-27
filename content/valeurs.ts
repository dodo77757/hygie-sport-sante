/* Valeurs à renseigner avant la mise en ligne (document « Hygie — Textes du site, page par page »).
   Tant qu'une valeur est vide ('') :
   - dans un tableau ou une carte, le site affiche « Sur demande » ;
   - dans une phrase, la phrase du prix n'apparaît pas ;
   - une durée vide n'affiche rien ;
   - un lien vide : chaque bouton a son repli, indiqué en commentaire.
   Seules les mentions légales affichent « [à compléter] » (content/site.ts, champ mentions). */

export const aRenseigner = {
  liens: {
    /** Réservation de la séance d'essai. Vide : les boutons d'essai mènent au formulaire de rappel (onglet sport des rendez-vous). */
    essai: '',
    /** Réservation des bilans. Vide : le bilan garde son lien actuel (content/bilans.ts). */
    bilans: {
      isocinetique: '',
      forcesMusculaires: '',
      fonctionnel: '',
      sauts: '',
      forceVitesse: '',
      aerobie: '',
      /** Bilan d'entrée. Vide : /rendez-vous?motif=sport&objet=coaching */
      entree: '',
    },
  },
  prix: {
    /** Consultation d'étiopathie, par exemple « 60 € » */
    etiopathie: '',
    /** Sport-santé, par exemple « 80 € par mois » */
    sportSante: '',
    pressotherapie: { carte5: '', carte10: '' },
    massages: { deepTissue: '', renataFranca: '', vodder: '', antiCellulite: '' },
    nutrition: { premierRendezVous: '', suivi: '' },
    aerobie: '',
  },
  durees: {
    massages: { deepTissue: '', renataFranca: '', vodder: '', antiCellulite: '' },
    aerobie: '',
    sauts: '',
    forceVitesse: '',
    bilanEntree: '',
  },
  clubs: {
    /** Nombre de bilans compris dans les 290 € par sportif. Renseigné, la page Clubs ajoute « soit N bilans ». */
    nombreBilans: '',
  },
};

export const SUR_DEMANDE = 'Sur demande';

/** Prix d'une ligne de tableau ou d'une carte : « Sur demande » tant qu'il est vide */
export function prixAffiche(prix: string) {
  return prix || SUR_DEMANDE;
}

/** Un élément (phrase, durée, mention) seulement si la valeur est renseignée */
export function siRenseigne<T>(valeur: string, rendu: (valeur: string) => T): T[] {
  return valeur ? [rendu(valeur)] : [];
}

/** Boutons de la séance d'essai (accueil, méthode, sport, coaching, cross training, rendez-vous) */
export const LIEN_ESSAI = aRenseigner.liens.essai || '/rendez-vous?motif=sport&objet=essai';
