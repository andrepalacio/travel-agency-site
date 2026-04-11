"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DetailedExperience } from "@/types/experience";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.45, ease: "easeOut" },
  }),
};

export function AmenitiesSection({
  data,
  onOpenContact,
}: {
  readonly data: DetailedExperience["amenities"];
  readonly onOpenContact: () => void;
}) {
  return (
    <section className="section-container section-content-wrapper space-y-32">

      <div className="two-column-grid md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="title-h3 uppercase mb-8 italic border-l-4 border-classic-gold pl-4">
            {data.roomTitle}
          </h2>
          <ul className="grid grid-cols-1 gap-4">
            {data.roomList.map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="flex items-center gap-4 text-slate-600 border-b border-slate-100 pb-2"
              >
                <span className="text-classic-gold text-xs shrink-0">◆</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2 relative h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
          <Image src={data.roomImage} alt="Habitación" fill className="object-cover" />
        </div>
      </div>

      <div className="space-y-12">
        <div className="text-center">
          <h2 className="title-h3 uppercase mb-4 italic">{data.includesTitle}</h2>
          <div className="title-underline mb-12" />
        </div>

        {/*
          La lista de inclusiones se movió debajo de la imagen porque al superponerla
          las listas largas desbordaban el contenedor y colapsaban el layout en móvil.
        */}
        <div className="relative h-[24rem] md:h-[32rem] rounded-[2rem] overflow-hidden">
          <Image src={data.includesImage} alt="Inclusiones" fill className="object-cover" />
          <div className="card-overlay-dark" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/20 text-[8rem] md:text-[12rem] font-serif italic leading-none select-none">
              ✦
            </span>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.includesList.map((item, i) => (
            <motion.li
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-xl border border-classic-gold/20 bg-elegant-beige/20 p-4"
            >
              <span className="text-classic-gold mt-0.5 shrink-0 text-sm">✓</span>
              <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>

        {data.optionalGrid && data.optionalGrid.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.optionalGrid.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="aspect-square relative rounded-xl overflow-hidden cursor-zoom-in"
              >
                <Image
                  src={img}
                  alt={`Detalle ${i + 1}`}
                  fill
                  className="object-cover transition-opacity duration-300 hover:opacity-80 active:opacity-70"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-expery-iron rounded-[2.5rem] p-8 md:p-20 text-white relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h4 className="uppercase text-xs font-bold mb-6 tracking-[0.2em]">
              Aquello que NO incluye
            </h4>
            <ul className="space-y-3 opacity-85 text-sm">
              {data.notIncludedList.map((li, i) => (
                <li key={i}>— {li}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-xs font-bold mb-6 tracking-[0.2em]">
              Requisitos para el viaje
            </h4>
            <ul className="space-y-3 opacity-85 text-sm">
              {data.requirementsList.map((li, i) => (
                <li key={i}>• {li}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-2xl font-light tracking-tight text-center md:text-left">
            Inicia ahora tu viaje hablando con <br />
            <span className="font-bold italic">nuestros especialistas</span>
          </p>
          <Button onClick={onOpenContact} className="btn-secondary-gold px-10 py-8 text-xs">
            Contacta con un asesor
          </Button>
        </div>
      </div>
    </section>
  );
}
