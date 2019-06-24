"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var leftSide_1 = require("./leftSide");
var rightSide_1 = require("./rightSide");
var stateLayer_1 = require("./stateLayer");
var editingLayer_1 = require("./editingLayer");
var heightResizeHandle_1 = require("./heightResizeHandle");
var clipboard_1 = require("./clipboard");
var pagination_1 = require("./pagination");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var eventBus_1 = require("../event/eventBus");
var gridEvent_1 = tslib_1.__importDefault(require("../event/gridEvent"));
var ContainerComp = /** @class */ (function (_super) {
    tslib_1.__extends(ContainerComp, _super);
    function ContainerComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseover = function (event) {
            var eventBus = _this.props.eventBus;
            var gridEvent = new gridEvent_1.default({ event: event });
            /**
             * Occurs when a mouse pointer is moved onto the Grid.
             * The properties of the event object include the native MouseEvent object.
             * @event Grid#mouseover
             * @property {Event} nativeEvent - Event object
             * @property {string} targetType - Type of event target
             * @property {number} rowKey - rowKey of the target cell
             * @property {string} columnName - columnName of the target cell
             * @property {Grid} instance - Current grid instance
             */
            eventBus.trigger('mouseover', gridEvent);
        };
        _this.handleClick = function (event) {
            var _a = _this.props, eventBus = _a.eventBus, editingEvent = _a.editingEvent;
            var gridEvent = new gridEvent_1.default({ event: event });
            /**
             * Occurs when a mouse button is clicked on the Grid.
             * The properties of the event object include the native event object.
             * @event Grid#click
             * @property {Event} nativeEvent - Event object
             * @property {string} targetType - Type of event target
             * @property {number} rowKey - rowKey of the target cell
             * @property {string} columnName - columnName of the target cell
             * @property {Grid} instance - Current grid instance
             */
            eventBus.trigger('click', gridEvent);
            if (!gridEvent.isStopped() && editingEvent === 'click') {
                _this.startEditing(event.target);
            }
        };
        _this.handleMouseout = function (event) {
            var eventBus = _this.props.eventBus;
            var gridEvent = new gridEvent_1.default({ event: event });
            /**
             * Occurs when a mouse pointer is moved off from the Grid.
             * The event object has all properties copied from the native MouseEvent.
             * @event Grid#mouseout
             * @property {Event} nativeEvent - Event object
             * @property {string} targetType - Type of event target
             * @property {number | string} rowKey - rowKey of the target cell
             * @property {string} columnName - columnName of the target cell
             * @property {Grid} instance - Current grid instance
             */
            eventBus.trigger('mouseout', gridEvent);
        };
        _this.handleMouseDown = function (event) {
            if (!_this.el) {
                return;
            }
            var _a = _this.props, dispatch = _a.dispatch, editing = _a.editing, eventBus = _a.eventBus;
            var el = _this.el;
            var gridEvent = new gridEvent_1.default({ event: event });
            /**
             * Occurs when a mouse button is downed on the Grid.
             * The event object has all properties copied from the native MouseEvent.
             * @event Grid#mousedown
             * @property {Event} nativeEvent - Event object
             * @property {string} targetType - Type of event target
             * @property {number | string} rowKey - rowKey of the target cell
             * @property {string} columnName - columnName of the target cell
             * @property {Grid} instance - Current grid instance
             */
            eventBus.trigger('mousedown', gridEvent);
            if (!gridEvent.isStopped()) {
                dispatch('setNavigating', true);
                if (!editing) {
                    event.preventDefault();
                }
                var _b = el.getBoundingClientRect(), top_1 = _b.top, left = _b.left;
                dispatch('setOffsetTop', top_1 + el.scrollTop);
                dispatch('setOffsetLeft', left + el.scrollLeft);
            }
        };
        _this.handleDblClick = function (event) {
            if (!_this.el) {
                return;
            }
            var _a = _this.props, eventBus = _a.eventBus, editingEvent = _a.editingEvent;
            var gridEvent = new gridEvent_1.default({ event: event });
            /**
             * Occurs when a mouse button is double clicked on the Grid.
             * The properties of the event object include the native event object.
             * @event Grid#dblclick
             * @property {Event} nativeEvent - Event object
             * @property {string} targetType - Type of event target
             * @property {number} rowKey - rowKey of the target cell
             * @property {string} columnName - columnName of the target cell
             * @property {Grid} instance - Current grid instance
             */
            eventBus.trigger('dblClick', gridEvent);
            if (!gridEvent.isStopped() && editingEvent === 'dblclick') {
                _this.startEditing(event.target);
            }
        };
        _this.syncWithDOMWidth = function () {
            _this.props.dispatch('refreshLayout', _this.el, _this.props.rootElement.parentElement);
        };
        return _this;
    }
    ContainerComp.prototype.startEditing = function (eventTarget) {
        var dispatch = this.props.dispatch;
        var address = dom_1.getCellAddress(eventTarget);
        if (address) {
            var rowKey = address.rowKey, columnName = address.columnName;
            dispatch('startEditing', rowKey, columnName);
        }
    };
    ContainerComp.prototype.componentDidMount = function () {
        if (this.props.autoWidth) {
            window.addEventListener('resize', this.syncWithDOMWidth);
            // In Preact, the componentDidMount is called before the DOM elements are actually mounted.
            // https://github.com/preactjs/preact/issues/648
            // Use setTimeout to wait until the DOM element is actually mounted
            window.setTimeout(this.syncWithDOMWidth, 0);
        }
    };
    ContainerComp.prototype.componentWillUnmount = function () {
        if (this.props.autoWidth) {
            window.removeEventListener('resize', this.syncWithDOMWidth);
        }
    };
    ContainerComp.prototype.shouldComponentUpdate = function (nextProps) {
        if (this.props.autoWidth && nextProps.autoWidth) {
            return false;
        }
        return true;
    };
    ContainerComp.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, summaryHeight = _b.summaryHeight, summaryPosition = _b.summaryPosition, heightResizable = _b.heightResizable, gridId = _b.gridId, width = _b.width, autoWidth = _b.autoWidth, scrollXHeight = _b.scrollXHeight, showLeftSide = _b.showLeftSide, scrollX = _b.scrollX, scrollY = _b.scrollY;
        var style = { width: autoWidth ? '100%' : width };
        var attrs = (_a = {}, _a[dom_1.dataAttr.GRID_ID] = gridId, _a);
        return (preact_1.h("div", tslib_1.__assign({}, attrs, { style: style, class: dom_1.cls('container', [showLeftSide, 'show-lside-area']), onMouseDown: this.handleMouseDown, onDblClick: this.handleDblClick, onClick: this.handleClick, onMouseOut: this.handleMouseout, onMouseOver: this.handleMouseover, ref: function (el) {
                _this.el = el;
            } }),
            preact_1.h("div", { class: dom_1.cls('content-area', [!!summaryHeight, summaryPosition === 'top' ? 'has-summary-top' : 'has-summary-bottom'], [!scrollX, 'no-scroll-x'], [!scrollY, 'no-scroll-y']) },
                preact_1.h(leftSide_1.LeftSide, null),
                preact_1.h(rightSide_1.RightSide, null),
                preact_1.h("div", { class: dom_1.cls('border-line', 'border-line-top') }),
                preact_1.h("div", { class: dom_1.cls('border-line', 'border-line-left') }),
                preact_1.h("div", { class: dom_1.cls('border-line', 'border-line-right') }),
                preact_1.h("div", { class: dom_1.cls('border-line', 'border-line-bottom'), style: { bottom: scrollXHeight } })),
            heightResizable && preact_1.h(heightResizeHandle_1.HeightResizeHandle, null),
            preact_1.h(stateLayer_1.StateLayer, null),
            preact_1.h(editingLayer_1.EditingLayer, null),
            preact_1.h(clipboard_1.Clipboard, null),
            preact_1.h(pagination_1.Pagination, null)));
    };
    return ContainerComp;
}(preact_1.Component));
exports.ContainerComp = ContainerComp;
exports.Container = hoc_1.connect(function (_a) {
    var id = _a.id, dimension = _a.dimension, focus = _a.focus, columnCoords = _a.columnCoords, data = _a.data;
    return ({
        gridId: id,
        width: dimension.width,
        autoWidth: dimension.autoWidth,
        editing: !!focus.editingAddress,
        scrollXHeight: dimension.scrollX ? dimension.scrollbarWidth : 0,
        fitToParentHeight: dimension.fitToParentHeight,
        summaryHeight: dimension.summaryHeight,
        summaryPosition: dimension.summaryPosition,
        heightResizable: dimension.heightResizable,
        showLeftSide: !!columnCoords.areaWidth.L,
        disabled: data.disabled,
        editingEvent: focus.editingEvent,
        viewData: data.viewData,
        eventBus: eventBus_1.getEventBus(id),
        scrollX: dimension.scrollX,
        scrollY: dimension.scrollY
    });
})(ContainerComp);
//# sourceMappingURL=container.js.map