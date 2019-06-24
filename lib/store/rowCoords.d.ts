import { Data, Dimension, RowCoords, Row } from './types';
interface RowCoordsOption {
    data: Data;
    dimension: Dimension;
}
export declare function getRowHeight(row: Row, defaultRowHeight: number): number;
export declare function create({ data, dimension }: RowCoordsOption): RowCoords;
export {};
