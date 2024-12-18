// Validation
export function validate(value, rules) {
    for (const rule of rules) {
        const error = rule(value);
        if (error)
            return error;
    }
    return null;
}
export const required = (value) => {
    return value?.toString().trim() ? null : 'This field is required';
};
export const email = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
};
// Storage
export const storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        catch {
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error('Error saving to storage:', error);
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};
// Constants
export const APP_CONFIG = {
    name: 'HyperCog',
    description: 'Self-Improving System',
    version: '0.1.0'
};
export const NOTIFICATION_VARIANTS = {
    info: {
        icon: 'information-circle',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-400'
    },
    success: {
        icon: 'check-circle',
        bgColor: 'bg-green-50',
        textColor: 'text-green-400'
    },
    warning: {
        icon: 'exclamation',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-400'
    },
    error: {
        icon: 'x-circle',
        bgColor: 'bg-red-50',
        textColor: 'text-red-400'
    }
};
