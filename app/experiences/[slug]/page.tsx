"use client";

import { use, useState } from "react";
import { IntroSection } from "@/components/experiences/IntroSection";
import { ItinerarySection } from "@/components/experiences/ItinerarySection";
import { AmenitiesSection } from "@/components/experiences/AmenitiesSection";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { ContactForm } from "@/components/forms/ContactForm";
import { BrochureForm } from "@/components/forms/BrochureForm";
import { DetailedExperience } from "@/types/experience";

export default function DetailedExperiencePage({
  params,
}: {
  readonly params: Promise<{ readonly slug: string }>;
}) {
  // Estados para los formularios laterales
  const [activeForm, setActiveForm] = useState<"contact" | "brochure" | null>(
    null,
  );

  const { slug } = use(params);
  const experience = getExperienceBySlug(slug);

  const closeForm = () => setActiveForm(null);

  if (!experience) {
    console.log(experience);
    console.log(slug);
    return (
      <main>
        <p className="text-center py-12">Experience not found</p>
      </main>
    );
  }

  return (
    <>
      <header className="pt-40 pb-20 text-center">
        <h1 className="text-5xl font-bold tracking-tighter uppercase italic">
          {experience.title}
        </h1>
      </header>
      <main>
        {/* Pasamos la función para abrir formularios a las secciones */}
        <IntroSection
          data={experience.intro}
          onOpenContact={() => setActiveForm("contact")}
          onOpenBrochure={() => setActiveForm("brochure")}
        />

        <ItinerarySection data={experience.itinerary} />

        <AmenitiesSection
          data={experience.amenities}
          onOpenContact={() => setActiveForm("contact")}
        />
      </main>

      {/* FORMULARIOS LATERALES (Renderizado condicional) */}
      <FormSidebar
        isOpen={activeForm === "contact"}
        onClose={closeForm}
        title="Nuestros asesores estarán encantados de ponerse en contacto contigo"
      >
        <ContactForm experiences={[experience.title]} />
      </FormSidebar>

      <FormSidebar
        isOpen={activeForm === "brochure"}
        onClose={closeForm}
        title="" // El título ya está dentro de BrochureForm
      >
        <BrochureForm experiences={[experience.title]} />
      </FormSidebar>
    </>
  );
}

// Mock de función de búsqueda (Para desarrollo)
function getExperienceBySlug(slug: string): DetailedExperience | null {
  const experiences: Record<string, DetailedExperience> = {
    'lujo-estelar': {
      title: "Expedición Galáctica Asia",
      intro: {
        daysNights: "12 Días / 11 Noches",
        slogan: "Donde el lujo toca las estrellas",
        description: "Una travesía inolvidable...",
        imageLeft: "/exp1.jpg",
        imageRight: "/exp2.jpg",
      },
      itinerary: {
        goldMessage: "Disfruta los lugares mágicos",
        mainImage: "/asia.jpg",
        departure: "Tokio",
        arrival: "Singapur",
        mapImage: "/mapa.jpg",
      },
      amenities: {
        roomTitle: "Comodidades de la habitación",
        roomList: [
          "Cama King Size",
          "Vista al vacío estelar",
          "Mayordomo robótico",
          "Mini-bar premium",
        ],
        roomImage: "/room.jpg",
        includesTitle: "Tu experiencia incluye",
        includesImage: "/include.jpg",
        includesList: [
          "Vuelos privados",
          "Cenas gourmet",
          "Acceso a lounges VIP",
        ],
        notIncludedList: ["Gastos personales", "Propinas extras"],
        requirementsList: [
          "Pasaporte estelar vigente",
          "Vacuna contra radiación gamma",
        ],
      },
    },
    'cena-nebulosa': {
      title: "Expedición Náutica Brasil",
      intro: {
        daysNights: "10 Días / 9 Noches",
        slogan: "Navega por los mares del lujo",
        description: "Una aventura inolvidable...",
        imageLeft: "/exp3.jpg",
        imageRight: "/exp4.jpg",
      },
      itinerary: {
        goldMessage: "Explora destinos exóticos",
        mainImage: "/brazil.jpg",
        departure: "Río de Janeiro",
        arrival: "Salvador de Bahía",
        mapImage: "/mapa2.jpg",
      },
      amenities: {
        roomTitle: "Comodidades de la habitación",
        roomList: [
          "Suite con vista al mar",
          "Jacuzzi privado",
          "Servicio de mayordomo 24/7",
          "Mini-bar con bebidas premium",
        ],
        roomImage: "/room2.jpg",
        includesTitle: "Tu experiencia incluye",
        includesImage: "/include2.jpg",
        includesList: [
          "Vuelos en jet privado",
          "Cenas gourmet a bordo",
          "Acceso a playas privadas",
        ],
        optionalGrid: [
          "/g7.jpg",
          "/g8.jpg",
          "/g9.jpg",
          "/g10.jpg",
          "/g11.jpg",
          "/g12.jpg",
        ],
        notIncludedList: ["Gastos personales", "Propinas extras"],
        requirementsList: [
          "Pasaporte vigente",
          "Vacuna contra fiebre amarilla",
        ],
      },
    },
  };
  return experiences[slug] || null;
}
