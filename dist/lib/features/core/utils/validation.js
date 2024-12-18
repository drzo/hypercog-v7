export const required = (value) => {
    if (value === undefined || value === null || value === '') {
        return 'This field is required';
    }
    return null;
};
export const email = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Invalid email address';
    }
    return null;
};
export const minLength = (min) => (value) => {
    if (value.length < min) {
        return `Must be at least ${min} characters`;
    }
    return null;
};
export const maxLength = (max) => (value) => {
    if (value.length > max) {
        return `Must be no more than ${max} characters`;
    }
    return null;
};
