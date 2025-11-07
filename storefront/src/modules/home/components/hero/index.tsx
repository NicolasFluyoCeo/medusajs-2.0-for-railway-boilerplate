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
  
  // Debug temporal
  console.log('Active glove:', activeGlove, 'Background:', gloveDetails[activeGlove].background);

  const handleGloveChange = (newIndex: number, direction: 'left' | 'right') => {
    setRotationDirection(direction);
    setActiveGlove(newIndex);
  };

  const getBackgroundStyle = () => {
    const currentGlove = gloveDetails[activeGlove];
    if (currentGlove.name === 'ALPHA') {
      return {
        background: 'linear-gradient(to bottom right, #131315, #603E3D, #DB9E5C, #CFC6B5, #D4D4D2)',
        marginTop: '-64px', 
        paddingTop: '64px',
        paddingBottom: '2rem' // Espacio extra en la parte inferior
      };
    } else if (currentGlove.name === 'THUNDER') {
      return {
        background: 'linear-gradient(135deg, #F2503E, #E9E4D8, #EBF13C)',
        marginTop: '-64px', 
        paddingTop: '64px',
        paddingBottom: '2rem'
      };
    } else {
      return {
        background: 'black',
        marginTop: '-64px', 
        paddingTop: '64px',
        paddingBottom: '2rem'
      };
    }
  };

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden transition-all duration-700"
      style={{
        ...getBackgroundStyle(),
        minHeight: '100vh' // Usar minHeight en lugar de height fija
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
                  absolute transition-all duration-700 ease-in-out
                  ${index === activeGlove 
                    ? 'opacity-100 z-30' 
                    : 'opacity-0 z-10 pointer-events-none'
                  }
                `}
                style={{
                  transform: index === activeGlove 
                    ? 'scale(1) translateX(0) rotate(0deg)' 
                    : rotationDirection === 'right'
                      ? (index < activeGlove 
                          ? 'scale(0.2) translateX(-300px) rotate(-20deg)' // Guantes que ya pasaron van a la izquierda
                          : 'scale(0.2) translateX(300px) rotate(20deg)')   // Guantes que vienen van a la derecha
                      : (index < activeGlove 
                          ? 'scale(0.2) translateX(-300px) rotate(-20deg)' // Rotación izquierda: anteriores a la izquierda
                          : 'scale(0.2) translateX(300px) rotate(20deg)'),  // siguientes a la derecha
                  filter: index === activeGlove 
                    ? 'drop-shadow(0 0 30px rgba(255,255,255,0.3))' 
                    : 'none',
                  zIndex: index === activeGlove ? 30 : 10
                }}
              >
                <img
                  src={glove.image}
                  alt={glove.name}
                  className="w-full h-screen object-contain max-w-none"
                  style={{ height: '100vh' }}
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
