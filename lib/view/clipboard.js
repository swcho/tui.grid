"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var dom_1 = require("../helper/dom");
var keyboard_1 = require("../helper/keyboard");
var browser_1 = require("../helper/browser");
var clipboard_1 = require("../helper/clipboard");
var clipboard_2 = require("../query/clipboard");
var KEYDOWN_LOCK_TIME = 10;
var ClipboardComp = /** @class */ (function (_super) {
    tslib_1.__extends(ClipboardComp, _super);
    function ClipboardComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isLocked = false;
        _this.lock = function () {
            _this.isLocked = true;
            setTimeout(_this.unlock.bind(_this), KEYDOWN_LOCK_TIME);
        };
        /**
         * Unlock
         * @private
         */
        _this.unlock = function () {
            _this.isLocked = false;
        };
        _this.onBlur = function () {
            _this.props.dispatch('setNavigating', false);
        };
        _this.dispatchKeyboardEvent = function (type, command) {
            var dispatch = _this.props.dispatch;
            switch (type) {
                case 'move':
                    dispatch('selectionEnd');
                    dispatch('moveFocus', command);
                    dispatch('setScrollToFocus');
                    break;
                case 'edit':
                    dispatch('editFocus', command);
                    break;
                case 'select':
                    dispatch('changeSelection', command);
                    dispatch('setScrollToSelection');
                    break;
                case 'remove':
                    dispatch('removeContent');
                    break;
                /*
                 * Call directly because of timing issues
                 * - Step 1: When the keys(ctrl+c) are downed on grid, 'clipboard' is triggered.
                 * - Step 2: When 'clipboard' event is fired,
                 *           IE browsers set copied data to window.clipboardData in event handler and
                 *           other browsers append copied data and focus to contenteditable element.
                 * - Step 3: Finally, when 'copy' event is fired on browsers except IE,
                 *           setting copied data to ClipboardEvent.clipboardData.
                 */
                case 'clipboard': {
                    if (!_this.el) {
                        return;
                    }
                    var store = _this.context.store;
                    if (clipboard_1.isSupportWindowClipboardData()) {
                        window.clipboardData.setData('Text', clipboard_2.getText(store));
                    }
                    else {
                        _this.el.innerHTML = clipboard_2.getText(store);
                    }
                    break;
                }
                default:
                    break;
            }
        };
        /**
         * Event handler for the keydown event
         * @param {Event} ev - Event
         * @private
         */
        _this.onKeyDown = function (ev) {
            if (_this.isLocked) {
                ev.preventDefault();
                return;
            }
            var _a = keyboard_1.keyEventGenerate(ev), type = _a.type, command = _a.command;
            if (!type) {
                return;
            }
            _this.lock();
            if (type !== 'clipboard') {
                ev.preventDefault();
            }
            if (!(type === 'clipboard' && command === 'paste')) {
                _this.dispatchKeyboardEvent(type, command);
            }
        };
        _this.onCopy = function (ev) {
            if (!_this.el) {
                return;
            }
            var text = _this.el.innerHTML;
            if (clipboard_1.isSupportWindowClipboardData()) {
                window.clipboardData.setData('Text', text);
            }
            else if (ev.clipboardData) {
                ev.clipboardData.setData('text/plain', text);
            }
            ev.preventDefault();
        };
        _this.onPaste = function (ev) {
            var clipboardData = ev.clipboardData || window.clipboardData;
            if (!clipboardData) {
                return;
            }
            if (!browser_1.isEdge() && !clipboard_1.isSupportWindowClipboardData()) {
                ev.preventDefault();
                _this.pasteInOtherBrowsers(clipboardData);
            }
            else {
                _this.pasteInMSBrowser(clipboardData);
            }
        };
        return _this;
    }
    ClipboardComp.prototype.isClipboardFocused = function () {
        return document.hasFocus() && document.activeElement === this.el;
    };
    /**
     * Paste copied data in other browsers (chrome, safari, firefox)
     * [if] condition is copying from ms-excel,
     * [else] condition is copying from the grid or the copied data is plain text.
     */
    ClipboardComp.prototype.pasteInOtherBrowsers = function (clipboardData) {
        if (!this.el) {
            return;
        }
        var el = this.el;
        var html = clipboardData.getData('text/html');
        var data;
        if (html && html.indexOf('table') !== -1) {
            // step 1: Append copied data on contenteditable element to parsing correctly table data.
            el.innerHTML = html;
            // step 2: Make grid data from cell data of appended table element.
            var rows = el.querySelector('tbody').rows;
            data = clipboard_1.convertTableToData(rows);
            // step 3: Empty contenteditable element to reset.
            el.innerHTML = '';
        }
        else {
            data = clipboard_1.convertTextToData(clipboardData.getData('text/plain'));
        }
        this.props.dispatch('paste', data);
    };
    /**
     * Paste copied data in MS-browsers (IE, edge)
     */
    ClipboardComp.prototype.pasteInMSBrowser = function (clipboardData) {
        var _this = this;
        var data = clipboard_1.convertTextToData(clipboardData.getData('Text'));
        setTimeout(function () {
            if (!_this.el) {
                return;
            }
            var el = _this.el;
            if (el.querySelector('table')) {
                var rows = el.querySelector('tbody').rows;
                data = clipboard_1.convertTableToData(rows);
            }
            _this.props.dispatch('paste', data);
            el.innerHTML = '';
        }, 0);
    };
    ClipboardComp.prototype.componentDidUpdate = function () {
        var _this = this;
        setTimeout(function () {
            var _a = _this.props, navigating = _a.navigating, editing = _a.editing;
            if (_this.el && navigating && !editing && !_this.isClipboardFocused()) {
                _this.el.focus();
            }
        });
    };
    ClipboardComp.prototype.render = function () {
        var _this = this;
        return (preact_1.h("div", { class: dom_1.cls('clipboard'), onBlur: this.onBlur, onKeyDown: this.onKeyDown, onCopy: this.onCopy, onPaste: this.onPaste, contentEditable: true, ref: function (el) {
                _this.el = el;
            } }));
    };
    return ClipboardComp;
}(preact_1.Component));
exports.Clipboard = hoc_1.connect(function (_a) {
    var focus = _a.focus;
    return ({
        navigating: focus.navigating,
        editing: !!focus.editingAddress
    });
})(ClipboardComp);
//# sourceMappingURL=clipboard.js.map