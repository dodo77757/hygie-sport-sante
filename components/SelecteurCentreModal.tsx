'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useCentre } from '@/context/CentreContext';
import { centres, type CentreId } from '@/content/site';
import { PointsLogo } from './ui/Primitives';

/* Choix du centre, juste après l'animation du haut de page (déclenchement : context/CentreContext.tsx).
   Dans la langue du rideau d'entrée : un panneau encre monte du bas de l'écran, le titre en Anton italique terminé
   par le point jaune, puis les deux centres en très grand, l'un sous l'autre, comme le titre de l'accueil.
   Au survol, la rangée se remplit de jaune depuis le bas ; au choix, le panneau redescend et découvre le site.
   Tant qu'aucun centre n'est choisi, la fenêtre ne se ferme pas (ni Échap, ni clic à côté). */

const ORDRE: CentreId[] = ['avon', 'bondoufle'];
const SORTIE = 650; // ms : descente du panneau (hygie.css, « Choix du centre »)

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
      className="choix-centre"
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
      onClick={(e) => {
        if (e.target === e.currentTarget && aChoisi) terminer('fermer');
      }}
    >
      <div className="choix-centre__panneau">
        <div className="choix-centre__tete">
          <div>
            <PointsLogo />
            <h2 ref={titre} id="choix-centre-titre" className="choix-centre__titre" tabIndex={-1}>
              Choisissez votre centre
              <span className="choix-centre__point" aria-hidden="true" />
            </h2>
          </div>
          {aChoisi ? (
            <button type="button" className="choix-centre__fermer" onClick={() => terminer('fermer')}>
              Fermer
            </button>
          ) : null}
        </div>

        <ul className="choix-centre__liste">
          {ORDRE.map((id, i) => {
            const c = centres[id];
            const actuel = aChoisi && centre === id;
            return (
              <li key={id} style={{ '--i': i } as CSSProperties}>
                <button
                  type="button"
                  className="choix-centre__option"
                  data-statut={c.statut}
                  data-choisi={sortie === id ? '' : undefined}
                  aria-current={actuel ? 'true' : undefined}
                  onClick={() => terminer(id)}
                >
                  <span className="choix-centre__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="choix-centre__nom">
                    {/* « Fontainebleau - Avon » : la ligne se coupe avant « Avon », jamais avant le tiret */}
                    <span>{c.nom.replace(' - ', '\u00a0- ')}</span>
                  </span>
                  <span className="choix-centre__infos">
                    <span className="choix-centre__statut">
                      {c.badge} · {c.departement}
                    </span>
                    {(c.statut === 'ouvert' ? [c.adresse, c.acces] : [c.acces, 'Ouverture prochaine.']).filter(Boolean).map((l) => (
                      <span key={l} className="choix-centre__ligne">
                        {l}
                      </span>
                    ))}
                    {actuel ? <span className="choix-centre__actuel">Votre centre</span> : null}
                  </span>
                  <span className="choix-centre__fleche" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>

        <p className="choix-centre__note">Modifiable à tout moment depuis l’en-tête du site.</p>
      </div>
    </dialog>
  );
}
