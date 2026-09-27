import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { PhotoImg } from '@/components/Photo';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { photos } from '@/content/images';
import { site } from '@/content/site';
import { aRenseigner } from '@/content/valeurs';

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Clubs.
   Titre ramené à 60 caractères : sans « · Hygie ». */
export const metadata: Metadata = {
  title: { absolute: 'Clubs sportifs : bilans de saison et préparation physique' },
  description: 'Bilans de pré-saison et de mi-saison, stages sur mesure et préparation physique de l’effectif au centre Hygie d’Avon (77). Devis sur demande.',
  alternates: { canonical: '/clubs' },
};

/* Nombre de bilans inclus dans les 290 € : la précision n'apparaît qu'une fois renseignée (content/valeurs.ts) */
const nombreBilans = aRenseigner.clubs.nombreBilans;

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
          Nous testons tout l’effectif en pré-saison, puis en cours de saison pour suivre l’évolution : force et asymétries, sauts et réactivité, mobilité,
          sprint si besoin. Chaque sportif repart avec ses priorités ; le staff reçoit un tableau de bord de l’effectif pour repérer les profils à risque.
        </Reveal>
        <div className="offre">
          <p className="offre__effectif">À partir de</p>
          <p className="offre__prix">
            290 €<small>par sportif pour la saison{nombreBilans ? `, soit ${nombreBilans} bilans` : ''}</small>
          </p>
        </div>
        <Button href="/bilans">Voir les bilans</Button>
      </Section>

      {/* Stages : titre, texte */}
      <Section titre="Stages sur mesure" titreId="titre-stages" aere>
        <Reveal as="p" className="courant texte-colonne">
          Pré-saison, trêve internationale, vacances scolaires, trêve hivernale : des stages adaptés à votre calendrier. Devis sur demande.
        </Reveal>
      </Section>

      {/* Préparation physique : titre, texte, photo */}
      <Section
        titre="Préparation physique"
        titreId="titre-prepa"
        photo={<PhotoImg className="hk-media apropos-photo apropos-photo--paysage" photo={photos.dribble} sizes="(max-width: 1023px) 92vw, 46vw" />}
      >
        <Reveal as="p" className="courant texte-colonne">
          Du bilan à la préparation physique de l’effectif, nos préparateurs suivent vos sportifs avec des données objectives et s’adaptent à votre calendrier
          de matchs.
        </Reveal>
      </Section>

      {/* Jeunes et centres de formation : titre, texte, bouton */}
      <Section titre="Jeunes et centres de formation" titreId="titre-jeunes" aere>
        <Reveal as="p" className="courant texte-colonne">
          Pour les catégories jeunes, nous estimons la maturité biologique de chaque joueur (pic de croissance) pour adapter les charges et prévenir les
          blessures de croissance.
        </Reveal>
        <Button href="#formulaire">Demander un devis</Button>
      </Section>
    </>
  );
}
