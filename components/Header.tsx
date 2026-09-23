'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Lien } from '@/content/navigation';
import { Button } from './ui/Button';

function estActif(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Header fixe : barre en verre flottante, bloc logo, menu et action principale.
   Sous 1 024 px, le menu passe dans un panneau plein écran. */
export function Header({ logo, links, cta, telephone }: { logo: ReactNode; links: Lien[]; cta: Lien; telephone: { affichage: string; lien: string } }) {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [defile, setDefile] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      burger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={defile ? 'hk-header is-defile' : 'hk-header'}>
        <div className="hk-header__bar">
          {logo}
          <div className="hk-header__right">
            <nav aria-label="Navigation principale">
              <ul className="hk-nav">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={estActif(pathname, l.href) ? 'page' : undefined}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href={cta.href} variant="jaune">
              {cta.label}
            </Button>
          </div>
          <button
            ref={burgerRef}
            type="button"
            className="hk-burger"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open ? (
        <div ref={menuRef} id="menu-mobile" className="hk-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button ref={closeRef} type="button" className="hk-menu__close" aria-label="Fermer le menu" onClick={close} />
          <nav aria-label="Navigation principale">
            <ul className="hk-menu__list">
              <li>
                <Link href="/" onClick={close} aria-current={pathname === '/' ? 'page' : undefined}>
                  Accueil
                </Link>
              </li>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} aria-current={estActif(pathname, l.href) ? 'page' : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={cta.href} className="hk-btn hk-btn--jaune hk-menu__cta" onClick={close}>
            <span className="hk-btn__label">{cta.label}</span>
          </Link>
          <a className="hk-menu__tel" href={telephone.lien}>
            {telephone.affichage}
          </a>
        </div>
      ) : null}
    </>
  );
}
