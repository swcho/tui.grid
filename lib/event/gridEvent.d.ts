import { CellValue, RowKey, SelectionRange } from '../store/types';
import { XHROptions } from '../dataSource/types';
import Grid from '../grid';
interface GridEventProps {
    value?: CellValue;
    event?: MouseEvent;
    rowKey?: RowKey | null;
    columnName?: string | null;
    prevRowKey?: RowKey | null;
    prevColumnName?: string | null;
    range?: SelectionRange | null;
    xhr?: XMLHttpRequest;
    options?: XHROptions;
}
/**
 * Event class for public event of Grid
 * @module event/gridEvent
 * @param {Object} data - Event data for handler
 */
export default class GridEvent {
    private stopped;
    constructor({ event, ...props }: GridEventProps);
    /**
     * Stops propogation of this event.
     * @memberof event/gridEvent
     */
    stop(): void;
    isStopped(): boolean;
    assignData(data: GridEventProps): void;
    setInstance(instance: Grid): void;
}
export {};
