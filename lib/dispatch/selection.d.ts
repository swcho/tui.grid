import { Store, Range, SelectionRange, Selection } from '../store/types';
export declare function changeSelectionRange(selection: Selection, inputRange: SelectionRange | null, id: number): void;
export declare function setSelection(store: Store, range: {
    start: Range;
    end: Range;
}): void;
