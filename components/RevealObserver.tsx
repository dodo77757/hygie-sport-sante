'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* Entrées au défilement (.hk-reveal), une fois, à 15 % de visibilité.
   Le masquage initial est fait en CSS, seulement quand le JavaScript tourne et que le mouvement n'est pas réduit :
   sans script, ou si le script ne démarre pas en 4 s, tout reste visible. */
const REQUETE = '(scripting: enabled) and (prefers-reduced-motion: no-preference)';
let premierPassage = true;

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(REQUETE).matches || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.hk-reveal:not(.is-in)'));
    // Chargement lent : le secours CSS a déjà affiché les éléments, on les laisse en place sans animation.
    if (premierPassage && performance.now() > 3800) elements.forEach((el) => el.classList.add('is-in', 'hk-reveal--direct'));
    premierPassage = false;
    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    elements.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
