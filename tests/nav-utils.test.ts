import { describe, expect, it } from "vitest";
import { isNavItemActive } from "@/lib/nav";

describe("isNavItemActive", () => {
  it("marks exact nav route as active", () => {
    expect(isNavItemActive("/clubes", "/clubes")).toBe(true);
  });

  it("marks nested routes as active", () => {
    expect(isNavItemActive("/clubes/padel-club", "/clubes")).toBe(true);
  });

  it("keeps other sections inactive", () => {
    expect(isNavItemActive("/guias", "/clubes")).toBe(false);
  });

  it("treats root as Hub", () => {
    expect(isNavItemActive("/", "/padel-bucaramanga")).toBe(true);
  });
});
