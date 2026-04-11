"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TabsContent } from "../_ui";
import type { ExperienceData } from "@/schemas/experience";

export function GeneralTab({ isEditing }: { isEditing: boolean }) {
  const { register, control } = useFormContext<ExperienceData>();

  return (
    <TabsContent value="general">
      <h3 className="title-h3 text-expery-blue">Información general</h3>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">Título de la experiencia</span>
        <Input {...register("title")} className="focus-visible:ring-classic-gold/40" />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-expery-blue">
          Slug{" "}
          <span className="font-normal text-expery-iron">
            (URL única — no se puede cambiar una vez publicada)
          </span>
        </span>
        <Input
          {...register("slug")}
          readOnly={isEditing}
          className="focus-visible:ring-classic-gold/40"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-expery-blue">
        <input type="checkbox" {...register("isFeatured")} className="accent-classic-gold" />
        Experiencia destacada (ocupa ancho completo en el listado)
      </label>

      <Controller
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <ImageUploader label="Imagen de portada" value={field.value || ""} onChange={field.onChange} />
        )}
      />
    </TabsContent>
  );
}
