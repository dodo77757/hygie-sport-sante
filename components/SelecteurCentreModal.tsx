'use client';

import { useEffect, useRef } from 'react';
import { useCentre } from '@/context/CentreContext';

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
      onClick={(e) => {
        if (e.target === e.currentTarget) fermerSelecteur();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'grid',
        placeItems: 'center',
        padding: '24px 16px',
        background: 'rgba(17, 18, 16, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'hk-apparait 0.25s ease forwards',
        overflowY: 'auto',
      }}
    >
      <div
        ref={modalRef}
        className="hk-modal-cadre"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          background: 'var(--surface)',
          borderRadius: '20px',
          border: '1px solid var(--filet-doux)',
          boxShadow: '0 28px 72px rgba(0, 0, 0, 0.25)',
          padding: 'clamp(28px, 4vw, 44px)',
          color: 'var(--encre)',
          margin: 'auto',
        }}
      >
        {/* Bouton de fermeture élégant */}
        <button
          type="button"
          onClick={fermerSelecteur}
          aria-label="Fermer la sélection"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--brume)',
            border: '1px solid var(--filet-doux)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--encre)',
            fontSize: '18px',
            lineHeight: 1,
            transition: 'background 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--filet-doux)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--brume)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          ✕
        </button>

        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--jaune)',
              }}
            />
            <span className="etiquette" style={{ color: 'var(--bleu-fonce)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Hygie Sport Santé &amp; Performance
            </span>
          </div>
          <h2
            id="titre-selecteur-centre"
            className="titre-section"
            style={{
              fontSize: 'clamp(28px, 4vw, 38px)',
              margin: '0 0 10px',
              letterSpacing: '-0.02em',
            }}
          >
            Choisissez votre centre
          </h2>
          <p className="courant" style={{ maxWidth: '52ch', margin: '0 auto', opacity: 0.82, fontSize: '15px' }}>
            Sélectionnez votre centre pour accéder aux praticiens, consultations et créneaux adaptés à votre lieu.
          </p>
        </div>

        {/* Grille des 2 centres */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '20px',
          }}
        >
          {/* Carte 1 : Fontainebleau - Avon */}
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
              borderRadius: '16px',
              background: centre === 'avon' ? 'var(--fond)' : '#ffffff',
              border: centre === 'avon' ? '2px solid var(--bleu-fonce)' : '1px solid var(--filet-doux)',
              boxShadow: centre === 'avon' ? '0 10px 30px rgba(44, 91, 143, 0.14)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 14px 34px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = centre === 'avon' ? '0 10px 30px rgba(44, 91, 143, 0.14)' : '0 4px 16px rgba(0, 0, 0, 0.04)';
            }}
          >
            {/* Tag et statut */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="hk-tag hk-tag--bleu">Centre ouvert · 77</span>
              {centre === 'avon' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--bleu-fonce)',
                  }}
                >
                  ✓ Actif
                </span>
              )}
            </div>

            {/* Titre */}
            <h3 className="titre-bloc" style={{ fontSize: '22px', margin: '0 0 4px' }}>
              Fontainebleau - Avon
            </h3>

            {/* Adresse */}
            <p className="prose-note" style={{ margin: '0 0 16px', color: 'var(--bleu-fonce)', fontWeight: 500, fontSize: '13px' }}>
              📍 9, rue de la Petite Vitesse, Avon
            </p>

            {/* Séparateur */}
            <div style={{ height: '1px', background: 'var(--filet-doux)', margin: '0 0 16px' }} />

            {/* Liste des points forts */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--encre)',
                flex: 1,
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--bleu-fonce)', fontWeight: 'bold' }}>✓</span>
                <span>15 praticiens de santé &amp; du sport</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--bleu-fonce)', fontWeight: 'bold' }}>✓</span>
                <span>Kinésithérapie, étiopathie &amp; orthoptie</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--bleu-fonce)', fontWeight: 'bold' }}>✓</span>
                <span>Bilans de force, coaching &amp; récupération</span>
              </li>
            </ul>

            {/* Bouton d'action dans la carte */}
            <div
              className={centre === 'avon' ? 'hk-btn hk-btn--jaune' : 'hk-btn'}
              style={{ width: '100%', justifyContent: 'center', pointerEvents: 'none' }}
            >
              <span className="hk-btn__label">
                {centre === 'avon' ? 'Centre actif · Continuer' : 'Sélectionner ce centre'}
              </span>
            </div>
          </div>

          {/* Carte 2 : Bondoufle */}
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
              borderRadius: '16px',
              background: centre === 'bondoufle' ? 'var(--fond)' : '#ffffff',
              border: centre === 'bondoufle' ? '2px solid var(--jaune)' : '1px solid var(--filet-doux)',
              boxShadow: centre === 'bondoufle' ? '0 10px 30px rgba(220, 185, 40, 0.18)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 14px 34px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = centre === 'bondoufle' ? '0 10px 30px rgba(220, 185, 40, 0.18)' : '0 4px 16px rgba(0, 0, 0, 0.04)';
            }}
          >
            {/* Tag et statut */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="hk-tag hk-tag--jaune">En construction · 91</span>
              {centre === 'bondoufle' && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--encre)',
                  }}
                >
                  ✓ Actif
                </span>
              )}
            </div>

            {/* Titre */}
            <h3 className="titre-bloc" style={{ fontSize: '22px', margin: '0 0 4px' }}>
              Bondoufle
            </h3>

            {/* Adresse */}
            <p className="prose-note" style={{ margin: '0 0 16px', color: 'var(--encre)', opacity: 0.7, fontWeight: 500, fontSize: '13px' }}>
              📍 Bondoufle (91) · Grand Paris Sud
            </p>

            {/* Séparateur */}
            <div style={{ height: '1px', background: 'var(--filet-doux)', margin: '0 0 16px' }} />

            {/* Liste des points forts */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--encre)',
                flex: 1,
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--jaune)', fontWeight: 'bold' }}>🏗️</span>
                <span>Nouveau centre en cours d’aménagement</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--jaune)', fontWeight: 'bold' }}>⚡</span>
                <span>Espaces sport, santé &amp; bilans de pointe</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--jaune)', fontWeight: 'bold' }}>👥</span>
                <span>Équipe de praticiens bientôt annoncée</span>
              </li>
            </ul>

            {/* Bouton d'action dans la carte */}
            <div
              className={centre === 'bondoufle' ? 'hk-btn hk-btn--jaune' : 'hk-btn'}
              style={{ width: '100%', justifyContent: 'center', pointerEvents: 'none' }}
            >
              <span className="hk-btn__label">
                {centre === 'bondoufle' ? 'Centre actif · Continuer' : 'Choisir Bondoufle'}
              </span>
            </div>
          </div>
        </div>

        {/* Note de réassurance sous la grille */}
        <p
          className="prose-note"
          style={{
            textAlign: 'center',
            marginTop: '28px',
            marginBottom: 0,
            opacity: 0.65,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span>💡</span>
          <span>Vous pourrez basculer entre les deux centres à tout moment depuis la barre de navigation.</span>
        </p>
      </div>
    </div>
  );
}
