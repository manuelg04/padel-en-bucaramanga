import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllGuides } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Guías de padel y pádel en Bucaramanga",
    description:
      "Biblioteca de guías evergreen para jugar mejor, reservar cancha y entender costos/categorías de pádel en Bucaramanga.",
    path: "/guias"
  });
}

export default async function GuiasPage(): Promise<React.JSX.Element> {
  const guides = await getAllGuides();

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <Badge className="w-fit bg-secondary text-secondary-foreground">Blog evergreen</Badge>
        <h1 className="text-4xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
          Guías para jugar pádel en Bucaramanga
        </h1>
        <p className="max-w-3xl text-foreground/85">
          Recursos editoriales para resolver dudas de precio, clases, reglas y progresión de nivel.
          Cada guía conecta con el hub y clubes relevantes.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.slug} className="border-border/70">
            <CardHeader>
              <CardTitle className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                <Link href={`/guias/${guide.slug}`} className="hover:text-primary">
                  {guide.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/85">{guide.description}</p>
              <Link href={`/guias/${guide.slug}`} className="mt-4 inline-block text-sm text-primary underline">
                Abrir guía
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/padel-bucaramanga" className="text-sm text-primary underline">
        Volver al hub principal
      </Link>
    </section>
  );
}
