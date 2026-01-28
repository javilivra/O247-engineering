import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";

// Mantenemos JetBrains Mono para los datos técnicos
const techMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

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
    <html lang="en" className={`${techMono.variable}`}>
      <head>
        {/* --- CÓDIGO OFICIAL DE GOOGLE FONTS (Inyección Directa) --- */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body 
        className="antialiased min-h-screen bg-[#f7f7f5] text-[#1a1a1a]"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}