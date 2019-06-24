import { ColumnInfo, ComplexColumnInfo } from '../store/types';
export declare function getLeafChildColumnNames(complexHeaderColumns: ComplexColumnInfo[], name: string): string[];
export declare function getChildColumnRange(visibleColumns: ColumnInfo[], complexHeaderColumns: ComplexColumnInfo[], name: string, rowHeaderCount: number): number[];
