"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CruiseCardData } from "@/types/cruises";

export function CruiseCard({
  data,
  index,
  onClick,
}: {
  readonly data: CruiseCardData;
  readonly index: number;
  readonly onClick: () => void;
}) {
  // Alternar el orden: imagen izquierda o derecha según el índice
  const isEven = index % 2 === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-7xl mx-auto mb-32 px-6"
    >
      <div
        className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-3xl overflow-hidden shadow border border-slate-100 min-h-125`}
      >
        {/* LADO DE LA IMAGEN (50%) */}
        <div className="w-full md:w-1/2 relative h-100 md:h-auto overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            loading="eager"
            sizes="70vw, 40vw"
          />
        </div>

        {/* LADO DEL TEXTO (50%) */}
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-slate-50/50">
          <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.3em] mb-4">
            Flota Exclusiva
          </span>
          <h2 className="text-4xl font-bold tracking-tighter mb-6 italic">
            {data.name}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-black hover:bg-[#D4AF37] text-white px-8 py-6 rounded-full uppercase tracking-widest text-[10px] font-bold transition-all group"
              onClick={onClick}
            >
              {data.ctaText}
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>

            {/* <button className="text-slate-400 hover:text-black text-[10px] uppercase tracking-widest font-bold transition-colors">
              Ver especificaciones técnicas
            </button> */}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
