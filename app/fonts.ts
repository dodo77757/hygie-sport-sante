import localFont from 'next/font/local';

/* Anton est déclarée en « normal » seulement : l'italique des H1 est l'oblique du navigateur, comme dans le template. */
export const anton = localFont({
  src: './fonts/anton-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-anton',
  display: 'swap',
  fallback: ['Impact', 'Arial Narrow', 'sans-serif'],
});

/* Remplaçant libre d'Alliance No.2 (licence web à acheter pour l'original) */
export const hanken = localFont({
  src: './fonts/hanken-grotesk-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-hanken',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const jetbrains = localFont({
  src: './fonts/jetbrains-mono-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-jetbrains',
  display: 'swap',
  fallback: ['ui-monospace', 'Menlo', 'monospace'],
});
