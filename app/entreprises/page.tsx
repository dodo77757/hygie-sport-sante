import type { Metadata } from 'next';
import { Blocks } from '@/components/Blocks';
import { ContactForm } from '@/components/ContactForm';
import { PhotoImg } from '@/components/Photo';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { photos } from '@/content/images';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'Sport et prévention en entreprise à Avon (77) · Hygie' },
  description:
    'Séances collectives, bilans salariés et campagnes de prévention des TMS, au centre ou sur site. Synthèse anonymisée pour l’employeur. Devis rapide.',
  alternates: { canonical: '/entreprises' },
};

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Entreprises. */

const facons = [
  'Séances collectives hebdomadaires, encadrées par nos préparateurs physiques, au centre.',
  'Bilans salariés, individuels, avec un suivi dans le temps.',
  'Campagnes de prévention sur site, pensées pour vos métiers et leurs contraintes physiques.',
];

/* Forfaits : taille d'équipe, format et tarif par collaborateur et par mois */
const forfaits = [
  { nom: 'Essentiel', taille: '2 à 8', format: '1 séance par semaine, un groupe', prix: '80 €' },
  { nom: 'Cohésion', taille: '9 à 16', format: '1 séance par semaine, groupes de 8 au plus', prix: '70 €' },
  { nom: 'Performance', taille: '17 à 24', format: '1 séance par semaine, groupes de 8 ou collectif', prix: '60 €' },
  { nom: 'Impact', taille: '25 et plus', format: '1 séance par semaine, un ou plusieurs sites', prix: '40 €' },
];

const activites = [
  'Renforcement musculaire et cardio',
  'Circuit training et HIIT',
  'Mobilité, dos et postures de travail',
  'Activités collectives et team building',
  'Respiration et relaxation',
  'Challenges sportifs',
];

const campagne = [
  'Des tests rapides sur capteurs : préhension, équilibre, mobilité',
  'Des exercices associés aux risques de chaque métier : port de charges, travail en hauteur, postures prolongées',
  'Un bilan individuel remis à chaque participant',
  'Une synthèse anonymisée remise à l’employeur, pour orienter les actions de prévention',
];

export default function Entreprises() {
  return (
    <>
      <ContactGabarit
        id="entreprises"
        titre="Mieux bouger, mieux travailler"
        infos={
          <>
            <p>
              La performance d’une entreprise passe aussi par la santé de ses équipes. Nous construisons avec vous un programme d’activité physique et de
              prévention adapté à vos métiers, au centre d’Avon ou dans vos locaux.
            </p>
            <p>
              Votre interlocuteur : Johan Pereira, fondateur
              <br />
              <a href={site.telephone.lien}>{site.telephone.affichage}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </>
        }
        colonne4={<ContactForm type="entreprise" submitLabel="Demander un devis" />}
      />

      {/* Trois façons de travailler ensemble : titre, liste numérotée */}
      <Section titre="Trois façons de travailler ensemble" titreId="titre-facons" aere>
        <ol className="mesures">
          {facons.map((texte, i) => (
            <li className="mesures__item" key={texte}>
              <span className="mesures__numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="courant">{texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Activités : titre, liste, photo */}
      <Section
        titre="Nos activités"
        titreId="titre-activites"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.groupe} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <ul className="puces courant">
          {activites.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      {/* Forfaits : titre, texte, puis les quatre forfaits (taille d'équipe, format, tarif) */}
      <Section titre="Nos forfaits de séances" titreId="titre-forfaits">
        <Reveal as="p" className="courant texte-colonne">
          Tarifs indicatifs par collaborateur et par mois, pour une séance par semaine. Devis selon votre organisation.
        </Reveal>
      </Section>
      <Row>
        {forfaits.map((f) => (
          <Cell key={f.nom} className="hk-cell--pad">
            <div className="offre">
              <p className="offre__effectif">Taille d’équipe : {f.taille}</p>
              <h3 className="titre-bloc">{f.nom}</h3>
              <p className="courant">{f.format}</p>
              <p className="offre__prix">
                {f.prix}
                <small>par collaborateur et par mois</small>
              </p>
            </div>
          </Cell>
        ))}
      </Row>

      {/* Bilan salarié : titre, texte, bouton */}
      <Section titre="Le bilan salarié" titreId="titre-bilan-salarie" aere>
        <Reveal as="p" className="courant texte-colonne">
          Chaque salarié passe un bilan individuel : état de forme, composition corporelle, mobilité, force de préhension, équilibre. Il reçoit ses résultats et
          ses repères pour progresser. Les bilans suivants, sur les mêmes tests, montrent l’évolution.
        </Reveal>
        <Button href="#formulaire">Demander un devis</Button>
      </Section>

      {/* Campagnes de prévention des TMS : titre, texte, liste, texte */}
      <Section titre="Campagnes de prévention des TMS" titreId="titre-tms" aere>
        <Reveal as="p" className="courant texte-colonne">
          Pour les métiers physiques (BTP, logistique, industrie, services à la personne), nous intervenons sur site :
        </Reveal>
        <ul className="puces courant texte-colonne">
          {campagne.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="courant texte-colonne">Les résultats individuels restent la propriété du salarié : l’entreprise ne reçoit que des données agrégées.</p>
      </Section>

      {/* FAQ : 1 + 3 */}
      <Row as="section" aria-labelledby="titre-faq" aere>
        <Cell>
          <Reveal as="h2" id="titre-faq" className="titre-section">
            Questions fréquentes
          </Reveal>
        </Cell>
        <Cell span={3}>
          <Blocks
            blocs={[
              {
                t: 'faq',
                items: [
                  {
                    q: 'Comment anticiper les problèmes de santé ?',
                    r: 'Un bilan préventif repère tôt les déséquilibres, les douleurs et la fatigue, pour limiter TMS et arrêts de travail.',
                  },
                  {
                    q: 'Comment identifier les besoins prioritaires ?',
                    r: 'Un premier échange et les bilans font ressortir les besoins : sédentarité, dos, stress, cohésion.',
                  },
                  {
                    q: 'Pourquoi personnaliser les séances ?',
                    r: 'Vos collaborateurs n’ont ni le même niveau ni les mêmes contraintes ; adapter évite les blessures et entretient l’envie.',
                  },
                  {
                    q: 'Comment mesurer les progrès ?',
                    r: 'Des bilans intermédiaires reprennent les mêmes tests à intervalles réguliers.',
                  },
                ],
              },
            ]}
          />
        </Cell>
      </Row>

      {/* Clubs : titre, texte, bouton */}
      <Section titre="Vous êtes un club ?" titreId="titre-clubs-ent">
        <Button href="/clubs">Offres clubs</Button>
      </Section>
    </>
  );
}
