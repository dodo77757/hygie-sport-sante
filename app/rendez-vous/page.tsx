import type { Metadata } from 'next';
import Link from 'next/link';
import { BookingTabs } from '@/components/BookingTabs';
import { ContactForm } from '@/components/ContactForm';
import { ListePraticiens, ListeTarifs } from '@/components/Lists';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { bilans } from '@/content/bilans';
import { disciplines, type Discipline } from '@/content/praticiens';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous : praticiens, bilans, séances',
  description:
    'Réservez en ligne un kinésithérapeute, un étiopathe, l’orthoptiste ou un bilan au centre Hygie d’Avon. Séances de sport et de récupération par téléphone ou formulaire.',
  alternates: { canonical: '/rendez-vous' },
};

function GroupeDiscipline({ discipline, titre }: { discipline: Discipline; titre?: string }) {
  const d = disciplines[discipline];
  return (
    <Row className="rdv-groupe">
      <Cell className="hk-cell--stack">
        <h2 className="titre-bloc">{titre ?? d.nom}</h2>
        {d.note ? <p className="courant texte-colonne">{d.note}</p> : null}
        {d.fiche ? (
          <Link className="courant lien" href={d.fiche}>
            En savoir plus
          </Link>
        ) : null}
      </Cell>
      <Cell span={3}>
        <ListePraticiens discipline={discipline} fluide />
      </Cell>
    </Row>
  );
}

const telephone = (
  <a className="rdv-appel" href={site.telephone.lien}>
    {site.telephone.affichage}
  </a>
);

export default function RendezVous() {
  const panneaux = {
    sante: (
      <>
        <GroupeDiscipline discipline="kinesitherapie" />
        <GroupeDiscipline discipline="etiopathie" />
        <GroupeDiscipline discipline="orthoptie" />
      </>
    ),
    bilans: (
      <Row className="rdv-groupe">
        <Cell className="hk-cell--stack">
          <h2 className="titre-bloc">Bilans physiologiques</h2>
          <p className="courant texte-colonne">Réservation en ligne. Un doute sur le bilan à choisir ? Appelez-nous, nous vous orientons.</p>
          <Link className="courant lien" href="/bilans">
            Comparer les bilans
          </Link>
        </Cell>
        <Cell span={3}>
          <ListeTarifs
            fluide
            items={bilans.map((b) => ({
              nom: b.nom,
              detail: [b.detail, b.duree].filter(Boolean).join(' · '),
              note: b.note,
              prix: b.prix,
              action: { label: 'Réserver', href: b.reservation },
            }))}
          />
        </Cell>
      </Row>
    ),
    sport: (
      <Row className="rdv-groupe">
        <Cell className="hk-cell--stack">
          <h2 className="titre-bloc">Séances de sport</h2>
          <p className="courant texte-colonne">
            Séance d’essai offerte, coaching individuel, sport-santé ou cross training : appelez-nous ou laissez vos coordonnées, nous vous rappelons pour fixer le créneau.
          </p>
          {telephone}
        </Cell>
        <Cell span={2}>
          <ContactForm type="rendez-vous" motif="essai" motifDepuisUrl submitLabel="Être rappelé" />
        </Cell>
        <Cell mobile="hide" className="hk-cell--stack">
          <p className="etiquette">Nos formules</p>
          <p className="courant">
            <Link className="lien" href="/sport/coaching-individuel">
              Coaching individuel
            </Link>
            <br />
            <Link className="lien" href="/sport/sport-sante">
              Sport-santé
            </Link>
            <br />
            <Link className="lien" href="/sport/cross-training">
              Cross training
            </Link>
          </p>
        </Cell>
      </Row>
    ),
    recuperation: (
      <>
        <Row className="rdv-groupe">
          <Cell className="hk-cell--stack">
            <h2 className="titre-bloc">Pressothérapie</h2>
            <p className="courant texte-colonne">20 € la séance de 30 minutes. Un questionnaire de contre-indications est à remplir avant la première séance.</p>
            {telephone}
          </Cell>
          <Cell span={2}>
            <ContactForm type="rendez-vous" motif="pressotherapie" submitLabel="Être rappelé" />
          </Cell>
          <Cell mobile="hide" aria-hidden />
        </Row>
        <GroupeDiscipline discipline="bien-etre" />
      </>
    ),
    pro: (
      <Row className="rdv-groupe">
        <Cell className="hk-cell--stack">
          <h2 className="titre-bloc">Entreprises et clubs</h2>
          <p className="courant texte-colonne">Séances pour vos équipes, bilans de saison, stages : décrivez votre projet, nous revenons vers vous avec un devis.</p>
        </Cell>
        <Cell className="hk-cell--stack">
          <p className="etiquette">Entreprises</p>
          <p className="courant texte-colonne">De 2 à plus de 25 collaborateurs, au centre d’Avon.</p>
          <Button href="/entreprises#formulaire" variant="solid">
            Demander un devis
          </Button>
        </Cell>
        <Cell className="hk-cell--stack">
          <p className="etiquette">Clubs</p>
          <p className="courant texte-colonne">Bilans de pré-saison ou en cours de saison, dès 290 € par sportif.</p>
          <Button href="/clubs#formulaire" variant="solid">
            Demander un devis
          </Button>
        </Cell>
        <Cell mobile="hide" aria-hidden />
      </Row>
    ),
  };

  return (
    <>
      <ContactGabarit
        id="rendez-vous"
        titre="Prendre rendez-vous"
        infos={
          <>
            <p className="etiquette">Par téléphone</p>
            {telephone}
            <p>
              {site.horaires.map((h) => (
                <span key={h.jours}>
                  {h.jours} : {h.heures}
                  <br />
                </span>
              ))}
            </p>
          </>
        }
        colonne4={
          <div className="rdv-infos courant">
            <p>Praticiens et bilans se réservent directement en ligne, sur Doctolib ou sur notre agenda.</p>
            <p>Pour une séance de sport ou de récupération, appelez-nous ou laissez vos coordonnées : nous vous rappelons.</p>
          </div>
        }
      />
      <BookingTabs
        initial="sante"
        onglets={[
          { id: 'sante', label: 'Praticiens de santé' },
          { id: 'bilans', label: 'Bilans' },
          { id: 'sport', label: 'Séances de sport' },
          { id: 'recuperation', label: 'Récupération' },
          { id: 'pro', label: 'Entreprises et clubs' },
        ]}
        panneaux={panneaux}
      />
    </>
  );
}
