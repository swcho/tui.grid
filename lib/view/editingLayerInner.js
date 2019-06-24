"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var keyboard_1 = require("../helper/keyboard");
var instance_1 = require("../instance");
var common_1 = require("../helper/common");
var EditingLayerInnerComp = /** @class */ (function (_super) {
    tslib_1.__extends(EditingLayerInnerComp, _super);
    function EditingLayerInnerComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleKeyDown = function (ev) {
            var keyName = keyboard_1.keyNameMap[ev.keyCode];
            switch (keyName) {
                case 'enter':
                    _this.finishEditing(true);
                    break;
                case 'esc':
                    _this.finishEditing(false);
                    break;
                default:
                // do nothing;
            }
        };
        _this.handleMouseDownDocument = function (ev) {
            var target = ev.target;
            var contentEl = _this.contentEl;
            if (contentEl && contentEl !== target && !contentEl.contains(target)) {
                _this.finishEditing(true);
            }
        };
        return _this;
    }
    EditingLayerInnerComp.prototype.finishEditing = function (save) {
        if (this.editor) {
            var _a = this.props, dispatch = _a.dispatch, rowKey = _a.rowKey, columnName = _a.columnName, sortOptions = _a.sortOptions;
            if (save) {
                dispatch('setValue', rowKey, columnName, this.editor.getValue());
                if (sortOptions.columnName === columnName) {
                    dispatch('sort', columnName, sortOptions.ascending);
                }
            }
            if (common_1.isFunction(this.editor.beforeDestroy)) {
                this.editor.beforeDestroy();
            }
            dispatch('finishEditing', rowKey, columnName);
        }
    };
    EditingLayerInnerComp.prototype.componentDidMount = function () {
        var _a = this.props, grid = _a.grid, rowKey = _a.rowKey, columnInfo = _a.columnInfo, value = _a.value, width = _a.width;
        var EditorClass = columnInfo.editor.type;
        var editorProps = { grid: grid, rowKey: rowKey, columnInfo: columnInfo, value: value };
        var cellEditor = new EditorClass(editorProps);
        var editorEl = cellEditor.getElement();
        if (editorEl && this.contentEl) {
            this.contentEl.appendChild(editorEl);
            this.editor = cellEditor;
            var editorWidth = this.editor.el.getBoundingClientRect().width;
            if (editorWidth > width) {
                var CELL_PADDING_WIDTH = 10;
                this.contentEl.style.width = editorWidth + CELL_PADDING_WIDTH + "px";
            }
            if (common_1.isFunction(cellEditor.mounted)) {
                cellEditor.mounted();
            }
            document.addEventListener('mousedown', this.handleMouseDownDocument);
        }
    };
    EditingLayerInnerComp.prototype.componentWillUnmount = function () {
        this.finishEditing(false);
        document.removeEventListener('mousedown', this.handleMouseDownDocument);
        if (this.editor && this.editor.beforeDestroy) {
            this.editor.beforeDestroy();
        }
    };
    EditingLayerInnerComp.prototype.render = function () {
        var _this = this;
        var _a = this.props, top = _a.top, left = _a.left, width = _a.width, height = _a.height, contentHeight = _a.contentHeight;
        var lineHeight = contentHeight + "px";
        var styles = { top: top, left: left, width: width, height: height, lineHeight: lineHeight };
        return (preact_1.h("div", { style: styles, class: dom_1.cls('layer-editing', 'cell-content', 'cell-content-editor'), onKeyDown: this.handleKeyDown, ref: function (el) {
                _this.contentEl = el;
            } }));
    };
    return EditingLayerInnerComp;
}(preact_1.Component));
exports.EditingLayerInnerComp = EditingLayerInnerComp;
exports.EditingLayerInner = hoc_1.connect(function (store, _a) {
    var rowKey = _a.rowKey, columnName = _a.columnName;
    var _b = store.focus, cellPosRect = _b.cellPosRect, side = _b.side;
    var _c = store.dimension, cellBorderWidth = _c.cellBorderWidth, tableBorderWidth = _c.tableBorderWidth, headerHeight = _c.headerHeight, width = _c.width, frozenBorderWidth = _c.frozenBorderWidth;
    var _d = store.viewport, scrollLeft = _d.scrollLeft, scrollTop = _d.scrollTop;
    var areaWidth = store.columnCoords.areaWidth;
    var _e = store.data, viewData = _e.viewData, sortOptions = _e.sortOptions;
    var _f = store.column, allColumnMap = _f.allColumnMap, frozenCount = _f.frozenCount;
    var _g = cellPosRect, top = _g.top, left = _g.left, right = _g.right, bottom = _g.bottom;
    var cellWidth = right - left + cellBorderWidth;
    var cellHeight = bottom - top + cellBorderWidth;
    var offsetTop = headerHeight - scrollTop + tableBorderWidth;
    var offsetLeft = Math.min(areaWidth.L - scrollLeft, width - right);
    var targetRow = viewData.find(function (row) { return row.rowKey === rowKey; });
    var value = targetRow.valueMap[columnName].value;
    return {
        grid: instance_1.getInstance(store.id),
        left: left + (side === 'L' ? 0 : offsetLeft + frozenCount * frozenBorderWidth),
        top: top + offsetTop,
        width: cellWidth,
        height: cellHeight,
        contentHeight: cellHeight - 2 * cellBorderWidth,
        columnInfo: allColumnMap[columnName],
        value: value,
        sortOptions: sortOptions
    };
})(EditingLayerInnerComp);
//# sourceMappingURL=editingLayerInner.js.map