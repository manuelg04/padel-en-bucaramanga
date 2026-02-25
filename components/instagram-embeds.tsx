"use client";

import { useEffect, useMemo } from "react";
import Script from "next/script";
import { buildInstagramEmbedPermalink, processInstagramEmbeds } from "@/lib/instagram";

type InstagramEmbedsProps = {
  urls: string[];
};

export function InstagramEmbeds({ urls }: InstagramEmbedsProps): React.JSX.Element | null {
  const urlsKey = useMemo(() => urls.join("|"), [urls]);

  useEffect(() => {
    if (urls.length === 0) {
      return;
    }
    processInstagramEmbeds(window);
  }, [urls.length, urlsKey]);

  const handleInstagramReady = (): void => {
    if (urls.length === 0) {
      return;
    }
    processInstagramEmbeds(window);
  };

  if (urls.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-black uppercase tracking-wide text-primary" style={{ fontFamily: "var(--font-heading)" }}>
        Publicaciones recientes
      </h2>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Vista editorial de Instagram en formato tarjeta. Si un Reel es más largo, se desplaza dentro
        de su propio contenedor para mantener el layout limpio.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {urls.map((url) => {
          const permalink = buildInstagramEmbedPermalink(url);

          return (
            <article
              key={url}
              className="instagram-embed-card rounded-2xl border border-slate-700 bg-slate-900/80 p-3 shadow-sm"
            >
              <div className="instagram-embed-scroll h-[560px] overflow-y-auto rounded-xl">
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={permalink}
                  data-instgrm-theme="dark"
                  data-instgrm-version="14"
                >
                  <a href={url} target="_blank" rel="noreferrer noopener" className="text-sm text-primary">
                    Ver publicación en Instagram
                  </a>
                </blockquote>
              </div>
            </article>
          );
        })}
      </div>

      <Script
        id="instagram-embed-script"
        async
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onReady={handleInstagramReady}
        onLoad={handleInstagramReady}
      />
    </section>
  );
}
