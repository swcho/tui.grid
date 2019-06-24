"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editor_1 = require("../helper/editor");
var CheckboxEditor = /** @class */ (function () {
    function CheckboxEditor(props) {
        var _this = this;
        var name = 'tui-grid-check-input';
        var el = document.createElement('fieldset');
        var type = props.columnInfo.editor.options.type;
        var listItems = editor_1.getListItems(props);
        listItems.forEach(function (_a) {
            var text = _a.text, value = _a.value;
            var id = name + "-" + value;
            el.appendChild(_this.createCheckbox(value, name, id, type));
            el.appendChild(_this.createLabel(text, id));
        });
        this.el = el;
        this.setValue(props.value);
    }
    CheckboxEditor.prototype.createLabel = function (text, id) {
        var label = document.createElement('label');
        label.innerText = text;
        label.setAttribute('for', id);
        return label;
    };
    CheckboxEditor.prototype.createCheckbox = function (value, name, id, inputType) {
        var input = document.createElement('input');
        input.type = inputType;
        input.id = id;
        input.name = name;
        input.value = String(value);
        input.setAttribute('data-value-type', 'string');
        return input;
    };
    CheckboxEditor.prototype.getFirstInput = function () {
        return this.el.querySelector('input');
    };
    CheckboxEditor.prototype.getElement = function () {
        return this.el;
    };
    CheckboxEditor.prototype.setValue = function (value) {
        var _this = this;
        String(value)
            .split(',')
            .forEach(function (inputValue) {
            var input = _this.el.querySelector("input[value=\"" + inputValue + "\"]");
            if (input) {
                input.checked = true;
            }
        });
    };
    CheckboxEditor.prototype.getValue = function () {
        var checkedInputs = this.el.querySelectorAll('input:checked');
        var checkedValues = [];
        for (var i = 0, len = checkedInputs.length; i < len; i += 1) {
            checkedValues.push(checkedInputs[i].value);
        }
        return checkedValues.join(',');
    };
    CheckboxEditor.prototype.mounted = function () {
        var firstInput = this.getFirstInput();
        if (firstInput) {
            firstInput.focus();
        }
    };
    return CheckboxEditor;
}());
exports.CheckboxEditor = CheckboxEditor;
//# sourceMappingURL=checkbox.js.map