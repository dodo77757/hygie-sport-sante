'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition, type CSSProperties, type ReactNode } from 'react';
import { rideauDe } from '@/content/pages';

/* Transition entre les pages (API View Transitions, via le composant ViewTransition de React) :
   un rideau à la couleur de la page cible balaie l'écran de bas en haut, s'arrête un instant avec le nom de l'onglet en grand,
   puis découvre la nouvelle page, dont le titre monte mot par mot. Le header reste en place (hygie.css).
   Le rideau est un élément réel, hors écran : c'est sa capture « nouvelle » (vivante) qui traverse l'écran,
   avec le nom et la couleur de la page d'arrivée, rendus dans le même passage que la page.
   Les liens vers une ancre de la même page ne déclenchent rien. Sans prise en charge du navigateur, la page change sans animation. */
export function TransitionPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const rideau = rideauDe(pathname);
  return (
    <>
      <div
        className="rideau-page"
        style={
          { '--rideau-fond': `var(--${rideau.fond})`, '--rideau-texte': `var(--${rideau.texte})`, '--rideau-point': `var(--${rideau.point})` } as CSSProperties
        }
        aria-hidden="true"
      >
        <span key={pathname} className="rideau-page__nom">
          {rideau.nom}
          <span className="rideau-page__point" />
        </span>
      </div>
      <ViewTransition key={pathname} enter="page-entree" exit="page-sortie" default="none">
        <div className="page">{children}</div>
      </ViewTransition>
    </>
  );
}
