'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
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
  const navRef = useRef<HTMLElement>(null);
  // Trait jaune sous l'onglet actif : il glisse d'un onglet à l'autre quand on change de page.
  const [trait, setTrait] = useState<{ x: number; w: number } | null>(null);
  const [traitPret, setTraitPret] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const mesurer = () => {
      const actif = nav.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!actif || !actif.offsetWidth) {
        setTrait((t) => (t ? { ...t, w: 0 } : null));
        return;
      }
      const retrait = parseFloat(getComputedStyle(actif).paddingLeft) || 0;
      setTrait({
        x: actif.offsetLeft + retrait,
        w: actif.offsetWidth - 2 * retrait,
      });
    };
    mesurer();
    const ro = new ResizeObserver(mesurer);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [pathname]);

  // Première mise en place sans glissement ; les suivantes glissent.
  useEffect(() => {
    if (!trait || traitPret) return;
    const id = requestAnimationFrame(() => setTraitPret(true));
    return () => cancelAnimationFrame(id);
  }, [trait, traitPret]);

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
            <nav ref={navRef} className={traitPret ? 'hk-nav-zone is-pret' : 'hk-nav-zone'} aria-label="Navigation principale">
              <ul className={trait ? 'hk-nav a-trait' : 'hk-nav'}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={estActif(pathname, l.href) ? 'page' : undefined}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <span
                className="hk-nav__trait"
                aria-hidden="true"
                style={
                  {
                    '--x': `${trait?.x ?? 0}px`,
                    width: trait?.w ?? 0,
                    opacity: trait?.w ? 1 : 0,
                  } as CSSProperties
                }
              />
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
