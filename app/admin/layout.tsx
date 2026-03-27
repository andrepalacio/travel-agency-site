import { ReactNode } from "react"
import prisma from "@/lib/prisma"
import { HomeDataSchema } from "@/schemas/page-settings"
import { AdminShell } from "./AdminShell"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { logoutAdmin } from "@/app/admin/actions/auth"

async function getHomeData() {
  const raw = await prisma.pageSettings.findFirst({ where: { id: "home" } })
  if (!raw) {
    return null
  }
  return HomeDataSchema.parse(raw.data)
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const homeData = await getHomeData()
  
  // Datos por defecto si no hay configuración en la DB
  const defaultData = {
    hero: { shipImageUrl: "/cruise.webp", exploreLink: "/exp", infoLink: "/info" },
    services: { title: "Servicios", description: "Conoce más...", cards: [] },
    contact: { leftTitle: "Inicia tu viaje", leftDescription: "...", circleTitle: "Estamos aquí", socials: [] }
  }

  const initialData = homeData || defaultData

  return (
    <AdminShell initialData={initialData}>
      <div className="min-h-screen bg-slate-100">
        <div className="flex min-h-screen">
          <aside className="w-full max-w-sm bg-white shadow-md p-6">
            <div className="flex h-full flex-col gap-6">
              <AdminSidebar />

              <form action={logoutAdmin} className="mt-auto">
                <button
                  type="submit"
                  className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </aside>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminShell>
  )
}