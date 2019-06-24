"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
exports.HANDLE_WIDTH = 7;
exports.HANDLE_WIDTH_HALF = 3;
var ColumnResizerComp = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnResizerComp, _super);
    function ColumnResizerComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragStartX = -1;
        _this.draggingWidth = -1;
        _this.draggingIndex = -1;
        _this.handleMouseDown = function (ev, index) {
            _this.draggingIndex = index;
            _this.draggingWidth = _this.props.widths[index];
            _this.dragStartX = ev.pageX;
            dom_1.setCursorStyle('col-resize');
            document.addEventListener('mousemove', _this.handleMouseMove);
            document.addEventListener('mouseup', _this.clearDocumentEvents);
            document.addEventListener('selectstart', _this.handleSelectStart);
        };
        _this.handleSelectStart = function (ev) {
            ev.preventDefault();
        };
        _this.handleMouseMove = function (ev) {
            var width = _this.draggingWidth + ev.pageX - _this.dragStartX;
            var side = _this.props.side;
            _this.props.dispatch('setColumnWidth', side, _this.draggingIndex, width);
        };
        _this.clearDocumentEvents = function () {
            dom_1.setCursorStyle('');
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.clearDocumentEvents);
            document.removeEventListener('selectstart', _this.handleSelectStart);
        };
        return _this;
    }
    ColumnResizerComp.prototype.componentWillUnmount = function () {
        this.clearDocumentEvents();
    };
    ColumnResizerComp.prototype.renderHandle = function (index) {
        var _this = this;
        var _a;
        var _b = this.props, columns = _b.columns, offsets = _b.offsets, cellBorderWidth = _b.cellBorderWidth, widths = _b.widths;
        var _c = columns[index], name = _c.name, resizable = _c.resizable;
        if (!resizable) {
            return null;
        }
        var offset = offsets[index];
        var width = widths[index];
        var attrs = (_a = {},
            _a[dom_1.dataAttr.COLUMN_INDEX] = index,
            _a[dom_1.dataAttr.COLUMN_NAME] = name,
            _a);
        return (preact_1.h("div", tslib_1.__assign({ class: dom_1.cls('column-resize-handle'), title: '' }, attrs, { style: {
                height: 33,
                width: exports.HANDLE_WIDTH,
                left: offset + width + cellBorderWidth - exports.HANDLE_WIDTH_HALF
            }, onMouseDown: function (ev) { return _this.handleMouseDown(ev, index); } })));
    };
    ColumnResizerComp.prototype.render = function (_a) {
        var _this = this;
        var columns = _a.columns;
        return (preact_1.h("div", { class: dom_1.cls('column-resize-container'), style: "display: block; margin-top: -35px; height: 35px;" }, columns.map(function (_, index) { return _this.renderHandle(index); })));
    };
    return ColumnResizerComp;
}(preact_1.Component));
exports.ColumnResizer = hoc_1.connect(function (_a, _b) {
    var column = _a.column, columnCoords = _a.columnCoords, dimension = _a.dimension;
    var side = _b.side;
    return ({
        widths: columnCoords.widths[side],
        offsets: columnCoords.offsets[side],
        cellBorderWidth: dimension.cellBorderWidth,
        columns: column.visibleColumnsBySide[side]
    });
})(ColumnResizerComp);
//# sourceMappingURL=columnResizer.js.map