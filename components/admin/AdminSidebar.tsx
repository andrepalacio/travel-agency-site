"use client";
import { useEditor } from "@/context/EditorContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { SaveButton } from "./SaveButton";
import { Separator } from "@/components/ui/separator";

export function AdminSidebar() {
  const { data, updateSection } = useEditor();

  return (
    <div className="space-y-6">
      <SaveButton />
      <Separator />

      {/* Aquí van tus Accordions de Hero, Services, etc. */}
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Secciones de la página
      </div>
      <Accordion type="single" collapsible className="w-full">
        {/* Edición de Hero */}
        <AccordionItem value="hero">
          <AccordionTrigger>Sección Hero</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>URL de la Imagen del Crucero</Label>
              <Input
                value={data.hero.shipImageUrl}
                onChange={(e) =>
                  updateSection("hero", { shipImageUrl: e.target.value })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Edición de Servicios */}
        <AccordionItem value="services">
          <AccordionTrigger>Sección Servicios</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Título de la sección</Label>
              <Input
                value={data.services.title}
                onChange={(e) =>
                  updateSection("services", { title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Descripción corta</Label>
              <Input
                value={data.services.description}
                onChange={(e) =>
                  updateSection("services", { description: e.target.value })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
