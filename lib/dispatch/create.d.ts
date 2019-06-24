import * as mouse from './mouse';
import { Store } from '../store/types';
declare const dispatchMap: {
    expandByRowKey(store: Store, rowKey: string | number, recursive?: boolean | undefined): void;
    expandAll(store: Store): void;
    collapseByRowKey(store: Store, rowKey: string | number, recursive?: boolean | undefined): void;
    collapseAll(store: Store): void;
    changeTreeRowsCheckedState(store: Store, rowKey: string | number, state: boolean): void;
    appendTreeRow(store: Store, row: import("../types").OptRow, options: import("../types").OptAppendRow): void;
    removeTreeRow(store: Store, rowKey: string | number, options: import("../types").OptRemoveRow): void;
    setRenderState({ renderState }: Store, state: import("../store/types").State): void;
    changeSelectionRange(selection: import("../store/types").Selection, inputRange: import("../store/types").SelectionRange | null, id: number): void;
    setSelection(store: Store, range: {
        start: [number, number];
        end: [number, number];
    }): void;
    setSummaryColumnContent({ summary, data }: Store, columnName: string, columnContent: string | import("../store/types").SummaryColumnContentMap): void;
    moveFocus(store: Store, command: "all" | "left" | "right" | "copy" | "paste" | "up" | "down" | "pageUp" | "pageDown" | "firstColumn" | "lastColumn" | "currentCell" | "nextCell" | "prevCell" | "firstCell" | "lastCell"): void;
    editFocus({ column, focus }: Store, command: "all" | "left" | "right" | "copy" | "paste" | "up" | "down" | "pageUp" | "pageDown" | "firstColumn" | "lastColumn" | "currentCell" | "nextCell" | "prevCell" | "firstCell" | "lastCell"): void;
    changeSelection(store: Store, command: "all" | "left" | "right" | "copy" | "paste" | "up" | "down" | "pageUp" | "pageDown" | "firstColumn" | "lastColumn" | "currentCell" | "nextCell" | "prevCell" | "firstCell" | "lastCell"): void;
    removeContent(store: Store): void;
    setFocusInfo(store: Store, rowKey: string | number | null, columnName: string | null, navigating: boolean): void;
    startEditing(store: Store, rowKey: string | number, columnName: string): void;
    finishEditing({ focus }: Store, rowKey: string | number, columnName: string): void;
    changeFocus(focus: import("../store/types").Focus, data: import("../store/types").Data, rowKey: string | number | null, columnName: string | null, id: number): void;
    setNavigating({ focus }: Store, navigating: boolean): void;
    selectionEnd({ selection }: Store): void;
    selectionUpdate(store: Store, dragStartData: import("../store/types").DragData, dragData: import("../store/types").DragData): void;
    dragMoveBody(store: Store, dragStartData: import("../store/types").DragData, dragData: import("../store/types").DragData): void;
    dragEnd({ selection }: Store): void;
    mouseDownBody(store: Store, elementInfo: {
        side: import("../store/types").Side;
        top: number;
        left: number;
    } & mouse.ScrollData, eventInfo: import("../store/types").DragData & {
        shiftKey: boolean;
    }): void;
    mouseDownHeader(store: Store, name: string, parentHeader: boolean): void;
    dragMoveHeader(store: Store, dragData: import("../store/types").DragData, startSelectedName: string): void;
    mouseDownRowHeader(store: Store, rowKey: string | number): void;
    dragMoveRowHeader(store: Store, dragData: import("../store/types").DragData): void;
    setFrozenColumnCount({ column }: Store, count: number): void;
    setColumnWidth({ column }: Store, side: import("../store/types").Side, index: number, width: number): void;
    setColumns({ column, data }: Store, optColumns: import("../types").OptColumn[]): void;
    resetColumnWidths({ column }: Store, widths: number[]): void;
    hideColumn({ column }: Store, columnName: string): void;
    showColumn({ column }: Store, columnName: string): void;
    setComplexHeaderColumns(store: Store, complexHeaderColumns: import("../store/types").ComplexColumnInfo[]): void;
    setValue({ column, data, id }: Store, rowKey: string | number, columnName: string, value: import("../store/types").CellValue): void;
    isUpdatableRowAttr(name: "disabled" | "rowNum" | "checked" | "checkDisabled" | "className" | "height" | "tree" | "expanded", checkDisabled: boolean, allDisabled: boolean): boolean;
    setRowAttribute({ data }: Store, rowKey: string | number, attrName: "disabled" | "rowNum" | "checked" | "checkDisabled" | "className" | "height" | "tree" | "expanded", value: number | boolean | {
        row: string[];
        column: import("../store/types").Dictionary<string[]>;
    } | import("../store/types").TreeRowInfo | undefined): void;
    setAllRowAttribute({ data }: Store, attrName: "disabled" | "rowNum" | "checked" | "checkDisabled" | "className" | "height" | "tree" | "expanded", value: number | boolean | {
        row: string[];
        column: import("../store/types").Dictionary<string[]>;
    } | import("../store/types").TreeRowInfo | undefined): void;
    setColumnValues(store: Store, columnName: string, value: import("../store/types").CellValue, checkCellState?: boolean): void;
    check(store: Store, rowKey: string | number): void;
    uncheck(store: Store, rowKey: string | number): void;
    checkAll(store: Store): void;
    uncheckAll(store: Store): void;
    changeSortBtn({ data }: Store, columnName: string, ascending: boolean): void;
    sort(store: Store, columnName: string, ascending: boolean): void;
    paste(store: Store, pasteData: string[][]): void;
    setDisabled(store: Store, disabled: boolean): void;
    setRowDisabled(store: Store, disabled: boolean, rowKey: string | number, withCheckbox: boolean): void;
    setRowCheckDisabled(store: Store, disabled: boolean, rowKey: string | number): void;
    appendRow({ data, column, rowCoords, dimension, id, renderState }: Store, row: import("../types").OptRow, options: import("../types").OptAppendRow): void;
    removeRow({ data, rowCoords, id, renderState }: Store, rowKey: string | number, options: import("../types").OptRemoveRow): void;
    clearData({ data, id, renderState }: Store): void;
    resetData({ data, column, dimension, rowCoords, id, renderState }: Store, inputData: import("../types").OptRow[]): void;
    addRowClassName(store: Store, rowKey: string | number, className: string): void;
    removeRowClassName(store: Store, rowKey: string | number, className: string): void;
    addCellClassName(store: Store, rowKey: string | number, columnName: string, className: string): void;
    removeCellClassName(store: Store, rowKey: string | number, columnName: string, className: string): void;
    setRowHeight({ data, rowCoords }: Store, rowIndex: number, rowHeight: number): void;
    setPagination({ data }: Store, pageOptions: import("../store/types").PageOptions): void;
    changeColumnHeadersByName({ column }: Store, columnsMap: import("../store/types").Dictionary<string>): void;
    setWidth({ dimension }: Store, width: number, autoWidth: boolean): void;
    setHeight({ dimension }: Store, height: number): void;
    setBodyHeight({ dimension }: Store, bodyHeight: number): void;
    setOffsetTop(store: Store, offsetTop: number): void;
    setOffsetLeft(store: Store, offsetLeft: number): void;
    setHeaderHeight(store: Store, height: number): void;
    refreshLayout(store: Store, containerEl: HTMLElement, parentEl: HTMLElement): void;
    setScrollToFocus(store: Store): void;
    setScrollToSelection(store: Store): void;
    setScrollLeft({ viewport }: Store, scrollLeft: number): void;
    setScrollTop({ viewport }: Store, scrollTop: number): void;
};
declare type DispatchMap = typeof dispatchMap;
declare type DispatchFnKeys = keyof DispatchMap;
declare type RestParameters<T> = T extends (first: any, ...args: infer P) => any ? P : never;
export interface Dispatch {
    <T extends DispatchFnKeys>(fname: T, ...args: RestParameters<DispatchMap[T]>): void;
}
export interface DispatchProps {
    dispatch: Dispatch;
}
export declare function createDispatcher(store: Store): Dispatch;
export {};
