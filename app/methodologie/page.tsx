import Link from 'next/link';
import type { Metadata } from 'next';
import { CoralPanel } from '@/components/CoralPanel';
import { PhotoImg } from '@/components/Photo';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Quote, Reveal } from '@/components/ui/Primitives';
import { photos } from '@/content/images';

export const metadata: Metadata = {
  title: 'La méthode Hygie : évaluer, bouger, suivre',
  description:
    'Bilan de départ, séances adaptées, suivi dans la durée : la méthode Hygie, issue du sport de haut niveau, et l’équipe de Johan Pereira à Avon (77).',
  alternates: { canonical: '/methodologie' },
};

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
            La méthode Hygie
            <span className="titre-point c-jaune" aria-hidden="true" />
          </h1>
          <p className="chapo apropos-hero__chapo">
            Pas de santé sans mouvement, pas de performance durable sans équilibre. Issue du sport de haut niveau, notre méthode tient en trois temps.
          </p>
        </Cell>
      </Row>

      {/* Étape 1 : 1 + 1 + 2 */}
      <Row as="section" aria-labelledby="etape-evaluer">
        <Cell>
          <Reveal as="h2" id="etape-evaluer" className="titre-section">
            Évaluer d’abord
          </Reveal>
        </Cell>
        <Cell className="hk-cell--stack">
          <Reveal as="p" className="courant texte-colonne">
            Chaque parcours commence par un bilan : posture, mobilité, force et composition corporelle, mais aussi sommeil, alimentation et objectifs. Nous savons ainsi d’où vous partez.
          </Reveal>
          <Button href="/bilans">Voir les bilans</Button>
        </Cell>
        <Cell span={2}>
          <PhotoImg className="hk-media apropos-photo" photo={photos.coachTablette} sizes="(max-width: 1023px) 92vw, 46vw" />
        </Cell>
      </Row>

      {/* Étape 2 : 2 + 1 + 1 */}
      <Row as="section" aria-labelledby="etape-bouger">
        <Cell span={2}>
          <PhotoImg className="hk-media apropos-photo" photo={photos.coachSquat} sizes="(max-width: 1023px) 92vw, 46vw" />
        </Cell>
        <Cell mobile="first">
          <Reveal as="h2" id="etape-bouger" className="titre-section">
            Bouger mieux
          </Reveal>
        </Cell>
        <Cell className="hk-cell--stack" mobile="first">
          <Reveal as="p" className="courant texte-colonne">
            Vos séances s’adaptent à votre niveau, à vos contraintes et à vos objectifs : activité physique adaptée, renforcement, mobilité ou préparation ciblée. Rien n’est standardisé.
          </Reveal>
          <Button href="/sport">Voir les séances</Button>
        </Cell>
      </Row>

      {/* Étape 3 : 2 + 1 + 1, deux colonnes vides */}
      <Row as="section" aria-labelledby="etape-suivre" aere>
        <Cell span={2} mobile="hide" aria-hidden />
        <Cell>
          <Reveal as="h2" id="etape-suivre" className="titre-section">
            Suivre dans la durée
          </Reveal>
        </Cell>
        <Cell className="hk-cell--stack">
          <Reveal as="p" className="courant texte-colonne">
            Des bilans intermédiaires ajustent le cap, dans un suivi régulier, motivant et bienveillant. La régularité reste la clé.
          </Reveal>
          <Button href="/sport/coaching-individuel">Voir les formules</Button>
        </Cell>
      </Row>

      <Row>
        <Cell span={4} className="methode-citation">
          <Reveal>
            <Quote source="La méthode Hygie">« Le vrai changement, c’est celui qui dure. »</Quote>
          </Reveal>
        </Cell>
      </Row>

      {/* Deux parcours : 1 + 1 + 1 + 1 */}
      <Row as="section" aria-labelledby="titre-parcours" aere>
        <Cell>
          <Reveal as="h2" id="titre-parcours" className="titre-section">
            Deux parcours
          </Reveal>
        </Cell>
        <Cell>
          <Reveal as="p" className="courant texte-colonne">
            Que vous repreniez doucement une activité ou que vous cherchiez la performance, notre exigence reste la même : un accompagnement sur mesure, encadré par des professionnels de la santé et du sport.
          </Reveal>
        </Cell>
        <Cell className="hk-cell--stack">
          <h3 className="titre-bloc">Bien-être</h3>
          <p className="courant">
            Retrouver énergie, mobilité et vitalité, en douceur. Remise en mouvement, gestion du stress, prévention des douleurs : pour vous sentir mieux dans votre corps, à tout âge.
          </p>
        </Cell>
        <Cell className="hk-cell--stack">
          <h3 className="titre-bloc">Performance</h3>
          <p className="courant">
            Progresser, prévenir les blessures et récupérer plus vite. Biomécanique, kinésithérapie du sport et coaching ciblé : pour atteindre votre potentiel en protégeant votre corps.
          </p>
        </Cell>
      </Row>

      {/* Johan Pereira : 2 + 1 + 1 */}
      <Row as="section" id="johan-pereira" aria-labelledby="titre-johan">
        <Cell span={2}>
          <PhotoImg className="hk-media apropos-photo" photo={photos.johanPereira} sizes="(max-width: 1023px) 92vw, 46vw" />
        </Cell>
        <Cell mobile="first">
          <Reveal as="h2" id="titre-johan" className="titre-section">
            Rencontrez Johan Pereira
          </Reveal>
          <p className="etiquette" style={{ marginTop: 'calc(20 * var(--u))' }}>
            Fondateur, étiopathe et préparateur physique
          </p>
        </Cell>
        <Cell className="hk-cell--stack" mobile="first">
          <Reveal className="intro-colonne courant texte-colonne">
            <p>
              Ancien footballeur à l’ESTAC, Johan Pereira voit sa carrière interrompue par une blessure au genou. Il y découvre une vocation : soigner.
            </p>
            <p>
              Après six années d’études à la faculté d’étiopathie de Paris, il s’installe à Avon en 2012. Il complète sa formation par deux diplômes universitaires, en préparation physique et réathlétisation, puis en biomécanique du sport.
            </p>
            <p>
              Chargé de cours à la faculté d’étiopathie de Paris, il a fondé Hygie pour réunir santé, sport et prévention au même endroit. Il a notamment accompagné Mekdès Woldu, Carole Zahi et Cheick Doucouré.
            </p>
          </Reveal>
          <Button href="/sante/etiopathie">Consulter Johan</Button>
        </Cell>
      </Row>

      {/* L'équipe sport : 1 + 1 + 1 + 1 */}
      <Row as="section" aria-labelledby="titre-equipe">
        <Cell>
          <Reveal as="h2" id="titre-equipe" className="titre-section">
            L’équipe sport
          </Reveal>
        </Cell>
        <Cell>
          <div className="bloc-equipe">
            <h3 className="titre-bloc">Johan Pereira</h3>
            <p className="bloc-equipe__role">Préparateur physique, étiopathe</p>
          </div>
        </Cell>
        <Cell>
          <div className="bloc-equipe">
            <h3 className="titre-bloc">Martin Tondeur</h3>
            <p className="bloc-equipe__role">Préparateur physique</p>
          </div>
        </Cell>
        <Cell>
          <div className="bloc-equipe">
            <h3 className="titre-bloc">Jean-Etienne Boilot</h3>
            <p className="bloc-equipe__role">Préparateur physique</p>
          </div>
        </Cell>
      </Row>
      <Row aere>
        <Cell mobile="hide" aria-hidden />
        <Cell span={3}>
          <p className="courant texte-large">
            Au centre, ils travaillent avec dix kinésithérapeutes, deux étiopathes, une orthoptiste et une praticienne en massages et nutrition. Découvrez le{' '}
            <Link className="lien" href="/sante">
              pôle Santé
            </Link>
            .
          </p>
        </Cell>
      </Row>

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
