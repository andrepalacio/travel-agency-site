import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

export async function uploadFile(file: File, filename: string) {
  if (process.env.NODE_ENV === 'development') {
    // Simulación local: Guardar en public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filePath = path.join(process.cwd(), 'public/uploads', filename);
    fs.writeFileSync(filePath, buffer);
    
    return `/uploads/${filename}`; // Ruta accesible vía URL en local
  } else {
    // Producción: Usar Vercel Blob
    const blob = await put(filename, file, { access: 'public' });
    return blob.url;
  }
}