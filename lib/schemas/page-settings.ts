    // lib/schemas/page-settings.ts
import { z } from "zod";

export const HomeDataSchema = z.object({
  hero: z.object({
    shipImageUrl: z.string(),
    exploreLink: z.string(),
    infoLink: z.string(),
  }),
  services: z.object({
    title: z.string(),
    description: z.string(),
    cards: z.array(
      z.object({
        id: z.string(),
        image: z.string(),
        title: z.string(),
      })
    ),
  }),
  contact: z.object({
    leftTitle: z.string(),
    leftDescription: z.string(),
    circleTitle: z.string(),
    socials: z.array(
      z.object({
        platform: z.enum(["instagram", "whatsapp", "facebook"]),
        label: z.string(),
        url: z.string(),
      })
    ),
  }),
});

export type HomeData = z.infer<typeof HomeDataSchema>;

// Section types — useful for typing component props
export type HeroData = HomeData["hero"];
export type ServicesData = HomeData["services"];
export type ContactData = HomeData["contact"];