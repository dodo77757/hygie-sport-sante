import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Reveal } from './Primitives';
import { Cell, Row } from './Row';

/* Section ordonnée : le titre occupe toujours la première colonne, tout le reste (texte, boutons, cartes, photo)
   est empilé dans les trois colonnes de droite, dans le même ordre d'une section à l'autre.
   Avec `photo`, le corps se partage en texte (colonne 2) et photo (colonnes 3-4). */
export function Section({
  id,
  titre,
  titreId,
  sousTitre,
  photo,
  children,
  aere,
  className,
}: {
  id?: string;
  titre: ReactNode;
  titreId: string;
  /** Ligne d'étiquette sous le titre */
  sousTitre?: ReactNode;
  /** Photo affichée sur les deux colonnes de droite, le texte restant en colonne 2 */
  photo?: ReactNode;
  children: ReactNode;
  aere?: boolean;
  className?: string;
}) {
  return (
    <Row as="section" id={id} aria-labelledby={titreId} aere={aere} className={cx('section', className)}>
      <Cell className="section__tete">
        <Reveal as="h2" id={titreId} className="titre-section">
          {titre}
        </Reveal>
        {sousTitre ? <p className="etiquette section__sous-titre">{sousTitre}</p> : null}
      </Cell>
      {photo ? (
        <>
          <Cell className="section__corps hk-cell--stack">{children}</Cell>
          <Cell span={2} className="section__photo">
            {photo}
          </Cell>
        </>
      ) : (
        <Cell span={3} className="section__corps hk-cell--stack">
          {children}
        </Cell>
      )}
    </Row>
  );
}
