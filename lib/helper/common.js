"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function shallowEqual(o1, o2) {
    for (var key in o1) {
        if (o1[key] !== o2[key]) {
            return false;
        }
    }
    for (var key in o2) {
        if (!(key in o1)) {
            return false;
        }
    }
    return true;
}
exports.shallowEqual = shallowEqual;
function arrayEqual(a1, a2) {
    if (a1.length !== a2.length) {
        return false;
    }
    for (var i = 0, len = a1.length; i < len; i += 1) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}
exports.arrayEqual = arrayEqual;
function sum(nums) {
    return nums.reduce(function (acc, num) { return acc + num; }, 0);
}
exports.sum = sum;
function pipe(initVal) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return args.reduce(function (acc, fn) { return fn(acc); }, initVal);
}
exports.pipe = pipe;
function includes(arr, searchItem, searchIndex) {
    if (typeof searchIndex === 'number' && arr[searchIndex] !== searchItem) {
        return false;
    }
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (item === searchItem) {
            return true;
        }
    }
    return false;
}
exports.includes = includes;
// eslint-disable-next-line consistent-return
function find(predicate, arr) {
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var item = arr_2[_i];
        if (predicate(item)) {
            return item;
        }
    }
}
exports.find = find;
function findProp(propName, value, arr) {
    return find(function (item) { return item[propName] === value; }, arr);
}
exports.findProp = findProp;
function some(predicate, arr) {
    return !!find(predicate, arr);
}
exports.some = some;
function someProp(propName, value, arr) {
    return !!findProp(propName, value, arr);
}
exports.someProp = someProp;
function findIndex(predicate, arr) {
    for (var i = 0, len = arr.length; i < len; i += 1) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function findPropIndex(propName, value, arr) {
    return findIndex(function (item) { return item[propName] === value; }, arr);
}
exports.findPropIndex = findPropIndex;
function findIndexes(predicate, arr) {
    return arr.reduce(function (acc, v, idx) { return (predicate(v) ? acc.concat([idx]) : acc); }, []);
}
exports.findIndexes = findIndexes;
function findPrevIndex(arr, predicate) {
    var index = findIndex(predicate, arr);
    return index >= 0 ? index - 1 : arr.length - 1;
}
exports.findPrevIndex = findPrevIndex;
function findOffsetIndex(offsets, targetOffset) {
    return findPrevIndex(offsets, function (offset) { return offset > targetOffset; });
}
exports.findOffsetIndex = findOffsetIndex;
function mapProp(propName, arr) {
    return arr.map(function (item) { return item[propName]; });
}
exports.mapProp = mapProp;
function deepMergedCopy(targetObj, obj) {
    var resultObj = tslib_1.__assign({}, targetObj);
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (resultObj.hasOwnProperty(prop) && typeof resultObj[prop] === 'object') {
            if (Array.isArray(obj[prop])) {
                resultObj[prop] = obj[prop];
            }
            else {
                resultObj[prop] = deepMergedCopy(resultObj[prop], obj[prop]);
            }
        }
        else {
            resultObj[prop] = obj[prop];
        }
    }
    return resultObj;
}
exports.deepMergedCopy = deepMergedCopy;
function assign(targetObj, obj) {
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (targetObj.hasOwnProperty(prop) && typeof targetObj[prop] === 'object') {
            if (Array.isArray(obj[prop])) {
                targetObj[prop] = obj[prop];
            }
            else {
                assign(targetObj[prop], obj[prop]);
            }
        }
        else {
            targetObj[prop] = obj[prop];
        }
    }
}
exports.assign = assign;
function removeArrayItem(targetItem, arr) {
    var targetIdx = findIndex(function (item) { return item === targetItem; }, arr);
    arr.splice(targetIdx, 1);
    return arr;
}
exports.removeArrayItem = removeArrayItem;
function createMapFromArray(arr, propName) {
    var resultMap = {};
    arr.forEach(function (item) {
        var key = String(item[propName]);
        resultMap[key] = item;
    });
    return resultMap;
}
exports.createMapFromArray = createMapFromArray;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isObject = isObject;
function forEachObject(fn, obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(obj[key], key, obj);
        }
    }
}
exports.forEachObject = forEachObject;
function hasOwnProp(obj, key) {
    return obj.hasOwnProperty(key);
}
exports.hasOwnProp = hasOwnProp;
function encodeHTMLEntity(html) {
    var entities = {
        '"': 'quot',
        '&': 'amp',
        '<': 'lt',
        '>': 'gt',
        "'": '#39'
    };
    return html.replace(/[<>&"']/g, function (match) { return "&" + entities[match] + ";"; });
}
exports.encodeHTMLEntity = encodeHTMLEntity;
function setDefaultProp(obj, key, defValue) {
    if (typeof obj[key] === 'undefined') {
        obj[key] = defValue;
    }
}
exports.setDefaultProp = setDefaultProp;
/**
 * Returns a number whose value is limited to the given range.
 * @param value - A number to force within given min-max range
 * @param min - The lower boundary of the output range
 * @param max - The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @example
 *      // limit the output of this computation to between 0 and 255
 *      value = clamp(value, 0, 255);
 */
function clamp(value, min, max) {
    var _a;
    if (min > max) {
        _a = [min, max], max = _a[0], min = _a[1];
    }
    return Math.max(min, Math.min(value, max));
}
exports.clamp = clamp;
function range(end) {
    var arr = [];
    for (var i = 0; i < end; i += 1) {
        arr.push(i);
    }
    return arr;
}
exports.range = range;
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
function isBlank(value) {
    if (typeof value === 'string') {
        return !value.length;
    }
    return typeof value === 'undefined' || value === null;
}
exports.isBlank = isBlank;
function isUndefined(value) {
    return typeof value === 'undefined';
}
exports.isUndefined = isUndefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isBoolean(value) {
    return typeof value === 'boolean';
}
exports.isBoolean = isBoolean;
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
/**
 * check the emptiness(included null) of object or array. if obj parameter is null or undefind, return true
 * @param obj - target object or array
 * @returns the emptiness of obj
 */
function isEmpty(obj) {
    return (isNull(obj) ||
        isUndefined(obj) ||
        (!isUndefined(obj.length) && obj.length === 0) ||
        Object.keys(obj).length === 0);
}
exports.isEmpty = isEmpty;
function fromArray(value) {
    return Array.prototype.slice.call(value);
}
exports.fromArray = fromArray;
function convertToNumber(value) {
    if (typeof value === 'string') {
        value = value.replace(/,/g, '');
    }
    if (typeof value === 'number' || isNaN(value) || isBlank(value)) {
        return value;
    }
    return Number(value);
}
exports.convertToNumber = convertToNumber;
function debounce(fn, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            timeout = -1;
            if (!immediate) {
                fn.apply(void 0, args);
            }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            fn.apply(void 0, args);
        }
    };
}
exports.debounce = debounce;
function pruneObject(obj) {
    var pruned = {};
    forEachObject(function (value, key) {
        if (!isUndefined(value) && !isNull(value)) {
            pruned[key] = value;
        }
    }, obj);
    return pruned;
}
exports.pruneObject = pruneObject;
function omit(obj) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    var resultMap = {};
    for (var key in obj) {
        if (hasOwnProp(obj, key) && !includes(propNames, key)) {
            resultMap[key] = obj[key];
        }
    }
    return resultMap;
}
exports.omit = omit;
//# sourceMappingURL=common.js.map