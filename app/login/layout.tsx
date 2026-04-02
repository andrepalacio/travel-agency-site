import { ReactNode } from "react";

/**
 * Layout para la página de login.
 * No usa el layout principal del admin para evitar bucles de redirección.
 */
export default function LoginLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
