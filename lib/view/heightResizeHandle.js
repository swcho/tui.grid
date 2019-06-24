"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var dom_1 = require("../helper/dom");
var HeightResizeHandleComp = /** @class */ (function (_super) {
    tslib_1.__extends(HeightResizeHandleComp, _super);
    function HeightResizeHandleComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragStartY = -1;
        _this.dragStartBodyHeight = -1;
        _this.handleMouseDown = function (ev) {
            _this.dragStartY = ev.pageY;
            _this.dragStartBodyHeight = _this.props.bodyHeight;
            dom_1.setCursorStyle('row-resize');
            document.addEventListener('mousemove', _this.handleMouseMove);
            document.addEventListener('mouseup', _this.clearDocumentEvents);
            document.addEventListener('selectstart', _this.handleSelectStart);
        };
        _this.handleSelectStart = function (ev) {
            ev.preventDefault();
        };
        _this.handleMouseMove = function (ev) {
            var distance = ev.pageY - _this.dragStartY;
            _this.props.dispatch('setBodyHeight', _this.dragStartBodyHeight + distance);
        };
        _this.clearDocumentEvents = function () {
            dom_1.setCursorStyle('');
            document.removeEventListener('mousemove', _this.handleMouseMove);
            document.removeEventListener('mouseup', _this.clearDocumentEvents);
            document.removeEventListener('selectstart', _this.handleSelectStart);
        };
        return _this;
    }
    HeightResizeHandleComp.prototype.render = function () {
        return (preact_1.h("div", { class: dom_1.cls('height-resize-handle'), onMouseDown: this.handleMouseDown },
            preact_1.h("button", null,
                preact_1.h("span", null))));
    };
    return HeightResizeHandleComp;
}(preact_1.Component));
exports.HeightResizeHandle = hoc_1.connect(function (_a) {
    var dimension = _a.dimension;
    return ({
        bodyHeight: dimension.bodyHeight
    });
})(HeightResizeHandleComp);
//# sourceMappingURL=heightResizeHandle.js.map