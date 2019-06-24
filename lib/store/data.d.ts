import { Data, Row, Dictionary, Column, ColumnInfo, ColumnDefaultValues, CellRenderData, CellValue, PageOptions } from './types';
import { Observable } from '../helper/observable';
import { OptRow } from '../types';
export declare function getCellDisplayValue(value: CellValue): string;
export declare function createViewRow(row: Row, columnMap: Dictionary<ColumnInfo>, rawData: Row[], treeColumnName?: string, treeIcon?: boolean): {
    rowKey: string | number;
    valueMap: Dictionary<CellRenderData>;
    __unobserveFns__: Function[];
} | {
    rowKey: string | number;
    valueMap: Dictionary<CellRenderData>;
    __unobserveFns__: Function[];
} | {
    treeInfo: Observable<{
        depth: number;
        indentWidth: number;
        leaf: boolean;
        expanded: boolean | undefined;
    }>;
    rowKey: string | number;
    valueMap: Dictionary<CellRenderData>;
    __unobserveFns__: Function[];
};
export declare function createRawRow(row: OptRow, index: number, defaultValues: ColumnDefaultValues, keyColumnName?: string, prevRow?: Row): Observable<Row>;
export declare function createData(data: OptRow[], column: Column): {
    rawData: Row[];
    viewData: ({
        rowKey: string | number;
        valueMap: Dictionary<CellRenderData>;
        __unobserveFns__: Function[];
    } | {
        rowKey: string | number;
        valueMap: Dictionary<CellRenderData>;
        __unobserveFns__: Function[];
    } | {
        treeInfo: Observable<{
            depth: number;
            indentWidth: number;
            leaf: boolean;
            expanded: boolean | undefined;
        }>;
        rowKey: string | number;
        valueMap: Dictionary<CellRenderData>;
        __unobserveFns__: Function[];
    })[];
};
export declare function create(data: OptRow[], column: Column, pageOptions: PageOptions, useClientSort: boolean): Observable<Data>;
