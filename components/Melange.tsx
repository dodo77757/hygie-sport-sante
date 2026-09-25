'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';

/* Affiche ses enfants dans un ordre tiré au hasard à chaque visite (mélange de Fisher-Yates), pour qu'aucun praticien
   ne soit toujours en tête ni toujours en dernier. Le premier rendu garde l'ordre du serveur (pas d'écart d'hydratation),
   le mélange s'applique juste après, pendant l'intro ou le rideau de transition. */
export function Melange({ children }: { children: ReactNode }) {
  const elements = Children.toArray(children);
  const nombre = elements.length;
  const [ordre, setOrdre] = useState<number[] | null>(null);

  useEffect(() => {
    const indices = Array.from({ length: nombre }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setOrdre(indices);
  }, [nombre]);

  return <>{ordre && ordre.length === nombre ? ordre.map((i) => elements[i]) : elements}</>;
}
