'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

export async function loginAdmin(formData: FormData): Promise<void> {
  const user = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
    // Configurar cookie de sesión
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    });
    redirect('/admin');
  }

  // Para errores, usamos redirect a una página de error o lanzamos error
  // Por ahora, simplemente no hacemos nada y el formulario mostrará error
  throw new Error('Credenciales inválidas');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}