export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  rol: "ADMIN" | "EDITOR" | "USUARIO";
  isActive: boolean;
}