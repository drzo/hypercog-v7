export function isAuthenticated(user) {
    return user !== null;
}
export function hasRole(user, role) {
    return user?.role === role;
}
export function getInitials(user) {
    if (!user?.name)
        return '';
    return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
}
