"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("../helper/dom");
var common_1 = require("../helper/common");
/**
 * create css rule string and returns it
 * @module {theme/cssBuilder}
 * @param selector - css selector
 * @param property - css property
 * @param  value - css value
 * @ignore
 */
var CSSRuleBuilder = /** @class */ (function () {
    function CSSRuleBuilder(selector) {
        this.selector = '';
        this.propValues = [];
        this.init(selector);
    }
    CSSRuleBuilder.prototype.init = function (selector) {
        if (!(typeof selector === 'string') || !selector) {
            throw new Error('The Selector must be a string and not be empty.');
        }
        this.selector = selector;
        this.propValues = [];
    };
    /**
     * Add a set of css property and value.
     * @param property - css property
     * @param  value - css value
     */
    CSSRuleBuilder.prototype.add = function (property, value) {
        if (value) {
            this.propValues.push(property + ":" + value);
        }
        return this;
    };
    /**
     * Shortcut for add('border-color', value)
     */
    CSSRuleBuilder.prototype.border = function (value) {
        return this.add('border-color', value);
    };
    /**
     * Add a border-width style to the rule.
     * @param options - visible options
     * @param [options.showVerticalBorder] - whether the vertical border is visible
     * @param [options.showHorizontalBorder] - whether the horizontal border is visible
     */
    CSSRuleBuilder.prototype.borderWidth = function (options) {
        var vertical = options.showVerticalBorder;
        var horizontal = options.showHorizontalBorder;
        var value;
        if (common_1.isBoolean(vertical)) {
            value = vertical ? '1px' : '0';
            this.add('border-left-width', value).add('border-right-width', value);
        }
        if (common_1.isBoolean(horizontal)) {
            value = horizontal ? '1px' : '0';
            this.add('border-top-width', value).add('border-bottom-width', value);
        }
        return this;
    };
    /**
     * Add a vertical border style to the rule.
     * @param options - visible options
     * @param [options.showVerticalBorder] - whether the vertical border is visible
     * @param position - Position of the vertical border ('right' or 'left')
     */
    CSSRuleBuilder.prototype.verticalBorderStyle = function (options, position) {
        var vertical = options.showVerticalBorder;
        var value;
        if (common_1.isBoolean(vertical) && position) {
            value = vertical ? 'solid' : 'hidden';
            this.add("border-" + position + "-style", value);
        }
        return this;
    };
    /**
     * Shortcut for add('background-color', value)
     */
    CSSRuleBuilder.prototype.bg = function (value) {
        return this.add('background-color', value);
    };
    /**
     * Shortcut for add('color', value)
     */
    CSSRuleBuilder.prototype.text = function (value) {
        return this.add('color', value);
    };
    /**
     * Create a CSS rule string with a selector and prop-values.
     */
    CSSRuleBuilder.prototype.build = function () {
        var result = '';
        if (this.propValues.length) {
            result = this.selector + "{" + this.propValues.join(';') + "}";
        }
        return result;
    };
    return CSSRuleBuilder;
}());
/**
 * Creates new Builder instance.
 */
function create(selector) {
    return new CSSRuleBuilder(selector);
}
exports.create = create;
/**
 * Creates a new Builder instance with a class name selector.
 */
function createClassRule(className) {
    return create("." + dom_1.cls(className));
}
exports.createClassRule = createClassRule;
/**
 * Creates a new Builder instance with a nested class name.
 * @param selector - selector to compose class names
 * @param classNames - classNames
 */
function createNestedClassRule(selector, classNames) {
    return create("." + classNames.map(function (className) { return dom_1.cls(className); }).join(selector));
}
exports.createNestedClassRule = createNestedClassRule;
/**
 * Creates an array of new Builder instances for the -webkit-scrollbar styles.
 */
function createWebkitScrollbarRules(selector, options) {
    return [
        create(selector + " ::-webkit-scrollbar").bg(options.background),
        create(selector + " ::-webkit-scrollbar-thumb").bg(options.thumb),
        create(selector + " ::-webkit-scrollbar-thumb:hover").bg(options.active)
    ];
}
exports.createWebkitScrollbarRules = createWebkitScrollbarRules;
/**
 * Creates a builder instance for the IE scrollbar styles.
 */
function createIEScrollbarRule(selector, options) {
    var bgProps = [
        'scrollbar-3dlight-color',
        'scrollbar-darkshadow-color',
        'scrollbar-track-color',
        'scrollbar-shadow-color'
    ];
    var thumbProps = ['scrollbar-face-color', 'scrollbar-highlight-color'];
    var ieScrollbarRule = create(selector);
    bgProps.forEach(function (prop) {
        ieScrollbarRule.add(prop, options.background);
    });
    thumbProps.forEach(function (prop) {
        ieScrollbarRule.add(prop, options.thumb);
    });
    ieScrollbarRule.add('scrollbar-arrow-color', options.active);
    return ieScrollbarRule;
}
exports.createIEScrollbarRule = createIEScrollbarRule;
/**
 * Build all rules and returns the concatenated string.
 */
function buildAll(rules) {
    return rules
        .map(function (rule) {
        return rule.build();
    })
        .join('');
}
exports.buildAll = buildAll;
//# sourceMappingURL=cssRuleBuilder.js.map