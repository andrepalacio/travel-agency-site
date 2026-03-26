"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { HomeData } from "@/types/home";

export function ServicesSection({ data }: Readonly<{ data: HomeData['services'] }>) {
  return (
    <section className="section-container md:py-16 md:px-8 md:flex">
      {/* <div className="section-content-wrapper"> */}
        {/* Cabecera */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 text-center self-center w-full md:w-1/4"
        >
          <h2 className="title-h3 uppercase mb-4">{data.title}</h2>
          <p className="text-slate-600 max-w-2xl text-lg">{data.description}</p>
        </motion.div>

        {/* Grilla de servicios */}
        <div className="grid grid-cols-2 w-full md:grid-cols-4 md:w-3/4">
          {data.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group h-108 overflow-hidden bg-slate-100 ${index === 0 ? "rounded-l" : ""} ${index === 3 ? "rounded-r" : ""}`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Difuminado */}
              <div className="card-overlay-subtle opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Texto */}
              <div className="absolute bottom-8 left-8 pr-8">
                <p className="text-white text-xl font-medium tracking-tight">
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      {/* </div> */}
    </section>
  );
}