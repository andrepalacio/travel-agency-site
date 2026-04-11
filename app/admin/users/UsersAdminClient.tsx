// components/admin/users/UsersAdminClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createUser, deleteUser, updateUser } from "@/lib/actions/users";
import { UserForm } from "@/components/admin/users/UserForm";
import { DeleteDialog } from "@/components/admin/users/DeleteDialog";
import { UserFormValues } from "@/schemas/users";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

export default function UsersAdminClient({ users }: Readonly<{ users: User[] }>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleNew = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleSave = async (data: UserFormValues) => {
    startTransition(async () => {
      try {
        if (editingUser) {
          const result = await updateUser(editingUser.id, {
            ...data,
            password: data.password?.trim() ? data.password : undefined,
          });

          if (result.success) {
            toast.success("Usuario actualizado.");
            handleCancel();
            router.refresh();
          } else {
            toast.error(result.message || "Algo salió mal.");
          }

          return;
        }

        if (!data.password?.trim()) {
          toast.error("La contraseña es obligatoria para crear un usuario.");
          return;
        }

        const result = await createUser({
          name: data.name,
          last_name: data.last_name,
          email: data.email,
          rol: data.rol,
          password: data.password,
        });

        if (result.success) {
          toast.success("Usuario creado.");
          handleCancel();
          router.refresh();
        } else {
          toast.error(result.message || "Algo salió mal.");
        }
      } catch {
        toast.error("Error de conexión con el servidor.");
      }
    });
  };

  const handleToggleActive = (user: User) => {
    startTransition(async () => {
      try {
        await updateUser(user.id, { isActive: !user.isActive });
        toast.success(`Usuario ${user.isActive ? "desactivado" : "activado"}.`);
        router.refresh();
      } catch {
        toast.error("No se pudo cambiar el estado.");
      }
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteUser(deleteTarget);
        toast.success("Usuario eliminado.");
        if (editingUser?.id === deleteTarget) handleCancel();
        router.refresh();
      } catch {
        toast.error("No se pudo eliminar el usuario.");
      } finally {
        setDeleteTarget(null);
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="title-h3 text-expery-blue">Gestión de Usuarios</h1>
        <Button onClick={handleNew} className="btn-primary mt-0" disabled={isPending}>
          Nuevo Usuario
        </Button>
      </div>

      {showForm && (
        <UserForm
          editingUser={editingUser}
          onSubmit={handleSave}
          onCancel={handleCancel}
          isPending={isPending}
        />
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-expery-blue text-left text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Nombre completo</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Rol</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-expery-iron">
                  No hay usuarios cargados todavía.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-elegant-beige/50">
                  <td className="px-4 py-3 font-medium text-expery-blue">
                    {user.name} {user.last_name}
                  </td>
                  <td className="px-4 py-3 text-expery-iron">{user.email}</td>
                  <td className="px-4 py-3 text-expery-iron">{user.rol}</td>
                  <td className="px-4 py-3">
                    <span className={user.isActive ? "text-green-600" : "text-red-500"}>
                      {user.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="font-medium text-classic-gold hover:text-expery-blue"
                        disabled={isPending}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggleActive(user)}
                        className="font-medium text-expery-blue hover:text-classic-gold"
                        disabled={isPending}
                      >
                        {user.isActive ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(user.id)}
                        className="font-medium text-red-500 hover:text-expery-blue"
                        disabled={isPending}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteDialog
        open={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}