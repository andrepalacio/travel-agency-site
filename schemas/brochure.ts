import { z } from "zod";

export const BrochureSchema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  email: z.email("Correo electrónico inválido"),
  brochureId: z.string().min(1, "Debes seleccionar una experiencia"),
});

export type BrochureFormValues = z.infer<typeof BrochureSchema>;