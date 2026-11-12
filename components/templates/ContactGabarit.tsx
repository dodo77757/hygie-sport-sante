import type { CSSProperties, ReactNode } from 'react';
import { TitreLignes } from '../scenes/Entete';

/* Gabarit « Contact » : le titre en très grand, dévoilé ligne par ligne, les coordonnées à côté,
   et le formulaire (ou l'action) dans une carte blanche. */
export function ContactGabarit({ titre, infos, colonne4, id }: { titre: string; infos: ReactNode; colonne4: ReactNode; id?: string }) {
  return (
    <section className="e-contact accueil" aria-labelledby={id ? `${id}-titre` : undefined}>
      <div className="e-contact__tete">
        <h1 id={id ? `${id}-titre` : undefined}>
          <TitreLignes texte={titre} max={12} />
        </h1>
        <div className="e-contact__infos monte" style={{ '--n': 4 } as CSSProperties}>
          {infos}
        </div>
      </div>
      <div className="e-contact__carte monte" style={{ '--n': 5 } as CSSProperties} id="formulaire">
        {colonne4}
      </div>
    </section>
  );
}
