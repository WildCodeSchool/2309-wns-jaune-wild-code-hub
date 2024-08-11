/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Appliquer les en-têtes à toutes les pages
        source: '/(.*)', // Applique les en-têtes à toutes les routes
        headers: [
          {
            key: 'X-FRAME-OPTIONS',
            value: 'DENY', // ou 'SAMEORIGIN'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';", // Politique de sécurité du contenu pour éviter le chargement dans les iframes
          },
        ],
      },
    ];
  },
};

export default nextConfig;