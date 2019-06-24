"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var create_1 = require("./store/create");
var root_1 = require("./view/root");
var preact_1 = require("preact");
var create_2 = require("./dispatch/create");
var manager_1 = tslib_1.__importDefault(require("./theme/manager"));
var instance_1 = require("./instance");
var i18n_1 = tslib_1.__importDefault(require("./i18n"));
var clipboard_1 = require("./query/clipboard");
var validation_1 = require("./query/validation");
var clipboard_2 = require("./helper/clipboard");
var common_1 = require("./helper/common");
var observable_1 = require("./helper/observable");
var eventBus_1 = require("./event/eventBus");
var data_1 = require("./query/data");
var column_1 = require("./helper/column");
var serverSideDataProvider_1 = require("./dataSource/serverSideDataProvider");
var modifiedDataManager_1 = require("./dataSource/modifiedDataManager");
var message_1 = require("./dataSource/helper/message");
var paginationManager_1 = require("./pagination/paginationManager");
var tree_1 = require("./query/tree");
var tree_2 = require("./helper/tree");
var dom_1 = require("./helper/dom");
var rowSpan_1 = require("./helper/rowSpan");
var googleAnalytics_1 = require("./helper/googleAnalytics");
/* eslint-disable */
if (module.hot) {
    require('preact/devtools');
}
/* eslint-enable */
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
var Grid = /** @class */ (function () {
    function Grid(options) {
        var el = options.el, _a = options.usageStatistics, usageStatistics = _a === void 0 ? true : _a;
        var id = instance_1.register(this);
        var store = create_1.createStore(id, options);
        var dispatch = create_2.createDispatcher(store);
        var eventBus = eventBus_1.createEventBus(id);
        var dataProvider = serverSideDataProvider_1.createProvider(store, dispatch, options.data);
        var dataManager = modifiedDataManager_1.createManager();
        var paginationManager = paginationManager_1.createPaginationManager();
        this.el = el;
        this.store = store;
        this.dispatch = dispatch;
        this.eventBus = eventBus;
        this.dataProvider = dataProvider;
        this.dataManager = dataManager;
        this.paginationManager = paginationManager;
        if (usageStatistics) {
            googleAnalytics_1.sendHostname();
        }
        instance_1.registerDataSources(id, dataProvider, dataManager, paginationManager);
        // @TODO: Only for Development env
        // eslint-disable-next-line
        window.store = store;
        if (!manager_1.default.isApplied()) {
            manager_1.default.apply('default');
        }
        if (Array.isArray(options.data)) {
            this.dataManager.setOriginData(options.data);
        }
        preact_1.render(preact_1.h(root_1.Root, { store: store, dispatch: dispatch, rootElement: el }), el);
    }
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
    Grid.applyTheme = function (presetName, extOptions) {
        manager_1.default.apply(presetName, extOptions);
    };
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
    Grid.setLanguage = function (localeCode, data) {
        i18n_1.default.setLanguage(localeCode, data);
    };
    /**
     * Sets the width of the dimension.
     * @param {number} width - The width of the dimension
     */
    Grid.prototype.setWidth = function (width) {
        this.dispatch('setWidth', width, false);
    };
    /**
     * Sets the height of the dimension.
     * @param {number} height - The height of the dimension
     */
    Grid.prototype.setHeight = function (height) {
        this.dispatch('setHeight', height);
    };
    /**
     * Sets the height of body-area.
     * @param {number} value - The number of pixel
     */
    Grid.prototype.setBodyHeight = function (bodyHeight) {
        this.dispatch('setBodyHeight', bodyHeight);
    };
    /**
     * Sets options for header.
     * @param {Object} options - Options for header
     * @param {number} [options.height] -  The height value
     * @param {Array} [options.complexColumns] - The complex columns info
     */
    Grid.prototype.setHeader = function (_a) {
        var height = _a.height, complexColumns = _a.complexColumns;
        if (height) {
            this.dispatch('setHeaderHeight', height);
        }
        if (complexColumns) {
            this.dispatch('setComplexHeaderColumns', complexColumns);
        }
    };
    /**
     * Sets the count of frozen columns.
     * @param {number} count - The count of columns to be frozen
     */
    Grid.prototype.setFrozenColumnCount = function (count) {
        this.dispatch('setFrozenColumnCount', count);
    };
    /**
     * Hides columns
     * @param {...string} arguments - Column names to hide
     */
    Grid.prototype.hideColumn = function (columnName) {
        this.dispatch('hideColumn', columnName);
    };
    /**
     * Shows columns
     * @param {...string} arguments - Column names to show
     */
    Grid.prototype.showColumn = function (columnName) {
        this.dispatch('showColumn', columnName);
    };
    /**
     * Selects cells or rows by range
     * @param {Object} range - Selection range
     *     @param {Array} [range.start] - Index info of start selection (ex: [rowIndex, columnIndex])
     *     @param {Array} [range.end] - Index info of end selection (ex: [rowIndex, columnIndex])
     */
    Grid.prototype.setSelectionRange = function (range) {
        this.dispatch('setSelection', range);
    };
    /**
     * Returns data of currently focused cell
     * @returns {number|string} rowKey - The unique key of the row
     * @returns {string} columnName - The name of the column
     * @returns {string} value - The value of the cell
     */
    Grid.prototype.getFocusedCell = function () {
        var _a = this.store.focus, columnName = _a.columnName, rowKey = _a.rowKey;
        var value = null;
        if (rowKey !== null && columnName !== null) {
            value = this.getValue(rowKey, columnName);
        }
        return { rowKey: rowKey, columnName: columnName, value: value };
    };
    /**
     * Removes focus from the focused cell.
     */
    Grid.prototype.blur = function () {
        // @TODO: save previous 이후 추가 필요.
        this.dispatch('setFocusInfo', null, null, false);
    };
    /**
     * Focus to the cell identified by given rowKey and columnName.
     * @param {Number|String} rowKey - rowKey
     * @param {String} columnName - columnName
     * @param {Boolean} [setScroll=false] - if set to true, move scroll position to focused position
     * @returns {Boolean} true if focused cell is changed
     */
    Grid.prototype.focus = function (rowKey, columnName, setScroll) {
        this.dispatch('setFocusInfo', rowKey, columnName, true);
        if (setScroll) {
            this.dispatch('setScrollToFocus');
        }
        // @TODO: radio button인지 확인, radio 버튼인 경우 체크해주기
        return true;
    };
    /**
     * Focus to the cell identified by given rowIndex and columnIndex.
     * @param {Number} rowIndex - rowIndex
     * @param {Number} columnIndex - columnIndex
     * @param {boolean} [setScroll=false] - if set to true, scroll to focused cell
     * @returns {Boolean} true if success
     */
    Grid.prototype.focusAt = function (rowIndex, columnIndex, isScrollable) {
        var _a = data_1.getCellAddressByIndex(this.store, rowIndex, columnIndex), rowKey = _a.rowKey, columnName = _a.columnName;
        if (!common_1.isUndefined(rowKey) && columnName) {
            return this.focus(rowKey, columnName, isScrollable);
        }
        return false;
    };
    /**
     * Makes view ready to get keyboard input.
     */
    Grid.prototype.activateFocus = function () {
        this.dispatch('setNavigating', true);
    };
    /**
     * Sets focus on the cell at the specified index of row and column and starts to edit.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {boolean} [setScroll=false] - If set to true, the view will scroll to the cell element.
     */
    Grid.prototype.startEditing = function (rowKey, columnName, setScroll) {
        if (this.focus(rowKey, columnName, setScroll)) {
            this.dispatch('startEditing', rowKey, columnName);
        }
    };
    /**
     * Sets focus on the cell at the specified index of row and column and starts to edit.
     * @param {number|string} rowIndex - The index of the row
     * @param {string} columnIndex - The index of the column
     * @param {boolean} [setScroll=false] - If set to true, the view will scroll to the cell element.
     */
    Grid.prototype.startEditingAt = function (rowIndex, columnIndex, setScroll) {
        var _a = data_1.getCellAddressByIndex(this.store, rowIndex, columnIndex), rowKey = _a.rowKey, columnName = _a.columnName;
        this.startEditing(rowKey, columnName, setScroll);
    };
    /**
     * Sets the value of the cell identified by the specified rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {number|string} value - The value to be set
     */
    Grid.prototype.setValue = function (rowKey, columnName, value) {
        this.dispatch('setValue', rowKey, columnName, value);
    };
    /**
     * Returns the value of the cell identified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the target row.
     * @param {string} columnName - The name of the column
     * @param {boolean} [isOriginal] - It set to true, the original value will be return.
     * @returns {number|string} - The value of the cell
     */
    Grid.prototype.getValue = function (rowKey, columnName) {
        var targetRow = this.store.data.rawData.find(function (row) { return row.rowKey === rowKey; });
        // @TODO: isOriginal 처리 original 개념 추가되면 필요(getOriginal)
        if (targetRow) {
            return targetRow[columnName];
        }
        return null;
    };
    /**
     * Sets the all values in the specified column.
     * @param {string} columnName - The name of the column
     * @param {number|string} columnValue - The value to be set
     * @param {boolean} [checkCellState=true] - If set to true, only editable and not disabled cells will be affected.
     */
    Grid.prototype.setColumnValues = function (columnName, columnValue, checkCellState) {
        this.dispatch('setColumnValues', columnName, columnValue, checkCellState);
    };
    /**
     * Returns the HTMLElement of the cell identified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @returns {HTMLElement} - The HTMLElement of the cell element
     */
    Grid.prototype.getElement = function (rowKey, columnName) {
        return this.el.querySelector("." + dom_1.cls('cell') + "[" + dom_1.dataAttr.ROW_KEY + "=\"" + rowKey + "\"][" + dom_1.dataAttr.COLUMN_NAME + "=\"" + columnName + "\"]");
    };
    /**
     * Sets the HTML string of given column summary.
     * The type of content is the same as the options.summary.columnContent of the constructor.
     * @param {string} columnName - column name
     * @param {string|object} columnContent - HTML string or options object.
     */
    Grid.prototype.setSummaryColumnContent = function (columnName, columnContent) {
        this.dispatch('setSummaryColumnContent', columnName, columnContent);
    };
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
    Grid.prototype.getSummaryValues = function (columnName) {
        var summary = this.store.summary;
        var content = summary.summaryColumnContents[columnName];
        if (content && content.useAutoSummary) {
            return summary.summaryValues[columnName];
        }
        return null;
    };
    /**
     * Returns a list of the column model.
     * @returns {Array} - A list of the column model.
     */
    Grid.prototype.getColumns = function () {
        return this.store.column.allColumns
            .filter(function (_a) {
            var name = _a.name;
            return !column_1.isRowHeader(name);
        })
            .map(function (column) { return observable_1.getOriginObject(column); });
    };
    /**
     * Sets the list of column model.
     * @param {Array} columns - A new list of column model
     */
    Grid.prototype.setColumns = function (columns) {
        this.dispatch('setColumns', columns);
    };
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
    Grid.prototype.setColumnHeaders = function (columnsMap) {
        this.dispatch('changeColumnHeadersByName', columnsMap);
    };
    /**
     * Resets the width of each column by using initial setting of column models.
     */
    Grid.prototype.resetColumnWidths = function (widths) {
        this.dispatch('resetColumnWidths', widths);
    };
    /**
     * Returns a list of all values in the specified column.
     * @param {string} columnName - The name of the column
     * @returns {(Array|string)} - A List of all values in the specified column. (or JSON string of the list)
     */
    Grid.prototype.getColumnValues = function (columnName) {
        return common_1.mapProp(columnName, this.store.data.rawData);
    };
    /**
     * Returns the index of the column indentified by the column name.
     * @param {string} columnName - The unique key of the column
     * @returns {number} - The index of the column
     */
    Grid.prototype.getIndexOfColumn = function (columnName) {
        return common_1.findPropIndex('name', columnName, this.store.column.allColumns);
    };
    /**
     * Checks the row identified by the specified rowKey.
     * @param {number|string} rowKey - The unique key of the row
     */
    Grid.prototype.check = function (rowKey) {
        this.dispatch('check', rowKey);
    };
    /**
     * Unchecks the row identified by the specified rowKey.
     * @param {number|string} rowKey - The unique key of the row
     */
    Grid.prototype.uncheck = function (rowKey) {
        this.dispatch('uncheck', rowKey);
    };
    /**
     * Checks all rows.
     */
    Grid.prototype.checkAll = function () {
        this.dispatch('checkAll');
    };
    /**
     * Unchecks all rows.
     */
    Grid.prototype.uncheckAll = function () {
        this.dispatch('uncheckAll');
    };
    /**
     * Returns a list of the rowKey of checked rows.
     * @returns {Array.<string|number>} - A list of the rowKey.
     */
    Grid.prototype.getCheckedRowKeys = function () {
        return data_1.getCheckedRows(this.store).map(function (_a) {
            var rowKey = _a.rowKey;
            return rowKey;
        });
    };
    /**
     * Returns a list of the checked rows.
     * @returns {Array.<object>} - A list of the checked rows.
     */
    Grid.prototype.getCheckedRows = function () {
        return data_1.getCheckedRows(this.store).map(function (row) { return observable_1.getOriginObject(row); });
    };
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
    Grid.prototype.findRows = function (conditions) {
        return data_1.getConditionalRows(this.store, conditions);
    };
    /**
     * Sorts all rows by the specified column.
     * @param {string} columnName - The name of the column to be used to compare the rows
     * @param {boolean} [ascending] - Whether the sort order is ascending.
     *        If not specified, use the negative value of the current order.
     */
    Grid.prototype.sort = function (columnName, ascending) {
        this.dispatch('sort', columnName, ascending);
    };
    /**
     * Unsorts all rows. (Sorts by rowKey).
     */
    Grid.prototype.unsort = function () {
        // @TODO need to multi sort(rowSpan mainkey, rowKey) for rowSpan
        this.dispatch('sort', 'rowKey', true);
    };
    /**
     * Gets state of the sorted column in rows
     * @returns {{columnName: string, ascending: boolean, useClient: boolean}} Sorted column's state
     */
    Grid.prototype.getSortState = function () {
        return this.store.data.sortOptions;
    };
    /**
     * Copy to clipboard
     */
    Grid.prototype.copyToClipboard = function () {
        document.querySelector('.tui-grid-clipboard').innerHTML = clipboard_1.getText(this.store);
        if (!clipboard_2.isSupportWindowClipboardData()) {
            // Accessing the clipboard is a security concern on chrome
            document.execCommand('copy');
        }
    };
    /*
     * Validates all data and returns the result.
     * Return value is an array which contains only rows which have invalid cell data.
     * @returns {Array.<Object>} An array of error object
     * @example
     * // return value example
     * [
     *     {
     *         rowKey: 1,
     *         errors: [
     *             {
     *                 columnName: 'c1',
     *                 errorCode: 'REQUIRED'
     *             },
     *             {
     *                 columnName: 'c2',
     *                 errorCode: 'REQUIRED'
     *             }
     *         ]
     *     },
     *     {
     *         rowKey: 3,
     *         errors: [
     *             {
     *                 columnName: 'c2',
     *                 errorCode: 'REQUIRED'
     *             }
     *         ]
     *     }
     * ]
     */
    Grid.prototype.validate = function () {
        return validation_1.getInvalidRows(this.store);
    };
    /**
     * Enables all rows.
     */
    Grid.prototype.enable = function () {
        this.dispatch('setDisabled', false);
    };
    /**
     * Disables all rows.
     */
    Grid.prototype.disable = function () {
        this.dispatch('setDisabled', true);
    };
    /**
     * Disables the row identified by the rowkey.
     * @param {number|string} rowKey - The unique key of the target row
     * @param {boolean} [withCheckbox] - change including checkbox. The default value is 'true'
     */
    Grid.prototype.disableRow = function (rowKey, withCheckbox) {
        if (withCheckbox === void 0) { withCheckbox = true; }
        this.dispatch('setRowDisabled', true, rowKey, withCheckbox);
    };
    /**
     * Enables the row identified by the rowKey.
     * @param {number|string} rowKey - The unique key of the target row
     * @param {boolean} [withCheckbox] - change including checkbox. The default value is 'true'
     */
    Grid.prototype.enableRow = function (rowKey, withCheckbox) {
        if (withCheckbox === void 0) { withCheckbox = true; }
        this.dispatch('setRowDisabled', false, rowKey, withCheckbox);
    };
    /**
     * Disables the row identified by the spcified rowKey to not be able to check.
     * @param {number|string} rowKey - The unique keyof the row.
     */
    Grid.prototype.disableRowCheck = function (rowKey) {
        this.dispatch('setRowCheckDisabled', true, rowKey);
    };
    /**
     * Enables the row identified by the rowKey to be able to check.
     * @param {number|string} rowKey - The unique key of the row
     */
    Grid.prototype.enableRowCheck = function (rowKey) {
        this.dispatch('setRowCheckDisabled', false, rowKey);
    };
    /*
     * Inserts the new row with specified data to the end of table.
     * @param {Object} [row] - The data for the new row
     * @param {Object} [options] - Options
     * @param {number} [options.at] - The index at which new row will be inserted
     * @param {boolean} [options.extendPrevRowSpan] - If set to true and the previous row at target index
     *        has a rowspan data, the new row will extend the existing rowspan data.
     * @param {boolean} [options.focus] - If set to true, move focus to the new row after appending
     * @param {(Number|String)} [options.parentRowKey] - Tree row key of the parent which appends given rows
     * @param {number} [options.offset] - Tree offset from first sibling
     */
    Grid.prototype.appendRow = function (row, options) {
        if (row === void 0) { row = {}; }
        if (options === void 0) { options = {}; }
        var treeColumnName = this.store.column.treeColumnName;
        if (treeColumnName) {
            this.dispatch('appendTreeRow', row, options);
        }
        else {
            this.dispatch('appendRow', row, options);
        }
        if (options.focus) {
            var rowIdx = common_1.isUndefined(options.at) ? this.getRowCount() - 1 : options.at;
            this.focusAt(rowIdx, 0);
        }
    };
    /**
     * Inserts the new row with specified data to the beginning of table.
     * @param {Object} [row] - The data for the new row
     * @param {Object} [options] - Options
     * @param {boolean} [options.focus] - If set to true, move focus to the new row after appending
     */
    Grid.prototype.prependRow = function (row, options) {
        if (options === void 0) { options = {}; }
        this.appendRow(row, tslib_1.__assign({}, options, { at: 0 }));
    };
    /**
     * Removes the row identified by the specified rowKey.
     * @param {number|string} rowKey - The unique key of the row
     * @param {boolean} [options.removeOriginalData] - If set to true, the original data will be removed.
     * @param {boolean} [options.keepRowSpanData] - If set to true, the value of the merged cells will not be
     *     removed although the target is first cell of them.
     */
    Grid.prototype.removeRow = function (rowKey, options) {
        if (options === void 0) { options = {}; }
        var treeColumnName = this.store.column.treeColumnName;
        if (treeColumnName) {
            this.dispatch('removeTreeRow', rowKey, options);
        }
        else {
            this.dispatch('removeRow', rowKey, options);
        }
    };
    /**
     * Returns the object that contains all values in the specified row.
     * @param {number|string} rowKey - The unique key of the target row
     * @returns {Object} - The object that contains all values in the row.
     */
    Grid.prototype.getRow = function (rowKey) {
        return this.getRowAt(this.getIndexOfRow(rowKey));
    };
    /**
     * Returns the object that contains all values in the row at specified index.
     * @param {number} rowIdx - The index of the row
     * @returns {Object} - The object that contains all values in the row.
     */
    Grid.prototype.getRowAt = function (rowIdx) {
        var row = this.store.data.rawData[rowIdx];
        return row ? observable_1.getOriginObject(row) : null;
    };
    /**
     * Returns the index of the row indentified by the rowKey.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {number} - The index of the row
     */
    Grid.prototype.getIndexOfRow = function (rowKey) {
        return common_1.findPropIndex('rowKey', rowKey, this.store.data.rawData);
    };
    /**
     * Returns a list of all rows.
     * @returns {Array} - A list of all rows
     */
    Grid.prototype.getData = function () {
        return this.store.data.rawData.map(function (row) { return observable_1.getOriginObject(row); });
    };
    /**
     * Returns the total number of the rows.
     * @returns {number} - The total number of the rows
     */
    Grid.prototype.getRowCount = function () {
        return this.store.data.rawData.length;
    };
    /**
     * Removes all rows.
     */
    Grid.prototype.clear = function () {
        this.dispatch('clearData');
    };
    /**
     * Replaces all rows with the specified list. This will not change the original data.
     * @param {Array} data - A list of new rows
     */
    Grid.prototype.resetData = function (data) {
        this.dispatch('resetData', data);
    };
    /**
     * Adds the specified css class to cell element identified by the rowKey and className
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {string} className - The css class name to add
     */
    Grid.prototype.addCellClassName = function (rowKey, columnName, className) {
        this.dispatch('addCellClassName', rowKey, columnName, className);
    };
    /**
     * Adds the specified css class to all cell elements in the row identified by the rowKey
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} className - The css class name to add
     */
    Grid.prototype.addRowClassName = function (rowKey, className) {
        this.dispatch('addRowClassName', rowKey, className);
    };
    /**
     * Removes the specified css class from the cell element indentified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @param {string} className - The css class name to be removed
     */
    Grid.prototype.removeCellClassName = function (rowKey, columnName, className) {
        this.dispatch('removeCellClassName', rowKey, columnName, className);
    };
    /**
     * Removes the specified css class from all cell elements in the row identified by the rowKey.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} className - The css class name to be removed
     */
    Grid.prototype.removeRowClassName = function (rowKey, className) {
        this.dispatch('removeRowClassName', rowKey, className);
    };
    Grid.prototype.on = function (eventName, fn) {
        this.eventBus.on(eventName, fn);
    };
    Grid.prototype.off = function (eventName, fn) {
        this.eventBus.off(eventName, fn);
    };
    /**
     * Returns an instance of tui.Pagination.
     * @returns {tui.Pagination}
     */
    Grid.prototype.getPagination = function () {
        return this.paginationManager.getPagination();
    };
    /**
     * Set number of rows per page and reload current page
     * @param {number} perPage - Number of rows per page
     */
    Grid.prototype.setPerPage = function (perPage) {
        var pagination = this.getPagination();
        if (pagination) {
            pagination.setItemsPerPage(perPage);
            this.readData(1, { perPage: perPage });
        }
    };
    /**
     * Returns true if there are at least one row modified.
     * @returns {boolean} - True if there are at least one row modified.
     */
    Grid.prototype.isModified = function () {
        return this.dataManager.isModified();
    };
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
    Grid.prototype.getModifiedRows = function (options) {
        if (options === void 0) { options = {}; }
        var ignoredColumns = options.ignoredColumns;
        var originIgnoredColumns = this.store.column.ignoredColumns;
        options.ignoredColumns = Array.isArray(ignoredColumns)
            ? ignoredColumns.concat(originIgnoredColumns)
            : originIgnoredColumns;
        return this.dataManager.getAllModifiedData(options);
    };
    /**
     * Requests 'readData' to the server. The last requested data will be extended with new data.
     * @param {Number} page - Page number
     * @param {Object} data - Data(parameters) to send to the server
     * @param {Boolean} resetData - If set to true, last requested data will be ignored.
     */
    Grid.prototype.readData = function (page, data, resetData) {
        this.dataProvider.readData(page, data, resetData);
    };
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
    Grid.prototype.request = function (requestType, options) {
        if (options === void 0) { options = {}; }
        this.dataProvider.request(requestType, options);
    };
    /**
     * Requests 'readData' with last requested data.
     */
    Grid.prototype.reloadData = function () {
        this.dataProvider.reloadData();
    };
    /**
     * Restores the data to the original data.
     * (Original data is set by {@link Grid#resetData|resetData}
     */
    Grid.prototype.restore = function () {
        this.resetData(this.dataManager.getOriginData());
    };
    /**
     * Expands tree row.
     * @param {number|string} rowKey - The unique key of the row
     * @param {boolean} recursive - true for recursively expand all descendant
     */
    Grid.prototype.expand = function (rowKey, recursive) {
        this.dispatch('expandByRowKey', rowKey, recursive);
    };
    /**
     * Expands all tree row.
     */
    Grid.prototype.expandAll = function () {
        this.dispatch('expandAll');
    };
    /**
     * Expands tree row.
     * @param {number|string} rowKey - The unique key of the row
     * @param {boolean} recursive - true for recursively expand all descendant
     */
    Grid.prototype.collapse = function (rowKey, recursive) {
        this.dispatch('collapseByRowKey', rowKey, recursive);
    };
    /**
     * Collapses all tree row.
     */
    Grid.prototype.collapseAll = function () {
        this.dispatch('collapseAll');
    };
    /**
     * Gets the parent of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Object} - the parent row
     */
    Grid.prototype.getParentRow = function (rowKey) {
        return tree_1.getParentRow(this.store, rowKey, true);
    };
    /**
     * Gets the children of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Array.<Object>} - the children rows
     */
    Grid.prototype.getChildRows = function (rowKey) {
        return tree_1.getChildRows(this.store, rowKey, true);
    };
    /**
     * Gets the ancestors of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Array.<TreeRow>} - the ancestor rows
     */
    Grid.prototype.getAncestorRows = function (rowKey) {
        return tree_1.getAncestorRows(this.store, rowKey);
    };
    /**
     * Gets the descendants of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {Array.<Object>} - the descendant rows
     */
    Grid.prototype.getDescendantRows = function (rowKey) {
        return tree_1.getDescendantRows(this.store, rowKey);
    };
    /**
     * Gets the depth of the row which has the given row key.
     * @param {number|string} rowKey - The unique key of the row
     * @returns {number} - the depth
     */
    Grid.prototype.getDepth = function (rowKey) {
        var rawData = this.store.data.rawData;
        var row = common_1.findProp('rowKey', rowKey, rawData);
        return row ? tree_2.getDepth(rawData, row) : 0;
    };
    /**
     * Returns the rowspan data of the cell identified by the rowKey and columnName.
     * @param {number|string} rowKey - The unique key of the row
     * @param {string} columnName - The name of the column
     * @returns {Object} - Row span data
     */
    Grid.prototype.getRowSpanData = function (rowKey, columnName) {
        return rowSpan_1.getRowSpanByRowKey(rowKey, columnName, this.store.data.rawData);
    };
    /**
     * reset original data to current data.
     * (Original data is set by {@link Grid#resetData|resetData}
     */
    Grid.prototype.resetOriginData = function () {
        this.dataManager.setOriginData(this.getData());
    };
    /** Removes all checked rows.
     * @param {boolean} [showConfirm] - If set to true, confirm message will be shown before remove.
     * @returns {boolean} - True if there's at least one row removed.
     */
    Grid.prototype.removeCheckedRows = function (showConfirm) {
        var _this = this;
        var rowKeys = this.getCheckedRowKeys();
        var confirmMessage = message_1.getConfirmMessage('DELETE', rowKeys.length);
        if (rowKeys.length > 0 && (!showConfirm || confirm(confirmMessage))) {
            rowKeys.forEach(function (rowKey) {
                _this.removeRow(rowKey);
            });
            return true;
        }
        return false;
    };
    /**
     * Refreshs the layout view. Use this method when the view was rendered while hidden.
     */
    Grid.prototype.refreshLayout = function () {
        var containerEl = this.el.querySelector("." + dom_1.cls('container'));
        var parentElement = this.el.parentElement;
        this.dispatch('refreshLayout', containerEl, parentElement);
    };
    return Grid;
}());
exports.default = Grid;
//# sourceMappingURL=grid.js.map