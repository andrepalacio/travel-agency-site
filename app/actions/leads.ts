"use server";

import { transporter } from "@/lib/mailer";
import { leadAlertTemplate, brochureCustomerTemplate } from "@/lib/email-templates";
import prisma from "@/lib/prisma";

// Acción para Leads (Ventas)
export async function createLead(data: any, selectorType: string) {
  try {
    const lead = await prisma.lead.create({ 
      data: { ...data, tipoInteres: selectorType } 
    });

    // Enviar correo a VENTAS
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SALES,
      subject: `Nuevo Lead: ${data.nombre} ${data.apellido}`,
      html: leadAlertTemplate({ ...data, tipoInteres: selectorType }),
    });

    return { success: true };
  } catch (error) {
    return { error: "Error en el proceso." };
  }
}

// Acción para Potential Leads (Brochure)
export async function registerPotentialLead(data: { nombre: string, email: string, brochureId: string }) {
  try {
    await prisma.potentialLead.create({ data });

    // Enviar correo al CLIENTE
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: `Tu información sobre ${data.brochureId}`,
      html: brochureCustomerTemplate(data.nombre, data.brochureId),
    });

    return { success: true };
  } catch (error) {
    return { error: "Error al enviar el brochure." };
  }
}