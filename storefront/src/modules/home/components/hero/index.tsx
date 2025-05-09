"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const gloves = [
  { name: "SKY",       gradient: "from-blue-400 via-blue-500 to-blue-600" },
  { name: "GLACIER",   gradient: "from-purple-400 via-purple-500 to-purple-600" },
  { name: "INFIERNO",  gradient: "from-yellow-300 via-yellow-400 to-yellow-500" },
  { name: "THUNDER",   gradient: "from-pink-300 via-pink-400 to-pink-500" },
  { name: "PHANTOM",   gradient: "from-red-400 via-red-500 to-red-600" },
  { name: "CYBER",     gradient: "from-teal-200 via-teal-300 to-teal-400" },
];

// Animaciones de entrada únicas
const entryAnims = [
  { from: { x: -100, opacity: 0 },       to: { x: 0, opacity: 1, ease: "power3.out", duration: 1 } },
  { from: { scale: 0 },                  to: { scale: 1, ease: "elastic.out(1,0.5)", duration: 1.2 } },
  { from: { y: 100, opacity: 0 },        to: { y: 0, opacity: 1, ease: "bounce.out", duration: 0.9 } },
  { from: { rotation: -45, opacity: 0 }, to: { rotation: 0, opacity: 1, ease: "back.out(1.7)", duration: 0.8 } },
  { from: { skewX: 60, opacity: 0 },     to: { skewX: 0, opacity: 1, ease: "power4.out", duration: 1 } },
  { from: { x: 100, y: -100, opacity: 0 }, to:{ x: 0, y: 0, opacity:1, ease:"circ.out", duration: 0.8 } },
];

export default function Hero() {
  const heroRef  = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero  = heroRef.current!;
    const img   = imageRef.current!;
    const list  = listRef.current!;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".glove-item"));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    // 1) Zoom + fade imagen
    tl.to(img, { scale: 2.5, opacity: 0, ease: "power1.in" }, 0)
      // 2) Mostrar la lista
      .to(list, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.7);

    // 3) Animar cada guante + subrayado accesible
    items.forEach((el, i) => {
      const anim = entryAnims[i % entryAnims.length];
      const start = 0.7 + i * 0.5;

      // a) Entrada principal
      tl.fromTo(el, anim.from, anim.to, start)

        // b) Subrayado y fondo tras aparecer
        .to(el, {
          borderBottom: "4px solid white",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          paddingBottom: "0.2em",
          borderRadius: "0.25em",
          duration: 0.4,
          ease: "power1.out",
        }, `>+=0.2`);
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
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
        alt="Imagen principal del hero"
        className="absolute inset-0 m-auto max-w-[90vw] max-h-[90vh] object-contain"
      />

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
            role="heading" aria-level={1}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}