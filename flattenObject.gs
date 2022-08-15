/**
 * Flattens a value to an object, if it's not scalar.
 * @example [2] => {'0': 2}, {x: {y: 0}} => {'x.y': 0}, 0 => 0, 'str' => 'str'
 * 
 * @param {unknown} x Value to flatten. If scalar, just returned
 * @param {string} baseFieldName Parent field name, e.g. '_attachments.1'. Resulting field names get prepended with this
 * @returns {Object.<string, unknown>} Flattened object structure. If x is scalar, x is returned
 */
function flattenObject(x, baseFieldName = null) {
    if (!_.isObject(x)) {
        if (baseFieldName) {
            return { [baseFieldName]: x };
        }
        return x;
    }
    const result = {}
    if (_.isArray(x)) {
        for (let i = 0; i < x.length; i++) {
            const value = x[i]
            const nestedKey = baseFieldName ? (baseFieldName + '.' + _.toString(i)) : _.toString(i);
            _.assign(result, flattenObject(value, nestedKey))
        }
    } else {
        for (let [key, value] of _.entries(x)) {
            const nestedKey = baseFieldName ? (baseFieldName + '.' + key) : key;
            _.assign(result, flattenObject(value, nestedKey))
        }
    }

    return result;
}
