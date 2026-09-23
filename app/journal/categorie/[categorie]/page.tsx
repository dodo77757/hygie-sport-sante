import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JournalListe } from '@/components/templates/JournalListe';
import { categories, type Categorie } from '@/content/journal';

type Params = Promise<{ categorie: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((categorie) => ({ categorie }));
}

function estCategorie(c: string): c is Categorie {
  return c in categories;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorie } = await params;
  if (!estCategorie(categorie)) return {};
  return {
    title: `Journal : ${categories[categorie]}`,
    description: `Les articles ${categories[categorie].toLowerCase()} du journal d’Hygie Sport Santé et Performance, à Avon (77).`,
    alternates: { canonical: `/journal/categorie/${categorie}` },
  };
}

export default async function JournalCategorie({ params }: { params: Params }) {
  const { categorie } = await params;
  if (!estCategorie(categorie)) notFound();
  return <JournalListe categorie={categorie} />;
}
