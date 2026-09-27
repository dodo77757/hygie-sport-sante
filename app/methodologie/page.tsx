import Link from 'next/link';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Athletes } from '@/components/Athletes';
import { CartesPraticiens } from '@/components/CartesPraticiens';
import { CoralPanel } from '@/components/CoralPanel';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Section } from '@/components/ui/Section';
import { Quote, Reveal } from '@/components/ui/Primitives';
import { photos } from '@/content/images';
import { RESERVATION_ETIOPATHIE_JOHAN } from '@/content/praticiens';
import { LIEN_ESSAI } from '@/content/valeurs';
import { Mots } from '@/components/ui/Mots';

export const metadata: Metadata = {
  title: { absolute: 'La méthode Hygie : évaluer, bouger, accompagner' },
  description: 'Une méthode issue du haut niveau : un bilan mesuré, des séances construites pour vous, un suivi avec bilans intermédiaires. À Avon (77).',
  alternates: { canonical: '/methodologie' },
};

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Méthode. */

const mesures = [
  {
    nom: 'Mobilités fonctionnelles',
    texte: 'Analyse des mouvements clés (squat, fente, épaules, hanches) pour repérer restrictions et compensations.',
  },
  {
    nom: 'Forces musculaires',
    texte: 'Tests isométriques sur capteurs VALD et KINVENT, gauche contre droite, pour chiffrer les asymétries qui exposent aux blessures.',
  },
  {
    nom: 'Capacités aérobies',
    texte: 'Test de marche ou détermination de vos zones d’entraînement avec l’analyseur métabolique PNOE.',
  },
  {
    nom: 'Composition corporelle',
    texte: 'Mesure par impédancemètre, quand elle sert votre objectif.',
  },
  {
    nom: 'Puissance et explosivité',
    texte: 'Sauts sur plateforme de force (saut vertical, sauts unipodaux, drop jump) et indice de réactivité.',
  },
];

const objectifs = [
  { nom: 'Reprise du sport', texte: 'Après une blessure ou une longue pause, un retour progressif appuyé sur des critères mesurés.' },
  { nom: 'Prévention des blessures', texte: 'Renforcer les zones fragiles, corriger les asymétries, améliorer la mobilité.' },
  { nom: 'Performance', texte: 'Pour les compétiteurs : chaque détail compte, du profil force-vitesse à la récupération.' },
  { nom: 'Perte de poids', texte: 'Une approche globale, activité et alimentation, pour des résultats sains et durables.' },
  { nom: 'Jeunes sportifs', texte: 'Une préparation adaptée à la croissance, avec estimation de la maturité biologique.' },
  { nom: 'Autonomie', texte: 'Vous donner les outils pour continuer à progresser seul.' },
];

const raisons = [
  { nom: 'Une approche globale', texte: 'Santé, sport et récupération réunis, autour de vos objectifs.' },
  { nom: 'Une équipe qui se parle', texte: 'Kinés, étiopathe, orthoptiste et préparateurs physiques partagent l’information utile à votre parcours.' },
  { nom: 'Des mesures, pas des impressions', texte: 'Isocinétisme, plateformes de force, capteurs VALD et KINVENT, PNOE, impédancemètre.' },
  { nom: 'Une ambiance conviviale', texte: 'Un accompagnement exigeant et bienveillant, à tout âge et à tout niveau.' },
];

