"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
exports.keyNameMap = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    17: 'ctrl',
    27: 'esc',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    67: 'c',
    86: 'v',
    32: 'space',
    33: 'pageUp',
    34: 'pageDown',
    36: 'home',
    35: 'end',
    46: 'del'
};
exports.keyboardEventTypeMap = {
    move: 'move',
    edit: 'edit',
    remove: 'remove',
    select: 'select',
    clipboard: 'clipboard'
};
exports.keyboardEventCommandMap = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    pageUp: 'pageUp',
    pageDown: 'pageDown',
    firstColumn: 'firstColumn',
    lastColumn: 'lastColumn',
    currentCell: 'currentCell',
    nextCell: 'nextCell',
    prevCell: 'prevCell',
    firstCell: 'firstCell',
    lastCell: 'lastCell',
    all: 'all',
    copy: 'copy',
    paste: 'paste'
};
/**
 * K-V object for matching keystroke and event command
 * K: keystroke (order : ctrl -> shift -> keyName)
 * V: [key event type, command]
 * @type {Object}
 * @ignore
 */
exports.keyStrokeCommandMap = {
    up: ['move', 'up'],
    down: ['move', 'down'],
    left: ['move', 'left'],
    right: ['move', 'right'],
    pageUp: ['move', 'pageUp'],
    pageDown: ['move', 'pageDown'],
    home: ['move', 'firstColumn'],
    end: ['move', 'lastColumn'],
    enter: ['edit', 'currentCell'],
    space: ['edit', 'currentCell'],
    tab: ['edit', 'nextCell'],
    backspace: ['remove'],
    del: ['remove'],
    'shift-tab': ['edit', 'prevCell'],
    'shift-up': ['select', 'up'],
    'shift-down': ['select', 'down'],
    'shift-left': ['select', 'left'],
    'shift-right': ['select', 'right'],
    'shift-pageUp': ['select', 'pageUp'],
    'shift-pageDown': ['select', 'pageDown'],
    'shift-home': ['select', 'firstColumn'],
    'shift-end': ['select', 'lastColumn'],
    'ctrl-a': ['select', 'all'],
    'ctrl-c': ['clipboard', 'copy'],
    'ctrl-v': ['clipboard', 'paste'],
    'ctrl-home': ['move', 'firstCell'],
    'ctrl-end': ['move', 'lastCell'],
    'ctrl-shift-home': ['select', 'firstCell'],
    'ctrl-shift-end': ['select', 'lastCell']
};
/**
 * Returns the keyStroke string
 * @param {Event} ev - Keyboard event
 * @returns {String}
 * @ignore
 */
function getKeyStrokeString(ev) {
    var keys = [];
    var keyCode = ev.keyCode, ctrlKey = ev.ctrlKey, metaKey = ev.metaKey, shiftKey = ev.shiftKey;
    if (ctrlKey || metaKey) {
        keys.push('ctrl');
    }
    if (shiftKey) {
        keys.push('shift');
    }
    if (keyCode in exports.keyNameMap) {
        keys.push(exports.keyNameMap[keyCode]);
    }
    return keys.join('-');
}
exports.getKeyStrokeString = getKeyStrokeString;
function keyEventGenerate(ev) {
    var keyStroke = getKeyStrokeString(ev);
    var commandInfo = exports.keyStrokeCommandMap[keyStroke];
    return commandInfo
        ? {
            type: commandInfo[0],
            command: commandInfo[1]
        }
        : {};
}
exports.keyEventGenerate = keyEventGenerate;
function findOffsetIndex(offsets, cellBorderWidth, position) {
    position += cellBorderWidth * 2;
    var idx = offsets.findIndex(function (offset) { return offset - cellBorderWidth > position; });
    return idx >= 0 ? idx - 1 : offsets.length - 1;
}
function getPageMovedPosition(rowIndex, offsets, bodyHeight, isPrevDir) {
    var distance = isPrevDir ? -bodyHeight : bodyHeight;
    return offsets[rowIndex] + distance;
}
exports.getPageMovedPosition = getPageMovedPosition;
function getPageMovedIndex(offsets, cellBorderWidth, movedPosition) {
    var movedIndex = findOffsetIndex(offsets, cellBorderWidth, movedPosition);
    return common_1.clamp(movedIndex, 0, offsets.length - 1);
}
exports.getPageMovedIndex = getPageMovedIndex;
function getPrevRowIndex(rowIndex, heights) {
    var index = rowIndex;
    while (index > 0) {
        index -= 1;
        if (heights[index]) {
            break;
        }
    }
    return index;
}
exports.getPrevRowIndex = getPrevRowIndex;
function getNextRowIndex(rowIndex, heights) {
    var index = rowIndex;
    while (index < heights.length - 1) {
        index += 1;
        if (heights[index]) {
            break;
        }
    }
    return index;
}
exports.getNextRowIndex = getNextRowIndex;
//# sourceMappingURL=keyboard.js.map