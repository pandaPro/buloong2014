
/* return  */
exports.formatNumber = function(number) {
    number = number.toFixed(0) + '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

exports.extractProductCode = function(code, position) {
    var partString = "";
    switch(position) {
        // type
        case 0:
            break;
        // format
        case 1:
            break;
        // length
        case 2:
            break;
    }
    return partString;
}

exports.getValueFromNameInJson = function(name, json) {
    for(var item in json) {
        if(item.name == name)
            return item.value;
    }
}