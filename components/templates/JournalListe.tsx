import Link from 'next/link';
import { Entete } from '../scenes/Entete';
import { ListeLignes } from '../scenes/Scenes';
import { photos } from '@/content/images';
import { articlesTries, categories, dateLongue, tempsDeLecture, type Categorie } from '@/content/journal';

/* Liste du journal, filtrée ou non par catégorie : carte photo en haut de page (la photo du dernier article),
   les catégories en pilules, puis les articles en grandes lignes, comme sur l'accueil. */
export function JournalListe({ categorie }: { categorie?: Categorie }) {
  const tous = articlesTries();
  const liste = tous.filter((a) => !categorie || a.categorie === categorie);
  const une = liste.find((a) => a.photo) ?? tous.find((a) => a.photo);
  const presentes = (Object.keys(categories) as Categorie[]).filter((c) => tous.some((a) => a.categorie === c));

  return (
    <>
      <Entete
        id="titre-journal"
        titre={categorie ? categories[categorie] : 'Le journal'}
        photo={une?.photo ? photos[une.photo] : null}
        court
        chapo={
          categorie
            ? `Les articles de la catégorie ${categories[categorie].toLowerCase()}, par l’équipe Hygie.`
            : 'Conseils, méthodes et retours d’expérience de l’équipe Hygie, pour bouger mieux et plus longtemps.'
        }
      />
      <section className="e-journal" aria-label="Articles">
        <nav aria-label="Catégories">
          <ul className="hk-filter">
            <li>
              <Link href="/journal" aria-current={categorie ? undefined : 'page'}>
                Tous
              </Link>
            </li>
            {presentes.map((c) => (
              <li key={c}>
                <Link href={`/journal/categorie/${c}`} aria-current={categorie === c ? 'page' : undefined}>
                  {categories[c]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ListeLignes
          niveau="h2"
          items={liste.map((a) => ({
            href: `/journal/${a.slug}`,
            etiquette: categories[a.categorie],
            titre: a.titre,
            detail: `${dateLongue(a.date)} · ${tempsDeLecture(a)} min de lecture`,
            photo: a.photo,
            vignette: a.vignette,
          }))}
        />
      </section>
    </>
  );
}
