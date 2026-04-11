import { z } from "zod";

export const IntroSchema = z.object({
  slogan: z.string(),
  daysNights: z.string(),
  description: z.string(),
  imageLeft: z.string(),
  imageRight: z.string(),
});

export const StopSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const ItinerarySchema = z.object({
  goldMessage: z.string(),
  mainImage: z.string(),
  departure: z.string(),
  arrival: z.string(),
  mapImage: z.string(),
  stops: z.array(StopSchema),
});

export const AmenitiesSchema = z.object({
  roomTitle: z.string(),
  roomList: z.array(z.string()),
  roomImage: z.string(),
  conciergeTitle: z.string(),
  conciergeList: z.array(z.string()),
  includesTitle: z.string(),
  includesImage: z.string(),
  includesList: z.array(z.string()),
  notIncludedList: z.array(z.string()),
  requirementsList: z.array(z.string()),
});

export const ExperienceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  isFeatured: z.boolean(),
  imageUrl: z.string(),
  intro: IntroSchema,
  itinerary: ItinerarySchema,
  amenities: AmenitiesSchema,
});

export type IntroData = z.infer<typeof IntroSchema>;
export type ItineraryData = z.infer<typeof ItinerarySchema>;
export type AmenitiesData = z.infer<typeof AmenitiesSchema>;
export type ExperienceData = z.infer<typeof ExperienceSchema>;
export type ParsedExperience = z.infer<typeof ExperienceSchema>;
