interface Obj {
    [propName: string]: any;
}
export declare function shallowEqual(o1: Obj, o2: Obj): boolean;
export declare function arrayEqual(a1: unknown[], a2: unknown[]): boolean;
export declare function sum(nums: number[]): number;
export declare function pipe<T>(initVal: T, ...args: Function[]): T;
export declare function includes<T>(arr: T[], searchItem: T, searchIndex?: number): boolean;
export declare function find<T>(predicate: (item: T) => boolean, arr: T[]): T | undefined;
export declare function findProp<T>(propName: keyof T, value: T[keyof T], arr: T[]): T | undefined;
export declare function some<T>(predicate: (item: T) => boolean, arr: T[]): boolean;
export declare function someProp<T>(propName: keyof T, value: T[keyof T], arr: T[]): boolean;
export declare function findIndex<T>(predicate: (item: T) => boolean, arr: T[]): number;
export declare function findPropIndex<T>(propName: keyof T, value: T[keyof T], arr: T[]): number;
export declare function findIndexes<T>(predicate: (v: T) => boolean, arr: T[]): number[];
export declare function findPrevIndex<T>(arr: T[], predicate: (_: T) => boolean): number;
export declare function findOffsetIndex(offsets: number[], targetOffset: number): number;
export declare function mapProp<T, K extends keyof T>(propName: K, arr: T[]): T[K][];
export declare function deepMergedCopy<T1 extends Obj, T2 extends Obj>(targetObj: T1, obj: T2): T1 & T2;
export declare function assign<T1 extends Obj, T2 extends Obj>(targetObj: T1, obj: T2): void;
export declare function removeArrayItem<T>(targetItem: T, arr: T[]): T[];
export declare function createMapFromArray<T>(arr: T[], propName: keyof T): {
    [key: string]: T;
};
export declare function isFunction(obj: unknown): obj is Function;
export declare function isObject(obj: unknown): obj is object;
export declare function forEachObject<T, K extends Extract<keyof T, string>, V extends T[K]>(fn: (value: V, key: K, obj: T) => void, obj: T): void;
export declare function hasOwnProp<T extends object, K extends keyof T>(obj: T, key: string | K): key is K;
export declare function encodeHTMLEntity(html: string): string;
export declare function setDefaultProp<T>(obj: T, key: keyof T, defValue: any): void;
/**
 * Returns a number whose value is limited to the given range.
 * @param value - A number to force within given min-max range
 * @param min - The lower boundary of the output range
 * @param max - The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @example
 *      // limit the output of this computation to between 0 and 255
 *      value = clamp(value, 0, 255);
 */
export declare function clamp(value: number, min: number, max: number): number;
export declare function range(end: number): number[];
export declare function last(arr: any[]): any;
export declare function isBlank(value: any): boolean;
export declare function isUndefined(value: unknown): value is undefined;
export declare function isNull(value: unknown): value is null;
export declare function isBoolean(value: unknown): value is boolean;
export declare function isNumber(value: unknown): value is number;
export declare function isString(value: unknown): value is string;
/**
 * check the emptiness(included null) of object or array. if obj parameter is null or undefind, return true
 * @param obj - target object or array
 * @returns the emptiness of obj
 */
export declare function isEmpty(obj: any): boolean;
export declare function fromArray<T>(value: ArrayLike<T>): T[];
export declare function convertToNumber(value: any): any;
export declare function debounce(fn: Function, wait: number, immediate?: boolean): (...args: any[]) => void;
export declare function pruneObject<T>(obj: T): Partial<T>;
export declare function omit<T extends object>(obj: T, ...propNames: string[]): T;
export {};
