export const isActiveRoute = (currentPath, href, exact = false) => {
    if (exact) {
        return currentPath === href;
    }
    return currentPath.startsWith(href);
};
