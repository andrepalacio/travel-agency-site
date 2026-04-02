'use client';

import { useEffect, useRef, useState } from "react";
import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HomeData } from "@/types/home";

export function HomePreview(
  { data, brochures }: Readonly<{ data: HomeData; brochures: readonly { id: number; name: string }[] }>
) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    // Obtener altura del viewport
    setViewportHeight(window.innerHeight);
    
    // Buscar el contenedor de scroll más cercano (el <main> con overflow-y-auto)
    const findScrollContainer = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null;
      
      let parent = element.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          return parent;
        }
        parent = parent.parentElement;
      }
      return document.documentElement; // fallback al window
    };

    if (previewRef.current) {
      const container = findScrollContainer(previewRef.current);
      setScrollContainer(container);
    }
  }, []);

  return (
    <div ref={previewRef} className="relative bg-white">
      <NavBar 
        scrollContainer={scrollContainer} 
        isHomePage={true} 
        absolute={true} 
        scrollOffset={viewportHeight} 
      />
      <main>
        <HeroSection data={data.hero} brochures={brochures}/>
        <ServicesSection data={data.services} />
        <ContactSection data={data.contact} />
      </main>
      <Footer />
    </div>
  );
}