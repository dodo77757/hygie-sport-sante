import { cx } from '@/lib/cx';
import { photos } from '@/content/images';
import { initiales, libelleReservation, praticiensDe, type Discipline, type Praticien } from '@/content/praticiens';
import { Melange } from './Melange';
import { PhotoImg } from './Photo';
import { Button } from './ui/Button';

const couleurs: Record<Discipline, 'bleu' | 'jaune' | 'gris'> = {
  kinesitherapie: 'bleu',
  etiopathie: 'bleu',
  orthoptie: 'bleu',
  'bien-etre': 'gris',
  preparation: 'jaune',
};

/* Praticiens en grille de cartes identiques (portrait, nom, fonction, parcours, spécialités, bouton de rendez-vous),
   côte à côte plutôt qu'en colonne, et dans un ordre tiré au hasard à chaque visite : chacun a la même visibilité.
   Variante compacte (portrait carré, sans parcours) pour la page de rendez-vous. */
export function CartesPraticiens({ discipline, compacte, titreNiveau = 'h3' }: { discipline: Discipline; compacte?: boolean; titreNiveau?: 'h3' | 'h4' }) {
  const liste = praticiensDe(discipline);
  const Titre = titreNiveau;
  const couleur = couleurs[discipline];

  return (
    <ul className={cx('praticiens', compacte && 'praticiens--compactes')}>
      <Melange>
        {liste.map((p: Praticien) => (
          <li className="praticien" key={p.nom}>
            <div className={cx('praticien__portrait', !p.photo && `praticien__portrait--${couleur}`)} aria-hidden={p.photo ? undefined : true}>
              {p.photo ? (
                <PhotoImg className="praticien__img" photo={photos[p.photo]} sizes="(max-width: 1023px) 46vw, 260px" quality={75} />
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
              {!compacte && p.parcours ? <p className="praticien__parcours">{p.parcours}</p> : null}
              {p.specialites.length ? (
                <ul className="praticien__specialites" aria-label="Spécialités">
                  {(compacte ? p.specialites.slice(0, 3) : p.specialites).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              ) : null}
              <div className="praticien__action">
                <Button
                  href={p.reservation.type === 'telephone' ? p.reservation.lien : p.reservation.url}
                  variant={p.reservation.type === 'telephone' ? 'contour' : 'solid'}
                  block
                >
                  {libelleReservation(p.reservation)}
                </Button>
              </div>
            </div>
          </li>
        ))}
      </Melange>
    </ul>
  );
}
