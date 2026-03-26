"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { DetailedExperience } from "@/types/experience";

export function IntroSection({
  data,
  onOpenContact,
  onOpenBrochure,
}: {
  readonly data: DetailedExperience["intro"];
  readonly onOpenContact: () => void;
  readonly onOpenBrochure: () => void;
}) {
  return (
    <section className="px-16 section-content-wrapper">
      <div className="flex flex-col items-center w-full">
          {/* Textos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full mb-12 flex flex-col items-center"
          >
            <div className="inline-block border border-classic-gold px-6 py-2 mb-6 w-fit rounded">
              <span className="text-classic-gold font-medium uppercase tracking-widest text-sm">
                {data.daysNights}
              </span>
            </div>
            <p className="text-classic-gold text-xl font-serif italic mb-6">
              `{data.slogan}`
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              {data.description}
            </p>
          </motion.div>

          {/* Imágenes y Botones */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded h-100">
              <Image
                src={data.imageLeft}
                alt="Asesor"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                <button
                  onClick={onOpenContact}
                  className="w-full py-3 bg-white text-xs uppercase tracking-tighter font-bold hover:bg-classic-gold hover:text-white transition-all hover:cursor-pointer rounded"
                >
                  Contacta con un asesor
                </button>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded h-100">
              <Image
                src={data.imageRight}
                alt="Brochure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                <button
                  onClick={onOpenBrochure}
                  className="w-full py-3 bg-white text-xs uppercase tracking-tighter font-bold hover:bg-classic-gold hover:text-white transition-all hover:cursor-pointer rounded"
                >
                  Solicita más información
                </button>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
