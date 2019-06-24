import { ColumnCoords, Column, Dimension } from './types';
interface ColumnCoordsOptions {
    column: Column;
    dimension: Dimension;
}
export declare function create({ column, dimension }: ColumnCoordsOptions): ColumnCoords;
export {};
