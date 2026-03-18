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
    <div className="min-h-screen">
      <header className="pt-28 pb-20 text-center">
        <h1 className="text-6xl font-bold tracking-tighter">
          Navieras de Lujo
        </h1>
        <p className="text-expery-iron mt-4 tracking-widest text-xl">
          Ingeniería de vanguardia para exploradores modernos
        </p>
      </header>

      <main className="pb-20">
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