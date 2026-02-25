import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown, { type Components } from "react-markdown";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllClubs, getAllGuides, getGuideBySlug } from "@/lib/data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ReservationMethod = {
  label: string;
  detail: React.ReactNode;
  badgeClassName: string;
  short: string;
};

type EditorialFaq = {
  question: string;
  answer: string;
};

const guideMarkdownComponents: Components = {
  h2: ({ children }) => (
    <h2
      className="mt-12 text-3xl font-black uppercase tracking-[0.06em] text-primary"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className="mt-8 text-xl font-bold text-foreground"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-6 leading-relaxed text-secondary-foreground">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  ul: ({ children }) => <ul className="mb-6 list-disc space-y-3 pl-6 leading-relaxed">{children}</ul>,
  ol: ({ children }) => <ol className="mb-6 list-decimal space-y-3 pl-6 leading-relaxed">{children}</ol>,
  li: ({ children }) => <li className="text-secondary-foreground">{children}</li>
};

const reservationMethods: ReservationMethod[] = [
  {
    label: "EasyCancha",
    detail: (
      <>
        Usa la app cuando el club tenga agenda activa para ver disponibilidad por horario y reservar
        sin fricción.
      </>
    ),
    badgeClassName: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    short: "EC"
  },
  {
    label: "WhatsApp",
    detail: (
      <>
        Ideal para confirmar cupo rápido, resolver dudas de tarifa y coordinar cambios de turno en el
        mismo chat.
      </>
    ),
    badgeClassName: "bg-lime-500/20 text-lime-300 border-lime-400/40",
    short: "WA"
  },
  {
    label: "Instagram (DM / link en bio)",
    detail: (
      <>
        Útil para revisar promociones, ver novedades y validar información reciente antes de salir hacia
        la cancha.
      </>
    ),
    badgeClassName: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/40",
    short: "IG"
  }
];

const editorialFaq: EditorialFaq[] = [
  {
    question: "¿Dónde jugar pádel Bucaramanga si vivo en Floridablanca?",
    answer:
      "Prioriza sedes de Floridablanca y Ruitoque para reducir desplazamiento, y compáralas con clubes de Bucaramanga según horario pico o valle."
  },
  {
    question: "¿Qué método de reserva es más rápido?",
    answer:
      "Cuando el club tiene EasyCancha activa suele ser el camino más directo. Si no, WhatsApp o DM en Instagram funciona muy bien para confirmar disponibilidad."
  },
  {
    question: "¿Es mejor reservar entre semana o fin de semana?",
    answer:
      "En franjas valle de lunes a jueves suele haber más disponibilidad y respuesta más rápida para ajustar horarios."
  },
  {
    question: "¿Dónde veo cambios de horarios o torneos?",
    answer:
      "Normalmente el primer canal de actualización es Instagram: historias, posts fijados y link en bio del club."
  },
  {
    question: "¿La información de esta guía puede cambiar?",
    answer:
      "Sí. Información recopilada de fuentes públicas (Instagram/EasyCancha) y puede cambiar; confirma siempre en el perfil oficial del club antes de reservar."
  }
];

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const guides = await getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

function buildBreadcrumbJsonLd(slug: string, title: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hub",
        item: absoluteUrl("/padel-bucaramanga")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guías",
        item: absoluteUrl("/guias")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: absoluteUrl(`/guias/${slug}`)
      }
    ]
  };
}

