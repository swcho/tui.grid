import { OptScrollbarStyle, OptCellStyle } from './../types.d';
import { ClassNameType } from '../helper/dom';
/**
 * create css rule string and returns it
 * @module {theme/cssBuilder}
 * @param selector - css selector
 * @param property - css property
 * @param  value - css value
 * @ignore
 */
declare class CSSRuleBuilder {
    constructor(selector: string);
    private selector;
    private propValues;
    init(selector: string): void;
    /**
     * Add a set of css property and value.
     * @param property - css property
     * @param  value - css value
     */
    add(property: string, value?: string): this;
    /**
     * Shortcut for add('border-color', value)
     */
    border(value?: string): this;
    /**
     * Add a border-width style to the rule.
     * @param options - visible options
     * @param [options.showVerticalBorder] - whether the vertical border is visible
     * @param [options.showHorizontalBorder] - whether the horizontal border is visible
     */
    borderWidth(options: OptCellStyle): this;
    /**
     * Add a vertical border style to the rule.
     * @param options - visible options
     * @param [options.showVerticalBorder] - whether the vertical border is visible
     * @param position - Position of the vertical border ('right' or 'left')
     */
    verticalBorderStyle(options: OptCellStyle, position?: string): this;
    /**
     * Shortcut for add('background-color', value)
     */
    bg(value?: string): this;
    /**
     * Shortcut for add('color', value)
     */
    text(value?: string): this;
    /**
     * Create a CSS rule string with a selector and prop-values.
     */
    build(): string;
}
/**
 * Creates new Builder instance.
 */
export declare function create(selector: string): CSSRuleBuilder;
/**
 * Creates a new Builder instance with a class name selector.
 */
export declare function createClassRule(className: ClassNameType): CSSRuleBuilder;
/**
 * Creates a new Builder instance with a nested class name.
 * @param selector - selector to compose class names
 * @param classNames - classNames
 */
export declare function createNestedClassRule(selector: string, classNames: ClassNameType[]): CSSRuleBuilder;
/**
 * Creates an array of new Builder instances for the -webkit-scrollbar styles.
 */
export declare function createWebkitScrollbarRules(selector: string, options: OptScrollbarStyle): CSSRuleBuilder[];
/**
 * Creates a builder instance for the IE scrollbar styles.
 */
export declare function createIEScrollbarRule(selector: string, options: OptScrollbarStyle): CSSRuleBuilder;
/**
 * Build all rules and returns the concatenated string.
 */
export declare function buildAll(rules: CSSRuleBuilder[]): string;
export {};
