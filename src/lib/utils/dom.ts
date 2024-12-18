export function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

export function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}