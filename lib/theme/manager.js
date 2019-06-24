"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preset_1 = require("./preset");
var common_1 = require("../helper/common");
var dom_1 = require("../helper/dom");
var styleGen = tslib_1.__importStar(require("./styleGenerator"));
var STYLE_ELEMENT_ID = 'tui-grid-theme-style';
var presetOptions = {
    default: preset_1.presetDefault,
    striped: preset_1.striped,
    clean: preset_1.clean
};
var styleGenMethodMap = {
    outline: styleGen.outline,
    frozenBorder: styleGen.frozenBorder,
    scrollbar: styleGen.scrollbar,
    heightResizeHandle: styleGen.heightResizeHandle,
    pagination: styleGen.pagination,
    selection: styleGen.selection
};
var styleGenAreaMethodMap = {
    header: styleGen.headerArea,
    body: styleGen.bodyArea,
    summary: styleGen.summaryArea
};
var styleGenCellMethodMap = {
    normal: styleGen.cell,
    dummy: styleGen.cellDummy,
    editable: styleGen.cellEditable,
    header: styleGen.cellHeader,
    rowHeader: styleGen.cellRowHeader,
    summary: styleGen.cellSummary,
    oddRow: styleGen.cellOddRow,
    evenRow: styleGen.cellEvenRow,
    required: styleGen.cellRequired,
    disabled: styleGen.cellDisabled,
    invalid: styleGen.cellInvalid,
    currentRow: styleGen.cellCurrentRow,
    selectedHeader: styleGen.cellSelectedHeader,
    selectedRowHeader: styleGen.cellSelectedRowHeader,
    focused: styleGen.cellFocused,
    focusedInactive: styleGen.cellFocusedInactive
};
/**
 * build css string with given options.
 * @param {Object} options - options
 * @returns {String}
 * @ignore
 */
function buildCssString(options) {
    var area = options.area, cell = options.cell;
    var styles = [];
    Object.keys(styleGenMethodMap).forEach(function (key) {
        var keyWithType = key;
        var value = options[keyWithType];
        if (value) {
            var fn = styleGen[keyWithType];
            styles.push(fn(value));
        }
    });
    if (area) {
        Object.keys(styleGenAreaMethodMap).forEach(function (key) {
            var keyWithType = key;
            var value = area[keyWithType];
            if (value) {
                var fn = styleGenAreaMethodMap[keyWithType];
                styles.push(fn(value));
            }
        });
    }
    if (cell) {
        Object.keys(styleGenCellMethodMap).forEach(function (key) {
            var keyWithType = key;
            var value = cell[keyWithType];
            if (value) {
                var fn = styleGenCellMethodMap[keyWithType];
                styles.push(fn(value));
            }
        });
    }
    return styles.join('');
}
/**
 * Set document style with given options.
 * @param {Object} options - options
 * @ignore
 */
function setDocumentStyle(options) {
    var cssString = buildCssString(options);
    var elem = document.getElementById(STYLE_ELEMENT_ID);
    if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
    dom_1.appendStyleElement(STYLE_ELEMENT_ID, cssString);
}
exports.default = {
    /**
     * Creates a style element using theme options identified by given name,
     * and appends it to the document.
     * @param themeName - preset theme name
     * @param extOptions - if exist, extend preset theme options with it.
     */
    apply: function (themeName, extOptions) {
        var options = presetOptions[themeName];
        if (!options) {
            options = presetOptions['default'];
        }
        if (extOptions) {
            options = common_1.deepMergedCopy(options, extOptions);
        }
        setDocumentStyle(options);
    },
    /**
     * Returns whether the style of a theme is applied.
     */
    isApplied: function () {
        return !!document.getElementById(STYLE_ELEMENT_ID);
    }
};
//# sourceMappingURL=manager.js.map