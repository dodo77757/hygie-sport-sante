import { cx } from '@/lib/cx';
import { photos } from '@/content/images';
import { initiales, libelleReservation, praticiensDe, type Discipline, type Praticien } from '@/content/praticiens';
import { PhotoImg } from './Photo';
import { Button } from './ui/Button';

const couleurs: Record<Discipline, 'bleu' | 'jaune' | 'gris'> = {
  kinesitherapie: 'bleu',
  etiopathie: 'bleu',
  orthoptie: 'bleu',
  'bien-etre': 'gris',
  preparation: 'jaune',
};

/* Cartes de praticiens : portrait (ou initiales en attendant la photo), fonction, deux lignes de parcours,
   spécialités et bouton de réservation. Sur les fiches de soin et pour l'équipe sport. */
export function CartesPraticiens({
  discipline,
  colonnes = 1,
  titreNiveau = 'h3',
}: {
  discipline: Discipline;
  /** 1 : liste dans la colonne de lecture ; 3 : grille de cartes debout */
  colonnes?: 1 | 3;
  titreNiveau?: 'h3' | 'h4';
}) {
  const liste = praticiensDe(discipline);
  const Titre = titreNiveau;
  const couleur = couleurs[discipline];

  return (
    <ul className={cx('praticiens', colonnes === 3 && 'praticiens--grille')}>
      {liste.map((p: Praticien) => (
        <li className={cx('praticien', colonnes === 3 && 'hk-reveal')} data-effect={colonnes === 3 ? 'carte' : undefined} key={p.nom}>
          <div className={cx('praticien__portrait', !p.photo && `praticien__portrait--${couleur}`)} aria-hidden={p.photo ? undefined : true}>
            {p.photo ? (
              <PhotoImg className="praticien__img" photo={photos[p.photo]} sizes={colonnes === 3 ? '(max-width: 1023px) 92vw, 30vw' : '128px'} quality={75} />
            ) : (
              <span className="praticien__initiales">{initiales(p.nom)}</span>
            )}
          </div>
          <div className="praticien__corps">
            <Titre className="praticien__nom">{p.nom}</Titre>
            <p className="praticien__role">
              {p.fonction}
              {p.langues?.length ? <span className="praticien__langues"> · {p.langues.join(', ')}</span> : null}
            </p>
            {p.parcours ? <p className="praticien__parcours">{p.parcours}</p> : null}
            {p.specialites.length ? (
              <ul className="praticien__specialites" aria-label="Spécialités">
                {p.specialites.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : null}
            <div className="praticien__action">
              <Button
                href={p.reservation.type === 'telephone' ? p.reservation.lien : p.reservation.url}
                variant={p.reservation.type === 'telephone' ? 'contour' : 'solid'}
              >
                {libelleReservation(p.reservation)}
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
