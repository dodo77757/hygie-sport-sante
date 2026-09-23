import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePage } from '@/components/templates/FichePage';
import { imagePartage, photos } from '@/content/images';
import { cheminSoin, soinsDu, trouverSoin, type Pole } from '@/content/soins';

type Params = Promise<{ slug: string }>;

/* Fabrique des routes /[pôle]/[fiche] : paramètres statiques, métadonnées et page. */
export function routesFiche(pole: Pole) {
  function generateStaticParams() {
    return soinsDu(pole).map((s) => ({ slug: s.slug }));
  }

  async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const soin = trouverSoin(pole, slug);
    if (!soin) return {};
    const photo = soin.photo ? photos[soin.photo] : null;
    return {
      title: soin.seo.title,
      description: soin.seo.description,
      alternates: { canonical: cheminSoin(soin) },
      openGraph: {
        title: soin.seo.title,
        description: soin.seo.description,
        url: cheminSoin(soin),
        ...(photo ? { images: [imagePartage(photo)] } : {}),
      },
    };
  }

  async function Page({ params }: { params: Params }) {
    const { slug } = await params;
    const soin = trouverSoin(pole, slug);
    if (!soin) notFound();
    return <FichePage soin={soin} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
