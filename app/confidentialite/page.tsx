import type { Metadata } from 'next';
import { site } from '@/content/site';
import { nomOutilAudience } from '@/components/Audience';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment Hygie Sport Santé et Performance collecte et protège vos données personnelles.',
  alternates: { canonical: '/confidentialite' },
};

const outil = nomOutilAudience();

export default function Confidentialite() {
  return (
    <div className="legal courant">
      <h1 className="titre-section">Confidentialité</h1>
      <p style={{ marginTop: 20 }}>Dernière mise à jour : septembre 2026.</p>

      <h2>Responsable du traitement</h2>
      <p>
        {site.nom}, {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville}. Pour toute question sur vos données :{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nous ne collectons que les données que vous saisissez dans nos formulaires : nom, e-mail, téléphone, le cas échéant le nom de votre entreprise ou de
        votre club, l’objet de votre demande, le créneau souhaité et votre message.
      </p>
      <p>N’indiquez pas d’informations médicales dans ces formulaires : elles seront échangées directement avec le praticien.</p>

      <h2>Finalités et base légale</h2>
      <p>
        Ces données servent uniquement à répondre à votre demande, à organiser vos séances et à établir un devis. Le traitement repose sur les mesures
        précontractuelles prises à votre demande (article 6.1.b du RGPD).
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées à l’équipe d’Hygie. Elles ne sont ni vendues, ni louées, ni cédées. Nos prestataires techniques y accèdent pour le seul
        fonctionnement du site :
      </p>
      <ul>
        <li>
          l’hébergeur du site : <span className="a-completer">[à compléter]</span> ;
        </li>
        <li>le service d’envoi des e-mails du formulaire : Resend, Inc. (États-Unis).</li>
      </ul>
      <p>
        Les transferts hors de l’Union européenne sont encadrés par les clauses contractuelles types de la Commission européenne ou le cadre de protection des
        données UE-États-Unis.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les demandes restées sans suite sont conservées trois ans après le dernier contact. Les données de nos clients sont conservées pendant la relation, puis
        archivées le temps des obligations légales.
      </p>

      <h2>Services de réservation</h2>
      <p>
        Les rendez-vous avec les praticiens et les bilans se prennent sur Doctolib ou Calendly. En suivant ces liens, vous quittez notre site : ces services
        traitent vos données selon leur propre politique de confidentialité.
      </p>

      <h2>Cookies et mesure d’audience</h2>
      <p>Ce site ne dépose aucun cookie de mesure d’audience ni de publicité. Aucun bandeau de consentement n’est donc nécessaire.</p>
      {outil ? (
        <p>
          La fréquentation du site est mesurée avec {outil}, un outil sans cookie qui ne conserve aucune donnée permettant de vous identifier ni de vous suivre
          d’un site à l’autre : seules des statistiques agrégées (pages vues, provenance, type d’appareil) sont produites.
        </p>
      ) : null}
      <p>
        Le plan d’accès de la page Contact est fourni par OpenStreetMap, sans cookie ; les avis affichés sur l’accueil sont lus depuis Google par notre serveur,
        sans script ni cookie chez vous.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi que du droit de
        définir des directives sur leur sort après votre décès. Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ; nous répondons sous un mois.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL :{' '}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi en HTTPS. Les formulaires sont protégés contre les envois automatisés et vos données ne sont accessibles qu’aux personnes qui en ont
        besoin.
      </p>
    </div>
  );
}
