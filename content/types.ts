import type { Discipline } from './praticiens';

/* Blocs de contenu des fiches et des articles.
   Dans les textes, [libellé](/lien) devient un lien. */

export type Action = { label: string; href: string; variant?: 'solid' | 'contour' };

export type Tarif = {
  nom: string;
  detail?: string;
  note?: string;
  prix?: string;
  action?: Action;
};

export type Bloc =
  | { t: 'p'; texte: string }
  | { t: 'h2'; texte: string; id?: string }
  | { t: 'h3'; texte: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'citation'; texte: string; source?: string }
  | { t: 'note'; texte: string }
  | { t: 'tarifs'; items: Tarif[] }
  | { t: 'praticiens'; discipline: Discipline }
  | { t: 'actions'; items: Action[] }
  | { t: 'faq'; items: { q: string; r: string }[] };
