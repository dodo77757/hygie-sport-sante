import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { JsonLd } from '@/components/JsonLd';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { Mots } from '@/components/ui/Mots';
import { photos } from '@/content/images';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'Bilans QVCT et prévention des TMS en entreprise · Hygie' },
  description:
    'Bilans biomécaniques sur site pour prévenir TMS et sédentarité. Mesures objectives, débriefing individuel et rapport RH anonymisé.',
  alternates: { canonical: '/entreprises' },
  openGraph: {
    title: 'Bilans QVCT et prévention des TMS en entreprise · Hygie',
    description:
      'Bilans biomécaniques sur site pour prévenir TMS et sédentarité. Mesures objectives, débriefing individuel et rapport RH anonymisé.',
    url: `${site.url}/entreprises`,
    type: 'website',
  },
};

/* 8. Questions fréquentes */
const faqs = [
  {
    q: 'Faut-il prévoir une tenue ou un équipement particulier ?',
    r: 'Non. Les tests se font en tenue de travail, et nous apportons tout le matériel. Il suffit d’une pièce calme.',
  },
  {
    q: 'Les tests sont-ils difficiles ou douloureux ?',
    r: 'Non. Ce sont des mouvements simples du quotidien : se tenir en équilibre, faire un squat, serrer une poignée. Ils sont adaptés à tous les âges et à toutes les conditions physiques.',
  },
  {
    q: 'Mon employeur verra-t-il mes résultats ?',
    r: 'Non. Votre bilan individuel vous est réservé. L’entreprise reçoit uniquement une synthèse collective et anonymisée.',
  },
  {
    q: 'À quels secteurs s’adresse l’offre ?',
    r: 'À toutes les entreprises : métiers physiques (BTP, logistique, industrie) comme postes sédentaires (bureaux, services). Les tests sont ajustés selon les postes.',
  },
  {
    q: 'Est-ce que cela remplace la médecine du travail ?',
    r: 'Non, c’est complémentaire. Notre rôle est de repérer les risques en amont et d’orienter vers la médecine du travail lorsque c’est nécessaire.',
  },
  {
    q: 'Ces bilans peuvent-ils être reprochés à l’entreprise ?',
    r: 'Notre démarche est construite pour l’inverse. L’entreprise ne reçoit aucun résultat individuel, nos constats sont fonctionnels et non médicaux, et chaque point de vigilance s’accompagne d’une action concrète. Le dossier qui en résulte documente une prévention active, ce que la réglementation attend de l’employeur.',
  },
];

/* 4. Le déroulé */
const etapes = [
  {
    titre: 'Le bilan individuel sur plateforme',
    texte:
      'Chaque collaborateur réalise une série de tests simples : squat bras levés pour repérer les compensations posturales, tests d’équilibre yeux ouverts puis yeux fermés, équilibre sur un pied, test de force de préhension. Des tests de mobilité d’épaule complètent le bilan pour les postes qui le justifient.',
  },
  {
    titre: 'Le débriefing personnalisé',
    texte:
      'Dans la foulée, un échange individuel d’environ 20 minutes : son profil de risque, ses points de vigilance, puis les exercices de renforcement et d’étirement adaptés, expliqués simplement.',
  },
  {
    titre: 'Le bilan entreprise',
    texte:
      'La direction et les RH reçoivent une synthèse collective et anonymisée, sans aucun résultat nominatif : tendances par grandes familles de postes, priorités de prévention, plan d’actions et programme d’exercices collectif.',
  },
];

/* 5 bis. Pour la direction RH */
const pointsSecurisation = [
  {
    titre: 'Aucune donnée individuelle transmise',
    texte:
      'Le résultat nominatif reste entre le salarié et nous. Vous recevez des tendances collectives, calculées sur des groupes assez larges pour qu’aucun salarié ne soit identifiable.',
  },
  {
    titre: 'Des constats fonctionnels, pas médicaux',
    texte:
      'Nous mesurons une fonction (équilibre, mobilité, force), pas une pathologie. Aucun bilan ne pose de diagnostic, ni ne se prononce sur l’origine professionnelle d’une gêne.',
  },
  {
    titre: 'Chaque constat arrive avec sa réponse',
    texte:
      'Une mobilité d’épaule réduite sur un poste administratif est livrée avec ses exercices correctifs et des pistes d’aménagement simples. Vous ne recevez pas un problème, mais une action.',
  },
  {
    titre: 'Une démarche tracée dans le temps',
    texte:
      'Mesure, préconisations, actions engagées, nouvelle mesure : votre dossier montre une politique de prévention active et suivie.',
  },
];

