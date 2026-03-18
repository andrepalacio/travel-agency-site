import { CruisesClient } from "./CruisesClient";
import prisma from "@/lib/prisma";

export default async function CruisesPage() {
  const result = await prisma.cruise.findMany({
    select: { name: true },
  });
  const selector = result.map(({ name, ...rest }) => ({
    ...rest,
    title: name,
  }));

  const cruises = await prisma.cruise.findMany({
    orderBy: { order: "asc" },
  });

  return <CruisesClient cruises={cruises} selector={selector} />;
}
