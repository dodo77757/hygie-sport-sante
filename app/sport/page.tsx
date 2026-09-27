import type { Metadata } from 'next';
import { PolePage } from '@/components/templates/PolePage';
import { site } from '@/content/site';
import { poles, soinsDu } from '@/content/soins';
import { LIEN_ESSAI } from '@/content/valeurs';

const pole = poles.sport;

export const metadata: Metadata = {
  title: { absolute: pole.seo.title },
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
          meta: 'Sur devis',
          extrait: 'Bilans de saison, stages et préparation physique de l’effectif.',
          couleur: 'jaune',
          photo: 'football',
        },
      ]}
      complement={{
        titre: 'Une préparation pensée pour votre discipline',
        texte: 'Nos préparateurs ont construit des protocoles spécifiques, testés auprès d’athlètes de haut niveau :',
        items: [
          'Football : prévention des blessures des ischio-jambiers et du genou, répétition de sprints, retour au jeu.',
          'Sprint et 400 m : profil force-vitesse, raideur, qualités élastiques.',
          'Course de fond et marathon : zones d’entraînement mesurées au PNOE, économie de course, renforcement.',
          'Sports de combat et MMA : puissance, gainage, gestion des coupes de poids et des combats rapprochés.',
          'Équitation : gainage, équilibre, asymétries du cavalier, prévention du dos.',
          'Cross training et Hyrox : programmation mixte force et endurance.',
          'Jeunes sportifs : préparation adaptée à la croissance, avec estimation de la maturité biologique (pic de croissance).',
        ],
      }}
      suite={{
        titre: 'Un doute sur la formule adaptée ?',
        texte: 'Appelez-nous, nous vous orientons vers la bonne formule ou le bon bilan.',
        actions: [
          { label: 'Réserver ma séance d’essai', href: LIEN_ESSAI, variant: 'solid' },
          { label: `Appeler le ${site.telephone.affichage}`, href: site.telephone.lien },
        ],
      }}
    />
  );
}
