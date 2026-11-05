'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* Profondeur de l'affiche d'accueil : la photo (fond et sportif, toujours collés) et les lettres « HYGIE » ne bougent pas
   ensemble. À la souris, les lettres glissent à l'opposé du sportif ; au défilement, elles restent en arrière.
   Le décalage entre les plans donne le relief. Variables CSS posées sur la section : --mx, --my (souris, -1 à 1)
   et --defil (0 en haut de page, 1 quand l'affiche est sortie de l'écran). Coupé si le visiteur réduit les animations. */
export function AfficheProfondeur({ className, labelledBy, children }: { className: string; labelledBy: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let image = 0;
    const defiler = () => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(() => {
        const h = el.offsetHeight || window.innerHeight;
        el.style.setProperty('--defil', Math.min(1, Math.max(0, window.scrollY / h)).toFixed(4));
      });
    };
    const souris = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const sortie = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    defiler();
    window.addEventListener('scroll', defiler, { passive: true });
    el.addEventListener('pointermove', souris);
    el.addEventListener('pointerleave', sortie);
    return () => {
      cancelAnimationFrame(image);
      window.removeEventListener('scroll', defiler);
      el.removeEventListener('pointermove', souris);
      el.removeEventListener('pointerleave', sortie);
    };
  }, []);

  return (
    <section ref={ref} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
