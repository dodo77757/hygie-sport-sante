import Image from 'next/image';
import Link from 'next/link';
import { Entete } from '@/components/scenes/Entete';
import { ListeLignes } from '@/components/scenes/Scenes';
import { Button } from '@/components/ui/Button';
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
import { Mots } from '@/components/ui/Mots';

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
    <>
      <Entete
        id="titre-article"
        titre={a.titre}
        chapo={a.chapo}
        photo={photo}
        court
        surtitre={
          <Link href="/journal">
            <span aria-hidden="true">← </span>Le journal
          </Link>
        }
      />

      <div className="e-lecture">
        <aside className="e-lecture__repere obs" aria-label="À propos de l’article">
          <div className="monte">
            <p className="e-lecture__sur">
              <Link href={`/journal/categorie/${a.categorie}`}>{categories[a.categorie]}</Link>
            </p>
            <p className="e-lecture__auteur">
              <span className="lecture__avatar" aria-hidden="true">
                {avatar ? <Image src={avatar.src} alt="" width={44} height={44} style={{ objectPosition: avatar.position }} /> : a.auteur.initiales}
              </span>
              <span>{a.auteur.nom}</span>
            </p>
            <p className="e-lecture__cle">
              <time dateTime={a.date}>{dateLongue(a.date)}</time>
              <br />
              {tempsDeLecture(a)} min de lecture
            </p>
            <Button href="/rendez-vous" variant="jaune" block>
              Prendre rendez-vous
            </Button>
          </div>
        </aside>
        <article className="e-lecture__texte">
          <Blocks blocs={a.corps} />
        </article>
      </div>

      <section className="e-proches" aria-labelledby="articles-recents">
        <div className="e-proches__tete">
          <h2 id="articles-recents" className="a-h2">
            Articles récents
          </h2>
          <Link className="plus" href="/journal">
            Voir tout
          </Link>
        </div>
        <ListeLignes
          items={recents.map((r) => ({
            href: `/journal/${r.slug}`,
            etiquette: categories[r.categorie],
            titre: r.titre,
            detail: dateLongue(r.date),
            photo: r.photo,
            vignette: r.vignette,
          }))}
        />
      </section>

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
    </>
  );
}
