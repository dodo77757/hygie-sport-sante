import type { Metadata } from 'next';
import { JournalListe } from '@/components/templates/JournalListe';

export const metadata: Metadata = {
  title: 'Le journal : conseils sport, santé et récupération',
  description:
    'Bilans, préparation physique, récupération, sport en entreprise : les conseils et retours d’expérience de l’équipe Hygie Sport Santé et Performance, à Avon.',
  alternates: { canonical: '/journal' },
};

export default function Journal() {
  return <JournalListe />;
}
