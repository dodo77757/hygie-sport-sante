import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { ContactForm } from '@/components/ContactForm';
import { CoralPanel } from '@/components/CoralPanel';
import { Hero, HeroMedia } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Marquee } from '@/components/Marquee';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Reveal } from '@/components/ui/Primitives';
import { imagePartage, photos } from '@/content/images';
import { articlesTries, categories, couleursCategories, dateCourte } from '@/content/journal';
import { poles as polesSoins } from '@/content/soins';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'Hygie Sport Santé et Performance · Santé, sport et récupération à Avon (77)' },
  description:
    'À Avon (77), Hygie réunit kinésithérapeutes, étiopathes, orthoptiste, préparateurs physiques et soins de récupération. Bilans physiologiques, coaching et offres entreprises.',
  alternates: { canonical: '/' },
};

const poles = [
  {
    href: '/sante',
    tag: 'Santé',
    couleur: polesSoins.sante.couleur,
    titre: 'Soigner la cause',
    extrait: 'Kinésithérapeutes, étiopathes et orthoptiste consultent au centre, avec prise de rendez-vous en ligne.',
    photo: 'mainsDos' as const,
  },
  {
    href: '/sport',
    tag: 'Sport',
    couleur: polesSoins.sport.couleur,
    titre: 'Bouger avec méthode',
    extrait: 'Coaching individuel, sport-santé et cross training, encadrés par nos préparateurs physiques à partir d’un bilan.',
    photo: 'coachSquat' as const,
  },
  {
    href: '/recuperation',
    tag: 'Récupération',
    couleur: polesSoins.recuperation.couleur,
    titre: 'Récupérer, prendre soin',
    extrait: 'Pressothérapie, massages et conseil en nutrition pour relâcher les tensions et retrouver de l’énergie.',
    photo: 'pressotherapie' as const,
  },
];

export default function Accueil() {
  const recents = articlesTries().slice(0, 3);

  return (
    <>
      <Hero title="Remettez-vous en mouvement" intro={site.accroche} cta={{ label: 'Découvrir les pôles', href: '#poles' }} />

      <HeroMedia
        photo={photos.depart}
        card={{
          title: 'Bilans physiologiques',
          text: 'Force, mobilité, asymétries : un état des lieux précis avant de construire votre programme.',
          cta: { label: 'En savoir plus', href: '/bilans' },
        }}
      />

      {/* Présentation : 2 + 1 + 1 */}
      <Row as="section" aria-labelledby="titre-johan">
        <Cell span={2} mobile="half">
          <PhotoImg className="hk-media accueil-presentation__photo" photo={photos.johanPereira} sizes="(max-width: 1023px) 46vw, 46vw" />
        </Cell>
        <Cell mobile="first">
          <Reveal as="h2" id="titre-johan" className="titre-section titre-section--serre">
            Rencontrez Johan Pereira
          </Reveal>
        </Cell>
        <Cell top={205} mobile="half" className="hk-cell--stack">
          <Reveal as="p" className="courant texte-colonne">
            Ancien footballeur devenu étiopathe et préparateur physique, Johan Pereira a fondé Hygie à Avon. Il y réunit professionnels de santé et du sport autour d’un parcours personnalisé.
          </Reveal>
          <Button href="/methodologie#johan-pereira">Son parcours</Button>
        </Cell>
      </Row>

      {/* Flux : 1 + 2 + 1 */}
      <Row as="section" id="poles" aria-labelledby="titre-poles">
        <Cell>
          <Reveal as="h2" id="titre-poles" className="titre-section titre-section--serre accueil-flux__h2">
            Nos trois pôles
          </Reveal>
        </Cell>
        <Cell span={2}>
          {poles.map((p) => (
            <ArticleCard key={p.href} href={p.href} tag={p.tag} tagCouleur={p.couleur} title={p.titre} excerpt={p.extrait} photo={p.photo} />
          ))}
        </Cell>
        <Cell className="accueil-flux__cta">
          <Button href="/soins">Voir tous les soins</Button>
        </Cell>
      </Row>

      {/* Temps fort : bandeau, panneau jaune, bandeau */}
      <section className="temps-fort" aria-label="Offre entreprises">
        <Marquee items={['Santé', 'Sport', 'Récupération', 'Bilans', 'Entreprises']} />
        <CoralPanel
          id="rappel-entreprises"
          title="Prenez soin de vos équipes"
          text="Séances collectives, bilans et prévention pour vos collaborateurs. Laissez vos coordonnées professionnelles, nous vous rappelons."
        >
          <ContactForm type="rappel" submitLabel="Être rappelé" compact />
        </CoralPanel>
        <Marquee items={['Bilans', 'Entreprises', 'Santé', 'Sport', 'Récupération']} />
      </section>

      {/* Articles récents : 1 + 1 + 2 */}
      <Row as="section" aria-labelledby="titre-journal">
        <Cell>
          <Reveal as="h2" id="titre-journal" className="titre-section titre-section--serre accueil-recents__h2">
            Allez plus loin
          </Reveal>
        </Cell>
        <Cell className="hk-cell--stack">
          <Reveal as="p" className="courant accueil-recents__texte">
            Conseils et retours d’expérience de l’équipe.
          </Reveal>
          <Button href="/journal">Lire le journal</Button>
        </Cell>
        <Cell span={2}>
          {recents.map((a) => (
            <ArticleCard
              key={a.slug}
              variant="recent"
              href={`/journal/${a.slug}`}
              photo={a.photo}
              vignette={a.vignette}
              meta={dateCourte(a.date)}
              tag={categories[a.categorie]}
              tagCouleur={couleursCategories[a.categorie]}
              title={a.titre}
            />
          ))}
        </Cell>
      </Row>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HealthClub',
          name: site.nom,
          url: site.url,
          description: site.description,
          telephone: site.telephone.international,
          email: site.email,
          image: imagePartage(photos.depart).url,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '9 rue de la Petite Vitesse',
            postalCode: site.adresse.codePostal,
            addressLocality: site.adresse.ville,
            addressRegion: 'Île-de-France',
            addressCountry: 'FR',
          },
          openingHoursSpecification: site.horaires.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.schema.jours,
            opens: h.schema.ouvre,
            closes: h.schema.ferme,
          })),
          founder: { '@type': 'Person', name: 'Johan Pereira' },
          sameAs: site.reseaux.map((r) => r.url),
        }}
      />
    </>
  );
}
