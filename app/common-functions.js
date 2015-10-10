var str = require('string');
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
    var pattern = str(code);
    switch(position) {
        // type
        case 0:
            partString = pattern.substr(0, 1);
            break;
        // format
        case 1:
            partString = pattern.substr(1, pattern.length - 3);
            break;
        // length
        case 2:
            partString = pattern.substr(pattern.length - 2, 2);
            break;
    }
    return partString;
}

exports.getValueFromNameInJson = function(name, json) {
    for(var item in json) {
        if(json[item].name == name)
            return json[item].value;
    }
}

exports.getNameFromValueInJson = function(value, json) {
    for(var item in json) {
        if(json[item].value == value)
            return json[item].name;
    }
}