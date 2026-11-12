'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useCentre } from '@/context/CentreContext';
import { centres, type CentreId } from '@/content/site';

/* Choix du centre, juste après l'animation du haut de page (déclenchement : context/CentreContext.tsx).
   Dans la langue de l'accueil : un écran à l'encre s'ouvre en cercle, le titre se dévoile ligne par ligne,
   puis les deux centres montent, chacun dans sa grande carte (nom en Bodoni, statut, adresse, rond fléché).
   Au survol, la carte passe au jaune et la flèche pivote ; au choix, l'écran se referme sur la carte choisie.
   Tant qu'aucun centre n'est choisi, la fenêtre ne se ferme pas (ni Échap, ni clic à côté). */

const ORDRE: CentreId[] = ['avon', 'bondoufle'];
const SORTIE = 750; // ms : fermeture de l'écran (refonte.css, « Choix du centre »)

const mouvementReduit = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function SelecteurCentreModal() {
  const { centre, estSelecteurOuvert, choisirCentre, fermerSelecteur, aChoisi } = useCentre();
  if (!estSelecteurOuvert) return null;
  return <Fenetre centre={centre} aChoisi={aChoisi} choisir={choisirCentre} fermer={fermerSelecteur} />;
}

function Fenetre({ centre, aChoisi, choisir, fermer }: { centre: CentreId; aChoisi: boolean; choisir: (id: CentreId) => void; fermer: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titre = useRef<HTMLHeadingElement>(null);
  const [sortie, setSortie] = useState<CentreId | 'fermer' | null>(null);
  const fini = useRef(false);

  useEffect(() => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    // Le focus va au titre, lu en premier, plutôt qu'au premier centre, qui paraîtrait déjà choisi.
    titre.current?.focus({ preventScroll: true });
  }, []);

  const terminer = (choix: CentreId | 'fermer') => {
    if (sortie) return;
    const fin = () => {
      fini.current = true;
      if (choix === 'fermer') fermer();
      else choisir(choix);
    };
    if (mouvementReduit()) return fin();
    setSortie(choix);
    window.setTimeout(fin, SORTIE);
  };

  return (
    <dialog
      ref={ref}
      className="cc2"
      aria-labelledby="choix-centre-titre"
      data-sortie={sortie ? '' : undefined}
      onCancel={(e) => {
        e.preventDefault();
        if (aChoisi) terminer('fermer');
      }}
      onClose={() => {
        // Fermée par le navigateur sans choix (Échap répété) : le choix reste obligatoire.
        if (!fini.current && !aChoisi) ref.current?.showModal();
      }}
    >
      <div className="cc2__ecran">
        <div className="cc2__tete">
          <h2 ref={titre} id="choix-centre-titre" className="cc2__titre" tabIndex={-1}>
            <span className="l" style={{ '--n': 0 } as CSSProperties}>
              <span>Choisissez</span>
            </span>{' '}
            <span className="l" style={{ '--n': 1 } as CSSProperties}>
              <span>votre centre</span>
            </span>
          </h2>
          <p className="cc2__note">Modifiable à tout moment en bas de page.</p>
          {aChoisi ? <button type="button" className="cc2__fermer" aria-label="Fermer" onClick={() => terminer('fermer')} /> : null}
        </div>

        <ul className="cc2__liste">
          {ORDRE.map((id, i) => {
            const c = centres[id];
            const actuel = aChoisi && centre === id;
            return (
              <li key={id} style={{ '--i': i } as CSSProperties}>
                <button
                  type="button"
                  className="cc2__carte"
                  data-statut={c.statut}
                  data-choisi={sortie === id ? '' : undefined}
                  aria-current={actuel ? 'true' : undefined}
                  onClick={() => terminer(id)}
                >
                  <span className="cc2__haut">
                    <span className="cc2__statut">
                      {c.badge} · {c.departement}
                    </span>
                    {actuel ? <span className="cc2__actuel">Votre centre</span> : null}
                  </span>
                  <span className="cc2__nom">
                    {/* « Fontainebleau - Avon » : la ligne se coupe avant « Avon », jamais avant le tiret */}
                    <span>{c.nom.replace(' - ', ' - ')}</span>
                  </span>
                  <span className="cc2__bas">
                    <span className="cc2__infos">
                      {(c.statut === 'ouvert' ? [c.adresse, c.acces] : [c.acces, 'Ouverture prochaine.']).filter(Boolean).map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </span>
                    <span className="rond cc2__fleche" aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path d="M4 12 12 4M5 4h7v7" />
                      </svg>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </dialog>
  );
}
