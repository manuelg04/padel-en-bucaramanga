import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import GuidePage from "@/app/guias/[slug]/page";
import { loadGuidesFromDir } from "@/lib/data";

describe("guia tipos-de-palas-de-padel", () => {
  it("carga la guia editorial esperada desde data/guides", async () => {
    const guides = await loadGuidesFromDir(path.join(process.cwd(), "data", "guides"));
    const guide = guides.find((item) => item.slug === "tipos-de-palas-de-padel");

    expect(guide).toBeDefined();
    expect(guide?.title).toBe("Tipos de palas de pádel: cuál te conviene según tu nivel y estilo");
    expect(guide?.description).toBe(
      "Guía rápida para elegir entre pala redonda, diamante o lágrima según tu estilo de juego en pádel."
    );
    expect(guide?.publishedAt).toBe("2026-03-16");
    expect(guide?.content).toContain("## Las 3 formas de pala");
    expect(guide?.content).toContain("### 1. Redonda");
    expect(guide?.content).toContain("### 2. Diamante");
    expect(guide?.content).toContain("### 3. Lágrima");
    expect(guide?.content).toContain("| Forma | Tipo | Sweet spot | Peso | ¿Para quién? |");
    expect(guide?.content).toContain("/images/guides/tipos-de-palas/redonda.svg");
    expect(guide?.content).toContain("/images/guides/tipos-de-palas/diamante.svg");
    expect(guide?.content).toContain("/images/guides/tipos-de-palas/lagrima.svg");
  });

  it("renderiza imagenes, citas y tablas enriquecidas en la pagina", async () => {
    const page = await GuidePage({
      params: Promise.resolve({ slug: "tipos-de-palas-de-padel" })
    });

    const html = renderToStaticMarkup(page);

    expect(html).toContain('src="/images/guides/tipos-de-palas/redonda.svg"');
    expect(html).toContain('src="/images/guides/tipos-de-palas/diamante.svg"');
    expect(html).toContain('src="/images/guides/tipos-de-palas/lagrima.svg"');
    expect(html).toContain("figure");
    expect(html).toContain("rounded-2xl border border-border/70 bg-secondary/20");
    expect(html).toContain("border-l-4 border-primary/70 bg-primary/10");
    expect(html).toContain("overflow-x-auto rounded-2xl border border-border/70");
    expect(html).toContain("min-w-full border-collapse text-left text-sm");
  });
});
