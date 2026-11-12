import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Preuves } from '@/components/accueil/Preuves';
import { ContactForm } from '@/components/ContactForm';
import { JsonLd } from '@/components/JsonLd';
import { PhotoImg } from '@/components/Photo';
import Image from 'next/image';

import { athletes } from '@/content/athletes';
import { imagePartage, photos, type PhotoKey } from '@/content/images';
import { articlesTries, categories, dateLongue } from '@/content/journal';
import { praticiensAffiches } from '@/content/praticiens';
import { site } from '@/content/site';

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Accueil. */
export const metadata: Metadata = {
  title: { absolute: 'Hygie · Santé, sport et récupération à Avon (77)' },
  description:
    'Kinés, étiopathe, orthoptiste, préparateurs physiques et récupération sous le même toit à Avon. Bilans mesurés, coaching et offres entreprises.',
  alternates: { canonical: '/' },
};

const n = (i: number) => ({ '--n': i }) as CSSProperties;

const Fleche = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);
const Diagonale = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 12 12 4M5 4h7v7" />
  </svg>
);

const poles: Array<{ href: string; nom: string; titre: string; extrait: string; photo: PhotoKey; soins: string[] }> = [
  {
    href: '/sante',
    nom: 'Santé',
    titre: 'Traiter la cause',
    extrait: 'Kinésithérapeutes, étiopathe et orthoptiste consultent au centre. Rendez-vous en ligne sur Doctolib ou Calendly.',
    photo: 'mainsDos',
    soins: ['Kinésithérapie', 'Étiopathie', 'Orthoptie'],
  },
  {
    href: '/sport',
    nom: 'Sport',
    titre: 'Bouger avec méthode',
    extrait: 'Coaching individuel, sport-santé et cross training, encadrés par nos préparateurs physiques diplômés, toujours à partir d’un bilan.',
    photo: 'sprintDepart',
    soins: ['Coaching individuel', 'Sport-santé', 'Cross training', 'Réathlétisation'],
  },
  {
    href: '/recuperation',
    nom: 'Récupération',
    titre: 'Relâcher, recharger',
    extrait: 'Pressothérapie, massages et conseil en nutrition, pour récupérer entre deux séances ou deux semaines chargées.',
    photo: 'pressotherapie',
    soins: ['Pressothérapie', 'Massages', 'Nutrition'],
  },
];

const bilans: Array<{ href: string; nom: string; detail: string; photo: PhotoKey }> = [
  { href: '/bilans/isocinetique', nom: 'Bilan isocinétique', detail: '80 € · 1 h 30', photo: 'bilanIsocinetique' },
  { href: '/bilans/forces-musculaires', nom: 'Forces musculaires', detail: 'Dès 80 € · 1 h', photo: 'bilanForces' },
  { href: '/bilans/fonctionnel', nom: 'Bilan fonctionnel', detail: '60 € · 1 h', photo: 'bilanFonctionnel' },
  { href: '/bilans/sauts-force-vitesse', nom: 'Sauts et profil force-vitesse', detail: '80 € par bilan', photo: 'bilanSauts' },
  { href: '/bilans/aerobie', nom: 'Bilan aérobie', detail: 'Sur demande', photo: 'bilanAerobie' },
];

const equipe: PhotoKey[] = ['malikaPereira', 'antoineGras', 'margotDeOliveira', 'pierreBecker'];

