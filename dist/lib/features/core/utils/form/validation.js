export function validateField(value, rules) {
    for (const rule of rules) {
        const error = rule(value);
        if (error)
            return error;
    }
    return null;
}
export function validateForm(values, rules) {
    const errors = {};
    Object.entries(rules).forEach(([field, fieldRules]) => {
        errors[field] = validateField(values[field], fieldRules);
    });
    return errors;
}
