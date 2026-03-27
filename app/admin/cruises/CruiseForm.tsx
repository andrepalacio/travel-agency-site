type CruiseFormValues = {
  name: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  externalLink: string;
  order: number;
};

type CruiseFormProps = {
  title: string;
  submitLabel?: string;
  initialValues?: CruiseFormValues;
};

const EMPTY_VALUES: CruiseFormValues = {
  name: "",
  description: "",
  imageUrl: "",
  ctaText: "",
  externalLink: "",
  order: 0,
};

export default function CruiseForm({
  title,
  submitLabel = "Guardar",
  initialValues = EMPTY_VALUES,
}: CruiseFormProps) {
  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

      <form className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Nombre
          <input
            type="text"
            name="name"
            defaultValue={initialValues.name}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Texto CTA
          <input
            type="text"
            name="ctaText"
            defaultValue={initialValues.ctaText}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800 md:col-span-2">
          Descripción
          <textarea
            name="description"
            defaultValue={initialValues.description}
            className="min-h-28 rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800 md:col-span-2">
          imageUrl
          <input
            type="text"
            name="imageUrl"
            defaultValue={initialValues.imageUrl}
            placeholder="https://..."
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          externalLink
          <input
            type="text"
            name="externalLink"
            defaultValue={initialValues.externalLink}
            placeholder="https://..."
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          order
          <input
            type="number"
            name="order"
            defaultValue={initialValues.order}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="button"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            {submitLabel} (próximamente)
          </button>
        </div>
      </form>
    </section>
  );
}
