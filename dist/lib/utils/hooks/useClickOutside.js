export function useClickOutside(node, callback) {
    function handleClick(event) {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
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
