'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LogoTrace } from './LogoTrace';

/* Rideau d'entrée : sur fond encre, le logo se trace trait par trait, les trois points apparaissent, courte pause,
   puis le rideau se lève (encre, puis jaune) et découvre la page, dont le titre monte mot par mot. 4,5 s en tout.
   Joué à chaque chargement du site (rechargement compris), jamais lors de la navigation entre les pages.
   Tout est en CSS (hygie.css, « Rideau d'entrée ») : sans JavaScript, le rideau se lève quand même.
   Coupé si le visiteur a choisi de réduire les animations. */

const LEVEE = 3400; // ms : début de la levée du rideau (délai de hk-rideau dans hygie.css)
const RETRAIT = 5800; // ms : retrait du rideau, quand le titre de la première page a fini d'entrer
export const RIDEAU_LEVE = 'hygie:rideau-leve';

let dejaJoue = false;

function signalerLevee() {
  document.documentElement.dataset.rideau = 'leve';
  window.dispatchEvent(new Event(RIDEAU_LEVE));
}

export function Entree() {
  const [present, setPresent] = useState(() => !dejaJoue);
  const pathname = usePathname();
  const pageDepart = useRef(pathname);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!present) return;
    dejaJoue = true;
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      signalerLevee();
      setPresent(false);
      return;
    }

    // L'animation CSS a démarré au premier affichage, avant l'hydratation : on se cale sur son horloge.
    const rideau = el.getAnimations({ subtree: true }).find((a) => a instanceof CSSAnimation && a.animationName === 'hk-rideau');
    const ecoule = Number(rideau?.currentTime ?? 0);

    // Pas de défilement pendant que le logo se trace : la page se découvre depuis le haut.
    const bloquer = (e: Event) => e.preventDefault();
    window.addEventListener('wheel', bloquer, { passive: false });
    window.addEventListener('touchmove', bloquer, { passive: false });
    const liberer = () => {
      window.removeEventListener('wheel', bloquer);
      window.removeEventListener('touchmove', bloquer);
    };

    const t1 = window.setTimeout(
      () => {
        liberer();
        signalerLevee();
      },
      Math.max(0, LEVEE - ecoule),
    );
    const t2 = window.setTimeout(() => setPresent(false), Math.max(0, RETRAIT - ecoule));
    return () => {
      liberer();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [present]);

  // Changement de page pendant la fin de l'entrée : le rideau n'a plus lieu d'être.
  useEffect(() => {
    if (pathname !== pageDepart.current) setPresent(false);
  }, [pathname]);

  if (!present) return null;

  return (
    <div id="entree" ref={ref} aria-hidden="true">
      <div className="entree__rideau entree__rideau--jaune" />
      <div className="entree__rideau entree__rideau--encre">
        <div className="entree__cadre">
          <LogoTrace className="entree__logo" />
          <p className="entree__pastilles">
            <span>Sport</span>
            <span>Santé</span>
            <span>Performance</span>
          </p>
        </div>
      </div>
    </div>
  );
}
