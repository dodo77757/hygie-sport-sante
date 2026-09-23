import type { CSSProperties } from 'react';

/* Titre découpé en mots qui montent l'un après l'autre à l'arrivée sur la page (60 ms d'écart).
   Les espaces restent de vraies espaces : le titre se lit et se copie normalement.
   Les mots composés sont coupés après le trait d'union (« Remettez- » « vous ») : le titre garde ses retours à la ligne. */
export function Mots({ texte }: { texte: string }) {
  let i = 0;
  return (
    <>
      {texte
        .split(/( +)/)
        .filter(Boolean)
        .map((morceau, k) =>
          /^ +$/.test(morceau)
            ? ' '
            : morceau.split(/(?<=-)(?=.)/).map((partie, j) => (
                <span key={`${k}-${j}`} className="w" style={{ '--i': i++ } as CSSProperties}>
                  {partie}
                </span>
              )),
        )}
    </>
  );
}

/* Nombre de mots d'un titre : règle l'apparition du point de couleur qui le termine. */
export function nombreDeMots(texte: string) {
  return texte
    .split(/ +/)
    .filter(Boolean)
    .reduce((n, mot) => n + mot.split(/(?<=-)(?=.)/).length, 0);
}
