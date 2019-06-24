"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = require("./text");
var checkbox_1 = require("./checkbox");
var select_1 = require("./select");
var datePicker_1 = require("./datePicker");
exports.editorMap = {
    text: [text_1.TextEditor, { type: 'text' }],
    password: [text_1.TextEditor, { type: 'password' }],
    checkbox: [checkbox_1.CheckboxEditor, { type: 'checkbox' }],
    radio: [checkbox_1.CheckboxEditor, { type: 'radio' }],
    select: [select_1.SelectEditor],
    datePicker: [datePicker_1.DatePickerEditor]
};
//# sourceMappingURL=manager.js.map