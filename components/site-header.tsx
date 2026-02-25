import Link from "next/link";
import { mainNav } from "@/lib/site";

export function SiteHeader(): React.JSX.Element {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: "hsl(var(--hero-bg) / 0.96)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 md:px-8">
        <Link href="/padel-bucaramanga" className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md text-[11px] font-black tracking-tight text-white"
            style={{ background: "hsl(var(--accent))" }}
          >
            PB
          </span>
          <span
            className="text-sm font-bold uppercase tracking-wider text-white/85 md:text-base"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Padel{" "}
            <span style={{ color: "hsl(var(--accent))" }}>Bucaramanga</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-0.5 text-sm font-medium">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
