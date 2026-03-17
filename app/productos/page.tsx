import prisma from "@/lib/prisma"; // Asegúrate de tener instanciado PrismaClient
import Image from "next/image";

export default async function ProductosPage() {
  // 1. Obtención de datos directamente de Postgres
  const productos = await prisma.producto.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo Beta</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 shadow-sm">
            {/* La URL vendrá de la base de datos (ya sea /uploads/ o https://blob...) */}
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={producto.imageUrl} 
                alt={producto.nombre}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600">${producto.precio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}