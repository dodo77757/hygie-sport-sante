import type { CSSProperties, ReactNode } from 'react';
import type { Photo } from '@/content/images';
import { PhotoImg } from '../Photo';

/* Découpe un titre en lignes équilibrées (deux ou trois mots par ligne), pour le dévoiler ligne par ligne. */
export function lignes(titre: string, max = 16): string[] {
  const mots = titre.split(' ');
  const out: string[] = [];
  let ligne = '';
  for (const m of mots) {
    if (ligne && (ligne + ' ' + m).length > max) {
      out.push(ligne);
      ligne = m;
    } else ligne = ligne ? `${ligne} ${m}` : m;
  }
  if (ligne) out.push(ligne);
  // Pas de mot seul très court en dernière ligne (« ? », « à »…)
  if (out.length > 1 && out[out.length - 1].length < 4) {
    const fin = out.pop() as string;
    out[out.length - 1] += ` ${fin}`;
  }
  return out;
}

/* Titre dévoilé ligne par ligne (masque), comme sur l'accueil. */
export function TitreLignes({ texte, max, depart = 0 }: { texte: string; max?: number; depart?: number }) {
  return (
    <>
      {lignes(texte, max).map((l, i) => (
        <span key={i}>
          {i > 0 ? ' ' : null}
          <span className="l" style={{ '--n': depart + i } as CSSProperties}>
            <span>{l}</span>
          </span>
        </span>
      ))}
    </>
  );
}

/* Haut de page des pages intérieures, dans la langue de l'accueil : une carte photo arrondie qui occupe l'écran,
   le titre en capitales en bas à gauche (dévoilé ligne par ligne), le texte d'introduction et les actions en bas à droite.
   Sans photo, la carte reste à l'encre. `surtitre` : fil d'Ariane ou étiquette au-dessus du titre. */
export function Entete({
  id,
  titre,
  chapo,
  photo,
  surtitre,
  children,
  court,
}: {
  id: string;
  titre: string;
  chapo?: ReactNode;
  photo?: Photo | null;
  surtitre?: ReactNode;
  children?: ReactNode;
  /** Carte moins haute (fiches, articles) */
  court?: boolean;
}) {
  const long = titre.length > 34;
  return (
    <section className={['e-hero', court && 'e-hero--court', long && 'e-hero--long', !photo && 'e-hero--nu'].filter(Boolean).join(' ')} aria-labelledby={id}>
      {photo ? (
        <div className="e-hero__photo">
          <PhotoImg photo={photo} preload quality={85} sizes="100vw" />
        </div>
      ) : null}
      <div className="e-hero__bas">
        <div className="e-hero__titre">
          {surtitre ? (
            <p className="e-hero__sur monte" style={{ '--n': 0 } as CSSProperties}>
              {surtitre}
            </p>
          ) : null}
          <h1 id={id}>
            <TitreLignes texte={titre} max={long ? 22 : 15} />
          </h1>
        </div>
        <div className="e-hero__texte">
          {chapo ? (
            <p className="e-hero__chapo monte" style={{ '--n': 5 } as CSSProperties}>
              {chapo}
            </p>
          ) : null}
          {children ? (
            <div className="e-hero__actions monte" style={{ '--n': 7 } as CSSProperties}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
