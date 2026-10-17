'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { centres, type CentreId, type CentreInfo } from '@/content/site';
import { RIDEAU_LEVE } from '@/components/Entree';

type CentreContextType = {
  centre: CentreId;
  infoCentre: CentreInfo;
  estSelecteurOuvert: boolean;
  choisirCentre: (id: CentreId) => void;
  ouvrirSelecteur: () => void;
  fermerSelecteur: () => void;
};

const CentreContext = createContext<CentreContextType | null>(null);

const STORAGE_KEY = 'hygie_centre_selection';
const SESSION_SHOWN_KEY = 'hygie_centre_prompt_shown';

export function CentreProvider({ children }: { children: ReactNode }) {
  const [centre, setCentreState] = useState<CentreId>('avon');
  const [estSelecteurOuvert, setEstSelecteurOuvert] = useState(false);
  const [pret, setPret] = useState(false);

  // Initialisation côté client : lecture du stockage ou des paramètres d'URL
  useEffect(() => {
    try {
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
    } catch {
      // Ignorer si localStorage non disponible
    }
    setPret(true);
  }, []);

  // Déclenchement automatique dès la fin du rideau d'entrée
  useEffect(() => {
    if (!pret) return;

    const ouvrirApresRideau = () => {
      // On vérifie si la modale a déjà été montrée durant cette session
      const dejaMontre = sessionStorage.getItem(SESSION_SHOWN_KEY);
      if (!dejaMontre) {
        // Petit délai pour laisser le rideau se lever complètement
        window.setTimeout(() => {
          setEstSelecteurOuvert(true);
        }, 350);
      }
    };

    // Si le rideau est déjà levé (ex: rechargement rapide ou navigation directe)
    if (document.documentElement.dataset.rideau === 'leve') {
      ouvrirApresRideau();
    } else {
      window.addEventListener(RIDEAU_LEVE, ouvrirApresRideau, { once: true });
      return () => window.removeEventListener(RIDEAU_LEVE, ouvrirApresRideau);
    }
  }, [pret]);

  const choisirCentre = (id: CentreId) => {
    setCentreState(id);
    setEstSelecteurOuvert(false);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
    } catch {
      // Ignorer
    }
  };

  const ouvrirSelecteur = () => setEstSelecteurOuvert(true);
  const fermerSelecteur = () => {
    setEstSelecteurOuvert(false);
    try {
      sessionStorage.setItem(SESSION_SHOWN_KEY, 'true');
    } catch {
      // Ignorer
    }
  };

  const infoCentre = centres[centre];

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
  if (!ctx) {
    throw new Error('useCentre doit être utilisé à l’intérieur d’un CentreProvider');
  }
  return ctx;
}
