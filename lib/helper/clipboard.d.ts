import { CellValue, CellRenderData, Range, Row, ViewRow, ColumnInfo, CustomValue } from '../store/types';
export declare function setDataInSpanRange(value: string, data: string[][], colspanRange: Range, rowspanRange: Range): void;
export declare function convertTableToData(rows: HTMLCollectionOf<HTMLTableRowElement>): string[][];
export declare function convertTextToData(text: string): string[][];
export declare function getCustomValue(customValue: CustomValue, value: CellValue, rowAttrs: Row[], column: ColumnInfo): string;
export declare function getTextWithCopyOptionsApplied(valueMap: CellRenderData, rawData: Row[], column: ColumnInfo): string;
export declare function isColumnEditable(viewData: ViewRow[], rowIndex: number, columnName: string): boolean;
export declare function isSupportWindowClipboardData(): boolean;
