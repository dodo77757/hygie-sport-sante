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
import { Mots } from '@/components/ui/Mots';

export const metadata: Metadata = {
  title: 'La méthode Hygie : évaluer, bouger, accompagner',
  description:
    'Une méthode issue du sport de haut niveau, fondée sur trois piliers : un bilan individualisé, des séances non standardisées et un suivi dans la durée. Johan Pereira et l’équipe sport d’Hygie, à Avon (77).',
  alternates: { canonical: '/methodologie' },
};

/* Contenus repris du site actuel (page Activités physiques, article « Découvrez la méthode Hygie », page Étiopathe). */

const mesures = [
  {
    nom: 'Mobilités fonctionnelles',
    texte: 'Analyse de vos mouvements pour repérer restrictions et compensations, et cibler étirements et renforcement.',
  },
  {
    nom: 'Forces musculaires',
    texte: 'Tests spécifiques pour mesurer les asymétries, essentielles pour éviter les blessures et progresser.',
  },
  {
    nom: 'Capacités aérobies',
    texte: 'Test de marche ou détermination de vos zones d’entraînement avec le capteur PNOE, pour un programme sur mesure.',
  },
  {
    nom: 'Composition corporelle',
    texte: 'Mesure par impédancemètre, si elle est utile, pour comprendre d’où vous partez.',
  },
  {
    nom: 'Puissance et explosivité',
    texte: 'Sauts sur plateforme de force, deux qualités décisives dans de nombreux sports.',
  },
];

const objectifs = [
  { nom: 'Reprise du sport', texte: 'Après une blessure ou une longue pause, nous guidons votre retour à la forme.' },
  { nom: 'Prévention des blessures', texte: 'Renforcer les zones fragiles et améliorer votre mobilité.' },
  { nom: 'Optimisation des performances', texte: 'Pour les athlètes, chaque détail compte : nous travaillons ensemble à maximiser votre potentiel.' },
  { nom: 'Perte de poids', texte: 'Une approche globale, pour des résultats sains et durables.' },
  { nom: 'Autonomie', texte: 'Vous donner les outils pour continuer à progresser seul.' },
];

