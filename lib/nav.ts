function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isNavItemActive(pathname: string, href: string): boolean {
  const currentPath = normalizePath(pathname);
  const navPath = normalizePath(href);

  if (navPath === "/padel-bucaramanga") {
    return currentPath === "/" || currentPath === navPath;
  }

  return currentPath === navPath || currentPath.startsWith(`${navPath}/`);
}
