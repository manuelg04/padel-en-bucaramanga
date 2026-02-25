import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ClubCard } from "@/components/club-card";
import { ClubFilters } from "@/components/club-filters";
import {
  filterClubs,
  getAllClubs,
  getAllGuides,
  getCityOptions,
  getTagOptions
} from "@/lib/data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

type HubPageProps = {
  searchParams?: Promise<{
    city?: string;
    tag?: string;
  }>;
};

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Padel Bucaramanga: dónde jugar, reservar y mejorar tu nivel",
    description:
      "Hub editorial con directorio de clubes de padel en Bucaramanga, filtros por ciudad/tags y guías prácticas para jugar mejor.",
    path: "/padel-bucaramanga"
  });
}

const faqItems = [
  {
    question: "¿Dónde jugar padel/pádel en Bucaramanga?",
    answer:
      "Empieza por comparar clubes del área metropolitana según ciudad, tipo de cancha, horarios y método de reserva. En este hub puedes filtrar por Bucaramanga, Floridablanca, Girón o Piedecuesta y revisar enlaces directos a cada sede."
  },
  {
    question: "¿Cuánto cuesta alquilar una cancha?",
    answer:
      "El precio cambia por horario, duración de la reserva y servicios incluidos. En general, la franja pico suele ser más costosa. La mejor práctica es confirmar tarifa vigente por WhatsApp o sitio web oficial del club antes de cerrar la reserva."
  },
  {
    question: "¿Hay clases?",
    answer:
      "Sí. Muchos clubes ofrecen clases de padel bucaramanga en formato individual y grupal. Para elegir bien, revisa cupo por grupo, nivel objetivo y frecuencia semanal recomendada por el entrenador."
  },
  {
    question: "¿Cómo reservar?",
    answer:
      "La reserva suele hacerse por WhatsApp, formulario web o mensajes directos en Instagram. Lo ideal es enviar fecha, hora, nivel y número de jugadores para recibir confirmación rápida y evitar cruces en agenda."
  }
];

function buildFaqJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export default async function PadelBucaramangaHub({
  searchParams
}: HubPageProps): Promise<React.JSX.Element> {
  const [clubs, guides, cities, tags] = await Promise.all([
    getAllClubs(),
    getAllGuides(),
    getCityOptions(),
    getTagOptions()
  ]);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const city = resolvedSearchParams?.city?.trim();
  const tag = resolvedSearchParams?.tag?.trim();
  const filteredClubs = filterClubs(clubs, { city, tag });

  return (
    <>
      <JsonLd data={buildFaqJsonLd()} />

      <section
        className="-mx-4 -mt-6 overflow-hidden px-4 py-16 md:-mx-8 md:px-8 md:py-24 xl:-mx-12 xl:px-12"
        style={{ background: "hsl(var(--hero-bg))" }}
      >
        <div className="relative mx-auto max-w-4xl">
          <svg
            className="animate-court-pulse pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 480"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <rect
              x="60" y="40" width="680" height="400"
              stroke="hsl(var(--primary) / 0.25)" strokeWidth="1.5"
              className="animate-hero-line-draw"
              strokeDasharray="1000"
            />
            <line
              x1="400" y1="40" x2="400" y2="440"
              stroke="hsl(var(--primary) / 0.25)" strokeWidth="1"
              className="animate-hero-line-draw animation-delay-300"
              strokeDasharray="1000"
            />
            <line
              x1="60" y1="240" x2="740" y2="240"
              stroke="hsl(var(--primary) / 0.25)" strokeWidth="1"
              className="animate-hero-line-draw animation-delay-200"
              strokeDasharray="1000"
            />
            <rect
              x="300" y="160" width="200" height="160"
              stroke="hsl(var(--primary) / 0.25)" strokeWidth="1"
              className="animate-hero-line-draw animation-delay-400"
              strokeDasharray="1000"
            />
          </svg>

          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "hsl(var(--accent) / 0.18)" }}
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.12)" }}
          />

          <div className="relative grid gap-5">
            <span
              className="animate-badge-pop inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: "hsl(var(--accent))" }}
            >
              Guía Local · Bucaramanga
            </span>

            <h1
              className="animate-hero-fade-up animation-delay-100 max-w-3xl text-[2.5rem] font-bold uppercase leading-[1.05] tracking-tight text-white md:text-6xl xl:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Juega Padel{" "}
              <span style={{ color: "hsl(var(--accent))" }}>
                en Bucaramanga
              </span>
            </h1>

            <p
              className="animate-hero-fade-up animation-delay-200 max-w-2xl text-lg font-light leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Directorio editorial de clubes, guías prácticas y filtros para
              encontrar cancha, reservar con criterio y mejorar tu nivel en el
              área metropolitana.
            </p>

            <div className="animate-hero-fade-up animation-delay-300 flex flex-wrap gap-3 text-sm">
              <Link
                href="/clubes"
                className="rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-opacity hover:opacity-90"
                style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
              >
                Ver todos los clubes
              </Link>
              <Link
                href="/guias"
                className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                Leer guías
              </Link>
            </div>

            <p
              className="animate-hero-fade-up animation-delay-400 text-xs font-medium tracking-widest uppercase"
              style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}
            >
              {clubs.length}+ Clubes · 4 Ciudades · Actualizado Feb 2026
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Área Metropolitana
            </p>
            <h2
              className="mt-0.5 text-3xl font-bold uppercase tracking-wide"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Directorio de clubes
            </h2>
          </div>
          <p className="text-sm tabular-nums text-muted-foreground">
            {filteredClubs.length} resultado{filteredClubs.length !== 1 ? "s" : ""}
          </p>
        </div>

        <ClubFilters
          cities={cities}
          tags={tags}
          selectedCity={city}
          selectedTag={tag}
          clearHref="/padel-bucaramanga"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredClubs.map((club) => (
            <ClubCard club={club} key={club.slug} />
          ))}
        </div>

        <Link href="/clubes" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Explorar listado completo de clubes →
        </Link>
      </section>

      <section className="mt-14 grid gap-5">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "hsl(var(--accent))" }}
          >
            Aprende
          </p>
          <h2
            className="mt-0.5 text-3xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Guías recomendadas
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="guide-card-inner overflow-hidden rounded-xl border border-border/70 bg-card pl-5 pr-5 pb-5"
            >
              <div
                className="mb-4 -mx-5 h-1"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--accent)))"
                }}
              />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {new Date(guide.publishedAt).toLocaleDateString("es-CO", {
                  month: "short",
                  year: "numeric"
                })}
              </p>
              <h3
                className="mt-1 line-clamp-2 text-lg font-bold uppercase tracking-wide leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {guide.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-foreground/75">
                {guide.description}
              </p>
              <Link
                href={`/guias/${guide.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Leer guía <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="-mx-4 mt-14 px-4 py-12 md:-mx-8 md:px-8 xl:-mx-12 xl:px-12"
        style={{ background: "hsl(var(--hero-bg))" }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Preguntas frecuentes
            </p>
            <h2
              className="mt-1 text-3xl font-bold uppercase tracking-wide text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              FAQ: padel bucaramanga
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-semibold text-white/90">
                  <span>{item.question}</span>
                  <span className="mt-0.5 shrink-0 text-base text-white/50 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p
                  className="mt-3 text-sm font-light leading-relaxed"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="prose mt-14 max-w-none border-l-4 rounded-2xl px-6 py-8 shadow-sm md:px-10"
        style={{ borderColor: "hsl(var(--primary) / 0.5)", background: "hsl(var(--card))" }}
      >
        <h2 style={{ fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "0.02em" }}>Dónde jugar padel y pádel en Bucaramanga sin perder tiempo</h2>
        <p>
          Buscar una cancha ideal no debería convertirse en una cadena interminable de mensajes. Este
          hub está diseñado para que cualquier persona que quiera jugar pádel en Bucaramanga pueda
          filtrar opciones, revisar información pública y tomar una decisión con criterio. La realidad
          local es que la oferta está creciendo, aparecen nuevos formatos de clubes y cada sede tiene
          reglas de reserva distintas. Por eso, en lugar de una lista suelta, te mostramos un sistema
          de navegación que conecta directorio, fichas individuales y guías evergreen.
        </p>
        <p>
          La keyword principal, &quot;padel bucaramanga&quot;, suele tener intención mixta: algunas personas
          buscan canchas de padel en Bucaramanga para un partido puntual, otras comparan clubes de
          padel Bucaramanga para entrenar toda la semana y un grupo más quiere empezar desde cero con
          clases y reglas básicas. Este portal resuelve esas tres necesidades. Primero, muestra clubes
          filtrables por ciudad y tags. Segundo, ofrece páginas de detalle con links clave para
          contacto rápido. Tercero, organiza contenido educativo para dudas recurrentes como costos,
          niveles y categorías.
        </p>
        <p>
          Si juegas en la zona centro-oriente, probablemente te interese optimizar desplazamientos y
          reservar en horarios de baja congestión. Si vienes desde el área metropolitana, el criterio
          cambia: a veces conviene priorizar padel Floridablanca por cercanía laboral y dejar
          Bucaramanga para fines de semana. También hay jugadores que alternan entre canchas indoor y
          outdoor según clima, presupuesto o tipo de partido. No existe una respuesta única, pero sí
          una metodología sencilla para elegir mejor: define objetivo, filtra por ubicación y valida
          disponibilidad real antes de confirmar.
        </p>
        <p>
          Al evaluar clubes de pádel, evita decidir solo por redes sociales. Una cuenta activa en
          Instagram ayuda, pero no reemplaza información práctica: tiempo de bloque, políticas de
          cambio, tipo de iluminación, nivel promedio de jugadores y canales de soporte. En nuestro
          directorio encontrarás enlaces a Instagram, WhatsApp, sitio web y Google Maps cuando esa
          información pública exista. De esta forma puedes ir directo a la fuente y verificar si el
          club encaja con tu rutina. Ese enfoque también mejora la experiencia de quien necesita
          reservar cancha padel Bucaramanga con poca anticipación.
        </p>
        <p>
          Otro punto relevante para quienes están empezando es distinguir partido social vs sesión de
          aprendizaje. Cuando una persona nueva entra a una pista con ritmo alto, tiende a frustrarse
          y abandona antes de consolidar técnica. Por eso recomendamos combinar práctica guiada con
          partidos amistosos de nivel similar. Las clases de padel Bucaramanga funcionan mejor cuando
          hay objetivos claros por ciclo: control de volea, salida de pared, posicionamiento en dobles
          y lectura de juego. Esa progresión evita lesiones por sobrecarga y acelera resultados en
          cancha.
        </p>
        <p>
          En términos de costos, la variable más fuerte sigue siendo la franja horaria. Las horas pico
          tienen demanda alta y menos flexibilidad, mientras que las horas valle pueden ofrecer mejor
          relación valor-tiempo. Si juegas de forma constante, pregunta por paquetes, ligas internas o
          bonos por bloque fijo. Esto aplica tanto para canchas de pádel Floridablanca como para
          sedes en Bucaramanga y municipios cercanos. En nuestra sección de guías encontrarás una
          estructura para presupuestar mensualidad sin improvisar.
        </p>
        <p>
          La autoridad temática de este portal se apoya en contenido útil y navegación clara. Cada guía
          enlaza de vuelta al hub y a clubes relacionados para que no te quedes en teoría. A su vez,
          cada ficha de club enlaza al hub para mantener contexto y comparar opciones. Esta arquitectura
          ayuda al usuario a descubrir rápidamente qué sede le conviene y también mejora señales SEO de
          relevancia alrededor de búsquedas como &quot;jugar pádel en bucaramanga&quot;, &quot;clubes de
          padel bucaramanga&quot; y &quot;reservar cancha padel bucaramanga&quot;.
        </p>
        <p>
          Usa este hub como un tablero práctico. Filtra, compara, abre la ficha del club que te
          interese y confirma disponibilidad en el canal oficial. Luego revisa guías para mejorar tu
          proceso de reserva, entender categorías y entrenar con propósito. Si haces eso de forma
          consistente, pasarás de una búsqueda genérica de &quot;padel bucaramanga&quot; a un plan semanal
          sostenible para jugar mejor y disfrutar más cada partido.
        </p>
      </section>

      <section className="sr-only">
        <a href={absoluteUrl("/padel-bucaramanga")}>Canonical</a>
      </section>
    </>
  );
}
