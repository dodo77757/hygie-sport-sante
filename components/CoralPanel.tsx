import type { ReactNode } from 'react';
import { Reveal } from './ui/Primitives';

/* Panneau temps fort, aux couleurs du logo (jaune par défaut, ou bleu) : une fois par page, titre par glissement masqué. */
export function CoralPanel({ id, title, text, couleur = 'jaune', children }: { id?: string; title: string; text?: ReactNode; couleur?: 'jaune' | 'bleu'; children?: ReactNode }) {
  const titreId = id ? `${id}-titre` : undefined;
  return (
    <section className={couleur === 'bleu' ? 'hk-panel hk-panel--bleu' : 'hk-panel'} id={id} aria-labelledby={titreId}>
      <Reveal as="h2" effect="slide-up" className="hk-panel__title" id={titreId}>
        {title}
      </Reveal>
      {text ? <p className="hk-panel__text chapo">{text}</p> : null}
      {children ? <div className="hk-panel__body">{children}</div> : null}
    </section>
  );
}
