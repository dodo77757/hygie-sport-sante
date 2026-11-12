import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { photos, type PhotoKey } from '@/content/images';
import { PhotoImg } from '../Photo';
import { Diagonale, Fleche } from './Icones';
import { TitreLignes } from './Entete';

export type ElementPile = { href: string; nom: string; sous?: string; texte?: string; photo?: PhotoKey };

/* Scène « pile » de l'accueil, pour une liste courte (les soins d'un pôle) : la page se fige, les noms en très grand à gauche,
   la pile de cartes à encoche à droite ; en défilant, on passe d'un élément au suivant (Mouvement.tsx).
   Le texte de l'élément en cours s'affiche sous les noms. Sur téléphone, les éléments sont simplement l'un sous l'autre. */
export function ScenePile({ items, pastille, tous }: { items: ElementPile[]; pastille?: [string, string]; tous?: { label: string; href: string } }) {
  const plusLong = Math.max(...items.map((i) => i.nom.length));
  const taille = Math.min(128, Math.round(1650 / plusLong), Math.round(430 / items.length) + 10);
  return (
    <section className="a-poles a-poles--page accueil" style={{ '--nb': items.length, '--taille': taille } as CSSProperties} aria-label="Les soins">
      <div className="a-poles__fixe obs">
        {pastille ? (
          <p className="a-pastille" aria-hidden="true">
            <b>{pastille[0]}</b>
            <span>{pastille[1]}</span>
          </p>
        ) : null}
        <div className="a-noms">
          {items.map((p) => (
            <Link href={p.href} key={p.href}>
              <span>{p.nom}</span>
            </Link>
          ))}
        </div>
        <div className="a-fiche" aria-hidden="true">
          {items.map((p) => (
            <div key={p.href}>
              {p.sous ? <b>{p.sous}</b> : null}
              {p.texte ? <p>{p.texte}</p> : null}
              <span className="plus">
                Découvrir <Fleche />
              </span>
            </div>
          ))}
        </div>
        <div className="a-pile">
          {items.map((p) => (
            <Link className="a-carte" href={p.href} key={p.href} tabIndex={-1} aria-hidden="true">
              <div className="a-carte__forme">{p.photo ? <PhotoImg photo={photos[p.photo]} decorative sizes="(max-width: 1023px) 80vw, 28vw" /> : null}</div>
              <div className="a-carte__nom verre">
                <b>{p.nom}</b>
                {p.sous ? <span>{p.sous}</span> : null}
              </div>
            </Link>
          ))}
        </div>
        {tous ? (
          <div className="a-poles__tous">
            <Link className="plus" href={tous.href}>
              {tous.label} <Fleche />
            </Link>
          </div>
        ) : null}
        <p className="a-poles__defile" aria-hidden="true">
          <i />
          Défilez pour passer de l’un à l’autre
        </p>
      </div>

      <ul className="a-poles-m">
        {items.map((p) => (
          <li key={p.href} className="obs">
            <Link href={p.href}>
              <span className="a-poles-m__nom">
                <span>{p.nom}</span>
              </span>
              {p.photo ? (
                <span className="a-poles-m__photo">
                  <PhotoImg photo={photos[p.photo]} decorative sizes="92vw" />
                  {p.sous ? (
                    <span className="verre">
                      <b>{p.sous}</b>
                    </span>
                  ) : null}
                </span>
              ) : null}
              {p.texte ? <span className="a-poles-m__texte">{p.texte}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type ElementRail = { href: string; nom: string; detail?: string; photo?: PhotoKey };

/* Scène « piste » de l'accueil : une carte blanche figée, le texte à gauche, les cartes à encoche qui défilent
   horizontalement avec la page. Sur téléphone, la piste se fait défiler au doigt. */
export function SceneRail({
  id,
  titre,
  niveau = 'h2',
  texte,
  lien,
  items,
  ton,
}: {
  id: string;
  titre: string;
  niveau?: 'h2' | 'h3';
  texte?: ReactNode;
  lien?: { label: string; href: string };
  items: ElementRail[];
  ton?: 'encre';
}) {
  const Titre = niveau;
  const n = (i: number) => ({ '--n': i }) as CSSProperties;
  return (
    <section className={ton ? 'a-bilans accueil a-bilans--encre' : 'a-bilans accueil'} style={{ '--nb': items.length } as CSSProperties} aria-labelledby={id}>
      <div className="a-bilans__fixe">
        <div className="a-bilans__carte obs">
          <div className="a-bilans__texte">
            <Titre id={id} className="a-h2">
              <TitreLignes texte={titre} max={14} />
            </Titre>
            {texte ? (
              <p className="monte" style={n(3)}>
                {texte}
              </p>
            ) : null}
            {lien ? (
              <Link className="plus monte" style={n(4)} href={lien.href}>
                {lien.label} <Fleche />
              </Link>
            ) : null}
            <div className="a-avance" aria-hidden="true">
              <span className="a-avance__n">1</span>
              <i />
              <small>{items.length}</small>
            </div>
          </div>
          <div className="a-rail">
            <div className="a-rail__piste">
              {items.map((b) => (
                <Link className="a-bilan" href={b.href} key={b.href}>
                  <div className="a-bilan__forme">
                    {b.photo ? <PhotoImg photo={photos[b.photo]} decorative sizes="(max-width: 1023px) 70vw, 30vw" /> : null}
                  </div>
                  <div className="a-bilan__nom verre">
                    <b>{b.nom}</b>
                    {b.detail ? <span>{b.detail}</span> : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export type Ligne = { href: string; etiquette?: string; titre: string; detail?: string; photo?: PhotoKey; vignette?: string };

/* Liste en grandes lignes, comme le journal de l'accueil : étiquette, vignette, titre, détail, rond fléché ;
   un fond clair glisse jusqu'à la ligne survolée. */
export function ListeLignes({ items, niveau = 'h3' }: { items: Ligne[]; niveau?: 'h2' | 'h3' }) {
  const Titre = niveau;
  return (
    <div className="a-liste accueil obs">
      <div className="a-liste__fond" aria-hidden="true" />
      {items.map((a, i) => (
        <Link className="a-article monte" style={{ '--n': Math.min(i, 6) } as CSSProperties} href={a.href} key={a.href}>
          <span>{a.etiquette}</span>
          <figure>
            {a.photo ? <PhotoImg photo={photos[a.photo]} decorative sizes="(max-width: 1023px) 40vw, 18vw" /> : a.vignette ? <b>{a.vignette}</b> : null}
          </figure>
          <div>
            <Titre>{a.titre}</Titre>
            {a.detail ? <p>{a.detail}</p> : null}
          </div>
          <span className="rond">
            <Diagonale />
          </span>
        </Link>
      ))}
    </div>
  );
}

/* Bandeau de fin de page : une carte à l'encre, la question en grand, les actions. */
export function Suite({ titre, texte, children }: { titre: string; texte?: string; children: ReactNode }) {
  return (
    <section className="e-suite obs accueil" aria-label="Et ensuite">
      <h2 className="a-h2">
        <TitreLignes texte={titre} max={22} />
      </h2>
      <div className="e-suite__fin">
        {texte ? (
          <p className="monte" style={{ '--n': 2 } as CSSProperties}>
            {texte}
          </p>
        ) : null}
        <div className="e-suite__actions monte" style={{ '--n': 3 } as CSSProperties}>
          {children}
        </div>
      </div>
    </section>
  );
}
