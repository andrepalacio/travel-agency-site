// app/admin/page.tsx
import { EditorProvider } from "@/context/EditorContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { HomePreview } from "@/components/admin/HomePreview";

// En un caso real, esto vendría de tu base de datos (Prisma/Supabase)
const initialMockData = {
  hero: { shipImageUrl: "/cruise.webp", exploreLink: "/exp", infoLink: "/info" },
  services: { title: "Servicios", description: "Conoce más...", cards: [] },
  contact: { leftTitle: "Inicia tu viaje", leftDescription: "...", circleTitle: "Estamos aquí", socials: [] }
};

export default function AdminPage() {
  return (
    <EditorProvider initialData={initialMockData}>
      <div className="flex h-screen w-full overflow-hidden bg-slate-100">
        
        {/* PANEL DE FORMULARIOS (Izquierda) */}
        <aside className="w-100 h-full border-r bg-white z-20 shadow-xl overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tighter mb-6">Editor de Contenido</h1>
            <AdminSidebar />
          </div>
        </aside>

        {/* PREVISUALIZACIÓN EN VIVO (Derecha) */}
        <main className="flex-1 h-full overflow-y-auto bg-slate-200 p-8 flex justify-center">
          <div className="w-full max-w-360 h-fit bg-white shadow-2xl origin-top transition-transform duration-500">
             <HomePreview />
          </div>
        </main>

      </div>
    </EditorProvider>
  );
}