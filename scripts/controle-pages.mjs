/* Contrôle des pages générées (.next/server/app), après `npm run build` :
   - titres de 60 caractères au plus, descriptions de 155 au plus ;
   - aucune trace de « [à compléter] » hors mentions légales, ni des notes de travail des textes du site
     (« À valider », « Proposition : », « texte actuel conservé »…), ni d'entité &nbsp; échappée ;
   - aucun lien interne vers une page absente ; les ancres des autres pages existent ;
   - chaque ?motif= mène à un onglet de /rendez-vous, chaque ?objet= à une demande connue.
   Usage : node scripts/controle-pages.mjs (code de sortie 1 en cas d'erreur). */
import fs from 'node:fs';
import path from 'node:path';

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const APP = path.join(RACINE, '.next', 'server', 'app');
const ONGLETS = ['sante', 'bilans', 'sport', 'recuperation', 'pro'];
const OBJETS = ['essai', 'coaching', 'sport-sante', 'cross-training', 'pressotherapie', 'autre'];
const AUTRES = ['/sitemap.xml', '/robots.txt', '/icon.png', '/apple-icon.png', '/favicon.ico'];
const INTERDITS = [
  ['[à compléter]', (route) => route !== '/mentions-legales'],
  ['À valider', () => true],
  ['Proposition :', () => true],
  ['Proposition :', () => true],
  ['texte actuel conservé', () => true],
  ['nouvelle page proposée', () => true],
  ['bios actuelles conservées', () => true],
  ['Adresse et téléphone à vérifier', () => true],
  ['si les demandes passent par Make', () => true],
  ['&amp;nbsp;', () => true],
];

function pages(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...pages(p));
    else if (e.name.endsWith('.html') && !e.name.startsWith('_')) out.push(p);
  }
  return out;
}

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

if (!fs.existsSync(APP)) {
  console.error('Pas de build : lancez d’abord npm run build.');
  process.exit(1);
}

const fichiers = pages(APP);
const html = new Map();
for (const f of fichiers) {
  let route =
    '/' +
    path
      .relative(APP, f)
      .replace(/\.html$/, '')
      .split(path.sep)
      .join('/');
  if (route === '/index') route = '/';
  html.set(route, fs.readFileSync(f, 'utf8'));
}

const erreurs = [];
const avertissements = [];
for (const [route, source] of [...html].sort()) {
  const sansScripts = source.replace(/<script[\s\S]*?<\/script>/g, '');
  const titre = decode((sansScripts.match(/<title>([^<]*)<\/title>/) || [, ''])[1]);
  const description = decode((sansScripts.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1]);
  if ([...titre].length > 60) erreurs.push(`${route} : titre de ${[...titre].length} caractères « ${titre} »`);
  if (!description) erreurs.push(`${route} : pas de description`);
  else if ([...description].length > 155) erreurs.push(`${route} : description de ${[...description].length} caractères`);
  if (/&nbsp;/.test(titre + description)) erreurs.push(`${route} : entité &nbsp; dans les métadonnées`);

  for (const [motif, concerne] of INTERDITS) {
    if (concerne(route) && sansScripts.includes(motif)) erreurs.push(`${route} : « ${motif} » présent`);
  }

  for (const [, href] of sansScripts.matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith('//') || href.startsWith('/_next/')) continue;
    const lien = decode(href);
    const [avantAncre, ancre] = lien.split('#');
    const [chemin, requete] = avantAncre.split('?');
    const cible = chemin.replace(/\/$/, '') || '/';
    if (!html.has(cible) && !AUTRES.includes(cible)) {
      erreurs.push(`${route} : lien vers une page absente ${lien}`);
      continue;
    }
    if (requete) {
      const params = new URLSearchParams(requete);
      const m = params.get('motif');
      const o = params.get('objet');
      if (m && (cible !== '/rendez-vous' || !ONGLETS.includes(m))) erreurs.push(`${route} : ?motif=${m} ne correspond à aucun onglet (${lien})`);
      if (o && !OBJETS.includes(o)) erreurs.push(`${route} : ?objet=${o} inconnu (${lien})`);
    }
    if (ancre && html.has(cible) && !html.get(cible).includes(`id="${ancre}"`)) avertissements.push(`${route} : ancre absente ${lien}`);
  }
}

console.log(`${html.size} pages contrôlées.`);
for (const a of [...new Set(avertissements)]) console.log(`attention · ${a}`);
for (const e of [...new Set(erreurs)]) console.log(`ERREUR · ${e}`);
if (!erreurs.length) console.log('Aucune erreur.');
process.exit(erreurs.length ? 1 : 0);
