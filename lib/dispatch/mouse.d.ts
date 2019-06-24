import { Store, Side, DragData, RowKey } from '../store/types';
export declare function setNavigating({ focus }: Store, navigating: boolean): void;
export interface ScrollData {
    scrollLeft: number;
    scrollTop: number;
}
declare type ElementInfo = {
    side: Side;
    top: number;
    left: number;
} & ScrollData;
declare type EventInfo = DragData & {
    shiftKey: boolean;
};
export declare function selectionEnd({ selection }: Store): void;
export declare function selectionUpdate(store: Store, dragStartData: DragData, dragData: DragData): void;
export declare function dragMoveBody(store: Store, dragStartData: DragData, dragData: DragData): void;
export declare function dragEnd({ selection }: Store): void;
export declare function mouseDownBody(store: Store, elementInfo: ElementInfo, eventInfo: EventInfo): void;
export declare function mouseDownHeader(store: Store, name: string, parentHeader: boolean): void;
export declare function dragMoveHeader(store: Store, dragData: DragData, startSelectedName: string): void;
export declare function mouseDownRowHeader(store: Store, rowKey: RowKey): void;
export declare function dragMoveRowHeader(store: Store, dragData: DragData): void;
export {};
