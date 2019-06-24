"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CLS_PREFIX = 'tui-grid-';
exports.dataAttr = {
    ROW_KEY: 'data-row-key',
    COLUMN_NAME: 'data-column-name',
    COLUMN_INDEX: 'data-column-index',
    GRID_ID: 'data-grid-id'
};
function cls() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var result = [];
    for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
        var name_1 = names_1[_a];
        var className = void 0;
        if (Array.isArray(name_1)) {
            className = name_1[0] ? name_1[1] : null;
        }
        else {
            className = name_1;
        }
        if (className) {
            result.push("" + CLS_PREFIX + className);
        }
    }
    return result.join(' ');
}
exports.cls = cls;
function hasClass(el, className) {
    return el.className.split(' ').indexOf(cls(className)) !== -1;
}
exports.hasClass = hasClass;
function findParentByTagName(el, tagName) {
    var currentEl = el;
    while (currentEl && currentEl.tagName.toLowerCase() !== tagName) {
        currentEl = currentEl.parentElement;
    }
    return currentEl;
}
exports.findParentByTagName = findParentByTagName;
function findParent(el, className) {
    var currentEl = el;
    while (currentEl && !hasClass(currentEl, className)) {
        currentEl = currentEl.parentElement;
    }
    return currentEl;
}
exports.findParent = findParent;
function getCellAddress(el) {
    var cellElement = findParent(el, 'cell');
    if (!cellElement) {
        return null;
    }
    var rowKey = Number(cellElement.getAttribute(exports.dataAttr.ROW_KEY));
    var columnName = cellElement.getAttribute(exports.dataAttr.COLUMN_NAME);
    return { rowKey: rowKey, columnName: columnName };
}
exports.getCellAddress = getCellAddress;
/**
 * create style element and append it into the head element.
 * @param {String} id - element id
 * @param {String} cssString - css string
 */
function appendStyleElement(id, cssString) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    style.appendChild(document.createTextNode(cssString));
    document.getElementsByTagName('head')[0].appendChild(style);
}
exports.appendStyleElement = appendStyleElement;
function setCursorStyle(type) {
    document.body.style.cursor = type;
}
exports.setCursorStyle = setCursorStyle;
function getCoordinateWithOffset(pageX, pageY) {
    var pageXWithOffset = pageX - window.pageXOffset;
    var pageYWithOffset = pageY - window.pageYOffset;
    return [pageXWithOffset, pageYWithOffset];
}
exports.getCoordinateWithOffset = getCoordinateWithOffset;
//# sourceMappingURL=dom.js.map