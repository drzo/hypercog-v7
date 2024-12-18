export const truncate = (str, length) => {
    if (str.length <= length)
        return str;
    return str.slice(0, length) + '...';
};
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};
