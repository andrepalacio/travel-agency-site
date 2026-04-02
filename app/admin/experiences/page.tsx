import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="title-h3 text-expery-blue">Gestión de Experiencias</h1>

        <Link
          href="/admin/experiences/new"
          className="btn-primary mt-0 py-3 px-6"
        >
          Nueva Experiencia
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-expery-blue text-left text-white">
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
                <td colSpan={4} className="px-4 py-8 text-center text-expery-iron">
                  No hay experiencias cargadas todavía.
                </td>
              </tr>
            ) : (
              experiences.map((experience) => (
                <tr key={experience.id} className="hover:bg-elegant-beige/50 transition-colors">
                  <td className="px-3 py-4 sm:px-6 font-medium text-expery-blue">{experience.title}</td>
                  <td className="px-3 py-4 sm:px-6 text-expery-iron">
                  {experience.isFeatured ? "Sí" : "No"}
                  </td>
                  <td className="px-3 py-4 sm:px-6 text-expery-iron">
                  {experience.createdAt.toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-3 py-4 sm:px-6">
                  <Link
                    href={`/admin/experiences/${experience.id}`}
                    className="font-medium text-classic-gold hover:text-expery-blue transition-colors"
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
