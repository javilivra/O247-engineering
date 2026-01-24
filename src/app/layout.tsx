import type { Metadata } from "next";
import "./globals.css";
// Salimos de app para buscar components
import Navbar from "../components/Navbar"; 

export const metadata: Metadata = {
  title: "O247 Engineering",
  description: "Advanced Travel Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* AQUÍ ESTÁ LA CLAVE DE INGENIERÍA:
         Aplicamos 'bg-background-light' y 'text-charcoal' a nivel raíz.
         Esto conecta el config de Tailwind con el DOM real.
      */}
      <body className="bg-background-light text-charcoal antialiased min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}