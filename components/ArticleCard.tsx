import Link from 'next/link';
import type { ReactNode } from 'react';
import { photos, type PhotoKey } from '@/content/images';
import { PhotoImg } from './Photo';
import type { Couleur } from './ui/Primitives';
import { cx } from '@/lib/cx';

type Props = {
  href: string;
  title: string;
  excerpt?: string;
  tag?: string;
  tagCouleur?: Couleur;
  meta?: ReactNode;
  photo?: PhotoKey;
  /** Mot affiché quand aucune photo n'est encore disponible */
  vignette?: string;
  variant?: 'feed' | 'blog' | 'recent' | 'mini';
  headingLevel?: 'h2' | 'h3';
  sizes?: string;
};

/* Carte article : photo arrondie, bloc texte sur brume, étiquette de pôle ou de catégorie. */
export function ArticleCard({ href, title, excerpt, tag, tagCouleur = 'encre', meta, photo, vignette, variant = 'feed', headingLevel = 'h3', sizes }: Props) {
  const Heading = headingLevel;
  const p = photo ? photos[photo] : null;
  const defaultSizes =
    variant === 'mini' ? '(max-width: 1023px) 92vw, 240px' : variant === 'blog' ? '(max-width: 1023px) 92vw, 46vw' : '(max-width: 1023px) 92vw, 46vw';

  return (
    <Link
      href={href}
      className={cx(
        'hk-card hk-reveal',
        variant === 'blog' && 'hk-card--blog',
        variant === 'recent' && 'hk-card--recent',
        variant === 'mini' && 'hk-card--mini',
      )}
      data-effect="carte"
    >
      {p ? (
        <PhotoImg className="hk-card__img" photo={p} decorative sizes={sizes ?? defaultSizes} />
      ) : (
        <div className="hk-card__img hk-card__vignette" aria-hidden="true">
          <span>{vignette ?? title}</span>
        </div>
      )}
      <div className="hk-card__body">
        {meta ? <div className="hk-card__meta">{meta}</div> : null}
        {tag ? <span className={tagCouleur === 'encre' ? 'hk-tag' : `hk-tag hk-tag--${tagCouleur}`}>{tag}</span> : null}
        <Heading className="hk-card__title">{title}</Heading>
        {excerpt ? <p className="hk-card__excerpt">{excerpt}</p> : null}
      </div>
    </Link>
  );
}
