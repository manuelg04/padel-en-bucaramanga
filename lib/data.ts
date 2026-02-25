import { cache } from "react";
import { clubSchema, guideSchema, type Club, type Guide } from "@/lib/schemas";
import caracoliSportClub from "@/data/clubs/caracoli-sport-club.json";
import cuatroPalasBga from "@/data/clubs/cuatro-palas-bga.json";
import padelBucaramangaAnilloVial from "@/data/clubs/padel-bucaramanga-anillo-vial.json";
import padelClubPc from "@/data/clubs/padel-club-pc.json";
import padelCountryClubRuitoque from "@/data/clubs/padel-country-club-ruitoque.json";
import royalPadelCabecera from "@/data/clubs/royal-padel-cabecera.json";
import smashClubFloridablanca from "@/data/clubs/smash-club-floridablanca.json";
import categoriasGuide from "@/data/guides/categorias-de-padel-7ma-6ta-5ta.json";
import clasesGuide from "@/data/guides/clases-de-padel-en-bucaramanga.json";
import cuantoCuestaGuide from "@/data/guides/cuanto-cuesta-jugar-padel-en-bucaramanga.json";
import dondeJugarGuide from "@/data/guides/donde-jugar-padel-en-bucaramanga.json";
import reglasBasicasGuide from "@/data/guides/reglas-basicas-del-padel.json";

type ClubFilters = {
  city?: string;
  tag?: string;
};

async function loadJsonFilesFromDir<T>(dir: string, parser: (input: unknown) => T): Promise<T[]> {
  const { readdir, readFile } = await import("node:fs/promises");
  const path = await import("node:path");
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

function sortClubs(clubs: Club[]): Club[] {
  return clubs.sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
}

function sortGuides(guides: Guide[]): Guide[] {
  return guides.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const bundledClubs = sortClubs(
  [
    caracoliSportClub,
    cuatroPalasBga,
    padelBucaramangaAnilloVial,
    padelClubPc,
    padelCountryClubRuitoque,
    royalPadelCabecera,
    smashClubFloridablanca
  ].map((input) => clubSchema.parse(input))
);

const bundledGuides = sortGuides(
  [
    categoriasGuide,
    clasesGuide,
    cuantoCuestaGuide,
    dondeJugarGuide,
    reglasBasicasGuide
  ].map((input) => guideSchema.parse(input))
);

export async function loadClubsFromDir(dir: string): Promise<Club[]> {
  const clubs = await loadJsonFilesFromDir(dir, (input) => clubSchema.parse(input));
  return sortClubs(clubs);
}

export async function loadGuidesFromDir(dir: string): Promise<Guide[]> {
  const guides = await loadJsonFilesFromDir(dir, (input) => guideSchema.parse(input));
  return sortGuides(guides);
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

export const getAllClubs = cache(async (): Promise<Club[]> => bundledClubs);

export const getAllGuides = cache(async (): Promise<Guide[]> => bundledGuides);

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
