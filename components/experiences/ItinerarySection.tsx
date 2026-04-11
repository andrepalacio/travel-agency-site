"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { DetailedExperience } from "@/types/experience";

export function ItinerarySection({ data }: Readonly<{ data: DetailedExperience["itinerary"] }>) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, amount: 0.2 });

  return (
    <section className="bg-slate-50 py-20 px-6 md:px-20">
      <div className="section-container-narrow text-center">
        <p className="text-classic-gold uppercase tracking-[0.3em] font-bold mb-8">
          {data.goldMessage}
        </p>

        <div className="relative h-125 w-full rounded overflow-hidden mb-12">
          <Image src={data.mainImage} alt="Travel" fill className="object-cover" />
        </div>

        {/* Ruta: salida → llegada */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 border-y border-slate-200 py-10">
          <div className="text-center">
            <p className="text-xs uppercase text-slate-400 mb-1">Salida</p>
            <p className="font-bold text-lg">{data.departure}</p>
          </div>
          <div className="h-px w-20 bg-classic-gold hidden md:block" />
          <div className="text-center">
            <p className="text-xs uppercase text-slate-400 mb-1">Llegada</p>
            <p className="font-bold text-lg">{data.arrival}</p>
          </div>
        </div>

        {/*
          Mapa de ruta — escala de grises → color completo al entrar en el viewport.
          Reemplaza el efecto CSS hover:grayscale-0 que no funciona en dispositivos táctiles.
          useInView con once:true garantiza que el color se activa al hacer scroll y se mantiene.
        */}
        <motion.div
          ref={mapRef}
          animate={{ filter: mapInView ? "grayscale(0%)" : "grayscale(100%)" }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="w-full h-112 relative rounded overflow-hidden"
        >
          <Image src={data.mapImage} alt="Mapa de ruta" fill className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
