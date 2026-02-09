import type { NextConfig } from "next";

// =============================================================================
// CONFIGURACIÓN PRINCIPAL — NEXT.JS
// =============================================================================

const nextConfig: NextConfig = {
  // Modo estricto de React
  reactStrictMode: true,

  // Oculta el header "X-Powered-By" por seguridad
  poweredByHeader: false,

  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      // Agregamos dominios de Disney por si acaso se usan en el futuro
      {
        protocol: "https",
        hostname: "cdn1.parksmedia.wdpromedia.com",
      }
    ],
    formats: ["image/avif", "image/webp"],
  },

  // HEADERS DE SEGURIDAD HTTP (CRÍTICO FASE 0)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://img.youtube.com https://cdn1.parksmedia.wdpromedia.com",
              "connect-src 'self' https://api.themeparks.wiki https://queue-times.com https://api.open-meteo.com https://api.openweathermap.org",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/disney",
        destination: "/disney/mk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;