import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/login';

  // Verificar cookie de sesión (ahora contiene el ID del usuario)
  const sessionCookie = request.cookies.get('admin_session');
  const hasValidSession = !!sessionCookie?.value;

  // Si es una ruta de admin y no está logueado, redirigir a login
  if (isAdminRoute && !hasValidSession && !isLoginRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si ya está logueado y trata de acceder a login, redirigir al panel
  if (isLoginRoute && hasValidSession) {
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
  // Excluir rutas estáticas y assets
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
  ],
};