import { OptTableOutlineStyle, OptFrozenBorderStyle, OptCellFocusedStyle, OptScrollbarStyle, OptHeightResizeHandleStyle, OptPaginationStyle, OptSelectionLayerStyle, OptTableHeaderStyle, OptTableBodyStyle, OptTableSummaryStyle, OptCellStyle, OptBasicCellStyle, OptCellDummyStyle } from './../types.d';
/**
 * Generates a css string for grid outline.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function outline(options: OptTableOutlineStyle): string;
/**
 * Generates a css string for border of frozen columns.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function frozenBorder(options: OptFrozenBorderStyle): string;
/**
 * Generates a css string for scrollbars.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function scrollbar(options: OptScrollbarStyle): string;
/**
 * Generates a css string for a resize-handle.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function heightResizeHandle(options: OptHeightResizeHandleStyle): string;
/**
 * Generates a css string for a pagination.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function pagination(options: OptPaginationStyle): string;
/**
 * Generates a css string for selection layers.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function selection(options: OptSelectionLayerStyle): string;
/**
 * Generates a css string for header area.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function headerArea(options: OptTableHeaderStyle): string;
/**
 * Generates a css string for body area.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function bodyArea(options: OptTableBodyStyle): string;
/**
 * Generates a css string for summary area.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function summaryArea(options: OptTableSummaryStyle): string;
/**
 * Generates a css string for table cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cell(options: OptCellStyle): string;
export declare function cellHeader(options: OptCellStyle): string;
export declare function cellRowHeader(options: OptCellStyle): string;
export declare function cellSummary(options: OptCellStyle): string;
/**
 * Generates a css string for the cells in even rows.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellEvenRow(options: OptBasicCellStyle): string;
/**
 * Generates a css string for the cells in odd rows.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellOddRow(options: OptBasicCellStyle): string;
/**
 * Generates a css string for selected header cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellSelectedHeader(options: OptBasicCellStyle): string;
/**
 * Generates a css string for selected row header cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellSelectedRowHeader(options: OptBasicCellStyle): string;
/**
 * Generates a css string for focused cell.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellFocused(options: OptCellFocusedStyle): string;
/**
 * Generates a css string for focus inactive cell.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellFocusedInactive(options: OptCellFocusedStyle): string;
/**
 * Generates a css string for editable cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellEditable(options: OptBasicCellStyle): string;
/**
 * Generates a css string for required cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellRequired(options: OptBasicCellStyle): string;
/**
 * Generates a css string for disabled cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellDisabled(options: OptBasicCellStyle): string;
/**
 * Generates a css string for dummy cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellDummy(options: OptCellDummyStyle): string;
/**
 * Generates a css string for invalid cells.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellInvalid(options: OptBasicCellStyle): string;
/**
 * Generates a css string for cells in a current row.
 * @param {Object} options - options
 * @returns {String}
 */
export declare function cellCurrentRow(options: OptBasicCellStyle): string;
