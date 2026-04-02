import prisma from "@/lib/prisma";
import { HomeDataSchema, type HomeData } from "@/schemas/page-settings";
import HomeEditorForm from "./HomeEditorForm";

export default async function AdminHomePage() {
  const pageSettings = await prisma.pageSettings.findFirst({
    where: { id: "home" },
  });

  if (!pageSettings) {
    return (
      <div className="p-6">
        <h1 className="title-h3 text-expery-blue">Edición Home</h1>
        <p className="mt-4 text-expery-iron">No hay configuración para Home.</p>
      </div>
    );
  }

  const parsedData = HomeDataSchema.safeParse(pageSettings.data);

  if (!parsedData.success) {
    return (
      <div className="p-6">
        <h1 className="title-h3 text-expery-blue">Edición Home</h1>
        <p className="mt-4 text-red-600">
          La configuración de Home existe, pero no tiene el formato esperado.
        </p>
      </div>
    );
  }

  const homeData: HomeData = parsedData.data;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="title-h3 text-expery-blue mb-6">Edición del Home</h1>
      <HomeEditorForm initialData={homeData} />
    </div>
  );
}
