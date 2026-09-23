import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { ListeTarifs } from '@/components/Lists';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Reveal } from '@/components/ui/Primitives';
import { bilanEntree, bilans } from '@/content/bilans';
import { photos } from '@/content/images';
import { cheminSoin, poles, soinsDu } from '@/content/soins';

const pole = poles.bilans;

export const metadata: Metadata = {
  title: pole.seo.title,
  description: pole.seo.description,
  alternates: { canonical: pole.href },
};

/* Bilans : une photo, les quatre bilans, les tarifs, l'offre clubs. */
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
            Mesurer avant d’entraîner
            <span className={`titre-point c-${pole.couleur}`} aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo">{pole.chapo}</p>
        </Cell>
      </Row>

      {/* Nos bilans : 1 + 2 + 1, puis les cartes */}
      <Row as="section" aria-labelledby="titre-nos-bilans">
        <Cell>
          <Reveal as="h2" id="titre-nos-bilans" className="titre-section">
            Nos bilans
          </Reveal>
        </Cell>
        <Cell span={2}>
          <Reveal as="p" className="courant texte-colonne">
            Beaucoup de sportifs s’entraînent sans connaître leurs asymétries ni leurs limites. Nos bilans, issus du haut niveau, vous donnent un rapport clair et vos axes de travail prioritaires.
          </Reveal>
        </Cell>
        <Cell className="hk-cell--stack">
          <Button href="#tarifs">Voir les tarifs</Button>
        </Cell>
      </Row>
      <Row>
        <Cell span={4}>
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
              />
            ))}
          </div>
        </Cell>
      </Row>

      {/* Tarifs : 1 + 3 */}
      <Row as="section" id="tarifs" aria-labelledby="titre-tarifs" aere>
        <Cell className="hk-cell--stack">
          <Reveal as="h2" id="titre-tarifs" className="titre-section">
            Tarifs
          </Reveal>
          <Reveal as="p" className="courant texte-colonne">
            Réservez en ligne le créneau qui vous convient. Un doute sur le bilan à choisir ? Appelez-nous au 01 84 74 34 20.
          </Reveal>
        </Cell>
        <Cell span={3}>
          <ListeTarifs
            fluide
            items={[
              ...bilans.map((b) => ({
                nom: b.nom,
                detail: [b.detail, b.duree].filter(Boolean).join(' · '),
                note: b.note,
                prix: b.prix,
                action: { label: 'Réserver', href: b.reservation },
              })),
              { nom: bilanEntree.nom, detail: bilanEntree.detail, note: bilanEntree.note, prix: bilanEntree.prix, action: { label: 'Voir le coaching', href: '/sport/coaching-individuel', variant: 'contour' as const } },
            ]}
          />
        </Cell>
      </Row>

      {/* Clubs : 2 + 1 + 1 */}
      <Row as="section" aria-labelledby="titre-clubs">
        <Cell span={2}>
          <Reveal as="h2" id="titre-clubs" className="titre-section">
            Vous êtes un club
          </Reveal>
        </Cell>
        <Cell>
          <Reveal as="p" className="courant texte-colonne">
            Bilans de pré-saison ou en cours de saison pour tout votre effectif, à partir de 290 € par sportif.
          </Reveal>
        </Cell>
        <Cell>
          <Button href="/clubs">Offres clubs</Button>
        </Cell>
      </Row>
    </>
  );
}
