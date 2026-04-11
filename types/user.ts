export const USER_ROLES = ["ADMIN", "EDITOR", "USUARIO"] as const;

export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  rol: string;
  isActive: boolean;
}