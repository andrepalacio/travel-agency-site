import prisma from "@/lib/prisma"
import { HomeDataSchema } from "@/schemas/page-settings"
import { HomePreview } from "@/components/admin/HomePreview"

async function getHomeData() {
  const raw = await prisma.pageSettings.findFirst({ where: { id: "home" } })
  if (!raw) return null
  return HomeDataSchema.parse(raw.data)
}

export default async function AdminPage() {
  const data = await getHomeData()
  const brochures = await prisma.brochure.findMany({ select: { id: true, name: true } })

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="title-h3 text-expery-blue">Edición Home</h1>
        <p className="mt-4 text-expery-iron">No hay configuración para Home.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-100">
      {/* PREVISUALIZACIÓN EN VIVO */}
      <main className="flex-1 overflow-y-auto bg-slate-200 flex justify-center">
        <div className="w-full max-w-360 h-fit bg-white shadow-2xl origin-top transition-transform duration-500">
          <HomePreview data={data} brochures={brochures} />
        </div>
      </main>
    </div>
  )
}