import type { Metadata } from 'next';
import { PolePage } from '@/components/templates/PolePage';
import { poles, soinsDu } from '@/content/soins';

const pole = poles.sante;

export const metadata: Metadata = {
  title: pole.seo.title,
  description: pole.seo.description,
  alternates: { canonical: pole.href },
};

export default function Sante() {
  return <PolePage titre={pole.nom} chapo={pole.chapo} point={pole.couleur} liste={soinsDu('sante')} />;
}
