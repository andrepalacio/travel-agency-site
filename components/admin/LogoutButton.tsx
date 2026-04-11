import { logoutAdmin } from "@/app/admin/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="btn-secondary-gold w-full px-4 py-3"
      >
        Cerrar sesión
      </button>
    </form>
  );
}