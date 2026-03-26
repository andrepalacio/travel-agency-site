"use client";

import { useState } from "react";
import { CruiseCard } from "@/components/cruises/CruiseCard";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { ContactForm } from "@/components/forms/ContactForm";
import type { Cruise } from "@prisma/client";

interface Props {
  readonly cruises: readonly Cruise[];
  readonly selector: readonly { title: string }[];
}

export function CruisesClient({ cruises, selector }: Props) {
  const [activeForm, setActiveForm] = useState<"contact" | null>(null);
  const closeForm = () => setActiveForm(null);

  return (
    <div className="min-section">
      <header className="section-container-minimal">
        <h1 className="title-h1">
          Navieras de Lujo
        </h1>
        <p className="title-secondary mt-4">
          Ingeniería de vanguardia para exploradores modernos
        </p>
      </header>

      <main>
        {cruises.map((cruise, index) => (
          <CruiseCard
            key={cruise.id}
            data={cruise}
            index={index}
            onClick={() => setActiveForm("contact")}
          />
        ))}
      </main>

      <FormSidebar
        isOpen={activeForm === "contact"}
        onClose={closeForm}
        text="Nuestros asesores estarán encantados de ponerse en contacto contigo"
      >
        <ContactForm type="cruise" selector={selector} />
      </FormSidebar>
    </div>
  );
}