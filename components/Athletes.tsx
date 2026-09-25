import Image from 'next/image';
import { cx } from '@/lib/cx';
import { athletes, creditsAthletes } from '@/content/athletes';
import { initiales } from '@/content/praticiens';

const couleurs = ['jaune', 'bleu', 'gris'] as const;

/* Galerie des sportifs suivis par Johan Pereira : portrait (ou initiales), nom, discipline.
   Les photos sous licence libre sont créditées juste sous la galerie. */
export function Athletes() {
  const credits = creditsAthletes();
  return (
    <div className="athletes">
      <ul className="athletes__liste">
        {athletes.map((a, i) => (
          <li className="athlete" key={a.nom}>
            <div
              className={cx('athlete__portrait', !a.photo && `athlete__portrait--${couleurs[i % couleurs.length]}`)}
              aria-hidden={a.photo ? undefined : true}
            >
              {a.photo ? (
                <Image
                  className="athlete__img"
                  src={a.photo.src}
                  alt={a.photo.alt}
                  sizes="(max-width: 1023px) 46vw, 22vw"
                  quality={80}
                  placeholder="blur"
                  style={{ objectPosition: a.photo.position }}
                />
              ) : (
                <span className="athlete__initiales">{initiales(a.nom)}</span>
              )}
            </div>
            <p className="athlete__nom">{a.nom}</p>
            <p className="athlete__discipline">{a.discipline}</p>
            {a.detail ? <p className="athlete__detail">{a.detail}</p> : null}
          </li>
        ))}
      </ul>
      {credits.length ? (
        <p className="athletes__credits">
          Photos :{' '}
          {credits.map((c, i) => (
            <span key={c.nom}>
              {c.nom} par{' '}
              <a href={c.source} rel="noopener noreferrer" target="_blank">
                {c.auteur}
              </a>{' '}
              (
              <a href={c.licenceUrl} rel="noopener noreferrer" target="_blank">
                {c.licence}
              </a>
              ){i < credits.length - 1 ? ' · ' : '.'}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
