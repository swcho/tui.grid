import { CellValue, Data } from '../store/types';
export declare function comparator(valueA: CellValue, valueB: CellValue, ascending: boolean): number;
export declare function getSortedData(data: Data, sortKey: string, ascending: boolean): {
    rawData: import("../store/types").Row[];
    viewData: import("../store/types").ViewRow[];
};
