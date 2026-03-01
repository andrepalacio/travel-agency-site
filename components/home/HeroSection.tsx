"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { HomeData } from "@/types/home";

export function HeroSection({ data }: Readonly<{ data: HomeData['hero'] }>) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* 1. Fondo: Polvo Estelar (Animación simple de estela) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[url('/star-dust.png')] bg-cover opacity-40 pointer-events-none"
      />

      {/* 2. Imagen del Crucero (Estático pero con entrada suave) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Image 
          src={data.shipImageUrl || "/placeholder-cruise.png"} 
          alt="Crucero" 
          width={1200} 
          height={600}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* 3. Textos Inferior Derecha */}
      <div className="absolute bottom-10 right-10 flex gap-8 z-20">
        <a href={data.exploreLink} className="text-white border-b border-white hover:opacity-70 transition-opacity uppercase tracking-widest text-sm">
          Explorar
        </a>
        <button className="text-white border-b border-white hover:opacity-70 transition-opacity uppercase tracking-widest text-sm">
          Solicita más información
        </button>
      </div>
    </section>
  );
}