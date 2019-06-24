import { Store, RowKey, Focus, Data } from '../store/types';
export declare function startEditing(store: Store, rowKey: RowKey, columnName: string): void;
export declare function finishEditing({ focus }: Store, rowKey: RowKey, columnName: string): void;
export declare function changeFocus(focus: Focus, data: Data, rowKey: RowKey | null, columnName: string | null, id: number): void;
