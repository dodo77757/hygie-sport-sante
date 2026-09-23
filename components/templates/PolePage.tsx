import { ArticleCard } from '../ArticleCard';
import { JournalGabarit } from './JournalGabarit';
import { cheminSoin, poles, type CouleurPole, type Soin } from '@/content/soins';
import type { PhotoKey } from '@/content/images';

export type CarteSupplementaire = { href: string; titre: string; extrait: string; meta: string; etiquette: string; couleur?: CouleurPole; photo?: PhotoKey };

/* Page d'un pôle (Santé, Sport, Récupération) ou de tous les soins : un titre, une phrase, une carte par soin. */
export function PolePage({
  titre,
  chapo,
  point,
  liste,
  supplementaires = [],
}: {
  titre: string;
  chapo: string;
  point?: CouleurPole;
  liste: Soin[];
  supplementaires?: CarteSupplementaire[];
}) {
  return (
    <JournalGabarit titre={titre} chapo={chapo} point={point}>
      <div className="hk-grid">
        {liste.map((s, i) => (
          <ArticleCard
            key={s.slug}
            variant="blog"
            href={cheminSoin(s)}
            photo={s.photo}
            vignette={s.nom}
            meta={s.carte.meta}
            tag={poles[s.pole].etiquette}
            tagCouleur={poles[s.pole].couleur}
            title={s.carte.titre ?? s.nom}
            excerpt={s.carte.extrait}
            headingLevel="h2"
            sizes={i < 2 ? '(max-width: 1023px) 92vw, 46vw' : undefined}
          />
        ))}
        {supplementaires.map((c) => (
          <ArticleCard
            key={c.href}
            variant="blog"
            href={c.href}
            photo={c.photo}
            vignette={c.titre}
            meta={c.meta}
            tag={c.etiquette}
            tagCouleur={c.couleur}
            title={c.titre}
            excerpt={c.extrait}
            headingLevel="h2"
          />
        ))}
      </div>
    </JournalGabarit>
  );
}
