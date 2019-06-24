/// <reference types="tui-pagination" />
import { OptGrid, OptPreset, OptI18nData, OptSummaryColumnContentMap, OptRow, OptAppendRow, OptPrependRow, OptRemoveRow, OptColumn, OptHeader } from './types';
import { CellValue, RowKey, Range, Row, InvalidRow, ColumnInfo, Dictionary } from './store/types';
import { ThemeOptionPresetNames } from './theme/manager';
import { RequestOptions, RequestType, ModifiedRowsOptions, Params } from './dataSource/types';
/**
 * Grid public API
 * @param {Object} options
 *      @param {HTMLElement} el - The target element to create grid.
 *      @param {Array|Object} [options.data] - Grid data for making rows. When using the data source, sets to object.
 *      @param {Object} [options.pageOptions={}] The object for the pagination options with the data source.
 *      @param {Object} [options.header] - Options object for header.
 *      @param {number} [options.header.height=40] - The height of the header area.
 *      @param {Array} [options.header.complexColumns] - This options creates new parent headers of the multiple columns
 *          which includes the headers of spcified columns, and sets up the hierarchy.
 *      @param {string|number} [options.width='auto'] - Options for grid width.
 *      @param {string|number} [options.rowHeight] - The height of each rows. The default value is 'auto',
 *          the height of each rows expands to dom's height. If set to number, the height is fixed.
 *      @param {number} [options.minRowHeight=40] - The minimum height of each rows. When this value is larger than
 *          the row's height, it set to the row's height.
 *      @param {string|number} [options.bodyHeight] - The height of body area. The default value is 'auto',
 *          the height of body area expands to total height of rows. If set to 'fitToParent', the height of the grid
 *          will expand to fit the height of parent element. If set to number, the height is fixed.
 *      @param {number} [options.minBodyHeight=minRowHeight] - The minimum height of body area. When this value
 *          is larger than the body's height, it set to the body's height.
 *      @param {Object} [options.columnOptions] - Option object for all columns
 *      @param {number} [options.columnOptions.minWidth=50] - Minimum width of each columns
 *      @param {boolean} [options.columnOptions.resizable=true] - If set to true, resize-handles of each columns
 *          will be shown.
 *      @param {number} [options.columnOptions.frozenCount=0] - The number of frozen columns.
 *          The columns indexed from 0 to this value will always be shown on the left side.
 *          {@link Grid#setFrozenColumnCount} can be used for setting this value dynamically.
 *      @param {number} [options.columnOptions.frozenBorderWidth=1] - The value of frozen border width.
 *          When the frozen columns are created by "frozenCount" option, the frozen border width set.
 *      @param {Object} [options.treeColumnOptions] - Option object for the tree column.
 *      @param {string} [options.treeColumnOptions.name] - The name of column that makes tree column.
 *      @param {boolean} [options.treeColumnOptions.useIcon=true] - If set to true, the folder or file icon is created on
 *          the left side of the tree cell data.
 *      @param {boolean} [options.treeColumnOptions.useCascadingCheckbox] - If set to true, a cascading relationship is
 *          created in the checkbox between parent and child rows.
 *      @param {Object} [options.copyOptions] - Option object for clipboard copying
 *      @param {boolean} [options.copyOptions.useFormattedValue] - Whether to use formatted values or original values
 *          as a string to be copied to the clipboard
 *      @param {boolean} [options.copyOptions.useListItemText] - Copy select or checkbox cell values to 'text'
 *          rather than 'value' of the listItem option.
 *      @param {string|function} [options.copyOptions.customValue] - Copy text with 'formatter' in cell.
 *      @param {boolean} [options.useClientSort=true] - If set to true, sorting will be executed by client itself
 *          without server.
 *      @param {string} [options.editingEvent='dblclick'] - If set to 'click', editable cell in the view-mode will be
 *          changed to edit-mode by a single click.
 *      @param {boolean} [options.scrollX=true] - Specifies whether to show horizontal scrollbar.
 *      @param {boolean} [options.scrollY=true] - Specifies whether to show vertical scrollbar.
 *      @param {boolean} [options.showDummyRows=false] - If set to true, empty area will be filled with dummy rows.
 *      @param {string} [options.keyColumnName] - The name of the column to be used to identify each rows.
 *          If not specified, unique value for each rows will be created internally.
 *      @param {boolean} [options.heightResizable=false] - If set to true, a handle for resizing height will be shown.
 *      @param {Object} [options.pagination=null] - Options for tui.Pagination.
 *          If set to null or false, pagination will not be used.
 *      @param {string} [options.selectionUnit='cell'] - The unit of selection on Grid. ('cell', 'row')
 *      @param {Array} [options.rowHeaders] - Options for making the row header. The row header content is number of
 *          each row or input element. The value of each item is enable to set string type. (ex: ['rowNum', 'checkbox'])
 *          @param {string} [options.rowHeaders.type] - The type of the row header. ('rowNum', 'checkbox')
 *          @param {string} [options.rowHeaders.header] - The header of the row header.
 *          @param {number} [options.rowHeaders.width] - The width of the row header column. The unit is pixel.
 *              If this value isn't set, the column's width sets to default value.
 *          @param {string} [options.rowHeaders.align=left] - Horizontal alignment of the row header content.
 *              Available values are 'left', 'center', 'right'.
 *          @param {string} [options.rowHeaders.valign=middle] - Vertical alignment of the row header content.
 *              Available values are 'top', 'middle', 'bottom'.
 *          @param {function} [options.rowHeaders.renderer] - Sets the custom renderer to customize the header content.
 *      @param {Array} options.columns - The configuration of the grid columns.
 *          @param {string} options.columns.name - The name of the column.
 *          @param {boolean} [options.columns.ellipsis=false] - If set to true, ellipsis will be used
 *              for overflowing content.
 *          @param {string} [options.columns.align=left] - Horizontal alignment of the column content.
 *              Available values are 'left', 'center', 'right'.
 *          @param {string} [options.columns.valign=middle] - Vertical alignment of the column content.
 *              Available values are 'top', 'middle', 'bottom'.
 *          @param {string} [options.columns.className] - The name of the class to be used for all cells of
 *              the column.
 *          @param {string} [options.columns.header] - The header of the column to be shown on the header.
 *          @param {number} [options.columns.width] - The width of the column. The unit is pixel. If this value
 *              isn't set, the column's width is automatically resized.
 *          @param {number} [options.columns.minWidth=50] - The minimum width of the column. The unit is pixel.
 *          @param {boolean} [options.columns.hidden] - If set to true, the column will not be shown.
 *          @param {boolean} [options.columns.resizable] - If set to false, the width of the column
 *              will not be changed.
 *          @param {Object} [options.columns.validation] - The options to be used for validation.
 *              Validation is executed whenever data is changed or the {@link Grid#validate} is called.
 *          @param {boolean} [options.columns.validation.required=false] - If set to true, the data of the column
 *              will be checked to be not empty.
 *          @param {number|string} [options.columns.validation.dataType='string'] - Specifies the type of the cell value.
 *              Avilable types are 'string' and 'number'.
 *          @param {string} [options.columns.defaultValue] - The default value to be shown when the column
 *              doesn't have a value.
 *          @param {function|string} [options.columns.formatter] - The function that formats the value of the cell.
 *              The retrurn value of the function will be shown as the value of the cell. If set to 'listItemText',
 *              the value will be shown the text.
 *          @param {boolean} [options.columns.useHtmlEntity=true] - If set to true, the value of the cell
 *              will be encoded as HTML entities.
 *          @param {boolean} [options.columns.ignored=false] - If set to true, the value of the column will be
 *               ignored when setting up the list of modified rows.
 *          @param {boolean} [options.columns.sortable=false] - If set to true, sort button will be shown on
 *              the right side of the column header, which executes the sort action when clicked.
 *          @param {function} [options.columns.onBeforeChange] - The function that will be
 *              called before changing the value of the cell. If stop() method in event object is called,
 *              the changing will be canceled.
 *          @param {function} [options.columns.onAfterChange] - The function that will be
 *              called after changing the value of the cell.
 *          @param {Object} [options.columns.editor] - The object for configuring editing UI.
 *              @param {string|function} [options.columns.editor.type='text'] - The string value that specifies
 *                  the type of the editing UI. Available values are 'text', 'password', 'select', 'radio', 'checkbox'.
 *                  When using the custom editor, sets to the customized renderer constructor.
 *              @param {Object} [options.columns.editor.options] - Option object using editor
 *                  @param {Array} [options.columns.editor.options.listItems] - Specifies the option items for the
 *                       'select', 'radio', 'checkbox' type. The item of the array must contain properties named
 *                       'text' and 'value'. (e.g. [{text: 'option1', value: 1}, {...}])
 *              @param {Object} [options.columns.copyOptions] - Option object for clipboard copying.
 *                  This option is column specific, and overrides the global copyOptions.
 *              @param {boolean} [options.columns.copyOptions.useFormattedValue] - Whether to use
 *                  formatted values or original values as a string to be copied to the clipboard
 *              @param {boolean} [options.columns.copyOptions.useListItemText] - Whether to use
 *                  concatenated text or original values as a string to be copied to the clipboard
 *              @param {function} [options.columns.copyOptions.customValue] - Whether to use
 *                  customized value from "customValue" callback or original values as a string to be copied to the clipboard
 *          @param {Array} [options.columns.relations] - Specifies relation between this and other column.
 *              @param {Array} [options.columns.relations.targetNames] - Array of the names of target columns.
 *              @param {function} [options.columns.relations.disabled] - If returns true, target columns
 *                  will be disabled.
 *              @param {function} [options.columns.relations.editable] - If returns true, target columns
 *                  will be editable.
 *              @param {function} [options.columns.relations.listItems] - The function whose return
 *                  value specifies the option list for the 'select', 'radio', 'checkbox' type.
 *                  The options list of target columns will be replaced with the return value of this function.
 *          @param {string} [options.columns.whiteSpace='nowrap'] - If set to 'normal', the text line is broken
 *              by fitting to the column's width. If set to 'pre', spaces are preserved and the text is braken by
 *              new line characters. If set to 'pre-wrap', spaces are preserved, the text line is broken by
 *              fitting to the column's width and new line characters. If set to 'pre-line', spaces are merged,
 *              the text line is broken by fitting to the column's width and new line characters.
 *      @param {Object} [options.summary] - The object for configuring summary area.
 *          @param {number} [options.summary.height] - The height of the summary area.
 *          @param {string} [options.summary.position='bottom'] - The position of the summary area. ('bottom', 'top')
 *          @param {(string|Object)} [options.summary.defaultContent]
 *              The configuring of summary cell for every column.
 *              This options can be overriden for each column by columnContent options.
 *              If type is string, the value is used as HTML of summary cell for every columns
 *              without auto-calculation.
 *              @param {boolean} [options.summary.defaultContent.useAutoSummary=true]
 *                  If set to true, the summary value of every column is served as a paramater to the template
 *                  function whenever data is changed.
 *              @param {function} [options.summary.defaultContent.template] - Template function which returns the
 *                  content(HTML) of the column of the summary. This function takes an K-V object as a parameter
 *                  which contains a summary values keyed by 'sum', 'avg', 'min', 'max' and 'cnt'.
 *          @param {Object} [options.summary.columnContent]
 *              The configuring of summary cell for each column.
 *              Sub options below are keyed by each column name.
 *              If type of value of this object is string, the value is used as HTML of summary cell for
 *              the column without auto-calculation.
 *              @param {boolean} [options.summary.columnContent.useAutoSummary=true]
 *                  If set to true, the summary value of each column is served as a paramater to the template
 *                  function whenever data is changed.
 *              @param {function} [options.summary.columnContent.template] - Template function which returns the
 *                  content(HTML) of the column of the summary. This function takes an K-V object as a parameter
 *                  which contains a summary values keyed by 'sum', 'avg', 'min', 'max' and 'cnt'.
 *      @param {boolean} [options.usageStatistics=true] Send the hostname to google analytics.
 *          If you do not want to send the hostname, this option set to false.
 */
