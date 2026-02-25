import { describe, expect, it, vi } from "vitest";

vi.mock("node:fs/promises", () => ({
  readdir: vi.fn(async () => {
    throw new Error("Filesystem unavailable at runtime");
  }),
  readFile: vi.fn(async () => {
    throw new Error("Filesystem unavailable at runtime");
  })
}));

import { getAllClubs, getAllGuides } from "@/lib/data";

describe("runtime data loading", () => {
  it("serves bundled clubs without relying on filesystem", async () => {
    const clubs = await getAllClubs();
    expect(clubs.length).toBeGreaterThan(0);
    expect(clubs.some((club) => club.slug === "padel-bucaramanga-anillo-vial")).toBe(true);
  });

  it("serves bundled guides without relying on filesystem", async () => {
    const guides = await getAllGuides();
    expect(guides.length).toBeGreaterThan(0);
    expect(guides.some((guide) => guide.slug === "donde-jugar-padel-en-bucaramanga")).toBe(true);
  });
});
