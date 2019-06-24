"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var data_1 = require("../store/data");
var observable_1 = require("./observable");
var common_1 = require("./common");
exports.DEFAULT_INDENT_WIDTH = 22;
var treeRowKey = -1;
function generateTreeRowKey() {
    // @TODO 키 제너레이터 추가
    treeRowKey += 1;
    return treeRowKey;
}
function addChildRowKey(row, rowKey) {
    var tree = row._attributes.tree;
    if (tree && !common_1.includes(tree.childRowKeys, rowKey)) {
        tree.childRowKeys.push(rowKey);
        observable_1.notify(tree, 'childRowKeys');
    }
}
exports.addChildRowKey = addChildRowKey;
function removeChildRowKey(row, rowKey) {
    var tree = row._attributes.tree;
    if (tree) {
        common_1.removeArrayItem(rowKey, tree.childRowKeys);
        observable_1.notify(tree, 'childRowKeys');
    }
}
exports.removeChildRowKey = removeChildRowKey;
function getParentRowKey(row) {
    var tree = row._attributes.tree;
    return tree && tree.parentRowKey !== row.rowKey ? tree.parentRowKey : null;
}
exports.getParentRowKey = getParentRowKey;
function getChildRowKeys(row) {
    var tree = row._attributes.tree;
    return tree ? tree.childRowKeys.slice() : [];
}
exports.getChildRowKeys = getChildRowKeys;
function isLeaf(row) {
    var tree = row._attributes.tree;
    return !!tree && !tree.childRowKeys.length;
}
exports.isLeaf = isLeaf;
function isExpanded(row) {
    var tree = row._attributes.tree;
    return !!tree && tree.expanded;
}
exports.isExpanded = isExpanded;
function getDepth(rawData, row) {
    var parentRow = row;
    var depth = 0;
    do {
        depth += 1;
        parentRow = common_1.findProp('rowKey', getParentRowKey(parentRow), rawData);
    } while (parentRow);
    return depth;
}
exports.getDepth = getDepth;
function hasChildrenState(row) {
    var _children = row._children;
    return Array.isArray(_children) && _children.length > 0;
}
function getExpandedState(row) {
    if (row && row._attributes) {
        var _a = row._attributes.expanded, expanded = _a === void 0 ? false : _a;
        return expanded;
    }
    return false;
}
function getHiddenChildState(row) {
    if (row) {
        var tree = row._attributes.tree;
        var collapsed = !isExpanded(row);
        var hiddenChild = !!(tree && tree.hiddenChild);
        return collapsed || hiddenChild;
    }
    return false;
}
exports.getHiddenChildState = getHiddenChildState;
function createTreeRawRow(row, defaultValues, parentRow, keyColumnName) {
    var rawRow = data_1.createRawRow(row, generateTreeRowKey(), defaultValues, keyColumnName);
    var rowKey = rawRow.rowKey;
    var defaultAttributes = {
        parentRowKey: parentRow ? parentRow.rowKey : null,
        childRowKeys: []
    };
    if (parentRow) {
        addChildRowKey(parentRow, rowKey);
    }
    rawRow._attributes.tree = observable_1.observable(tslib_1.__assign({}, defaultAttributes, (hasChildrenState(row) && { expanded: getExpandedState(row) }), (!!parentRow && { hiddenChild: getHiddenChildState(parentRow) })));
    return rawRow;
}
function flattenTreeData(data, defaultValues, parentRow, keyColumnName) {
    var flattenedRows = [];
    data.forEach(function (row) {
        var rawRow = createTreeRawRow(row, defaultValues, parentRow, keyColumnName);
        flattenedRows.push(rawRow);
        if (hasChildrenState(row)) {
            flattenedRows.push.apply(flattenedRows, flattenTreeData(row._children || [], defaultValues, rawRow, keyColumnName));
            delete rawRow._children;
        }
    });
    return flattenedRows;
}
exports.flattenTreeData = flattenTreeData;
function createTreeRawData(data, defaultValues, keyColumnName) {
    treeRowKey = -1;
    return flattenTreeData(data, defaultValues, null, keyColumnName);
}
exports.createTreeRawData = createTreeRawData;
function getTreeCellInfo(rawData, row, useIcon) {
    var depth = getDepth(rawData, row);
    var indentWidth = depth * exports.DEFAULT_INDENT_WIDTH;
    if (useIcon) {
        indentWidth += exports.DEFAULT_INDENT_WIDTH;
    }
    return {
        depth: depth,
        indentWidth: indentWidth,
        leaf: isLeaf(row),
        expanded: isExpanded(row)
    };
}
exports.getTreeCellInfo = getTreeCellInfo;
function createTreeCellInfo(rawData, row, useIcon) {
    var treeInfo = observable_1.observable(getTreeCellInfo(rawData, row, useIcon));
    observable_1.observe(function () {
        treeInfo.expanded = isExpanded(row);
        treeInfo.leaf = isLeaf(row);
    });
    return treeInfo;
}
exports.createTreeCellInfo = createTreeCellInfo;
function traverseAncestorRows(rawData, row, iteratee) {
    var parentRowKey = getParentRowKey(row);
    var parentRow;
    while (!common_1.isNull(parentRowKey)) {
        parentRow = common_1.findProp('rowKey', parentRowKey, rawData);
        iteratee(parentRow);
        parentRowKey = parentRow ? getParentRowKey(parentRow) : null;
    }
}
exports.traverseAncestorRows = traverseAncestorRows;
function traverseDescendantRows(rawData, row, iteratee) {
    var childRowKeys = getChildRowKeys(row);
    var rowKey, childRow;
    while (childRowKeys.length) {
        rowKey = childRowKeys.shift();
        childRow = common_1.findProp('rowKey', rowKey, rawData);
        iteratee(childRow);
        if (childRow) {
            childRowKeys = childRowKeys.concat(getChildRowKeys(childRow));
        }
    }
}
exports.traverseDescendantRows = traverseDescendantRows;
//# sourceMappingURL=tree.js.map