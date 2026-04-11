"use client"
import { motion } from "framer-motion";
import { Share2, MessageCircle, Focus } from "lucide-react";
import { HomeData } from "@/types/home";

const IconMap = {
  instagram: Focus,
  facebook: Share2,
  whatsapp: MessageCircle,
};

export function ContactSection({ data }: Readonly<{ data: HomeData['contact'] }>) {
  return (
    <section className="section-container bg-slate-50 overflow-hidden" id="contacto">
      <div className="section-content-wrapper grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="title-h2 mb-6 leading-tight">
            {data.leftTitle}
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            {data.leftDescription}
          </p>
        </motion.div>

        {/* Columna Derecha (Círculo) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center relative"
        >
          <div className="w-72 h-auto md:w-108 md:h-108 bg-expery-blue rounded-xl flex flex-col justify-center items-center p-12 text-center text-white relative">
            <h3 className="text-3xl font-bold mb-8 leading-snug">
              {data.circleTitle}
            </h3>
            
            {/* Redes Sociales */}
            <div className="flex flex-col gap-4 items-start w-fit">
              {data.socials.map((social) => {
                const Icon = IconMap[social.platform as keyof typeof IconMap];
                return (
                  <a 
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    className="flex items-center gap-3 hover:text-slate-300 transition-colors group"
                  >
                    <div className="p-2 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                      <Icon size={20} />
                    </div>
                    <span className="uppercase tracking-widest text-sm">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}