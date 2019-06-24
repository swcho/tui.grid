"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var bodyRows_1 = require("./bodyRows");
var colGroup_1 = require("./colGroup");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var focusLayer_1 = require("./focusLayer");
var selectionLayer_1 = require("./selectionLayer");
var common_1 = require("../helper/common");
// Minimum distance (pixel) to detect if user wants to drag when moving mouse with button pressed.
var MIN_DISTANCE_FOR_DRAG = 10;
// only updates when these props are changed
// for preventing unnecessary rendering when scroll changes
var PROPS_FOR_UPDATE = [
    'bodyHeight',
    'totalRowHeight',
    'offsetLeft',
    'offsetTop'
];
var BodyAreaComp = /** @class */ (function (_super) {
    tslib_1.__extends(BodyAreaComp, _super);
    function BodyAreaComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragStartData = {
            pageX: null,
            pageY: null
        };
        _this.handleScroll = function (ev) {
            var _a = ev.srcElement, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
            var dispatch = _this.props.dispatch;
            if (_this.props.side === 'R') {
                dispatch('setScrollLeft', scrollLeft);
            }
            dispatch('setScrollTop', scrollTop);
        };
        _this.handleMouseDown = function (ev) {
            if (!_this.el) {
                return;
            }
            var el = _this.el;
            var shiftKey = ev.shiftKey;
            var _a = dom_1.getCoordinateWithOffset(ev.pageX, ev.pageY), pageX = _a[0], pageY = _a[1];
            var scrollTop = el.scrollTop, scrollLeft = el.scrollLeft;
            var _b = _this.props, side = _b.side, dispatch = _b.dispatch;
            var _c = el.getBoundingClientRect(), top = _c.top, left = _c.left;
            dispatch('mouseDownBody', { top: top, left: left, scrollTop: scrollTop, scrollLeft: scrollLeft, side: side }, { pageX: pageX, pageY: pageY, shiftKey: shiftKey });
            _this.dragStartData = { pageX: pageX, pageY: pageY };
            dom_1.setCursorStyle('default');
            document.addEventListener('mousemove', _this.handleMouseMove);
            document.addEventListener('mouseup', _this.clearDocumentEvents);
            document.addEventListener('selectstart', _this.handleSelectStart);
        };
        _this.moveEnoughToTriggerDragEvent = function (current) {
            var dx = Math.abs(_this.dragStartData.pageX - current.pageX);
            var dy = Math.abs(_this.dragStartData.pageY - current.pageY);
            var distance = Math.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
            return distance >= MIN_DISTANCE_FOR_DRAG;
        };
        _this.handleSelectStart = function (ev) {
            ev.preventDefault();
        };
        _this.handleMouseMove = function (ev) {
            var _a = dom_1.getCoordinateWithOffset(ev.pageX, ev.pageY), pageX = _a[0], pageY = _a[1];
            if (_this.moveEnoughToTriggerDragEvent({ pageX: pageX, pageY: pageY })) {
                _this.props.dispatch('dragMoveBody', _this.dragStartData, { pageX: pageX, pageY: pageY });
            }
        };
        _this.clearDocumentEvents = function () {
            _this.dragStartData = { pageX: null, pageY: null };
            _this.props.dispatch('dragEnd');
            dom_1.setCursorStyle('');
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.clearDocumentEvents);
            document.removeEventListener('selectstart', _this.handleSelectStart);
        };
        return _this;
    }
    BodyAreaComp.prototype.shouldComponentUpdate = function (nextProps) {
        var currProps = this.props;
        return common_1.some(function (propName) { return nextProps[propName] !== currProps[propName]; }, PROPS_FOR_UPDATE);
    };
    BodyAreaComp.prototype.componentWillReceiveProps = function (nextProps) {
        this.el.scrollTop = nextProps.scrollTop;
        this.el.scrollLeft = nextProps.scrollLeft;
    };
    BodyAreaComp.prototype.render = function (_a) {
        var _this = this;
        var side = _a.side, bodyHeight = _a.bodyHeight, totalRowHeight = _a.totalRowHeight, totalColumnWidth = _a.totalColumnWidth, scrollXHeight = _a.scrollXHeight, offsetTop = _a.offsetTop, offsetLeft = _a.offsetLeft, dummyRowCount = _a.dummyRowCount, scrollX = _a.scrollX, scrollY = _a.scrollY;
        var overflowX = scrollX ? 'scroll' : 'hidden';
        var overflowY = scrollY ? 'scroll' : 'hidden';
        var areaStyle = { overflowX: overflowX, overflowY: overflowY, height: bodyHeight };
        var tableContainerStyle = {
            top: offsetTop,
            left: offsetLeft,
            height: dummyRowCount ? bodyHeight - scrollXHeight : '',
            overflow: dummyRowCount ? 'hidden' : 'visible'
        };
        var containerStyle = {
            width: totalColumnWidth,
            height: totalRowHeight
        };
        return (preact_1.h("div", { class: dom_1.cls('body-area'), style: areaStyle, onScroll: this.handleScroll, onMouseDown: this.handleMouseDown, ref: function (el) {
                _this.el = el;
            } },
            preact_1.h("div", { class: dom_1.cls('body-container'), style: containerStyle },
                preact_1.h("div", { class: dom_1.cls('table-container'), style: tableContainerStyle },
                    preact_1.h("table", { class: dom_1.cls('table') },
                        preact_1.h(colGroup_1.ColGroup, { side: side, useViewport: true }),
                        preact_1.h(bodyRows_1.BodyRows, { side: side }))),
                preact_1.h("div", { class: dom_1.cls('layer-selection'), style: "display: none;" }),
                preact_1.h(focusLayer_1.FocusLayer, { side: side }),
                preact_1.h(selectionLayer_1.SelectionLayer, { side: side }))));
    };
    return BodyAreaComp;
}(preact_1.Component));
exports.BodyArea = hoc_1.connect(function (store, _a) {
    var side = _a.side;
    var columnCoords = store.columnCoords, rowCoords = store.rowCoords, dimension = store.dimension, viewport = store.viewport;
    var totalRowHeight = rowCoords.totalRowHeight;
    var totalColumnWidth = columnCoords.totalColumnWidth;
    var bodyHeight = dimension.bodyHeight, scrollXHeight = dimension.scrollXHeight, scrollX = dimension.scrollX, scrollY = dimension.scrollY;
    var offsetLeft = viewport.offsetLeft, offsetTop = viewport.offsetTop, scrollTop = viewport.scrollTop, scrollLeft = viewport.scrollLeft, dummyRowCount = viewport.dummyRowCount;
    return {
        bodyHeight: bodyHeight,
        totalRowHeight: totalRowHeight,
        offsetTop: offsetTop,
        scrollTop: scrollTop,
        totalColumnWidth: totalColumnWidth[side],
        offsetLeft: side === 'L' ? 0 : offsetLeft,
        scrollLeft: side === 'L' ? 0 : scrollLeft,
        scrollXHeight: scrollXHeight,
        dummyRowCount: dummyRowCount,
        scrollX: scrollX,
        scrollY: scrollY
    };
})(BodyAreaComp);
//# sourceMappingURL=bodyArea.js.map