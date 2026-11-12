'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { RIDEAU_LEVE } from './Entree';

const borne = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Palier : la pile de cartes reste posée sur un élément, puis passe franchement au suivant */
const palier = (x: number, dernier: number) => {
  const k = Math.min(dernier - 1, Math.max(0, Math.floor(x)));
  const f = borne((x - k - 0.22) / 0.56);
  return dernier <= 0 ? 0 : k + f * f * (3 - 2 * f);
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

type Pile = { el: HTMLElement; noms: HTMLElement[]; bandes: HTMLElement[]; cartes: HTMLElement[]; fiches: HTMLElement[]; actif: number; cc: number };
type Rail = { el: HTMLElement; rail: HTMLElement; piste: HTMLElement; cartes: HTMLElement[]; avance: HTMLElement | null; numero: HTMLElement | null };

/* Mouvements du site, sur toutes les pages : arrivée du haut de page, apparitions au défilement (.obs → .vu), compteurs,
   scènes fixes pilotées par le défilement (pile de cartes : .a-poles ; piste horizontale : .a-bilans), parallaxes ([data-p]),
   fond qui suit la ligne survolée (.a-liste). Tout part du balisage rendu côté serveur :
   sans script, ou si le visiteur réduit les animations, les pages restent lisibles (voir refonte.css). */
export function Mouvement() {
  const pathname = usePathname();

  useEffect(() => {
    const racine = document.querySelector<HTMLElement>('main');
    if (!racine) return;
    const anime = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const large = window.matchMedia('(min-width: 1024px)');
    const $$ = <T extends HTMLElement>(s: string, dans: ParentNode = document) => Array.from(dans.querySelectorAll<T>(s));
    const fins: Array<() => void> = [];
    const delais: number[] = [];

    /* 1. Haut de page : après le rideau d'entrée s'il est là */
    const hero = racine.querySelector<HTMLElement>('.a-hero, .e-hero, .e-contact, .rdv2__tete');
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
          if (anime) e.target.querySelectorAll<HTMLElement>('[data-compte]').forEach((c) => !c.closest('.a-hero, .e-hero') && compter(c));
          io.unobserve(e.target);
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -12% 0px' },
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
    const piles: Pile[] = $$('.a-poles', racine).map((el) => ({
      el,
      noms: $$('.a-noms > *', el),
      bandes: $$('.a-soins > div', el),
      cartes: $$('.a-pile > .a-carte', el),
      fiches: $$('.a-fiche > *', el),
      actif: -1,
      cc: 0,
    }));
    const rails: Rail[] = $$('.a-bilans', racine).flatMap((el) => {
      const rail = el.querySelector<HTMLElement>('.a-rail');
      const piste = el.querySelector<HTMLElement>('.a-rail__piste');
      return rail && piste
        ? [
            {
              el,
              rail,
              piste,
              cartes: $$('.a-bilan', el),
              avance: el.querySelector<HTMLElement>('.a-avance'),
              numero: el.querySelector<HTMLElement>('.a-avance__n'),
            },
          ]
        : [];
    });
    const paralls = $$('[data-p]', racine);
    let yPrec = window.scrollY;
    let inc = 0;
    let image = 0;

    const activer = (p: Pile, i: number) => {
      if (i === p.actif) return;
      p.actif = i;
      p.noms.forEach((b, n) => {
        b.classList.toggle('actif', n === i);
        if (b.tagName === 'BUTTON') b.setAttribute('aria-current', n === i ? 'true' : 'false');
      });
      p.bandes.forEach((b, n) => b.classList.toggle('la', n === i));
      p.fiches.forEach((b, n) => b.classList.toggle('la', n === i));
    };

    piles.forEach((p) => {
      activer(p, 0);
      const dernier = p.cartes.length - 1;
      p.noms.forEach((b, i) => {
        const aller = () => {
          if (!large.matches) return;
          const r = p.el.getBoundingClientRect();
          const f = dernier <= 0 ? 0 : borne(i / dernier, 0.03, 0.97);
          window.scrollTo({ top: window.scrollY + r.top + f * (r.height - window.innerHeight), behavior: anime ? 'smooth' : 'auto' });
        };
        if (b.tagName === 'BUTTON') {
          b.addEventListener('click', aller);
          fins.push(() => b.removeEventListener('click', aller));
        }
      });
    });

    const scene = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return borne(-r.top / Math.max(1, r.height - window.innerHeight));
    };

    const boucle = () => {
      image = requestAnimationFrame(boucle);
      const h = window.innerHeight;
      const v = window.innerWidth / 1440;
      if (hero) hero.style.setProperty('--s', String(borne(window.scrollY / h)));
      for (const el of paralls) {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < h) el.style.setProperty('--p', borne((h - r.top) / (h + r.height)).toFixed(3));
      }
      if (!large.matches) return;
      const dy = window.scrollY - yPrec;
      yPrec = window.scrollY;
      inc += (borne(dy * 0.12, -4, 4) - inc) * 0.12;

      for (const p of piles) {
        const r = p.el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= h) continue;
        const dernier = p.cartes.length - 1;
        const brut = scene(p.el);
        p.cc += (palier(brut * dernier, dernier) - p.cc) * (anime ? 0.14 : 1);
        activer(p, Math.round(p.cc));
        const demi = dernier > 0 ? 0.6 / dernier : 1;
        p.bandes.forEach((d, i) => {
          const centre = dernier > 0 ? i / dernier : 0;
          const a = Math.max(0, centre - demi);
          const b = Math.min(1, centre + demi);
          const l = borne((brut - a) / (b - a));
          const max = Math.max(0, d.scrollWidth - window.innerWidth + 150 * v);
          d.style.setProperty('--x', (70 * v - l * max).toFixed(1));
          d.style.setProperty('--o', borne(1 - Math.abs(i - p.cc) * 2.4).toFixed(3));
        });
        p.cartes.forEach((c, i) => {
          const d = i - p.cc;
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
          st.pointerEvents = Math.abs(d) < 0.5 ? 'auto' : 'none';
        });
      }

      for (const s of rails) {
        const r = s.el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= h) continue;
        const p = scene(s.el);
        const max = Math.max(0, s.piste.scrollWidth - s.rail.clientWidth);
        s.piste.style.setProperty('--x', (-p * max).toFixed(1));
        s.avance?.style.setProperty('--p', p.toFixed(4));
        if (s.numero) s.numero.textContent = String(Math.min(s.cartes.length, 1 + Math.floor(p * s.cartes.length)));
        if (anime) s.cartes.forEach((b, n) => b.style.setProperty('--inc', (inc * (n % 2 ? -1 : 1)).toFixed(2)));
      }
    };
    image = requestAnimationFrame(boucle);

    /* 5. Listes : le fond suit la ligne survolée */
    $$('.a-liste', racine).forEach((liste) => {
      $$('.a-article', liste).forEach((a, i) => {
        const dessus = () => {
          liste.style.setProperty('--i', String(i));
          liste.style.setProperty('--y', `${a.offsetTop}px`);
          liste.style.setProperty('--h', `${a.offsetHeight}px`);
        };
        if (i === 0) dessus();
        a.addEventListener('mouseenter', dessus);
        a.addEventListener('focusin', dessus);
        fins.push(() => {
          a.removeEventListener('mouseenter', dessus);
          a.removeEventListener('focusin', dessus);
        });
      });
    });

    return () => {
      cancelAnimationFrame(image);
      delais.forEach((d) => window.clearTimeout(d));
      fins.forEach((f) => f());
    };
  }, [pathname]);

  return null;
}
