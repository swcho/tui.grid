import { OptGrid } from '../types';
import { Dimension, Column, SummaryPosition, RowCoords } from './types';
declare type OptDimension = {
    column: Column;
    frozenBorderWidth?: number;
    summaryHeight?: number;
    domWidth: number;
    summaryPosition?: SummaryPosition;
    headerHeight: number;
} & Pick<OptGrid, 'width' | 'rowHeight' | 'minRowHeight' | 'bodyHeight' | 'minBodyHeight' | 'heightResizable' | 'scrollX' | 'scrollY'>;
export declare function create({ column, width, domWidth, rowHeight, bodyHeight, minRowHeight, minBodyHeight, frozenBorderWidth, heightResizable, scrollX, scrollY, summaryHeight, summaryPosition, headerHeight }: OptDimension): Dimension;
export declare function setBodyHeight(dimension: Dimension, rowCoords: RowCoords): void;
export {};
