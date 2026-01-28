import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a7e26e",
        "brand-blue": "#3498DB",
        "background-light": "#f7f7f5",
        "background-dark": "#192012",
        charcoal: "#222f30",
      },
      fontFamily: {
        // CORRECCIÓN CLAVE:
        // Asignamos la variable a 'sans' para que sea la fuente DEFAULT de todo el sitio.
        sans: ["var(--font-google-sans)", "sans-serif"],
        
        // Asignamos la técnica a 'mono' (para el Ticker y datos)
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;