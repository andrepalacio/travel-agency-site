import prisma from "@/lib/prisma";
import CruisesAdminClient from "./CruisesAdminClient";

export default async function AdminCruisesPage() {
  const cruises = await prisma.cruise.findMany({
    orderBy: { order: "asc" },
  });

  return <CruisesAdminClient cruises={cruises} />;
}
