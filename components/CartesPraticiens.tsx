'use client';

import { cx } from '@/lib/cx';
import { photos } from '@/content/images';
import { initiales, libelleReservation, praticiensDe, type Discipline, type Praticien } from '@/content/praticiens';
import { useCentre } from '@/context/CentreContext';
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
  const { centre, choisirCentre } = useCentre();

  if (centre === 'bondoufle') {
    return (
      <div
        className="hk-card"
        style={{
          padding: '28px 24px',
          background: 'var(--surface)',
          borderRadius: 'var(--rayon)',
          border: '1px solid var(--filet-doux)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="hk-tag hk-tag--jaune">Centre de Bondoufle · En construction</span>
        </div>
        <h4 className="titre-bloc" style={{ margin: 0, fontSize: '18px' }}>
          Praticiens en cours de constitution
        </h4>
        <p className="courant" style={{ margin: 0, maxWidth: '58ch' }}>
          L’équipe de professionnels de santé et du sport du centre de Bondoufle est en cours de recrutement pour l’ouverture du centre. Les profils et les plannings de consultation seront affichés ici très prochainement.
        </p>
        <div style={{ marginTop: '6px' }}>
          <button
            type="button"
            onClick={() => choisirCentre('avon')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--bleu-fonce)',
              font: 'inherit',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Consulter les praticiens au centre de Fontainebleau-Avon →
          </button>
        </div>
      </div>
    );
  }

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
