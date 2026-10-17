'use client';

import { useEffect, useRef } from 'react';
import { useCentre } from '@/context/CentreContext';
import { LogoTrace } from './LogoTrace';

/* Icônes vectorielles fines monochromes */
function IconePin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconeOutil() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconeEclair() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconeEquipe() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconeInfo() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function SelecteurCentreModal() {
  const { centre, estSelecteurOuvert, choisirCentre, fermerSelecteur, aChoisi } = useCentre();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!estSelecteurOuvert) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Échap ne peut fermer la modale que si l'utilisateur a déjà fait un choix
      if (e.key === 'Escape' && aChoisi) {
        fermerSelecteur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [estSelecteurOuvert, fermerSelecteur, aChoisi]);

  if (!estSelecteurOuvert) return null;

  return (
    <div
      className="hk-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titre-selecteur-centre"
      onClick={(e) => {
        // Le clic sur l'arrière-plan ne ferme que si un choix a déjà été validé
        if (e.target === e.currentTarget && aChoisi) fermerSelecteur();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'grid',
        placeItems: 'center',
        padding: '24px 16px',
        background: 'rgba(19, 19, 19, 0.78)',
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
          maxWidth: '840px',
          background: '#131313', /* Couleur --encre officielle du design system Hygie */
          borderRadius: '24px',
          border: '1px solid rgba(238, 239, 233, 0.12)',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.75)',
          padding: 'clamp(28px, 4vw, 44px)',
          color: '#EEEFE9',
          margin: 'auto',
        }}
      >
        {/* Bouton de fermeture : affiché uniquement si l'utilisateur a déjà choisi son centre (ex: réouverture depuis le header) */}
        {aChoisi && (
          <button
            type="button"
            onClick={fermerSelecteur}
            aria-label="Fermer la sélection"
            style={{
              position: 'absolute',
              top: '22px',
              right: '22px',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(238, 239, 233, 0.08)',
              border: '1px solid rgba(238, 239, 233, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#EEEFE9',
              fontSize: '15px',
              lineHeight: 1,
              transition: 'background 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(238, 239, 233, 0.18)';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(238, 239, 233, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            ✕
          </button>
        )}

        {/* En-tête centré à fort contraste */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Logo Hygie officiel en haut */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#FFFFFF',
            }}
            aria-label="Hygie"
          >
            <LogoTrace
              style={{
                width: 'clamp(95px, 11vw, 120px)',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          <h2
            id="titre-selecteur-centre"
            style={{
              margin: '0 0 10px',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: '#EEEFE9',
              textTransform: 'uppercase',
            }}
          >
            CHOISISSEZ VOTRE CENTRE
          </h2>

          <p
            style={{
              margin: '0 auto',
              maxWidth: '54ch',
              fontFamily: 'var(--font-texte)',
              fontSize: '14.5px',
              lineHeight: 1.5,
              color: '#BAB9BA',
            }}
          >
            Sélectionnez votre centre pour accéder aux praticiens, consultations et créneaux adaptés à votre lieu.
          </p>
        </div>

        {/* Grille des 2 cartes blanches / off-white côte à côte */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
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
              borderRadius: '18px',
              background: '#F8FAFC',
              border: centre === 'avon' ? '2px solid #F5C43C' : '1px solid #E2E8F0',
              boxShadow: centre === 'avon' ? '0 12px 32px rgba(245, 196, 60, 0.22)' : '0 6px 20px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              color: '#131313',
              textAlign: 'left',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = centre === 'avon' ? '0 12px 32px rgba(245, 196, 60, 0.22)' : '0 6px 20px rgba(0, 0, 0, 0.15)';
            }}
          >
            {/* Ligne badge + état */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#E2E8F0',
                  color: '#131313',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                CENTRE OUVERT • 77
              </span>
              {centre === 'avon' && (
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#131313',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  ✓ Actif
                </span>
              )}
            </div>

            {/* Titre */}
            <h3
              style={{
                margin: '0 0 6px',
                fontFamily: 'var(--font-texte)',
                fontSize: '22px',
                fontWeight: 700,
                color: '#131313',
              }}
            >
              Fontainebleau - Avon
            </h3>

            {/* Adresse avec micro-icône vectorielle */}
            <p
              style={{
                margin: '0 0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#64748B',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#131313', display: 'flex', alignItems: 'center' }}>
                <IconePin />
              </span>
              <span>9, rue de la Petite Vitesse, Avon</span>
            </p>

            {/* Fine ligne de séparation */}
            <div style={{ height: '1px', background: '#E2E8F0', margin: '0 0 16px' }} />

            {/* Liste à puces avec coches vectorielles */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '13.5px',
                color: '#334155',
                flex: 1,
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IconeCheck />
                </span>
                <span>15 praticiens de santé &amp; du sport</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IconeCheck />
                </span>
                <span>Kinésithérapie, étiopathie &amp; orthoptie</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IconeCheck />
                </span>
                <span>Bilans de force, coaching &amp; récupération</span>
              </li>
            </ul>

            {/* Bouton principal jaune athlétique */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 20px',
                borderRadius: '9999px',
                background: '#F5C43C',
                color: '#131313',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(245, 196, 60, 0.3)',
                pointerEvents: 'none',
              }}
            >
              CONTINUER VERS CE CENTRE
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
              borderRadius: '18px',
              background: '#F8FAFC',
              border: centre === 'bondoufle' ? '2px solid #F5C43C' : '1px solid #E2E8F0',
              boxShadow: centre === 'bondoufle' ? '0 12px 32px rgba(245, 196, 60, 0.22)' : '0 6px 20px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              color: '#131313',
              textAlign: 'left',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = centre === 'bondoufle' ? '0 12px 32px rgba(245, 196, 60, 0.22)' : '0 6px 20px rgba(0, 0, 0, 0.15)';
            }}
          >
            {/* Ligne badge + état */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                EN CONSTRUCTION • 91
              </span>
              {centre === 'bondoufle' && (
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#131313',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  ✓ Actif
                </span>
              )}
            </div>

            {/* Titre */}
            <h3
              style={{
                margin: '0 0 6px',
                fontFamily: 'var(--font-texte)',
                fontSize: '22px',
                fontWeight: 700,
                color: '#131313',
              }}
            >
              Bondoufle
            </h3>

            {/* Localisation avec micro-icône vectorielle */}
            <p
              style={{
                margin: '0 0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#64748B',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              <span style={{ color: '#131313', display: 'flex', alignItems: 'center' }}>
                <IconePin />
              </span>
              <span>Bondoufle (91) • Grand Paris Sud</span>
            </p>

            {/* Fine ligne de séparation */}
            <div style={{ height: '1px', background: '#E2E8F0', margin: '0 0 16px' }} />

            {/* Liste avec micro-icônes vectorielles monochromes */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '13.5px',
                color: '#334155',
                flex: 1,
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IconeOutil />
                </span>
                <span>Nouveau centre en cours d’aménagement</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IconeEclair />
                </span>
                <span>Espaces sport, santé &amp; bilans de pointe</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <IconeEquipe />
                </span>
                <span>Équipe de praticiens bientôt annoncée</span>
              </li>
            </ul>

            {/* Bouton secondaire outline */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                borderRadius: '9999px',
                background: '#FFFFFF',
                border: '1.5px solid #131313',
                color: '#131313',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
              }}
            >
              CHOISIR BONDOUFLE
            </div>
          </div>
        </div>

        {/* Note d'information monochrome avec icône ⓘ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '28px',
            color: '#BAB9BA',
            fontSize: '13px',
            fontFamily: 'var(--font-texte)',
            textAlign: 'center',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', opacity: 0.85 }}>
            <IconeInfo />
          </span>
          <span>Vous pourrez basculer entre les deux centres à tout moment depuis la barre de navigation.</span>
        </div>
      </div>
    </div>
  );
}
