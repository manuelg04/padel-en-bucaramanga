import { cache } from "react";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { clubSchema, guideSchema, type Club, type Guide } from "@/lib/schemas";

type ClubFilters = {
  city?: string;
  tag?: string;
};

async function loadJsonFilesFromDir<T>(dir: string, parser: (input: unknown) => T): Promise<T[]> {
  const fileNames = (await readdir(dir)).filter((name) => name.endsWith(".json"));

  const payloads = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(dir, fileName);
      const raw = await readFile(fullPath, "utf-8");
      const json = JSON.parse(raw) as unknown;
      return parser(json);
    })
  );

  return payloads;
}

export async function loadClubsFromDir(dir: string): Promise<Club[]> {
  const clubs = await loadJsonFilesFromDir(dir, (input) => clubSchema.parse(input));
  return clubs.sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
}

export async function loadGuidesFromDir(dir: string): Promise<Guide[]> {
  const guides = await loadJsonFilesFromDir(dir, (input) => guideSchema.parse(input));
  return guides.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function filterClubs(clubs: Club[], filters: ClubFilters): Club[] {
  return clubs.filter((club) => {
    const cityMatch = filters.city ? club.city.toLowerCase() === filters.city.toLowerCase() : true;
    const tagMatch = filters.tag
      ? club.tags.some((tag) => tag.toLowerCase() === filters.tag?.toLowerCase())
      : true;

    return cityMatch && tagMatch;
  });
}

const clubsDir = path.join(process.cwd(), "data", "clubs");
const guidesDir = path.join(process.cwd(), "data", "guides");

export const getAllClubs = cache(async (): Promise<Club[]> => loadClubsFromDir(clubsDir));

export const getAllGuides = cache(async (): Promise<Guide[]> => loadGuidesFromDir(guidesDir));

export const getClubBySlug = cache(async (slug: string): Promise<Club | undefined> => {
  const clubs = await getAllClubs();
  return clubs.find((club) => club.slug === slug);
});

export const getGuideBySlug = cache(async (slug: string): Promise<Guide | undefined> => {
  const guides = await getAllGuides();
  return guides.find((guide) => guide.slug === slug);
});

export async function getCityOptions(): Promise<string[]> {
  const clubs = await getAllClubs();
  return Array.from(new Set(clubs.map((club) => club.city))).sort((a, b) => a.localeCompare(b));
}

export async function getTagOptions(): Promise<string[]> {
  const clubs = await getAllClubs();
  return Array.from(new Set(clubs.flatMap((club) => club.tags))).sort((a, b) => a.localeCompare(b));
}
