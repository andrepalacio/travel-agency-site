"use client";

import { useState } from "react";
import { IntroSection } from "@/components/experiences/IntroSection";
import { ItinerarySection } from "@/components/experiences/ItinerarySection";
import { AmenitiesSection } from "@/components/experiences/AmenitiesSection";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { ContactForm } from "@/components/forms/ContactForm";
import { BrochureForm } from "@/components/forms/BrochureForm";
import { DetailedExperience } from "@/types/experience";

export function DetailExperienceClient({
  experience,
  selector,
  brochures,
}: {
  readonly experience: DetailedExperience;
  readonly selector: readonly { title: string }[];
  readonly brochures: readonly { id: number; name: string }[];
}) {
  const [activeForm, setActiveForm] = useState<"contact" | "brochure" | null>(
    null,
  );
  const closeForm = () => setActiveForm(null);

  return (
    <>
      <header className="section-container-minimal">
        <h1 className="title-h2-blue">
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
        text="Nuestros asesores estarán encantados de ponerse en contacto contigo"
      >
        <ContactForm type="experience" selector={selector} />
      </FormSidebar>

      <FormSidebar
        isOpen={activeForm === "brochure"}
        onClose={closeForm}
        text="Recibe a tu correo electrónico el brochure de tu experiencia de interés"
      >
        <BrochureForm brochures={brochures} />
      </FormSidebar>
    </>
  );
}
