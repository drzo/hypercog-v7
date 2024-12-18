/**
 * Filter array by a specific key-value pair
 */
export function filterByValue(array, key, value) {
    return array.filter(item => item[key] === value);
}
/**
 * Filter array by multiple possible values for a key
 */
export function filterByValues(array, key, values) {
    return array.filter(item => values.includes(item[key]));
}
/**
 * Filter array using a predicate function
 */
export function filterByPredicate(array, predicate) {
    return array.filter(predicate);
}
/**
 * Remove items from array by value
 */
export function removeByValue(array, key, value) {
    return array.filter(item => item[key] !== value);
}
