import type { CSSProperties } from 'react';

/* Logo Hygie redessiné en traits (arrondis) à partir du fichier d'origine, pour être tracé à l'écran :
   chaque trait se dessine dans l'ordre de lecture, puis les trois points apparaissent (bleu, jaune, gris).
   --d : départ du trait, --t : durée. Couleur des traits : currentColor. */
export function LogoTrace({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1037 554"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path className="t" d="M26.5 279.2V527.8" strokeWidth={41.5} pathLength={1} style={{ '--d': '0.08s', '--t': '0.34s' } as CSSProperties} />
      <path className="t" d="M221.5 279.2V527.8" strokeWidth={41.5} pathLength={1} style={{ '--d': '0.16s', '--t': '0.34s' } as CSSProperties} />
      <path className="t" d="M26.5 401.5H221.5" strokeWidth={41.5} pathLength={1} style={{ '--d': '0.34s', '--t': '0.22s' } as CSSProperties} />
      <path className="t" d="M196.9 89.2L301.2 238.3" strokeWidth={39} pathLength={1} style={{ '--d': '0.24s', '--t': '0.26s' } as CSSProperties} />
      <path className="t" d="M405.7 89.2L301.2 238.3" strokeWidth={39} pathLength={1} style={{ '--d': '0.30s', '--t': '0.26s' } as CSSProperties} />
      <path className="t" d="M301.2 238.3V362.1" strokeWidth={39} pathLength={1} style={{ '--d': '0.50s', '--t': '0.20s' } as CSSProperties} />
      <path
        className="t"
        d="M622 241.7A128 128 0 1 0 529.6 433.7C594.7 424.5 620.8 420.2 620.8 382V309.5H552.5"
        strokeWidth={39.1}
        pathLength={1}
        style={{ '--d': '0.38s', '--t': '0.54s' } as CSSProperties}
      />
      <path className="t" d="M705 211.5V460.2" strokeWidth={40.8} pathLength={1} style={{ '--d': '0.52s', '--t': '0.26s' } as CSSProperties} />
      <path className="t" d="M780.5 374.8V529.2H1011.5V360.2" strokeWidth={37.8} pathLength={1} style={{ '--d': '0.62s', '--t': '0.36s' } as CSSProperties} />
      <path className="t" d="M891.5 529.2V417.5" strokeWidth={37.8} pathLength={1} style={{ '--d': '0.84s', '--t': '0.18s' } as CSSProperties} />
      <path className="t" d="M298.2 17.8H263.5" strokeWidth={23} pathLength={1} style={{ '--d': '0.90s', '--t': '0.20s' } as CSSProperties} />
      <path className="t" d="M298.2 17.8H333" strokeWidth={23} pathLength={1} style={{ '--d': '0.90s', '--t': '0.20s' } as CSSProperties} />
      <path className="t" d="M519.6 510.2H485" strokeWidth={23} pathLength={1} style={{ '--d': '0.96s', '--t': '0.20s' } as CSSProperties} />
      <path className="t" d="M519.6 510.2H554.2" strokeWidth={23} pathLength={1} style={{ '--d': '0.96s', '--t': '0.20s' } as CSSProperties} />
      <circle className="p p--bleu" cx="705.2" cy="129.2" r="26" style={{ '--d': '0.98s' } as CSSProperties} />
      <circle className="p p--jaune" cx="891.6" cy="343.2" r="26" style={{ '--d': '1.08s' } as CSSProperties} />
      <circle className="p p--gris" cx="123.9" cy="481.3" r="26" style={{ '--d': '1.18s' } as CSSProperties} />
    </svg>
  );
}
