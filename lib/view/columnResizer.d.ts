import { Side, ColumnInfo } from '../store/types';
export declare const HANDLE_WIDTH = 7;
export declare const HANDLE_WIDTH_HALF = 3;
interface OwnProps {
    side: Side;
}
interface StoreProps {
    offsets: number[];
    widths: number[];
    columns: ColumnInfo[];
    cellBorderWidth: number;
}
export declare const ColumnResizer: {
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
        setState<K extends "columns" | "cellBorderWidth" | "widths" | "offsets">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "columns" | "cellBorderWidth" | "widths" | "offsets">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
