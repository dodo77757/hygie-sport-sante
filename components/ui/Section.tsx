import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Cell, Row } from './Row';

/* Section des pages intérieures, dans la langue de l'accueil : une carte arrondie, le titre à gauche (il reste à l'écran
   pendant qu'on lit la colonne de droite, et se dévoile par un masque à l'arrivée), le contenu à droite, qui monte bloc après bloc.
   Avec `photo`, la photo prend la forme à encoche des cartes de l'accueil.
   `ton` : « encre » (carte sombre) ou « nu » (sans carte, sur le fond de page). Sans précision, les tons alternent d'eux-mêmes. */
export function Section({
  id,
  numero,
  titre,
  titreId,
  sousTitre,
  photo,
  photoEtroite,
  children,
  aere,
  className,
  ton,
}: {
  id?: string;
  /** Numéro d'étape affiché au-dessus du titre (« 01 ») */
  numero?: string;
  titre: ReactNode;
  titreId: string;
  /** Ligne d'étiquette sous le titre */
  sousTitre?: ReactNode;
  photo?: ReactNode;
  photoEtroite?: boolean;
  children: ReactNode;
  aere?: boolean;
  className?: string;
  ton?: 'encre' | 'nu' | 'blanc';
}) {
  return (
    <Row
      as="section"
      id={id}
      aria-labelledby={titreId}
      aere={aere}
      className={cx('section obs', ton && `section--${ton}`, photo ? 'section--photo' : null, className)}
    >
      <Cell className="section__tete">
        {numero ? (
          <p className="section__numero" aria-hidden="true">
            {numero}
          </p>
        ) : null}
        <h2 id={titreId} className="titre-section">
          <span className="l">
            <span>{titre}</span>
          </span>
        </h2>
        {sousTitre ? (
          <p className="etiquette section__sous-titre monte" style={{ '--n': 2 } as CSSProperties}>
            {sousTitre}
          </p>
        ) : null}
      </Cell>
      {photo ? (
        <>
          <Cell span={photoEtroite ? 2 : 1} className="section__corps hk-cell--stack">
            {children}
          </Cell>
          <Cell span={photoEtroite ? 1 : 2} className="section__photo">
            <div className="section__cadre" data-p="">
              {photo}
            </div>
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
