"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var common_1 = require("../helper/common");
var tree_1 = require("../helper/tree");
function getParentRow(store, rowKey, plainObj) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        var parentRowKey = tree_1.getParentRowKey(row);
        var parentRow = common_1.findProp('rowKey', parentRowKey, rawData);
        if (parentRow) {
            return plainObj ? observable_1.getOriginObject(parentRow) : parentRow;
        }
    }
    return null;
}
exports.getParentRow = getParentRow;
function getChildRows(store, rowKey, plainObj) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        var childRowKeys = tree_1.getChildRowKeys(row);
        return childRowKeys.map(function (childRowKey) {
            var childRow = common_1.findProp('rowKey', childRowKey, rawData);
            return plainObj ? observable_1.getOriginObject(childRow) : childRow;
        });
    }
    return [];
}
exports.getChildRows = getChildRows;
function getAncestorRows(store, rowKey) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    var ancestorRows = [];
    if (row) {
        tree_1.traverseAncestorRows(rawData, row, function (parentRow) {
            ancestorRows.unshift(observable_1.getOriginObject(parentRow));
        });
    }
    return ancestorRows;
}
exports.getAncestorRows = getAncestorRows;
function getDescendantRows(store, rowKey) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    var childRows = [];
    if (row) {
        tree_1.traverseDescendantRows(rawData, row, function (childRow) {
            childRows.push(observable_1.getOriginObject(childRow));
        });
    }
    return childRows;
}
exports.getDescendantRows = getDescendantRows;
//# sourceMappingURL=tree.js.map