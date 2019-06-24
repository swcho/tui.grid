"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../helper/common");
function getListItemText(listItems, value) {
    var item = common_1.findProp('value', value, listItems);
    return item ? item.text : '';
}
function listItemText(_a, relationListItems) {
    var column = _a.column, value = _a.value;
    var type = column.editor.options.type;
    var listItems = column.editor.options.listItems;
    if (Array.isArray(relationListItems)) {
        listItems = relationListItems;
    }
    if (type === 'checkbox') {
        return String(value)
            .split(',')
            .map(getListItemText.bind(null, listItems))
            .filter(function (text) { return Boolean(text); })
            .join(',');
    }
    return getListItemText(listItems, value);
}
exports.listItemText = listItemText;
//# sourceMappingURL=listItemText.js.map