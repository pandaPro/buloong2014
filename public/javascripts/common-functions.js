function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    if(n == '') return n;
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getNameByList(value, list) {
    for (i in list) {
        if ((list[i].value && list[i].value == value) || 
            (list[i]._id && list[i]._id == value) || 
            (list[i].id && list[i].id == value)) {
            return list[i].name;
        }
    }
}

function getObjectDataById(id, list) {
    for (i in list) {
        if ((list[i]._id && list[i]._id == id)|| 
            (list[i].id && list[i].id == id)) {
            return list[i];
        }
    }
}

function setObjectDataToList(object, list) {
    for (i in list) {
        if ((list[i]._id && list[i]._id == object._id) || 
            (list[i].id && list[i].id == object.id)) {
            list[i] = object;
        }
    }
}

function removeJsonInList(object, list) {
    for (i in list) {
        if ((list[i]._id && list[i]._id == object._id) || 
            (list[i].id && list[i].id == object.id)) {
                list.splice(i, 1);
        }
    }
}

function extractProductByCode(code, position) {
    var value;
    switch(position){
        case 0:
            value = code.substring(0, 1);
            break;
        case 1:
            value = code.substring(1, code.length - 2);
            break;
        case 2:
            value = code.substring(code.length - 2, code.length);
            if(value == '08')   value = '8';
            break;
    }
    return value;
}

function extractProductPartValueByCode(code, position, list) {
    var name = "";
    var value = extractProductByCode(code, position);
    name = getNameByList(value, list);
    return name;
}