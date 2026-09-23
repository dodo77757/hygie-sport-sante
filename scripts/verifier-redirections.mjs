/* Vérifie, sur le site en ligne, que chaque ancienne adresse Wix (content/redirections.ts) redirige bien vers la nouvelle page.
   Usage : npm run redirections -- https://www.hygiesportsante.fr
   Les motifs avec :path* sont testés avec un segment d'exemple. Code de sortie 1 s'il y a des écarts. */
import { readFileSync } from 'node:fs';

const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const source = readFileSync(new URL('../content/redirections.ts', import.meta.url), 'utf8');
const paires = [...source.matchAll(/^\s*\['([^']+)',\s*'([^']+)'\]/gm)].map((m) => [m[1], m[2]]);

if (!paires.length) {
  console.error('Aucune redirection lue dans content/redirections.ts');
  process.exit(1);
}

const exemple = (chemin) => chemin.replace(/:path\*/g, 'exemple');
let ecarts = 0;

for (const [ancienne, attendue] of paires) {
  const depart = exemple(ancienne);
  const url =
    base +
    depart
      .split('/')
      .map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)))
      .join('/');
  let verdict;
  try {
    const reponse = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'hygie-verif-redirections' } });
    const location = reponse.headers.get('location') ?? '';
    const cible = location.startsWith('http') ? new URL(location).pathname + new URL(location).search : location;
    const ok = (reponse.status === 308 || reponse.status === 301) && decodeURIComponent(cible) === attendue;
    verdict = ok ? `ok   ${reponse.status}` : `ÉCART ${reponse.status} → ${cible || '(pas de Location)'} attendu ${attendue}`;
    if (!ok) ecarts++;
  } catch (erreur) {
    verdict = `ERREUR ${erreur.message}`;
    ecarts++;
  }
  console.log(`${verdict.padEnd(60)} ${depart}`);
}

console.log(`\n${paires.length} adresses testées, ${ecarts} écart(s).`);
process.exit(ecarts ? 1 : 0);
