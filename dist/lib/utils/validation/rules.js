export const required = (value) => {
    if (value === undefined || value === null || value === '') {
        return 'This field is required';
    }
    return null;
};
export const email = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
};
export const minLength = (min) => (value) => {
    return value.length >= min ? null : `Must be at least ${min} characters`;
};
export const maxLength = (max) => (value) => {
    return value.length <= max ? null : `Must be no more than ${max} characters`;
};
