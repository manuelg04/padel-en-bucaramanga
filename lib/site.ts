export const siteConfig = {
  name: "Padel Bucaramanga",
  description:
    "Directorio y guías para jugar padel y pádel en Bucaramanga y su área metropolitana.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
};

export const mainNav = [
  { href: "/padel-bucaramanga", label: "Hub" },
  { href: "/clubes", label: "Clubes" },
  { href: "/guias", label: "Guías" }
] as const;
