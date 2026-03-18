import prisma from "@/lib/prisma";
import { parseExperience } from "@/lib/experience-parser";
import { DetailExperienceClient } from "./DetailExperienceClient";

export default async function DetailedExperiencePage({
  params,
}: {
  readonly params: Promise<{ readonly slug: string }>;
}) {
  const experiencesSelector = await prisma.experience.findMany({
    select: { title: true },
  });
  const brochuresSelector = await prisma.brochure.findMany({
    select: { id: true, name: true },
  });

  const { slug } = await params;
  const raw = await prisma.experience.findUnique({
    where: { slug },
  });

  if (!raw) {
    console.log(raw, slug);
    return (
      <main>
        <p className="text-center py-12">Experience not found</p>
      </main>
    );
  }

  const experience = parseExperience(raw);

  return (
    <DetailExperienceClient
      experience={experience}
      selector={experiencesSelector}
      brochures={brochuresSelector}
    />
  );
}
