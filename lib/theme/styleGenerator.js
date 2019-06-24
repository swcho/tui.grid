"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("../helper/dom");
var cssRuleBuilder_1 = require("./cssRuleBuilder");
/**
 * Creates a rule string for background and text colors.
 * @param {String} className - class name
 * @param {Objecr} options - options
 * @returns {String}
 * @ignore
 */
function bgTextRuleString(className, options) {
    var background = options.background, text = options.text;
    return cssRuleBuilder_1.createClassRule(className)
        .bg(background)
        .text(text)
        .build();
}
/**
 * Creates a rule string for background and border colors.
 * @param {String} className - class name
 * @param {Objecr} options - options
 * @returns {String}
 * @ignore
 */
function bgBorderRuleString(className, options) {
    var background = options.background, border = options.border;
    return cssRuleBuilder_1.createClassRule(className)
        .bg(background)
        .border(border)
        .build();
}
/**
 * Generates a css string for grid outline.
 * @param {Object} options - options
 * @returns {String}
 */
function outline(options) {
    var border = options.border, showVerticalBorder = options.showVerticalBorder;
    var borderTopRule = cssRuleBuilder_1.createClassRule('border-line-top').bg(border);
    var borderBottomRule = cssRuleBuilder_1.createNestedClassRule(' .', ['no-scroll-x', 'border-line-bottom']).bg(border);
    var rules = [borderTopRule, borderBottomRule];
    var borderLeftRule, borderRightRule;
    if (showVerticalBorder) {
        borderLeftRule = cssRuleBuilder_1.createClassRule('border-line-left').bg(border);
        borderRightRule = cssRuleBuilder_1.createNestedClassRule(' .', ['no-scroll-y', 'border-line-right']).bg(border);
        rules = rules.concat([borderLeftRule, borderRightRule]);
    }
    return cssRuleBuilder_1.buildAll(rules);
}
exports.outline = outline;
/**
 * Generates a css string for border of frozen columns.
 * @param {Object} options - options
 * @returns {String}
 */
function frozenBorder(options) {
    return cssRuleBuilder_1.createClassRule('frozen-border')
        .bg(options.border)
        .build();
}
exports.frozenBorder = frozenBorder;
/**
 * Generates a css string for scrollbars.
 * @param {Object} options - options
 * @returns {String}
 */
function scrollbar(options) {
    var border = options.border, emptySpace = options.emptySpace;
    var webkitScrollbarRules = cssRuleBuilder_1.createWebkitScrollbarRules("." + dom_1.cls('container'), options);
    var ieScrollbarRule = cssRuleBuilder_1.createIEScrollbarRule("." + dom_1.cls('container'), options);
    var xInnerBorderRule = cssRuleBuilder_1.createClassRule('border-line-bottom').bg(border);
    var xOuterBorderRule = cssRuleBuilder_1.createClassRule('content-area').border(border);
    var yInnerBorderRule = cssRuleBuilder_1.createClassRule('scrollbar-y-inner-border').bg(border);
    var yOuterBorderRule = cssRuleBuilder_1.createClassRule('scrollbar-y-outer-border').bg(border);
    var spaceRightTopRule = cssRuleBuilder_1.createClassRule('scrollbar-right-top')
        .bg(emptySpace)
        .border(border);
    var spaceRightBottomRule = cssRuleBuilder_1.createClassRule('scrollbar-right-bottom')
        .bg(emptySpace)
        .border(border);
    var spaceLeftBottomRule = cssRuleBuilder_1.createClassRule('scrollbar-left-bottom')
        .bg(emptySpace)
        .border(border);
    var frozenBorderRule = cssRuleBuilder_1.createClassRule('scrollbar-frozen-border')
        .bg(emptySpace)
        .border(border);
    return cssRuleBuilder_1.buildAll(webkitScrollbarRules.concat([
        ieScrollbarRule,
        xInnerBorderRule,
        xOuterBorderRule,
        yInnerBorderRule,
        yOuterBorderRule,
        spaceRightTopRule,
        spaceRightBottomRule,
        spaceLeftBottomRule,
        frozenBorderRule
    ]));
}
exports.scrollbar = scrollbar;
/**
 * Generates a css string for a resize-handle.
 * @param {Object} options - options
 * @returns {String}
 */
function heightResizeHandle(options) {
    return bgBorderRuleString('height-resize-handle', options);
}
exports.heightResizeHandle = heightResizeHandle;
/**
 * Generates a css string for a pagination.
 * @param {Object} options - options
 * @returns {String}
 */
function pagination(options) {
    return bgBorderRuleString('pagination', options);
}
exports.pagination = pagination;
/**
 * Generates a css string for selection layers.
 * @param {Object} options - options
 * @returns {String}
 */
function selection(options) {
    return bgBorderRuleString('layer-selection', options);
}
exports.selection = selection;
/**
 * Generates a css string for header area.
 * @param {Object} options - options
 * @returns {String}
 */
function headerArea(options) {
    return cssRuleBuilder_1.createClassRule('header-area')
        .bg(options.background)
        .border(options.border)
        .build();
}
exports.headerArea = headerArea;
/**
 * Generates a css string for body area.
 * @param {Object} options - options
 * @returns {String}
 */
function bodyArea(options) {
    return cssRuleBuilder_1.createClassRule('body-area')
        .bg(options.background)
        .build();
}
exports.bodyArea = bodyArea;
/**
 * Generates a css string for summary area.
 * @param {Object} options - options
 * @returns {String}
 */
