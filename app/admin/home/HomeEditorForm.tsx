"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeDataSchema, type HomeData } from "@/schemas/page-settings";
import { saveHomeContent } from "@/app/admin/actions/actions";

type HomeEditorFormProps = {
  initialData: HomeData;
};

export default function HomeEditorForm({ initialData }: HomeEditorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<HomeData>({
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
          <label className="flex flex-col gap-2 text-sm font-medium">
            Ship Image URL
            <input
              type="text"
              {...register("hero.shipImageUrl")}
              className="rounded-md border px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Explore Link
            <input
              type="text"
              {...register("hero.exploreLink")}
              className="rounded-md border px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
            Info Link
            <input
              type="text"
              {...register("hero.infoLink")}
              className="rounded-md border px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Services</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Title
            <input
              type="text"
              {...register("services.title")}
              className="rounded-md border px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
            Description
            <textarea
              {...register("services.description")}
              className="min-h-24 rounded-md border px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-5 space-y-4">
          <h3 className="text-base font-semibold">Cards</h3>
          {initialData.services.cards.map((_, index) => (
            <div key={index} className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-medium">
                ID
                <input
                  type="text"
                  {...register(`services.cards.${index}.id`)}
                  className="rounded-md border px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Image
                <input
                  type="text"
                  {...register(`services.cards.${index}.image`)}
                  className="rounded-md border px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Title
                <input
                  type="text"
                  {...register(`services.cards.${index}.title`)}
                  className="rounded-md border px-3 py-2"
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Contact</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Left Title
            <input
              type="text"
              {...register("contact.leftTitle")}
              className="rounded-md border px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
            Left Description
            <textarea
              {...register("contact.leftDescription")}
              className="min-h-24 rounded-md border px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium md:col-span-2">
            Circle Title
            <input
              type="text"
              {...register("contact.circleTitle")}
              className="rounded-md border px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-5 space-y-4">
          <h3 className="text-base font-semibold">Socials</h3>
          {initialData.contact.socials.map((_, index) => (
            <div key={index} className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Platform
                <input
                  type="text"
                  {...register(`contact.socials.${index}.platform`)}
                  className="rounded-md border px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Label
                <input
                  type="text"
                  {...register(`contact.socials.${index}.label`)}
                  className="rounded-md border px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                URL
                <input
                  type="text"
                  {...register(`contact.socials.${index}.url`)}
                  className="rounded-md border px-3 py-2"
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
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>
        {statusMessage ? <p className="text-sm text-slate-700">{statusMessage}</p> : null}
      </div>
    </form>
  );
}
