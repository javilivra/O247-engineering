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
        // CORRECCIÓN CRÍTICA:
        // Ahora apuntan a las variables reales definidas en globals.css (--font-primary)
        // Esto forzará Google Sans Flex en todo el sitio.
        display: ["var(--font-primary)", "sans-serif"],
        sans: ["var(--font-primary)", "sans-serif"],
        mono: ["var(--font-tech)", "monospace"], // JetBrains Mono para datos técnicos
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
        // 🌿 VANGUARD GREEN
        "vanguard-green": "#a7e26e",
      },
      // Sistema de Sombras Custom
      boxShadow: {
        'averi': '0 4px 20px -2px rgba(37, 52, 63, 0.12)',
        'averi-reverse': '-10px -10px 30px rgba(37, 52, 63, 0.03)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
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