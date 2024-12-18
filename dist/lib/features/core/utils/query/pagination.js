export function calculateTotalPages(total, pageSize) {
    return Math.ceil(total / pageSize);
}
export function getPageItems(items, page, pageSize) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
}
export function createPaginationState(initialPage = 1, initialPageSize = 10) {
    return {
        page: initialPage,
        pageSize: initialPageSize,
        total: 0
    };
}
