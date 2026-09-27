import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { ListeTarifs } from '@/components/Lists';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { bilanPar, lignesTarifsBilans, texteBilanEntree } from '@/content/bilans';
import { photos } from '@/content/images';
import { cheminSoin, poles, soinsDu } from '@/content/soins';
import { Mots } from '@/components/ui/Mots';

const pole = poles.bilans;

export const metadata: Metadata = {
  title: { absolute: pole.seo.title },
  description: pole.seo.description,
  alternates: { canonical: pole.href },
};

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Bilans. */

/* Quel bilan choisir ? Votre situation, le bilan conseillé (lien vers sa fiche) */
const situations = [
  { situation: 'Vous reprenez le sport après une blessure au genou (ligament croisé, ménisque)', bilan: 'Bilan isocinétique', id: 'isocinetique' },
  { situation: 'Vous voulez connaître vos points faibles et vos asymétries', bilan: 'Bilan des forces musculaires', id: 'forces-complet' },
  { situation: 'Vous avez des douleurs, perdez en mobilité ou reprenez une activité', bilan: 'Bilan fonctionnel', id: 'fonctionnel' },
  { situation: 'Vous faites un sport d’explosivité (football, sprint, sports collectifs)', bilan: 'Sauts et profil force-vitesse', id: 'sauts' },
  { situation: 'Vous préparez une course, un trail ou un marathon', bilan: 'Bilan aérobie PNOE', id: 'aerobie' },
  { situation: 'Vous démarrez un coaching individuel', bilan: 'Bilan physiologique d’entrée', id: 'entree' },
];

/* Bilans : une photo, nos bilans (fiches), le choix du bilan, ce que vous recevez, les tarifs, l'offre clubs. */
export default function Bilans() {
  const fiches = soinsDu('bilans');

  return (
    <>
      {/* Hero 2 + 2 */}
      <Row as="section" className="apropos-hero" aria-labelledby="titre-bilans">
        <Cell span={2}>
          <PhotoImg className="hk-media apropos-hero__photo" photo={photos.agilite} preload quality={85} sizes="(max-width: 1023px) 92vw, 46vw" />
        </Cell>
        <Cell span={2} className="apropos-hero__texte">
          <h1 id="titre-bilans" className="titre-hero">
            <Mots texte="Mesurer avant d’entraîner" />
            <span className={`titre-point c-${pole.couleur}`} style={{ '--n': 3 } as CSSProperties} aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo">{pole.chapo}</p>
        </Cell>
      </Row>

      {/* Nos bilans : section déjà en place, absente des textes du site (titre, texte, bouton, les fiches) */}
      <Section titre="Nos bilans" titreId="titre-nos-bilans">
        <Reveal as="p" className="courant texte-colonne">
          Beaucoup de sportifs s’entraînent sans connaître leurs asymétries ni leurs limites. Nos bilans, issus du haut niveau, vous donnent un rapport clair et
          vos axes de travail prioritaires.
        </Reveal>
        <Button href="#tarifs">Voir les tarifs</Button>
        <div className="hk-grid">
          {fiches.map((s) => (
            <ArticleCard
              key={s.slug}
              variant="blog"
              href={cheminSoin(s)}
              photo={s.photo}
              vignette={s.nom}
              meta={s.carte.meta}
              tag="Bilans"
              tagCouleur={pole.couleur}
              title={s.nom}
              excerpt={s.carte.extrait}
              entier
            />
          ))}
        </div>
      </Section>

      {/* Quel bilan choisir ? : votre situation et le bilan conseillé */}
      <Section titre="Quel bilan choisir ?" titreId="titre-choisir" aere>
        <ListeTarifs
          fluide
          items={situations.map((s) => ({
            nom: s.situation,
            action: { label: s.bilan, href: bilanPar(s.id).fiche, variant: 'contour' as const },
          }))}
        />
      </Section>

      {/* Ce que vous recevez : titre, liste */}
      <Section titre="Ce que vous recevez, quel que soit le bilan" titreId="titre-recevez" aere>
        <ul className="puces courant texte-colonne">
          <li>Un compte rendu écrit, avec vos valeurs, leurs repères et les écarts gauche-droite</li>
          <li>L’analyse de votre praticien et vos trois à cinq priorités de travail</li>
          <li>Une facture pour votre mutuelle</li>
        </ul>
      </Section>

      {/* Tarifs : tableau (durée, tarif, réservation), prise en charge, bilan d'entrée */}
      <Section id="tarifs" titre="Tarifs" titreId="titre-tarifs" aere>
        <ListeTarifs fluide items={lignesTarifsBilans()} />
        <p className="courant texte-colonne">Aucun bilan n’est pris en charge par la Sécurité sociale.</p>
        <h3 className="titre-bloc">Bilan physiologique d’entrée</h3>
        <p className="courant texte-colonne">{texteBilanEntree}</p>
      </Section>

      {/* Clubs : titre, texte, bouton */}
      <Section titre="Vous êtes un club ?" titreId="titre-clubs">
        <Reveal as="p" className="courant texte-colonne">
          Bilans de pré-saison ou en cours de saison pour tout l’effectif.
        </Reveal>
        <Button href="/clubs">Offres clubs</Button>
      </Section>
    </>
  );
}
