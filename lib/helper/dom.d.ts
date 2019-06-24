export declare type ClassNameType = 'body-area' | 'body-container' | 'border-line' | 'border-line-top' | 'border-line-left' | 'border-line-right' | 'border-line-bottom' | 'btn-text' | 'btn-sorting' | 'btn-sorting-up' | 'btn-sorting-down' | 'btn-excel-download' | 'btn-excel-icon' | 'btn-excel-page' | 'btn-excel-all' | 'btn-tree' | 'cell' | 'cell-content' | 'cell-header' | 'cell-row-header' | 'cell-summary' | 'cell-row-odd' | 'cell-row-even' | 'cell-editable' | 'cell-dummy' | 'cell-required' | 'cell-disabled' | 'cell-selected' | 'cell-invalid' | 'cell-ellipsis' | 'cell-current-row' | 'cell-content-editor' | 'cell-main-button' | 'cell-has-input' | 'cell-has-tree' | 'clipboard' | 'column-resize-container' | 'column-resize-handle' | 'column-resize-handle-last' | 'container' | 'content-before' | 'content-after' | 'content-input' | 'content-text' | 'content-area' | 'frozen-border' | 'frozen-border-top' | 'frozen-border-bottom' | 'header-area' | 'height-resize-handle' | 'layer-focus' | 'layer-focus-border' | 'layer-state' | 'layer-state-content' | 'layer-state-loading' | 'layer-focus-deactive' | 'layer-editing' | 'layer-datepicker' | 'lside-area' | 'layer-selection' | 'rside-area' | 'row-odd' | 'row-even' | 'row-hidden' | 'no-scroll-x' | 'no-scroll-y' | 'pagination' | 'height-resize-handle' | 'height-resize-bar' | 'has-summary-top' | 'has-summary-bottom' | 'show-lside-area' | 'scrollbar-frozen-border' | 'scrollbar-left-bottom' | 'scrollbar-y-inner-border' | 'scrollbar-y-outer-border' | 'scrollbar-right-top' | 'scrollbar-right-bottom' | 'scrollbar-left-bottom' | 'scrollbar-left-top' | 'summary-area' | 'table-container' | 'table' | 'tree-wrapper-relative' | 'tree-wrapper-valign-center' | 'tree-extra-content' | 'tree-depth' | 'tree-button-expand' | 'tree-button-collapse' | 'tree-icon';
export declare const dataAttr: {
    ROW_KEY: string;
    COLUMN_NAME: string;
    COLUMN_INDEX: string;
    GRID_ID: string;
};
export declare function cls(...names: (ClassNameType | [boolean, ClassNameType])[]): string;
export declare function hasClass(el: HTMLElement, className: ClassNameType): boolean;
export declare function findParentByTagName(el: HTMLElement, tagName: string): HTMLElement | null;
export declare function findParent(el: HTMLElement, className: ClassNameType): HTMLElement | null;
export declare function getCellAddress(el: HTMLElement): {
    rowKey: number;
    columnName: string;
} | null;
/**
 * create style element and append it into the head element.
 * @param {String} id - element id
 * @param {String} cssString - css string
 */
export declare function appendStyleElement(id: string, cssString: string): void;
export declare function setCursorStyle(type: string): void;
export declare function getCoordinateWithOffset(pageX: number, pageY: number): number[];
