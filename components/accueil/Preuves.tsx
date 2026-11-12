'use client';

import { useState, type CSSProperties } from 'react';

export type Preuve = { titre: string; texte: string };

/* « Ils nous font confiance » : les quatre preuves du site, une à la fois, en très grand.
   Le titre est à l'encre, le texte en gris ; à chaque changement, les mots arrivent l'un après l'autre. */
export function Preuves({ preuves }: { preuves: Preuve[] }) {
  const [n, setN] = useState(0);
  const total = preuves.length;
  const p = preuves[n];
  let i = 0;
  const mots = (texte: string, fort: boolean) =>
    texte.split(' ').map((mot, k) => (
      <span key={`${n}-${fort ? 'a' : 'b'}-${k}`} className={fort ? 'entre fort' : 'entre'} style={{ '--n': i++ } as CSSProperties}>
        {mot}{' '}
      </span>
    ));

  return (
    <>
      <div className="a-confiance__marque" aria-hidden="true">
        0{n + 1}
      </div>
      <p className="a-dire" aria-live="polite">
        {mots(`${p.titre}.`, true)}
        {mots(p.texte, false)}
      </p>
      <div className="a-confiance__fleches">
        <button type="button" className="rond rond--vide" aria-label="Preuve précédente" onClick={() => setN((n + total - 1) % total)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
        </button>
        <button type="button" className="rond" aria-label="Preuve suivante" onClick={() => setN((n + 1) % total)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m6 3 5 5-5 5" />
          </svg>
        </button>
      </div>
    </>
  );
}
