import { Column, ColumnInfo, Relations, ClipboardCopyOptions, ComplexColumnInfo } from './types';
import { OptColumn, OptColumnOptions, OptRowHeader, OptTree } from '../types';
export declare function getRelationColumns(relations: Relations[]): string[];
export declare function createColumn(column: OptColumn, columnOptions: OptColumnOptions, relationColumns: string[], gridCopyOptions: ClipboardCopyOptions, treeColumnOptions: OptTree): ColumnInfo;
interface ColumnOptions {
    columns: OptColumn[];
    columnOptions: OptColumnOptions;
    rowHeaders: OptRowHeader[];
    copyOptions: ClipboardCopyOptions;
    keyColumnName?: string;
    treeColumnOptions: OptTree;
    complexColumns: ComplexColumnInfo[];
}
export declare function create({ columns, columnOptions, rowHeaders, copyOptions, keyColumnName, treeColumnOptions, complexColumns }: ColumnOptions): Column;
export {};
