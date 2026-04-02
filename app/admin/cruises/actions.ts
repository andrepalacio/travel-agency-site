"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";

const CruiseSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  imageUrl: z.string().min(1, "La imagen es requerida"),
  ctaText: z.string().min(1, "El texto del botón es requerido"),
  order: z.number().int().default(0),
});

export type CruiseData = z.infer<typeof CruiseSchema>;

async function processBase64Image(image: string): Promise<string> {
  if (!image.startsWith("data:image")) {
    return image;
  }

  const match = image.match(/^data:(image\/[\w.+-]+);base64,(.+)$/s);
  if (!match) {
    throw new Error("Formato de imagen base64 inválido.");
  }

  const buffer = Buffer.from(match[2], "base64");
  const uploadDir = path.join(process.cwd(), "public", "uploads", "ships");

  await mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return `/uploads/ships/${fileName}`;
}

export async function createCruise(
  data: CruiseData,
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const parsed = CruiseSchema.parse(data);
    const imageUrl = await processBase64Image(parsed.imageUrl);

    const created = await prisma.cruise.create({
      data: {
        ...parsed,
        imageUrl,
      },
    });

    revalidatePath("/admin/cruises");

    return { success: true, message: "Crucero creado correctamente.", id: created.id };
  } catch (error) {
    console.error("Error creating cruise:", error);
    return { success: false, message: "No se pudo crear el crucero." };
  }
}

export async function updateCruise(
  id: string,
  data: CruiseData,
): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = CruiseSchema.parse(data);
    const imageUrl = await processBase64Image(parsed.imageUrl);

    await prisma.cruise.update({
      where: { id },
      data: {
        ...parsed,
        imageUrl,
      },
    });

    revalidatePath("/admin/cruises");

    return { success: true, message: "Crucero actualizado correctamente." };
  } catch (error) {
    console.error("Error updating cruise:", error);
    return { success: false, message: "No se pudo actualizar el crucero." };
  }
}

export async function deleteCruise(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.cruise.delete({ where: { id } });
    revalidatePath("/admin/cruises");
    return { success: true, message: "Crucero eliminado correctamente." };
  } catch (error) {
    console.error("Error deleting cruise:", error);
    return { success: false, message: "No se pudo eliminar el crucero." };
  }
}
