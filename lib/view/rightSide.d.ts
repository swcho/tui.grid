import { SummaryPosition } from '../store/types';
interface StoreProps {
    width: number;
    marginLeft: number;
    cornerTopHeight: number;
    cornerBottomHeight: number;
    bodyHeight: number;
    scrollXHeight: number;
    frozenBorderWidth: number;
    cellBorderWidth: number;
    scrollX: boolean;
    scrollY: boolean;
    summaryPosition: SummaryPosition;
}
export declare const RightSide: {
    new (props?: {} | undefined, context?: any): {
        unobserve?: (() => void) | undefined;
        setStateUsingSelector(ownProps: {}): void;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: {}): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        state: Readonly<StoreProps>;
        props: Readonly<import("preact").Attributes & {
            children?: string | number | boolean | object | import("preact").VNode<any> | import("preact").ComponentChild[] | null | undefined;
            ref?: import("preact").Ref<any> | undefined;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "width" | "bodyHeight" | "scrollX" | "scrollY" | "frozenBorderWidth" | "summaryPosition" | "scrollXHeight" | "cellBorderWidth" | "marginLeft" | "cornerTopHeight" | "cornerBottomHeight">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "width" | "bodyHeight" | "scrollX" | "scrollY" | "frozenBorderWidth" | "summaryPosition" | "scrollXHeight" | "cellBorderWidth" | "marginLeft" | "cornerTopHeight" | "cornerBottomHeight">(fn: (prevState: StoreProps, props: {}) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
