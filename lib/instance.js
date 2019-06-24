"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./helper/common");
var currentId = 0;
var instanceMap = {};
function generateId() {
    currentId += 1;
    return currentId;
}
function register(instance) {
    var id = generateId();
    if (!common_1.isObject(instanceMap[id])) {
        instanceMap[id] = {};
    }
    instanceMap[id].grid = instance;
    return id;
}
exports.register = register;
function registerDataSources(id, dataProvider, dataManager, paginationManager) {
    instanceMap[id].dataProvider = dataProvider;
    instanceMap[id].dataManager = dataManager;
    instanceMap[id].paginationManager = paginationManager;
}
exports.registerDataSources = registerDataSources;
function getInstance(id) {
    return instanceMap[id].grid;
}
exports.getInstance = getInstance;
function getDataProvider(id) {
    return instanceMap[id].dataProvider;
}
exports.getDataProvider = getDataProvider;
function getDataManager(id) {
    return instanceMap[id].dataManager;
}
exports.getDataManager = getDataManager;
function getPaginationManager(id) {
    return instanceMap[id].paginationManager;
}
exports.getPaginationManager = getPaginationManager;
//# sourceMappingURL=instance.js.map