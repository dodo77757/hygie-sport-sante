import Script from 'next/script';

/* Mesure d'audience sans cookies ni bandeau : Umami ou Plausible, au choix, réglés par variables d'environnement.
   Sans variable, rien n'est chargé. Les deux outils n'utilisent aucun cookie et ne suivent pas les visiteurs d'un site à l'autre ;
   ils sont exemptés de consentement par la CNIL sous réserve de leur configuration (voir README). */
export function Audience() {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;
  if (umamiSrc && umamiId) return <Script src={umamiSrc} data-website-id={umamiId} strategy="afterInteractive" />;

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (plausibleDomain) {
    return (
      <Script src={process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js'} data-domain={plausibleDomain} strategy="afterInteractive" />
    );
  }
  return null;
}

/* Nom de l'outil configuré, ou null : la page Confidentialité adapte son paragraphe. */
export function nomOutilAudience() {
  if (process.env.NEXT_PUBLIC_UMAMI_SRC && process.env.NEXT_PUBLIC_UMAMI_ID) return 'Umami';
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) return 'Plausible';
  return null;
}
