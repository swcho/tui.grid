import { ViewRow, ColumnInfo } from '../store/types';
interface OwnProps {
    rowIndex: number;
    viewRow: ViewRow;
    columns: ColumnInfo[];
}
interface StoreProps {
    rowHeight: number;
    autoRowHeight: boolean;
    cellBorderWidth: number;
}
export declare const BodyRow: {
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
        setState<K extends "rowHeight" | "cellBorderWidth" | "autoRowHeight">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "rowHeight" | "cellBorderWidth" | "autoRowHeight">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
