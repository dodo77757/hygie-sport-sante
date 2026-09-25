'use client';

import { usePathname } from 'next/navigation';
import { Fragment, ViewTransition, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { rideauDe } from '@/content/pages';

/* L'oblique (14°) fait déborder le haut de la dernière lettre d'un mot d'environ 0,18 em (hauteur d'x d'Anton : 0,73 em).
   Le dernier mot n'en a pas besoin : le point qui le termine dépasse davantage. */
const DEBORD_OBLIQUE = 0.18;

/* Transition entre les pages (API View Transitions, via le composant ViewTransition de React) :
   un rideau à la couleur de la page cible balaie l'écran de bas en haut, s'arrête un instant avec le nom de l'onglet en grand,
   puis découvre la nouvelle page, dont le titre monte mot par mot. Le header reste en place (hygie.css).
   Le rideau est un élément réel, hors écran : c'est sa capture « nouvelle » (vivante) qui traverse l'écran,
   avec le nom et la couleur de la page d'arrivée, rendus dans le même passage que la page.
   Le nom tient toujours dans l'écran, du téléphone au grand écran : on mesure son mot le plus long (point compris), en em,
   et la feuille de style en déduit la taille (.rideau-page__nom) ; un nom de plusieurs mots passe à la ligne entre les mots.
   Les liens vers une ancre de la même page ne déclenchent rien. Sans prise en charge du navigateur, la page change sans animation. */
export function TransitionPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const rideau = rideauDe(pathname);
  const mots = rideau.nom.split(' ');
  const nomRef = useRef<HTMLSpanElement>(null);

  // Mesuré avant l'affichage : React capture le rideau après ses effets de mise en page. Remesuré une fois les polices chargées.
  useLayoutEffect(() => {
    const nom = nomRef.current;
    if (!nom) return;
    let actif = true;
    const mesurer = () => {
      const taille = parseFloat(getComputedStyle(nom).fontSize);
      if (!actif || !taille) return;
      const largeurs = Array.from(
        nom.querySelectorAll<HTMLElement>('.rideau-page__mot'),
        (mot) => mot.getBoundingClientRect().width / taille + (mot.querySelector('.rideau-page__point') ? 0 : DEBORD_OBLIQUE),
      );
      const em = Math.max(0, ...largeurs);
      if (em > 0) nom.style.setProperty('--em', em.toFixed(3));
    };
    mesurer();
    document.fonts?.ready.then(mesurer);
    return () => {
      actif = false;
    };
  }, [pathname]);

  return (
    <>
      <div
        className="rideau-page"
        style={
          { '--rideau-fond': `var(--${rideau.fond})`, '--rideau-texte': `var(--${rideau.texte})`, '--rideau-point': `var(--${rideau.point})` } as CSSProperties
        }
        aria-hidden="true"
      >
        <span key={pathname} ref={nomRef} className="rideau-page__nom">
          {mots.map((mot, i) => (
            <Fragment key={`${i}-${mot}`}>
              {i > 0 ? ' ' : null}
              <span className="rideau-page__mot">
                {mot}
                {i === mots.length - 1 ? <span className="rideau-page__point" /> : null}
              </span>
            </Fragment>
          ))}
        </span>
      </div>
      <ViewTransition key={pathname} enter="page-entree" exit="page-sortie" default="none">
        <div className="page">{children}</div>
      </ViewTransition>
    </>
  );
}
