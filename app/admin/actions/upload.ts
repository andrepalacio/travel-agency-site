"use server"
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  const imageFile = formData.get("image") as File;
  
  if (!imageFile) throw new Error("No se proporcionó ninguna imagen");

  // Subimos a Vercel Blob
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });

  revalidatePath("/admin");
  return blob.url; // Esta URL es la que guardaremos en Postgres
}