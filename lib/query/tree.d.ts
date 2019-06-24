import { Store, Row, RowKey } from '../store/types';
export declare function getParentRow(store: Store, rowKey: RowKey, plainObj?: boolean): Row | null;
export declare function getChildRows(store: Store, rowKey: RowKey, plainObj?: boolean): Row[];
export declare function getAncestorRows(store: Store, rowKey: RowKey): Row[];
export declare function getDescendantRows(store: Store, rowKey: RowKey): Row[];
