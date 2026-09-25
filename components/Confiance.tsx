import Link from 'next/link';
import { AvisGoogle } from './AvisGoogle';
import { Reveal } from './ui/Primitives';
import { athletes } from '@/content/athletes';
import { maisonSportSante, partenaires } from '@/content/confiance';
import { praticiens } from '@/content/praticiens';

/* « Ils nous font confiance » : un panneau sombre à part entière sur l'accueil.
   Trois preuves tirées des contenus du site (partenariat Maison Sport-Santé, taille de l'équipe, sportifs suivis),
   puis les avis Google (s'ils sont configurés) et les logos de partenaires (s'il y en a). Rien n'est inventé. */
export function Confiance() {
  const nbPraticiens = new Set(praticiens.map((p) => p.nom)).size;
  const disciplines = [...new Set(athletes.map((a) => a.discipline.split(',')[0].toLowerCase()))].slice(0, 5).join(', ');
  const listeDisciplines = disciplines.charAt(0).toUpperCase() + disciplines.slice(1);

  const preuves = [
    {
      etiquette: 'Partenariat',
      titre: maisonSportSante.nom,
      texte:
        'Dispositif labellisé par l’État, qui accompagne vers une activité physique adaptée les personnes atteintes de maladies chroniques ou éloignées du sport.',
      lien: { href: maisonSportSante.url, label: 'Le dispositif', externe: true },
    },
    {
      etiquette: 'Une seule équipe',
      titre: `${nbPraticiens} praticiens sous le même toit`,
      texte: 'Kinésithérapeutes, étiopathes, orthoptiste, préparateurs physiques, massages et nutrition : ils travaillent ensemble, autour de votre parcours.',
      lien: { href: '/soins', label: 'Tous les soins' },
    },
    {
      etiquette: 'Haut niveau',
      titre: 'Des sportifs professionnels suivis',
      texte: `${listeDisciplines} : la méthode s’est construite auprès d’athlètes de haut niveau, et elle profite à chacun.`,
      lien: { href: '/methodologie#titre-athletes', label: 'Voir qui' },
    },
  ];

  return (
    <section className="confiance" id="confiance" aria-labelledby="titre-confiance">
      <div className="confiance__tete">
        <Reveal as="h2" id="titre-confiance" className="titre-section">
          Ils nous font confiance
        </Reveal>
        <p className="etiquette confiance__sous-titre">Partenaires, patients et sportifs</p>
      </div>
      <div className="confiance__corps">
        <Reveal as="p" className="confiance__enonce">
          Un centre partenaire de la Maison Sport-Santé de Fontainebleau, une équipe pluridisciplinaire et des athlètes qui nous confient leur préparation.
        </Reveal>
        <ul className="preuves">
          {preuves.map((p) => (
            <li className="preuve" key={p.titre}>
              <p className="preuve__etiquette">{p.etiquette}</p>
              <h3 className="preuve__titre">{p.titre}</h3>
              <p className="preuve__texte">{p.texte}</p>
              {p.lien.externe ? (
                <a className="preuve__lien" href={p.lien.href} target="_blank" rel="noopener noreferrer">
                  {p.lien.label}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              ) : (
                <Link className="preuve__lien" href={p.lien.href}>
                  {p.lien.label}
                </Link>
              )}
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
