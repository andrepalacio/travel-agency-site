import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';

  // Verificar cookie de sesión
  const sessionCookie = request.cookies.get('admin_session');
  const hasValidSession = sessionCookie?.value === 'authenticated';

  // Si es una ruta de admin y no está logueado, redirigir a login
  if (isAdminRoute && !hasValidSession && !isLoginRoute) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si ya está logueado y trata de acceder a login, redirigir al dashboard
  if (isLoginRoute && hasValidSession) {
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};