'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { centres, type CentreId, type CentreInfo } from '@/content/site';

const RIDEAU_LEVE = 'hygie:rideau-leve';
const STORAGE_KEY = 'hygie_centre_selection';
const SESSION_CHOICE_KEY = 'hygie_centre_choisi';

type CentreContextType = {
  centre: CentreId;
  infoCentre: CentreInfo;
  estSelecteurOuvert: boolean;
  aChoisi: boolean;
  choisirCentre: (id: CentreId) => void;
  ouvrirSelecteur: () => void;
  fermerSelecteur: () => void;
};

const defaultContextValue: CentreContextType = {
  centre: 'avon',
  infoCentre: centres.avon,
  estSelecteurOuvert: false,
  aChoisi: false,
  choisirCentre: () => {},
  ouvrirSelecteur: () => {},
  fermerSelecteur: () => {},
};

const CentreContext = createContext<CentreContextType>(defaultContextValue);

export function CentreProvider({ children }: { children: ReactNode }) {
  const [centre, setCentreState] = useState<CentreId>('avon');
  const [estSelecteurOuvert, setEstSelecteurOuvert] = useState(false);
  const [aChoisi, setAChoisi] = useState(false);
  const [pret, setPret] = useState(false);

  // Initialisation côté client : lecture sécurisée du stockage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const centreUrl = urlParams.get('centre');
        if (centreUrl === 'bondoufle' || centreUrl === 'avon') {
          setCentreState(centreUrl);
          localStorage.setItem(STORAGE_KEY, centreUrl);
          sessionStorage.setItem(SESSION_CHOICE_KEY, 'true');
          setAChoisi(true);
        } else {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored === 'bondoufle' || stored === 'avon') {
            setCentreState(stored);
          }
          const dejaChoisiSession = sessionStorage.getItem(SESSION_CHOICE_KEY) === 'true';
          setAChoisi(dejaChoisiSession);
        }
      }
    } catch {
      // Ignorer si localStorage restreint
    }
    setPret(true);
  }, []);

  // Ouverture juste après l'animation du haut de page, tant qu'aucun centre n'a été choisi pendant la visite :
  // levée du rideau d'entrée, puis fin des entrées du premier écran (titre mot par mot, sous-titre et boutons de l'accueil,
  // ou titre de la page d'arrivée). Jamais en passant d'une page à l'autre.
  useEffect(() => {
    if (!pret || typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(SESSION_CHOICE_KEY) === 'true') return;
    } catch {
      // Stockage indisponible : on demande le centre
    }

    let annule = false;
    const attendre = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
    const rideauLeve = () =>
      new Promise<void>((resolve) => {
        if (!document.getElementById('entree') || document.documentElement.dataset.rideau === 'leve') return resolve();
        window.addEventListener(RIDEAU_LEVE, () => resolve(), { once: true });
        window.setTimeout(resolve, 6000); // secours
      });

    (async () => {
      await rideauLeve();
      const premierEcran = document.querySelectorAll('.hk-hero__haut, .hk-hero__bas, .une__anime, .une__lettre > span, main h1 .w, main .titre-point');
      const animations = Array.from(premierEcran).flatMap((el) => el.getAnimations());
      await Promise.race([Promise.allSettled(animations.map((a) => a.finished)), attendre(4000)]);
      await attendre(200);
      if (!annule) setEstSelecteurOuvert(true);
    })();

    return () => {
      annule = true;
    };
  }, [pret]);

  const choisirCentre = useCallback((id: CentreId) => {
    setCentreState(id);
    setAChoisi(true);
    setEstSelecteurOuvert(false);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      sessionStorage.setItem(SESSION_CHOICE_KEY, 'true');
    } catch {
      // Ignorer
    }
  }, []);

  const ouvrirSelecteur = useCallback(() => setEstSelecteurOuvert(true), []);

  const fermerSelecteur = useCallback(() => {
    // Si l'utilisateur a déjà choisi, il peut fermer le sélecteur (ex: ouvert depuis le header)
    setEstSelecteurOuvert(false);
  }, []);

  const infoCentre = centres[centre] ?? centres.avon;

  return (
    <CentreContext.Provider
      value={{
        centre,
        infoCentre,
        estSelecteurOuvert,
        aChoisi,
        choisirCentre,
        ouvrirSelecteur,
        fermerSelecteur,
      }}
    >
      {children}
    </CentreContext.Provider>
  );
}

export function useCentre() {
  const ctx = useContext(CentreContext);
  return ctx ?? defaultContextValue;
}
