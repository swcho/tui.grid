"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var bodyArea_1 = require("./bodyArea");
var headerArea_1 = require("./headerArea");
var summaryArea_1 = require("./summaryArea");
var hoc_1 = require("../view/hoc");
var RightSideComp = /** @class */ (function (_super) {
    tslib_1.__extends(RightSideComp, _super);
    function RightSideComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightSideComp.prototype.renderScrollbarYInnerBorder = function () {
        var _a = this.props, cornerTopHeight = _a.cornerTopHeight, bodyHeight = _a.bodyHeight, scrollXHeight = _a.scrollXHeight;
        var style = {
            top: cornerTopHeight,
            height: bodyHeight - scrollXHeight
        };
        return preact_1.h("div", { class: dom_1.cls('scrollbar-y-inner-border'), style: style });
    };
    RightSideComp.prototype.renderScrollbarRightTop = function () {
        var style = { height: this.props.cornerTopHeight };
        return preact_1.h("div", { class: dom_1.cls('scrollbar-right-top'), style: style });
    };
    RightSideComp.prototype.renderScrollbarYOuterBorder = function () {
        return preact_1.h("div", { class: dom_1.cls('scrollbar-y-outer-border') });
    };
    RightSideComp.prototype.renderScrollbarRightBottom = function () {
        var style = { height: this.props.cornerBottomHeight };
        return preact_1.h("div", { class: dom_1.cls('scrollbar-right-bottom'), style: style });
    };
    RightSideComp.prototype.renderScrollbarFrozenBorder = function () {
        var _a = this.props, scrollXHeight = _a.scrollXHeight, frozenBorderWidth = _a.frozenBorderWidth, cellBorderWidth = _a.cellBorderWidth;
        var style = {
            height: scrollXHeight,
            width: frozenBorderWidth,
            marginLeft: -(frozenBorderWidth + cellBorderWidth)
        };
        return preact_1.h("div", { class: dom_1.cls('scrollbar-frozen-border'), style: style });
    };
    RightSideComp.prototype.renderFrozenBorder = function () {
        var frozenBorderWidth = this.props.frozenBorderWidth;
        var style = {
            marginLeft: -frozenBorderWidth,
            width: frozenBorderWidth
        };
        return preact_1.h("div", { class: dom_1.cls('frozen-border'), style: style });
    };
    RightSideComp.prototype.render = function () {
        var _a = this.props, marginLeft = _a.marginLeft, width = _a.width, summaryPosition = _a.summaryPosition, scrollY = _a.scrollY;
        var style = {
            display: 'block',
            marginLeft: marginLeft,
            width: width
        };
        return (preact_1.h("div", { class: dom_1.cls('rside-area'), style: style },
            preact_1.h(headerArea_1.HeaderArea, { side: "R" }),
            summaryPosition === 'top' && preact_1.h(summaryArea_1.SummaryArea, { side: "R" }),
            preact_1.h(bodyArea_1.BodyArea, { side: "R" }),
            summaryPosition === 'bottom' && preact_1.h(summaryArea_1.SummaryArea, { side: "R" }),
            scrollY && this.renderScrollbarYInnerBorder(),
            scrollY && this.renderScrollbarYOuterBorder(),
            scrollY && this.renderScrollbarRightTop(),
            this.renderScrollbarRightBottom(),
            this.renderScrollbarFrozenBorder(),
            this.renderFrozenBorder()));
    };
    return RightSideComp;
}(preact_1.Component));
exports.RightSide = hoc_1.connect(function (_a) {
    var dimension = _a.dimension, columnCoords = _a.columnCoords;
    var scrollbarWidth = dimension.scrollbarWidth, scrollX = dimension.scrollX, scrollY = dimension.scrollY, summaryHeight = dimension.summaryHeight, headerHeight = dimension.headerHeight, cellBorderWidth = dimension.cellBorderWidth, tableBorderWidth = dimension.tableBorderWidth, bodyHeight = dimension.bodyHeight, summaryPosition = dimension.summaryPosition, frozenBorderWidth = dimension.frozenBorderWidth;
    var cornerTopHeight = headerHeight;
    var cornerBottomHeight = scrollX ? scrollbarWidth : 0;
    if (scrollY && summaryHeight) {
        if (summaryPosition === 'top') {
            cornerTopHeight += summaryHeight + tableBorderWidth;
        }
        else {
            cornerBottomHeight += summaryHeight;
        }
    }
    var scrollXHeight = scrollX ? scrollbarWidth : 0;
    var width = columnCoords.areaWidth.R;
    var marginLeft = columnCoords.areaWidth.L + frozenBorderWidth;
    if (marginLeft && !frozenBorderWidth) {
        marginLeft -= cellBorderWidth;
        width += cellBorderWidth;
    }
    return {
        width: width,
        marginLeft: marginLeft,
        cornerTopHeight: cornerTopHeight,
        cornerBottomHeight: cornerBottomHeight,
        scrollXHeight: scrollXHeight,
        bodyHeight: bodyHeight,
        cellBorderWidth: cellBorderWidth,
        frozenBorderWidth: frozenBorderWidth,
        summaryPosition: summaryPosition,
        scrollX: scrollX,
        scrollY: scrollY
    };
})(RightSideComp);
//# sourceMappingURL=rightSide.js.map