"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var tree_1 = require("../helper/tree");
var TreeCellContentsComp = /** @class */ (function (_super) {
    tslib_1.__extends(TreeCellContentsComp, _super);
    function TreeCellContentsComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (ev) {
            ev.stopPropagation();
            var _a = _this.props, dispatch = _a.dispatch, rowKey = _a.rowKey;
            var target = ev.target;
            if (dom_1.findParent(target, 'tree-button-collapse')) {
                dispatch('expandByRowKey', rowKey, false);
            }
            else if (dom_1.findParent(target, 'tree-button-expand')) {
                dispatch('collapseByRowKey', rowKey, false);
            }
        };
        return _this;
    }
    TreeCellContentsComp.prototype.getIndentComponent = function (depth, leaf) {
        var indentItem = [];
        for (var i = 0, len = depth; i < len; i += 1) {
            indentItem.push(preact_1.h("span", { class: dom_1.cls('tree-depth') }, i === len - 1 && !leaf && (preact_1.h("button", { class: dom_1.cls('btn-tree'), style: { left: i * tree_1.DEFAULT_INDENT_WIDTH }, onClick: this.handleClick },
                preact_1.h("i", null)))));
        }
        return indentItem;
    };
    TreeCellContentsComp.prototype.render = function () {
        var _a = this.props, depth = _a.depth, indentWidth = _a.indentWidth, leaf = _a.leaf, expanded = _a.expanded, useIcon = _a.useIcon;
        return (preact_1.h("div", { class: dom_1.cls('tree-extra-content', [!leaf && expanded, 'tree-button-expand'], [!leaf && !expanded, 'tree-button-collapse']) },
            this.getIndentComponent(depth, leaf),
            useIcon && (preact_1.h("span", { class: dom_1.cls('tree-icon'), style: { left: indentWidth - tree_1.DEFAULT_INDENT_WIDTH } },
                preact_1.h("i", null)))));
    };
    return TreeCellContentsComp;
}(preact_1.Component));
exports.TreeCellContentsComp = TreeCellContentsComp;
exports.TreeCellContents = hoc_1.connect(function (_a, _b) {
    var column = _a.column;
    var treeInfo = _b.treeInfo, rowKey = _b.rowKey;
    var _c = column.treeIcon, useIcon = _c === void 0 ? true : _c;
    var depth = treeInfo.depth, indentWidth = treeInfo.indentWidth, leaf = treeInfo.leaf, _d = treeInfo.expanded, expanded = _d === void 0 ? false : _d;
    return {
        rowKey: rowKey,
        depth: depth,
        indentWidth: indentWidth,
        leaf: leaf,
        expanded: expanded,
        useIcon: useIcon
    };
})(TreeCellContentsComp);
//# sourceMappingURL=treeCellContents.js.map