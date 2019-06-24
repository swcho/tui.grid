import { OptPreset } from './../types.d';
export declare type ThemeOptionPresetNames = 'default' | 'striped' | 'clean';
declare const _default: {
    /**
     * Creates a style element using theme options identified by given name,
     * and appends it to the document.
     * @param themeName - preset theme name
     * @param extOptions - if exist, extend preset theme options with it.
     */
    apply(themeName: ThemeOptionPresetNames, extOptions?: OptPreset | undefined): void;
    /**
     * Returns whether the style of a theme is applied.
     */
    isApplied(): boolean;
};
export default _default;
