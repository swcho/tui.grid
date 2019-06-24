"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tui_date_picker_1 = tslib_1.__importDefault(require("tui-date-picker"));
var dom_1 = require("../helper/dom");
var common_1 = require("../helper/common");
var DatePickerEditor = /** @class */ (function () {
    function DatePickerEditor(props) {
        var format = 'yyyy-MM-dd';
        var date = new Date();
        this.el = this.createWrapper();
        this.inputEl = this.createInputElement();
        var calendarWrapper = this.createCalendarWrapper();
        var options = props.columnInfo.editor.options;
        if (options) {
            if (options.format) {
                format = options.format;
                delete options.format;
            }
        }
        if (common_1.isNumber(props.value) || common_1.isString(props.value)) {
            date = new Date(props.value);
        }
        var defaultOptions = {
            date: date,
            type: 'date',
            input: {
                element: this.inputEl,
                format: format
            }
        };
        this.datePickerEl = new tui_date_picker_1.default(calendarWrapper, common_1.deepMergedCopy(defaultOptions, options || {}));
    }
    DatePickerEditor.prototype.createWrapper = function () {
        var el = document.createElement('div');
        el.className = dom_1.cls('layer-datepicker');
        return el;
    };
    DatePickerEditor.prototype.createInputElement = function () {
        var inputEl = document.createElement('input');
        inputEl.className = dom_1.cls('content-text');
        inputEl.type = 'text';
        this.el.appendChild(inputEl);
        return inputEl;
    };
    DatePickerEditor.prototype.createCalendarWrapper = function () {
        var calendarWrapper = document.createElement('div');
        calendarWrapper.style.marginTop = '-4px';
        this.el.appendChild(calendarWrapper);
        return calendarWrapper;
    };
    DatePickerEditor.prototype.getElement = function () {
        return this.el;
    };
    DatePickerEditor.prototype.getValue = function () {
        return this.inputEl.value;
    };
    DatePickerEditor.prototype.mounted = function () {
        this.inputEl.select();
        this.datePickerEl.open();
    };
    return DatePickerEditor;
}());
exports.DatePickerEditor = DatePickerEditor;
//# sourceMappingURL=datePicker.js.map