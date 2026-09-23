import type { CSSProperties, ReactNode } from 'react';
import { Reveal } from '../ui/Primitives';
import { Mots, nombreDeMots } from '../ui/Mots';

/* Gabarit « Journal » : H1 italique centré (terminé par le point de couleur du pôle), chapo, grille de cartes de 2 colonnes.
   Seuls les deux filets extérieurs du cadre. La navigation reste dans le header : pas de second menu ici. */
export function JournalGabarit({
  titre,
  chapo,
  point,
  children,
  apres,
}: {
  titre: string;
  chapo: string;
  /** Couleur du point final du titre (points du logo) */
  point?: 'bleu' | 'jaune' | 'gris' | 'encre';
  children: ReactNode;
  apres?: ReactNode;
}) {
  return (
    <>
      <header className="journal-tete">
        <h1 className="titre-hero">
          <Mots texte={titre} />
          {point ? <span className={`titre-point c-${point}`} style={{ '--n': nombreDeMots(titre) } as CSSProperties} aria-hidden="true" /> : null}
        </h1>
        <Reveal as="p" className="chapo">
          {chapo}
        </Reveal>
      </header>
      <div className="journal-corps">{children}</div>
      {apres}
    </>
  );
}
