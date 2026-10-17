'use client';

import { useEffect, useRef } from 'react';
import { useCentre } from '@/context/CentreContext';
import { centres } from '@/content/site';

export function SelecteurCentreModal() {
  const { centre, estSelecteurOuvert, choisirCentre, fermerSelecteur } = useCentre();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!estSelecteurOuvert) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fermerSelecteur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [estSelecteurOuvert, fermerSelecteur]);

  if (!estSelecteurOuvert) return null;

  return (
    <div
      className="hk-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titre-selecteur-centre"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
        background: 'rgba(17, 18, 16, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'hk-apparait 0.3s ease forwards',
      }}
    >
      <div
        ref={modalRef}
        className="hk-modal-cadre"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '780px',
          background: 'var(--fond)',
          borderRadius: 'var(--rayon)',
          border: '1px solid var(--filet-doux)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.28)',
          padding: 'clamp(24px, 4vw, 44px)',
          color: 'var(--encre)',
        }}
      >
        {/* Bouton de fermeture discret */}
        <button
          type="button"
          onClick={fermerSelecteur}
          aria-label="Fermer la sélection de centre"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            lineHeight: 1,
            cursor: 'pointer',
            color: 'var(--encre)',
            opacity: 0.6,
            padding: '8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
        >
          ✕
        </button>

        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="etiquette" style={{ color: 'var(--bleu-fonce)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Hygie Sport Santé &amp; Performance
          </span>
          <h2 id="titre-selecteur-centre" className="titre-section" style={{ fontSize: 'clamp(28px, 4vw, 38px)', margin: '10px 0 8px' }}>
            Choisissez votre centre
          </h2>
          <p className="courant" style={{ maxWidth: '50ch', margin: '0 auto', opacity: 0.85 }}>
            Sélectionnez votre centre pour adapter l’accès aux praticiens et aux créneaux de consultation.
          </p>
        </div>

        {/* Grille des 2 centres */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          {/* Option 1 : Fontainebleau - Avon */}
          <div
            onClick={() => choisirCentre('avon')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                choisirCentre('avon');
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 24px',
              borderRadius: 'var(--rayon)',
              background: centre === 'avon' ? 'var(--surface)' : 'var(--fond)',
              border: centre === 'avon' ? '2px solid var(--bleu-fonce)' : '1px solid var(--filet-doux)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
              boxShadow: centre === 'avon' ? '0 8px 24px rgba(44, 91, 143, 0.12)' : 'none',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'var(--bleu-fonce)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = centre === 'avon' ? 'var(--bleu-fonce)' : 'var(--filet-doux)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="hk-tag hk-tag--bleu">{centres.avon.badge}</span>
              {centre === 'avon' && (
                <span className="prose-note" style={{ color: 'var(--bleu-fonce)', fontWeight: 600 }}>
                  ✓ Actif
                </span>
              )}
            </div>

            <h3 className="titre-bloc" style={{ fontSize: '22px', margin: '0 0 6px' }}>
              {centres.avon.nom}
            </h3>

            <p className="prose-note" style={{ margin: '0 0 12px', color: 'var(--bleu-fonce)', fontWeight: 500 }}>
              {centres.avon.adresse}
            </p>

            <p className="courant" style={{ fontSize: '14px', flex: 1, margin: '0 0 20px', opacity: 0.9 }}>
              {centres.avon.description}
            </p>

            <button
              type="button"
              className={centre === 'avon' ? 'hk-btn hk-btn--jaune' : 'hk-btn'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span className="hk-btn__label">Choisir Fontainebleau-Avon</span>
            </button>
          </div>

          {/* Option 2 : Bondoufle */}
          <div
            onClick={() => choisirCentre('bondoufle')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                choisirCentre('bondoufle');
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 24px',
              borderRadius: 'var(--rayon)',
              background: centre === 'bondoufle' ? 'var(--surface)' : 'var(--fond)',
              border: centre === 'bondoufle' ? '2px solid var(--jaune)' : '1px solid var(--filet-doux)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
              boxShadow: centre === 'bondoufle' ? '0 8px 24px rgba(220, 185, 40, 0.16)' : 'none',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'var(--jaune)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = centre === 'bondoufle' ? 'var(--jaune)' : 'var(--filet-doux)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="hk-tag hk-tag--jaune">{centres.bondoufle.badge}</span>
              {centre === 'bondoufle' && (
                <span className="prose-note" style={{ color: 'var(--encre)', fontWeight: 600 }}>
                  ✓ Actif
                </span>
              )}
            </div>

            <h3 className="titre-bloc" style={{ fontSize: '22px', margin: '0 0 6px' }}>
              {centres.bondoufle.nom}
            </h3>

            <p className="prose-note" style={{ margin: '0 0 12px', color: 'var(--encre)', opacity: 0.7, fontWeight: 500 }}>
              {centres.bondoufle.adresse} · Grand Paris Sud
            </p>

            <p className="courant" style={{ fontSize: '14px', flex: 1, margin: '0 0 20px', opacity: 0.9 }}>
              {centres.bondoufle.description}
            </p>

            <button
              type="button"
              className={centre === 'bondoufle' ? 'hk-btn hk-btn--jaune' : 'hk-btn'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span className="hk-btn__label">Choisir Bondoufle (En construction)</span>
            </button>
          </div>
        </div>

        {/* Note sous le choix */}
        <p className="prose-note" style={{ textAlign: 'center', marginTop: '24px', marginBottom: 0, opacity: 0.65 }}>
          Vous pourrez changer de centre à tout moment depuis la barre de navigation.
        </p>
      </div>
    </div>
  );
}
