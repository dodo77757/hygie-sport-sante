import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/cx';

/* Rangée de colonnes filetées : 4 colonnes sur ordinateur, 2 sur mobile.
   Chaque cellule porte le filet de gauche, la rangée celui de droite. */
export function Row({
  id,
  className,
  children,
  aere,
  as: Tag = 'div',
  ...rest
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Rangée de texte seule : plus d'air sous le contenu */
  aere?: boolean;
  as?: 'div' | 'section';
  'aria-labelledby'?: string;
  'aria-label'?: string;
}) {
  return (
    <Tag id={id} className={cx('hk-row', aere && 'hk-row--aere', className)} {...rest}>
      {children}
    </Tag>
  );
}

type CellProps = {
  span?: 1 | 2 | 3 | 4;
  /** Décalage vertical sur ordinateur, en px de conception */
  top?: number;
  /** Décalage vertical sur mobile, en px de conception */
  topMobile?: number;
  /** Mobile : demi-largeur, masquée, ou passée en tête de rangée */
  mobile?: 'half' | 'hide' | 'first';
  flush?: boolean;
  className?: string;
  id?: string;
  children?: ReactNode;
  'aria-hidden'?: boolean;
};

export function Cell({ span = 1, top, topMobile, mobile, flush, className, id, children, ...rest }: CellProps) {
  const style: CSSProperties & Record<string, string | number> = {};
  if (top !== undefined) style['--top'] = top;
  if (topMobile !== undefined) style['--top-m'] = topMobile;
  return (
    <div
      id={id}
      className={cx(
        'hk-cell',
        `hk-span-${span}`,
        flush && 'hk-cell--flush',
        mobile === 'half' && 'm-half',
        mobile === 'hide' && 'm-hide',
        mobile === 'first' && 'm-first',
        className,
      )}
      data-top={top !== undefined ? '' : undefined}
      style={Object.keys(style).length ? style : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
