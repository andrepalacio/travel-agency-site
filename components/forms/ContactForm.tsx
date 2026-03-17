"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactFormValues } from "@/schemas/contact";
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
import { createLead } from "@/app/actions/leads";

const experiences = [
  "Experiencia A",
  "Experiencia B",
  "Experiencia C",
  "Experiencia D",
];
const cruises = ["Crucero X", "Crucero Y", "Crucero Z"];

export function ContactForm({ selectorKey }: { readonly selectorKey: string }) {
  const labelStyle = "text-xs uppercase font-bold text-slate-500";
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      email: "",
      confirmarEmail: "",
      celular: "",
      selector: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      const result = await createLead(data, selectorKey);
      
      if (result.success) {
        toast.success("¡Mensaje enviado! Nos contactaremos pronto.");
        form.reset();
      } else {
        toast.error(result.error || "Algo salió mal.");
      }
    } catch {
      toast.error("Error de conexión con el servidor.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="fechaNacimiento"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Fecha de Nacimiento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
          name="confirmarEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Confirmar correo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Repite tu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="celular"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>Celular (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="+57 ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selector"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>
                {selectorKey === "experiences"
                  ? "Experiencia de interés"
                  : "Crucero de interés"}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(selectorKey === "experiences" ? experiences : cruises).map(
                    (item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#333] hover:bg-black text-white py-6 uppercase tracking-widest text-xs font-bold transition-all mt-6"
        >
          Enviar solicitud
        </Button>
      </form>
    </Form>
  );
}
