import type { Metadata } from 'next';
import { actionsParDefaut, PolePage } from '@/components/templates/PolePage';
import { poles, soinsDu } from '@/content/soins';

const pole = poles.recuperation;

export const metadata: Metadata = {
  title: { absolute: pole.seo.title },
  description: pole.seo.description,
  alternates: { canonical: pole.href },
};

export default function Recuperation() {
  return (
    <PolePage
      titre={pole.nom}
      chapo={pole.chapo}
      point={pole.couleur}
      liste={soinsDu('recuperation')}
      suite={{
        titre: 'Un doute sur le soin adapté ?',
        texte: 'Appelez l’accueil au 01 84 74 34 20 : nous vous orientons.',
        actions: actionsParDefaut,
      }}
    />
  );
}
