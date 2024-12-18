export const required = (value) => {
    return value?.toString().trim() ? null : 'This field is required';
};
export const email = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
};
export function validate(value, rules) {
    for (const rule of rules) {
        const error = rule(value);
        if (error)
            return error;
    }
    return null;
}
