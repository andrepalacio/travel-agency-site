import Link from "next/link";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import ExperienceEditorForm from "./ExperienceEditorForm";
import { createExperience, updateExperience } from "./actions";
import type { ExperienceData } from "@/schemas/experience";

type ExperienceEditorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceEditorPage({ params }: ExperienceEditorPageProps) {
  const { id } = await params;
  const isEditing = id !== "new";

  const emptyDefaults: ExperienceData = {
    slug: "",
    title: "",
    isFeatured: false,
    imageUrl: "",
    intro: {
      slogan: "",
      daysNights: "",
      description: "",
      imageLeft: "",
      imageRight: "",
    },
    itinerary: {
      goldMessage: "",
      mainImage: "",
      departure: "",
      arrival: "",
      mapImage: "",
      stops: [],
    },
    amenities: {
      roomTitle: "",
      roomList: [],
      roomImage: "",
      conciergeTitle: "",
      conciergeList: [],
      includesTitle: "",
      includesImage: "",
      includesList: [],
      notIncludedList: [],
      requirementsList: [],
    },
  };

  const parseJsonField = <T,>(fieldName: string, value: unknown): T => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value) as T;
      } catch {
        throw new Error(`No se pudo parsear el campo JSON \"${fieldName}\".`);
      }
    }

    return value as T;
  };

  if (!isEditing) {
    async function handleSave(values: ExperienceData) {
      "use server";

      const result = await createExperience(values);

      if (!result.success) {
        throw new Error(result.message);
      }

      redirect("/admin/experiences");
    }

    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="title-h3 text-expery-blue">Nueva Experiencia</h1>

          <Link href="/admin/experiences" className="text-classic-gold hover:underline">
            Volver al listado
          </Link>
        </div>

        <ExperienceEditorForm defaultValues={emptyDefaults} onSave={handleSave} isEditing={false} />
      </div>
    );
  }

  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <h1 className="title-h3 text-expery-blue">Experiencia no encontrada</h1>
        <p className="text-expery-blue/80">No existe una experiencia con el id solicitado.</p>
        <Link href="/admin/experiences" className="text-classic-gold hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  let defaultValues: ExperienceData;

  try {
    const intro = parseJsonField<ExperienceData["intro"]>("intro", experience.intro);
    const itinerary = parseJsonField<ExperienceData["itinerary"]>("itinerary", experience.itinerary);
    const amenities = parseJsonField<ExperienceData["amenities"]>("amenities", experience.amenities);

    defaultValues = {
      slug: experience.slug,
      title: experience.title,
      isFeatured: experience.isFeatured,
      imageUrl: experience.imageUrl,
      intro: {
        ...emptyDefaults.intro,
        ...intro,
      },
      itinerary: {
        ...emptyDefaults.itinerary,
        ...itinerary,
      },
      amenities: {
        ...emptyDefaults.amenities,
        ...amenities,
      },
    };
  } catch (error) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <h1 className="title-h3 text-expery-blue">Error de parseo JSON</h1>
        <p className="text-expery-blue/80">
          {error instanceof Error
            ? error.message
            : "No se pudieron interpretar correctamente los datos JSON de la experiencia."}
        </p>
        <Link href="/admin/experiences" className="text-classic-gold hover:underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  async function handleSave(values: ExperienceData) {
    "use server";

    const result = await updateExperience(id, values);

    if (!result.success) {
      throw new Error(result.message);
    }

    redirect("/admin/experiences");
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="title-h3 text-expery-blue">{experience.title}</h1>
          <p className="text-expery-blue/80">Editar experiencia</p>
        </div>

        <Link href="/admin/experiences" className="text-classic-gold hover:underline">
          Volver al listado
        </Link>
      </div>

      <ExperienceEditorForm defaultValues={defaultValues} onSave={handleSave} isEditing />
    </div>
  );
}
