import { CellIndex, Store } from '../store/types';
import { KeyboardEventCommandType } from '../helper/keyboard';
export declare function getNextCellIndex(store: Store, command: KeyboardEventCommandType, [rowIndex, columnIndex]: CellIndex): CellIndex;
export declare function getRemoveRange(store: Store): {
    column: number[];
    row: number[];
} | null;
