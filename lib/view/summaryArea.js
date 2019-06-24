"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var colGroup_1 = require("./colGroup");
var summaryBodyRow_1 = require("./summaryBodyRow");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var SummaryAreaComp = /** @class */ (function (_super) {
    tslib_1.__extends(SummaryAreaComp, _super);
    function SummaryAreaComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleScroll = function (ev) {
            var scrollLeft = ev.srcElement.scrollLeft;
            var _a = _this.props, dispatch = _a.dispatch, side = _a.side;
            if (side === 'R') {
                dispatch('setScrollLeft', scrollLeft);
            }
        };
        return _this;
    }
    SummaryAreaComp.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.el) {
            this.el.scrollLeft = nextProps.scrollLeft;
        }
    };
    SummaryAreaComp.prototype.render = function (_a) {
        var _this = this;
        var height = _a.height, columns = _a.columns, side = _a.side;
        var tableStyle = { height: height };
        return (height > 0 && (preact_1.h("div", { class: dom_1.cls('summary-area'), onScroll: this.handleScroll, ref: function (el) {
                _this.el = el;
            } },
            preact_1.h("table", { class: dom_1.cls('table'), style: tableStyle },
                preact_1.h(colGroup_1.ColGroup, { side: side, useViewport: false }),
                preact_1.h(summaryBodyRow_1.SummaryBodyRow, { columns: columns })))));
    };
    return SummaryAreaComp;
}(preact_1.Component));
exports.SummaryArea = hoc_1.connect(function (store, _a) {
    var side = _a.side;
    var column = store.column, dimension = store.dimension, viewport = store.viewport;
    var summaryHeight = dimension.summaryHeight;
    var scrollLeft = viewport.scrollLeft;
    return {
        height: summaryHeight,
        columns: column.visibleColumnsBySide[side],
        scrollLeft: scrollLeft
    };
})(SummaryAreaComp);
//# sourceMappingURL=summaryArea.js.map