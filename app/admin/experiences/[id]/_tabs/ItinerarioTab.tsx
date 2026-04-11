"use client";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TabsContent, ListSection, RemoveButton } from "../_ui";
import type { ExperienceData } from "@/schemas/experience";

export function ItinerarioTab() {
  const { register, control } = useFormContext<ExperienceData>();
  const stops = useFieldArray({ control, name: "itinerary.stops" });

  return (
    <TabsContent value="itinerary">
      <h3 className="title-h3 text-expery-blue">Itinerario y ruta</h3>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Mensaje destacado</span>
        <Input
          {...register("itinerary.goldMessage")}
          placeholder="Ej: Una travesía por los fiordos más remotos del planeta"
          className="focus-visible:ring-classic-gold/40"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-expery-blue">Ciudad de salida</span>
          <Input
            {...register("itinerary.departure")}
            placeholder="Ej: Buenos Aires"
            className="focus-visible:ring-classic-gold/40"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-expery-blue">Ciudad de llegada</span>
          <Input
            {...register("itinerary.arrival")}
            placeholder="Ej: Ushuaia"
            className="focus-visible:ring-classic-gold/40"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="itinerary.mainImage"
          render={({ field }) => (
            <ImageUploader
              label="Fotografía principal del itinerario"
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="itinerary.mapImage"
          render={({ field }) => (
            <ImageUploader
              label="Imagen del mapa de ruta"
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <ListSection
        title="Paradas en la ruta"
        onAdd={() => stops.append({ name: "", lat: 0, lng: 0 })}
      >
        {stops.fields.length === 0 ? (
          <p className="text-sm text-expery-blue/70">Sin paradas registradas.</p>
        ) : (
          stops.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-2 rounded-md border border-expery-blue/15 p-3 md:grid-cols-[1fr_140px_140px_auto]"
            >
              <Input
                placeholder="Nombre del lugar"
                {...register(`itinerary.stops.${index}.name`)}
                className="focus-visible:ring-classic-gold/40"
              />
              <Input
                type="number"
                step="any"
                placeholder="Latitud"
                {...register(`itinerary.stops.${index}.lat`, { valueAsNumber: true })}
                className="focus-visible:ring-classic-gold/40"
              />
              <Input
                type="number"
                step="any"
                placeholder="Longitud"
                {...register(`itinerary.stops.${index}.lng`, { valueAsNumber: true })}
                className="focus-visible:ring-classic-gold/40"
              />
              <RemoveButton onClick={() => stops.remove(index)} />
            </div>
          ))
        )}
      </ListSection>
    </TabsContent>
  );
}
