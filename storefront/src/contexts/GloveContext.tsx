"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Datos de los guantes
export const gloveDetails = [
  { 
    name: "ALPHA", 
    color: "#007FFF", 
    image: "/carrusel/alpha.png",
    background: "bg-gradient-to-br from-[#131315] via-[#603E3D] via-[#DB9E5C] via-[#CFC6B5] to-[#D4D4D2]",
    title: "Alpha 2.0 – Performance Without Limits",
    features: [
      "4mm German Contact Grip",
      "Negative cut for natural fit",
      "Removable double wrist strap",
      "Reinforced punching zone"
    ],
    tagline: "Modern. Aggressive. Built for pros.",
    productHandle: "alpha20new"
  },
  { 
    name: "SHADOW", 
    color: "#8A2BE2", 
    image: "/carrusel/shadow.png",
    background: "bg-black",
    title: "Shadow – Precision in Every Save",
    features: [
      "4mm German Contact Grip",
      "High-quality latex backhand",
      "Fixed latex wrist strap",
      "All-weather performance"
    ],
    tagline: "Silent. Strong. Let your game talk.",
    productHandle: "shadown"
  },
  { 
    name: "THUNDER", 
    color: "#FFD700", 
    image: "/carrusel/thunder.png",
    background: "bg-gradient-to-br from-[#F4533F] via-[#261B1B] via-[#E8EC1C] via-[#E5DFD1] to-[#D70918]",
    title: "Thunder Rage – Unleash the Power",
    features: [
      "4mm German Contact Grip",
      "Negative cut for pro fit",
      "Extended wrist design",
      "Dynamic punching zone"
    ],
    tagline: "Bold. Powerful. Bring the thunder.",
    productHandle: "thunderr"
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
