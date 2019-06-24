"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../helper/common");
var instance_1 = require("../instance");
var eventBusMap = {};
function createEventBus(id) {
    var listenersMap = {};
    eventBusMap[id] = {
        on: function (eventName, func) {
            var listeners = listenersMap[eventName];
            listenersMap[eventName] = listeners ? listeners.concat([func]) : [func];
        },
        off: function (eventName, func) {
            var listeners = listenersMap[eventName];
            if (listeners) {
                if (func) {
                    listenersMap[eventName] = common_1.removeArrayItem(func, listeners);
                }
                else {
                    delete listenersMap[eventName];
                }
            }
        },
        trigger: function (eventName, gridEvent) {
            if (listenersMap[eventName]) {
                var instance = instance_1.getInstance(id);
                gridEvent.setInstance(instance);
                listenersMap[eventName].forEach(function (func) {
                    func(gridEvent);
                });
            }
        }
    };
    return eventBusMap[id];
}
exports.createEventBus = createEventBus;
function getEventBus(id) {
    return eventBusMap[id];
}
exports.getEventBus = getEventBus;
//# sourceMappingURL=eventBus.js.map