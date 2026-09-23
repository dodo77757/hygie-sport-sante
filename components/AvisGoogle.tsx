import { Reveal } from './ui/Primitives';

/* Avis Google du centre, lus par l'API Places (New) et affichés tels quels, avec le nom de leur auteur et le lien vers Google.
   Sans GOOGLE_PLACES_API_KEY et GOOGLE_PLACE_ID dans l'environnement, le bloc ne s'affiche pas.
   Google renvoie au plus cinq avis, mis en cache un jour (revalidate) : aucun appel à chaque visite, aucun script ni cookie côté visiteur. */

type Auteur = { displayName: string; uri?: string };
type Avis = {
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution: Auteur;
  relativePublishTimeDescription?: string;
  publishTime?: string;
};
export type FicheGoogle = { rating?: number; userRatingCount?: number; reviews?: Avis[]; googleMapsUri?: string };

export async function chargerAvisGoogle(): Promise<FicheGoogle | null> {
  const cle = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;
  if (!cle || !id) return null;
  try {
    const reponse = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?languageCode=fr`, {
      headers: { 'X-Goog-Api-Key': cle, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri' },
      next: { revalidate: 86400 },
    });
    if (!reponse.ok) {
      console.warn(`[avis google] ${reponse.status} ${reponse.statusText}`);
      return null;
    }
    return (await reponse.json()) as FicheGoogle;
  } catch (erreur) {
    console.warn('[avis google] indisponible', erreur);
    return null;
  }
}

const formatNote = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function Etoiles({ note }: { note: number }) {
  return (
    <span className="avis__etoiles" role="img" aria-label={`${formatNote.format(note)} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" className={n <= Math.round(note) ? 'is-pleine' : undefined}>
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.8l-5.4 2.9 1.2-5.9L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </span>
  );
}

export async function AvisGoogle() {
  const fiche = await chargerAvisGoogle();
  const avis = (fiche?.reviews ?? []).filter((a) => a.text?.text || a.originalText?.text).slice(0, 4);
  if (!fiche || !avis.length) return null;

  return (
    <div className="avis">
      <div className="avis__tete">
        {fiche.rating ? (
          <p className="avis__note">
            <Etoiles note={fiche.rating} />
            <strong>{formatNote.format(fiche.rating)}</strong>
            <span> sur 5{fiche.userRatingCount ? ` · ${fiche.userRatingCount} avis` : ''}</span>
          </p>
        ) : null}
        {fiche.googleMapsUri ? (
          <a className="libelle lien" href={fiche.googleMapsUri} target="_blank" rel="noopener noreferrer">
            Tous les avis sur Google
          </a>
        ) : null}
      </div>
      <ul className="avis__liste">
        {avis.map((a, i) => (
          <Reveal as="li" effect="carte" key={`${a.authorAttribution.displayName}-${a.publishTime ?? i}`} className="avis__item">
            <Etoiles note={a.rating} />
            <blockquote className="avis__texte">
              <p>{a.text?.text ?? a.originalText?.text}</p>
            </blockquote>
            <p className="avis__auteur">
              {a.authorAttribution.uri ? (
                <a href={a.authorAttribution.uri} target="_blank" rel="noopener noreferrer nofollow">
                  {a.authorAttribution.displayName}
                </a>
              ) : (
                a.authorAttribution.displayName
              )}
              {a.relativePublishTimeDescription ? <span> · {a.relativePublishTimeDescription}</span> : null}
            </p>
          </Reveal>
        ))}
      </ul>
      <p className="avis__source">Avis publiés sur Google, reproduits sans modification.</p>
    </div>
  );
}
