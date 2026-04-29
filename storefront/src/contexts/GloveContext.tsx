"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Datos de los guantes
export const gloveDetails = [
  {
    name: "CORAL STORM",
    color: "#FF6B7D",
    image: "/new_carrousel/coral.avif",
    gradient: "linear-gradient(135deg, #FF5E72 0%, #FF9A8A 35%, #F7E7DC 60%, #5EC4D4 100%)",
    title: "Coral Storm – Express Your Identity",
    features: [
      "4mm German Giga Grip latex",
      "Pre-wash activation grip",
      "Internal wrist strap closure",
      "All-condition responsiveness"
    ],
    tagline: "Bright. Bold. Unmistakably you.",
    productHandle: "winter"
  },
  {
    name: "BLIZZARD",
    color: "#E8EEF4",
    image: "/new_carrousel/blizzard.avif",
    gradient: "linear-gradient(135deg, #DDE6EE 0%, #F5F1E8 45%, #D9CDB1 80%, #8E7C5A 100%)",
    title: "Blizzard – Elegance in Every Save",
    features: [
      "4mm German Contact Grip latex",
      "Hybrid negative + roll finger cut",
      "Premium neoprene backhand",
      "Match-level performance build"
    ],
    tagline: "Clean. Modern. Quietly devastating.",
    productHandle: "blizzard"
  },
  {
    name: "THUNDER STRIKE",
    color: "#1B4FCE",
    image: "/new_carrousel/thunder-strike.avif",
    gradient: "linear-gradient(135deg, #0E2A8A 0%, #1B4FCE 30%, #FFD43D 70%, #E63946 100%)",
    title: "Thunder Strike – Elite Bold Identity",
    features: [
      "4mm German Giga Grip latex",
      "3D molded punching zone",
      "Reinforced ball-clearing structure",
      "Secure internal wrist closure"
    ],
    tagline: "Loud. Fearless. Built to dominate.",
    productHandle: "thunder-strike"
  },
];

interface GloveContextType {
  activeGlove: number;
  setActiveGlove: (index: number) => void;
  currentGlove: typeof gloveDetails[0];
}

const GloveContext = createContext<GloveContextType | undefined>(undefined);

export const GloveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeGlove, setActiveGlove] = useState(0);

  const currentGlove = gloveDetails[activeGlove];

  return (
    <GloveContext.Provider value={{ activeGlove, setActiveGlove, currentGlove }}>
      {children}
    </GloveContext.Provider>
  );
};

export const useGlove = () => {
  const context = useContext(GloveContext);
  if (context === undefined) {
    throw new Error('useGlove must be used within a GloveProvider');
  }
  return context;
};
