"use client";

import React, { createContext, useContext, useState } from "react";
import SignUpModal from "@/components/SignUpModal"; // Lo crearemos en el siguiente paso

type ModalContextType = {
  openSignUp: () => void;
  closeSignUp: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  return (
    <ModalContext.Provider value={{ openSignUp, closeSignUp }}>
      {children}
      {/* El Modal vive aquí, disponible para toda la app */}
      <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUp} />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal debe usarse dentro de un ModalProvider");
  return context;
};