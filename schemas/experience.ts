import { z } from "zod";

const IntroSchema = z.object({
  slogan: z.string(),
  daysNights: z.string(),
  description: z.string(),
  imageLeft: z.string(),
  imageRight: z.string(),
});

const ItinerarySchema = z.object({
  goldMessage: z.string(),
  mainImage: z.string(),
  departure: z.string(),
  arrival: z.string(),
  mapImage: z.string(),
});

const AmenitiesSchema = z.object({
  roomTitle: z.string(),
  roomList: z.array(z.string()),
  roomImage: z.string(),
  includesTitle: z.string(),
  includesImage: z.string(),
  includesList: z.array(z.string()),
  optionalGrid: z.array(z.string()).optional(),
  notIncludedList: z.array(z.string()),
  requirementsList: z.array(z.string()),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  isFeatured: z.boolean(),
  imageUrl: z.string(),
  intro: IntroSchema,
  itinerary: ItinerarySchema,
  amenities: AmenitiesSchema,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type ParsedExperience = z.infer<typeof ExperienceSchema>;