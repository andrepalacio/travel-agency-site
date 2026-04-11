import type { ComponentProps } from "react";

/**
 * Textarea estilizado para formularios de administración.
 * Comparte el mismo sistema de focus ring gold que el componente Input.
 */
export function FormTextarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={`w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-classic-gold focus-visible:ring-2 focus-visible:ring-classic-gold/30 ${className}`}
      {...props}
    />
  );
}
