import Link from 'next/link';
import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';

/* Étiquette de catégorie : mono capitales ; couleur du pôle (points du logo) ou encre. */
export type Couleur = 'bleu' | 'jaune' | 'gris' | 'encre';

export function Tag({ href, couleur = 'encre', children }: { href?: string; couleur?: Couleur; children: ReactNode }) {
  const cls = cx('hk-tag', couleur !== 'encre' && `hk-tag--${couleur}`);
  if (href)
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  return <span className={cls}>{children}</span>;
}

/* Les trois points du logo (bleu, jaune, gris) */
export function PointsLogo() {
  return (
    <span className="points-logo" aria-hidden="true">
      <span className="c-bleu" />
      <span className="c-jaune" />
      <span className="c-gris" />
    </span>
  );
}

/* Pastille contour du bloc logo */
export function Pill({ children }: { children: ReactNode }) {
  return <span className="hk-pill">{children}</span>;
}

/* Entrée au défilement : le RevealObserver du layout ajoute « is-in » quand l'élément entre dans l'écran. */
export function Reveal({
  as: Tag = 'div',
  effect = 'float',
  className,
  id,
  children,
}: {
  as?: ElementType;
  effect?: 'float' | 'slide-up' | 'slide-left';
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={cx('hk-reveal', className)} data-effect={effect}>
      {children}
    </Tag>
  );
}

/* Citation d'article */
export function Quote({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <figure className="hk-quote">
      <blockquote>{children}</blockquote>
      {source ? <figcaption className="hk-quote__source">{source}</figcaption> : null}
    </figure>
  );
}
