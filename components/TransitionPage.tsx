'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition, type ReactNode } from 'react';

/* Transition entre les pages (API View Transitions, via le composant ViewTransition de React) :
   la page quittée s'efface en remontant, la nouvelle monte en fondu. Le header reste en place (hygie.css).
   Les liens vers une ancre de la même page ne déclenchent rien. Sans prise en charge du navigateur, la page change sans animation. */
export function TransitionPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-entree" exit="page-sortie" default="none">
      <div className="page">{children}</div>
    </ViewTransition>
  );
}
