import { Side } from '../store/types';
interface OwnProps {
    side: Side;
}
interface StoreProps {
    bodyHeight: number;
    totalRowHeight: number;
    totalColumnWidth: number;
    scrollTop: number;
    scrollLeft: number;
    scrollXHeight: number;
    offsetTop: number;
    offsetLeft: number;
    dummyRowCount: number;
    scrollX: boolean;
    scrollY: boolean;
}
export declare const BodyArea: {
    new (props?: OwnProps | undefined, context?: any): {
        unobserve?: (() => void) | undefined;
        setStateUsingSelector(ownProps: OwnProps): void;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: OwnProps): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        state: Readonly<StoreProps>;
        props: Readonly<OwnProps & import("preact").Attributes & {
            children?: string | number | boolean | object | import("preact").VNode<any> | import("preact").ComponentChild[] | null | undefined;
            ref?: import("preact").Ref<any> | undefined;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "bodyHeight" | "scrollX" | "scrollY" | "totalRowHeight" | "scrollXHeight" | "scrollLeft" | "scrollTop" | "offsetLeft" | "offsetTop" | "totalColumnWidth" | "dummyRowCount">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "bodyHeight" | "scrollX" | "scrollY" | "totalRowHeight" | "scrollXHeight" | "scrollLeft" | "scrollTop" | "offsetLeft" | "offsetTop" | "totalColumnWidth" | "dummyRowCount">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
