"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("../helper/dom");
var DefaultRenderer = /** @class */ (function () {
    function DefaultRenderer(props) {
        var el = document.createElement('div');
        var _a = props.columnInfo, ellipsis = _a.ellipsis, whiteSpace = _a.whiteSpace;
        el.className = dom_1.cls('cell-content');
        if (ellipsis) {
            el.style.textOverflow = 'ellipsis';
        }
        if (whiteSpace) {
            el.style.whiteSpace = whiteSpace;
        }
        this.el = el;
        this.render(props);
    }
    DefaultRenderer.prototype.getElement = function () {
        return this.el;
    };
    DefaultRenderer.prototype.render = function (props) {
        this.el.innerHTML = "" + props.formattedValue;
    };
    return DefaultRenderer;
}());
exports.DefaultRenderer = DefaultRenderer;
//# sourceMappingURL=default.js.map