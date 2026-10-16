import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { SousNavEntreprises } from '@/components/SousNavEntreprises';
import { Cell, Row } from '@/components/ui/Row';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { Mots } from '@/components/ui/Mots';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'Contact & devis entreprise — Bilans QVCT · Hygie' },
  description:
    'Demandez une présentation ou un devis pour votre entreprise : bilans biomécaniques sur site, prévention des TMS et plan d’actions DUERP. Réponse sous 48 h.',
  alternates: { canonical: '/entreprises/contact' },
  openGraph: {
    title: 'Contact & devis entreprise — Bilans QVCT · Hygie',
    description:
      'Demandez une présentation ou un devis pour votre entreprise : bilans biomécaniques sur site, prévention des TMS et plan d’actions DUERP. Réponse sous 48 h.',
    url: `${site.url}/entreprises/contact`,
    type: 'website',
  },
};

const etapesContact = [
  {
    num: '01',
    titre: 'Premier échange de cadrage',
    texte: 'Un point rapide de 15 minutes par téléphone ou visio pour comprendre vos métiers, la répartition de vos équipes et vos contraintes d’organisation.',
  },
  {
    num: '02',
    titre: 'Proposition sur mesure',
    texte: 'Nous calibrons le calendrier d’intervention (temps de passage par salarié, rotation sur site) et vous transmettons un devis clair et transparent.',
  },
  {
    num: '03',
    titre: 'Intervention autonome',
    texte: 'Nous venons avec nos plateformes de force et capteurs. Il suffit d’une salle calme : vos équipes poursuivent leur activité sans perturbation.',
  },
];

export default function EntreprisesContactPage() {
  return (
    <>
      {/* En-tête */}
      <Row as="section" className="apropos-hero" aria-labelledby="titre-contact-ent">
        <Cell span={4}>
          <SousNavEntreprises />
          <h1 id="titre-contact-ent" className="titre-hero">
            <Mots texte="Contact & devis entreprise" />
            <span className="titre-point c-jaune" style={{ '--n': 5 } as CSSProperties} aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo" style={{ maxWidth: '680px', marginTop: '16px' }}>
            Parlons de votre contexte : nombre de collaborateurs, types de postes, sites concernés. Nous construisons avec vous une intervention adaptée à vos
            équipes.
          </p>
        </Cell>
      </Row>

      {/* Formulaire et coordonnées */}
      <Section
        id="formulaire"
        titre="Demande directe"
        titreId="titre-demande"
        sousTitre="Réponse sous 48 h ouvrées"
        aere
      >
        <div className="hk-grid" style={{ alignItems: 'start', marginTop: 'calc(16 * var(--u))' }}>
          {/* Carte coordonnées */}
          <div className="hk-card" style={{ padding: '32px 28px' }}>
            <span className="hk-tag hk-tag--gris">Votre interlocuteur direct</span>
            <h3 className="titre-bloc" style={{ marginTop: '16px' }}>
              Johan Pereira
            </h3>
            <p className="courant" style={{ marginTop: '6px' }}>
              Fondateur d’Hygie · Étiopathe &amp; Préparateur physique
            </p>

            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <p className="etiquette" style={{ color: 'var(--bleu-fonce)' }}>Téléphone direct</p>
                <a href={site.telephone.lien} className="titre-liste" style={{ fontSize: '20px', textDecoration: 'none' }}>
                  {site.telephone.affichage}
                </a>
              </div>

              <div>
                <p className="etiquette" style={{ color: 'var(--bleu-fonce)' }}>E-mail</p>
                <a href={`mailto:${site.email}`} className="titre-liste" style={{ fontSize: '18px', textDecoration: 'none' }}>
                  {site.email}
                </a>
              </div>

              <div>
                <p className="etiquette" style={{ color: 'var(--bleu-fonce)' }}>Zone d’intervention</p>
                <p className="courant" style={{ margin: 0 }}>
                  Directement sur site dans vos locaux (Île-de-France et départements limitrophes) ou dans notre centre à Avon (9, rue de la Petite Vitesse).
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div style={{ background: 'var(--brume)', padding: '32px 28px', borderRadius: 'var(--rayon)' }}>
            <h3 className="titre-bloc" style={{ marginBottom: '20px' }}>
              Demander une présentation ou un devis
            </h3>
            <ContactForm type="entreprise" submitLabel="Demander une présentation" />
          </div>
        </div>
      </Section>

      {/* Les étapes de prise en charge */}
      <Section
        titre="Le déroulement"
        titreId="titre-etapes"
        sousTitre="Simple, rapide et sans friction"
        aere
      >
        <div className="hk-grid" style={{ marginTop: 'calc(16 * var(--u))' }}>
          {etapesContact.map((et) => (
            <div key={et.num} className="hk-card" style={{ padding: '24px' }}>
              <span className="mesures__numero" style={{ fontSize: '18px', color: 'var(--bleu-fonce)' }} aria-hidden="true">
                {et.num}
              </span>
              <h4 className="titre-bloc" style={{ marginTop: '10px' }}>
                {et.titre}
              </h4>
              <p className="courant" style={{ marginTop: '8px' }}>
                {et.texte}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
