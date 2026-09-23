import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/ArticleCard';
import { Blocks } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { PhotoImg } from '@/components/Photo';
import { Tag } from '@/components/ui/Primitives';
import { imagePartage, photos } from '@/content/images';
import { articles, articlesTries, categories, couleursCategories, dateCourte, dateLongue, tempsDeLecture, trouverArticle } from '@/content/journal';
import { site } from '@/content/site';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = trouverArticle(slug);
  if (!a) return {};
  const photo = a.photo ? photos[a.photo] : null;
  return {
    title: a.titre,
    description: a.description,
    alternates: { canonical: `/journal/${a.slug}` },
    authors: [{ name: a.auteur.nom }],
    openGraph: {
      type: 'article',
      title: a.titre,
      description: a.description,
      url: `/journal/${a.slug}`,
      publishedTime: a.date,
      authors: [a.auteur.nom],
      ...(photo ? { images: [imagePartage(photo)] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const a = trouverArticle(slug);
  if (!a) notFound();

  const photo = a.photo ? photos[a.photo] : null;
  const partage = photo ? imagePartage(photo) : null;
  const avatar = a.auteur.photo ? photos[a.auteur.photo] : null;
  const recents = articlesTries()
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  return (
    <div className="lecture-cadre">
      <article className="lecture">
        <Link className="lecture__retour" href="/journal">
          ← Le journal
        </Link>
        <div className="lecture__tete">
          <span className="lecture__avatar" aria-hidden="true">
            {avatar ? <Image src={avatar.src} alt="" width={32} height={32} style={{ objectPosition: avatar.position }} /> : a.auteur.initiales}
          </span>
          <span>{a.auteur.nom}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={a.date}>{dateLongue(a.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{tempsDeLecture(a)} min de lecture</span>
        </div>
        <h1 className="titre-article lecture__titre">{a.titre}</h1>
        <p className="article lecture__chapo">{a.chapo}</p>
        {photo ? <PhotoImg className="lecture__img" photo={photo} preload quality={85} sizes="(max-width: 1023px) 92vw, 740px" /> : null}
        <Blocks blocs={a.corps} />
      </article>

      <aside className="lecture__pied" aria-labelledby="articles-recents">
        <div className="lecture__pied-tete">
          <Tag href={`/journal/categorie/${a.categorie}`} couleur={couleursCategories[a.categorie]}>
            {categories[a.categorie]}
          </Tag>
          <Link className="libelle lien" href="/journal">
            Voir tout
          </Link>
        </div>
        <h2 id="articles-recents" className="titre-mini" style={{ marginTop: 28 }}>
          Articles récents
        </h2>
        <div className="hk-grid hk-grid--3">
          {recents.map((r) => (
            <ArticleCard
              key={r.slug}
              variant="mini"
              href={`/journal/${r.slug}`}
              photo={r.photo}
              vignette={r.vignette}
              meta={dateCourte(r.date)}
              title={r.titre}
              headingLevel="h3"
            />
          ))}
        </div>
      </aside>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: a.titre,
          description: a.description,
          datePublished: a.date,
          author: { '@type': 'Person', name: a.auteur.nom },
          publisher: { '@type': 'Organization', name: site.nom, url: site.url },
          mainEntityOfPage: `${site.url}/journal/${a.slug}`,
          inLanguage: 'fr-FR',
          ...(partage ? { image: partage.url.startsWith('http') ? partage.url : `${site.url}${partage.url}` } : {}),
        }}
      />
    </div>
  );
}
