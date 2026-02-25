# Padel Bucaramanga (MVP SEO)

Portal tipo directorio + guías evergreen para posicionar búsquedas como `padel bucaramanga` y `pádel bucaramanga`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui (card, badge, button)
- Zod para validar JSON local

## Correr local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Cómo agregar un club

1. Crea un archivo JSON en `data/clubs/<slug>.json`.
2. Usa este formato:

```json
{
  "slug": "mi-club",
  "name": "Mi Club (Demo)",
  "city": "Bucaramanga",
  "address": "Dirección referencial",
  "tags": ["indoor", "clases"],
  "instagramHandle": "miclub_demo",
  "instagramUrl": "https://www.instagram.com/miclub_demo/",
  "instagramPostUrls": ["https://www.instagram.com/p/xxxx/"],
  "whatsapp": "https://wa.me/573000000000",
  "website": null,
  "googleMapsUrl": null,
  "bookingNotes": "Texto corto",
  "lastUpdated": "2026-02-25"
}
```

## Cómo agregar una guía

1. Crea un archivo JSON en `data/guides/<slug>.json`.
2. Usa este formato:

```json
{
  "slug": "mi-guia",
  "title": "Título",
  "description": "Resumen",
  "publishedAt": "2026-02-25",
  "relatedClubSlugs": ["mi-club"],
  "content": "## Heading\\nTexto markdown..."
}
```

## Checklist SEO MVP

- [x] SSR en todas las páginas
- [x] Titles y meta descriptions únicas
- [x] H1 único por página
- [x] Enlazado interno hub -> clubes/guias y retorno
- [x] `sitemap.xml` dinámico con rutas de clubes y guías
- [x] `robots.txt` con sitemap
- [x] Canonicals en metadata por página
- [x] JSON-LD (`BreadcrumbList`, `Article`, `SportsActivityLocation`, `FAQPage`)
- [x] Embeds de Instagram solo en páginas de club con URLs configuradas

## Nota de datos

Los clubes de ejemplo son ficticios para validar render y arquitectura. Reemplaza por datos públicos verificables antes de producción.
