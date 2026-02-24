"use client";

// ============================================================
// ShellWrapper.tsx
// Componente client que decide qué chrome mostrar según ruta.
//
// RUTAS DE ATRACCIÓN — sin Navbar, sin Footer, sin Breadcrumbs,
// sin BackButton global (tienen el propio dentro del template):
//   /disney/[park]/[slug]     → 3 segmentos bajo disney
//   /universal/[park]/[slug]  → 3 segmentos bajo universal
//
// TODAS LAS DEMÁS RUTAS → shell completo normal
// ============================================================

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBreadcrumbs from "@/components/GlobalBreadcrumbs";
import BackButton from "@/components/BackButton";
import SmoothScroll from "@/components/SmoothScroll";

function isAttractionRoute(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  // Exactamente 3 segmentos: [disney|universal] / [park] / [slug]
  return (
    segments.length === 3 &&
    (segments[0] === "disney" || segments[0] === "universal")
  );
}

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAttraction = isAttractionRoute(pathname);

  if (isAttraction) {
    // Página de atracción: sin chrome global, solo children
    return <>{children}</>;
  }

  // Resto del sitio: shell completo
  return (
    <>
      <BackButton />
      <Navbar />
      <SmoothScroll>
        <GlobalBreadcrumbs />
        {children}
      </SmoothScroll>
      <Footer />
    </>
  );
}