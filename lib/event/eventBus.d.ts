import { GridId } from '../store/types';
export interface EventBus {
    on: Function;
    off: Function;
    trigger: Function;
}
export declare function createEventBus(id: GridId): EventBus;
export declare function getEventBus(id: GridId): EventBus;
