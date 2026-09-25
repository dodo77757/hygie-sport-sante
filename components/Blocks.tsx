import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Bloc } from '@/content/types';
import { estExterne } from '@/lib/cx';
import { CartesPraticiens } from './CartesPraticiens';
import { ListeTarifs } from './Lists';
import { Button } from './ui/Button';
import { Quote } from './ui/Primitives';

/* Transforme [libellé](/lien) en liens. */
export function TexteRiche({ texte }: { texte: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(texte))) {
    if (m.index > last) parts.push(texte.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      estExterne(href) ? (
        <a key={i++} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link key={i++} href={href}>
          {label}
        </Link>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < texte.length) parts.push(texte.slice(last));
  return <>{parts}</>;
}

/* Rendu des blocs d'une fiche ou d'un article (colonne de lecture de 740 px). */
export function Blocks({ blocs }: { blocs: Bloc[] }) {
  return (
    <div className="prose article">
      {blocs.map((b, i) => {
        switch (b.t) {
          case 'p':
            return (
              <p key={i}>
                <TexteRiche texte={b.texte} />
              </p>
            );
          case 'h2':
            return (
              <h2 key={i} id={b.id} className="intertitre">
                {b.texte}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="sous-titre">
                {b.texte}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className="prose-liste">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <TexteRiche texte={it} />
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="prose-liste">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <TexteRiche texte={it} />
                  </li>
                ))}
              </ol>
            );
          case 'citation':
            return (
              <Quote key={i} source={b.source}>
                {b.texte}
              </Quote>
            );
          case 'note':
            return (
              <p key={i} className="prose-note">
                <TexteRiche texte={b.texte} />
              </p>
            );
          case 'tarifs':
            return (
              <div key={i}>
                <ListeTarifs items={b.items} />
              </div>
            );
          case 'praticiens':
            return (
              <div key={i} className="bloc-large">
                <CartesPraticiens discipline={b.discipline} />
              </div>
            );
          case 'actions':
            return (
              <div key={i} className="hk-actions">
                {b.items.map((a) => (
                  <Button key={a.href} href={a.href} variant={a.variant === 'solid' ? 'solid' : 'contour'}>
                    {a.label}
                  </Button>
                ))}
              </div>
            );
          case 'faq':
            return (
              <div key={i} className="faq">
                {b.items.map((f) => (
                  <details key={f.q} className="faq__item">
                    <summary>
                      <span className="titre-liste">{f.q}</span>
                    </summary>
                    <p className="faq__reponse">{f.r}</p>
                  </details>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
