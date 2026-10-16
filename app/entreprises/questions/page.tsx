import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { SousNavEntreprises } from '@/components/SousNavEntreprises';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { Mots } from '@/components/ui/Mots';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'Vos questions sur les bilans QVCT en entreprise · Hygie' },
  description:
    'Déroulement sur site, tenue, confidentialité des salariés, complémentarité avec la médecine du travail, DUERP : toutes les réponses à vos questions.',
  alternates: { canonical: '/entreprises/questions' },
  openGraph: {
    title: 'Vos questions sur les bilans QVCT en entreprise · Hygie',
    description:
      'Déroulement sur site, tenue, confidentialité des salariés, complémentarité avec la médecine du travail, DUERP : toutes les réponses à vos questions.',
    url: `${site.url}/entreprises/questions`,
    type: 'website',
  },
};

const faqs = [
  {
    q: 'Faut-il prévoir une tenue ou un équipement particulier ?',
    r: 'Non. Les tests se font en tenue de travail habituelle, et nous apportons l’intégralité du matériel (plateformes de force et capteurs). Il suffit de mettre à notre disposition une pièce calme sur site.',
  },
  {
    q: 'Les tests sont-ils difficiles ou douloureux ?',
    r: 'Non. Ce sont des mouvements simples du quotidien : se tenir en équilibre, faire un squat, serrer une poignée dynamométrique. Ils sont adaptés à tous les âges et à toutes les conditions physiques, sans jamais forcer.',
  },
  {
    q: 'Mon employeur verra-t-il mes résultats individuels ?',
    r: 'Non. Votre bilan individuel vous est strictement réservé. L’employeur et la direction RH reçoivent uniquement une synthèse collective, anonymisée, calculée sur des groupes suffisamment larges pour qu’aucun salarié ne puisse être identifié.',
  },
  {
    q: 'À quels secteurs d’activité s’adresse l’offre ?',
    r: 'À toutes les entreprises : aussi bien les métiers physiques avec manutention et port de charges (BTP, logistique, industrie, services) que les postes sédentaires (tertiaire, bureaux, travail sur écran). La batterie de tests est ajustée aux contraintes réelles de chaque métier.',
  },
  {
    q: 'Est-ce que cela remplace la médecine du travail ?',
    r: 'Non, c’est une démarche strictement complémentaire. Notre rôle est de repérer les risques biomécaniques en amont et d’orienter vers la médecine du travail lorsque c’est nécessaire.',
  },
  {
    q: 'Ces bilans peuvent-ils être reprochés à l’entreprise ?',
    r: 'Notre démarche est construite pour l’inverse. L’entreprise ne reçoit aucun résultat individuel, nos constats sont purement fonctionnels et non médicaux, et chaque point de vigilance s’accompagne d’une action concrète et d’exercices correctifs. Le dossier qui en résulte documente une démarche de prévention active, ce que la réglementation (DUERP) attend de l’employeur.',
  },
];

export default function EntreprisesQuestionsPage() {
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

  return (
    <>
      <JsonLd data={schemaFaq} />

      {/* En-tête */}
      <Row as="section" className="apropos-hero" aria-labelledby="titre-questions-ent">
        <Cell span={4}>
          <SousNavEntreprises />
          <h1 id="titre-questions-ent" className="titre-hero">
            <Mots texte="Vos questions sur nos bilans QVCT" />
            <span className="titre-point c-bleu" style={{ '--n': 6 } as CSSProperties} aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo" style={{ maxWidth: '680px', marginTop: '16px' }}>
            Tout ce que les directions, les ressources humaines et les collaborateurs doivent savoir sur le déroulement de nos interventions sur site, la
            confidentialité des données et la sécurisation juridique de la démarche.
          </p>
        </Cell>
      </Row>

      {/* Liste des questions */}
      <Row as="section" aria-labelledby="titre-liste-faq" aere>
        <Cell>
          <Reveal as="h2" id="titre-liste-faq" className="titre-section">
            Questions fréquentes
          </Reveal>
          <p className="etiquette section__sous-titre">Transparence &amp; méthode</p>
        </Cell>
        <Cell span={3}>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="faq__item" open>
                <summary>
                  <span className="titre-liste" style={{ fontSize: '18px' }}>
                    {f.q}
                  </span>
                </summary>
                <p className="faq__reponse" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  {f.r}
                </p>
              </details>
            ))}
          </div>
        </Cell>
      </Row>

      {/* Une question spécifique ? */}
      <Section
        titre="Une autre question ?"
        titreId="titre-autre-question"
        sousTitre="Échange direct"
        aere
      >
        <Reveal as="h3" className="titre-bloc">
          Chaque entreprise a ses spécificités
        </Reveal>
        <Reveal as="p" className="courant texte-colonne">
          Vous avez des contraintes d’horaires d’équipes, des sites multiples ou des postes particuliers ? Johan Pereira et notre équipe sont à votre
          disposition pour répondre précisément à vos interrogations.
        </Reveal>
        <div className="hk-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Button href="/entreprises/contact" variant="jaune">
            Demander une présentation ou un devis
          </Button>
          <Button href={site.telephone.lien} variant="contour">
            Appeler le {site.telephone.affichage}
          </Button>
        </div>
      </Section>
    </>
  );
}
