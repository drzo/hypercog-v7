export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};
export const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
