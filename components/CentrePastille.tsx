'use client';

import { useEffect, useRef, useState } from 'react';
import { useCentre } from '@/context/CentreContext';
import { centres, type CentreId } from '@/content/site';

const ORDRE: CentreId[] = ['avon', 'bondoufle'];

/* Choix du centre : un simple lien de l'en-tête, au même ton que les autres (Avon par défaut, seul centre ouvert).
   Il ouvre une petite carte blanche avec les deux centres ; aucune fenêtre ne s'impose au visiteur.
   Le lien « Changer de centre » du pied de page ouvre la même carte (ouvrirSelecteur, CentreContext). */
export function CentrePastille({ onOuvert }: { onOuvert?: (ouvert: boolean) => void }) {
  const { centre, infoCentre, estSelecteurOuvert, choisirCentre, ouvrirSelecteur, fermerSelecteur } = useCentre();
  const zone = useRef<HTMLDivElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);
  const [vu, setVu] = useState(false); // la carte a été ouverte au moins une fois : on peut rendre le focus au bouton

  useEffect(() => {
    onOuvert?.(estSelecteurOuvert);
    if (!estSelecteurOuvert) {
      if (vu && zone.current?.contains(document.activeElement)) bouton.current?.focus();
      return;
    }
    setVu(true);
    requestAnimationFrame(() => zone.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus());
    const dehors = (e: PointerEvent) => {
      if (!zone.current?.contains(e.target as Node)) fermerSelecteur();
    };
    const touche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fermerSelecteur();
        bouton.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dehors);
    document.addEventListener('keydown', touche);
    return () => {
      document.removeEventListener('pointerdown', dehors);
      document.removeEventListener('keydown', touche);
    };
  }, [estSelecteurOuvert, fermerSelecteur, onOuvert, vu]);

  return (
    <div className={estSelecteurOuvert ? 'centre is-ouvert' : 'centre'} ref={zone}>
      <button
        ref={bouton}
        type="button"
        id="centre-pastille"
        className="centre__pastille"
        data-statut={infoCentre.statut}
        aria-expanded={estSelecteurOuvert}
        aria-controls="centre-carte"
        aria-label={`Centre : ${infoCentre.nom}. Changer de centre`}
        onClick={() => (estSelecteurOuvert ? fermerSelecteur() : ouvrirSelecteur())}
      >
        <span>{infoCentre.nomCourt}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </button>
      <div id="centre-carte" className="centre__carte" role="group" aria-label="Choisir votre centre" inert={estSelecteurOuvert ? undefined : true}>
        <p className="centre__titre">Votre centre</p>
        <ul>
          {ORDRE.map((id) => {
            const c = centres[id];
            const actuel = centre === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  className="centre__choix"
                  data-statut={c.statut}
                  aria-current={actuel ? 'true' : undefined}
                  onClick={() => {
                    choisirCentre(id);
                    bouton.current?.focus();
                  }}
                >
                  <span className="centre__radio" aria-hidden="true" />
                  <span className="centre__texte">
                    <b>{c.nom}</b>
                    <span>{c.statut === 'ouvert' ? 'Ouvert · face à la gare' : 'En construction · ouverture prochaine'}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {centre === 'bondoufle' ? (
          <p className="centre__note">
            Les espaces sport et santé de Bondoufle ouvrent prochainement. En attendant, l’équipe vous accueille à Fontainebleau - Avon.
          </p>
        ) : null}
      </div>
    </div>
  );
}
