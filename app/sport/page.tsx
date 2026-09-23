import type { Metadata } from 'next';
import { PolePage } from '@/components/templates/PolePage';
import { poles, soinsDu } from '@/content/soins';

const pole = poles.sport;

export const metadata: Metadata = {
  title: pole.seo.title,
  description: pole.seo.description,
  alternates: { canonical: pole.href },
};

export default function Sport() {
  return (
    <PolePage
      titre={pole.nom}
      chapo={pole.chapo}
      point={pole.couleur}
      liste={soinsDu('sport')}
      supplementaires={[
        {
          href: '/clubs',
          titre: 'Clubs sportifs',
          etiquette: 'Clubs',
          meta: 'Dès 290 € par sportif',
          extrait: 'Bilans de saison, stages sur mesure et préparation physique pour vos joueuses et joueurs.',
          couleur: 'jaune',
          photo: 'football',
        },
      ]}
    />
  );
}
