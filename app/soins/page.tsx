import type { Metadata } from 'next';
import { PolePage } from '@/components/templates/PolePage';
import { soins } from '@/content/soins';

export const metadata: Metadata = {
  title: 'Tous les soins et tarifs',
  description:
    'Kinésithérapie, étiopathie, orthoptie, coaching, sport-santé, cross training, pressothérapie, massages, nutrition et bilans physiologiques au centre Hygie d’Avon (77).',
  alternates: { canonical: '/soins' },
};

export default function TousLesSoins() {
  return (
    <PolePage
      titre="Tous les soins"
      chapo="Santé, sport, récupération et bilans : tout ce que propose le centre, avec les tarifs et la prise de rendez-vous."
      point="jaune"
      liste={soins}
      parPole
    />
  );
}
