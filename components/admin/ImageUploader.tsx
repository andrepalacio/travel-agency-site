"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Loader2, X } from "lucide-react";

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  label: string;
};

async function compressImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo cargar la imagen."));
    img.src = dataUrl;
  });

  const maxWidth = 1200;
  const scale = image.width > maxWidth ? maxWidth / image.width : 1;
  const targetWidth = Math.round(image.width * scale);
  const targetHeight = Math.round(image.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo inicializar el canvas.");
  }

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  const preferredType = "image/webp";
  const fallbackType = "image/jpeg";

  let compressed = canvas.toDataURL(preferredType, 0.8);
  if (!compressed.startsWith("data:image/webp")) {
    compressed = canvas.toDataURL(fallbackType, 0.8);
  }

  return compressed;
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const inputId = useId();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const compressedUrl = await compressImage(file);
      onChange(compressedUrl);
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    } finally {
      setIsProcessing(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="text-sm font-medium text-expery-blue">
        {label}
      </label>

      <div
        className={`rounded-xl p-4 ${
          value
            ? "border border-classic-gold/30 bg-elegant-beige/30"
            : "border-2 border-dashed border-expery-iron/30 bg-white"
        }`}
      >
        {value ? (
          <div className="space-y-3">
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-100">
              <img src={value} alt={label} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-expery-blue/80 text-white transition hover:bg-expery-blue"
                aria-label="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label htmlFor={inputId}>
              <Button type="button" variant="outline" className="w-full cursor-pointer border-classic-gold/30 text-expery-blue hover:bg-classic-gold/10" asChild>
                <span>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Cambiar imagen
                </span>
              </Button>
            </label>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 text-expery-iron"
          >
            <UploadCloud className="h-9 w-9 text-classic-gold" />
            <span className="text-sm font-medium">Subir imagen</span>
            <span className="text-xs text-expery-iron/70">Se comprimirá automáticamente (máx. 1200px)</span>
          </label>
        )}

        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </div>

      {isProcessing && (
        <div className="flex items-center gap-2 text-sm text-classic-gold">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Procesando imagen...</span>
        </div>
      )}
    </div>
  );
}
