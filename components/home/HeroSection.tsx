"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HomeData } from "@/types/home";

export function HeroSection({ data }: Readonly<{ data: HomeData["hero"] }>) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* 1. Fondo: Polvo Estelar (Animación simple de estela) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-linear-to-b from-transparent via-slate-300 to-slate-900 opacity-60 pointer-events-none"
      />

      {/* 2. Imagen del Crucero (Estático pero con entrada suave) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="relative z-10 w-screen h-screen scale-110"
      >
        <Image
          src={data.shipImageUrl || "/placeholder-cruise.png"}
          alt="Crucero"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>

      {/* 3. Textos Inferior Derecha */}
      <div className="absolute bottom-10 right-10 flex gap-8 z-20">
        <Link
          href={data.exploreLink}
          className="text-white border-b border-white hover:opacity-70 transition-opacity uppercase tracking-widest text-sm md:text-base"
        >
          Explorar
        </Link>
        <Link
          href={data.infoLink}
          className="text-white border-b border-white hover:opacity-70 transition-opacity uppercase tracking-widest text-sm md:text-base"
        >
          Solicita más información
        </Link>
      </div>
    </section>
  );
}
