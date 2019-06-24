"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var treeCellContents_1 = require("./treeCellContents");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var instance_1 = require("../instance");
var column_1 = require("../helper/column");
var BodyCellComp = /** @class */ (function (_super) {
    tslib_1.__extends(BodyCellComp, _super);
    function BodyCellComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseMove = function (ev) {
            var _a = dom_1.getCoordinateWithOffset(ev.pageX, ev.pageY), pageX = _a[0], pageY = _a[1];
            _this.props.dispatch('dragMoveRowHeader', { pageX: pageX, pageY: pageY });
        };
        _this.handleMouseDown = function (_, name, rowKey) {
            if (!column_1.isRowNumColumn(name)) {
                return;
            }
            _this.props.dispatch('mouseDownRowHeader', rowKey);
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
    BodyCellComp.prototype.componentDidMount = function () {
        var _a = this.props, grid = _a.grid, rowKey = _a.rowKey, renderData = _a.renderData, columnInfo = _a.columnInfo, refreshRowHeight = _a.refreshRowHeight, allDisabled = _a.disabled;
        // eslint-disable-next-line new-cap
        this.renderer = new columnInfo.renderer.type(tslib_1.__assign({ grid: grid,
            rowKey: rowKey,
            columnInfo: columnInfo }, renderData, { allDisabled: allDisabled }));
        var rendererEl = this.renderer.getElement();
        this.el.appendChild(rendererEl);
        if (this.renderer.mounted) {
            this.renderer.mounted(this.el);
        }
        if (refreshRowHeight) {
            // In Preact, the componentDidMount is called before the DOM elements are actually mounted.
            // https://github.com/preactjs/preact/issues/648
            // Use setTimeout to wait until the DOM element is actually mounted
            //  - If the width of grid is 'auto' actual width of grid is calculated from the
            //    Container component using setTimeout(fn, 0)
            //  - Delay 16ms for defer the function call later than the Container component.
            window.setTimeout(function () { return refreshRowHeight(rendererEl.clientHeight); }, 16);
        }
    };
    BodyCellComp.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.renderData !== nextProps.renderData && this.renderer && this.renderer.render) {
            var grid = nextProps.grid, rowKey = nextProps.rowKey, renderData = nextProps.renderData, columnInfo = nextProps.columnInfo, refreshRowHeight = nextProps.refreshRowHeight, allDisabled = nextProps.disabled;
            this.renderer.render(tslib_1.__assign({ grid: grid,
                rowKey: rowKey,
                columnInfo: columnInfo }, renderData, { allDisabled: allDisabled }));
            if (refreshRowHeight) {
                refreshRowHeight(this.el.scrollHeight);
            }
        }
    };
    BodyCellComp.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, rowKey = _b.rowKey, _c = _b.renderData, disabled = _c.disabled, editable = _c.editable, invalidState = _c.invalidState, className = _c.className, _d = _b.columnInfo, align = _d.align, valign = _d.valign, name = _d.name, _e = _d.validation, validation = _e === void 0 ? {} : _e, allDisabled = _b.disabled, treeInfo = _b.treeInfo, selectedRow = _b.selectedRow, rowSpanAttr = _b.rowSpanAttr;
        var style = tslib_1.__assign({ textAlign: align }, (valign && { verticalAlign: valign }));
        var attrs = (_a = {},
            _a[dom_1.dataAttr.ROW_KEY] = String(rowKey),
            _a[dom_1.dataAttr.COLUMN_NAME] = name,
            _a);
        var classNames = dom_1.cls('cell', 'cell-has-input', [editable, 'cell-editable'], [column_1.isRowHeader(name), 'cell-row-header'], [validation.required || false, 'cell-required'], [!!invalidState, 'cell-invalid'], [disabled || allDisabled, 'cell-disabled'], [!!treeInfo, 'cell-has-tree'], [column_1.isRowHeader(name) && selectedRow, 'cell-selected']) + " " + className;
        return treeInfo ? (preact_1.h("td", tslib_1.__assign({}, attrs, { style: style, class: classNames }),
            preact_1.h("div", { class: dom_1.cls('tree-wrapper-relative') },
                preact_1.h("div", { class: dom_1.cls('tree-wrapper-valign-center'), style: { paddingLeft: treeInfo.indentWidth }, ref: function (el) {
                        _this.el = el;
                    } },
                    preact_1.h(treeCellContents_1.TreeCellContents, { treeInfo: treeInfo, rowKey: rowKey }))))) : (preact_1.h("td", tslib_1.__assign({}, attrs, rowSpanAttr, { style: style, class: classNames, ref: function (el) {
                _this.el = el;
            }, onMouseDown: function (ev) { return _this.handleMouseDown(ev, name, rowKey); } })));
    };
    return BodyCellComp;
}(preact_1.Component));
exports.BodyCellComp = BodyCellComp;
exports.BodyCell = hoc_1.connect(function (_a, _b) {
    var id = _a.id, column = _a.column, data = _a.data, selection = _a.selection;
    var viewRow = _b.viewRow, columnInfo = _b.columnInfo;
    var rowKey = viewRow.rowKey, valueMap = viewRow.valueMap, treeInfo = viewRow.treeInfo;
    var treeColumnName = column.treeColumnName;
    var disabled = data.disabled;
    var grid = instance_1.getInstance(id);
    var range = selection.range;
    var columnName = columnInfo.name;
    return tslib_1.__assign({ grid: grid,
        rowKey: rowKey,
        disabled: disabled,
        columnInfo: columnInfo, renderData: valueMap[columnName] }, (columnName === treeColumnName ? { treeInfo: treeInfo } : null), { selectedRow: range ? rowKey >= range.row[0] && rowKey <= range.row[1] : false });
})(BodyCellComp);
//# sourceMappingURL=bodyCell.js.map