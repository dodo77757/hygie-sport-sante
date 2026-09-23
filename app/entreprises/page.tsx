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
  title: 'Sport en entreprise à Avon : séances, bilans, team building',
  description:
    'Activité physique pour vos salariés au centre Hygie d’Avon (77) : renforcement, HIIT, team building, prévention et bilans. Forfaits de 2 à plus de 25 collaborateurs.',
  alternates: { canonical: '/entreprises' },
};

const forfaits = [
  {
    nom: 'Essentiel',
    effectif: '2 à 8 collaborateurs',
    texte: 'Ciblé, souple, confidentiel : un accompagnement de proximité pour les dirigeants et les petites équipes.',
    puces: ['1 séance par semaine', 'Un groupe de 2 à 8 personnes'],
    prix: '80 €',
  },
  {
    nom: 'Cohésion',
    effectif: '9 à 16 collaborateurs',
    texte: 'Un format pour souder un groupe et prévenir les risques liés à la sédentarité.',
    puces: ['1 séance par semaine', 'Des groupes de 8 personnes au plus'],
    prix: '70 €',
  },
  {
    nom: 'Performance',
    effectif: '17 à 24 collaborateurs',
    texte: 'Des séances calibrées pour des équipes structurées, avec un suivi régulier et mesurable.',
    puces: ['1 séance par semaine', 'Groupes de 8 ou séance collective'],
    prix: '60 €',
  },
  {
    nom: 'Impact',
    effectif: '25 collaborateurs et plus',
    texte: 'Diffuser une culture du mouvement à grande échelle, sur un ou plusieurs sites.',
    puces: ['1 séance par semaine', 'Groupes de 8 ou grand collectif'],
    prix: '40 €',
  },
];

const activites = [
  'Renforcement musculaire et cardio',
  'Circuit training et HIIT',
  'Activités collectives et team building',
  'Coaching personnalisé et prévention santé',
  'Respiration et relaxation',
  'Challenges sportifs',
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
              La performance d’une entreprise passe aussi par la santé de ses équipes. Nous construisons avec vous un programme d’activité physique adapté à vos
              collaborateurs.
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

      {/* Activités : titre, texte, photo */}
      <Section
        titre="Nos activités"
        titreId="titre-activites"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.groupe} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Des séances encadrées par nos préparateurs physiques, pour un environnement de travail sain et dynamique. Vos collaborateurs gagnent en motivation et
          en cohésion.
        </Reveal>
        <ul className="puces courant">
          {activites.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      {/* Forfaits : titre, texte, puis les quatre offres */}
      <Section titre="Nos forfaits" titreId="titre-forfaits">
        <Reveal as="p" className="courant texte-colonne">
          Tarifs indicatifs par collaborateur, pour une séance par semaine. Nous établissons un devis selon votre organisation.
        </Reveal>
      </Section>
      <Row>
        {forfaits.map((f) => (
          <Cell key={f.nom} className="hk-cell--pad">
            <div className="offre">
              <p className="offre__effectif">{f.effectif}</p>
              <h3 className="titre-bloc">{f.nom}</h3>
              <p className="courant">{f.texte}</p>
              <ul className="puces courant">
                {f.puces.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="offre__prix">
                {f.prix}
                <small>par collaborateur</small>
              </p>
            </div>
          </Cell>
        ))}
      </Row>

      {/* Bilan salarié : titre, texte, bouton */}
      <Section titre="Le bilan salarié" titreId="titre-bilan-salarie" aere>
        <Reveal as="p" className="courant texte-colonne">
          Nos kinésithérapeutes proposent à vos salariés un bilan complet : état de forme, poids et composition corporelle, mobilité fonctionnelle, force
          musculaire. Un levier de santé au travail à la fois humain, mesurable et valorisant pour l’entreprise. Les bilans suivants montrent les progrès.
        </Reveal>
        <Button href="#formulaire">Demander un devis</Button>
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
                    r: 'Un bilan préventif détecte tôt les déséquilibres, les douleurs chroniques et les signes de fatigue. Vous réduisez ainsi les troubles musculo-squelettiques, les arrêts de travail et les consultations tardives.',
                  },
                  {
                    q: 'Comment identifier les besoins prioritaires de vos équipes ?',
                    r: 'Un premier échange et les bilans individuels font ressortir les besoins : sédentarité, douleurs de dos, stress, cohésion. Le programme se construit à partir de ces priorités.',
                  },
                  {
                    q: 'Pourquoi personnaliser les activités physiques ?',
                    r: 'Vos collaborateurs n’ont ni le même niveau ni les mêmes contraintes. Adapter les séances évite les blessures et entretient l’envie de venir.',
                  },
                  {
                    q: 'Pourquoi proposer un bilan santé en entreprise ?',
                    r: 'Le bilan donne à chacun une mesure objective de sa forme et des repères pour progresser. Pour l’entreprise, c’est une démarche de prévention concrète et valorisante.',
                  },
                  {
                    q: 'Comment mesurer les progrès au fil du temps ?',
                    r: 'Des bilans intermédiaires reprennent les mêmes tests à intervalles réguliers. Vous suivez l’évolution de la forme de vos équipes sur des données comparables.',
                  },
                ],
              },
            ]}
          />
        </Cell>
      </Row>

      {/* Clubs : titre, texte, bouton */}
      <Section titre="Vous êtes un club" titreId="titre-clubs-ent">
        <Reveal as="p" className="courant texte-colonne">
          Bilans de saison, stages et préparation physique pour vos joueuses et joueurs.
        </Reveal>
        <Button href="/clubs">Offres clubs</Button>
      </Section>
    </>
  );
}
