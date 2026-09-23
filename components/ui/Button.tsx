import Link from 'next/link';
import type { ReactNode } from 'react';
import { cx, estExterne, estSpecial } from '@/lib/cx';

type Props = {
  href?: string;
  variant?: 'solid' | 'contour' | 'jaune';
  form?: boolean;
  block?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

/* Bouton pilule : JetBrains Mono capitales, libellé souligné au survol. */
export function Button({ href, variant = 'contour', form, block, type = 'button', disabled, className, onClick, children }: Props) {
  const cls = cx(
    'hk-btn',
    variant === 'solid' && 'hk-btn--solid',
    variant === 'jaune' && 'hk-btn--jaune',
    form && 'hk-btn--form',
    block && 'hk-btn--block',
    className,
  );
  const label = <span className="hk-btn__label">{children}</span>;

  if (href) {
    if (estExterne(href)) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      );
    }
    if (estSpecial(href)) {
      return (
        <a className={cls} href={href}>
          {label}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {label}
      </Link>
    );
  }

  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
