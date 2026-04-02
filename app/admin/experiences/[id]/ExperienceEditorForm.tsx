"use client";

import { type ComponentProps, type ReactNode, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs as TabsPrimitive } from "radix-ui";

import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExperienceSchema, type ExperienceData } from "@/schemas/experience";

type ExperienceEditorFormProps = {
  defaultValues: ExperienceData;
  onSave: (values: ExperienceData) => Promise<void> | void;
  isEditing: boolean;
};

function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={`w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30 ${className}`}
      {...props}
    />
  );
}

function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={className} {...props} />;
}

function TabsList({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={`inline-flex w-full flex-wrap gap-2 rounded-lg border border-classic-gold/30 bg-elegant-beige/20 p-2 ${className}`}
      {...props}
    />
  );
}

function TabsTrigger({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={`rounded-md px-3 py-2 text-sm font-medium text-expery-blue transition data-[state=active]:bg-classic-gold data-[state=active]:text-white ${className}`}
      {...props}
    />
  );
}

function TabsContent({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={`mt-4 ${className}`} {...props} />;
}

function ListSection({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-classic-gold/20 p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-expery-blue">{title}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAdd}
          className="text-classic-gold hover:bg-classic-gold/10 hover:text-classic-gold"
        >
          + Agregar
        </Button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function ExperienceEditorForm({
  defaultValues,
  onSave,
  isEditing,
}: ExperienceEditorFormProps) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ExperienceData>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues,
  });

  const stopsArray = useFieldArray({ control: form.control, name: "itinerary.stops" });
  const roomListArray = useFieldArray({ control: form.control as never, name: "amenities.roomList" as never });
  const conciergeListArray = useFieldArray({
    control: form.control as never,
    name: "amenities.conciergeList" as never,
  });
  const includesListArray = useFieldArray({
    control: form.control as never,
    name: "amenities.includesList" as never,
  });
  const notIncludedListArray = useFieldArray({
    control: form.control as never,
    name: "amenities.notIncludedList" as never,
  });
  const requirementsListArray = useFieldArray({
    control: form.control as never,
    name: "amenities.requirementsList" as never,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="intro">Intro</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 rounded-lg border border-classic-gold/20 p-5">
          <h3 className="title-h3 text-expery-blue">General</h3>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Título</span>
            <Input {...form.register("title")} className="focus-visible:ring-classic-gold/40" />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Slug</span>
            <Input
              {...form.register("slug")}
              readOnly={isEditing}
              className="focus-visible:ring-classic-gold/40"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-expery-blue">
            <input type="checkbox" {...form.register("isFeatured")} className="accent-classic-gold" />
            Destacada
          </label>

          <Controller
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <ImageUploader label="Imagen principal" value={field.value || ""} onChange={field.onChange} />
            )}
          />
        </TabsContent>

        <TabsContent value="intro" className="space-y-4 rounded-lg border border-classic-gold/20 p-5">
          <h3 className="title-h3 text-expery-blue">Intro</h3>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Días / Noches</span>
            <Input {...form.register("intro.daysNights")} className="focus-visible:ring-classic-gold/40" />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Slogan</span>
            <Textarea {...form.register("intro.slogan")} rows={3} />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Descripción</span>
            <Textarea {...form.register("intro.description")} rows={5} />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              control={form.control}
              name="intro.imageLeft"
              render={({ field }) => (
                <ImageUploader label="Imagen izquierda" value={field.value || ""} onChange={field.onChange} />
              )}
            />
            <Controller
              control={form.control}
              name="intro.imageRight"
              render={({ field }) => (
                <ImageUploader label="Imagen derecha" value={field.value || ""} onChange={field.onChange} />
              )}
            />
          </div>
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-4 rounded-lg border border-classic-gold/20 p-5">
          <h3 className="title-h3 text-expery-blue">Itinerary</h3>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Gold message</span>
            <Input
              {...form.register("itinerary.goldMessage")}
              className="focus-visible:ring-classic-gold/40"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm text-expery-blue">Salida</span>
              <Input
                {...form.register("itinerary.departure")}
                className="focus-visible:ring-classic-gold/40"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-expery-blue">Llegada</span>
              <Input
                {...form.register("itinerary.arrival")}
                className="focus-visible:ring-classic-gold/40"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              control={form.control}
              name="itinerary.mainImage"
              render={({ field }) => (
                <ImageUploader
                  label="Imagen principal del itinerario"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={form.control}
              name="itinerary.mapImage"
              render={({ field }) => (
                <ImageUploader label="Imagen de mapa" value={field.value || ""} onChange={field.onChange} />
              )}
            />
          </div>

          <ListSection
            title="Paradas"
            onAdd={() => stopsArray.append({ name: "", lat: 0, lng: 0 })}
          >
            {stopsArray.fields.length === 0 ? (
              <p className="text-sm text-expery-blue/70">Sin paradas cargadas.</p>
            ) : (
              stopsArray.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-2 rounded-md border border-expery-blue/15 p-3 md:grid-cols-[1fr_140px_140px_auto]"
                >
                  <Input
                    placeholder="Nombre"
                    {...form.register(`itinerary.stops.${index}.name`)}
                    className="focus-visible:ring-classic-gold/40"
                  />
                  <Input
                    type="number"
                    step="any"
                    placeholder="Lat"
                    {...form.register(`itinerary.stops.${index}.lat`, { valueAsNumber: true })}
                    className="focus-visible:ring-classic-gold/40"
                  />
                  <Input
                    type="number"
                    step="any"
                    placeholder="Lng"
                    {...form.register(`itinerary.stops.${index}.lng`, { valueAsNumber: true })}
                    className="focus-visible:ring-classic-gold/40"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => stopsArray.remove(index)}
                    className="text-expery-blue hover:bg-expery-blue/10"
                  >
                    Quitar
                  </Button>
                </div>
              ))
            )}
          </ListSection>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4 rounded-lg border border-classic-gold/20 p-5">
          <h3 className="title-h3 text-expery-blue">Amenities</h3>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Título de habitaciones</span>
            <Input {...form.register("amenities.roomTitle")} className="focus-visible:ring-classic-gold/40" />
          </label>

          <Controller
            control={form.control}
            name="amenities.roomImage"
            render={({ field }) => (
              <ImageUploader label="Imagen de habitaciones" value={field.value || ""} onChange={field.onChange} />
            )}
          />

          <ListSection title="Lista de habitaciones" onAdd={() => roomListArray.append("")}>
            {roomListArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...form.register(`amenities.roomList.${index}`)}
                  className="focus-visible:ring-classic-gold/40"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => roomListArray.remove(index)}
                  className="text-expery-blue hover:bg-expery-blue/10"
                >
                  Quitar
                </Button>
              </div>
            ))}
          </ListSection>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Título de concierge</span>
            <Input
              {...form.register("amenities.conciergeTitle")}
              className="focus-visible:ring-classic-gold/40"
            />
          </label>

          <ListSection title="Lista concierge" onAdd={() => conciergeListArray.append("")}>
            {conciergeListArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...form.register(`amenities.conciergeList.${index}`)}
                  className="focus-visible:ring-classic-gold/40"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => conciergeListArray.remove(index)}
                  className="text-expery-blue hover:bg-expery-blue/10"
                >
                  Quitar
                </Button>
              </div>
            ))}
          </ListSection>

          <label className="block space-y-2">
            <span className="text-sm text-expery-blue">Título de incluidos</span>
            <Input
              {...form.register("amenities.includesTitle")}
              className="focus-visible:ring-classic-gold/40"
            />
          </label>

          <Controller
            control={form.control}
            name="amenities.includesImage"
            render={({ field }) => (
              <ImageUploader label="Imagen de incluidos" value={field.value || ""} onChange={field.onChange} />
            )}
          />

          <ListSection title="Lista de incluidos" onAdd={() => includesListArray.append("")}>
            {includesListArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...form.register(`amenities.includesList.${index}`)}
                  className="focus-visible:ring-classic-gold/40"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => includesListArray.remove(index)}
                  className="text-expery-blue hover:bg-expery-blue/10"
                >
                  Quitar
                </Button>
              </div>
            ))}
          </ListSection>

          <ListSection title="No incluido" onAdd={() => notIncludedListArray.append("")}>
            {notIncludedListArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...form.register(`amenities.notIncludedList.${index}`)}
                  className="focus-visible:ring-classic-gold/40"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => notIncludedListArray.remove(index)}
                  className="text-expery-blue hover:bg-expery-blue/10"
                >
                  Quitar
                </Button>
              </div>
            ))}
          </ListSection>

          <ListSection title="Requisitos" onAdd={() => requirementsListArray.append("")}>
            {requirementsListArray.fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...form.register(`amenities.requirementsList.${index}`)}
                  className="focus-visible:ring-classic-gold/40"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => requirementsListArray.remove(index)}
                  className="text-expery-blue hover:bg-expery-blue/10"
                >
                  Quitar
                </Button>
              </div>
            ))}
          </ListSection>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} className="btn-primary">
          {isSaving ? "Guardando..." : "Guardar experiencia"}
        </Button>
      </div>
    </form>
  );
}
