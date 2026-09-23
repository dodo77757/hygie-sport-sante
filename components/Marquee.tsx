'use client';

import { useEffect, useRef, useState } from 'react';

/* Bandeau défilant : deux copies de la ligne glissent de gauche à droite à 90 px de conception par seconde (lent, lisible).
   Les mots sont séparés par les points du logo (bleu, jaune, gris). La durée suit la largeur ; pause au survol. */
const POINTS = ['c-bleu', 'c-jaune', 'c-gris'];
export function Marquee({ items, speed = 90 }: { items: string[]; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);
  const unitText = items.join('·');

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const unit = root.querySelector<HTMLElement>('.hk-marquee__unit');
      const track = root.querySelector<HTMLElement>('.hk-marquee__track');
      const first = unit?.firstElementChild as HTMLElement | null;
      if (!unit || !track || !first) return;
      const one = first.getBoundingClientRect().width;
      if (one > 0) {
        const need = Math.max(2, Math.ceil(root.getBoundingClientRect().width / one) + 1);
        if (need !== copies) setCopies(need);
      }
      const width = unit.getBoundingClientRect().width;
      const vw = window.innerWidth;
      const u = window.matchMedia('(max-width: 1023px)').matches ? Math.min(vw, 700) / 390 : vw / 1280;
      if (width > 0) track.style.setProperty('--hk-marquee-duration', `${(width / (speed * u)).toFixed(2)}s`);
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => undefined);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(root);
    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, [unitText, copies, speed]);

  const unit = (key: string) => (
    <div className="hk-marquee__unit" key={key} aria-hidden="true">
      {Array.from({ length: copies }, (_, i) => (
        <span key={i} className="hk-marquee__text">
          {items.map((mot, j) => (
            <span key={j} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {mot}
              <span className={`hk-marquee__point ${POINTS[j % POINTS.length]}`} />
            </span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div className="hk-marquee" ref={ref} role="marquee" aria-label={items.join(', ')}>
      <div className="hk-marquee__track">
        {unit('a')}
        {unit('b')}
      </div>
    </div>
  );
}
