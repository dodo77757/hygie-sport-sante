'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Lien } from '@/content/navigation';
import { site } from '@/content/site';
import { LogoTrace } from './LogoTrace';

function estActif(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Liens affichés dans la barre ; le menu complet s'ouvre par le bouton rond. */
const DANS_LA_BARRE = ['/sante', '/sport', '/recuperation', '/bilans'];
const SECONDAIRES: Lien[] = [
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

/* En-tête : quelques liens à gauche, le logo au centre, le rendez-vous et le bouton du menu à droite.
   Sur l'accueil, il est posé en clair sur la photo ; dès qu'on défile, il passe en encre sur une pastille de verre.
   Il s'efface quand on descend et revient quand on remonte.
   Le menu complet s'ouvre en plein écran, depuis le bouton rond. */
export function Header({ links, cta, telephone }: { links: Lien[]; cta: Lien; telephone: { affichage: string; lien: string } }) {
  const pathname = usePathname() ?? '/';
  const accueil = pathname === '/';
  const [open, setOpen] = useState(false);
  const [defile, setDefile] = useState(false);
  const [cache, setCache] = useState(false);
  const dernierY = useRef(0);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const suivre = () => {
      const y = window.scrollY;
      setDefile(y > 40);
      // La barre s'efface quand on descend, revient dès qu'on remonte.
      if (y < 240 || y < dernierY.current - 6) setCache(false);
      else if (y > dernierY.current + 6) setCache(true);
      dernierY.current = y;
    };
    suivre();
    window.addEventListener('scroll', suivre, { passive: true });
    window.addEventListener('resize', suivre);
    return () => {
      window.removeEventListener('scroll', suivre);
      window.removeEventListener('resize', suivre);
    };
  }, [accueil]);

  useEffect(() => setOpen(false), [pathname]);

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
  const barre = links.filter((l) => DANS_LA_BARRE.includes(l.href));

  return (
    <>
      <header className={['tete2', defile && 'is-defile', cache && !open && 'is-cache', accueil && 'tete2--clair'].filter(Boolean).join(' ')}>
        <div className="tete2__barre">
          <nav className="tete2__liens" aria-label="Navigation principale">
            {barre.map((l) => (
              <Link key={l.href} href={l.href} aria-current={estActif(pathname, l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="tete2__logo" aria-label="Hygie, accueil">
            <LogoTrace />
          </Link>
          <div className="tete2__droite">
            <Link href={cta.href} className="tete2__rdv">
              {cta.label}
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="tete2__burger"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="menu-complet"
              onClick={() => setOpen(true)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>
      <div
        ref={menuRef}
        id="menu-complet"
        className={open ? 'menu2 is-ouvert' : 'menu2'}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={open ? undefined : true}
      >
        <button ref={closeRef} type="button" className="menu2__fermer" aria-label="Fermer le menu" onClick={close} />
        <nav aria-label="Menu complet">
          <ul className="menu2__liste">
            {links.map((l, i) => (
              <li key={l.href} style={{ '--n': i } as CSSProperties}>
                <Link href={l.href} onClick={close} aria-current={estActif(pathname, l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="menu2__seconds">
            <li>
              <Link href="/" onClick={close} aria-current={pathname === '/' ? 'page' : undefined}>
                Accueil
              </Link>
            </li>
            {SECONDAIRES.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} aria-current={estActif(pathname, l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <aside className="menu2__infos">
          <p>
            <strong>
              {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville}
            </strong>
            Face à la gare de Fontainebleau-Avon
          </p>
          <p>
            <strong>
              <a href={telephone.lien}>{telephone.affichage}</a>
            </strong>
            {site.horaires.map((h) => h.court).join(', ')}
          </p>
          <Link href={cta.href} className="hk-btn hk-btn--jaune" onClick={close}>
            <span className="hk-btn__label">{cta.label}</span>
          </Link>
        </aside>
      </div>
    </>
  );
}
