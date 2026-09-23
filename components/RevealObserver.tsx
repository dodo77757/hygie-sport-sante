'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RIDEAU_LEVE } from './Entree';

/* Entrées au défilement (.hk-reveal), une fois, à 15 % de visibilité.
   Le masquage initial est fait en CSS, seulement quand le JavaScript tourne et que le mouvement n'est pas réduit :
   sans script, ou si le script ne démarre pas en 4 s, tout reste visible.
   Pendant le rideau d'entrée, on attend qu'il se lève : les éléments du haut de page entrent sous les yeux du visiteur. */
const REQUETE = '(scripting: enabled) and (prefers-reduced-motion: no-preference)';
let premierPassage = true;

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(REQUETE).matches || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.hk-reveal:not(.is-in)'));
    // Chargement lent : le secours CSS a déjà affiché les éléments, on les laisse en place sans animation.
    if (premierPassage && performance.now() > 4000) elements.forEach((el) => el.classList.add('is-in', 'hk-reveal--direct'));
    premierPassage = false;
    root.classList.add('reveal-ready');

    let io: IntersectionObserver | null = null;
    const observer = () => {
      if (io) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );
      elements.filter((el) => !el.classList.contains('is-in')).forEach((el) => io?.observe(el));
    };

    let secours = 0;
    if (document.getElementById('entree') && root.dataset.rideau !== 'leve') {
      window.addEventListener(RIDEAU_LEVE, observer, { once: true });
      secours = window.setTimeout(observer, 4200); // secours si l’événement du rideau (3,4 s) ne vient pas
    } else {
      observer();
    }

    return () => {
      window.removeEventListener(RIDEAU_LEVE, observer);
      window.clearTimeout(secours);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
