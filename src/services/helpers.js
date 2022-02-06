export function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

export function getFirstProperty (obj) {
    return Object.keys(obj)[0]
}

export function getValueOfObjectProperty (obj, keyToReturn) {
    let listOfValues = [];
    for (let item in obj) {
        listOfValues.push(obj[item][keyToReturn]);
    }
    return listOfValues.join(', ');
}
