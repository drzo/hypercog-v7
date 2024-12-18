export function paginateData(data, state) {
    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    return data.slice(start, end);
}
export function calculateTotalPages(totalItems, pageSize) {
    return Math.ceil(totalItems / pageSize);
}
