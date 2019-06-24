import { SummaryPosition } from '../store/types';
interface StoreProps {
    width: number;
    scrollX: boolean;
    summaryPosition: SummaryPosition;
}
export declare const LeftSide: {
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
        setState<K extends "width" | "scrollX" | "summaryPosition">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "width" | "scrollX" | "summaryPosition">(fn: (prevState: StoreProps, props: {}) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
