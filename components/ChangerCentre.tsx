'use client';

import { useCentre } from '@/context/CentreContext';

/* Pied de page : ouvre la carte du choix du centre, sous la pastille de l'en-tête (CentrePastille). */
export function ChangerCentre() {
  const { ouvrirSelecteur } = useCentre();
  return (
    <button type="button" className="hk-footer__centre" aria-controls="centre-carte" onClick={ouvrirSelecteur}>
      Changer de centre
    </button>
  );
}
