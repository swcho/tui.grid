"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
function getListItems(props) {
    var _a = props.columnInfo.editor.options, listItems = _a.listItems, relationListItemMap = _a.relationListItemMap;
    if (!common_1.isEmpty(relationListItemMap) && Array.isArray(relationListItemMap[props.rowKey])) {
        return relationListItemMap[props.rowKey];
    }
    return listItems;
}
exports.getListItems = getListItems;
//# sourceMappingURL=editor.js.map