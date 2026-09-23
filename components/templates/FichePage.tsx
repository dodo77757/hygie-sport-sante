import Link from 'next/link';
import { ArticleCard } from '../ArticleCard';
import { Blocks } from '../Blocks';
import { JsonLd } from '../JsonLd';
import { PhotoImg } from '../Photo';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Primitives';
import { photos } from '@/content/images';
import { cheminSoin, poles, soinParChemin, type Soin } from '@/content/soins';
import { site } from '@/content/site';
import { Mots } from '../ui/Mots';

/* Gabarit « Article » pour une fiche de soin ou de bilan : colonne de lecture de 740 px.
   L'essentiel (tarif ou format, action principale) est donné dès le haut de la fiche. */
export function FichePage({ soin }: { soin: Soin }) {
  const pole = poles[soin.pole];
  const photo = soin.photo ? photos[soin.photo] : null;
  const proches = soin.proches.map(soinParChemin).filter((s): s is Soin => Boolean(s));
  const url = `${site.url}${cheminSoin(soin)}`;
  const questions = soin.corps.flatMap((b) => (b.t === 'faq' ? b.items : []));

  return (
    <div className="lecture-cadre">
      <article className="lecture">
        <div className="lecture__tete">
          <Tag href={pole.href} couleur={pole.couleur}>
            {pole.etiquette}
          </Tag>
        </div>
        <h1 className="titre-article lecture__titre">
          <Mots texte={soin.nom} />
        </h1>
        <p className="article lecture__chapo">{soin.chapo}</p>
        <div className="lecture__cle">
          <p>{soin.carte.meta}</p>
          <Button href={soin.action.href} variant="jaune">
            {soin.action.label}
          </Button>
        </div>
        {photo ? <PhotoImg className="lecture__img" photo={photo} preload quality={85} sizes="(max-width: 1023px) 92vw, 740px" /> : null}
        <Blocks blocs={soin.corps} />
      </article>

      {proches.length ? (
        <aside className="lecture__pied" aria-labelledby="soins-proches">
          <div className="lecture__pied-tete">
            <h2 id="soins-proches" className="titre-mini">
              Soins proches
            </h2>
            <Link className="libelle lien" href={pole.href}>
              Tout le pôle {pole.etiquette.toLowerCase()}
            </Link>
          </div>
          <div className="hk-grid hk-grid--3">
            {proches.map((p) => (
              <ArticleCard key={p.slug} variant="mini" href={cheminSoin(p)} photo={p.photo} vignette={p.nom} title={p.nom} headingLevel="h3" />
            ))}
          </div>
        </aside>
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
    </div>
  );
}
