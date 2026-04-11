"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HomeData } from "@/types/home";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { BrochureForm } from "@/components/forms/BrochureForm";
import { ContactForm } from "@/components/forms/ContactForm";

export function HeroSection({
  data,
  brochures,
}: Readonly<{
  data: HomeData["hero"];
  brochures: readonly { id: number; name: string }[];
}>) {
  const [activeForm, setActiveForm] = useState<"brochure" | "contact" | null>(null);
  const closeForm = () => setActiveForm(null);

  return (
    <section className="hero-container">
      {/* 1. Fondo: Polvo Estelar (Animación simple de estela) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="card-overlay-gradient"
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
          className="btn-link"
        >
          Explorar
        </Link>
        <button
          onClick={() => setActiveForm("contact")}
          className="btn-link-transparent"
        >
          Más información
        </button>
      </div>

      <FormSidebar
        isOpen={activeForm === "brochure"}
        onClose={closeForm}
        text="Recibe a tu correo electrónico el brochure de tu experiencia de interés"
      >
        <BrochureForm brochures={brochures} />
      </FormSidebar>

      <FormSidebar
        isOpen={activeForm === "contact"}
        onClose={closeForm}
        text="Completa el formulario y uno de nuestros asesores se pondrá en contacto contigo"
      >
        <ContactForm
          type="cruise"
          selector={brochures.map((b) => ({ title: b.name }))}
        />
      </FormSidebar>
    </section>
  );
}
