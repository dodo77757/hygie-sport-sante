'use client';

import { useEffect } from 'react';
import { RIDEAU_LEVE } from '../Entree';

const borne = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Plages de défilement pendant lesquelles la bande de soins de chaque pôle traverse l'écran */
const PLAGES: Array<[number, number]> = [
  [0, 0.3],
  [0.2, 0.8],
  [0.7, 1],
];

/* Palier : la pile de cartes reste posée sur un pôle, puis passe franchement au suivant */
const palier = (x: number) => {
  const k = Math.min(1, Math.floor(x));
  const f = borne((x - k - 0.22) / 0.56);
  return k + f * f * (3 - 2 * f);
};

function compter(el: HTMLElement) {
  const fin = Number(el.dataset.compte);
  const depart = Number(el.dataset.depart ?? 0);
  const t0 = performance.now();
  const pas = (t: number) => {
    const p = borne((t - t0) / 1600);
    const e = 1 - Math.pow(1 - p, 4);
    el.textContent = String(Math.round(depart + (fin - depart) * e));
    if (p < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

/* Mouvements de l'accueil : arrivée du haut de page, apparitions au défilement, compteurs,
   et les deux scènes fixes (pôles, bilans) pilotées par le défilement. Tout part du balisage rendu côté serveur :
   sans script, ou si le visiteur réduit les animations, la page reste lisible (voir refonte.css). */
export function Mouvement() {
  useEffect(() => {
    const racine = document.getElementById('accueil');
    if (!racine) return;
    const anime = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const large = window.matchMedia('(min-width: 1024px)');
    const $ = <T extends HTMLElement>(s: string) => racine.querySelector<T>(s);
    const $$ = <T extends HTMLElement>(s: string) => Array.from(racine.querySelectorAll<T>(s));
    const fins: Array<() => void> = [];
    const delais: number[] = [];

    /* 1. Haut de page : après le rideau d'entrée s'il est là */
    const hero = $('.a-hero');
    const lancer = () => {
      if (!hero) return;
      hero.classList.add('pret');
      const n = hero.querySelector<HTMLElement>('[data-compte]');
      if (n && anime) delais.push(window.setTimeout(() => compter(n), 900));
      delais.push(window.setTimeout(() => hero.classList.add('libre'), 2600));
    };
    if (document.getElementById('entree') && document.documentElement.dataset.rideau !== 'leve') {
      window.addEventListener(RIDEAU_LEVE, lancer, { once: true });
      delais.push(window.setTimeout(lancer, 4400));
      fins.push(() => window.removeEventListener(RIDEAU_LEVE, lancer));
    } else {
      delais.push(window.setTimeout(lancer, 120));
    }

    /* 2. Apparitions */
    const io = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting || e.target.classList.contains('vu')) continue;
          e.target.classList.add('vu');
          if (anime) e.target.querySelectorAll<HTMLElement>('[data-compte]').forEach(compter);
          io.unobserve(e.target);
        }
      },
      { threshold: 0.25 },
    );
    $$('.obs').forEach((el) => io.observe(el));
    fins.push(() => io.disconnect());

    /* 3. Souris : léger relief */
    const souris = (e: MouseEvent) => {
      racine.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
      racine.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
    };
    if (anime) {
      window.addEventListener('mousemove', souris, { passive: true });
      fins.push(() => window.removeEventListener('mousemove', souris));
    }

    /* 4. Scènes */
    const polesEl = $('.a-poles');
    const noms = $$<HTMLButtonElement>('.a-noms button');
    const bandes = $$('.a-soins > div');
    const cartes = $$('.a-pile > .a-carte');
    const bilansEl = $('.a-bilans');
    const rail = $('.a-rail');
    const piste = $('.a-rail__piste');
    const bilans = $$('.a-bilan');
    const avance = $('.a-avance');
    const numero = $('.a-avance__n');
    const johan = $('.a-johan');
    let pole = -1;
    let cc = 0;
    let yPrec = window.scrollY;
    let inc = 0;
    let image = 0;

    const allerPole = (i: number) => {
      if (i === pole) return;
      pole = i;
      noms.forEach((b, n) => {
        b.classList.toggle('actif', n === pole);
        b.setAttribute('aria-current', n === pole ? 'true' : 'false');
      });
      bandes.forEach((b, n) => b.classList.toggle('la', n === pole));
    };
    allerPole(0);

    noms.forEach((b, i) => {
      const clic = () => {
        if (!polesEl || !large.matches) return;
        const r = polesEl.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + r.top + [0.04, 0.5, 0.97][i] * (r.height - window.innerHeight), behavior: anime ? 'smooth' : 'auto' });
      };
      b.addEventListener('click', clic);
      fins.push(() => b.removeEventListener('click', clic));
    });

    const scene = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return borne(-r.top / (r.height - window.innerHeight));
    };

    const boucle = () => {
      image = requestAnimationFrame(boucle);
      const h = window.innerHeight;
      const v = window.innerWidth / 1440;
      if (hero) hero.style.setProperty('--s', String(borne(window.scrollY / h)));
      if (!large.matches) return;
      const dy = window.scrollY - yPrec;
      yPrec = window.scrollY;
      inc += (borne(dy * 0.12, -4, 4) - inc) * 0.12;

      if (polesEl) {
        const r = polesEl.getBoundingClientRect();
        if (r.bottom > 0 && r.top < h) {
          const brut = scene(polesEl);
          cc += (palier(brut * 2) - cc) * (anime ? 0.14 : 1);
          allerPole(Math.round(cc));
          bandes.forEach((d, i) => {
            const [a, b] = PLAGES[i];
            const l = borne((brut - a) / (b - a));
            const max = Math.max(0, d.scrollWidth - window.innerWidth + 150 * v);
            d.style.setProperty('--x', (70 * v - l * max).toFixed(1));
            d.style.setProperty('--o', borne(1 - Math.abs(i - cc) * 2.4).toFixed(3));
          });
          cartes.forEach((c, i) => {
            const d = i - cc;
            const st = c.style;
            if (d >= 0) {
              st.setProperty('--ty', (d * 124).toFixed(2));
              st.setProperty('--rot', (8 + d * 16).toFixed(2));
              st.setProperty('--sc', '1');
              st.setProperty('--op', '1');
            } else {
              st.setProperty('--ty', (d * 12).toFixed(2));
              st.setProperty('--rot', (8 + d * 11).toFixed(2));
              st.setProperty('--sc', (1 + d * 0.1).toFixed(3));
              st.setProperty('--op', borne(1 + d * 1.3).toFixed(3));
            }
            st.setProperty('--par', (d * -5).toFixed(2));
            c.style.pointerEvents = Math.abs(d) < 0.5 ? 'auto' : 'none';
          });
        }
      }

      if (bilansEl && rail && piste) {
        const r = bilansEl.getBoundingClientRect();
        if (r.bottom > 0 && r.top < h) {
          const p = scene(bilansEl);
          const max = Math.max(0, piste.scrollWidth - rail.clientWidth);
          piste.style.setProperty('--x', (-p * max).toFixed(1));
          avance?.style.setProperty('--p', p.toFixed(4));
          if (numero) numero.textContent = String(Math.min(bilans.length, 1 + Math.floor(p * bilans.length)));
          if (anime) bilans.forEach((b, n) => b.style.setProperty('--inc', (inc * (n % 2 ? -1 : 1)).toFixed(2)));
        }
      }

      if (johan) {
        const r = johan.getBoundingClientRect();
        if (r.bottom > 0 && r.top < h) johan.style.setProperty('--p', borne((h - r.top) / h).toFixed(3));
      }
    };
    image = requestAnimationFrame(boucle);

    /* 5. Journal : le fond suit la ligne survolée */
    const liste = $('.a-liste');
    $$('.a-article').forEach((a, i) => {
      const dessus = () => liste?.style.setProperty('--i', String(i));
      a.addEventListener('mouseenter', dessus);
      a.addEventListener('focus', dessus);
      fins.push(() => {
        a.removeEventListener('mouseenter', dessus);
        a.removeEventListener('focus', dessus);
      });
    });

    return () => {
      cancelAnimationFrame(image);
      delais.forEach((d) => window.clearTimeout(d));
      fins.forEach((f) => f());
    };
  }, []);

  return null;
}
