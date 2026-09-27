import { AvisGoogle } from './AvisGoogle';
import { Reveal } from './ui/Primitives';
import { partenaires } from '@/content/confiance';
import { praticiensAffiches } from '@/content/praticiens';

/* « Ils nous font confiance » : un panneau sombre à part entière sur l'accueil.
   Les quatre preuves des textes du site (25 septembre 2026), puis les avis Google (s'ils sont configurés)
   et les logos de partenaires (s'il y en a). Rien n'est inventé. */
export function Confiance() {
  const nbPraticiens = new Set(praticiensAffiches.map((p) => p.nom)).size;

  const preuves = [
    {
      titre: 'Maison Sport-Santé de Fontainebleau',
      texte:
        'Hygie est centre partenaire de ce dispositif labellisé par l’État, qui oriente vers une activité physique adaptée les personnes atteintes de maladies chroniques ou éloignées du sport.',
    },
    {
      titre: `${nbPraticiens} praticiens sous le même toit`,
      texte:
        'Kinés, étiopathe, orthoptiste, préparateurs physiques, massages et nutrition : un seul parcours, des professionnels qui se transmettent l’information.',
    },
    {
      titre: 'Des sportifs de haut niveau suivis',
      texte:
        'Football, cyclisme sur piste, athlétisme, marathon, sports de combat : la méthode s’est construite auprès d’athlètes professionnels, et elle profite à chacun.',
    },
    {
      titre: 'Des entreprises accompagnées',
      texte: 'Campagnes de prévention et bilans pour les salariés, avec une synthèse anonymisée remise à l’employeur.',
    },
  ];

  return (
    <section className="confiance" id="confiance" aria-labelledby="titre-confiance">
      <div className="confiance__tete">
        <Reveal as="h2" id="titre-confiance" className="titre-section">
          Ils nous font confiance
        </Reveal>
      </div>
      <div className="confiance__corps">
        <ul className="preuves">
          {preuves.map((p) => (
            <li className="preuve" key={p.titre}>
              <h3 className="preuve__titre">{p.titre}</h3>
              <p className="preuve__texte">{p.texte}</p>
            </li>
          ))}
        </ul>
        <AvisGoogle />
        {partenaires.length ? (
          <ul className="partenaires" aria-label="Partenaires">
            {partenaires.map((p) => (
              <li key={p.nom} className="partenaires__item">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" title={`${p.nom} (nouvel onglet)`}>
                    <img src={p.logo} alt={p.nom} loading="lazy" width={240} height={96} />
                  </a>
                ) : (
                  <img src={p.logo} alt={p.nom} loading="lazy" width={240} height={96} />
                )}
                {p.type ? <span className="partenaires__type">{p.type}</span> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
