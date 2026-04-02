"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { ExperienceSchema } from "@/schemas/experience";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ExperienceDataSchema = ExperienceSchema.pick({
  slug: true,
  title: true,
  isFeatured: true,
  imageUrl: true,
  intro: true,
  itinerary: true,
  amenities: true,
});

export type ExperienceData = z.infer<typeof ExperienceDataSchema>;

export async function processBase64Image(image: string): Promise<string> {
  if (!image.startsWith("data:image")) {
    return image;
  }

  const match = image.match(/^data:(image\/[\w.+-]+);base64,(.+)$/s);

  if (!match) {
    throw new Error("Formato de imagen base64 inválido.");
  }

  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, "base64");

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "experiences",
  );

  await mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return `/uploads/experiences/${fileName}`;
}

async function processExperienceImages(data: ExperienceData): Promise<ExperienceData> {
  const [
    imageUrl,
    introImageLeft,
    introImageRight,
    itineraryMainImage,
    itineraryMapImage,
    amenitiesRoomImage,
    amenitiesIncludesImage,
  ] = await Promise.all([
    processBase64Image(data.imageUrl),
    processBase64Image(data.intro.imageLeft),
    processBase64Image(data.intro.imageRight),
    processBase64Image(data.itinerary.mainImage),
    processBase64Image(data.itinerary.mapImage),
    processBase64Image(data.amenities.roomImage),
    processBase64Image(data.amenities.includesImage),
  ]);

  return {
    ...data,
    imageUrl,
    intro: {
      ...data.intro,
      imageLeft: introImageLeft,
      imageRight: introImageRight,
    },
    itinerary: {
      ...data.itinerary,
      mainImage: itineraryMainImage,
      mapImage: itineraryMapImage,
    },
    amenities: {
      ...data.amenities,
      roomImage: amenitiesRoomImage,
      includesImage: amenitiesIncludesImage,
    },
  };
}

export async function updateExperience(
  id: string,
  data: ExperienceData,
): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = ExperienceDataSchema.parse(data);
    const processed = await processExperienceImages(parsed);

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        slug: processed.slug,
        title: processed.title,
        isFeatured: processed.isFeatured,
        imageUrl: processed.imageUrl,
        intro: processed.intro,
        itinerary: processed.itinerary,
        amenities: processed.amenities,
      },
    });

    revalidatePath("/admin/experiences");
    revalidatePath(`/experiences/${updated.slug}`);

    return { success: true, message: "Experiencia actualizada correctamente." };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, message: "No se pudo actualizar la experiencia." };
  }
}

export async function createExperience(
  data: ExperienceData,
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const parsed = ExperienceDataSchema.parse(data);
    const processed = await processExperienceImages(parsed);

    const created = await prisma.experience.create({
      data: {
        slug: processed.slug,
        title: processed.title,
        isFeatured: processed.isFeatured,
        imageUrl: processed.imageUrl,
        intro: processed.intro,
        itinerary: processed.itinerary,
        amenities: processed.amenities,
      },
    });

    revalidatePath("/admin/experiences");
    revalidatePath(`/experiences/${created.slug}`);

    return {
      success: true,
      message: "Experiencia creada correctamente.",
      id: created.id,
    };
  } catch (error) {
    console.error("Error creating experience:", error);
    return { success: false, message: "No se pudo crear la experiencia." };
  }
}