function summaryArea(options) {
    var border = options.border, background = options.background;
    var contentAreaRule = cssRuleBuilder_1.createClassRule('summary-area')
        .bg(background)
        .border(border);
    var bodyAreaRule = cssRuleBuilder_1.createNestedClassRule(' .', ['has-summary-top', 'body-area']).border(border);
    return cssRuleBuilder_1.buildAll([contentAreaRule, bodyAreaRule]);
}
exports.summaryArea = summaryArea;
/**
 * Generates a css string for table cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cell(options) {
    return cssRuleBuilder_1.createClassRule('cell')
        .bg(options.background)
        .border(options.border)
        .borderWidth(options)
        .text(options.text)
        .build();
}
exports.cell = cell;
/*
 * Generates a css string for header cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellHeader(options) {
    var background = options.background, border = options.border, text = options.text;
    var tableRule = cssRuleBuilder_1.createNestedClassRule(' .', [
        'show-lside-area',
        'lside-area',
        'header-area',
        'table'
    ]).verticalBorderStyle(options, 'right');
    var cellRule = cssRuleBuilder_1.createClassRule('cell-header')
        .bg(background)
        .border(border)
        .borderWidth(options)
        .text(text);
    return cssRuleBuilder_1.buildAll([tableRule, cellRule]);
}
exports.cellHeader = cellHeader;
/*
 * Generates a css string for row's header cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellRowHeader(options) {
    var background = options.background, border = options.border, text = options.text;
    var tableRule = cssRuleBuilder_1.createNestedClassRule(' .', [
        'show-lside-area',
        'lside-area',
        'body-area',
        'table'
    ]).verticalBorderStyle(options, 'right');
    var cellRule = cssRuleBuilder_1.createClassRule('cell-row-header')
        .bg(background)
        .border(border)
        .borderWidth(options)
        .text(text);
    return cssRuleBuilder_1.buildAll([tableRule, cellRule]);
}
exports.cellRowHeader = cellRowHeader;
/*
 * Generates a css string for summary cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellSummary(options) {
    var background = options.background, border = options.border, text = options.text;
    var tableRule = cssRuleBuilder_1.createNestedClassRule(' .', [
        'show-lside-area',
        'lside-area',
        'summary-area',
        'table'
    ]).verticalBorderStyle(options, 'right');
    var cellRule = cssRuleBuilder_1.createClassRule('cell-summary')
        .bg(background)
        .border(border)
        .borderWidth(options)
        .text(text);
    return cssRuleBuilder_1.buildAll([tableRule, cellRule]);
}
exports.cellSummary = cellSummary;
/**
 * Generates a css string for the cells in even rows.
 * @param {Object} options - options
 * @returns {String}
 */
function cellEvenRow(options) {
    return cssRuleBuilder_1.create('.tui-grid-row-even>td')
        .bg(options.background)
        .build();
}
exports.cellEvenRow = cellEvenRow;
/**
 * Generates a css string for the cells in odd rows.
 * @param {Object} options - options
 * @returns {String}
 */
function cellOddRow(options) {
    return cssRuleBuilder_1.create('.tui-grid-row-odd>td')
        .bg(options.background)
        .build();
}
exports.cellOddRow = cellOddRow;
/**
 * Generates a css string for selected header cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellSelectedHeader(options) {
    return cssRuleBuilder_1.createNestedClassRule('.', ['cell-header', 'cell-selected'])
        .bg(options.background)
        .text(options.text)
        .build();
}
exports.cellSelectedHeader = cellSelectedHeader;
/**
 * Generates a css string for selected row header cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellSelectedRowHeader(options) {
    return cssRuleBuilder_1.createNestedClassRule('.', ['cell-row-header', 'cell-selected'])
        .bg(options.background)
        .text(options.text)
        .build();
}
exports.cellSelectedRowHeader = cellSelectedRowHeader;
/**
 * Generates a css string for focused cell.
 * @param {Object} options - options
 * @returns {String}
 */
function cellFocused(options) {
    var border = options.border;
    var focusLayerRule = cssRuleBuilder_1.createClassRule('layer-focus-border').bg(border);
    var editingLayerRule = cssRuleBuilder_1.createClassRule('layer-editing').border(border);
    return cssRuleBuilder_1.buildAll([focusLayerRule, editingLayerRule]);
}
exports.cellFocused = cellFocused;
/**
 * Generates a css string for focus inactive cell.
 * @param {Object} options - options
 * @returns {String}
 */
function cellFocusedInactive(options) {
    return cssRuleBuilder_1.createNestedClassRule(' .', ['layer-focus-deactive', 'layer-focus-border'])
        .bg(options.border)
        .build();
}
exports.cellFocusedInactive = cellFocusedInactive;
/**
 * Generates a css string for editable cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellEditable(options) {
    return bgTextRuleString('cell-editable', options);
}
exports.cellEditable = cellEditable;
/**
 * Generates a css string for required cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellRequired(options) {
    return bgTextRuleString('cell-required', options);
}
exports.cellRequired = cellRequired;
/**
 * Generates a css string for disabled cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellDisabled(options) {
    return bgTextRuleString('cell-disabled', options);
}
exports.cellDisabled = cellDisabled;
/**
 * Generates a css string for dummy cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellDummy(options) {
    return bgTextRuleString('cell-dummy', options);
}
exports.cellDummy = cellDummy;
/**
 * Generates a css string for invalid cells.
 * @param {Object} options - options
 * @returns {String}
 */
function cellInvalid(options) {
    return bgTextRuleString('cell-invalid', options);
}
exports.cellInvalid = cellInvalid;
/**
 * Generates a css string for cells in a current row.
 * @param {Object} options - options
 * @returns {String}
 */
function cellCurrentRow(options) {
    return bgTextRuleString('cell-current-row', options);
}
exports.cellCurrentRow = cellCurrentRow;
//# sourceMappingURL=styleGenerator.js.map