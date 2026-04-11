"use server"

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { HomeDataSchema } from '@/schemas/page-settings';
import type { HomeData } from '@/types/home';

export async function saveHomeContent(formData: HomeData) {
  const parsed = HomeDataSchema.safeParse(formData);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | ");
    return { success: false, message: `Validación fallida — ${issues}` };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonPayload = parsed.data as any;
    await prisma.pageSettings.upsert({
      where: { id: "home" },
      update: { data: jsonPayload },
      create: { id: "home", data: jsonPayload },
    });

    revalidatePath('/');
    return { success: true, message: "¡Cambios publicados con éxito!" };
  } catch (error) {
    return { success: false, message: `Error al guardar los cambios: ${error}` };
  }
}