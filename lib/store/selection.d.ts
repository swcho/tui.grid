import { Column, ColumnCoords, Dimension, RowCoords, Selection, SelectionUnit } from './types';
import { Observable } from '../helper/observable';
interface SelectionOptions {
    selectionUnit: SelectionUnit;
    columnCoords: ColumnCoords;
    column: Column;
    dimension: Dimension;
    rowCoords: RowCoords;
}
export declare function create({ selectionUnit, rowCoords, columnCoords, column: columnInfo, dimension }: SelectionOptions): Observable<Selection>;
export {};
