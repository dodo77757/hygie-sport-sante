import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { PlanAcces } from '@/components/PlanAcces';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Primitives';
import { site } from '@/content/site';

/* Textes : « Hygie — Textes du site, page par page » (25 septembre 2026), page Contact. */
export const metadata: Metadata = {
  title: { absolute: 'Contact et accès : 9, rue de la Petite Vitesse, Avon · Hygie' },
  description:
    'Hygie, 9 rue de la Petite Vitesse, 77210 Avon, à deux pas de la gare Fontainebleau-Avon. 01 84 74 34 20. Lundi-vendredi 8 h-20 h, samedi 9 h-13 h.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <ContactGabarit
        id="contact"
        titre="Nous trouver"
        infos={
          <>
            <p>
              <span className="etiquette">Adresse</span>
              <br />
              {site.adresse.rue}
              <br />
              {site.adresse.codePostal} {site.adresse.ville}
              <br />
              <a className="lien" href={site.itineraire} target="_blank" rel="noopener noreferrer">
                Itinéraire<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </p>
            <p>
              <span className="etiquette">Téléphone</span>
              <br />
              <a href={site.telephone.lien}>{site.telephone.affichage}</a>
            </p>
            <p>
              <span className="etiquette">E-mail</span>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <span className="etiquette">Horaires</span>
              <br />
              {site.horairesPhrase.charAt(0).toUpperCase() + site.horairesPhrase.slice(1)}
            </p>
          </>
        }
        colonne4={<ContactForm type="contact" />}
      />

      {/* Plan d'accès : titre, adresse, carte */}
      <Section titre="Plan d’accès" titreId="titre-plan">
        <Reveal as="p" className="courant texte-colonne">
          {site.acces}
        </Reveal>
        <PlanAcces />
      </Section>

      {/* Réserver directement : titre, texte, bouton */}
      <Section titre="Réserver en ligne" titreId="titre-rdv-contact">
        <Reveal as="p" className="courant texte-colonne">
          Kinésithérapeutes, étiopathe, orthoptiste et bilans se réservent en ligne, sans attendre notre réponse.
        </Reveal>
        <Button href="/rendez-vous" variant="solid">
          Prendre rendez-vous
        </Button>
      </Section>
    </>
  );
}
