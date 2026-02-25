import type { MetadataRoute } from "next";
import { getAllClubs, getAllGuides } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [clubs, guides] = await Promise.all([getAllClubs(), getAllGuides()]);

  const allDates = [
    ...clubs.map((c) => c.lastUpdated),
    ...guides.map((g) => g.lastModified ?? g.publishedAt)
  ];
  const latestDate = allDates.sort().at(-1) ?? "2026-02-25";
  const staticLastModified = new Date(latestDate);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/padel-bucaramanga"),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/clubes"),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/guias"),
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: absoluteUrl("/acerca-de"),
      lastModified: new Date("2026-02-25"),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: absoluteUrl("/privacidad"),
      lastModified: new Date("2026-02-25"),
      changeFrequency: "yearly",
      priority: 0.2
    }
  ];

  const clubRoutes: MetadataRoute.Sitemap = clubs.map((club) => ({
    url: absoluteUrl(`/clubes/${club.slug}`),
    lastModified: new Date(club.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guias/${guide.slug}`),
    lastModified: new Date(guide.lastModified ?? guide.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticRoutes, ...clubRoutes, ...guideRoutes];
}
