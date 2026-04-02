"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createUser, deleteUser, updateUser } from "@/lib/actions/users";

interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  rol: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

type UsersAdminClientProps = {
  users: User[];
};

export default function UsersAdminClient({ users }: UsersAdminClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    rol: "USUARIO",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleNew = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      last_name: "",
      email: "",
      password: "",
      rol: "USUARIO",
    });
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password: "",
      rol: user.rol,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({
      name: "",
      last_name: "",
      email: "",
      password: "",
      rol: "USUARIO",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      let result;
      if (editingUser) {
        const updateData: {
          name?: string;
          last_name?: string;
          email?: string;
          rol?: string;
          isActive?: boolean;
          password?: string;
        } = {
          name: formData.name,
          last_name: formData.last_name,
          email: formData.email,
          rol: formData.rol,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        result = await updateUser(editingUser.id, updateData);
      } else {
        result = await createUser(formData);
      }

      if (result.success) {
        setShowForm(false);
        setEditingUser(null);
        router.refresh();
      }
    });
  };

  const handleToggleActive = (user: User) => {
    startTransition(async () => {
      await updateUser(user.id, { isActive: !user.isActive });
      router.refresh();
    });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("¿Eliminar este usuario?");
    if (!confirmed) return;

    startTransition(async () => {
      await deleteUser(id);
      if (editingUser?.id === id) {
        setShowForm(false);
        setEditingUser(null);
      }
      router.refresh();
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="title-h3 text-expery-blue">Gestión de Usuarios</h1>

        <button
          type="button"
          onClick={handleNew}
          className="btn-primary !mt-0 !py-3 !px-6"
          disabled={isPending}
        >
          Nuevo Usuario
        </button>
      </div>

      {showForm ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-expery-blue">
            {editingUser ? "Editar Usuario" : "Crear Usuario"}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-expery-iron">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-expery-blue focus:border-classic-gold focus:outline-none focus:ring-1 focus:ring-classic-gold"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-expery-iron">
                  Apellido
                </label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-expery-blue focus:border-classic-gold focus:outline-none focus:ring-1 focus:ring-classic-gold"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-expery-iron">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-expery-blue focus:border-classic-gold focus:outline-none focus:ring-1 focus:ring-classic-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-expery-iron">
                Contraseña {editingUser && "(dejar vacío para mantener)"}
              </label>
              <input
                type="password"
                required={!editingUser}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-expery-blue focus:border-classic-gold focus:outline-none focus:ring-1 focus:ring-classic-gold"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-expery-iron">
                Rol
              </label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-expery-blue focus:border-classic-gold focus:outline-none focus:ring-1 focus:ring-classic-gold"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="EDITOR">EDITOR</option>
                <option value="USUARIO">USUARIO</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary !py-2"
                disabled={isPending}
              >
                {editingUser ? "Actualizar" : "Crear"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary !py-2"
                disabled={isPending}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : null}

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
                <tr
                  key={user.id}
                  className="align-top transition-colors hover:bg-elegant-beige/50"
                >
                  <td className="px-4 py-3 font-medium text-expery-blue">
                    {user.name} {user.last_name}
                  </td>
                  <td className="px-4 py-3 text-expery-iron">{user.email}</td>
                  <td className="px-4 py-3 text-expery-iron">{user.rol}</td>
                  <td className="px-4 py-3">
                    <span
                      className={user.isActive ? "text-green-600" : "text-red-500"}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(user)}
                        className="font-medium text-classic-gold transition hover:text-expery-blue"
                        disabled={isPending}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleActive(user)}
                        className="font-medium text-expery-blue transition hover:text-classic-gold"
                        disabled={isPending}
                      >
                        {user.isActive ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="font-medium text-red-500 transition hover:text-expery-blue"
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
    </div>
  );
}
