export function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
}
export function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth);
}
export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}
