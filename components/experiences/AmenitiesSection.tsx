"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DetailedExperience } from "@/types/experience";

export function AmenitiesSection({
  data,
  onOpenContact,
}: {
  readonly data: DetailedExperience["amenities"];
  readonly onOpenContact: () => void;
}) {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto space-y-32">
      {/* PARTE 1: Habitación */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold uppercase mb-8 tracking-tighter italic border-l-4 border-[#D4AF37] pl-4">
            {data.roomTitle}
          </h2>
          <ul className="grid grid-cols-1 gap-4">
            {data.roomList.map((item: string, i: number) => (
              <li
                key={i}
                className="flex items-center gap-4 text-slate-600 border-b border-slate-100 pb-2"
              >
                <span className="text-[#D4AF37] text-xs">◆</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2 relative h-112.5 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={data.roomImage}
            alt="Habitación"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* PARTE 2: Incluye + Grilla 6 Fotos */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold uppercase mb-4 italic">
            {data.includesTitle}
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12" />
        </div>

        <div className="relative h-150 rounded-[2rem] overflow-hidden group">
          <Image
            src={data.includesImage}
            alt="Inclusiones"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-sm font-medium">
              {data.includesList.map((li: string, i: number) => (
                <li
                  key={i}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20"
                >
                  ✓ {li}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grilla Opcional de 6 imágenes */}
        {data.optionalGrid && data.optionalGrid.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.optionalGrid.map((img: string, i: number) => (
              <div
                key={i}
                className="aspect-square relative rounded-xl overflow-hidden hover:opacity-80 transition-opacity cursor-zoom-in"
              >
                <Image
                  src={img}
                  alt={`Detalle ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PARTE 3: No Incluye, Requisitos y CTA FINAL */}
      <div className="bg-expery-iron rounded-[2.5rem] p-8 md:p-20 text-white relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h4 className="uppercase text-xs font-bold mb-6 tracking-[0.2em]">
              Aquello que NO incluye
            </h4>
            <ul className="space-y-3 opacity-85 text-smc">
              {data.notIncludedList.map((li: string, i: number) => (
                <li key={i}>— {li}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-xs font-bold mb-6 tracking-[0.2em]">
              Requisitos para el viaje
            </h4>
            <ul className="space-y-3 opacity-85 text-sm">
              {data.requirementsList.map((li: string, i: number) => (
                <li key={i}>• {li}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botón de Cierre */}
        <div className="mt-20 pt-12 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-2xl font-light tracking-tight text-center md:text-left">
            Inicia ahora tu viaje hablando con <br />
            <span className="font-bold italic">
              nuestros especialistas
            </span>
          </p>
          <Button
            onClick={onOpenContact}
            className="bg-classic-gold hover:bg-white hover:text-black text-black px-10 py-8 rounded-full uppercase tracking-widest font-bold transition-all duration-300 ease-in-out text-xs"
          >
            Contacta con un asesor
          </Button>
        </div>
      </div>
    </section>
  );
}
