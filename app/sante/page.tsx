import type { Metadata } from 'next';
import { actionsParDefaut, PolePage } from '@/components/templates/PolePage';
import { poles, soinsDu } from '@/content/soins';

const pole = poles.sante;

export const metadata: Metadata = {
  title: { absolute: pole.seo.title },
  description: pole.seo.description,
  alternates: { canonical: pole.href },
};

export default function Sante() {
  return (
    <PolePage
      titre={pole.nom}
      chapo={pole.chapo}
      point={pole.couleur}
      liste={soinsDu('sante')}
      suite={{
        titre: 'Un doute sur le soin adapté ?',
        texte: 'Appelez l’accueil : nous vous orientons vers le bon praticien ou le bon bilan.',
        actions: actionsParDefaut,
      }}
    />
  );
}
