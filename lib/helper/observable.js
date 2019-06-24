"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var generateObserverId = (function () {
    var lastId = 0;
    return function () {
        lastId += 1;
        return "@observer" + lastId;
    };
})();
// store all observer info
var observerInfoMap = {};
// observerId stack for managing recursive observing calls
var observerIdStack = [];
function isObservable(resultObj) {
    return common_1.isObject(resultObj) && common_1.hasOwnProp(resultObj, '__storage__');
}
function callObserver(observerId) {
    observerIdStack.push(observerId);
    observerInfoMap[observerId].fn();
    observerIdStack.pop();
}
function setValue(storage, observerIdSet, key, value) {
    if (storage[key] !== value) {
        storage[key] = value;
        Object.keys(observerIdSet).forEach(function (observerId) {
            callObserver(observerId);
        });
    }
}
function observe(fn) {
    var observerId = generateObserverId();
    observerInfoMap[observerId] = { fn: fn, targetObserverIdSets: [] };
    callObserver(observerId);
    // return unobserve function
    return function () {
        observerInfoMap[observerId].targetObserverIdSets.forEach(function (idSet) {
            delete idSet[observerId];
        });
    };
}
exports.observe = observe;
function observable(obj) {
    if (isObservable(obj)) {
        throw new Error('Target object is already Reactive');
    }
    if (Array.isArray(obj)) {
        throw new Error('Array object cannot be Reactive');
    }
    var storage = {};
    var propObserverIdSetMap = {};
    var resultObj = {};
    Object.defineProperties(resultObj, {
        __storage__: { value: storage },
        __propObserverIdSetMap__: { value: propObserverIdSetMap }
    });
    Object.keys(obj).forEach(function (key) {
        var getter = (Object.getOwnPropertyDescriptor(obj, key) || {}).get;
        var observerIdSet = (propObserverIdSetMap[key] = {});
        Object.defineProperty(resultObj, key, {
            configurable: true,
            get: function () {
                var observerId = common_1.last(observerIdStack);
                if (observerId && !observerIdSet[observerId]) {
                    observerIdSet[observerId] = true;
                    observerInfoMap[observerId].targetObserverIdSets.push(observerIdSet);
                }
                return storage[key];
            }
        });
        if (typeof getter === 'function') {
            observe(function () {
                var value = getter.call(resultObj);
                setValue(storage, observerIdSet, key, value);
            });
        }
        else {
            storage[key] = obj[key];
            Object.defineProperty(resultObj, key, {
                set: function (value) {
                    setValue(storage, observerIdSet, key, value);
                }
            });
        }
    });
    return resultObj;
}
exports.observable = observable;
function notify(obj, key) {
    if (isObservable(obj)) {
        Object.keys(obj.__propObserverIdSetMap__[key]).forEach(function (observerId) {
            callObserver(observerId);
        });
    }
}
exports.notify = notify;
function getOriginObject(obj) {
    var result = {};
    common_1.forEachObject(function (value, key) {
        result[key] = isObservable(value) ? getOriginObject(value) : value;
    }, obj.__storage__);
    return result;
}
exports.getOriginObject = getOriginObject;
//# sourceMappingURL=observable.js.map