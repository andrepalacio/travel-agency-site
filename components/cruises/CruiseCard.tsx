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
  const isEven = index % 2 === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      <div
        className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} rounded overflow-hidden min-h-125`}
      >
        {/* LADO DE LA IMAGEN (50%) */}
        <div className="w-full md:w-1/2 relative h-100 md:h-auto overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            className="card-image"
            loading="eager"
            sizes="70vw, 40vw"
          />
        </div>

        {/* LADO DEL TEXTO (50%) */}
        <div className="card-split-left">
          <span className="title-accent mb-4">Flota Exclusiva</span>
          <h2 className="title-h3 mb-6">{data.name}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            {data.description}
          </p>

          <Button
            variant="ghost"
            className="btn-primary w-fit"
            onClick={onClick}
          >
            {data.ctaText}
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
