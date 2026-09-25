import Image from 'next/image';
import { athletes, creditsAthletes } from '@/content/athletes';

/* Sportifs suivis par Johan Pereira : la galerie réunit ceux dont la photo est disponible (licence libre ou photo du centre),
   la liste « Également suivis » les autres, sans vignette vide. Une photo ajoutée dans content/athletes.ts fait passer
   l'athlète dans la galerie. Les photos sous licence libre sont créditées sous la galerie. */
export function Athletes() {
  const avecPhoto = athletes.filter((a) => a.photo);
  const autres = athletes.filter((a) => !a.photo);
  const credits = creditsAthletes();

  return (
    <div className="athletes">
      {avecPhoto.length ? (
        <ul className="athletes__liste">
          {avecPhoto.map((a) =>
            a.photo ? (
              <li className="athlete" key={a.nom}>
                <div className="athlete__portrait">
                  <Image
                    className="athlete__img"
                    src={a.photo.src}
                    alt={a.photo.alt}
                    sizes="(max-width: 1023px) 46vw, 18vw"
                    quality={80}
                    placeholder="blur"
                    style={{ objectPosition: a.photo.position }}
                  />
                </div>
                <p className="athlete__nom">{a.nom}</p>
                <p className="athlete__discipline">{a.discipline}</p>
                {a.detail ? <p className="athlete__detail">{a.detail}</p> : null}
              </li>
            ) : null,
          )}
        </ul>
      ) : null}

      {autres.length ? (
        <div className="athletes__autres">
          <p className="etiquette">Également suivis</p>
          <ul className="athletes__noms">
            {autres.map((a) => (
              <li className="athletes__ligne" key={a.nom}>
                <span className="athletes__nom">{a.nom}</span>
                <span className="athletes__disc">{a.discipline}</span>
                <span className="athletes__det">{a.detail ?? ''}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {credits.length ? (
        <p className="athletes__credits">
          Photos, Wikimedia Commons :{' '}
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
