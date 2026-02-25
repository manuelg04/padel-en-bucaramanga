import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadClubsFromDir, loadGuidesFromDir } from "@/lib/data";

describe("guia donde-jugar-padel-en-bucaramanga", () => {
  it("usa SEO y estructura editorial esperada", async () => {
    const guides = await loadGuidesFromDir(path.join(process.cwd(), "data", "guides"));
    const guide = guides.find((item) => item.slug === "donde-jugar-padel-en-bucaramanga");

    expect(guide).toBeDefined();
    expect(guide?.title).toBe("Dónde jugar pádel en Bucaramanga: clubes y canchas (2026)");
    expect(guide?.description).toBe(
      "Lista de clubes y canchas de pádel en Bucaramanga y alrededores (Floridablanca/Ruitoque). Dirección, contacto y cómo reservar."
    );
    expect(guide?.h1).toBe("Dónde jugar pádel en Bucaramanga: clubes y canchas");

    expect(guide?.content).toContain("<!-- CLUB_DIRECTORY -->");
    expect(guide?.content).toContain("## Cómo reservar cancha (Instagram, WhatsApp y EasyCancha)");
    expect(guide?.content).toContain("## Preguntas frecuentes sobre pádel en Bucaramanga");
    expect(guide?.content).toContain("padel bucaramanga");
    expect(guide?.content).toContain("pádel Bucaramanga");
  });

  it("conecta la guia con clubes reales del listado local", async () => {
    const [guides, clubs] = await Promise.all([
      loadGuidesFromDir(path.join(process.cwd(), "data", "guides")),
      loadClubsFromDir(path.join(process.cwd(), "data", "clubs"))
    ]);

    const guide = guides.find((item) => item.slug === "donde-jugar-padel-en-bucaramanga");
    expect(guide).toBeDefined();

    const requiredSlugs = [
      "royal-padel-cabecera",
      "padel-country-club-ruitoque",
      "padel-bucaramanga-anillo-vial",
      "cuatro-palas-bga",
      "padel-club-pc",
      "caracoli-sport-club",
      "smash-club-floridablanca"
    ];

    expect(guide?.relatedClubSlugs).toEqual(requiredSlugs);

    const clubsBySlug = new Map(clubs.map((club) => [club.slug, club]));

    for (const slug of requiredSlugs) {
      const club = clubsBySlug.get(slug);
      expect(club).toBeDefined();
      expect(club?.zone).toBeTruthy();
      expect(Boolean(club?.instagramUrl || club?.whatsapp || club?.website)).toBe(true);
    }
  });
});
