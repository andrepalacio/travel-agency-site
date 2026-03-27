"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DetailedExperience } from "@/types/experience";
import { updateExperience } from "./actions";

const ExperienceEditorSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "El título es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio"),
  isFeatured: z.boolean(),
  imageUrl: z.string(),
  intro: z.object({
    daysNights: z.string(),
    slogan: z.string(),
    description: z.string(),
    imageLeft: z.string(),
    imageRight: z.string(),
  }),
  itinerary: z.object({
    goldMessage: z.string(),
    mainImage: z.string(),
    departure: z.string(),
    arrival: z.string(),
    mapImage: z.string(),
  }),
  amenities: z.object({
    roomTitle: z.string(),
    roomList: z.array(z.string()),
    roomImage: z.string(),
    includesTitle: z.string(),
    includesList: z.array(z.string()),
    includesImage: z.string(),
    optionalGrid: z.array(z.string()).max(6, "Máximo 6 imágenes"),
    notIncludedList: z.array(z.string()),
    requirementsList: z.array(z.string()),
  }),
});

type ExperienceEditorFormValues = z.infer<typeof ExperienceEditorSchema>;

type ExperienceEditorFormProps = {
  id: string;
  initialData: {
    title: string;
    slug: string;
    isFeatured: boolean;
    imageUrl: string;
    details: DetailedExperience;
  };
  isEditing?: boolean;
};

