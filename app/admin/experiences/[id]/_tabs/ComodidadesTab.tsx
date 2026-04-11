"use client";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TabsContent, ListSection, RemoveButton } from "../_ui";
import type { ExperienceData } from "@/schemas/experience";

function StringListSection({
  title,
  fieldName,
  placeholder,
}: {
  title: string;
  fieldName: "amenities.roomList" | "amenities.conciergeList" | "amenities.includesList" | "amenities.notIncludedList" | "amenities.requirementsList";
  placeholder?: string;
}) {
  const { register, control } = useFormContext<ExperienceData>();
  const list = useFieldArray({ control: control as never, name: fieldName as never });

  return (
    <ListSection title={title} onAdd={() => list.append("")}>
      {list.fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input
            {...register(`${fieldName}.${index}` as never)}
            placeholder={placeholder}
            className="focus-visible:ring-classic-gold/40"
          />
          <RemoveButton onClick={() => list.remove(index)} />
        </div>
      ))}
    </ListSection>
  );
}

export function ComodidadesTab() {
  const { register, control } = useFormContext<ExperienceData>();

  return (
    <TabsContent value="amenities">
      <h3 className="title-h3 text-expery-blue">Comodidades e inclusiones</h3>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Título de la sección de habitaciones</span>
        <Input {...register("amenities.roomTitle")} className="focus-visible:ring-classic-gold/40" />
      </label>

      <Controller
        control={control}
        name="amenities.roomImage"
        render={({ field }) => (
          <ImageUploader
            label="Fotografía de habitaciones"
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />

      <StringListSection
        title="Características de la habitación"
        fieldName="amenities.roomList"
        placeholder="Ej: Cama king size con vista al mar"
      />

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Título de la sección concierge</span>
        <Input
          {...register("amenities.conciergeTitle")}
          className="focus-visible:ring-classic-gold/40"
        />
      </label>

      <StringListSection
        title="Servicios concierge"
        fieldName="amenities.conciergeList"
        placeholder="Ej: Reservas en restaurantes exclusivos"
      />

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Título de la sección &quot;Qué incluye&quot;</span>
        <Input
          {...register("amenities.includesTitle")}
          className="focus-visible:ring-classic-gold/40"
        />
      </label>

      <Controller
        control={control}
        name="amenities.includesImage"
        render={({ field }) => (
          <ImageUploader
            label="Imagen representativa de inclusiones"
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />

      <StringListSection
        title="Qué incluye"
        fieldName="amenities.includesList"
        placeholder="Ej: Vuelos internacionales en clase ejecutiva"
      />

      <StringListSection
        title="Qué no incluye"
        fieldName="amenities.notIncludedList"
        placeholder="Ej: Gastos personales"
      />

      <StringListSection
        title="Requisitos del viaje"
        fieldName="amenities.requirementsList"
        placeholder="Ej: Pasaporte vigente con mínimo 6 meses de validez"
      />
    </TabsContent>
  );
}
