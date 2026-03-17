import { CruisesClient } from "./CruisesClient";
import prisma from "@/lib/prisma";

export default async function CruisesPage() {
  const cruises = await prisma.cruise.findMany({
    orderBy: { order: "asc" },
  });
  console.log(cruises);

  return <CruisesClient cruises={cruises} />;
}