import { Focus, ColumnCoords, RowCoords, Column, Data, EditingEvent } from './types';
import { Observable } from '../helper/observable';
interface FocusOption {
    data: Data;
    column: Column;
    rowCoords: RowCoords;
    columnCoords: ColumnCoords;
    editingEvent: EditingEvent;
}
export declare function create({ column, data, rowCoords, columnCoords, editingEvent }: FocusOption): Observable<Focus>;
export {};
