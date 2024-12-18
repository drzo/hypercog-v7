export const required = (value) => {
    return value?.toString().trim() ? null : 'This field is required';
};
export const email = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
};
export function validate(value, rules) {
    const errors = [];
    for (const rule of rules) {
        const error = rule(value);
        if (error) {
            errors.push(error);
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
