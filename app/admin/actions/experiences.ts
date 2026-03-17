"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveExperience(slug: string, rawData: any) {
  try {
    const updated = await prisma.experience.upsert({
      where: { slug },
      update: {
        title: rawData.title,
        intro: rawData.intro,
        itinerary: rawData.itinerary,
        amenities: rawData.amenities,
        imageUrl: rawData.imageUrl,
      },
      create: {
        slug,
        title: rawData.title,
        intro: rawData.intro,
        itinerary: rawData.itinerary,
        amenities: rawData.amenities,
        imageUrl: rawData.imageUrl,
      }
    });

    revalidatePath(`/experiencias/${slug}`);
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: "Error al persistir en Postgres" };
  }
}