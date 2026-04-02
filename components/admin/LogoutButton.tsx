import { logoutAdmin } from "@/app/admin/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="w-full rounded-md bg-classic-gold px-4 py-3 text-sm font-bold text-black hover:bg-elegant-beige transition-colors uppercase tracking-widest"
      >
        Cerrar sesión
      </button>
    </form>
  );
}