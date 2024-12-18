export interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}

export const isActiveRoute = (currentPath: string, href: string, exact = false): boolean => {
  if (exact) {
    return currentPath === href;
  }
  return currentPath.startsWith(href);
};