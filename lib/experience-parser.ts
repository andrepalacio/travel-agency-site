import { ExperienceSchema, ParsedExperience } from "@/schemas/experience";
import { Experience } from "@prisma/client";

export function parseExperience(raw: Experience): ParsedExperience {
  return ExperienceSchema.parse({
    ...raw,
    intro: raw.intro,
    itinerary: raw.itinerary,
    amenities: raw.amenities,
  });
}