/* 7. Nos engagements */
const engagements = [
  {
    titre: 'Prévention, pas diagnostic',
    texte:
      'Nos bilans identifient des facteurs de risque. Ils ne constituent pas un avis médical et ne justifient en aucun cas un arrêt de travail, que seul un médecin peut prescrire.',
  },
  {
    titre: 'En lien avec la santé au travail',
    texte:
      'Lorsqu’un bilan révèle une douleur associée à un déséquilibre marqué, nous invitons le salarié, et lui seul, à consulter la médecine du travail.',
  },
  {
    titre: 'Confidentialité',
    texte:
      'Les résultats individuels appartiennent au salarié. L’entreprise ne reçoit qu’une synthèse agrégée et anonymisée. Les données sont traitées conformément au RGPD, avec le consentement du salarié.',
  },
  {
    titre: 'Accessible à tous',
    texte:
      'Pas de jargon : chacun repart en comprenant son bilan et en sachant quoi faire.',
  },
];

export default function EntreprisesPage() {
  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.r,
      },
    })),
  };

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Bilans QVCT et prévention des TMS en entreprise',
    description:
      'Bilans biomécaniques sur site pour prévenir TMS et sédentarité. Mesures objectives, débriefing individuel et rapport RH anonymisé.',
    provider: {
      '@type': 'HealthClub',
      name: site.nom,
      url: site.url,
      telephone: site.telephone.international,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.adresse.rue,
        postalCode: site.adresse.codePostal,
        addressLocality: site.adresse.ville,
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Île-de-France',
    },
  };

  return (
    <>
      <JsonLd data={[schemaService, schemaFaq]} />

      {/* 1. Bandeau d'accroche (Hero) */}
      <Row as="section" className="apropos-hero" aria-labelledby="titre-entreprises">
        <Cell span={2}>
          <PhotoImg
            className="hk-media apropos-hero__photo"
            photo={photos.coachTablette}
            preload
            quality={85}
            sizes="(max-width: 1023px) 92vw, 46vw"
          />
        </Cell>
        <Cell span={2} className="apropos-hero__texte">
          <h1 id="titre-entreprises" className="titre-hero">
            <Mots texte="Prévenir les TMS de vos équipes, mesure à l’appui" />
            <span className="titre-point c-bleu" style={{ '--n': 10 } as CSSProperties} aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo">
            Hygie Sport Santé &amp; Performance réalise dans vos locaux des bilans biomécaniques individuels et vous remet un plan de prévention documenté,
            fondé sur des mesures objectives et des données collectives anonymisées.
          </p>
          <div className="hk-actions" style={{ marginTop: 'calc(24 * var(--u))', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button href="#formulaire" variant="jaune">
              Demander une présentation
            </Button>
            <Button href="#deroule" variant="contour">
              Découvrir le déroulé d’une intervention
            </Button>
          </div>
        </Cell>
      </Row>

      {/* 2. Le constat */}
      <Section
        titre="Le constat"
        titreId="titre-constat"
        sousTitre="Comprendre les signaux faibles"
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Les TMS ne préviennent pas avant de s’installer
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Les troubles musculo-squelettiques restent la première cause de maladie professionnelle en France. Ils s’installent lentement : une posture
          compensée, un déséquilibre, une raideur qu’on ne remarque plus… jusqu’à la douleur, puis l’arrêt.
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Que vos collaborateurs portent des charges sur un chantier ou restent assis huit heures devant un écran, le risque existe. La sédentarité, elle
          aussi, fragilise le dos, les épaules et l’équilibre.
        </Reveal>
        <Reveal as="p" className="chapo texte-colonne">
          <span style={{ color: 'var(--bleu-fonce)' }}>
            La bonne nouvelle : ces signaux faibles se mesurent. Et ce qui se mesure se corrige, bien avant la douleur.
          </span>
        </Reveal>
      </Section>

      {/* 3. Notre approche */}
      <Section
        titre="Notre approche"
        titreId="titre-approche"
        sousTitre="Objectiver plutôt que déclarer"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.coachSquat} sizes="(max-width: 1023px) 92vw, 46vw" />}
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Des mesures objectives, pas seulement un questionnaire
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          La plupart des démarches QVCT reposent sur du déclaratif. Nous allons plus loin : chaque salarié passe une courte batterie de tests sur plateforme de
          force, qui mesure avec précision son équilibre, sa posture, sa force de préhension et ses compensations musculaires.
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Nous croisons ensuite ces mesures avec les douleurs déclarées et le mode de vie (activité physique, poste de travail). Une gêne déclarée qui se
          retrouve dans la mesure pèse davantage dans le profil de prévention : le résultat est fiable, et chaque salarié comprend d’où vient son profil.
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          <strong>Nous intervenons directement sur site, sans perturber l’organisation de vos équipes.</strong>
        </Reveal>
      </Section>

      {/* 4. Le déroulé */}
      <Section
        id="deroule"
        titre="Le déroulé"
        titreId="titre-deroule"
        sousTitre="Une intervention en trois temps"
        aere
      >
        <ol className="mesures">
          {etapes.map((e, i) => (
            <li className="mesures__item" key={e.titre}>
              <span className="mesures__numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="titre-bloc" style={{ marginTop: '8px' }}>
                {e.titre}
              </h3>
              <p className="courant">{e.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. Ce que vous recevez */}
      <Section
        titre="Ce que vous recevez"
        titreId="titre-recevez"
        sousTitre="Des livrables concrets pour chacun"
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Un résultat concret, pour chacun et pour l’entreprise
        </Reveal>
        <div className="hk-grid" style={{ marginTop: 'calc(16 * var(--u))' }}>
          {/* Carte 1 : Pour chaque salarié */}
          <div className="hk-card" style={{ padding: '32px 28px' }}>
            <span className="hk-tag hk-tag--bleu">Pour chaque salarié</span>
            <h4 className="titre-bloc" style={{ marginTop: '16px' }}>
              Profil de prévention individuel
            </h4>
            <ul className="puces courant" style={{ marginTop: '16px' }}>
              <li>Un indice de risque TMS et un indice de sédentarité, notés de 1 à 10</li>
              <li>Les explications de ce qui fait monter son score</li>
              <li>Ses douleurs traduites en langage clair, zone par zone</li>
              <li>Un programme personnalisé d’exercices illustrés : renforcement et étirements</li>
            </ul>
          </div>

          {/* Carte 2 : Pour la direction et les RH */}
          <div className="hk-card" style={{ padding: '32px 28px' }}>
            <span className="hk-tag hk-tag--jaune">Pour la direction et les RH</span>
            <h4 className="titre-bloc" style={{ marginTop: '16px' }}>
              Rapport &amp; plan d’actions collectif
            </h4>
            <ul className="puces courant" style={{ marginTop: '16px' }}>
              <li>Une synthèse collective anonymisée, jamais de résultat nominatif</li>
              <li>Des priorités de prévention par grandes familles de postes</li>
              <li>Des fiches d’exercices illustrées, prêtes à diffuser</li>
              <li>Un plan d’actions daté, à intégrer à votre document unique (DUERP)</li>
              <li>La traçabilité de votre démarche : ce qui a été mesuré, proposé et mis en place</li>
            </ul>
          </div>
        </div>

        {/* Bloc exemples — deux boutons de téléchargement */}
        <div
          style={{
            marginTop: 'calc(32 * var(--u))',
            padding: '32px',
            background: 'var(--brume)',
            borderRadius: 'var(--rayon)',
            border: '1px solid var(--filet-doux)',
          }}
        >
          <h4 className="titre-section" style={{ fontSize: 'calc(24 * var(--u))' }}>
            Voyez par vous-même
          </h4>
          <p className="courant" style={{ marginTop: '8px', maxWidth: '64ch' }}>
            Deux documents réels, anonymisés, issus d’une campagne en entreprise sur des postes de bureau.
          </p>

          <div className="hk-grid" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button href="/documents/Prevexis_bilan_exemple_anonymise.pdf" variant="contour">
                Exemple de bilan individuel (PDF, 8 pages)
              </Button>
              <p className="prose-note" style={{ margin: 0 }}>
                Ce que reçoit chaque salarié : profil de prévention, mesures, analyse du squat, programme d’exercices illustré.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button href="/documents/Prevexis_rapport_entreprise_exemple_anonymise.pdf" variant="contour">
                Exemple de rapport entreprise (PDF, 9 pages)
              </Button>
              <p className="prose-note" style={{ margin: 0 }}>
                Ce que reçoit la direction : synthèse collective anonymisée, priorités de prévention et préconisations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5 bis. Pour la direction RH */}
      <Section
        titre="Pour la direction RH"
        titreId="titre-rh"
        sousTitre="Sécurité juridique et obligations DUERP"
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Mesurer, c’est pouvoir démontrer que vous agissez
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          L’employeur a déjà l’obligation d’évaluer les risques professionnels et de les consigner dans le document unique. Ne pas mesurer ne fait pas disparaître
          un risque : cela prive seulement l’entreprise de la preuve qu’elle l’a pris en charge.
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          <strong>Notre démarche est conçue pour sécuriser l’employeur, pas pour l’exposer :</strong>
        </Reveal>

        <div className="hk-grid" style={{ marginTop: 'calc(16 * var(--u))' }}>
          {pointsSecurisation.map((pt) => (
            <div key={pt.titre} className="hk-card" style={{ padding: '24px' }}>
              <h4 className="titre-bloc" style={{ fontSize: 'calc(18 * var(--u))', color: 'var(--bleu-fonce)' }}>
                {pt.titre}
              </h4>
              <p className="courant" style={{ marginTop: '8px' }}>
                {pt.texte}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. La technologie */}
      <Section
        titre="La technologie"
        titreId="titre-technologie"
        sousTitre="Mesure scientifique de pointe"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.agilite} sizes="(max-width: 1023px) 92vw, 46vw" />}
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          La précision du laboratoire, directement dans vos locaux
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Nos bilans s’appuient sur les plateformes de force KINVENT, utilisées en kinésithérapie et en préparation physique de haut niveau. Elles mesurent au
          millimètre les déplacements du centre de pression, les asymétries et la force produite.
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Toutes les données sont analysées par Prevexis, notre plateforme développée en interne. Elle calcule les indices de risque à partir de références
          scientifiques, génère les bilans individuels et produit le rapport entreprise. Résultat : des conclusions homogènes d’un salarié à l’autre et d’un
          site à l’autre.
        </Reveal>
      </Section>

      {/* 7. Nos engagements */}
      <Section
        titre="Nos engagements"
        titreId="titre-engagements"
        sousTitre="Déontologie & sérénité"
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Une démarche de prévention, en toute confiance
        </Reveal>

        <div className="hk-grid" style={{ marginTop: 'calc(16 * var(--u))' }}>
          {engagements.map((eng) => (
            <div key={eng.titre} className="hk-card" style={{ padding: '24px' }}>
              <h4 className="titre-bloc" style={{ fontSize: 'calc(18 * var(--u))' }}>
                {eng.titre}
              </h4>
              <p className="courant" style={{ marginTop: '8px' }}>
                {eng.texte}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Questions fréquentes */}
      <Row as="section" aria-labelledby="titre-faq" aere>
        <Cell>
          <Reveal as="h2" id="titre-faq" className="titre-section">
            Vos questions
          </Reveal>
          <p className="etiquette section__sous-titre">Tout ce que vous devez savoir</p>
        </Cell>
        <Cell span={3}>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="faq__item">
                <summary>
                  <span className="titre-liste">{f.q}</span>
                </summary>
                <p className="faq__reponse">{f.r}</p>
              </details>
            ))}
          </div>
        </Cell>
      </Row>

      {/* 9. Appel à l'action et formulaire */}
      <Section
        id="formulaire"
        titre="Contact & Devis"
        titreId="titre-cta"
        sousTitre="Parlons de votre projet"
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Faites le point sur la santé physique de vos équipes
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Parlons de votre contexte : nombre de collaborateurs, types de postes, sites concernés. Nous vous proposons une intervention adaptée.
        </Reveal>

        <div className="hk-grid" style={{ marginTop: 'calc(24 * var(--u))', alignItems: 'start' }}>
          <div className="hk-card" style={{ padding: '32px 28px' }}>
            <span className="hk-tag hk-tag--gris">Votre interlocuteur</span>
            <h4 className="titre-bloc" style={{ marginTop: '16px' }}>
              Johan Pereira
            </h4>
            <p className="courant" style={{ marginTop: '6px' }}>
              Fondateur d’Hygie · Étiopathe &amp; Préparateur physique
            </p>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="courant">
                Téléphone :{' '}
                <a href={site.telephone.lien} style={{ fontWeight: 600 }}>
                  {site.telephone.affichage}
                </a>
              </p>
              <p className="courant">
                E-mail :{' '}
                <a href={`mailto:${site.email}`} style={{ fontWeight: 600 }}>
                  {site.email}
                </a>
              </p>
              <p className="courant">
                Lieu : {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville} (ou intervention directe dans vos locaux).
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--brume)', padding: '32px 28px', borderRadius: 'var(--rayon)' }}>
            <h4 className="titre-bloc" style={{ marginBottom: '20px' }}>
              Demander une présentation
            </h4>
            <ContactForm type="entreprise" submitLabel="Demander une présentation" />
          </div>
        </div>
      </Section>

      {/* Offre Clubs complémentaires */}
      <Section titre="Vous êtes un club sportif ?" titreId="titre-clubs-ent">
        <Reveal as="p" className="courant texte-colonne">
          Nous proposons également des bilans complets (force, asymétries, isocinétisme, aérobie) et une préparation physique sur mesure pour vos athlètes et
          équipes.
        </Reveal>
        <Button href="/clubs">Découvrir les offres clubs</Button>
      </Section>
    </>
  );
}
