"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

const gloves = [
  { name: "SKY",       gradient: "from-blue-400 via-blue-500 to-blue-600" },
  { name: "GLACIER",   gradient: "from-purple-400 via-purple-500 to-purple-600" },
  { name: "INFIERNO",  gradient: "from-yellow-300 via-yellow-400 to-yellow-500" },
  { name: "THUNDER",   gradient: "from-pink-300 via-pink-400 to-pink-500" },
  { name: "PHANTOM",   gradient: "from-red-400 via-red-500 to-red-600" },
  { name: "CYBER",     gradient: "from-teal-200 via-teal-300 to-teal-400" },
];

// Animaciones únicas por índice
const gloveEntryAnimations = [
  { from: { x: -100, opacity: 0 }, to: { x: 0,   opacity: 1, duration: 1,   ease: "power3.out" } },
  { from: { scale: 0 },              to: { scale: 1, duration: 1.2, ease: "elastic.out(1,0.5)" } },
  { from: { y: 100, opacity: 0 },   to: { y: 0,   opacity: 1, duration: 0.9, ease: "bounce.out" } },
  { from: { rotation: -45, opacity: 0 }, to: { rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" } },
  { from: { skewX: 60, opacity: 0 }, to: { skewX: 0, opacity: 1, duration: 1,   ease: "power4.out" } },
  { from: { x: 100, y: -100, opacity: 0 }, to: { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "circ.out" } },
];

// Definición de tres curvas SVG decorativas
const shapeDefs = [
  {
    // Suave "S"
    path:  "M0,80 C30,10 70,150 100,20",
    color: "#3B82F6",
    class: "top-[10%] left-[10%] w-24 h-24 sm:w-32 sm:h-32 opacity-0",
  },
  {
    // Ola ondulada
    path:  "M0,50 C25,80 75,20 100,50",
    color: "#EC4899",
    class: "top-[30%] right-[12%] w-20 h-20 sm:w-28 sm:h-28 opacity-0",
  },
  {
    // Curva abierta
    path:  "M10,10 C40,100 60,0 90,90",
    color: "#F59E0B",
    class: "bottom-[15%] left-[25%] w-28 h-28 sm:w-36 sm:h-36 opacity-0",
  },
];

export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null);
  const imageRef  = useRef<HTMLImageElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<SVGSVGElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    const hero  = heroRef.current!;
    const img   = imageRef.current!;
    const list  = listRef.current!;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".glove-item"));
    const shapes = shapesRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    // 1) Zoom + fade de la imagen
    tl.to(img, { scale: 2.5, opacity: 0, ease: "power1.in" }, 0)
      // 2) Mostrar la lista
      .to(list, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.7);

    // 3) Animar curvas y guantes
    items.forEach((el, i) => {
      const shape = shapes[i % shapes.length];
      const anim  = gloveEntryAnimations[i % gloveEntryAnimations.length];
      const start = 0.7 + i * 0.5;

      // a) Curva: “dibujar” y fade
      tl.fromTo(
        shape.querySelector("path"),
        { drawSVG: "0%", opacity: 0 },
        {
          drawSVG: "100%",
          opacity: 1,
          stroke: shapeDefs[i % shapeDefs.length].color,
          strokeWidth: 4,
          duration: 1,
          ease: "power2.out",
        },
        start
      );

      // b) Guante: animación única
      tl.fromTo(el, anim.from, anim.to, start + 0.2);
    });

    return () => {
      ScrollTrigger.getAll().forEach(s => s.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Hero Image */}
      <img
        ref={imageRef}
        src="/hero-image.png"
        alt="Hero"
        className="absolute inset-0 m-auto max-w-[90vw] max-h-[90vh] object-contain"
      />

      {/* Curvas decorativas */}
      {shapeDefs.map((def, i) => (
        <svg
          key={i}
          ref={el => el && (shapesRef.current[i] = el)}
          viewBox="0 0 100 100"
          className={`shape absolute ${def.class}`}
          preserveAspectRatio="none"
        >
          <path d={def.path} fill="none" />
        </svg>
      ))}

      {/* Lista de guantes */}
      <div
        ref={listRef}
        className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 opacity-0"
      >
        {gloves.map(({ name, gradient }) => (
          <div
            key={name}
            className={`
              glove-item mb-6 sm:mb-10
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold
              bg-clip-text text-transparent bg-gradient-to-r ${gradient}
            `}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}