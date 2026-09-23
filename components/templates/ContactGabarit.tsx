import type { ReactNode } from 'react';
import { Cell, Row } from '../ui/Row';
import { Reveal } from '../ui/Primitives';
import { Mots } from '../ui/Mots';

/* Gabarit « Contact » : H1 italique, mot par mot (colonnes 1-2), coordonnées par glissement latéral (colonne 3),
   formulaire ou action (colonne 4). */
export function ContactGabarit({ titre, infos, colonne4, id }: { titre: string; infos: ReactNode; colonne4: ReactNode; id?: string }) {
  return (
    <Row className="contact-row" as="section" aria-labelledby={id ? `${id}-titre` : undefined}>
      <Cell span={2}>
        <h1 className="titre-hero" id={id ? `${id}-titre` : undefined}>
          <Mots texte={titre} />
        </h1>
      </Cell>
      <Cell>
        <Reveal effect="slide-left" className="contact-infos courant">
          {infos}
        </Reveal>
      </Cell>
      <Cell id="formulaire">{colonne4}</Cell>
    </Row>
  );
}
