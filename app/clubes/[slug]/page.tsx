import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InstagramEmbeds } from "@/components/instagram-embeds";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllClubs, getClubBySlug } from "@/lib/data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

type ClubDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function buildClubFaq(name: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `¿Cómo reservar en ${name}?`,
      answer:
        "En la mayoría de casos puedes reservar por WhatsApp o Instagram. Envía fecha, hora y número de jugadores para recibir confirmación del turno."
    },
    {
      question: `¿${name} ofrece clases?`,
      answer:
        "Revisa los tags del club y sus enlaces oficiales para validar si tiene clases grupales o individuales en este momento."
    },
    {
      question: `¿Hay opción para principiantes en ${name}?`,
      answer:
        "Sí, normalmente hay franjas de baja demanda ideales para primeros partidos y sesiones de adaptación."
    }
  ];
}

function buildBreadcrumbJsonLd(slug: string, name: string): Record<string, unknown> {
  const items = [
    { name: "Inicio", item: absoluteUrl("/padel-bucaramanga"), position: 1 },
    { name: "Clubes", item: absoluteUrl("/clubes"), position: 2 },
    { name, item: absoluteUrl(`/clubes/${slug}`), position: 3 }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item
    }))
  };
}

function buildFaqPageJsonLd(faq: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

function buildSportsLocationJsonLd(slug: string, club: Awaited<ReturnType<typeof getClubBySlug>>): Record<string, unknown> {
  if (!club) {
    return {};
  }

  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: club.name,
    url: absoluteUrl(`/clubes/${slug}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: club.address,
      addressLocality: club.city,
      addressCountry: "CO"
    },
    sameAs: [club.instagramUrl, club.website, club.googleMapsUrl].filter(Boolean),
    sport: "Padel"
  };
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const clubs = await getAllClubs();
  return clubs.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: ClubDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return buildMetadata({
      title: "Club no encontrado",
      description: "Este club no existe en el directorio.",
      path: `/clubes/${slug}`
    });
  }

  return buildMetadata({
    title: `${club.name} en ${club.city} | Club de padel`,
    description: `Ficha de ${club.name}: dirección, enlaces oficiales, reservas y FAQ para jugar padel en ${club.city}.`,
    path: `/clubes/${club.slug}`
  });
}

export default async function ClubDetailPage({ params }: ClubDetailPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    notFound();
  }

  const faq = buildClubFaq(club.name);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(club.slug, club.name)} />
      <JsonLd data={buildSportsLocationJsonLd(club.slug, club)} />
      <JsonLd data={buildFaqPageJsonLd(faq)} />

      <Breadcrumbs
        items={[
          { label: "Hub", href: "/padel-bucaramanga" },
          { label: "Clubes", href: "/clubes" },
          { label: club.name }
        ]}
      />

      <section className="grid gap-6">
        <header className="space-y-3 rounded-2xl border border-border/70 bg-card p-6">
          <Badge className="w-fit bg-secondary text-secondary-foreground">{club.city}</Badge>
          <h1 className="text-4xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
            {club.name}
          </h1>
          <p className="text-foreground/85">{club.address}</p>

          <div className="flex flex-wrap gap-3">
            <a href={club.instagramUrl} target="_blank" rel="noreferrer noopener">
              <Button>Instagram</Button>
            </a>
            {club.whatsapp ? (
              <a href={club.whatsapp} target="_blank" rel="noreferrer noopener">
                <Button variant="outline">WhatsApp</Button>
              </a>
            ) : null}
            {club.website ? (
              <a href={club.website} target="_blank" rel="noreferrer noopener">
                <Button variant="outline">Sitio web</Button>
              </a>
            ) : null}
            {club.googleMapsUrl ? (
              <a href={club.googleMapsUrl} target="_blank" rel="noreferrer noopener">
                <Button variant="outline">Google Maps</Button>
              </a>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {club.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {club.bookingNotes ? (
            <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Reserva rápida</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">⚡ {club.bookingNotes}</p>
            </div>
          ) : null}
        </header>

        <InstagramEmbeds urls={club.instagramPostUrls} />

        <section className="rounded-xl border border-border/70 bg-card p-6">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            FAQ del club
          </h2>
          <div className="mt-4 space-y-3">
            {faq.map((item) => (
              <details key={item.question} className="rounded-md border border-border/70 bg-background p-4">
                <summary className="cursor-pointer text-sm font-semibold">{item.question}</summary>
                <p className="mt-2 text-sm text-foreground/85">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="flex gap-4 text-sm">
          <Link href="/padel-bucaramanga" className="text-primary underline">
            Volver al hub
          </Link>
          <Link href="/clubes" className="text-primary underline">
            Ver más clubes
          </Link>
        </div>
      </section>
    </>
  );
}
