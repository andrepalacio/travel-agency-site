// app/actions/register-potential.ts
"use server";

import prisma from "@/lib/prisma";

export async function registerPotentialLead(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const brochureId = formData.get("brochureId") as string;

  try {
    const nuevoRegistro = await prisma.potentialLead.create({
      data: {
        nombre,
        email,
        brochureId,
      },
    });

    // Aquí podrías disparar la lógica de envío de correo
    console.log("Notificación registrada para:", nuevoRegistro.email);
    
    return { success: true };
  } catch (error) {
    console.error("Error al registrar potential lead:", error);
    return { success: false };
  }
}