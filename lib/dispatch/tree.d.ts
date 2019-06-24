import { OptRow, OptAppendRow, OptRemoveRow } from '../types';
import { Store, RowKey } from '../store/types';
export declare function expandByRowKey(store: Store, rowKey: RowKey, recursive?: boolean): void;
export declare function expandAll(store: Store): void;
export declare function collapseByRowKey(store: Store, rowKey: RowKey, recursive?: boolean): void;
export declare function collapseAll(store: Store): void;
export declare function changeTreeRowsCheckedState(store: Store, rowKey: RowKey, state: boolean): void;
export declare function appendTreeRow(store: Store, row: OptRow, options: OptAppendRow): void;
export declare function removeTreeRow(store: Store, rowKey: RowKey, options: OptRemoveRow): void;
