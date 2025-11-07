"use client";

import { useGlove } from "../../../../contexts/GloveContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavWrapperProps {
  children: React.ReactNode;
}

export default function NavWrapper({ children }: NavWrapperProps) {
  const { currentGlove } = useGlove();
  const [isHomePage, setIsHomePage] = useState(true); // Default a true para evitar flash
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = mounted ? usePathname() : '/';
  
  useEffect(() => {
    if (mounted) {
      // Detectar si estamos en la página home
      const isHome = pathname === '/' || pathname.match(/^\/[a-z]{2}$/); // Para rutas como /es, /en, etc.
      setIsHomePage(isHome);
    }
  }, [pathname, mounted]);
  
  // Si no estamos en home, usar fondo negro
  const headerBg = isHomePage ? 'bg-transparent' : 'bg-black';

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className={`relative h-16 mx-auto transition-colors duration-300 ${headerBg}`}>
        {children}
      </header>
    </div>
  );
}
