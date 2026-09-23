import type { NextConfig } from 'next';
import { anciennes } from './content/redirections';

/* Échappe les caractères spéciaux de path-to-regexp dans une adresse littérale (hors paramètres :path*). */
function echapper(source: string) {
  return source.replace(/[()[\]{}?+!]/g, '\\$&');
}

function variantes(source: string) {
  const encodee = source
    .split('/')
    .map((seg) => (seg.startsWith(':') ? seg : encodeURIComponent(seg)))
    .join('/');
  return encodee === source ? [source] : [source, encodee];
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    // Les photos Unsplash ne passent pas par cet optimiseur : le CDN d'Unsplash les redimensionne (voir components/Photo.tsx).
  },
  async redirects() {
    return anciennes.flatMap(([source, destination]) => variantes(source).map((s) => ({ source: echapper(s), destination, permanent: true })));
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
