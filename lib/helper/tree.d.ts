import { Row, ColumnDefaultValues, RowKey } from '../store/types';
import { OptRow } from '../types';
export declare const DEFAULT_INDENT_WIDTH = 22;
export declare function addChildRowKey(row: Row, rowKey: RowKey): void;
export declare function removeChildRowKey(row: Row, rowKey: RowKey): void;
export declare function getParentRowKey(row: Row): string | number | null;
export declare function getChildRowKeys(row: Row): (string | number)[];
export declare function isLeaf(row: Row): boolean;
export declare function isExpanded(row: Row): boolean | undefined;
export declare function getDepth(rawData: Row[], row: Row): number;
export declare function getHiddenChildState(row: Row): boolean;
export declare function flattenTreeData(data: OptRow[], defaultValues: ColumnDefaultValues, parentRow: Row | null, keyColumnName?: string): Row[];
export declare function createTreeRawData(data: OptRow[], defaultValues: ColumnDefaultValues, keyColumnName?: string): Row[];
export declare function getTreeCellInfo(rawData: Row[], row: Row, useIcon?: boolean): {
    depth: number;
    indentWidth: number;
    leaf: boolean;
    expanded: boolean | undefined;
};
export declare function createTreeCellInfo(rawData: Row[], row: Row, useIcon?: boolean): import("./observable").Observable<{
    depth: number;
    indentWidth: number;
    leaf: boolean;
    expanded: boolean | undefined;
}>;
export declare function traverseAncestorRows(rawData: Row[], row: Row, iteratee: Function): void;
export declare function traverseDescendantRows(rawData: Row[], row: Row, iteratee: Function): void;
