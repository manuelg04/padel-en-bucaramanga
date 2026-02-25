import type { MetadataRoute } from "next";
import { getAllClubs, getAllGuides } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [clubs, guides] = await Promise.all([getAllClubs(), getAllGuides()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/padel-bucaramanga"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/clubes"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/guias"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
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
    lastModified: new Date(guide.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticRoutes, ...clubRoutes, ...guideRoutes];
}
