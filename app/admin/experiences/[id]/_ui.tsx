import type { ComponentProps, ReactNode } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";

export { FormTextarea as Textarea } from "@/components/admin/FormTextarea";

export function TabsList({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={`inline-flex w-full flex-wrap gap-2 rounded-lg border border-classic-gold/30 bg-elegant-beige/20 p-2 ${className}`}
      {...props}
    />
  );
}

export function TabsTrigger({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={`rounded-md px-3 py-2 text-sm font-medium text-expery-blue transition data-[state=active]:bg-classic-gold data-[state=active]:text-white ${className}`}
      {...props}
    />
  );
}

export function TabsContent({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={`mt-4 space-y-4 rounded-lg border border-classic-gold/20 p-5 ${className}`}
      {...props}
    />
  );
}

export function ListSection({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-classic-gold/20 p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-expery-blue">{title}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAdd}
          className="text-classic-gold hover:bg-classic-gold/10 hover:text-classic-gold"
        >
          + Agregar
        </Button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="shrink-0 text-expery-blue hover:bg-expery-blue/10"
    >
      Quitar
    </Button>
  );
}
