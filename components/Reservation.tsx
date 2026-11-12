'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Choix = { id: string; label: string; detail: string };

/* Module de réservation : à gauche, la question et les réponses en très grand (celle choisie est surlignée, comme les pôles
   de l'accueil) ; à droite, la carte du choix en cours, qui se renouvelle en montant. Les panneaux sont rendus côté serveur ;
   ?motif= dans l'adresse ouvre le bon choix. Au clavier : flèches haut et bas, Début, Fin. */
export function Reservation({ choix, panneaux, initial }: { choix: Choix[]; panneaux: Record<string, ReactNode>; initial: string }) {
  const [actif, setActif] = useState(initial);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const zone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motif = new URLSearchParams(window.location.search).get('motif');
    if (motif && choix.some((o) => o.id === motif)) setActif(motif);
  }, [choix]);

  function choisir(id: string, focus = false) {
    setActif(id);
    const url = new URL(window.location.href);
    url.searchParams.set('motif', id);
    url.searchParams.delete('objet');
    window.history.replaceState(null, '', url);
    if (focus) refs.current[id]?.focus();
    // Téléphone : le panneau est sous la liste, on y amène le visiteur.
    if (!focus && window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => zone.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const n = choix.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      choisir(choix[next].id, true);
    }
  }

  const rang = choix.findIndex((c) => c.id === actif);

  return (
    <section className="rdv2 accueil" aria-label="Réservation">
      <div className="rdv2__nav">
        <p className="rdv2__question" id="rdv2-question">
          Que souhaitez-vous réserver ?
        </p>
        <div role="tablist" aria-labelledby="rdv2-question" aria-orientation="vertical" className="rdv2__choix">
          {choix.map((o, i) => (
            <button
              key={o.id}
              ref={(el) => {
                refs.current[o.id] = el;
              }}
              type="button"
              role="tab"
              id={`onglet-${o.id}`}
              aria-controls={`panneau-${o.id}`}
              aria-selected={actif === o.id}
              tabIndex={actif === o.id ? 0 : -1}
              className={actif === o.id ? 'actif' : undefined}
              onClick={() => choisir(o.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span>{o.label}</span>
              <small>{o.detail}</small>
            </button>
          ))}
        </div>
        <p className="rdv2__rang" aria-hidden="true">
          <span>{rang + 1}</span>
          <i style={{ ['--p' as string]: (rang + 1) / choix.length }} />
          <small>{choix.length}</small>
        </p>
      </div>
      <div className="rdv2__zone" ref={zone}>
        {choix.map((o) => (
          <div key={o.id} role="tabpanel" id={`panneau-${o.id}`} aria-labelledby={`onglet-${o.id}`} className="rdv2__panneau" hidden={actif !== o.id}>
            {panneaux[o.id]}
          </div>
        ))}
      </div>
    </section>
  );
}
