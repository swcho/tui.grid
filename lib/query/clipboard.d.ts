import { SelectionRange, Store } from '../store/types';
export declare function getRangeToPaste(store: Store, pasteData: string[][]): SelectionRange;
export declare function copyDataToRange(range: SelectionRange, pasteData: string[][]): string[][];
export declare function getText(store: Store): string;
