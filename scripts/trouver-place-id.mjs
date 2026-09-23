/* Retrouve l'identifiant Google (Place ID) de la fiche du centre, à mettre dans GOOGLE_PLACE_ID.
   Usage : npm run place-id            (lit GOOGLE_PLACES_API_KEY dans .env.local ou .env)
           npm run place-id -- "Hygie Avon"   pour une autre recherche
   Appelle « Text Search » de l'API Places (New) : la clé doit avoir cette API activée. */
import { readFileSync } from 'node:fs';

function chargerEnv(fichier) {
  try {
    for (const ligne of readFileSync(fichier, 'utf8').split('\n')) {
      const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  } catch {
    /* fichier absent */
  }
}
chargerEnv('.env.local');
chargerEnv('.env');

const cle = process.env.GOOGLE_PLACES_API_KEY;
if (!cle) {
  console.error('GOOGLE_PLACES_API_KEY manquante : renseignez-la dans .env.local (voir .env.example).');
  process.exit(1);
}

const recherche = process.argv.slice(2).join(' ') || 'Hygie Sport Santé et Performance, 9 rue de la Petite Vitesse, 77210 Avon';
const reponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': cle,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
  },
  body: JSON.stringify({ textQuery: recherche, languageCode: 'fr', regionCode: 'FR' }),
});
const corps = await reponse.json();
if (!reponse.ok) {
  console.error(`Erreur ${reponse.status} :`, corps.error?.message ?? corps);
  process.exit(1);
}
const lieux = corps.places ?? [];
if (!lieux.length) {
  console.log(`Aucun lieu trouvé pour « ${recherche} ».`);
  process.exit(0);
}
console.log(`Résultats pour « ${recherche} » :\n`);
for (const lieu of lieux) {
  console.log(`${lieu.displayName?.text ?? '?'} — ${lieu.formattedAddress ?? ''}`);
  if (lieu.rating) console.log(`  ${lieu.rating} / 5 · ${lieu.userRatingCount ?? 0} avis`);
  console.log(`  GOOGLE_PLACE_ID=${lieu.id}\n`);
}