const raisons = [
  { nom: 'Une approche globale et personnalisée', texte: 'Santé, sport et prévention réunis au même endroit, autour de vos objectifs.' },
  { nom: 'Un suivi pluridisciplinaire', texte: 'Kinésithérapeutes, étiopathes, orthoptiste, préparateurs physiques : une seule équipe.' },
  { nom: 'Des technologies de pointe', texte: 'Isocinétisme, plateforme de force, capteur PNOE, impédancemètre : des mesures, pas des impressions.' },
  { nom: 'Une ambiance conviviale', texte: 'Un accompagnement bienveillant et motivant, à tout âge et à tout niveau.' },
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
            Il n’y a pas de santé sans mouvement, ni de performance durable sans équilibre. Nous avons donc développé une méthode unique, issue du sport de haut
            niveau, fondée sur trois piliers.
          </p>
          <p className="etiquette apropos-hero__sommaire">Évaluer · Bouger · Accompagner</p>
        </Cell>
      </Row>

      {/* Les trois piliers : numéro et titre à gauche, texte, liste et bouton, photo à droite */}
      <Section
        numero="01"
        titre="Évaluer"
        titreId="pilier-evaluer"
        sousTitre="Pour mieux accompagner"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.coachTablette} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Chaque parcours débute par un bilan individualisé. Nous savons ainsi d’où vous partez, et nous mesurons ensuite le chemin parcouru.
        </Reveal>
        <ul className="puces courant texte-colonne">
          <li>Posture, mobilité, composition corporelle</li>
          <li>Mode de vie, sommeil, alimentation</li>
          <li>Objectifs personnels : santé, reprise d’activité, performance</li>
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
          Nos coachings ne sont pas standardisés. Ils s’adaptent à votre niveau, à vos contraintes et à vos objectifs.
        </Reveal>
        <ul className="puces courant texte-colonne">
          <li>Activité physique adaptée</li>
          <li>Renforcement global, mobilité, prévention</li>
          <li>Préparation physique ciblée</li>
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
          Parce que la régularité est la clé, nous misons sur le temps long plutôt que sur les coups d’éclat.
        </Reveal>
        <ul className="puces courant texte-colonne">
          <li>Un suivi régulier et personnalisé</li>
          <li>Des bilans intermédiaires pour ajuster le cap</li>
          <li>Une approche bienveillante, motivante et durable</li>
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
      <Section titre="Ce que mesure le bilan de départ" titreId="titre-bilan-depart" sousTitre="Le premier pas de la méthode" aere>
        <Reveal as="p" className="courant texte-colonne">
          Chez Hygie, chaque personne est considérée comme un sportif de haut niveau, quel que soit son niveau d’expérience. Le premier pas est un bilan
          physiologique complet, qui nous permet de comprendre vos besoins.
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

      {/* Deux parcours : textes du site actuel */}
      <Section titre="Deux parcours, une même exigence" titreId="titre-parcours" aere>
        <Reveal as="p" className="courant texte-colonne">
          Chez Hygie, chaque personne compte. Que vous repreniez doucement une activité physique ou que vous soyez à la recherche de performance, notre exigence
          reste la même : un accompagnement sur mesure, encadré par des professionnels de la santé et du sport.
        </Reveal>
        <div className="section__deux parcours">
          <div>
            <p className="etiquette">Parcours</p>
            <h3 className="titre-bloc">Bien-être</h3>
            <p className="parcours__promesse">Retrouvez énergie, mobilité et vitalité, en douceur et durablement.</p>
            <p className="courant">
              Conçu pour les femmes et les hommes qui souhaitent prendre soin de leur santé globale, ce parcours vous accompagne à chaque étape, quel que soit
              votre âge ou votre condition physique. Nos professionnels vous proposent un suivi personnalisé axé sur la remise en mouvement, la gestion du
              stress, la prévention des douleurs et l’amélioration de la qualité de vie.
            </p>
            <p className="courant">
              <strong>Objectif :</strong> vous sentir mieux dans votre corps, retrouver confiance en vos capacités et vivre pleinement votre quotidien.
            </p>
            <Link className="lien courant" href="/sport/sport-sante">
              Voir le sport-santé
            </Link>
          </div>
          <div>
            <p className="etiquette">Parcours</p>
            <h3 className="titre-bloc">Performance</h3>
            <p className="parcours__promesse">Optimisez vos résultats, prévenez les blessures et récupérez plus vite.</p>
            <p className="courant">
              Destiné aux sportifs réguliers, compétiteurs ou amateurs exigeants, ce parcours vous aide à repousser vos limites tout en protégeant votre capital
              santé. Une approche individualisée, mêlant expertise biomécanique, kinésithérapie du sport, technologies de pointe et coaching ciblé, pour
              progresser de manière efficace et durable.
            </p>
            <p className="courant">
              <strong>Objectif :</strong> performer au meilleur de votre potentiel, en respectant votre corps et en réduisant les risques de blessure.
            </p>
            <Link className="lien courant" href="/sport/coaching-individuel">
              Voir le coaching individuel
            </Link>
          </div>
        </div>
      </Section>

      {/* Objectifs et raisons de choisir Hygie */}
      <Section titre="Pour quels objectifs ?" titreId="titre-objectifs" aere>
        <Reveal as="p" className="courant texte-colonne">
          La méthode ne se limite pas à la performance sportive. Elle s’adapte à ce que vous cherchez.
        </Reveal>
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
        <Button href="/rendez-vous?motif=sport&objet=essai">Réserver la séance offerte</Button>
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
            Ancien footballeur à l’ESTAC, Johan Pereira voit sa carrière interrompue par une blessure au genou. Cet événement le conduit à une nouvelle vocation
            : soigner.
          </p>
          <p>
            D’abord engagé dans une prépa-kiné, il se tourne vers l’étiopathie, une discipline qui le passionne. Après six années d’études à la faculté
            d’étiopathie de Paris, il s’installe à Avon en 2012.
          </p>
          <p>
            Pour affiner son expertise auprès des sportifs, il complète sa formation par deux diplômes universitaires. Sa pratique ne se limite pas aux sportifs
            : il prend en charge l’ensemble des troubles relevant de l’étiopathie, avec un accompagnement adapté à chaque patient.
          </p>
        </Reveal>
        <ul className="puces courant texte-colonne" aria-label="Formation">
          <li>Faculté d’étiopathie de Paris, où il est chargé de cours</li>
          <li>D.U. préparation physique et réathlétisation, Évry</li>
          <li>D.U. sport et locomotion : biomécanique, prévention et performance, Saint-Étienne</li>
        </ul>
        <Button href="/sante/etiopathie">Consulter Johan</Button>
      </Section>

      {/* Les sportifs suivis */}
      <Section titre="Ils lui font confiance" titreId="titre-athletes" sousTitre="Sportifs professionnels suivis par Johan Pereira" aere>
        <Reveal as="p" className="courant texte-colonne">
          Marathon, football, cyclisme sur piste, athlétisme, sports de combat : la méthode s’est construite auprès d’athlètes de haut niveau, et elle profite à
          chacun.
        </Reveal>
        <Athletes />
      </Section>

      {/* L'équipe sport : titre, texte, les trois cartes */}
      <Section titre="L’équipe sport" titreId="titre-equipe" aere>
        <Reveal as="p" className="courant texte-colonne">
          Trois préparateurs physiques, diplômés, qui construisent chaque programme à partir d’un bilan. La première séance d’une heure est offerte.
        </Reveal>
        <CartesPraticiens discipline="preparation" />
        <p className="courant texte-large">
          Au centre, ils travaillent avec les kinésithérapeutes, les étiopathes, l’orthoptiste et la praticienne en massages et nutrition. Découvrez le{' '}
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
            <Button href="/rendez-vous?motif=sport&objet=essai" variant="jaune">
              Réserver l’essai
            </Button>
          </div>
        </CoralPanel>
      </div>
    </>
  );
}
