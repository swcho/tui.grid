"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var viewport = tslib_1.__importStar(require("./viewport"));
var dimension = tslib_1.__importStar(require("./dimension"));
var data = tslib_1.__importStar(require("./data"));
var column = tslib_1.__importStar(require("./column"));
var keyboard = tslib_1.__importStar(require("./keyboard"));
var mouse = tslib_1.__importStar(require("./mouse"));
var focus = tslib_1.__importStar(require("./focus"));
var summary = tslib_1.__importStar(require("./summary"));
var selection = tslib_1.__importStar(require("./selection"));
var renderState = tslib_1.__importStar(require("./renderState"));
var tree = tslib_1.__importStar(require("./tree"));
var dispatchMap = tslib_1.__assign({}, viewport, dimension, data, column, mouse, focus, keyboard, summary, selection, renderState, tree);
function createDispatcher(store) {
    return function dispatch(fname) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // @ts-ignore
        dispatchMap[fname].apply(dispatchMap, [store].concat(args));
    };
}
exports.createDispatcher = createDispatcher;
//# sourceMappingURL=create.js.map