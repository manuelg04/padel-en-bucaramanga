export function buildInstagramEmbedPermalink(url: string): string {
  try {
    const parsed = new URL(url);

    parsed.searchParams.set("theme", "dark");

    return parsed.toString();
  } catch {
    return url;
  }
}

type InstagramEmbedsApi = {
  process?: () => void;
};

type InstagramGlobal = {
  instgrm?: {
    Embeds?: InstagramEmbedsApi;
  };
};

function asInstagramGlobal(target: unknown): InstagramGlobal | null {
  if (!target || typeof target !== "object") {
    return null;
  }
  return target as InstagramGlobal;
}

export function processInstagramEmbeds(target?: unknown): boolean {
  const instagramGlobal = asInstagramGlobal(target);
  const processFn = instagramGlobal?.instgrm?.Embeds?.process;

  if (!processFn) {
    return false;
  }

  processFn();
  return true;
}
