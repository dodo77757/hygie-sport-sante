'use client';

import { useCentre } from '@/context/CentreContext';

/* Pied de page : rouvre le choix du centre (Fontainebleau - Avon ou Bondoufle). */
export function ChangerCentre() {
  const { ouvrirSelecteur } = useCentre();
  return (
    <button type="button" className="hk-footer__centre" aria-haspopup="dialog" onClick={ouvrirSelecteur}>
      Changer de centre
    </button>
  );
}
