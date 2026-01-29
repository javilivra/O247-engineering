import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Asegúrate de que estas variables coincidan con las de tu layout.tsx
        display: ["var(--font-google-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        // 🌑 GUNMETAL (Para secciones oscuras y texto principal)
        gunmetal: {
          DEFAULT: "#25343F",
          light: "#334552", // Útil para hovers en fondos oscuros
        },
        // 🦴 BONE (Tu base clara color hueso/arena)
        bone: {
          DEFAULT: "#f7f7f5", // Volvemos al original neutro
          // Si tenías una variante 'dark', dejala o ajustala si querés, 
          // pero lo importante es el DEFAULT,
          dark: "#E6D0C0", // Para bordes sutiles sobre el fondo hueso
        },
        // ☀️ SUNSET (Naranja intenso para acción)
        sunset: {
          DEFAULT: "#FF7043",
          glow: "#FFAB91",
        },
        // 💧 CELESTE (Azul profundo tipo piscina)
        celeste: {
          DEFAULT: "#00B4D8",
          soft: "#E0F7FA",
        },
      },
    },
  },
  plugins: [],
};
export default config;