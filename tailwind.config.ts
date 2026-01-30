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
        // Ajustado al Brief Maestro: Google Sans + Geist
        display: ["var(--font-google-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        // 🌑 GUNMETAL
        gunmetal: {
          DEFAULT: "#25343F",
          light: "#334552",
        },
        // 🦴 BONE
        bone: {
          DEFAULT: "#f7f7f5",
          dark: "#E6D0C0",
        },
        // ☀️ SUNSET
        sunset: {
          DEFAULT: "#FF7043",
          glow: "#FFAB91",
        },
        // 💧 CELESTE
        celeste: {
          DEFAULT: "#00B4D8",
          soft: "#E0F7FA",
        },
        // 🌿 VANGUARD GREEN (Necesario para el status "AHORA" y alertas)
        "vanguard-green": "#a7e26e",
      },
      // Animaciones integradas correctamente dentro de 'extend'
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;