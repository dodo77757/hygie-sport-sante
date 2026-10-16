'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SousNavEntreprises() {
  const pathname = usePathname();
  const onglets = [
    { label: 'Démarche & bilans QVCT', href: '/entreprises' },
    { label: 'Vos questions (FAQ)', href: '/entreprises/questions' },
    { label: 'Contact & devis', href: '/entreprises/contact' },
  ];

  return (
    <nav
      className="hk-filter"
      aria-label="Sous-navigation Entreprises"
      style={{
        padding: '16px 0 20px',
        borderBottom: '1px solid var(--filet-doux)',
        marginBottom: 'calc(24 * var(--u))',
        alignItems: 'center',
      }}
    >
      <span className="etiquette" style={{ marginRight: '12px', color: 'var(--bleu-fonce)' }}>
        Entreprises :
      </span>
      {onglets.map((o) => {
        const estActif = pathname === o.href;
        return (
          <Link
            key={o.href}
            href={o.href}
            aria-current={estActif ? 'page' : undefined}
            style={estActif ? { fontWeight: 600, color: 'var(--bleu-fonce)', textDecoration: 'underline', textUnderlineOffset: '6px' } : undefined}
          >
            {o.label}
          </Link>
        );
      })}
    </nav>
  );
}
