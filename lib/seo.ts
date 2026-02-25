import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  publishedTime?: string;
};

export function buildMetadata({ title, description, path, ogType = "website", publishedTime }: MetadataInput): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const socialImageUrl = absoluteUrl("/opengraph-image.png");

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      type: ogType,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "es_CO",
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageUrl]
    }
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
