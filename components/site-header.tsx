"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavItemActive } from "@/lib/nav";
import { mainNav } from "@/lib/site";

export function SiteHeader(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl"
      style={{ background: "hsl(var(--hero-bg) / 0.75)" }}
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

        <div className="flex items-center gap-2 md:gap-3">
          <nav aria-label="Principal" className="flex items-center gap-0.5 text-sm font-medium">
            {mainNav.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3 py-1.5 transition-colors ${
                    isActive
                      ? "bg-white/10 font-semibold text-[hsl(var(--accent))]"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full"
                      style={{ background: "hsl(var(--accent))" }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <a
            href="https://wa.me/573166229191"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center rounded-full border border-[hsl(var(--accent)_/_0.55)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--accent))] transition-all hover:bg-[hsl(var(--accent)_/_0.16)] hover:text-white sm:inline-flex"
          >
            Suma tu club
          </a>
        </div>
      </div>
    </header>
  );
}