export default class Grid {
    private el;
    private store;
    private dispatch;
    private eventBus;
    private dataProvider;
    private dataManager;
    private paginationManager;
    constructor(options: OptGrid);
    /**
     * Apply theme to all grid instances with the preset options of a given name.
     * @static
     * @param {string} presetName - preset theme name. Available values are 'default', 'striped' and 'clean'.
     * @param {Object} [extOptions] - if exist, extend preset options with this object.
     *     @param {Object} [extOptions.outline] - Styles for the table outline.
     *         @param {string} [extOptions.outline.border] - Color of the table outline.
     *         @param {boolean} [extOptions.outline.showVerticalBorder] - Whether vertical outlines of
     *             the table are visible.
     *     @param {Object} [extOptions.selection] - Styles for a selection layer.
     *         @param {string} [extOptions.selection.background] - Background color of a selection layer.
     *         @param {string} [extOptions.selection.border] - Border color of a selection layer.
     *     @param {Object} [extOptions.scrollbar] - Styles for scrollbars.
     *         @param {string} [extOptions.scrollbar.border] - Border color of scrollbars.
     *         @param {string} [extOptions.scrollbar.background] - Background color of scrollbars.
     *         @param {string} [extOptions.scrollbar.emptySpace] - Color of extra spaces except scrollbar.
     *         @param {string} [extOptions.scrollbar.thumb] - Color of thumbs in scrollbars.
     *         @param {string} [extOptions.scrollbar.active] - Color of arrows(for IE) or
     *              thumb:hover(for other browsers) in scrollbars.
     *     @param {Object} [extOptions.frozenBorder] - Styles for a frozen border.
     *         @param {string} [extOptions.frozenBorder.border] - Border color of a frozen border.
     *     @param {Object} [extOptions.area] - Styles for the table areas.
     *         @param {Object} [extOptions.area.header] - Styles for the header area in the table.
     *             @param {string} [extOptions.area.header.background] - Background color of the header area
     *                 in the table.
     *             @param {string} [extOptions.area.header.border] - Border color of the header area
     *                 in the table.
     *         @param {Object} [extOptions.area.body] - Styles for the body area in the table.
     *             @param {string} [extOptions.area.body.background] - Background color of the body area
     *                 in the table.
     *         @param {Object} [extOptions.area.summary] - Styles for the summary area in the table.
     *             @param {string} [extOptions.area.summary.background] - Background color of the summary area
     *                 in the table.
     *             @param {string} [extOptions.area.summary.border] - Border color of the summary area
     *                 in the table.
     *     @param {Object} [extOptions.cell] - Styles for the table cells.
     *         @param {Object} [extOptions.cell.normal] - Styles for normal cells.
     *             @param {string} [extOptions.cell.normal.background] - Background color of normal cells.
     *             @param {string} [extOptions.cell.normal.border] - Border color of normal cells.
     *             @param {string} [extOptions.cell.normal.text] - Text color of normal cells.
     *             @param {boolean} [extOptions.cell.normal.showVerticalBorder] - Whether vertical borders of
     *                 normal cells are visible.
     *             @param {boolean} [extOptions.cell.normal.showHorizontalBorder] - Whether horizontal borders of
     *                 normal cells are visible.
     *         @param {Object} [extOptions.cell.header] - Styles for header cells.
     *             @param {string} [extOptions.cell.header.background] - Background color of header cells.
     *             @param {string} [extOptions.cell.header.border] - border color of header cells.
     *             @param {string} [extOptions.cell.header.text] - text color of header cells.
     *             @param {boolean} [extOptions.cell.header.showVerticalBorder] - Whether vertical borders of
     *                 header cells are visible.
     *             @param {boolean} [extOptions.cell.header.showHorizontalBorder] - Whether horizontal borders of
     *                 header cells are visible.
     *         @param {Object} [extOptions.cell.selectedHeader] - Styles for selected header cells.
     *             @param {string} [extOptions.cell.selectedHeader.background] - background color of selected header cells.
     *         @param {Object} [extOptions.cell.rowHeader] - Styles for row's header cells.
     *             @param {string} [extOptions.cell.rowHeader.background] - Background color of row's header cells.
     *             @param {string} [extOptions.cell.rowHeader.border] - border color of row's header cells.
     *             @param {string} [extOptions.cell.rowHeader.text] - text color of row's header cells.
     *             @param {boolean} [extOptions.cell.rowHeader.showVerticalBorder] - Whether vertical borders of
     *                 row's header cells are visible.
     *             @param {boolean} [extOptions.cell.rowHeader.showHorizontalBorder] - Whether horizontal borders of
     *                 row's header cells are visible.
     *         @param {Object} [extOptions.cell.selectedRowHeader] - Styles for selected row's header cells.
     *             @param {string} [extOptions.cell.selectedRowHeader.background] - background color of selected row's haed cells.
     *         @param {Object} [extOptions.cell.summary] - Styles for cells in the summary area.
     *             @param {string} [extOptions.cell.summary.background] - Background color of cells in the summary area.
     *             @param {string} [extOptions.cell.summary.border] - border color of cells in the summary area.
     *             @param {string} [extOptions.cell.summary.text] - text color of cells in the summary area.
     *             @param {boolean} [extOptions.cell.summary.showVerticalBorder] - Whether vertical borders of
     *                 cells in the summary area are visible.
     *             @param {boolean} [extOptions.cell.summary.showHorizontalBorder] - Whether horizontal borders of
     *                 cells in the summary area are visible.
     *         @param {Object} [extOptions.cell.focused] - Styles for a focused cell.
     *             @param {string} [extOptions.cell.focused.background] - background color of a focused cell.
     *             @param {string} [extOptions.cell.focused.border] - border color of a focused cell.
     *         @param {Object} [extOptions.cell.focusedInactive] - Styles for a inactive focus cell.
     *             @param {string} [extOptions.cell.focusedInactive.border] - border color of a inactive focus cell.
     *         @param {Object} [extOptions.cell.required] - Styles for required cells.
     *             @param {string} [extOptions.cell.required.background] - background color of required cells.
     *             @param {string} [extOptions.cell.required.text] - text color of required cells.
     *         @param {Object} [extOptions.cell.editable] - Styles for editable cells.
     *             @param {string} [extOptions.cell.editable.background] - background color of the editable cells.
     *             @param {string} [extOptions.cell.editable.text] - text color of the selected editable cells.
     *         @param {Object} [extOptions.cell.disabled] - Styles for disabled cells.
     *             @param {string} [extOptions.cell.disabled.background] - background color of disabled cells.
     *             @param {string} [extOptions.cell.disabled.text] - text color of disabled cells.
     *         @param {Object} [extOptions.cell.invalid] - Styles for invalid cells.
     *             @param {string} [extOptions.cell.invalid.background] - background color of invalid cells.
     *             @param {string} [extOptions.cell.invalid.text] - text color of invalid cells.
     *         @param {Object} [extOptions.cell.currentRow] - Styles for cells in a current row.
     *             @param {string} [extOptions.cell.currentRow.background] - background color of cells in a current row.
     *             @param {string} [extOptions.cell.currentRow.text] - text color of cells in a current row.
     *         @param {Object} [extOptions.cell.evenRow] - Styles for cells in even rows.
     *             @param {string} [extOptions.cell.evenRow.background] - background color of cells in even rows.
     *             @param {string} [extOptions.cell.evenRow.text] - text color of cells in even rows.
     *         @param {Object} [extOptions.cell.oddRow] - Styles for cells in even rows.
     *             @param {string} [extOptions.cell.oddRow.background] - background color of cells in odd rows.
     *             @param {string} [extOptions.cell.oddRow.text] - text color of cells in odd rows.
     *         @param {Object} [extOptions.cell.dummy] - Styles for dummy cells.
     *             @param {string} [extOptions.cell.dummy.background] - background color of dummy cells.
     * @example
     * var Grid = tui.Grid; // or require('tui-grid')
     *
     * Grid.applyTheme('striped', {
     *     grid: {
     *         border: '#aaa',
     *         text: '#333'
     *     },
     *     cell: {
     *         disabled: {
     *             text: '#999'
     *         }
     *     }
     * });
     */
    static applyTheme(presetName: ThemeOptionPresetNames, extOptions?: OptPreset): void;
    /**
     * Set language
     * @static
     * @param {string} localeCode - Code to set locale messages and
     *     this is the language or language-region combination (ex: en-US)
     * @param {Object} [data] - Messages using in Grid
     * @example
     * var Grid = tui.Grid; // or require('tui-grid')
     *
     * Grid.setLanguage('en'); // default and set English
     * Grid.setLanguage('ko'); // set Korean
     * Grid.setLanguage('en-US', { // set new language
     *      display: {
     *          noData: 'No data.',
     *          loadingData: 'Loading data.',
     *          resizeHandleGuide: 'You can change the width of the column by mouse drag, ' +
     *                              'and initialize the width by double-clicking.'
     *      },
     *      net: {
     *          confirmCreate: 'Are you sure you want to create {{count}} data?',
     *          confirmUpdate: 'Are you sure you want to update {{count}} data?',
     *          confirmDelete: 'Are you sure you want to delete {{count}} data?',
     *          confirmModify: 'Are you sure you want to modify {{count}} data?',
     *          noDataToCreate: 'No data to create.',
     *          noDataToUpdate: 'No data to update.',
     *          noDataToDelete: 'No data to delete.',
     *          noDataToModify: 'No data to modify.',
     *          failResponse: 'An error occurred while requesting data.\nPlease try again.'
     *      }
     * });
     */
    static setLanguage(localeCode: string, data?: OptI18nData): void;
    /**
     * Sets the width of the dimension.
     * @param {number} width - The width of the dimension
     */
    setWidth(width: number): void;
    /**
     * Sets the height of the dimension.
     * @param {number} height - The height of the dimension
     */
    setHeight(height: number): void;
    /**
     * Sets the height of body-area.
     * @param {number} value - The number of pixel
     */
    setBodyHeight(bodyHeight: number): void;
    /**
     * Sets options for header.
     * @param {Object} options - Options for header
     * @param {number} [options.height] -  The height value
     * @param {Array} [options.complexColumns] - The complex columns info
     */
    setHeader({ height, complexColumns }: OptHeader): void;
    /**
     * Sets the count of frozen columns.
     * @param {number} count - The count of columns to be frozen
     */
    setFrozenColumnCount(count: number): void;
    /**
     * Hides columns
     * @param {...string} arguments - Column names to hide
     */
    hideColumn(columnName: string): void;
    /**
     * Shows columns
     * @param {...string} arguments - Column names to show
     */
    showColumn(columnName: string): void;
    /**
     * Selects cells or rows by range
     * @param {Object} range - Selection range
     *     @param {Array} [range.start] - Index info of start selection (ex: [rowIndex, columnIndex])
     *     @param {Array} [range.end] - Index info of end selection (ex: [rowIndex, columnIndex])
     */
    setSelectionRange(range: {
        start: Range;
        end: Range;
    }): void;
    /**
     * Returns data of currently focused cell
     * @returns {number|string} rowKey - The unique key of the row
     * @returns {string} columnName - The name of the column
     * @returns {string} value - The value of the cell
     */
    getFocusedCell(): {
        rowKey: string | number | null;
        columnName: string | null;
        value: CellValue;
    };
    /**
     * Removes focus from the focused cell.
     */
    blur(): void;
    /**
     * Focus to the cell identified by given rowKey and columnName.
     * @param {Number|String} rowKey - rowKey
     * @param {String} columnName - columnName
     * @param {Boolean} [setScroll=false] - if set to true, move scroll position to focused position
     * @returns {Boolean} true if focused cell is changed
     */
    focus(rowKey: RowKey, columnName: string, setScroll?: boolean): boolean;
    /**
     * Focus to the cell identified by given rowIndex and columnIndex.
     * @param {Number} rowIndex - rowIndex
     * @param {Number} columnIndex - columnIndex
     * @param {boolean} [setScroll=false] - if set to true, scroll to focused cell
     * @returns {Boolean} true if success
     */
    focusAt(rowIndex: number, columnIndex: number, isScrollable?: boolean): boolean;
    /**
     * Makes view ready to get keyboard input.
     */
    activateFocus(): void;
    /**
     * Sets focus on the cell at the specified index of row and column and starts to edit.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {boolean} [setScroll=false] - If set to true, the view will scroll to the cell element.
     */
    startEditing(rowKey: RowKey, columnName: string, setScroll?: boolean): void;
    /**
     * Sets focus on the cell at the specified index of row and column and starts to edit.
     * @param {number|string} rowIndex - The index of the row
     * @param {string} columnIndex - The index of the column
     * @param {boolean} [setScroll=false] - If set to true, the view will scroll to the cell element.
     */
    startEditingAt(rowIndex: number, columnIndex: number, setScroll?: boolean): void;
    /**
     * Sets the value of the cell identified by the specified rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {number|string} value - The value to be set
     */
    setValue(rowKey: RowKey, columnName: string, value: CellValue): void;
    /**
     * Returns the value of the cell identified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the target row.
     * @param {string} columnName - The name of the column
     * @param {boolean} [isOriginal] - It set to true, the original value will be return.
     * @returns {number|string} - The value of the cell
     */
    getValue(rowKey: RowKey, columnName: string): CellValue | null;
    /**
     * Sets the all values in the specified column.
     * @param {string} columnName - The name of the column
     * @param {number|string} columnValue - The value to be set
     * @param {boolean} [checkCellState=true] - If set to true, only editable and not disabled cells will be affected.
     */
    setColumnValues(columnName: string, columnValue: CellValue, checkCellState?: boolean): void;
    /**
     * Returns the HTMLElement of the cell identified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @returns {HTMLElement} - The HTMLElement of the cell element
     */
    getElement(rowKey: RowKey, columnName: string): Element | null;
    /**
     * Sets the HTML string of given column summary.
     * The type of content is the same as the options.summary.columnContent of the constructor.
     * @param {string} columnName - column name
     * @param {string|object} columnContent - HTML string or options object.
     */
    setSummaryColumnContent(columnName: string, columnContent: string | OptSummaryColumnContentMap): void;
    /**
     * Returns the values of given column summary.
     * If the column name is not specified, all values of available columns are returned.
     * The shape of returning object looks like the example below.
     * @param {string} [columnName] - column name
     * @returns {Object}
     * @example
     * {
     *     sum: 1000,
     *     avg: 200,
     *     max: 300,
     *     min: 50,
     *     cnt: 5
     * }
     */
    getSummaryValues(columnName: string): import("./store/types").SummaryValue | null;
    /**
     * Returns a list of the column model.
     * @returns {Array} - A list of the column model.
     */
    getColumns(): ColumnInfo[];
    /**
     * Sets the list of column model.
     * @param {Array} columns - A new list of column model
     */
    setColumns(columns: OptColumn[]): void;
    /**
     * Set columns title
     * @param {Object} columnsMap - columns map to be change
     * @example
     * {
     *      columnName1: 'title1',
     *      columnName2: 'title2',
     *      columnName3: 'title3'
     * }
     */
    setColumnHeaders(columnsMap: Dictionary<string>): void;
    /**
     * Resets the width of each column by using initial setting of column models.
     */
    resetColumnWidths(widths: number[]): void;
    /**
     * Returns a list of all values in the specified column.
     * @param {string} columnName - The name of the column
     * @returns {(Array|string)} - A List of all values in the specified column. (or JSON string of the list)
     */
    getColumnValues(columnName: string): CellValue[];
    /**
     * Returns the index of the column indentified by the column name.
     * @param {string} columnName - The unique key of the column
     * @returns {number} - The index of the column
     */
    getIndexOfColumn(columnName: string): number;
    /**
     * Checks the row identified by the specified rowKey.
     * @param {number|string} rowKey - The unique key of the row
     */
    check(rowKey: RowKey): void;
    /**
     * Unchecks the row identified by the specified rowKey.
     * @param {number|string} rowKey - The unique key of the row
     */
    uncheck(rowKey: RowKey): void;
    /**
     * Checks all rows.
     */
    checkAll(): void;
    /**
     * Unchecks all rows.
     */
    uncheckAll(): void;
    /**
     * Returns a list of the rowKey of checked rows.
     * @returns {Array.<string|number>} - A list of the rowKey.
     */
    getCheckedRowKeys(): RowKey[];
    /**
     * Returns a list of the checked rows.
     * @returns {Array.<object>} - A list of the checked rows.
     */
    getCheckedRows(): Row[];
    /**
     * Finds rows by conditions
     * @param {Object|Function} conditions - object (key: column name, value: column value) or
     *     function that check the value and returns true/false result to find rows
     * @returns {Array} Row list
     * @example <caption>Conditions type is object.</caption>
     * grid.findRows({
     *     artist: 'Birdy',
     *     price: 10000
     * });
     * @example <caption>Conditions type is function.</caption>
     * grid.findRows((row) => {
     *     return (/b/ig.test(row.artist) && row.price > 10000);
     * });
     */
    findRows(conditions: ((row: Row) => boolean) | Dictionary<any>): Row[];
    /**
     * Sorts all rows by the specified column.
     * @param {string} columnName - The name of the column to be used to compare the rows
     * @param {boolean} [ascending] - Whether the sort order is ascending.
     *        If not specified, use the negative value of the current order.
     */
    sort(columnName: string, ascending: boolean): void;
    /**
     * Unsorts all rows. (Sorts by rowKey).
     */
    unsort(): void;
    /**
     * Gets state of the sorted column in rows
     * @returns {{columnName: string, ascending: boolean, useClient: boolean}} Sorted column's state
     */
    getSortState(): import("./store/types").SortOptions;
    /**
     * Copy to clipboard
     */
    copyToClipboard(): void;
    validate(): InvalidRow[];
    /**
     * Enables all rows.
     */
    enable(): void;
    /**
     * Disables all rows.
     */
    disable(): void;
    /**
     * Disables the row identified by the rowkey.
     * @param {number|string} rowKey - The unique key of the target row
     * @param {boolean} [withCheckbox] - change including checkbox. The default value is 'true'
     */
    disableRow(rowKey: RowKey, withCheckbox?: boolean): void;
    /**
     * Enables the row identified by the rowKey.
     * @param {number|string} rowKey - The unique key of the target row
     * @param {boolean} [withCheckbox] - change including checkbox. The default value is 'true'
     */
    enableRow(rowKey: RowKey, withCheckbox?: boolean): void;
    /**
     * Disables the row identified by the spcified rowKey to not be able to check.
     * @param {number|string} rowKey - The unique keyof the row.
     */
    disableRowCheck(rowKey: RowKey): void;
    /**
     * Enables the row identified by the rowKey to be able to check.
     * @param {number|string} rowKey - The unique key of the row
     */
    enableRowCheck(rowKey: RowKey): void;
    appendRow(row?: OptRow, options?: OptAppendRow): void;
    /**
     * Inserts the new row with specified data to the beginning of table.
     * @param {Object} [row] - The data for the new row
     * @param {Object} [options] - Options
     * @param {boolean} [options.focus] - If set to true, move focus to the new row after appending
     */
    prependRow(row: OptRow, options?: OptPrependRow): void;
    /**
     * Removes the row identified by the specified rowKey.
     * @param {number|string} rowKey - The unique key of the row
     * @param {boolean} [options.removeOriginalData] - If set to true, the original data will be removed.
     * @param {boolean} [options.keepRowSpanData] - If set to true, the value of the merged cells will not be
     *     removed although the target is first cell of them.
     */
    removeRow(rowKey: RowKey, options?: OptRemoveRow): void;
    /**
     * Returns the object that contains all values in the specified row.
     * @param {number|string} rowKey - The unique key of the target row
     * @returns {Object} - The object that contains all values in the row.
     */
    getRow(rowKey: RowKey): Row | null;
    /**
     * Returns the object that contains all values in the row at specified index.
     * @param {number} rowIdx - The index of the row
     * @returns {Object} - The object that contains all values in the row.
     */
    getRowAt(rowIdx: number): Row | null;
    /**
     * Returns the index of the row indentified by the rowKey.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {number} - The index of the row
     */
    getIndexOfRow(rowKey: RowKey): number;
    /**
     * Returns a list of all rows.
     * @returns {Array} - A list of all rows
     */
    getData(): Row[];
    /**
     * Returns the total number of the rows.
     * @returns {number} - The total number of the rows
     */
    getRowCount(): number;
    /**
     * Removes all rows.
     */
    clear(): void;
    /**
     * Replaces all rows with the specified list. This will not change the original data.
     * @param {Array} data - A list of new rows
     */
    resetData(data: OptRow[]): void;
    /**
     * Adds the specified css class to cell element identified by the rowKey and className
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {string} className - The css class name to add
     */
    addCellClassName(rowKey: RowKey, columnName: string, className: string): void;
    /**
     * Adds the specified css class to all cell elements in the row identified by the rowKey
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} className - The css class name to add
     */
    addRowClassName(rowKey: RowKey, className: string): void;
    /**
     * Removes the specified css class from the cell element indentified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {string} className - The css class name to be removed
     */
    removeCellClassName(rowKey: RowKey, columnName: string, className: string): void;
    /**
     * Removes the specified css class from all cell elements in the row identified by the rowKey.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} className - The css class name to be removed
     */
    removeRowClassName(rowKey: RowKey, className: string): void;
    on(eventName: string, fn: Function): void;
    off(eventName: string, fn?: Function): void;
    /**
     * Returns an instance of tui.Pagination.
     * @returns {tui.Pagination}
     */
    getPagination(): import("tui-pagination").default | null;
    /**
     * Set number of rows per page and reload current page
     * @param {number} perPage - Number of rows per page
     */
    setPerPage(perPage: number): void;
    /**
     * Returns true if there are at least one row modified.
     * @returns {boolean} - True if there are at least one row modified.
     */
    isModified(): boolean;
    /**
     * Returns the object that contains the lists of changed data compared to the original data.
     * The object has properties 'createdRows', 'updatedRows', 'deletedRows'.
     * @param {Object} [options] Options
     *     @param {boolean} [options.checkedOnly=false] - If set to true, only checked rows will be considered.
     *     @param {boolean} [options.withRawData=false] - If set to true, the data will contains
     *         the row data for internal use.
     *     @param {boolean} [options.rowKeyOnly=false] - If set to true, only keys of the changed
     *         rows will be returned.
     *     @param {Array} [options.ignoredColumns] - A list of column name to be excluded.
     * @returns {{createdRows: Array, updatedRows: Array, deletedRows: Array}} - Object that contains the result list.
     */
    getModifiedRows(options?: ModifiedRowsOptions): Dictionary<(string | number)[] | Row[]>;
    /**
     * Requests 'readData' to the server. The last requested data will be extended with new data.
     * @param {Number} page - Page number
     * @param {Object} data - Data(parameters) to send to the server
     * @param {Boolean} resetData - If set to true, last requested data will be ignored.
     */
    readData(page: number, data?: Params, resetData?: boolean): void;
    /**
     * Send request to server to sync data
     * @param {String} requestType - 'createData|updateData|deleteData|modifyData'
     * @param {object} options - Options
     *      @param {String} [options.url] - URL to send the request
     *      @param {boolean} [options.hasDataParam=true] - Whether the row-data to be included in the request param
     *      @param {boolean} [options.checkedOnly=true] - Whether the request param only contains checked rows
     *      @param {boolean} [options.modifiedOnly=true] - Whether the request param only contains modified rows
     *      @param {boolean} [options.showConfirm=true] - Whether to show confirm dialog before sending request
     *      @param {boolean} [options.withCredentials=false] - Use withCredentials flag of XMLHttpRequest for ajax requests if true
     */
    request(requestType: RequestType, options?: RequestOptions): void;
    /**
     * Requests 'readData' with last requested data.
     */
    reloadData(): void;
    /**
     * Restores the data to the original data.
     * (Original data is set by {@link Grid#resetData|resetData}
     */
    restore(): void;
    /**
     * Expands tree row.
     * @param {number|string} rowKey - The unique key of the row
     * @param {boolean} recursive - true for recursively expand all descendant
     */
    expand(rowKey: RowKey, recursive?: boolean): void;
    /**
     * Expands all tree row.
     */
    expandAll(): void;
    /**
     * Expands tree row.
     * @param {number|string} rowKey - The unique key of the row
     * @param {boolean} recursive - true for recursively expand all descendant
     */
    collapse(rowKey: RowKey, recursive?: boolean): void;
    /**
     * Collapses all tree row.
     */
    collapseAll(): void;
    /**
     * Gets the parent of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Object} - the parent row
     */
    getParentRow(rowKey: RowKey): Row | null;
    /**
     * Gets the children of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Array.<Object>} - the children rows
     */
    getChildRows(rowKey: RowKey): Row[];
    /**
     * Gets the ancestors of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Array.<TreeRow>} - the ancestor rows
     */
    getAncestorRows(rowKey: RowKey): Row[];
    /**
     * Gets the descendants of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Array.<Object>} - the descendant rows
     */
    getDescendantRows(rowKey: RowKey): Row[];
    /**
     * Gets the depth of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {number} - the depth
     */
    getDepth(rowKey: RowKey): number;
    /**
     * Returns the rowspan data of the cell identified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @returns {Object} - Row span data
     */
    getRowSpanData(rowKey: RowKey, columnName: string): import("./store/types").RowSpan | null;
    /**
     * reset original data to current data.
     * (Original data is set by {@link Grid#resetData|resetData}
     */
    resetOriginData(): void;
    /** Removes all checked rows.
     * @param {boolean} [showConfirm] - If set to true, confirm message will be shown before remove.
     * @returns {boolean} - True if there's at least one row removed.
     */
    removeCheckedRows(showConfirm?: boolean): boolean;
    /**
     * Refreshs the layout view. Use this method when the view was rendered while hidden.
     */
    refreshLayout(): void;
}
