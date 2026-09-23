'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';

type Onglet = { id: string; label: string };

/* Choix du type de rendez-vous : onglets au style du filtre de catégories.
   Les panneaux sont rendus côté serveur ; ?motif= dans l'adresse ouvre le bon onglet. */
export function BookingTabs({ onglets, panneaux, initial }: { onglets: Onglet[]; panneaux: Record<string, ReactNode>; initial: string }) {
  const [actif, setActif] = useState(initial);
  // Sens du glissement des panneaux : vers la droite quand on avance dans les onglets, vers la gauche sinon
  const [sens, setSens] = useState<'droite' | 'gauche'>('droite');
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const zoneRef = useRef<HTMLDivElement>(null);
  // Trait jaune sous l'onglet choisi : il glisse d'un onglet à l'autre.
  const [trait, setTrait] = useState<{
    x: number;
    y: number;
    w: number;
  } | null>(null);
  const [traitPret, setTraitPret] = useState(false);

  useLayoutEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    const mesurer = () => {
      const b = refs.current[actif];
      if (!b) return;
      setTrait({
        x: b.offsetLeft,
        y: b.offsetTop + b.offsetHeight + 6,
        w: b.offsetWidth,
      });
    };
    mesurer();
    const ro = new ResizeObserver(mesurer);
    ro.observe(zone);
    return () => ro.disconnect();
  }, [actif]);

  useEffect(() => {
    if (!trait || traitPret) return;
    const id = requestAnimationFrame(() => setTraitPret(true));
    return () => cancelAnimationFrame(id);
  }, [trait, traitPret]);

  useEffect(() => {
    const motif = new URLSearchParams(window.location.search).get('motif');
    if (motif && onglets.some((o) => o.id === motif)) setActif(motif);
  }, [onglets]);

  function choisir(id: string, focus = false) {
    const index = (x: string) => onglets.findIndex((o) => o.id === x);
    setSens(index(id) >= index(actif) ? 'droite' : 'gauche');
    setActif(id);
    const url = new URL(window.location.href);
    url.searchParams.set('motif', id);
    url.searchParams.delete('objet');
    window.history.replaceState(null, '', url);
    if (focus) refs.current[id]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const n = onglets.length;
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % n;
    if (e.key === 'ArrowLeft') next = (index - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      choisir(onglets[next].id, true);
    }
  }

  return (
    <>
      <div className="hk-row rdv-choix">
        <div className="hk-cell hk-span-4">
          <p className="etiquette">Que souhaitez-vous réserver ?</p>
          <div ref={zoneRef} className={`onglets${trait ? ' a-trait' : ''}${traitPret ? ' is-pret' : ''}`}>
            <div role="tablist" aria-label="Type de rendez-vous" className="hk-filter">
              {onglets.map((o, i) => (
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
                  onClick={() => choisir(o.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <span
              className="onglets__trait"
              aria-hidden="true"
              style={
                {
                  '--x': `${trait?.x ?? 0}px`,
                  '--y': `${trait?.y ?? 0}px`,
                  width: trait?.w ?? 0,
                  opacity: trait ? 1 : 0,
                } as CSSProperties
              }
            />
          </div>
        </div>
      </div>
      {onglets.map((o) => (
        <div
          key={o.id}
          role="tabpanel"
          id={`panneau-${o.id}`}
          aria-labelledby={`onglet-${o.id}`}
          className="rdv-panneau"
          data-sens={sens}
          hidden={actif !== o.id}
        >
          {panneaux[o.id]}
        </div>
      ))}
    </>
  );
}