export default function Methodologie() {
  return (
    <>
      {/* Hero 2 + 2 */}
      <Row as="section" className="apropos-hero" aria-labelledby="titre-methode">
        <Cell span={2}>
          <PhotoImg className="hk-media apropos-hero__photo" photo={photos.coachEcoute} preload quality={85} sizes="(max-width: 1023px) 92vw, 46vw" />
        </Cell>
        <Cell span={2} className="apropos-hero__texte">
          <h1 id="titre-methode" className="titre-hero">
            <Mots texte="La méthode Hygie" />
            <span className="titre-point c-jaune" style={{ '--n': 3 } as CSSProperties} aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo">
            Il n’y a pas de santé sans mouvement, ni de performance durable sans équilibre. Notre méthode vient du sport de haut niveau et repose sur trois
            piliers : évaluer, bouger, accompagner.
          </p>
          <p className="etiquette apropos-hero__sommaire">Évaluer · Bouger · Accompagner</p>
        </Cell>
      </Row>

      {/* Les trois piliers : numéro et titre à gauche, texte, liste et bouton, photo à droite */}
      <Section
        numero="01"
        titre="Évaluer"
        titreId="pilier-evaluer"
        sousTitre="Pour savoir d’où vous partez"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.coachTablette} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Chaque parcours commence par un bilan. Nous mesurons avant de programmer, puis nous mesurons à nouveau pour objectiver vos progrès.
        </Reveal>
        <ul className="puces courant texte-colonne">
          <li>Mobilité, posture, contrôle moteur et équilibre</li>
          <li>Force et asymétries, membre par membre</li>
          <li>Explosivité, capacité aérobie, composition corporelle si elle est utile</li>
          <li>Mode de vie, sommeil, alimentation, antécédents</li>
          <li>Vos objectifs : santé, reprise, performance</li>
        </ul>
        <Button href="/bilans">Découvrir les bilans</Button>
      </Section>

      <Section
        numero="02"
        titre="Bouger"
        titreId="pilier-bouger"
        sousTitre="Intelligemment"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.coachSquat} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Aucune séance n’est standardisée. Le programme découle des chiffres du bilan, de votre niveau, de vos contraintes et de votre calendrier.
        </Reveal>
        <ul className="puces courant texte-colonne">
          <li>Activité physique adaptée et sport-santé</li>
          <li>Renforcement global, mobilité, prévention des blessures</li>
          <li>Préparation physique ciblée par sport</li>
        </ul>
        <Button href="/sport">Voir les séances</Button>
      </Section>

      <Section
        numero="03"
        titre="Accompagner"
        titreId="pilier-accompagner"
        sousTitre="Dans la durée"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.course} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          La régularité fait les résultats. Nous misons sur le temps long plutôt que sur les coups d’éclat.
        </Reveal>
        <ul className="puces courant texte-colonne">
          <li>Un coach référent qui suit votre dossier</li>
          <li>Des bilans intermédiaires pour ajuster le cap</li>
          <li>Un lien direct avec les kinés et l’étiopathe du centre en cas de douleur ou de blessure</li>
        </ul>
        <Button href="/sport/coaching-individuel">Découvrir les formules</Button>
      </Section>

      <Row>
        <Cell span={4} className="methode-citation">
          <Reveal>
            <Quote source="La méthode Hygie">« Le vrai changement, c’est celui qui dure. »</Quote>
          </Reveal>
        </Cell>
      </Row>

      {/* Le bilan de départ, en détail */}
      <Section titre="Ce que mesure le bilan de départ" titreId="titre-bilan-depart" aere>
        <Reveal as="p" className="courant texte-colonne">
          Chez Hygie, chaque personne est suivie avec l’exigence réservée aux sportifs de haut niveau, quel que soit son niveau. Le bilan d’entrée couvre cinq
          dimensions :
        </Reveal>
        <ol className="mesures">
          {mesures.map((m, i) => (
            <li className="mesures__item" key={m.nom}>
              <span className="mesures__numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="titre-liste">{m.nom}</h3>
                <p className="courant">{m.texte}</p>
              </div>
            </li>
          ))}
        </ol>
        <Button href="/bilans">Comparer les bilans</Button>
      </Section>

      {/* Deux parcours */}
      <Section titre="Deux parcours, une même exigence" titreId="titre-parcours" aere>
        <div className="section__deux parcours">
          <div>
            <p className="etiquette">Parcours</p>
            <h3 className="titre-bloc">Bien-être</h3>
            <p className="parcours__promesse">Retrouver énergie, mobilité et confiance, en douceur.</p>
            <p className="courant">
              Pour les femmes et les hommes de tout âge qui veulent prendre soin de leur santé globale : remise en mouvement, gestion du stress, prévention des
              douleurs.
            </p>
            <Link className="lien courant" href="/sport/sport-sante">
              Voir le sport-santé
            </Link>
          </div>
          <div>
            <p className="etiquette">Parcours</p>
            <h3 className="titre-bloc">Performance</h3>
            <p className="parcours__promesse">Progresser sans se blesser.</p>
            <p className="courant">
              Pour les sportifs réguliers, compétiteurs et amateurs exigeants : biomécanique, préparation physique ciblée, récupération et lien avec la
              kinésithérapie du sport.
            </p>
            <Link className="lien courant" href="/sport/coaching-individuel">
              Voir le coaching individuel
            </Link>
          </div>
        </div>
      </Section>

      {/* Objectifs et raisons de choisir Hygie */}
      <Section titre="Pour quels objectifs ?" titreId="titre-objectifs" aere>
        <ul className="objectifs">
          {objectifs.map((o) => (
            <li className="objectifs__item" key={o.nom}>
              <h3 className="titre-liste">{o.nom}</h3>
              <p className="courant">{o.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section titre="Pourquoi choisir Hygie ?" titreId="titre-pourquoi" aere>
        <ol className="raisons">
          {raisons.map((r, i) => (
            <li className="raisons__item" key={r.nom}>
              <span className="raisons__numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="titre-bloc">{r.nom}</h3>
              <p className="courant">{r.texte}</p>
            </li>
          ))}
        </ol>
        <Button href={LIEN_ESSAI}>Réserver la séance offerte</Button>
      </Section>

      {/* Johan Pereira : fonction, parcours, formation, photo */}
      <Section
        id="johan-pereira"
        titre="Johan Pereira"
        titreId="titre-johan"
        sousTitre="Fondateur, étiopathe et préparateur physique"
        photo={<PhotoImg className="hk-media apropos-photo" photo={photos.johanPereira} sizes="(max-width: 1023px) 92vw, 46vw" />}
        aere
      >
        <Reveal className="intro-colonne courant texte-colonne">
          <p>
            Formé comme footballeur à l’ESTAC, Johan Pereira voit sa carrière interrompue par une blessure au genou. Cette expérience le conduit à une nouvelle
            vocation : soigner, puis prévenir.
          </p>
          <p>
            Après six années d’études à la faculté d’étiopathie de Paris, il s’installe à Avon en 2012. Il complète sa formation par deux diplômes
            universitaires tournés vers le sport, puis fonde Hygie pour réunir soin, entraînement et prévention. Sa pratique d’étiopathe ne se limite pas aux
            sportifs.
          </p>
        </Reveal>
        <ul className="puces courant texte-colonne" aria-label="Formation">
          <li>Faculté d’étiopathie de Paris, où il est chargé de cours</li>
          <li>D.U. préparation physique et réathlétisation, Évry</li>
          <li>D.U. sport et locomotion : biomécanique, prévention et performance, Saint-Étienne</li>
        </ul>
        <Button href={RESERVATION_ETIOPATHIE_JOHAN}>Consulter Johan</Button>
      </Section>

      {/* Les sportifs suivis */}
      <Section titre="Ils lui font confiance" titreId="titre-athletes" aere>
        <Reveal as="p" className="courant texte-colonne">
          Marathon, football, cyclisme sur piste, athlétisme, sports de combat : la méthode s’est construite auprès d’athlètes de haut niveau.
        </Reveal>
        <Athletes />
      </Section>

      {/* L'équipe sport : titre, texte, les trois cartes */}
      <Section titre="L’équipe sport" titreId="titre-equipe" aere>
        <Reveal as="p" className="courant texte-colonne">
          Des préparateurs physiques diplômés, qui construisent chaque programme à partir d’un bilan. La première séance d’une heure est offerte.
        </Reveal>
        <CartesPraticiens discipline="preparation" />
        <p className="courant texte-large">
          Au centre, ils travaillent avec les kinésithérapeutes, l’étiopathe, l’orthoptiste et la praticienne en massages et nutrition.
        </p>
        {/* Lien déjà en place, absent des textes du site */}
        <p className="courant texte-large">
          Découvrez le{' '}
          <Link className="lien" href="/sante">
            pôle Santé
          </Link>
          .
        </p>
      </Section>

      <div className="temps-fort">
        <CoralPanel
          id="essai"
          couleur="bleu"
          title="Votre première séance est offerte"
          text="Une heure pour faire connaissance, parler de vos objectifs et tester la méthode, sans engagement."
        >
          <div className="hk-panel__body--center">
            <Button href={LIEN_ESSAI} variant="jaune">
              Réserver l’essai
            </Button>
          </div>
        </CoralPanel>
      </div>
    </>
  );
}
