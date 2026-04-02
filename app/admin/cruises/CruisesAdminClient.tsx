"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Cruise } from "@prisma/client";

import CruiseForm, { type CruiseFormValues } from "./CruiseForm";
import { createCruise, deleteCruise, updateCruise } from "./actions";

type CruisesAdminClientProps = {
  cruises: Cruise[];
};

const EMPTY_VALUES: CruiseFormValues = {
  name: "",
  description: "",
  imageUrl: "",
  ctaText: "",
  order: 0,
};

export default function CruisesAdminClient({ cruises }: CruisesAdminClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingCruise, setEditingCruise] = useState<Cruise | null>(null);

  const formValues = useMemo<CruiseFormValues>(() => {
    if (!editingCruise) {
      return EMPTY_VALUES;
    }

    return {
      name: editingCruise.name,
      description: editingCruise.description,
      imageUrl: editingCruise.imageUrl,
      ctaText: editingCruise.ctaText,
      order: editingCruise.order,
    };
  }, [editingCruise]);

  const handleNew = () => {
    setEditingCruise(null);
    setShowForm(true);
  };

  const handleEdit = (cruise: Cruise) => {
    setEditingCruise(cruise);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCruise(null);
  };

  const handleSave = async (values: CruiseFormValues) => {
    startTransition(async () => {
      const result = editingCruise
        ? await updateCruise(editingCruise.id, values)
        : await createCruise(values);

      if (!result.success) {
        return;
      }

      setShowForm(false);
      setEditingCruise(null);
      router.refresh();
    });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("¿Eliminar este crucero?");
    if (!confirmed) return;

    startTransition(async () => {
      await deleteCruise(id);
      if (editingCruise?.id === id) {
        setShowForm(false);
        setEditingCruise(null);
      }
      router.refresh();
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="title-h3 text-expery-blue">Gestión de Cruceros</h1>

        <button
          type="button"
          onClick={handleNew}
          className="btn-primary !mt-0 !py-3 !px-6"
          disabled={isPending}
        >
          Nuevo Crucero
        </button>
      </div>

      {showForm ? (
        <CruiseForm
          defaultValues={formValues}
          onSave={handleSave}
          isEditing={Boolean(editingCruise)}
          onCancel={handleCancel}
        />
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-expery-blue text-left text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Descripción</th>
              <th className="px-4 py-3 font-semibold">Texto CTA</th>
              <th className="px-4 py-3 font-semibold">Orden</th>
              <th className="px-4 py-3 font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {cruises.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-expery-iron">
                  No hay cruceros cargados todavía.
                </td>
              </tr>
            ) : (
              cruises.map((cruise) => (
                <tr key={cruise.id} className="align-top transition-colors hover:bg-elegant-beige/50">
                  <td className="px-4 py-3 font-medium text-expery-blue">{cruise.name}</td>
                  <td className="max-w-md px-4 py-3 text-expery-iron">{cruise.description}</td>
                  <td className="px-4 py-3 text-expery-iron">{cruise.ctaText}</td>
                  <td className="px-4 py-3 text-expery-iron">{cruise.order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(cruise)}
                        className="font-medium text-classic-gold transition hover:text-expery-blue"
                        disabled={isPending}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cruise.id)}
                        className="font-medium text-expery-blue transition hover:text-classic-gold"
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
