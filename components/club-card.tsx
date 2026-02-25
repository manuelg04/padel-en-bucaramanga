import Link from "next/link";
import type { Club } from "@/lib/schemas";

type ClubCardProps = {
  club: Club;
};

function tagClass(tag: string): string {
  const map: Record<string, string> = {
    indoor: "tag-indoor",
    outdoor: "tag-outdoor",
    escuela: "tag-escuela",
    clases: "tag-clases",
    torneos: "tag-torneos",
    familias: "tag-familias",
    academia: "tag-academia",
    competencia: "tag-competencia",
    kids: "tag-kids",
    mixto: "tag-mixto",
    "reserva-online": "tag-reserva-online"
  };
  return map[tag] ?? "";
}

export function ClubCard({ club }: ClubCardProps): React.JSX.Element {
  return (
    <div className="group/card card-lift relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card">
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-primary transition-colors duration-300 group-hover/card:bg-accent" />

      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {club.city}
        </p>
        <h3
          className="text-xl font-black leading-tight tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {club.name}
        </h3>

        <p className="mt-2 text-sm text-foreground/70">{club.address}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {club.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagClass(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/clubes/${club.slug}`}
        className="group/cta flex items-center justify-between border-t border-border/60 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
      >
        <span>Ver club</span>
        <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
