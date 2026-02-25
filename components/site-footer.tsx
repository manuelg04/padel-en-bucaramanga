import Link from "next/link";
import { mainNav } from "@/lib/site";

export function SiteFooter(): React.JSX.Element {
  const whatsappUrl = "https://wa.me/573166229191";

  return (
    <footer className="mt-16 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="space-y-3">
            <Link href="/padel-bucaramanga" className="inline-flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-md text-xs font-black tracking-tight text-white"
                style={{ background: "hsl(var(--accent))" }}
              >
                [PB]
              </span>
              <span
                className="text-base font-bold uppercase tracking-[0.16em] text-white/90"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                PADEL <span style={{ color: "hsl(var(--accent))" }}>BUCARAMANGA</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-slate-300">
              Directorio local y guías evergreen
            </p>
          </div>

          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Navegación
            </p>
            <nav aria-label="Enlaces rápidos" className="mt-4 flex flex-col gap-2.5">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-300 transition-colors hover:text-[hsl(var(--accent))]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contacto
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent)_/_0.45)] bg-[hsl(var(--accent)_/_0.12)] px-4 py-2 text-sm font-semibold text-[hsl(var(--accent))] transition-all hover:bg-[hsl(var(--accent)_/_0.2)] hover:text-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.46 0 .08 5.38.08 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62A11.9 11.9 0 0 0 12.08 24h.01c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.57-8.52ZM12.09 21.9h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.66.96.98-3.57-.23-.37a9.8 9.8 0 0 1-1.52-5.25c0-5.43 4.41-9.84 9.84-9.84 2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 0 1 2.88 6.96c0 5.43-4.41 9.84-9.84 9.84Zm5.4-7.36c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.14 3.27 5.2 4.58.72.31 1.29.49 1.73.63.73.23 1.4.2 1.93.12.59-.09 1.77-.73 2.02-1.44.25-.71.25-1.33.18-1.45-.08-.12-.28-.2-.58-.35Z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
            <p className="mt-3 text-sm text-slate-400">Contacto directo: +57 316 622 9191</p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-900 pt-5">
          <p className="text-center text-xs text-slate-500">
            © 2026 Padel Bucaramanga. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
