import { cx } from '@/lib/cx';
import { disciplines, libelleReservation, praticiensDe, type Discipline, type Praticien } from '@/content/praticiens';
import type { Tarif } from '@/content/types';
import { Button } from './ui/Button';

/* Liste de praticiens : nom, spécialités, bouton de réservation (Doctolib, en ligne ou téléphone). */
export function ListePraticiens({ discipline, fluide, titreNiveau = 'h3' }: { discipline: Discipline; fluide?: boolean; titreNiveau?: 'h3' | 'h4' }) {
  const liste = praticiensDe(discipline);
  const Titre = titreNiveau;
  return (
    <ul className={cx('liste', fluide && 'liste--fluide')}>
      {liste.map((p: Praticien) => (
        <li className="liste__item" key={p.nom}>
          <div>
            <Titre className="liste__nom">{p.nom}</Titre>
            <p className="liste__detail">
              {p.fonction}
              {p.specialites.length ? ` · ${p.specialites.join(', ')}` : ''}
            </p>
          </div>
          <div className="liste__fin">
            <Button href={p.reservation.type === 'telephone' ? p.reservation.lien : p.reservation.url} variant={p.reservation.type === 'telephone' ? 'contour' : 'solid'}>
              {libelleReservation(p.reservation)}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

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
