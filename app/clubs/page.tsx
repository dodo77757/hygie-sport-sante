import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { PhotoImg } from '@/components/Photo';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { photos } from '@/content/images';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Clubs sportifs : bilans de saison, stages, préparation physique',
  description:
    'Bilans physiologiques de pré-saison ou en cours de saison dès 290 € par sportif, stages sur mesure et préparation physique pour les clubs, au centre Hygie d’Avon (77).',
  alternates: { canonical: '/clubs' },
};

export default function Clubs() {
  return (
    <>
      <ContactGabarit
        id="clubs"
        titre="Préparez votre saison"
        infos={
          <>
            <p>Bilans physiologiques, préparation physique et stages : nous accompagnons vos joueuses et vos joueurs toute l’année, au centre d’Avon.</p>
            <p>
              <a href={site.telephone.lien}>{site.telephone.affichage}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </>
        }
        colonne4={<ContactForm type="club" submitLabel="Demander un devis" />}
      />

      {/* Bilans de saison : titre, texte, prix, bouton, photo */}
      <Section
        titre="Bilans de saison"
        titreId="titre-bilans-saison"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.football} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Nous réalisons les bilans physiologiques de vos joueuses et joueurs, en pré-saison ou en cours de saison. Force, mobilité, sauts et asymétries :
          chaque sportif repart avec ses priorités.
        </Reveal>
        <div className="offre">
          <p className="offre__effectif">À partir de</p>
          <p className="offre__prix">
            290 €<small>par sportif, pour les bilans de la saison</small>
          </p>
        </div>
        <Button href="/bilans">Voir les bilans</Button>
      </Section>

      {/* Stages : titre, texte, liste */}
      <Section titre="Stages sur mesure" titreId="titre-stages" aere>
        <Reveal as="p" className="courant texte-colonne">
          Nous organisons des stages adaptés à votre calendrier :
        </Reveal>
        <ul className="puces courant">
          <li>pré-saison</li>
          <li>trêve internationale</li>
          <li>vacances scolaires</li>
          <li>trêve hivernale</li>
        </ul>
        <p className="courant">Devis sur demande.</p>
      </Section>

      {/* Préparation physique : titre, texte, bouton, photo */}
      <Section
        titre="Préparation physique"
        titreId="titre-prepa"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.dribble} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Du bilan à la préparation physique de l’effectif, nos préparateurs suivent vos sportifs avec des données objectives et s’adaptent à votre calendrier.
        </Reveal>
        <Button href="#formulaire">Demander un devis</Button>
      </Section>
    </>
  );
}
