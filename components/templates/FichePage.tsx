import Link from 'next/link';
import { Blocks } from '../Blocks';
import { JsonLd } from '../JsonLd';
import { Button } from '../ui/Button';
import { Entete } from '../scenes/Entete';
import { ListeLignes } from '../scenes/Scenes';
import { photos } from '@/content/images';
import { cheminSoin, poles, soinParChemin, type Soin } from '@/content/soins';
import { site } from '@/content/site';

/* Fiche d'un soin ou d'un bilan : la carte photo en haut de page (titre, chapo, l'essentiel et l'action principale),
   puis la lecture sur deux colonnes : à gauche, un repère qui reste à l'écran (l'essentiel, l'action, le pôle) ; à droite, le texte.
   En bas, les soins proches en grandes lignes. */
export function FichePage({ soin }: { soin: Soin }) {
  const pole = poles[soin.pole];
  const photo = soin.photo ? photos[soin.photo] : null;
  const proches = soin.proches.map(soinParChemin).filter((s): s is Soin => Boolean(s));
  const url = `${site.url}${cheminSoin(soin)}`;
  const questions = soin.corps.flatMap((b) => (b.t === 'faq' ? b.items : []));

  return (
    <>
      <Entete
        id="titre-fiche"
        titre={soin.nom}
        chapo={soin.chapo}
        photo={photo}
        court
        surtitre={
          <Link href={pole.href}>
            <span aria-hidden="true">← </span>
            {pole.etiquette}
          </Link>
        }
      >
        <Button href={soin.action.href} variant="jaune">
          {soin.action.label}
        </Button>
        <span className="e-hero__cle">{soin.carte.meta}</span>
      </Entete>

      <div className="e-lecture">
        <aside className="e-lecture__repere obs" aria-label="L’essentiel">
          <div className="monte">
            <p className="e-lecture__sur">{pole.etiquette}</p>
            <p className="e-lecture__nom">{soin.nom}</p>
            <p className="e-lecture__cle">{soin.carte.meta}</p>
            <Button href={soin.action.href} variant="jaune" block>
              {soin.action.label}
            </Button>
            <a className="e-lecture__tel" href={site.telephone.lien}>
              {site.telephone.affichage}
            </a>
          </div>
        </aside>
        <article className="e-lecture__texte">
          <Blocks blocs={soin.corps} />
        </article>
      </div>

      {proches.length ? (
        <section className="e-proches" aria-labelledby="soins-proches">
          <div className="e-proches__tete">
            <h2 id="soins-proches" className="a-h2">
              Soins proches
            </h2>
            <Link className="plus" href={pole.href}>
              Tout le pôle {pole.etiquette.toLowerCase()}
            </Link>
          </div>
          <ListeLignes
            items={proches.map((p) => ({ href: cheminSoin(p), etiquette: poles[p.pole].etiquette, titre: p.nom, detail: p.carte.meta, photo: p.photo }))}
          />
        </section>
      ) : null}

      {questions.length ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: questions.map((q) => ({
              '@type': 'Question',
              name: q.q,
              acceptedAnswer: { '@type': 'Answer', text: q.r },
            })),
          }}
        />
      ) : null}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
            { '@type': 'ListItem', position: 2, name: pole.nom, item: `${site.url}${pole.href}` },
            { '@type': 'ListItem', position: 3, name: soin.nom, item: url },
          ],
        }}
      />
    </>
  );
}
