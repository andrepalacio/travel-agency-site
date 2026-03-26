"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Experience } from "@/types/experience";

export function ExperienceCard({
  exp,
  index,
  span,
}: {
  readonly exp: Experience;
  readonly index: number;
  readonly span: number;
}) {
  const colSpanMap: Record<number, string> = {
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  const isFeatured = exp.isFeatured;
  const gridStyle = isFeatured ? "md:col-span-6 h-[80vh]" : `${colSpanMap[span]} h-[60vh]`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className={`card-minimal group ${gridStyle}`}
    >
      {/* Imagen de Fondo */}
      <Link
        href={`/experiences/${exp.slug}`}
        className="absolute inset-0 block cursor-default"
        aria-label={`Ir a la experiencia ${exp.title}`}
      >
        <Image
          src={exp.imageUrl}
          alt={exp.title}
          loading="eager"
          fill
          className="card-image-hover"
        />
      </Link>

      {/* Overlay Gradiente */}
      <div className="card-overlay pointer-events-none" />

      {/* Contenido */}
      <div className="card-absolute-content pointer-events-none">
        <h3
          className={`title-white mb-6 max-w-md
                    ${isFeatured ? "text-4xl" : "text-2xl"}`}
        >
          {exp.title}
        </h3>

        <div className="flex justify-end pointer-events-auto">
          <Link href={`/experiences/${exp.slug}`}>
            <motion.button
              whileHover={{ x: 5 }}
              className="btn-link-with-icon cursor-pointer"
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
