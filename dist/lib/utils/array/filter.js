export function filterByValue(array, key, value) {
    return array.filter(item => item[key] === value);
}
export function filterByValues(array, key, values) {
    return array.filter(item => values.includes(item[key]));
}
export function filterByPredicate(array, predicate) {
    return array.filter(predicate);
}
export function removeByValue(array, key, value) {
    return array.filter(item => item[key] !== value);
}
