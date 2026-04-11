import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").optional().or(z.literal("")),
  rol: z.string().refine((val: string) => ["ADMIN", "EDITOR", "USUARIO"].includes(val), "Rol inválido")
});

export type UserFormValues = z.infer<typeof UserSchema>;