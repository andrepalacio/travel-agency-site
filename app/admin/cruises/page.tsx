import Link from "next/link";
import prisma from "@/lib/prisma";
import CruiseForm from "./CruiseForm";

export default async function AdminCruisesPage() {
  const cruises = await prisma.cruise.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Cruceros</h1>

        <Link
          href="/admin/cruises/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Nuevo Crucero
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Descripción</th>
              <th className="px-4 py-3 font-semibold">Texto CTA</th>
              <th className="px-4 py-3 font-semibold">Orden</th>
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {cruises.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No hay cruceros cargados todavía.
                </td>
              </tr>
            ) : (
              cruises.map((cruise) => (
                <tr key={cruise.id} className="align-top hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{cruise.name}</td>
                  <td className="max-w-md px-4 py-3 text-slate-700">{cruise.description}</td>
                  <td className="px-4 py-3 text-slate-700">{cruise.ctaText}</td>
                  <td className="px-4 py-3 text-slate-700">{cruise.order}</td>
                  <td className="px-4 py-3">
                    <details className="group">
                      <summary className="inline-flex cursor-pointer list-none rounded-md px-2 py-1 font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-800">
                        Editar
                      </summary>

                      <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                        <CruiseForm
                          title={`Editar: ${cruise.name}`}
                          submitLabel="Actualizar"
                          initialValues={{
                            name: cruise.name,
                            description: cruise.description,
                            imageUrl: cruise.imageUrl,
                            ctaText: cruise.ctaText,
                            externalLink: cruise.externalLink,
                            order: cruise.order,
                          }}
                        />
                      </div>
                    </details>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CruiseForm title="Crear crucero" submitLabel="Crear" />
    </div>
  );
}
