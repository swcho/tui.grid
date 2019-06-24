"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../helper/common");
var ENCODED_SPACE = '%20';
var ENCODED_LEFT_BRACKET = '%5B';
function encodeWithSpace(value, hasBody) {
    var regExp = new RegExp(ENCODED_SPACE, 'g');
    return hasBody ? encodeURIComponent(value).replace(regExp, '+') : encodeURIComponent(value);
}
function encodeParamKey(key, hasBody) {
    return key.indexOf(ENCODED_LEFT_BRACKET) !== -1 ? key : encodeWithSpace(key, hasBody);
}
function encodeObjParamKey(key, subKey, hasBody) {
    var encodedKey = encodeParamKey(key, hasBody);
    return "" + encodedKey + encodeURIComponent('[') + subKey + encodeURIComponent(']');
}
function getEncodedData(name, subKey, value, hasBody) {
    var encodedKey = encodeObjParamKey(name, subKey, hasBody);
    var valueWithType = Array.isArray(value) ? value[subKey] : value[subKey];
    return encodeFormData(encodedKey, valueWithType, hasBody);
}
function encodeFormData(key, value, hasBody) {
    if (common_1.isUndefined(value) || common_1.isNull(value) || value === '') {
        return '';
    }
    var encodedDataList = [];
    if (Array.isArray(value)) {
        for (var index = 0; index < value.length; index += 1) {
            var encodedData = getEncodedData(key, index, value, hasBody);
            encodedDataList = encodedData !== '' ? encodedDataList.concat(encodedData) : encodedDataList;
        }
    }
    else if (common_1.isObject(value)) {
        Object.keys(value).forEach(function (subKey) {
            var valueWithType = value;
            var encodedData = getEncodedData(key, subKey, valueWithType, hasBody);
            encodedDataList = encodedData !== '' ? encodedDataList.concat(encodedData) : encodedDataList;
        });
    }
    else {
        var encodedKey = encodeParamKey(key, hasBody);
        var encodedValue = common_1.isString(value) ? encodeWithSpace(value, hasBody) : value;
        if (encodedValue !== '') {
            encodedDataList.push(encodedKey + "=" + encodedValue);
        }
    }
    return encodedDataList;
}
function encodeParams(params, hasBody) {
    if (hasBody === void 0) { hasBody = false; }
    if (!params) {
        return '';
    }
    var encodedDataList = Object.keys(params).reduce(function (acc, name) {
        var value = params[name];
        return value !== '' ? acc.concat(encodeFormData(name, value, hasBody)) : acc;
    }, []);
    return encodedDataList.join('&');
}
exports.encodeParams = encodeParams;
//# sourceMappingURL=encoder.js.map