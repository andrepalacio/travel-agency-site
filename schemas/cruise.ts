import { z } from "zod";

export const CruiseSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  imageUrl: z.string().min(1, "La imagen es requerida"),
  ctaText: z.string().min(1, "El texto del botón es requerido"),
  order: z.number().int().default(0),
});