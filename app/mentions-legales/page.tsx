import type { Metadata } from 'next';
import Link from 'next/link';
import { creditsPhotos } from '@/content/images';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site d’Hygie Sport Santé et Performance, Avon (77).',
  alternates: { canonical: '/mentions-legales' },
};

function AC({ valeur, libelle }: { valeur: string | null; libelle: string }) {
  return valeur ? <>{valeur}</> : <span className="a-completer">[{libelle} à compléter]</span>;
}

export default function MentionsLegales() {
  const m = site.mentions;
  return (
    <div className="legal courant">
      <h1 className="titre-section">Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        {site.nom}, <AC valeur={m.formeJuridique} libelle="forme juridique" /> au capital de <AC valeur={m.capital} libelle="capital" />
        <br />
        Siège social : {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville}, France
        <br />
        SIRET : <AC valeur={m.siret} libelle="SIRET" /> · RCS : <AC valeur={m.rcs} libelle="RCS" />
        <br />
        TVA intracommunautaire : <AC valeur={m.tva} libelle="numéro de TVA" />
        <br />
        Téléphone : <a href={site.telephone.lien}>{site.telephone.affichage}</a> · E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        <AC valeur={m.directeurPublication} libelle="nom du directeur de la publication" />
      </p>

      <h2>Hébergement</h2>
      <p>
        <AC valeur={m.hebergeur} libelle="nom, adresse et téléphone de l’hébergeur" />
      </p>

      <h2>Professionnels de santé</h2>
      <p>
        Les kinésithérapeutes, étiopathes et l’orthoptiste qui consultent au centre exercent à titre libéral, sous leur propre responsabilité. La prise de
        rendez-vous se fait sur leurs agendas en ligne (Doctolib, Calendly), soumis aux conditions de ces services.
      </p>

      <h2>Médiation de la consommation</h2>
      <p>
        Conformément au Code de la consommation, vous pouvez recourir gratuitement à un médiateur en cas de litige non résolu :{' '}
        <span className="a-completer">[médiateur à compléter]</span>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        La structure du site, ses textes, photographies, logos et éléments graphiques sont la propriété de l’éditeur, sauf mention contraire. Toute
        reproduction, même partielle, sans autorisation écrite est interdite.
      </p>
      <p>Les courtes citations sont autorisées, avec le nom de l’auteur et un lien vers la page citée.</p>
      <p>
        Crédits photos : portrait de Johan Pereira, {site.nom}. Photos de sport et de soins :{' '}
        <a href="https://unsplash.com/license" rel="noopener">
          Unsplash
        </a>
        , par{' '}
        {creditsPhotos().map((c, i, liste) => (
          <span key={c.nom}>
            <a href={c.profil} rel="noopener">
              {c.nom}
            </a>
            {i < liste.length - 2 ? ', ' : i === liste.length - 2 ? ' et ' : '.'}
          </span>
        ))}
      </p>
      <p>
        Icônes des réseaux sociaux :{' '}
        <a href="https://fontawesome.com/license/free" rel="noopener">
          Font Awesome Free
        </a>{' '}
        (licence CC BY 4.0). Plan d’accès :{' '}
        <a href="https://www.openstreetmap.org/copyright" rel="noopener">
          © les contributeurs d’OpenStreetMap
        </a>{' '}
        (licence ODbL).
      </p>

      <h2>Responsabilité</h2>
      <p>
        L’éditeur s’efforce de fournir des informations exactes et à jour, sans pouvoir en garantir l’exhaustivité. Les contenus du site sont informatifs : ils
        ne remplacent pas une consultation médicale.
      </p>
      <p>Les liens vers d’autres sites (Doctolib, Calendly, réseaux sociaux) n’engagent pas la responsabilité de l’éditeur quant à leur contenu.</p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans la <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    </div>
  );
}
