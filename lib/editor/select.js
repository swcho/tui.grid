"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editor_1 = require("../helper/editor");
var SelectEditor = /** @class */ (function () {
    function SelectEditor(props) {
        var _this = this;
        var el = document.createElement('select');
        var listItems = editor_1.getListItems(props);
        listItems.forEach(function (_a) {
            var text = _a.text, value = _a.value;
            el.appendChild(_this.createOptions(text, value));
        });
        el.value = String(props.value);
        this.el = el;
    }
    SelectEditor.prototype.createOptions = function (text, value) {
        var option = document.createElement('option');
        option.setAttribute('value', String(value));
        option.innerText = text;
        return option;
    };
    SelectEditor.prototype.getElement = function () {
        return this.el;
    };
    SelectEditor.prototype.getValue = function () {
        return this.el.value;
    };
    SelectEditor.prototype.mounted = function () {
        this.el.focus();
    };
    return SelectEditor;
}());
exports.SelectEditor = SelectEditor;
//# sourceMappingURL=select.js.map