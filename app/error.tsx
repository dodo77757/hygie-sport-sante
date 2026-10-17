'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur pour le débogage
    console.error('Erreur capturée par ErrorBoundary:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px 20px',
        color: 'var(--encre)',
      }}
    >
      <span className="hk-tag hk-tag--jaune" style={{ marginBottom: '16px' }}>
        Mise à jour du site
      </span>
      <h1 className="titre-section" style={{ fontSize: 'clamp(28px, 4vw, 42px)', margin: '0 0 16px' }}>
        Une nouvelle version est disponible
      </h1>
      <p className="courant" style={{ maxWidth: '52ch', margin: '0 0 28px', opacity: 0.85 }}>
        Le site a été mis à jour. Veuillez recharger la page pour afficher la dernière version avec l’ensemble des fonctionnalités.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="hk-btn hk-btn--jaune"
        >
          <span className="hk-btn__label">Recharger la page</span>
        </button>
        <Button href="/" variant="contour">
          Retour à l’accueil
        </Button>
      </div>
    </div>
  );
}
