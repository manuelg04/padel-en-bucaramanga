import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

type ClubFiltersProps = {
  cities: string[];
  tags: string[];
  selectedCity?: string;
  selectedTag?: string;
  clearHref: string;
};

export function ClubFilters({
  cities,
  tags,
  selectedCity,
  selectedTag,
  clearHref
}: ClubFiltersProps): React.JSX.Element {
  return (
    <form className="grid gap-3 rounded-lg border border-border/70 bg-card p-4 md:grid-cols-[1fr_1fr_auto_auto]">
      <label className="grid gap-2 text-sm font-medium" htmlFor="city">
        Ciudad
        <select
          id="city"
          name="city"
          defaultValue={selectedCity ?? ""}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todas</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium" htmlFor="tag">
        Tag
        <select
          id="tag"
          name="tag"
          defaultValue={selectedTag ?? ""}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todos</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" className="self-end">
        Filtrar
      </Button>
      <Link
        href={clearHref}
        className={cn(buttonVariants({ variant: "outline" }), "self-end")}
      >
        Limpiar
      </Link>
    </form>
  );
}
