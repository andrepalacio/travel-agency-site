"use client"
import { motion } from "framer-motion";
import { Share2, MessageCircle } from "lucide-react";
import { HomeData } from "@/types/home";

const IconMap = {
  instagram: Share2,
  facebook: Share2,
  whatsapp: MessageCircle,
  linkedin: Share2
};

export function ContactSection({ data }: Readonly<{ data: HomeData['contact'] }>) {
  return (
    <section className="py-24 px-6 md:px-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold tracking-tighter uppercase mb-6 leading-tight">
            {data.leftTitle}
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed italic">
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
          {/* Círculo Gris (Color Principal Placeholder) */}
          <div className="w-[450px] h-[450px] md:w-[550px] md:h-[550px] bg-[#333333] rounded-full flex flex-col justify-center items-center p-12 text-center text-white relative">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-snug">
              {data.circleTitle}
            </h3>
            
            {/* Redes Sociales */}
            <div className="flex flex-col gap-4 items-start w-fit">
              {data.socials.map((social) => {
                const Icon = IconMap[social.platform];
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