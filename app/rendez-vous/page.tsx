import type { Metadata } from 'next';
import Link from 'next/link';
import { Reservation } from '@/components/Reservation';
import { ContactForm } from '@/components/ContactForm';
import { CartesPraticiens } from '@/components/CartesPraticiens';
import { ListeTarifs } from '@/components/Lists';
import { TitreLignes } from '@/components/scenes/Entete';
import { Button } from '@/components/ui/Button';
import type { CSSProperties, ReactNode } from 'react';
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

/* Un bloc du panneau : le titre et sa note à gauche, le contenu à droite */
function Bloc({
  titre,
  niveau = 'h2',
  note,
  lien,
  children,
}: {
  titre: string;
  niveau?: 'h2' | 'h3';
  note?: ReactNode;
  lien?: { label: string; href: string };
  children: ReactNode;
}) {
  const Titre = niveau;
  return (
    <div className="rdv2-bloc">
      <div className="rdv2-bloc__tete">
        <Titre>{titre}</Titre>
        {note ? <p>{note}</p> : null}
        {lien ? (
          <Link className="plus" href={lien.href}>
            {lien.label}
          </Link>
        ) : null}
      </div>
      <div className="rdv2-bloc__corps">{children}</div>
    </div>
  );
}

function GroupeDiscipline({ discipline, titre }: { discipline: Discipline; titre?: string }) {
  const d = disciplines[discipline];
  return (
    <Bloc titre={titre ?? d.nom} note={d.note} lien={d.fiche ? { label: 'En savoir plus', href: d.fiche } : undefined}>
      <CartesPraticiens discipline={discipline} compacte />
    </Bloc>
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
      <Bloc
        titre="Bilans physiologiques"
        note="Réservation en ligne. Un doute sur le bilan à choisir ? Appelez-nous, nous vous orientons."
        lien={{ label: 'Comparer les bilans', href: '/bilans' }}
      >
        <ListeTarifs fluide items={lignesTarifsBilans()} />
      </Bloc>
    ),
    sport: (
      <Bloc
        niveau="h3"
        titre="Votre première séance est offerte"
        note="Une heure pour faire connaissance, parler de vos objectifs et tester la méthode, sans engagement. Choisissez votre créneau :"
      >
        {lienEssai ? (
          <div className="rdv2-actions">
            <Button href={lienEssai} variant="solid">
              Réserver ma séance d’essai
            </Button>
            <a className="lien" href="#rappel-essai">
              Vous préférez être rappelé ? Laissez vos coordonnées
            </a>
          </div>
        ) : null}
        <div className="rdv2-form" id="rappel-essai">
          <ContactForm type="rendez-vous" motif="essai" motifDepuisUrl submitLabel="Être rappelé" />
        </div>
        <div className="rdv2-cote">
          {telephone}
          <p className="etiquette">Nos formules</p>
          <p>
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
        </div>
      </Bloc>
    ),
    recuperation: (
      <>
        <Bloc titre="Pressothérapie" note="20 € la séance de 30 minutes. Un questionnaire de contre-indications est à remplir avant la première séance.">
          <div className="rdv2-form">
            <ContactForm type="rendez-vous" motif="pressotherapie" submitLabel="Être rappelé" />
          </div>
          <div className="rdv2-cote">{telephone}</div>
        </Bloc>
        <GroupeDiscipline discipline="bien-etre" />
      </>
    ),
    pro: (
      <Bloc
        titre="Entreprises et clubs"
        note="Séances pour vos équipes, bilans de saison, stages : décrivez votre projet, nous revenons vers vous avec un devis."
      >
        <div className="rdv2-duo">
          <div>
            <p className="etiquette">Entreprises</p>
            <p>De 2 à plus de 25 collaborateurs, au centre ou sur site.</p>
            <Button href="/entreprises#formulaire" variant="solid">
              Demander un devis
            </Button>
          </div>
          <div>
            <p className="etiquette">Clubs</p>
            <p>Bilans de saison, stages et préparation physique.</p>
            <Button href="/clubs#formulaire" variant="solid">
              Demander un devis
            </Button>
          </div>
        </div>
      </Bloc>
    ),
  };

  return (
    <>
      <section className="rdv2__tete accueil" aria-labelledby="rendez-vous-titre">
        <h1 id="rendez-vous-titre">
          <TitreLignes texte="Prendre rendez-vous" max={10} />
        </h1>
        <p className="rdv2__intro monte" style={{ '--n': 3 } as CSSProperties}>
          Praticiens et bilans se réservent directement en ligne. Pour une séance de sport ou de récupération, appelez-nous ou laissez vos coordonnées : nous
          vous rappelons.
        </p>
        <a className="rdv2__tel monte" style={{ '--n': 4 } as CSSProperties} href={site.telephone.lien}>
          <span>
            <small>Par téléphone</small>
            <strong>{site.telephone.affichage}</strong>
            <small>{site.horairesPhrase.charAt(0).toUpperCase() + site.horairesPhrase.slice(1)}.</small>
          </span>
          <span className="rond" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M4 12 12 4M5 4h7v7" />
            </svg>
          </span>
        </a>
      </section>
      <Reservation
        initial="sante"
        choix={[
          { id: 'sante', label: 'Praticiens de santé', detail: 'Kinésithérapie, étiopathie, orthoptie' },
          { id: 'bilans', label: 'Bilans', detail: 'Bilans physiologiques' },
          { id: 'sport', label: 'Séances de sport', detail: 'Première séance offerte' },
          { id: 'recuperation', label: 'Récupération', detail: 'Pressothérapie, massages, nutrition' },
          { id: 'pro', label: 'Entreprises et clubs', detail: 'Sur devis' },
        ]}
        panneaux={panneaux}
      />
    </>
  );
}
