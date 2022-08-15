/**
 * Substitutes in every entry in array
 * Text from prefilled array
 *
 * @param {array} input The array of strings.
 * @param {array} subTable The array of string pairs: search texts / replace texts.
 * @param {boolean} caseSensitive [optional=false] 
 * TRUE to match Apple and apple as different words
 * @return The input with all replacement made
 * @customfunction
 */
function substitutes(input, subTable, caseSensitive) {
    //  default behavior it is not case sensitive
    caseSensitive = caseSensitive || false;
    // if the input is not a list, become a list */
    if (typeof input != "object") {
        input = [input];
    }
    var res = [], text;
    for (var i = 0; i < input.length; i++) {
        // force each array element in the input be a string
        text = input[i].toString();
        for (var ii = 0; ii < subTable.length; ii++) {
            text = replaceAll_(
                text,
                subTable[ii][0],
                subTable[ii][1],
                caseSensitive);
        }
        res.push(text);
    }
    return res;
}


/***
 * JavaScript Non-regex Replace
 * 
 * Original code sourse:
 * https://stackoverflow.com/a/56989647/5372400
 */

function replaceAll_(str, find, newToken, caseSensitive) {
    var i = -1;
    // sanity check & defaults
    if (!str) {
        // Instead of throwing, act as 
        // COALESCE if find == null/empty and str == null
        if ((str == null) && (find == null))
            return newToken;
        return str;
    }
    if (!find || find === '') { return str; }
    if (find === newToken) { return str; }
    caseSensitive = caseSensitive || false;
    find = !caseSensitive ? find.toLowerCase() : find;
    // search process, search by char
    while ((
        i = (!caseSensitive ? str.toLowerCase() : str).indexOf(
            find, i >= 0 ? i + newToken.length : 0
        )) !== -1
    ) {
        str = str.substring(0, i) +
            newToken +
            str.substring(i + find.length);
    }
    return str;
}