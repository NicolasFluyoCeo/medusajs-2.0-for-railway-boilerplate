"use client";

import React, { useState } from "react";
import { useGlove, gloveDetails } from "../../../../contexts/GloveContext";
import { Orbitron, Rajdhani, Exo_2 } from "next/font/google";
import LocalizedClientLink from "../../../common/components/localized-client-link";

// Fuentes llamativas
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const exo2 = Exo_2({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function HeroDiagonalRibbon() {
  const { activeGlove, setActiveGlove } = useGlove();
  const [rotationDirection, setRotationDirection] = useState<'left' | 'right'>('right');

  const handleGloveChange = (newIndex: number, direction: 'left' | 'right') => {
    setRotationDirection(direction);
    setActiveGlove(newIndex);
  };

  const getBackgroundStyle = () => ({
    background: '#000',
    marginTop: '-64px',
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        ...getBackgroundStyle(),
        height: '100vh',
      }}
    >

      {/* —————————————————— */}
      {/* 2) CARRUSEL DE GUANTES */}
      {/* —————————————————— */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* Contenedor principal del carrusel */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Guantes del carrusel */}
          <div className="relative w-full h-full flex items-center justify-center">
            {gloveDetails.map((glove, index) => (
              <div
                key={glove.name}
                className={`
                  absolute inset-0 transition-opacity duration-700 ease-in-out
                  ${index === activeGlove
                    ? 'opacity-100 z-20'
                    : 'opacity-0 z-10 pointer-events-none'
                  }
                `}
              >
                <img
                  src={glove.image}
                  alt={glove.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Información del guante activo */}
          <div className="absolute bottom-8 md:bottom-20 left-4 md:left-8 right-4 md:right-auto z-40 max-w-full md:max-w-md">
            <div className={`
              transition-all duration-700 ease-in-out transform
              bg-black/80 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20
              ${activeGlove >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <h2 className={`text-xl md:text-3xl font-black text-white mb-2 md:mb-3 drop-shadow-lg uppercase tracking-wide ${orbitron.className}`}>
                {gloveDetails[activeGlove]?.title}
              </h2>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                {gloveDetails[activeGlove]?.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-white">
                    <span className="w-2 md:w-3 h-2 md:h-3 bg-gradient-to-r from-white to-gray-300 rounded-full mr-3 md:mr-4 flex-shrink-0 drop-shadow-sm"></span>
                    <span className={`text-xs md:text-base drop-shadow-sm font-medium ${rajdhani.className}`}>{feature}</span>
                  </div>
                ))}
              </div>
              
              <p className={`text-white/90 text-sm md:text-lg font-semibold drop-shadow-sm uppercase tracking-wider mb-4 md:mb-0 ${exo2.className}`}>
                {gloveDetails[activeGlove]?.tagline}
              </p>

              {/* Botón Shop Now - Solo visible en móvil dentro del contenedor */}
              <div className="block md:hidden mt-3">
                <LocalizedClientLink
                  href={`/products/${gloveDetails[activeGlove]?.productHandle}`}
                  className={`
                    inline-flex items-center justify-center px-4 py-2 
                    bg-gradient-to-r from-white to-gray-100 
                    text-black font-semibold text-xs
                    rounded-full shadow-md hover:shadow-lg
                    transform hover:scale-105 transition-all duration-300
                    border border-white/30 hover:border-white/50
                    uppercase tracking-wide
                    ${rajdhani.className}
                  `}
                >
                  <span className="mr-1 text-sm">🛒</span>
                  Shop Now
                  <span className="ml-1 text-sm">→</span>
                </LocalizedClientLink>
              </div>
            </div>
          </div>

          {/* Botón Shop Now - Solo visible en desktop */}
          <div className="hidden md:block absolute bottom-20 right-8 z-40">
            <div className={`
              transition-all duration-700 ease-in-out transform
              ${activeGlove >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <LocalizedClientLink
                href={`/products/${gloveDetails[activeGlove]?.productHandle}`}
                className={`
                  inline-flex items-center px-6 py-3 
                  bg-gradient-to-r from-white to-gray-100 
                  text-black font-bold text-sm md:text-base
                  rounded-full shadow-lg hover:shadow-xl
                  transform hover:scale-105 transition-all duration-300
                  border-2 border-white/30 hover:border-white/50
                  uppercase tracking-wide
                  ${rajdhani.className}
                `}
              >
                <span className="mr-2 text-lg">🛒</span>
                Shop Now
                <span className="ml-2 text-lg">→</span>
              </LocalizedClientLink>
            </div>
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={() => handleGloveChange(activeGlove === 0 ? gloveDetails.length - 1 : activeGlove - 1, 'left')}
            className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/50 bg-black/50 text-white hover:border-white hover:bg-white/20 transition-all duration-300 z-40 text-sm md:text-base"
          >
            ←
          </button>
          
          <button
            onClick={() => handleGloveChange(activeGlove === gloveDetails.length - 1 ? 0 : activeGlove + 1, 'right')}
            className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/50 bg-black/50 text-white hover:border-white hover:bg-white/20 transition-all duration-300 z-40 text-sm md:text-base"
          >
            →
          </button>
        </div>
      </div>

    </section>
  );
}
