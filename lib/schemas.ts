import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const clubSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  city: z.string().min(1),
  zone: z.string().min(1).nullable().optional().default(null),
  address: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  instagramHandle: z.string().min(1),
  instagramUrl: z.string().url(),
  instagramPostUrls: z.array(z.string().url()).max(6).default([]),
  whatsapp: z.string().nullable(),
  website: z.string().url().nullable(),
  googleMapsUrl: z.string().url().nullable(),
  bookingNotes: z.string().nullable(),
  lastUpdated: z.string().regex(dateRegex)
});

export const guideSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  h1: z.string().min(1).optional(),
  description: z.string().min(1),
  publishedAt: z.string().regex(dateRegex),
  content: z.string().min(1),
  relatedClubSlugs: z.array(z.string()).default([])
});

export type Club = z.infer<typeof clubSchema>;
export type Guide = z.infer<typeof guideSchema>;