function StringListField({
  label,
  values,
  onAdd,
  onRemove,
  onChange,
}: {
  label: string;
  values: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          Agregar
        </Button>
      </div>

      <div className="space-y-2">
        {values.length === 0 ? (
          <p className="text-sm text-slate-500">Sin elementos todavía.</p>
        ) : (
          values.map((value, index) => (
            <div key={`${label}-${index}`} className="flex items-center gap-2">
              <Input
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={`Elemento ${index + 1}`}
              />
              <Button type="button" variant="outline" size="sm" onClick={() => onRemove(index)}>
                Quitar
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function ExperienceEditorForm({
  id,
  initialData,
  isEditing = true,
}: ExperienceEditorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "intro" | "itinerary" | "amenities">(
    "general",
  );

  const form = useForm<ExperienceEditorFormValues>({
    resolver: zodResolver(ExperienceEditorSchema),
    defaultValues: {
      id,
      title: initialData.title,
      slug: initialData.slug,
      isFeatured: initialData.isFeatured,
      imageUrl: initialData.imageUrl,
      intro: {
        daysNights: initialData.details.intro.daysNights ?? "",
        slogan: initialData.details.intro.slogan ?? "",
        description: initialData.details.intro.description ?? "",
        imageLeft: initialData.details.intro.imageLeft ?? "",
        imageRight: initialData.details.intro.imageRight ?? "",
      },
      itinerary: {
        goldMessage: initialData.details.itinerary.goldMessage ?? "",
        mainImage: initialData.details.itinerary.mainImage ?? "",
        departure: initialData.details.itinerary.departure ?? "",
        arrival: initialData.details.itinerary.arrival ?? "",
        mapImage: initialData.details.itinerary.mapImage ?? "",
      },
      amenities: {
        roomTitle: initialData.details.amenities.roomTitle ?? "",
        roomList: initialData.details.amenities.roomList ?? [],
        roomImage: initialData.details.amenities.roomImage ?? "",
        includesTitle: initialData.details.amenities.includesTitle ?? "",
        includesList: initialData.details.amenities.includesList ?? [],
        includesImage: initialData.details.amenities.includesImage ?? "",
        optionalGrid: initialData.details.amenities.optionalGrid ?? [],
        notIncludedList: initialData.details.amenities.notIncludedList ?? [],
        requirementsList: initialData.details.amenities.requirementsList ?? [],
      },
    },
  });

  const updateList = (
    key:
      | "roomList"
      | "includesList"
      | "optionalGrid"
      | "notIncludedList"
      | "requirementsList",
    updater: (current: string[]) => string[],
  ) => {
    const current = form.getValues(`amenities.${key}`) ?? [];
    form.setValue(`amenities.${key}`, updater(current), { shouldDirty: true });
  };

  const onSubmit = (values: ExperienceEditorFormValues) => {
    setStatusMessage(null);
    startTransition(async () => {
      const result = await updateExperience(values.id, {
        title: values.title,
        isFeatured: values.isFeatured,
        imageUrl: values.imageUrl,
        intro: values.intro,
        itinerary: values.itinerary,
        amenities: values.amenities,
      });

      setStatusMessage(result.message);
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "general", label: "General" },
            { key: "intro", label: "Intro" },
            { key: "itinerary", label: "Itinerary" },
            { key: "amenities", label: "Amenities" },
          ].map((tab) => (
            <Button
              key={tab.key}
              type="button"
              variant={activeTab === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {activeTab === "general" && (
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">General</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Título
              <Input type="text" {...form.register("title")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Slug
              <Input type="text" {...form.register("slug")} readOnly={isEditing} />
            </label>

            <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
              <input type="checkbox" {...form.register("isFeatured")} />
              Destacada (isFeatured)
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
              URL imagen principal
              <Input type="text" {...form.register("imageUrl")} />
            </label>

            <div className="md:col-span-2">
              <ImageUploader
                label="Imagen principal"
                value={form.watch("imageUrl")}
                onChange={(url) => form.setValue("imageUrl", url)}
              />
            </div>
          </div>
        </section>
      )}

      {activeTab === "intro" && (
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Intro</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              daysNights
              <Input type="text" {...form.register("intro.daysNights")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
              slogan
              <textarea
                {...form.register("intro.slogan")}
                className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
              description
              <textarea
                {...form.register("intro.description")}
                className="min-h-32 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              imageLeft (URL)
              <Input type="text" {...form.register("intro.imageLeft")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              imageRight (URL)
              <Input type="text" {...form.register("intro.imageRight")} />
            </label>

            <ImageUploader
              label="Imagen izquierda"
              value={form.watch("intro.imageLeft")}
              onChange={(url) => form.setValue("intro.imageLeft", url)}
            />

            <ImageUploader
              label="Imagen derecha"
              value={form.watch("intro.imageRight")}
              onChange={(url) => form.setValue("intro.imageRight", url)}
            />
          </div>
        </section>
      )}

      {activeTab === "itinerary" && (
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Itinerary</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
              goldMessage
              <Input type="text" {...form.register("itinerary.goldMessage")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              departure
              <Input type="text" {...form.register("itinerary.departure")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              arrival
              <Input type="text" {...form.register("itinerary.arrival")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              mainImage (URL)
              <Input type="text" {...form.register("itinerary.mainImage")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              mapImage (URL)
              <Input type="text" {...form.register("itinerary.mapImage")} />
            </label>

            <ImageUploader
              label="Imagen principal del itinerario"
              value={form.watch("itinerary.mainImage")}
              onChange={(url) => form.setValue("itinerary.mainImage", url)}
            />

            <ImageUploader
              label="Mapa del itinerario"
              value={form.watch("itinerary.mapImage")}
              onChange={(url) => form.setValue("itinerary.mapImage", url)}
            />
          </div>
        </section>
      )}

      {activeTab === "amenities" && (
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Amenities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              roomTitle
              <Input type="text" {...form.register("amenities.roomTitle")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              includesTitle
              <Input type="text" {...form.register("amenities.includesTitle")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              roomImage (URL)
              <Input type="text" {...form.register("amenities.roomImage")} />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              includesImage (URL)
              <Input type="text" {...form.register("amenities.includesImage")} />
            </label>

            <ImageUploader
              label="Imagen de habitaciones"
              value={form.watch("amenities.roomImage")}
              onChange={(url) => form.setValue("amenities.roomImage", url)}
            />

            <ImageUploader
              label="Imagen de incluidos"
              value={form.watch("amenities.includesImage")}
              onChange={(url) => form.setValue("amenities.includesImage", url)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
              <StringListField
                label="roomList"
                values={form.watch("amenities.roomList")}
                onAdd={() => updateList("roomList", (list) => [...list, ""])}
                onRemove={(index) => updateList("roomList", (list) => list.filter((_, i) => i !== index))}
                onChange={(index, value) =>
                  updateList("roomList", (list) => list.map((item, i) => (i === index ? value : item)))
                }
              />

              <StringListField
                label="includesList"
                values={form.watch("amenities.includesList")}
                onAdd={() => updateList("includesList", (list) => [...list, ""])}
                onRemove={(index) =>
                  updateList("includesList", (list) => list.filter((_, i) => i !== index))
                }
                onChange={(index, value) =>
                  updateList("includesList", (list) => list.map((item, i) => (i === index ? value : item)))
                }
              />

              <StringListField
                label="optionalGrid (máx. 6 URLs)"
                values={form.watch("amenities.optionalGrid")}
                onAdd={() =>
                  updateList("optionalGrid", (list) => (list.length < 6 ? [...list, ""] : list))
                }
                onRemove={(index) =>
                  updateList("optionalGrid", (list) => list.filter((_, i) => i !== index))
                }
                onChange={(index, value) =>
                  updateList("optionalGrid", (list) => list.map((item, i) => (i === index ? value : item)))
                }
              />

              <StringListField
                label="notIncludedList"
                values={form.watch("amenities.notIncludedList")}
                onAdd={() => updateList("notIncludedList", (list) => [...list, ""])}
                onRemove={(index) =>
                  updateList("notIncludedList", (list) => list.filter((_, i) => i !== index))
                }
                onChange={(index, value) =>
                  updateList("notIncludedList", (list) => list.map((item, i) => (i === index ? value : item)))
                }
              />

            <div className="md:col-span-2">
              <StringListField
                label="requirementsList"
                values={form.watch("amenities.requirementsList")}
                onAdd={() => updateList("requirementsList", (list) => [...list, ""])}
                onRemove={(index) =>
                  updateList("requirementsList", (list) => list.filter((_, i) => i !== index))
                }
                onChange={(index, value) =>
                  updateList("requirementsList", (list) => list.map((item, i) => (i === index ? value : item)))
                }
              />
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/experiences">Cancelar / Volver</Link>
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
      </div>

      {statusMessage ? <p className="text-sm text-slate-700">{statusMessage}</p> : null}
    </form>
  );
}
