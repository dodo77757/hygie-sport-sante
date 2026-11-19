'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { centres, type CentreId, type CentreInfo } from '@/content/site';

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
  }, []);

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
