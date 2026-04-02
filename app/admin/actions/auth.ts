'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { authenticateUser, getUser } from '@/lib/actions/users';

export async function loginAdmin(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = await authenticateUser(email, password);

  if (!result.success || !result.user) {
    throw new Error(result.message || 'Credenciales inválidas');
  }

  // Configurar cookie de sesión con el ID del usuario
  const cookieStore = await cookies();
  cookieStore.set('admin_session', result.user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 horas
    path: '/',
  });
  redirect('/admin');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie?.value) {
    return null;
  }

  const userId = sessionCookie.value;
  const result = await getUser(userId);

  if (!result.success || !result.user) {
    return null;
  }

  return result.user;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/');
}