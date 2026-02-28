"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBreadcrumbs from "@/components/GlobalBreadcrumbs";
import BackButton from "@/components/BackButton";
import SmoothScroll from "@/components/SmoothScroll";

function isAttractionRoute(pathname: string): boolean {
  if (!pathname) return false;
  const segments = pathname.split("/").filter(Boolean);
  // Matches /disney/[park]/[slug] or /universal/[park]/[slug]
  return (
    segments.length === 3 &&
    (segments[0] === "disney" || segments[0] === "universal")
  );
}

function FullShell({ children }: { children: React.ReactNode }) {
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

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // On the server and initial client render, we don't render the conditional UI.
  // We only render the children to prevent a hydration mismatch.
  if (!isMounted) {
    // Important: We still need to pass children to avoid breaking the React tree.
    return <>{children}</>;
  }

  const isAttraction = isAttractionRoute(pathname);

  // After mounting on the client, we check the path.
  // If it's an attraction page, we continue to render only the children.
  if (isAttraction) {
    return <>{children}</>;
  }

  // If it's any other page, we render the full UI shell.
  // This will cause the UI to "pop in", which is the desired effect
  // to solve the hydration issue without using route groups.
  return <FullShell>{children}</FullShell>;
}
