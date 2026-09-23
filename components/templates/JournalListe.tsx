import { ArticleCard } from '../ArticleCard';
import { JournalGabarit } from './JournalGabarit';
import { articlesTries, categories, couleursCategories, dateCourte, tempsDeLecture, type Categorie } from '@/content/journal';

/* Liste du journal, filtrée ou non par catégorie (gabarit Journal). */
export function JournalListe({ categorie }: { categorie?: Categorie }) {
  const liste = articlesTries().filter((a) => !categorie || a.categorie === categorie);
  return (
    <JournalGabarit
      titre={categorie ? categories[categorie] : 'Le journal'}
      point={categorie ? couleursCategories[categorie] : 'jaune'}
      chapo={
        categorie
          ? `Les articles de la catégorie ${categories[categorie].toLowerCase()}, par l’équipe Hygie.`
          : 'Conseils, méthodes et retours d’expérience de l’équipe Hygie, pour bouger mieux et plus longtemps.'
      }
    >
      <div className="hk-grid">
        {liste.map((a) => (
          <ArticleCard
            key={a.slug}
            variant="blog"
            href={`/journal/${a.slug}`}
            photo={a.photo}
            vignette={a.vignette}
            meta={`${dateCourte(a.date)} · ${tempsDeLecture(a)} min de lecture`}
            tag={categories[a.categorie]}
            tagCouleur={couleursCategories[a.categorie]}
            title={a.titre}
            excerpt={a.chapo}
            headingLevel="h2"
          />
        ))}
      </div>
    </JournalGabarit>
  );
}
