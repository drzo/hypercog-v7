export function validate(value, rules, options = {}) {
    const errors = [];
    for (const rule of rules) {
        const error = rule(value);
        if (error) {
            errors.push(error);
            if (options.stopOnFirst) {
                break;
            }
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
export function validateObject(obj, validationRules, options = {}) {
    const results = {};
    for (const key in validationRules) {
        const rules = validationRules[key] || [];
        results[key] = validate(obj[key], rules, options);
    }
    return results;
}
