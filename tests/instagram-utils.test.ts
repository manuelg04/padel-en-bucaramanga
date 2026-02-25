import { describe, expect, it } from "vitest";
import { buildInstagramEmbedPermalink, processInstagramEmbeds } from "@/lib/instagram";

describe("buildInstagramEmbedPermalink", () => {
  it("adds theme=dark when query is empty", () => {
    expect(buildInstagramEmbedPermalink("https://www.instagram.com/p/ABC123/")).toBe(
      "https://www.instagram.com/p/ABC123/?theme=dark"
    );
  });

  it("preserves existing params and appends theme=dark", () => {
    expect(
      buildInstagramEmbedPermalink("https://www.instagram.com/p/ABC123/?img_index=1")
    ).toBe("https://www.instagram.com/p/ABC123/?img_index=1&theme=dark");
  });

  it("replaces existing theme param with dark", () => {
    expect(
      buildInstagramEmbedPermalink("https://www.instagram.com/p/ABC123/?theme=light&img_index=1")
    ).toBe("https://www.instagram.com/p/ABC123/?theme=dark&img_index=1");
  });

  it("returns original value when URL is invalid", () => {
    expect(buildInstagramEmbedPermalink("not-a-url")).toBe("not-a-url");
  });
});

describe("processInstagramEmbeds", () => {
  it("returns false when embed api is unavailable", () => {
    expect(processInstagramEmbeds(undefined)).toBe(false);
    expect(processInstagramEmbeds({})).toBe(false);
    expect(processInstagramEmbeds({ instgrm: {} })).toBe(false);
  });

  it("calls process and returns true when embed api exists", () => {
    let called = 0;

    const result = processInstagramEmbeds({
      instgrm: {
        Embeds: {
          process: () => {
            called += 1;
          }
        }
      }
    });

    expect(result).toBe(true);
    expect(called).toBe(1);
  });
});