function buildArticleJsonLd(slug: string, guide: Awaited<ReturnType<typeof getGuideBySlug>>): Record<string, unknown> {
  if (!guide) {
    return {};
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.lastModified ?? guide.publishedAt,
    inLanguage: "es-CO",
    image: absoluteUrl("/opengraph-image.png"),
    mainEntityOfPage: absoluteUrl(`/guias/${slug}`),
    author: {
      "@type": "Organization",
      name: "Padel Bucaramanga",
      url: absoluteUrl("/")
    },
    publisher: {
      "@type": "Organization",
      name: "Padel Bucaramanga",
      url: absoluteUrl("/")
    }
  };
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return buildMetadata({
      title: "Guía no encontrada",
      description: "La guía solicitada no existe.",
      path: `/guias/${slug}`
    });
  }

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guias/${guide.slug}`,
    ogType: "article",
    publishedTime: guide.publishedAt
  });
}

export default async function GuidePage({ params }: GuidePageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const [guide, clubs] = await Promise.all([getGuideBySlug(slug), getAllClubs()]);

  if (!guide) {
    notFound();
  }

  const isDondJugarGuide = guide.slug === "donde-jugar-padel-en-bucaramanga";

  const clubsBySlug = new Map(clubs.map((club) => [club.slug, club]));
  const relatedClubs = guide.relatedClubSlugs
    .map((clubSlug) => clubsBySlug.get(clubSlug))
    .filter((club): club is NonNullable<typeof club> => Boolean(club));
  const clubDirectoryMarker = "<!-- CLUB_DIRECTORY -->";
  const [introMarkdown = "", ...restMarkdown] = guide.content.split(clubDirectoryMarker);
  const hasClubDirectory = restMarkdown.length > 0;
  const trailingMarkdown = restMarkdown.join(clubDirectoryMarker);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(guide.slug, guide.title)} />
      <JsonLd data={buildArticleJsonLd(guide.slug, guide)} />

      <Breadcrumbs
        items={[
          { label: "Hub", href: "/padel-bucaramanga" },
          { label: "Guías", href: "/guias" },
          { label: guide.title }
        ]}
      />

      <article className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
        <header className="space-y-4">
          <Badge className="w-fit bg-secondary text-secondary-foreground">Guía</Badge>
          <h1 className="text-4xl font-black md:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            {guide.h1 ?? guide.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-muted-foreground">Publicado: {guide.publishedAt}</p>
            <Badge className="border border-primary/30 bg-primary/15 text-primary">Actualizado</Badge>
          </div>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">{guide.description}</p>
        </header>

        <div className="mt-8 max-w-3xl">
          <ReactMarkdown components={guideMarkdownComponents}>{introMarkdown}</ReactMarkdown>
        </div>

        <hr className="my-8 border-slate-800" />

        {hasClubDirectory ? (
          <section className="mt-10 space-y-4">
            <h2
              className="text-3xl font-black uppercase tracking-[0.06em] text-primary"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Clubes de pádel en Bucaramanga y área metropolitana
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-foreground/90">
              Directorio editorial con dirección, contacto y vías de reserva pública. Usa <strong>Ver
              detalles</strong> para abrir cada ficha del club.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedClubs.map((club) => {
                const reserveUrl = club.website ?? club.whatsapp;
                const reserveLabel = reserveUrl?.includes("easycancha")
                  ? "Reservar (EasyCancha)"
                  : "Reservar";

                return (
                  <Card key={club.slug} className="border-border/70">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                        {club.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {club.zone ? `${club.zone} · ${club.city}` : club.city}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-foreground/90">{club.address}</p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/clubes/${club.slug}`}
                          className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                          Ver detalles
                        </Link>
                        {club.instagramUrl ? (
                          <a
                            href={club.instagramUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex h-10 items-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                          >
                            Instagram
                          </a>
                        ) : null}
                        {reserveUrl ? (
                          <a
                            href={reserveUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex h-10 items-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                          >
                            {reserveLabel}
                          </a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mt-10 space-y-3 rounded-xl border border-border/70 bg-background p-5">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Clubes relacionados
            </h2>
            {relatedClubs.length === 0 ? (
              <p className="text-sm text-foreground/85">Pronto agregaremos clubes sugeridos para esta guía.</p>
            ) : (
              <ul className="grid gap-2">
                {relatedClubs.map((club) => (
                  <li key={club.slug}>
                    <Link href={`/clubes/${club.slug}`} className="text-primary underline">
                      {club.name} ({club.city})
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {isDondJugarGuide ? (
          <>
            <section className="mt-12 max-w-3xl space-y-5">
              <h2
                className="text-3xl font-black uppercase tracking-[0.06em] text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Cómo reservar cancha (Instagram, WhatsApp y EasyCancha)
              </h2>
              <ul className="space-y-4">
                {reservationMethods.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 leading-relaxed"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${item.badgeClassName}`}
                      >
                        {item.short}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                    </div>
                    <p className="mt-3 text-secondary-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="leading-relaxed text-secondary-foreground">
                Recomendación editorial: antes de pagar, confirma en el canal oficial del club tarifa,
                duración del turno y política de cancelación para evitar cruces en horario valle.
              </p>
            </section>

            <section className="mt-12 max-w-3xl space-y-5">
              <h2
                className="text-3xl font-black uppercase tracking-[0.06em] text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Preguntas frecuentes sobre pádel en Bucaramanga
              </h2>
              <div className="space-y-3">
                {editorialFaq.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-xl border border-slate-700 bg-[#1E293B] px-4 py-3"
                  >
                    <summary className="cursor-pointer text-base font-semibold text-white">
                      {item.question}
                    </summary>
                    <p className="mt-3 leading-relaxed text-slate-300">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        ) : hasClubDirectory && trailingMarkdown.trim() ? (
          <div className="mt-10 max-w-3xl">
            <ReactMarkdown components={guideMarkdownComponents}>{trailingMarkdown}</ReactMarkdown>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/padel-bucaramanga" className="text-primary underline">
            Volver al hub
          </Link>
          <Link href="/guias" className="text-primary underline">
            Ver todas las guías
          </Link>
        </div>
      </article>
    </>
  );
}
