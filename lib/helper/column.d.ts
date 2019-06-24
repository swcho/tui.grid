import { ComplexColumnInfo } from '../store/types';
export declare function isRowHeader(columnName: string): boolean;
export declare function isRowNumColumn(columnName: string): boolean;
export declare function isCheckboxColumn(columnName: string): boolean;
export declare function isParentColumnHeader(complexHeaderColumns: ComplexColumnInfo[], name: string): boolean;
