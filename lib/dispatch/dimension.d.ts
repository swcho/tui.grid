import { Store } from '../store/types';
export declare function setWidth({ dimension }: Store, width: number, autoWidth: boolean): void;
export declare function setHeight({ dimension }: Store, height: number): void;
export declare function setBodyHeight({ dimension }: Store, bodyHeight: number): void;
export declare function setOffsetTop(store: Store, offsetTop: number): void;
export declare function setOffsetLeft(store: Store, offsetLeft: number): void;
export declare function setHeaderHeight(store: Store, height: number): void;
export declare function refreshLayout(store: Store, containerEl: HTMLElement, parentEl: HTMLElement): void;
