"use server";

import { transporter } from "@/lib/mailer";
import { leadAlertTemplate, brochureCustomerTemplate } from "@/lib/email-templates";
import prisma from "@/lib/prisma";
import { ContactFormValues } from "@/schemas/contact";
import { BrochureFormValues } from "@/schemas/brochure";

// Acción para Leads (Ventas)
export async function createLead(data: ContactFormValues) {
  try {
    const { confirmarEmail, ...leadData } = data;
    if (data.email !== confirmarEmail) {
      throw new Error("Los emails no coinciden.");
    }

    const lead = await prisma.lead.create({ 
      data: leadData
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SALES,
      subject: `Nuevo Lead: ${data.nombre} ${data.apellido}`,
      html: leadAlertTemplate({ ...data }),
    });

    return { success: true, lead: lead };
  } catch (error) {
    console.log(error);
    return { error: "Error en el proceso." };
  }
}

// Acción para Potential Leads (Brochure)
export async function registerPotentialLead(data: BrochureFormValues) {
  try {
    const brochureId = Number(data.brochureId);
    const brochure = await prisma.brochure.findUnique({ where: { id: brochureId } });
    if (!brochure) {
      throw new Error("Información solicitada no encontrada.");
    }
    
    await prisma.potentialLead.create({ data: { ...data, brochureId: brochureId } });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: `Tu información sobre ${brochure.name}`,
      html: brochureCustomerTemplate(data.nombre, brochure.name, brochure.fileUrl),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Error al enviar el brochure." };
  }
}