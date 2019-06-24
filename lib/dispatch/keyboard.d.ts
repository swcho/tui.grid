import { Store, RowKey } from '../store/types';
import { KeyboardEventCommandType } from '../helper/keyboard';
export declare function moveFocus(store: Store, command: KeyboardEventCommandType): void;
export declare function editFocus({ column, focus }: Store, command: KeyboardEventCommandType): void;
export declare function changeSelection(store: Store, command: KeyboardEventCommandType): void;
export declare function removeContent(store: Store): void;
export declare function setFocusInfo(store: Store, rowKey: RowKey | null, columnName: string | null, navigating: boolean): void;
