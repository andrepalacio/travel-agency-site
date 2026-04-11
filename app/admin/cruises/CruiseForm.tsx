"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CruiseSchema } from "@/schemas/cruise";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Input } from "@/components/ui/input";

type CruiseFormInput = z.input<typeof CruiseSchema>;
export type CruiseFormValues = z.output<typeof CruiseSchema>;

type CruiseFormProps = {
  defaultValues: CruiseFormValues;
  onSave: (values: CruiseFormValues) => Promise<void> | void;
  isEditing: boolean;
  onCancel: () => void;
};

function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={`w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30 ${className}`}
      {...props}
    />
  );
}

export default function CruiseForm({
  defaultValues,
  onSave,
  isEditing,
  onCancel,
}: CruiseFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<CruiseFormInput, unknown, CruiseFormValues>({
    resolver: zodResolver(CruiseSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const submit = form.handleSubmit(async (values) => {
    setIsSaving(true);
    try {
      await onSave(values);
    } finally {
      setIsSaving(false);
    }
  });
  return (
    <section className="space-y-4 rounded-lg border border-classic-gold/30 bg-white p-5 shadow-sm">
      <h2 className="title-h3 text-expery-blue">
        {isEditing ? "Editar crucero" : "Nuevo crucero"}
      </h2>

      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-expery-blue">Nombre</span>
          <Input
            {...form.register("name")}
            className="focus-visible:ring-classic-gold/40"
          />
          {form.formState.errors.name && (
            <span className="text-xs text-red-600">
              {form.formState.errors.name.message}
            </span>
          )}
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-expery-blue">Texto CTA</span>
          <Input
            {...form.register("ctaText")}
            className="focus-visible:ring-classic-gold/40"
          />
          {form.formState.errors.ctaText && (
            <span className="text-xs text-red-600">
              {form.formState.errors.ctaText.message}
            </span>
          )}
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm text-expery-blue">Descripción</span>
          <Textarea {...form.register("description")} rows={5} />
          {form.formState.errors.description && (
            <span className="text-xs text-red-600">
              {form.formState.errors.description.message}
            </span>
          )}
        </label>

        <div className="md:col-span-2">
          <Controller
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <ImageUploader
                label="Imagen del crucero"
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {form.formState.errors.imageUrl && (
            <span className="text-xs text-red-600">
              {form.formState.errors.imageUrl.message}
            </span>
          )}
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-expery-blue">Orden</span>
          <Input
            type="number"
            {...form.register("order", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || Number.isNaN(value) ? 0 : Number(value),
            })}
            className="focus-visible:ring-classic-gold/40"
          />
          {form.formState.errors.order && (
            <span className="text-xs text-red-600">
              {form.formState.errors.order.message}
            </span>
          )}
        </label>

        <div className="md:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary !mt-0 !py-2 !px-4 disabled:opacity-60"
          >
            {isSaving ? "Guardando..." : isEditing ? "Actualizar crucero" : "Guardar crucero"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-classic-gold px-4 py-2 text-sm font-medium text-classic-gold transition hover:bg-classic-gold/10"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
