import { z } from "zod";

export const ContactSchema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  apellido: z.string().min(2, "El apellido es muy corto"),
  fechaNacimiento: z.string().min(1, "La fecha es requerida"),
  email: z.email("Correo electrónico inválido"),
  confirmarEmail: z.email("La confirmación es inválida"),
  celular: z.string().optional(),
  interesSeleccionado: z.string().min(1, "Debes seleccionar una opción de interés"),
}).refine((data) => data.email === data.confirmarEmail, {
  message: "Los correos electrónicos no coinciden",
  path: ["confirmarEmail"],
});

export type ContactFormValues = z.infer<typeof ContactSchema>;