"use strict";

function transformToGridData(jsonObj, action, actionRoot) {
    if (isEmpty(jsonObj)) return jsonObj;
    var destArr = [];
    createGridData(jsonObj, action,actionRoot, destArr);
    return destArr;
}


function createGridData(value, action, actionRoot, destArr, ancestor) {
    var entries = Object.entries(value);
    for (var i in entries) {
        var val = entries[i];
        if (isObject(val[1])) {
            var destObj = createGridDataObj(val, action, actionRoot, true, ancestor);
            destArr.push(destObj);
            createGridData(val[1], action, actionRoot, destObj.children, destObj.name);
        } else {
            destArr.push(createGridDataObj(val, action, actionRoot, false, ancestor));
        }
    }
}

function createGridDataObj(jsonEntry, action, actionRoot, isObject, ancestor) {
    var fatherName = '';
    if (!isEmpty(ancestor))
        fatherName = ancestor + ' --> ';
    var obj = {
        name: fatherName + jsonEntry[0],
        value: jsonEntry[1],
        type: 'attribute',
        action: action
    };
    if (isObject) {
        obj.children = [];
        obj.value = '';
        obj.action = actionRoot;
        obj.type = 'complex';
    }
    return obj;
}


function isObject(o) {
    return o instanceof Object;
}

function isArray(o) {
    return o instanceof Array
}