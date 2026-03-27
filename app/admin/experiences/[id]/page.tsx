import Link from "next/link";

import prisma from "@/lib/prisma";
import type { DetailedExperience } from "@/types/experience";
import ExperienceEditorForm from "./ExperienceEditorForm";

type ExperienceEditorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceEditorPage({ params }: ExperienceEditorPageProps) {
  const { id } = await params;

  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <h1 className="text-2xl font-bold tracking-tight">Experiencia no encontrada</h1>
        <p className="text-slate-600">No existe una experiencia con el id solicitado.</p>
        <Link
          href="/admin/experiences"
          className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  const detailedExperience: DetailedExperience = {
    title: experience.title,
    intro: {
      ...(experience.intro as DetailedExperience["intro"]),
      daysNights: "",
      slogan: "",
      description: "",
      imageLeft: "",
      imageRight: "",
    },
    itinerary: {
      ...(experience.itinerary as DetailedExperience["itinerary"]),
      goldMessage: "",
      mainImage: "",
      departure: "",
      arrival: "",
      mapImage: "",
    },
    amenities: {
      ...(experience.amenities as DetailedExperience["amenities"]),
      roomTitle: "",
      roomList: [],
      roomImage: "",
      includesTitle: "",
      includesImage: "",
      includesList: [],
      optionalGrid: [],
      notIncludedList: [],
      requirementsList: [],
    },
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar experiencia</h1>
          <p className="text-slate-600">{experience.title}</p>
        </div>

        <Link
          href="/admin/experiences"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Cancelar / Volver
        </Link>
      </div>

      <ExperienceEditorForm
        id={experience.id}
        isEditing
        initialData={{
          title: experience.title,
          slug: experience.slug,
          isFeatured: experience.isFeatured,
          imageUrl: experience.imageUrl,
          details: detailedExperience,
        }}
      />
    </div>
  );
}
