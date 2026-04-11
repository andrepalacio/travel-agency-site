"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs as TabsPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { ExperienceSchema, type ExperienceData } from "@/schemas/experience";
import { TabsList, TabsTrigger } from "./_ui";
import { GeneralTab } from "./_tabs/GeneralTab";
import { PresentacionTab } from "./_tabs/PresentacionTab";
import { ItinerarioTab } from "./_tabs/ItinerarioTab";
import { ComodidadesTab } from "./_tabs/ComodidadesTab";

type Props = {
  defaultValues: ExperienceData;
  onSave: (values: ExperienceData) => Promise<void> | void;
  isEditing: boolean;
};

export default function ExperienceEditorForm({ defaultValues, onSave, isEditing }: Props) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ExperienceData>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setIsSaving(true);
    try {
      await onSave(values);
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TabsPrimitive.Root defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="intro">Presentación</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerario</TabsTrigger>
            <TabsTrigger value="amenities">Comodidades</TabsTrigger>
          </TabsList>

          <GeneralTab isEditing={isEditing} />
          <PresentacionTab />
          <ItinerarioTab />
          <ComodidadesTab />
        </TabsPrimitive.Root>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="btn-primary">
            {isSaving ? "Guardando..." : "Guardar experiencia"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
