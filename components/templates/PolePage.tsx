import { ArticleCard } from '../ArticleCard';
import { Button } from '../ui/Button';
import { Cell, Row } from '../ui/Row';
import { JournalGabarit } from './JournalGabarit';
import Link from 'next/link';
import { cheminSoin, poles, type CouleurPole, type Pole, type Soin } from '@/content/soins';
import type { PhotoKey } from '@/content/images';
import { site } from '@/content/site';

export type CarteSupplementaire = { href: string; titre: string; extrait: string; meta: string; etiquette: string; couleur?: CouleurPole; photo?: PhotoKey };

export type Suite = {
  titre: string;
  texte: string;
  actions: Array<{ label: string; href: string; variant?: 'solid' | 'contour' | 'jaune' }>;
};

/* Bloc de texte après les cartes (page Sport : la préparation par discipline) */
export type Complement = { titre: string; texte: string; items: string[] };

export const actionsParDefaut: Suite['actions'] = [
  { label: 'Prendre rendez-vous', href: '/rendez-vous', variant: 'solid' },
  { label: `Appeler le ${site.telephone.affichage}`, href: site.telephone.lien },
];

const suiteParDefaut: Suite = {
  titre: 'Un doute sur le soin adapté ?',
  texte: 'Appelez-nous, nous vous orientons vers le bon praticien ou le bon bilan.',
  actions: actionsParDefaut,
};

/* Page d'un pôle (Santé, Sport, Récupération) ou de tous les soins : un titre, une phrase, une carte par soin sur trois colonnes,
   puis une rangée « et ensuite » avec la prise de rendez-vous, pour que la page se termine toujours par une action claire. */
export function PolePage({
  titre,
  chapo,
  point,
  liste,
  supplementaires = [],
  complement,
  suite = suiteParDefaut,
  parPole,
}: {
  titre: string;
  chapo: string;
  point?: CouleurPole;
  liste: Soin[];
  supplementaires?: CarteSupplementaire[];
  complement?: Complement;
  suite?: Suite;
  /** Tous les soins : une grille par pôle, avec son titre et le lien vers la page du pôle */
  parPole?: boolean;
}) {
  const cartes = (soins: Soin[], premieres = 3) =>
    soins.map((s, i) => (
      <ArticleCard
        key={s.slug}
        variant="blog"
        href={cheminSoin(s)}
        photo={s.photo}
        vignette={s.nom}
        meta={s.carte.meta}
        tag={poles[s.pole].etiquette}
        tagCouleur={poles[s.pole].couleur}
        title={s.carte.titre ?? s.nom}
        excerpt={s.carte.extrait}
        headingLevel={parPole ? 'h3' : 'h2'}
        sizes={i < premieres ? '(max-width: 1023px) 92vw, 30vw' : undefined}
        entier
      />
    ));
  const ordre: Pole[] = ['sante', 'sport', 'recuperation', 'bilans'];

  return (
    <JournalGabarit
      titre={titre}
      chapo={chapo}
      point={point}
      apres={
        <>
          {complement ? (
            <Row as="section" className="pole-suite" aria-labelledby="titre-complement">
              <Cell mobile="hide" aria-hidden />
              <Cell span={3} className="hk-cell--stack">
                <h2 id="titre-complement" className="titre-bloc">
                  {complement.titre}
                </h2>
                <p className="courant texte-large">{complement.texte}</p>
                <ul className="puces courant texte-large">
                  {complement.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Cell>
            </Row>
          ) : null}
          <Row className="pole-suite" aria-label="Et ensuite">
            <Cell>
              <p className="etiquette">Et ensuite</p>
            </Cell>
            <Cell span={3} className="hk-cell--stack">
              <h2 className="titre-bloc">{suite.titre}</h2>
              <p className="courant texte-colonne">{suite.texte}</p>
              <div className="actions">
                {suite.actions.map((a) => (
                  <Button key={a.href} href={a.href} variant={a.variant ?? 'contour'}>
                    {a.label}
                  </Button>
                ))}
              </div>
            </Cell>
          </Row>
        </>
      }
    >
      {parPole ? (
        ordre
          .filter((pole) => liste.some((s) => s.pole === pole))
          .map((pole, n) => (
            <section className="soins-groupe" key={pole} aria-labelledby={`groupe-${pole}`}>
              <div className="soins-groupe__tete">
                <h2 id={`groupe-${pole}`} className="titre-section">
                  {poles[pole].nom}
                </h2>
                <Link className="libelle lien" href={poles[pole].href}>
                  Voir le pôle
                </Link>
              </div>
              <div className="hk-grid hk-grid--3">
                {cartes(
                  liste.filter((s) => s.pole === pole),
                  n === 0 ? 3 : 0,
                )}
              </div>
            </section>
          ))
      ) : (
        <div className="hk-grid hk-grid--3">
          {cartes(liste)}
          {supplementaires.map((c) => (
            <ArticleCard
              key={c.href}
              variant="blog"
              href={c.href}
              photo={c.photo}
              vignette={c.titre}
              meta={c.meta}
              tag={c.etiquette}
              tagCouleur={c.couleur}
              title={c.titre}
              excerpt={c.extrait}
              headingLevel="h2"
              entier
            />
          ))}
        </div>
      )}
    </JournalGabarit>
  );
}
