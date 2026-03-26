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

export function ContactForm({ type, selector }: { readonly type: string; readonly selector: readonly { title: string }[] }) {
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
      interesSeleccionado: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      const result = await createLead(data);

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
                <Input type="date" {...field} className="cursor-pointer"/>
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
          name="interesSeleccionado"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyle}>
                {type === "experience"
                  ? "Experiencia de interés"
                  : "Crucero de interés"}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {selector.map((item) => (
                    <SelectItem key={item.title} value={item.title}>
                      {item.title}
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
          className="btn-primary w-full"
        >
          Enviar solicitud
        </Button>
      </form>
    </Form>
  );
}
