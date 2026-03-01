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

export function ContactForm({ experiences }: { readonly experiences: string[] }) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      email: "",
      confirmarEmail: "",
      celular: "",
      experiencia: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      // Aquí llamaremos a la Server Action más adelante
      console.log("Datos enviados:", data);
      toast.success("¡Mensaje enviado! Nos contactaremos pronto.");
      form.reset();
    } catch (error) {
      toast.error("Hubo un error al enviar el formulario.");
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
                <FormLabel className="text-xs uppercase font-bold text-slate-500">
                  Nombre
                </FormLabel>
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
                <FormLabel className="text-xs uppercase font-bold text-slate-500">
                  Apellido
                </FormLabel>
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
              <FormLabel className="text-xs uppercase font-bold text-slate-500">
                Fecha de Nacimiento
              </FormLabel>
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
              <FormLabel className="text-xs uppercase font-bold text-slate-500">
                Correo electrónico
              </FormLabel>
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
              <FormLabel className="text-xs uppercase font-bold text-slate-500">
                Confirmar correo
              </FormLabel>
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
              <FormLabel className="text-xs uppercase font-bold text-slate-500">
                Celular (Opcional)
              </FormLabel>
              <FormControl>
                <Input placeholder="+57 ..." {...field} />
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
              <FormLabel className="text-xs uppercase font-bold text-slate-500">
                Experiencia
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {experiences.map((exp) => (
                    <SelectItem key={exp} value={exp}>
                      {exp}
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
          className="w-full bg-[#333] hover:bg-black text-white py-6 uppercase tracking-widest text-xs font-bold transition-all mt-6"
        >
          Enviar solicitud
        </Button>
      </form>
    </Form>
  );
}
