'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { centres, type CentreId, type CentreInfo } from '@/content/site';

const RIDEAU_LEVE = 'hygie:rideau-leve';
const STORAGE_KEY = 'hygie_centre_selection';
const SESSION_SHOWN_KEY = 'hygie_centre_prompt_shown';

type CentreContextType = {
  centre: CentreId;
  infoCentre: CentreInfo;
  estSelecteurOuvert: boolean;
  choisirCentre: (id: CentreId) => void;
  ouvrirSelecteur: () => void;
  fermerSelecteur: () => void;
};

const defaultContextValue: CentreContextType = {
  centre: 'avon',
  infoCentre: centres.avon,
  estSelecteurOuvert: false,
  choisirCentre: () => {},
  ouvrirSelecteur: () => {},
  fermerSelecteur: () => {},
};

const CentreContext = createContext<CentreContextType>(defaultContextValue);

export function CentreProvider({ children }: { children: ReactNode }) {
  const [centre, setCentreState] = useState<CentreId>('avon');
  const [estSelecteurOuvert, setEstSelecteurOuvert] = useState(false);
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
        } else {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored === 'bondoufle' || stored === 'avon') {
            setCentreState(stored);
          }
        }
      }
    } catch {
      // Ignorer si localStorage restreint
    }
    setPret(true);
  }, []);

  // Déclenchement automatique dès la fin du rideau d'entrée
  useEffect(() => {
    if (!pret || typeof window === 'undefined') return;

    const ouvrirApresRideau = () => {
      try {
        const dejaMontre = sessionStorage.getItem(SESSION_SHOWN_KEY);
        if (!dejaMontre) {
          window.setTimeout(() => {
            setEstSelecteurOuvert(true);
          }, 350);
        }
      } catch {
        // En cas de restriction de sessionStorage, ouvrir par défaut
        window.setTimeout(() => {
          setEstSelecteurOuvert(true);
        }, 350);
      }
    };

    if (document.documentElement.dataset.rideau === 'leve') {
      ouvrirApresRideau();
    } else {
      window.addEventListener(RIDEAU_LEVE, ouvrirApresRideau, { once: true });
      return () => window.removeEventListener(RIDEAU_LEVE, ouvrirApresRideau);
    }
  }, [pret]);

  const choisirCentre = useCallback((id: CentreId) => {
    setCentreState(id);
    setEstSelecteurOuvert(false);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
    } catch {
      // Ignorer
    }
  }, []);

  const ouvrirSelecteur = useCallback(() => setEstSelecteurOuvert(true), []);

  const fermerSelecteur = useCallback(() => {
    setEstSelecteurOuvert(false);
    try {
      sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
    } catch {
      // Ignorer
    }
  }, []);

  const infoCentre = centres[centre] ?? centres.avon;

  return (
    <CentreContext.Provider
      value={{
        centre,
        infoCentre,
        estSelecteurOuvert,
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
