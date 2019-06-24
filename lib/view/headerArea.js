"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var colGroup_1 = require("./colGroup");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var columnResizer_1 = require("./columnResizer");
var instance_1 = require("../instance");
var column_1 = require("../helper/column");
var complexHeader_1 = require("./complexHeader");
var headerCheckbox_1 = require("./headerCheckbox");
var sortingButton_1 = require("./sortingButton");
var HeaderAreaComp = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderAreaComp, _super);
    function HeaderAreaComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startSelectedName = null;
        _this.handleDblClick = function (ev) {
            ev.stopPropagation();
        };
        _this.handleMouseMove = function (ev) {
            var _a = dom_1.getCoordinateWithOffset(ev.pageX, ev.pageY), pageX = _a[0], pageY = _a[1];
            _this.props.dispatch('dragMoveHeader', { pageX: pageX, pageY: pageY }, _this.startSelectedName);
        };
        _this.handleMouseDown = function (ev) {
            var _a = _this.props, dispatch = _a.dispatch, complexHeaderColumns = _a.complexHeaderColumns;
            var name = ev.target.getAttribute('data-column-name');
            var parentHeader = column_1.isParentColumnHeader(complexHeaderColumns, name);
            var target = ev.target;
            if (dom_1.findParent(target, 'cell-row-header') || dom_1.hasClass(target, 'btn-sorting')) {
                return;
            }
            _this.startSelectedName = name;
            dispatch('mouseDownHeader', name, parentHeader);
            document.addEventListener('mousemove', _this.handleMouseMove);
            document.addEventListener('mouseup', _this.clearDocumentEvents);
            document.addEventListener('selectstart', _this.handleSelectStart);
        };
        _this.clearDocumentEvents = function () {
            _this.props.dispatch('dragEnd');
            dom_1.setCursorStyle('');
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.clearDocumentEvents);
            document.removeEventListener('selectstart', _this.handleSelectStart);
        };
        _this.handleSelectStart = function (ev) {
            ev.preventDefault();
        };
        return _this;
    }
    HeaderAreaComp.prototype.isSelected = function (index) {
        var columnSelectionRange = this.props.columnSelectionRange;
        if (!columnSelectionRange) {
            return false;
        }
        var start = columnSelectionRange[0], end = columnSelectionRange[1];
        return index >= start && index <= end;
    };
    HeaderAreaComp.prototype.componentDidUpdate = function () {
        this.el.scrollLeft = this.props.scrollLeft;
    };
    HeaderAreaComp.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, headerHeight = _a.headerHeight, cellBorderWidth = _a.cellBorderWidth, side = _a.side, complexHeaderColumns = _a.complexHeaderColumns;
        var areaStyle = { height: headerHeight + cellBorderWidth };
        var theadStyle = { height: headerHeight };
        return (preact_1.h("div", { class: dom_1.cls('header-area'), style: areaStyle, ref: function (el) {
                _this.el = el;
            } },
            preact_1.h("table", { class: dom_1.cls('table'), onMouseDown: this.handleMouseDown },
                preact_1.h(colGroup_1.ColGroup, { side: side, useViewport: false }),
                complexHeaderColumns.length ? (preact_1.h(complexHeader_1.ComplexHeader, { side: side })) : (preact_1.h("tbody", null,
                    preact_1.h("tr", { style: theadStyle, onDblClick: this.handleDblClick }, columns.map(function (_a, index) {
                        var name = _a.name, header = _a.header, sortable = _a.sortable;
                        return (preact_1.h("th", { key: name, "data-column-name": name, class: dom_1.cls('cell', 'cell-header', [!column_1.isRowHeader(name) && _this.isSelected(index), 'cell-selected'], [column_1.isRowHeader(name), 'cell-row-header']) },
                            column_1.isCheckboxColumn(name) ? preact_1.h(headerCheckbox_1.HeaderCheckbox, null) : header,
                            !!sortable && preact_1.h(sortingButton_1.SortingButton, null)));
                    }))))),
            preact_1.h(columnResizer_1.ColumnResizer, { side: side })));
    };
    return HeaderAreaComp;
}(preact_1.Component));
exports.HeaderArea = hoc_1.connect(function (store, _a) {
    var side = _a.side;
    var _b = store.column, visibleColumnsBySide = _b.visibleColumnsBySide, complexHeaderColumns = _b.complexHeaderColumns, _c = store.dimension, headerHeight = _c.headerHeight, cellBorderWidth = _c.cellBorderWidth, rangeBySide = store.selection.rangeBySide, viewport = store.viewport, id = store.id;
    return {
        headerHeight: headerHeight,
        cellBorderWidth: cellBorderWidth,
        columns: visibleColumnsBySide[side],
        scrollLeft: side === 'L' ? 0 : viewport.scrollLeft,
        dataProvider: instance_1.getDataProvider(id),
        columnSelectionRange: rangeBySide && rangeBySide[side].column ? rangeBySide[side].column : null,
        complexHeaderColumns: complexHeaderColumns
    };
})(HeaderAreaComp);
//# sourceMappingURL=headerArea.js.map