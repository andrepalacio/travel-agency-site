"use server"

import { ContactFormValues } from "@/schemas/contact";

export async function sendContactEmail(data: ContactFormValues) {
  // 1. Validar los datos nuevamente en el servidor (Seguridad extra)
  
  // 2. Aquí iría la integración con tu servicio (Resend, SendGrid, etc.)
  // await resend.emails.send({ ... });

  console.log("Simulando envío de correo para:", data.email);

  return { success: true };
}