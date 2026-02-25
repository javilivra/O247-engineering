'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type NavbarMode = 'light' | 'dark';

interface NavbarContextType {
  mode: NavbarMode;
  setMode: (mode: NavbarMode) => void;
}

const NavbarContext = createContext<NavbarContextType>({
  mode: 'light',
  setMode: () => {},
});

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<NavbarMode>('light');
  const setMode = useCallback((m: NavbarMode) => setModeState(m), []);
  return (
    <NavbarContext.Provider value={{ mode, setMode }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}

// Hook para que cada página declare su modo — usar en layouts/pages
export function useNavbarMode(mode: NavbarMode) {
  const { setMode } = useNavbar();
  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
}
