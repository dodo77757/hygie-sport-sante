/* Typographie française sur les textes du site : espaces insécables avant « : ; ? ! » et dans « », apostrophes ’,
   espaces insécables dans les montants, les heures, les milliers et les numéros de téléphone.
   Ne touche que les textes JSX et les chaînes de caractères (analyse syntaxique TypeScript) : le code reste intact.
   Usage : npm run typo (idempotent). */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOSSIERS = ['app', 'components', 'content', 'lib'];
const EXCLUS = [path.join('app', 'api'), path.join('components', 'RevealObserver.tsx')];
const NBSP = '\u00A0';
const NNBSP = '\u202F';

export function fr(texte) {
  let t = texte;
  t = t.replace(/(\p{L})&apos;(\p{L})/gu, '$1’$2');
  t = t.replace(/(\p{L})'(\p{L})/gu, '$1’$2');
  t = t.replace(/«[ \u00A0\u202F]?/g, `«${NBSP}`);
  t = t.replace(/[ \u00A0\u202F]?»/g, `${NBSP}»`);
  t = t.replace(/(\S) ([;?!])/g, `$1${NNBSP}$2`);
  t = t.replace(/(\S) :/g, `$1${NBSP}:`);
  t = t.replace(/(\d) (€|%)/g, `$1${NBSP}$2`);
  t = t.replace(/(\d) (h|min)(?![\p{L}\d])/gu, `$1${NBSP}$2`);
  t = t.replace(/(\d\u00A0h) (\d\d)/g, `$1${NBSP}$2`);
  t = t.replace(/(\d) (\d{3})(?!\d)/g, `$1${NNBSP}$2`);
  t = t.replace(/\b0\d(?: \d\d){4}\b/g, (m) => m.replace(/ /g, NBSP));
  t = t.replace(/ – /g, `${NBSP}– `);
  return t;
}

function fichiers(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    const rel = path.relative(RACINE, p);
    if (EXCLUS.some((x) => rel === x || rel.startsWith(`${x}${path.sep}`))) continue;
    if (e.isDirectory()) out.push(...fichiers(p));
    else if (/\.(tsx|ts)$/.test(e.name) && !e.name.endsWith('.d.ts')) out.push(p);
  }
  return out;
}

function litteral(valeur, guillemet) {
  const echappe = valeur
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .split(guillemet)
    .join(`\\${guillemet}`);
  return `${guillemet}${echappe}${guillemet}`;
}

function traiter(fichier) {
  const source = fs.readFileSync(fichier, 'utf8');
  const kind = fichier.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(fichier, source, ts.ScriptTarget.Latest, true, kind);
  const edits = [];

  function visite(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isJsxText(node)) {
      const debut = node.getStart(sf, false);
      const brut = source.slice(node.pos, node.end);
      // Texte JSX qui suit une expression : « {a} : {b} » → espace insécable en tête.
      const nouveau = fr(brut).replace(/^ :/, `${NBSP}:`).replace(/^ ([;?!])/, `${NNBSP}$1`);
      if (nouveau !== brut) edits.push([node.pos, node.end, nouveau]);
      void debut;
    } else if (ts.isStringLiteral(node)) {
      const debut = node.getStart(sf);
      const brut = source.slice(debut, node.end);
      if (node.parent && ts.isJsxAttribute(node.parent)) {
        const nouveau = fr(brut);
        if (nouveau !== brut) edits.push([debut, node.end, nouveau]);
      } else if (!(node.parent && (ts.isPropertyAssignment(node.parent) && node.parent.name === node))) {
        const nouveau = fr(node.text);
        if (nouveau !== node.text) edits.push([debut, node.end, litteral(nouveau, brut[0])]);
      }
    } else if (ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const debut = node.getStart(sf);
      const brut = source.slice(debut, node.end);
      const nouveau = fr(brut);
      if (nouveau !== brut) edits.push([debut, node.end, nouveau]);
    }
    ts.forEachChild(node, visite);
  }
  visite(sf);

  if (!edits.length) return 0;
  edits.sort((a, b) => b[0] - a[0]);
  let out = source;
  for (const [a, b, texte] of edits) out = out.slice(0, a) + texte + out.slice(b);
  fs.writeFileSync(fichier, out);
  return edits.length;
}

let total = 0;
for (const d of DOSSIERS) {
  const dir = path.join(RACINE, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fichiers(dir)) {
    const n = traiter(f);
    if (n) console.log(`${path.relative(RACINE, f)} : ${n}`);
    total += n;
  }
}
console.log(`Textes corrigés : ${total}`);
