import { Store, Side, ComplexColumnInfo } from '../store/types';
import { OptColumn } from '../types';
export declare function setFrozenColumnCount({ column }: Store, count: number): void;
export declare function setColumnWidth({ column }: Store, side: Side, index: number, width: number): void;
export declare function setColumns({ column, data }: Store, optColumns: OptColumn[]): void;
export declare function resetColumnWidths({ column }: Store, widths: number[]): void;
export declare function hideColumn({ column }: Store, columnName: string): void;
export declare function showColumn({ column }: Store, columnName: string): void;
export declare function setComplexHeaderColumns(store: Store, complexHeaderColumns: ComplexColumnInfo[]): void;
