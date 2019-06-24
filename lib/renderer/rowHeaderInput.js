"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RowHeaderInputRenderer = /** @class */ (function () {
    function RowHeaderInputRenderer(props) {
        var el = document.createElement('input');
        var grid = props.grid, rowKey = props.rowKey, disabled = props.disabled, allDisabled = props.allDisabled;
        el.type = 'checkbox';
        el.name = '_checked';
        el.disabled = allDisabled || disabled;
        el.addEventListener('change', function () {
            if (el.checked) {
                grid.check(rowKey);
            }
            else {
                grid.uncheck(rowKey);
            }
        });
        this.el = el;
        this.render(props);
    }
    RowHeaderInputRenderer.prototype.getElement = function () {
        return this.el;
    };
    RowHeaderInputRenderer.prototype.render = function (props) {
        var value = props.value, allDisabled = props.allDisabled, disabled = props.disabled;
        this.el.checked = Boolean(value);
        this.el.disabled = allDisabled || disabled;
    };
    return RowHeaderInputRenderer;
}());
exports.RowHeaderInputRenderer = RowHeaderInputRenderer;
//# sourceMappingURL=rowHeaderInput.js.map