import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { ContactGabarit } from '@/components/templates/ContactGabarit';
import { Button } from '@/components/ui/Button';
import { Cell, Row } from '@/components/ui/Row';
import { Reveal } from '@/components/ui/Primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact et accès : 9, rue de la Petite Vitesse, Avon',
  description:
    'Hygie Sport Santé et Performance, 9 rue de la Petite Vitesse, 77210 Avon. 01 84 74 34 20. Ouvert du lundi au vendredi de 8 h à 20 h et le samedi de 9 h à 13 h.',
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
              {site.horaires.map((h) => (
                <span key={h.jours}>
                  {h.jours} : {h.heures}
                  <br />
                </span>
              ))}
            </p>
            <p>Parking à proximité et accès facile en transports.</p>
          </>
        }
        colonne4={<ContactForm type="contact" />}
      />

      <Row as="section" aria-labelledby="titre-rdv-contact">
        <Cell span={2}>
          <Reveal as="h2" id="titre-rdv-contact" className="titre-section">
            Réserver directement
          </Reveal>
        </Cell>
        <Cell>
          <Reveal as="p" className="courant texte-colonne">
            Kinésithérapeutes, étiopathes, orthoptiste et bilans se réservent en ligne, sans attendre notre réponse.
          </Reveal>
        </Cell>
        <Cell>
          <Button href="/rendez-vous" variant="solid">
            Prendre rendez-vous
          </Button>
        </Cell>
      </Row>
    </>
  );
}
