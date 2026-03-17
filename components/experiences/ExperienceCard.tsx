"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Experience } from "@/types/experience";

export function ExperienceCard({
  exp,
  index,
}: {
  readonly exp: Experience;
  readonly index: number;
}) {
  // Si es la principal (Featured), usamos clases diferentes
  const isFeatured = exp.isFeatured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded group min-h-100 
                ${isFeatured ? "md:col-span-6 h-125" : "md:col-span-3 lg:col-span-2 h-112.5"}`}
    >
      {/* Imagen de Fondo */}
      <Image
        src={exp.imageUrl}
        alt={exp.title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      {/* Contenido */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3
          className={`text-white font-bold tracking-tighter mb-6 max-w-md
                    ${isFeatured ? "text-4xl" : "text-2xl"}`}
        >
          {exp.title}
        </h3>

        <div className="flex justify-end">
          <Link href={`/experiences/${exp.slug}`}>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-white border-b border-white/50 pb-1 text-sm uppercase tracking-widest hover:border-white transition-colors"
            >
              Conoce más
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
