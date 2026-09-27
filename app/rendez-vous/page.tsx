import type { Metadata } from 'next';
import Link from 'next/link';
import { BookingTabs } from '@/components/BookingTabs';
import { ContactForm } from '@/components/ContactForm';
import { CartesPraticiens } from '@/components/CartesPraticiens';
import { ListeTarifs } from '@/components/Lists';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { lignesTarifsBilans } from '@/content/bilans';
import { disciplines, type Discipline } from '@/content/praticiens';
import { site } from '@/content/site';
import { aRenseigner } from '@/content/valeurs';

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Rendez-vous. */
export const metadata: Metadata = {
  title: { absolute: 'Prendre rendez-vous : praticiens, bilans, séances · Hygie' },
  description: 'Réservez en ligne un kiné, un étiopathe, l’orthoptiste ou un bilan au centre Hygie d’Avon. Séance d’essai sport offerte, rappel sous 48 h.',
  alternates: { canonical: '/rendez-vous' },
};

/* Lien de réservation de la séance d'essai (content/valeurs.ts) : tant qu'il manque, le formulaire de rappel est l'action principale de l'onglet Sport */
const lienEssai = aRenseigner.liens.essai;

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
        <CartesPraticiens discipline={discipline} compacte />
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
          <ListeTarifs fluide items={lignesTarifsBilans()} />
        </Cell>
      </Row>
    ),
    sport: (
      <Row className="rdv-groupe">
        <Cell className="hk-cell--stack">
          <h2 className="titre-bloc">Votre première séance est offerte</h2>
          <p className="courant texte-colonne">
            Une heure pour faire connaissance, parler de vos objectifs et tester la méthode, sans engagement. Choisissez votre créneau :
          </p>
          {lienEssai ? (
            <Button href={lienEssai} variant="solid">
              Réserver ma séance d’essai
            </Button>
          ) : null}
        </Cell>
        <Cell span={2} className="hk-cell--stack">
          {lienEssai ? <p className="courant">Vous préférez être rappelé ? Laissez vos coordonnées.</p> : null}
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
            <p className="courant texte-colonne">
              20 € la séance de 30 minutes. Un questionnaire de contre-indications est à remplir avant la première séance.
            </p>
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
          <p className="courant texte-colonne">
            Séances pour vos équipes, bilans de saison, stages : décrivez votre projet, nous revenons vers vous avec un devis.
          </p>
        </Cell>
        <Cell className="hk-cell--stack">
          <p className="etiquette">Entreprises</p>
          <p className="courant texte-colonne">De 2 à plus de 25 collaborateurs, au centre ou sur site.</p>
          <Button href="/entreprises#formulaire" variant="solid">
            Demander un devis
          </Button>
        </Cell>
        <Cell className="hk-cell--stack">
          <p className="etiquette">Clubs</p>
          <p className="courant texte-colonne">Bilans de saison, stages et préparation physique.</p>
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
          <p>
            Praticiens et bilans se réservent directement en ligne. Pour une séance de sport ou de récupération, appelez-nous ou laissez vos coordonnées : nous
            vous rappelons.
          </p>
        }
        colonne4={
          <div className="rdv-infos courant">
            <p className="etiquette">Par téléphone</p>
            {telephone}
            <p>{site.horairesPhrase.charAt(0).toUpperCase() + site.horairesPhrase.slice(1)}.</p>
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
