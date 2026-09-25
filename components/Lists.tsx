import { cx } from '@/lib/cx';
import { disciplines, type Discipline } from '@/content/praticiens';
import type { Tarif } from '@/content/types';
import { Button } from './ui/Button';

export function noteDiscipline(discipline: Discipline) {
  return disciplines[discipline].note;
}

/* Liste de tarifs : nom, détail, prix, action éventuelle. */
export function ListeTarifs({ items, fluide, titreNiveau = 'h3' }: { items: Tarif[]; fluide?: boolean; titreNiveau?: 'h3' | 'h4' }) {
  const Titre = titreNiveau;
  return (
    <ul className={cx('liste', fluide && 'liste--fluide')}>
      {items.map((t) => (
        <li className="liste__item" key={t.nom}>
          <div>
            <Titre className="liste__nom">{t.nom}</Titre>
            {t.detail ? <p className="liste__detail">{t.detail}</p> : null}
            {t.note ? <p className="liste__note">{t.note}</p> : null}
          </div>
          <div className="liste__fin">
            {t.prix ? <span className="liste__prix">{t.prix}</span> : null}
            {t.action ? (
              <Button href={t.action.href} variant={t.action.variant === 'contour' ? 'contour' : 'solid'}>
                {t.action.label}
              </Button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
