"use server";

import prisma from "@/lib/prisma";
import { ExperienceSchema } from "@/schemas/experience";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ExperienceDataSchema = ExperienceSchema.pick({
  title: true,
  isFeatured: true,
  imageUrl: true,
  intro: true,
  itinerary: true,
  amenities: true,
});

export type ExperienceData = z.infer<typeof ExperienceDataSchema>;

export async function updateExperience(
  id: string,
  data: ExperienceData,
): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = ExperienceDataSchema.parse(data);

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        title: parsed.title,
        isFeatured: parsed.isFeatured,
        imageUrl: parsed.imageUrl,
        intro: parsed.intro,
        itinerary: parsed.itinerary,
        amenities: parsed.amenities,
      },
    });

    revalidatePath("/");
    revalidatePath(`/experiences/${updated.slug}`);

    return { success: true, message: "Experiencia actualizada correctamente." };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, message: "No se pudo actualizar la experiencia." };
  }
}
