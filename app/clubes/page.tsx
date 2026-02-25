import Link from "next/link";
import type { Metadata } from "next";
import { ClubCard } from "@/components/club-card";
import { ClubFilters } from "@/components/club-filters";
import { Badge } from "@/components/ui/badge";
import {
  filterClubs,
  getAllClubs,
  getCityOptions,
  getTagOptions
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

type ClubesPageProps = {
  searchParams?: Promise<{
    city?: string;
    tag?: string;
  }>;
};

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Clubes y canchas de padel en Bucaramanga y área metropolitana",
    description:
      "Listado completo de clubes de padel Bucaramanga, Floridablanca, Girón y Piedecuesta con filtros por ciudad y tags.",
    path: "/clubes"
  });
}

export default async function ClubesPage({ searchParams }: ClubesPageProps): Promise<React.JSX.Element> {
  const [clubs, cities, tags] = await Promise.all([getAllClubs(), getCityOptions(), getTagOptions()]);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const city = resolvedSearchParams?.city?.trim();
  const tag = resolvedSearchParams?.tag?.trim();
  const filtered = filterClubs(clubs, { city, tag });

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <Badge className="w-fit bg-secondary text-secondary-foreground">Directorio</Badge>
        <h1 className="text-4xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
          Clubes de padel Bucaramanga y alrededores
        </h1>
        <p className="max-w-3xl text-foreground/85">
          Explora canchas de padel en Bucaramanga, padel Floridablanca y más sedes del área
          metropolitana. Usa filtros para encontrar rápido la opción que encaja con tu plan.
        </p>
      </header>

      <ClubFilters
        cities={cities}
        tags={tags}
        selectedCity={city}
        selectedTag={tag}
        clearHref="/clubes"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((club) => (
          <ClubCard key={club.slug} club={club} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-md border border-border/70 bg-card p-4 text-sm">
          No hay resultados con ese filtro. Prueba otra ciudad o tag.
        </p>
      ) : null}

      <Link href="/padel-bucaramanga" className="text-sm text-primary underline">
        Volver al hub principal
      </Link>
    </section>
  );
}
