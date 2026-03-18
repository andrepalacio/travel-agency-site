"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrochureSchema, BrochureFormValues } from "@/schemas/brochure";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { registerPotentialLead } from "@/app/actions/leads";

export function BrochureForm({
  brochures,
}: {
  readonly brochures: readonly { id: number; name: string }[];
}) {
  const labelStyle = "text-xs uppercase font-bold text-slate-500";
  const form = useForm<BrochureFormValues>({
    resolver: zodResolver(BrochureSchema),
    defaultValues: {
      nombre: "",
      email: "",
      brochureId: "1",
    },
  });

  async function onSubmit(data: BrochureFormValues) {
    try {
      const result = await registerPotentialLead(data);

      if (result.success) {
        toast.success("¡Brochure enviado! Revisa tu bandeja de entrada.", {
          position: "top-center",
        });
        form.reset();
      } else {
        toast.error(result.error || "Algo salió mal.", {
          position: "top-center",
        });
      }
    } catch {
      toast.error("No pudimos procesar tu solicitud.", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@ejemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brochureId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>
                  Información de interés
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Selecciona el destino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">
                      Brochure general de Expery Travel
                    </SelectItem>
                    {brochures.map((brochure) => (
                      <SelectItem key={brochure.id} value={String(brochure.id)}>
                        {brochure.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-expery-blue hover:bg-expery-iron text-white py-6 uppercase tracking-widest text-xs font-bold transition-all mt-6 cursor-pointer"
          >
            Enviar Brochure
          </Button>
        </form>
      </Form>
    </div>
  );
}
