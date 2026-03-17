"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { HomeData } from "@/types/home";

export function ServicesSection({ data }: Readonly<{ data: HomeData['services'] }>) {
  return (
    <section className="py-24 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4">{data.title}</h2>
          <p className="text-slate-600 max-w-2xl text-lg">{data.description}</p>
        </motion.div>

        {/* Grilla de servicios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-100 overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Difuminado */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Texto */}
              <div className="absolute bottom-8 left-8 pr-8">
                <p className="text-white text-xl font-medium tracking-tight">
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}