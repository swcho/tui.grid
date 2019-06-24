import { Dictionary } from '../store/types';
declare type BooleanSet = Dictionary<boolean>;
export declare type Observable<T extends Dictionary<any>> = T & {
    __storage__: T;
    __propObserverIdSetMap__: Dictionary<BooleanSet>;
};
export declare function observe(fn: Function): () => void;
export declare function observable<T extends Dictionary<any>>(obj: T): Observable<T>;
export declare function notify<T, K extends keyof T>(obj: T, key: K): void;
export declare function getOriginObject<T>(obj: Observable<T>): T;
export {};
