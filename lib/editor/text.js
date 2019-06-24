"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("../helper/dom");
var TextEditor = /** @class */ (function () {
    function TextEditor(props) {
        var el = document.createElement('input');
        var options = props.columnInfo.editor.options;
        el.className = dom_1.cls('content-text');
        el.type = options.type;
        el.value = String(props.value);
        this.el = el;
    }
    TextEditor.prototype.getElement = function () {
        return this.el;
    };
    TextEditor.prototype.getValue = function () {
        return this.el.value;
    };
    TextEditor.prototype.mounted = function () {
        this.el.select();
    };
    return TextEditor;
}());
exports.TextEditor = TextEditor;
//# sourceMappingURL=text.js.map