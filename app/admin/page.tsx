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
  
  // Datos por defecto
  const defaultData = {
    hero: { shipImageUrl: "/cruise.webp", exploreLink: "/exp", infoLink: "/info" },
    services: { title: "Servicios", description: "Conoce más...", cards: [] },
    contact: { leftTitle: "Inicia tu viaje", leftDescription: "...", circleTitle: "Estamos aquí", socials: [] }
  }

  const homeData = data || defaultData
  const brochures = await prisma.brochure.findMany({ select: { id: true, name: true } })

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      {/* PREVISUALIZACIÓN EN VIVO */}
      <main className="flex-1 h-full overflow-y-auto bg-slate-200 p-8 flex justify-center">
        <div className="w-full max-w-360 h-fit bg-white shadow-2xl origin-top transition-transform duration-500">
          <HomePreview />
        </div>
      </main>
    </div>
  )
}