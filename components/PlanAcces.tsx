import { site } from '@/content/site';

/* Plan d'accès sans Google Maps : carte OpenStreetMap intégrée (aucun cookie), chargée à la demande,
   et liens vers Google Maps, Apple Plans et OpenStreetMap pour l'itinéraire. */
const { lat, lon } = site.coordonnees;
const d = 0.006;
const bbox = [lon - d, lat - 0.003, lon + d, lat + 0.003].map((n) => n.toFixed(5)).join('%2C');
const carte = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

export function PlanAcces() {
  return (
    <div className="plan">
      <iframe
        className="plan__carte"
        src={carte}
        title={`Plan d’accès : ${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="plan__liens libelle">
        Itinéraire :{' '}
        <a className="lien" href={site.plans.google} target="_blank" rel="noopener noreferrer">
          Google Maps
        </a>
        ,{' '}
        <a className="lien" href={site.plans.apple} target="_blank" rel="noopener noreferrer">
          Apple Plans
        </a>
        ,{' '}
        <a className="lien" href={site.plans.openstreetmap} target="_blank" rel="noopener noreferrer">
          OpenStreetMap
        </a>
        <span className="sr-only"> (nouvel onglet)</span>
      </p>
    </div>
  );
}
