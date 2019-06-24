import { Store, RowKey, Data, Row, Dictionary } from '../store/types';
export declare function getCellAddressByIndex({ data, column }: Store, rowIndex: number, columnIndex: number): {
    rowKey: string | number;
    columnName: string;
};
export declare function isCellDisabled(data: Data, rowKey: RowKey, columnName: string): boolean;
export declare function getCheckedRows({ data }: Store): Row[];
export declare function getConditionalRows({ data }: Store, conditions: ((row: Row) => boolean) | Dictionary<any>): Row[];
