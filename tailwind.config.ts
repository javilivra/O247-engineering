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
        display: ["var(--font-primary)", "sans-serif"],
        sans: ["var(--font-primary)", "sans-serif"],
        mono: ["var(--font-tech)", "monospace"],
      },
      colors: {
        gunmetal: {
          DEFAULT: "#25343F",
          light: "#334552",
        },
        bone: {
          DEFAULT: "#f7f7f5",
          dark: "#E6D0C0",
        },
        sunset: {
          DEFAULT: "#FF7043",
          glow: "#FFAB91",
        },
        celeste: {
          DEFAULT: "#00B4D8",
          soft: "#E0F7FA",
        },
        "vanguard-green": "#a7e26e",
      },
      boxShadow: {
        'averi': '0 4px 20px -2px rgba(37, 52, 63, 0.12)',
        'averi-reverse': '-10px -10px 30px rgba(37, 52, 63, 0.03)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'glow': 'glow 1.5s ease-in-out infinite',
        'zoom-fade': 'zoomFade 0.4s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
            '0%, 100%': { boxShadow: '0 0 5px #a7e26e' },
            '50%': { boxShadow: '0 0 20px #a7e26e' },
        },
        zoomFade: {
            '0%': { opacity: '0', transform: 'scale(1)' },
            '100%': { opacity: '1', transform: 'scale(1.02)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;