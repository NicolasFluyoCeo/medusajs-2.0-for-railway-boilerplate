"use client";

import React from "react";
import {
  Rubik_Mono_One,
  Bebas_Neue,
  Russo_One,
  Orbitron,
  Press_Start_2P,
  Audiowide,
} from "next/font/google";

// ——————————————————
// 1) FUENTES
// ——————————————————
const rubikMono    = Rubik_Mono_One({ subsets: ["latin"], weight: ["400"] });
const bebasNeue    = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const russoOne     = Russo_One({ subsets: ["latin"], weight: ["400"] });
const orbitron     = Orbitron({ subsets: ["latin"], weight: ["400"] });
const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });
const audiowide    = Audiowide({ subsets: ["latin"], weight: ["400"] });

// ——————————————————
// 2) DATOS
// ——————————————————
const gloveDetails = [
  { name: "SKY",      color: "#007FFF",   font: bebasNeue    },
  { name: "GLACIER",  color: "#8A2BE2",   font: russoOne     },
  { name: "INFIERNO", color: "#FFD700",   font: orbitron     },
  { name: "THUNDER",  color: "#FF69B4",   font: pressStart2P },
  { name: "PHANTOM",  color: "#FF0000",   font: audiowide    },
  { name: "CYBER",    color: "#00FFFF",   font: bebasNeue    },
];
const extendedGloves = [...gloveDetails, ...gloveDetails, ...gloveDetails];

export default function HeroDiagonalRibbon() {
  return (
    <section
      className={`
        relative w-full h-screen bg-black
        border-t-8 border-b-8 border-white
        flex items-center justify-center overflow-hidden
        ${rubikMono.className}
      `}
    >
      {/* Logo con glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ animation: "logo-glow 4s ease-in-out 1" }}
      >
        <img
          src="/hero-image.png"
          alt="NG Logo"
          className="max-w-[60%] max-h-[80%] object-contain"
        />
      </div>

      {/* Cinta estática: COMING SOON */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          left: "-50vw",
          top: "35%",
          width: "200vw",
          transform: "translateY(-50%) rotate(-12deg)",
          animation:
            "fade-in-slow 1.5s ease-out forwards, pulse 4s ease-in-out 2s infinite alternate",
          backdropFilter: "blur(1px)",
        }}
      >
        <div className="w-full bg-white/95 border-2 border-black py-1 md:py-2">
          <div className="flex justify-center">
            <span className="text-5xl md:text-6xl uppercase tracking-wide">
              COMING SOON
            </span>
          </div>
        </div>
      </div>

      {/* Cinta animada de nombres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div
          className="absolute left-0"
          style={{
            top: "55%",
            width: "200vw",
            transform: "translateY(-50%) rotate(-12deg)",
          }}
        >
          <div
            className="flex whitespace-nowrap bg-white/95 border-2 border-black py-1 md:py-2"
            style={{
              width: "300%",
              animation: "marquee 18s linear infinite",
            }}
          >
            {extendedGloves.map((g, i) => (
              <span
                key={i}
                className={`
                  mx-4 md:mx-8 text-4xl md:text-5xl uppercase
                  ${g.font.className}
                `}
                style={{ color: g.color }}
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: translateY(-50%) rotate(-12deg) scale(1); }
          50% { transform: translateY(-50%) rotate(-12deg) scale(1.05); }
          100% { transform: translateY(-50%) rotate(-12deg) scale(1); }
        }
        @keyframes logo-glow {
          0%   { filter: drop-shadow(0 0 0px rgba(255,255,255,0)); opacity: 0; }
          50%  { filter: drop-shadow(0 0 8px rgba(255,255,255,0.6)); opacity: 1; }
          100% { filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none !important; }
          div[style*="animation: fade-in-slow"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}