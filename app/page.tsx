import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';

import { Confiance } from '@/components/Confiance';
import { ContactForm } from '@/components/ContactForm';
import { CoralPanel } from '@/components/CoralPanel';
import { Hero, HeroMedia } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Marquee } from '@/components/Marquee';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';

import { imagePartage, photos } from '@/content/images';
import { articlesTries, categories, couleursCategories, dateCourte } from '@/content/journal';
import { poles as polesSoins } from '@/content/soins';
import { site } from '@/content/site';
import { LIEN_ESSAI } from '@/content/valeurs';

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Accueil. */
export const metadata: Metadata = {
  title: { absolute: 'Hygie · Santé, sport et récupération à Avon (77)' },
  description:
    'Kinés, étiopathe, orthoptiste, préparateurs physiques et récupération sous le même toit à Avon. Bilans mesurés, coaching et offres entreprises.',
  alternates: { canonical: '/' },
};

const poles = [
  {
    href: '/sante',
    tag: 'Santé',
    couleur: polesSoins.sante.couleur,
    titre: 'Traiter la cause',
    extrait: 'Kinésithérapeutes, étiopathe et orthoptiste consultent au centre. Rendez-vous en ligne sur Doctolib ou Calendly.',
    photo: 'mainsDos' as const,
  },
  {
    href: '/sport',
    tag: 'Sport',
    couleur: polesSoins.sport.couleur,
    titre: 'Bouger avec méthode',
    extrait: 'Coaching individuel, sport-santé et cross training, encadrés par nos préparateurs physiques diplômés, toujours à partir d’un bilan.',
    photo: 'coachSquat' as const,
  },
  {
    href: '/recuperation',
    tag: 'Récupération',
    couleur: polesSoins.recuperation.couleur,
    titre: 'Relâcher, recharger',
    extrait: 'Pressothérapie, massages et conseil en nutrition, pour récupérer entre deux séances ou deux semaines chargées.',
    photo: 'pressotherapie' as const,
  },
];

export default function Accueil() {
  const recents = articlesTries().slice(0, 3);

  return (
    <>
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
          geo: { '@type': 'GeoCoordinates', latitude: site.coordonnees.lat, longitude: site.coordonnees.lon },
          hasMap: site.plans.openstreetmap,
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

      <Hero
        surtitre={site.accroche}
        title="Remettez-vous en mouvement"
        intro="On mesure d’abord, on construit ensuite. Quinze praticiens de la santé et du sport travaillent ensemble autour de votre parcours, du soin à la performance."
        ctas={[
          { label: 'Prendre rendez-vous', href: '/rendez-vous', variant: 'solid' },
          { label: 'Réserver ma séance d’essai offerte', href: LIEN_ESSAI },
        ]}
      />

      <HeroMedia
        photo={photos.depart}
        card={{
          title: 'Des bilans qui mesurent, pas qui estiment',
          text: 'Force, asymétries, mobilité, explosivité, capacité aérobie : nous testons avec les outils des clubs professionnels (dynamomètre isocinétique, plateformes de force, capteurs VALD et KINVENT, analyseur métabolique PNOE). Vous repartez avec un compte rendu chiffré et vos priorités de travail.',
          cta: { label: 'Voir les bilans et les tarifs', href: '/bilans' },
        }}
      />

      {/* Les trois pôles : titre, trois cartes, bouton */}
      <Section id="poles" titre="Nos trois pôles" titreId="titre-poles" aere>
        <div className="hk-grid hk-grid--3">
          {poles.map((p) => (
            <ArticleCard key={p.href} href={p.href} tag={p.tag} tagCouleur={p.couleur} title={p.titre} excerpt={p.extrait} photo={p.photo} entier />
          ))}
        </div>
        <Button href="/soins">Voir tous les soins</Button>
      </Section>

      {/* Présentation : titre, texte, photo */}
      <Section
        titre="Rencontrez Johan Pereira"
        titreId="titre-johan"
        photo={<PhotoImg className="hk-media accueil-presentation__photo" photo={photos.johanPereira} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Ancien footballeur formé à l’ESTAC, Johan Pereira est étiopathe depuis 2012 et préparateur physique diplômé de deux universités. Il a fondé Hygie pour
          que le soin, l’entraînement et la prévention se parlent enfin, dans un même lieu et un même dossier.
        </Reveal>
        <Button href="/methodologie">Découvrir la méthode</Button>
      </Section>

      {/* Ils nous font confiance : panneau à part entière (quatre preuves, avis Google) */}
      <Confiance />

      {/* Temps fort : bandeau, panneau jaune, bandeau */}
      <section className="temps-fort" aria-label="Offre entreprises">
        <Marquee items={['Santé', 'Sport', 'Récupération', 'Bilans', 'Entreprises']} />
        <CoralPanel
          id="rappel-entreprises"
          title="Prenez soin de vos équipes"
          text="Séances collectives, bilans individuels et campagnes de prévention des troubles musculosquelettiques, au centre ou sur site. Laissez vos coordonnées professionnelles : nous vous rappelons sous 48 h ouvrées."
        >
          <ContactForm type="rappel" submitLabel="Être rappelé" compact />
        </CoralPanel>
        <Marquee items={['Bilans', 'Entreprises', 'Santé', 'Sport', 'Récupération']} />
      </section>

      {/* Articles récents : titre, texte, trois cartes, bouton */}
      <Section titre="Allez plus loin" titreId="titre-journal">
        <Reveal as="p" className="courant texte-colonne">
          Conseils, décryptages et retours de terrain de l’équipe.
        </Reveal>
        <div className="hk-grid hk-grid--3">
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
        </div>
        <Button href="/journal">Lire le journal</Button>
      </Section>
    </>
  );
}
