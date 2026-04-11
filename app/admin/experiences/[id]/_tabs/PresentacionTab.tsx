"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TabsContent, Textarea } from "../_ui";
import type { ExperienceData } from "@/schemas/experience";

export function PresentacionTab() {
  const { register, control } = useFormContext<ExperienceData>();

  return (
    <TabsContent value="intro">
      <h3 className="title-h3 text-expery-blue">Presentación de la experiencia</h3>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Duración</span>
        <Input
          {...register("intro.daysNights")}
          placeholder="Ej: 8 días / 7 noches"
          className="focus-visible:ring-classic-gold/40"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Frase principal</span>
        <Textarea
          {...register("intro.slogan")}
          rows={3}
          placeholder="Frase corta e inspiradora que resume la experiencia"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Descripción</span>
        <Textarea
          {...register("intro.description")}
          rows={5}
          placeholder="Descripción detallada de la experiencia"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="intro.imageLeft"
          render={({ field }) => (
            <ImageUploader
              label="Imagen izquierda (Asesor)"
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="intro.imageRight"
          render={({ field }) => (
            <ImageUploader
              label="Imagen derecha (Brochure)"
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </TabsContent>
  );
}
