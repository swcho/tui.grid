"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var HeaderCheckboxComp = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderCheckboxComp, _super);
    function HeaderCheckboxComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (ev) {
            var target = ev.target;
            var dispatch = _this.props.dispatch;
            if (target.checked) {
                dispatch('checkAll');
            }
            else {
                dispatch('uncheckAll');
            }
        };
        return _this;
    }
    HeaderCheckboxComp.prototype.componentDidUpdate = function () {
        var _a = this.props, checkedAllRows = _a.checkedAllRows, disabled = _a.disabled;
        var input = this.el.querySelector('input[name=_checked]');
        if (input) {
            input.checked = checkedAllRows;
            input.disabled = disabled;
        }
    };
    HeaderCheckboxComp.prototype.render = function () {
        var _this = this;
        return (preact_1.h("span", { ref: function (el) {
                _this.el = el;
            }, dangerouslySetInnerHTML: { __html: this.props.header }, onChange: this.handleChange }));
    };
    return HeaderCheckboxComp;
}(preact_1.Component));
exports.HeaderCheckbox = hoc_1.connect(function (store) {
    var _a = store.data, checkedAllRows = _a.checkedAllRows, disabled = _a.disabled, allColumnMap = store.column.allColumnMap;
    return {
        header: allColumnMap._checked.header,
        checkedAllRows: checkedAllRows,
        disabled: disabled
    };
})(HeaderCheckboxComp);
//# sourceMappingURL=headerCheckbox.js.map