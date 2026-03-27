import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Experiencias</h1>

        <Link
          href="/admin/experiences/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Nueva Experiencia
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Título</th>
              <th className="px-4 py-3 font-semibold">¿Destacado?</th>
              <th className="px-4 py-3 font-semibold">Fecha de creación</th>
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {experiences.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  No hay experiencias cargadas todavía.
                </td>
              </tr>
            ) : (
              experiences.map((experience) => (
                <tr key={experience.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{experience.title}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {experience.isFeatured ? "Sí" : "No"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {experience.createdAt.toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/experiences/${experience.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
