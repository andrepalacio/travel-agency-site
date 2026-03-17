"use client"
import { useState } from "react";
import { uploadImage } from "@/app/admin/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";

export function ImageUploader({ onUploadComplete, currentImage }: { 
  onUploadComplete: (url: string) => void,
  currentImage?: string 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const url = await uploadImage(formData); // Nuestra Server Action
      setPreview(url);
      onUploadComplete(url);
    } catch (error) {
      console.error("Error subiendo imagen:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
      {preview ? (
        <div className="relative h-40 w-full rounded-lg overflow-hidden group">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
             <label className="cursor-pointer text-white text-xs font-bold uppercase tracking-widest">
                Cambiar Imagen
                <input type="file" className="hidden" onChange={handleFileChange} />
             </label>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center cursor-pointer gap-2">
          <UploadCloud className="h-10 w-10 text-slate-300" />
          <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            Subir Imagen de la Experiencia
          </span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      )}

      {isUploading && (
        <div className="flex items-center justify-center gap-2 text-indigo-600 animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Procesando en la nube...</span>
        </div>
      )}
    </div>
  );
}