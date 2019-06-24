import { Column, Viewport, Dimension, Data, RowCoords, ColumnCoords } from './types';
import { Observable } from '../helper/observable';
interface ViewPortOption {
    data: Data;
    column: Column;
    dimension: Dimension;
    rowCoords: RowCoords;
    columnCoords: ColumnCoords;
    showDummyRows: boolean;
}
export declare function create({ data, column, dimension, rowCoords, columnCoords, showDummyRows }: ViewPortOption): Observable<Viewport>;
export {};
