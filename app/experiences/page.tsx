import { ExperiencesClient } from "./ExperienceClient";
import prisma from "@/lib/prisma";

export default async function ExperienciasPage() {
  const experiences = await prisma.experience.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      imageUrl: true,
      isFeatured: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return <ExperiencesClient experiences={experiences} />;
}