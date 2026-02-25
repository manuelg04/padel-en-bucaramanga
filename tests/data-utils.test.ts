import { describe, expect, it } from "vitest";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  filterClubs,
  loadClubsFromDir,
  loadGuidesFromDir
} from "@/lib/data";

describe("data utilities", () => {
  it("loads clubs and sorts them by city then name", async () => {
    const root = await mkdtemp(join(tmpdir(), "clubs-"));
    try {
      await writeFile(
        join(root, "b.json"),
        JSON.stringify({
          slug: "club-b",
          name: "Club B",
          city: "Floridablanca",
          address: "Dir 2",
          tags: ["indoor"],
          instagramHandle: "clubb",
          instagramUrl: "https://instagram.com/clubb",
          instagramPostUrls: [],
          whatsapp: null,
          website: null,
          googleMapsUrl: null,
          bookingNotes: null,
          lastUpdated: "2026-01-10"
        })
      );

      await writeFile(
        join(root, "a.json"),
        JSON.stringify({
          slug: "club-a",
          name: "Club A",
          city: "Bucaramanga",
          address: "Dir 1",
          tags: ["clases"],
          instagramHandle: "cluba",
          instagramUrl: "https://instagram.com/cluba",
          instagramPostUrls: [],
          whatsapp: null,
          website: null,
          googleMapsUrl: null,
          bookingNotes: null,
          lastUpdated: "2026-01-11"
        })
      );

      const clubs = await loadClubsFromDir(root);
      expect(clubs.map((club) => club.slug)).toEqual(["club-a", "club-b"]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("filters clubs by city and tags", () => {
    const clubs = [
      {
        slug: "uno",
        name: "Uno",
        city: "Bucaramanga",
        address: "x",
        tags: ["clases", "indoor"],
        instagramHandle: "uno",
        instagramUrl: "https://instagram.com/uno",
        instagramPostUrls: [],
        whatsapp: null,
        website: null,
        googleMapsUrl: null,
        bookingNotes: null,
        lastUpdated: "2026-01-01"
      },
      {
        slug: "dos",
        name: "Dos",
        city: "Floridablanca",
        address: "y",
        tags: ["outdoor"],
        instagramHandle: "dos",
        instagramUrl: "https://instagram.com/dos",
        instagramPostUrls: [],
        whatsapp: null,
        website: null,
        googleMapsUrl: null,
        bookingNotes: null,
        lastUpdated: "2026-01-01"
      }
    ];

    expect(filterClubs(clubs, { city: "Bucaramanga" }).map((x) => x.slug)).toEqual([
      "uno"
    ]);

    expect(filterClubs(clubs, { tag: "clases" }).map((x) => x.slug)).toEqual(["uno"]);

    expect(filterClubs(clubs, { city: "Floridablanca", tag: "outdoor" }).map((x) => x.slug)).toEqual([
      "dos"
    ]);
  });

  it("loads guides and sorts by publication date desc", async () => {
    const root = await mkdtemp(join(tmpdir(), "guides-"));
    try {
      await writeFile(
        join(root, "older.json"),
        JSON.stringify({
          slug: "older",
          title: "Old",
          description: "old",
          publishedAt: "2025-01-01",
          content: "# old"
        })
      );

      await writeFile(
        join(root, "newer.json"),
        JSON.stringify({
          slug: "newer",
          title: "New",
          description: "new",
          publishedAt: "2026-01-01",
          content: "# new"
        })
      );

      const guides = await loadGuidesFromDir(root);
      expect(guides.map((guide) => guide.slug)).toEqual(["newer", "older"]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