export default function Accueil() {
  const recents = articlesTries().slice(0, 3);
  const nbPraticiens = new Set(praticiensAffiches.map((p) => p.nom)).size;
  const sportifs = athletes.filter((a) => a.photo);

  const preuves = [
    {
      titre: 'Maison Sport-Santé de Fontainebleau',
      texte:
        'Hygie est centre partenaire de ce dispositif labellisé par l’État, qui oriente vers une activité physique adaptée les personnes atteintes de maladies chroniques ou éloignées du sport.',
    },
    {
      titre: `${nbPraticiens} praticiens sous le même toit`,
      texte:
        'Kinés, étiopathe, orthoptiste, préparateurs physiques, massages et nutrition : un seul parcours, des professionnels qui se transmettent l’information, avec votre accord.',
    },
    {
      titre: 'Des sportifs de haut niveau suivis',
      texte:
        'Football, cyclisme sur piste, athlétisme, marathon, sports de combat : la méthode s’est construite auprès d’athlètes professionnels, et elle profite à chacun.',
    },
    {
      titre: 'Des entreprises accompagnées',
      texte: 'Campagnes de prévention et bilans pour les salariés, avec une synthèse anonymisée remise à l’employeur.',
    },
  ];

  return (
    <div id="accueil" className="accueil">
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

      {/* 1. Haut de page */}
      <section className="a-hero" aria-labelledby="titre-accueil">
        <div className="a-hero__photo">
          <PhotoImg photo={photos.coureuse} preload quality={85} sizes="100vw" />
        </div>
        <p className="a-hero__accroche monte" style={n(6)}>
          {site.accroche}
        </p>
        <Link className="a-hero__chiffre" href="/rendez-vous" aria-label={`${nbPraticiens} praticiens sous le même toit : voir l’équipe`}>
          <div>
            <strong>
              <span data-compte={nbPraticiens}>{nbPraticiens}</span>
            </strong>
            <span className="a-tetes">
              {equipe.map((k) => (
                <Image key={k} src={photos[k].src as never} alt="" width={64} height={64} sizes="32px" style={{ objectPosition: photos[k].position }} />
              ))}
            </span>
            <p>
              <b>praticiens</b>sous le même toit
            </p>
          </div>
          <span className="rond">
            <Diagonale />
          </span>
        </Link>
        <h1 id="titre-accueil">
          <span className="l" style={n(0)}>
            <span>Remettez-vous</span>
          </span>{' '}
          <span className="l" style={n(1)}>
            <span>en mouvement</span>
          </span>
        </h1>
      </section>

      {/* 2. Les trois pôles : scène fixe, on passe d'un pôle à l'autre en défilant */}
      <section className="a-poles" id="poles" aria-labelledby="titre-poles">
        <h2 className="a-poles__titre" id="titre-poles">
          Nos trois pôles
        </h2>
        <div className="a-poles__fixe obs">
          <p className="a-pastille" aria-hidden="true">
            <b>3 pôles</b>
            <span>au même endroit, à Avon</span>
          </p>
          <div className="a-noms">
            {poles.map((p) => (
              <button type="button" key={p.nom}>
                <span>{p.nom}</span>
              </button>
            ))}
          </div>
          <div className="a-soins" aria-hidden="true">
            {poles.map((p) => (
              <div key={p.nom}>
                {p.soins.map((s, i) => (
                  <span key={s} style={n(i)}>
                    <i>{s}</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="a-pile">
            {poles.map((p) => (
              <Link className="a-carte" href={p.href} key={p.nom}>
                <div className="a-carte__forme">
                  <PhotoImg photo={photos[p.photo]} decorative sizes="(max-width: 1023px) 80vw, 28vw" />
                </div>
                <div className="a-carte__nom verre">
                  <b>{p.nom}</b>
                  <span>{p.titre}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="a-poles__tous">
            <Link className="plus" href="/soins">
              Voir tous les soins <Fleche />
            </Link>
          </div>
          <p className="a-poles__defile" aria-hidden="true">
            <i />
            Défilez pour passer d’un pôle à l’autre
          </p>
        </div>

        {/* Téléphone : les trois pôles l'un sous l'autre */}
        <ul className="a-poles-m">
          {poles.map((p) => (
            <li key={p.nom} className="obs">
              <Link href={p.href}>
                <span className="a-poles-m__nom">
                  <span>{p.nom}</span>
                </span>
                <span className="a-poles-m__photo">
                  <PhotoImg photo={photos[p.photo]} decorative sizes="92vw" />
                  <span className="verre">
                    <b>{p.titre}</b>
                    {p.soins.join(', ')}
                  </span>
                </span>
                <span className="a-poles-m__texte">{p.extrait}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Bilans : scène fixe, les cartes défilent avec la page */}
      <section className="a-bilans" id="bilans" aria-labelledby="titre-bilans">
        <div className="a-bilans__fixe">
          <div className="a-bilans__carte obs">
            <div className="a-bilans__texte">
              <h2 id="titre-bilans">
                <span className="l" style={n(0)}>
                  <span>Des bilans</span>
                </span>{' '}
                <span className="l" style={n(1)}>
                  <span>qui mesurent,</span>
                </span>{' '}
                <span className="l" style={n(2)}>
                  <span>pas qui estiment</span>
                </span>
              </h2>
              <p className="monte" style={n(3)}>
                Force, asymétries, mobilité, explosivité, capacité aérobie : nous testons avec les outils des clubs professionnels (dynamomètre isocinétique,
                plateformes de force, capteurs VALD et KINVENT, analyseur métabolique PNOE). Vous repartez avec un compte rendu chiffré et vos priorités de
                travail.
              </p>
              <Link className="plus monte" style={n(4)} href="/bilans">
                Voir les bilans et les tarifs <Fleche />
              </Link>
              <div className="a-avance" aria-hidden="true">
                <span className="a-avance__n">1</span>
                <i />
                <small>{bilans.length}</small>
              </div>
            </div>
            <div className="a-rail">
              <div className="a-rail__piste">
                {bilans.map((b) => (
                  <Link className="a-bilan" href={b.href} key={b.href}>
                    <div className="a-bilan__forme">
                      <PhotoImg photo={photos[b.photo]} decorative sizes="(max-width: 1023px) 70vw, 30vw" />
                    </div>
                    <div className="a-bilan__nom verre">
                      <b>{b.nom}</b>
                      <span>{b.detail}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Johan Pereira */}
      <section className="a-johan obs" aria-labelledby="titre-johan">
        <div className="a-johan__photo">
          <PhotoImg photo={photos.johanPereira} sizes="(max-width: 1023px) 92vw, 48vw" />
          <div className="a-johan__carte">
            <h3>Fondateur d’Hygie</h3>
            <div>
              <strong>
                <span data-compte="2012" data-depart="1990">
                  2012
                </span>
              </strong>
              <span>
                Étiopathe
                <br />
                depuis
              </span>
            </div>
            <Link href="/methodologie" aria-label="Découvrir la méthode">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <path d="M5 13 13 5M6 5h7v7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="a-johan__texte">
          <h2 id="titre-johan">
            <span className="l" style={n(0)}>
              <span>Rencontrez</span>
            </span>{' '}
            <span className="l" style={n(1)}>
              <span>Johan Pereira</span>
            </span>
          </h2>
          <p className="monte" style={n(2)}>
            Ancien footballeur formé à l’ESTAC, Johan Pereira est étiopathe depuis 2012 et préparateur physique diplômé de deux universités. Il a fondé Hygie
            pour que le soin, l’entraînement et la prévention se parlent enfin, dans un même lieu et un même dossier.
          </p>
          <Link className="pilule monte" style={n(3)} href="/methodologie">
            Découvrir la méthode
          </Link>
          <div className="a-reperes">
            <div>
              <b>Footballeur</b>
              <i style={{ '--c': 'var(--jaune)', '--n': 0 } as CSSProperties} />
              <span>Formé à l’ESTAC</span>
            </div>
            <div>
              <b>Étiopathe</b>
              <i style={{ '--c': 'var(--bleu)', '--n': 1 } as CSSProperties} />
              <span>Depuis 2012</span>
            </div>
            <div>
              <b>Préparateur physique</b>
              <i style={{ '--c': 'var(--gris-logo)', '--n': 2 } as CSSProperties} />
              <span>Diplômé de deux universités</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ils nous font confiance */}
      <section className="a-confiance obs" id="confiance" aria-labelledby="titre-confiance">
        <h2 id="titre-confiance">Ils nous font confiance</h2>
        <Preuves preuves={preuves} />
        <div className="a-confiance__bas">
          <ul className="a-sportifs">
            {sportifs.map((a) =>
              a.photo ? (
                <li key={a.nom} tabIndex={0}>
                  <Image src={a.photo.src} alt="" width={116} height={116} sizes="58px" style={{ objectPosition: a.photo.position }} />
                  <span>
                    {a.nom} · {a.discipline}
                  </span>
                </li>
              ) : null,
            )}
          </ul>
          <p>
            <b>Des sportifs de haut niveau suivis</b>
            <Link href="/methodologie#titre-athletes">Voir qui</Link>
          </p>
        </div>
      </section>

      {/* 6. Journal */}
      <section className="a-journal obs" aria-labelledby="titre-journal">
        <div className="a-journal__tete">
          <h2 id="titre-journal">
            <span className="l">
              <span>Allez plus loin</span>
            </span>
          </h2>
          <div>
            <p>Conseils, décryptages et retours de terrain de l’équipe.</p>
            <Link className="plus" href="/journal">
              Lire le journal <Fleche />
            </Link>
          </div>
        </div>
        <div className="a-liste">
          <div className="a-liste__fond" aria-hidden="true" />
          {recents.map((a) => (
            <Link className="a-article" href={`/journal/${a.slug}`} key={a.slug}>
              <span>{categories[a.categorie]}</span>
              <figure>{a.photo ? <PhotoImg photo={photos[a.photo]} decorative sizes="(max-width: 1023px) 40vw, 18vw" /> : null}</figure>
              <div>
                <h3>{a.titre}</h3>
                <time dateTime={a.date}>{dateLongue(a.date)}</time>
              </div>
              <span className="rond">
                <Diagonale />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Entreprises */}
      <section className="a-pro obs" id="rappel-entreprises" aria-labelledby="titre-pro">
        <div>
          <h2 id="titre-pro">
            <span className="l" style={n(0)}>
              <span>Prenez soin</span>
            </span>{' '}
            <span className="l" style={n(1)}>
              <span>de vos équipes</span>
            </span>
          </h2>
          <p className="monte" style={n(2)}>
            Séances collectives, bilans individuels et campagnes de prévention des troubles musculosquelettiques, au centre ou sur site. Laissez vos coordonnées
            professionnelles : nous vous rappelons sous 48 h ouvrées.
          </p>
        </div>
        <div className="a-pro__form monte" style={n(3)}>
          <ContactForm type="rappel" submitLabel="Être rappelé" compact />
        </div>
      </section>
    </div>
  );
}
