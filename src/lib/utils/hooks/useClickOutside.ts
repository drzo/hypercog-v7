export function useClickOutside(node: HTMLElement, callback: () => void) {
  function handleClick(event: MouseEvent) {
    if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
      callback();
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}