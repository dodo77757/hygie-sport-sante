'use client';

import { useEffect } from 'react';

/* Cartes en 3D : au survol, la carte s'incline vers le pointeur (perspective, rotation) avec un reflet qui le suit.
   Un seul écouteur sur le document, pour toutes les cartes (.hk-card, cartes de praticiens, avis) :
   les cartes restent des composants serveur. Rien au toucher, ni si le visiteur réduit les animations.
   L'entrée en 3D des cartes au défilement est en CSS (data-effect="carte"). */
const SELECTEUR = '.hk-card, .praticiens--grille .praticien, .avis__item';
const ROTATION_X = 9; // degrés, haut / bas
const ROTATION_Y = 12; // degrés, gauche / droite

export function Cartes3D() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    let carte: HTMLElement | null = null;
    let pointeur: { x: number; y: number } | null = null;
    let image = 0;

    const relacher = () => {
      if (!carte) return;
      carte.classList.remove('is-3d');
      carte.style.removeProperty('--rx');
      carte.style.removeProperty('--ry');
      carte = null;
    };

    const appliquer = () => {
      image = 0;
      if (!carte || !pointeur) return;
      const r = carte.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const px = (pointeur.x - r.left) / r.width - 0.5; // -0,5 … 0,5
      const py = (pointeur.y - r.top) / r.height - 0.5;
      carte.style.setProperty('--rx', `${(-py * ROTATION_X).toFixed(2)}deg`);
      carte.style.setProperty('--ry', `${(px * ROTATION_Y).toFixed(2)}deg`);
      carte.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
      carte.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
    };

    const bouger = (e: PointerEvent) => {
      const cible = e.target instanceof Element ? (e.target.closest(SELECTEUR) as HTMLElement | null) : null;
      if (cible !== carte) {
        relacher();
        carte = cible;
        carte?.classList.add('is-3d');
      }
      if (!carte) return;
      pointeur = { x: e.clientX, y: e.clientY };
      if (!image) image = requestAnimationFrame(appliquer);
    };

    const sortir = (e: PointerEvent) => {
      if (!carte) return;
      const vers = e.relatedTarget instanceof Element ? e.relatedTarget : null;
      if (!vers || !carte.contains(vers)) relacher();
    };

    document.addEventListener('pointermove', bouger, { passive: true });
    document.addEventListener('pointerout', sortir, { passive: true });
    window.addEventListener('blur', relacher);
    return () => {
      document.removeEventListener('pointermove', bouger);
      document.removeEventListener('pointerout', sortir);
      window.removeEventListener('blur', relacher);
      if (image) cancelAnimationFrame(image);
      relacher();
    };
  }, []);

  return null;
}
