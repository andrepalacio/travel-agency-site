"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrochureSchema, BrochureFormValues } from "@/schemas/brochure";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

export function BrochureForm({ experiences }: { readonly experiences: string[] }) {
  const form = useForm<BrochureFormValues>({
    resolver: zodResolver(BrochureSchema),
    defaultValues: {
      nombre: "",
      email: "",
      experiencia: "",
    },
  });

  async function onSubmit(data: BrochureFormValues) {
    try {
      // Lógica de envío (Server Action)
      console.log("Solicitud de Brochure:", data);
      toast.success("¡Brochure enviado! Revisa tu bandeja de entrada.");
      form.reset();
    } catch (error) {
      toast.error("No pudimos procesar tu solicitud.");
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-slate-500 text-sm leading-relaxed px-2">
        Recibe a tu correo electrónico el brochure de tu experiencia de interés
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre completo" className="rounded-none border-t-0 border-x-0 border-b-slate-200 focus-visible:ring-0 focus-visible:border-b-black transition-all" {...field} />
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
                <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@ejemplo.com" className="rounded-none border-t-0 border-x-0 border-b-slate-200 focus-visible:ring-0 focus-visible:border-b-black transition-all" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experiencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Experiencia de interés</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-none border-t-0 border-x-0 border-b-slate-200">
                      <SelectValue placeholder="Selecciona el destino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experiences.map((exp) => (
                      <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#333] hover:bg-[#D4AF37] text-white py-6 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500 mt-8">
            Enviar Brochure
          </Button>
        </form>
      </Form>
    </div>
  );
}