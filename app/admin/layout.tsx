import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser, logoutAdmin } from '@/app/admin/actions/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarWrapper } from '@/components/admin/SidebarWrapper';
import { UserInfo } from '@/components/admin/UserInfo';
import { Separator } from '@/components/ui/separator';

export default async function AdminLayout({ children }: { readonly children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect('/admin/login');

  const isAdmin = user.rol === 'ADMIN';

  // Layout simplificado para roles no-admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="bg-expery-blue p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="title-white text-xl">Panel de Usuario</h1>
              <p className="text-expery-iron text-sm">
                {user.name} {user.last_name} - {user.rol}
              </p>
            </div>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-md bg-classic-gold px-4 py-2 text-sm font-bold text-black hover:bg-elegant-beige transition-colors"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }

  // Layout completo con sidebar para admin
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <SidebarWrapper>
        {/* Header del sidebar */}
        <div className="mb-4">
          <h1 className="title-white text-2xl">Panel de Administración</h1>
          <p className="text-expery-iron text-sm mt-1">Gestiona el contenido de tu sitio</p>
          <Separator className="mt-4 border-expery-iron/30" />
        </div>

        {/* Navegación */}
        <AdminSidebar />

        {/* Info del usuario y logout */}
        <div className="mt-auto flex flex-col gap-4 pt-4">
          <UserInfo user={user} />
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full rounded-md bg-classic-gold px-4 py-3 text-sm font-bold text-black hover:bg-elegant-beige transition-colors uppercase tracking-widest"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </SidebarWrapper>

      <main className="flex-1 px-6 py-4 md:ml-[19vw] w-[80vw]">{children}</main>
    </div>
  );
}
