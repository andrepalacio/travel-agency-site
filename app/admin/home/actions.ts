"use server"

import { revalidatePath } from 'next/cache';
import { HomeData } from '@/types/home';

export async function saveHomeContent(formData: HomeData) {
  try {
    // SIMULACIÓN DE GUARDADO EN DB (Aquí iría tu Prisma o Supabase)
    // await db.pageSettings.update({ where: { id: 'home' }, data: formData });
    
    console.log("Guardando en la base de datos:", formData);

    // Espera artificial para ver el estado de carga
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // IMPORTANTE: Limpia la caché de la página de inicio para que
    // los visitantes vean los cambios de inmediato.
    revalidatePath('/');
    
    return { success: true, message: "¡Cambios publicados con éxito!" };
  } catch (error) {
    return { success: false, message: `Error al guardar los cambios: ${error}` };
  }
}