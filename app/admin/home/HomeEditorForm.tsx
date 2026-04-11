"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeDataSchema, type HomeData } from "@/schemas/page-settings";
import { saveHomeContent } from "./actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

type HomeEditorFormProps = {
  initialData: HomeData;
};

export default function HomeEditorForm({ initialData }: HomeEditorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { register, handleSubmit, control } = useForm<HomeData>({
    resolver: zodResolver(HomeDataSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: HomeData) => {
    setStatusMessage(null);
    startTransition(async () => {
      const result = await saveHomeContent(values);
      setStatusMessage(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Hero</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Controller
              control={control}
              name="hero.shipImageUrl"
              render={({ field }) => (
                <ImageUploader
                  label="Imagen del barco"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Enlace &quot;Explorar&quot;</span>
            <input
              type="text"
              {...register("hero.exploreLink")}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Enlace &quot;Más info&quot;</span>
            <input
              type="text"
              {...register("hero.infoLink")}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Servicios</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Título de la sección</span>
            <input
              type="text"
              {...register("services.title")}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>

          <label className="block space-y-2 md:col-span-2">
            <span className="text-sm text-expery-blue">Descripción</span>
            <textarea
              {...register("services.description")}
              className="min-h-24 w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>
        </div>

        <div className="mt-5 space-y-4">
          <h3 className="text-base font-semibold">Tarjetas</h3>
          {initialData.services.cards.map((_, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-md border p-4 md:grid-cols-3"
            >
              <label className="block space-y-2">
                <span className="text-sm text-expery-blue">Identificador</span>
                <input
                  type="text"
                  {...register(`services.cards.${index}.id`)}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
                />
              </label>

              <div className="md:col-span-2">
                <Controller
                  control={control}
                  name={`services.cards.${index}.image`}
                  render={({ field }) => (
                    <ImageUploader
                      label="Imagen de la tarjeta"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <label className="block space-y-2 md:col-span-3">
                <span className="text-sm text-expery-blue">Título de la tarjeta</span>
                <input
                  type="text"
                  {...register(`services.cards.${index}.title`)}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Contacto</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Título izquierdo</span>
            <input
              type="text"
              {...register("contact.leftTitle")}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>

          <label className="block space-y-2 md:col-span-2">
            <span className="text-sm text-expery-blue">Descripción izquierda</span>
            <textarea
              {...register("contact.leftDescription")}
              className="min-h-24 w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>

          <label className="block space-y-2 md:col-span-2">
            <span className="text-sm text-expery-blue">Título central</span>
            <input
              type="text"
              {...register("contact.circleTitle")}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
            />
          </label>
        </div>

        <div className="mt-5 space-y-4">
          <h3 className="text-base font-semibold">Redes sociales</h3>
          {initialData.contact.socials.map((_, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-md border p-4 md:grid-cols-3"
            >
              <label className="block space-y-2">
                <span className="text-sm text-expery-blue">Plataforma</span>
                <input
                  type="text"
                  {...register(`contact.socials.${index}.platform`)}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm text-expery-blue">Etiqueta</span>
                <input
                  type="text"
                  {...register(`contact.socials.${index}.label`)}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm text-expery-blue">Enlace</span>
                <input
                  type="text"
                  {...register(`contact.socials.${index}.url`)}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary !mt-0 !py-3 !px-6 disabled:opacity-60"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>
        {statusMessage ? (
          <p className="text-sm text-slate-700">{statusMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
