'use client';

import { useCentre } from '@/context/CentreContext';

export function BandeauCentre() {
  const { centre, ouvrirSelecteur, choisirCentre } = useCentre();

  if (centre !== 'bondoufle') return null;

  return (
    <aside
      aria-label="Information centre Bondoufle"
      style={{
        background: 'var(--jaune)',
        color: 'var(--encre)',
        padding: '10px 16px',
        fontSize: '13px',
        fontFamily: 'var(--font-texte)',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        textAlign: 'center',
        zIndex: 40,
        position: 'relative',
        borderBottom: '1px solid rgba(17, 18, 16, 0.1)',
      }}
    >
      <span>
        🏗️ <strong>Centre de Bondoufle (91)</strong> — En construction. Les espaces sport &amp; santé ouvrent prochainement.
      </span>
      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => choisirCentre('avon')}
          style={{
            background: 'var(--encre)',
            color: 'var(--fond)',
            border: 'none',
            borderRadius: 'var(--rayon-pilule)',
            padding: '4px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Basculer sur Fontainebleau-Avon (Ouvert)
        </button>
        <button
          type="button"
          onClick={ouvrirSelecteur}
          style={{
            background: 'transparent',
            color: 'var(--encre)',
            border: '1px solid var(--encre)',
            borderRadius: 'var(--rayon-pilule)',
            padding: '3px 10px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Changer de centre
        </button>
      </div>
    </aside>
  );
}
