import { ComplexColumnInfo, ColumnInfo, Side, Range } from '../store/types';
interface OwnProps {
    side: Side;
}
interface StoreProps {
    headerHeight: number;
    columns: ColumnInfo[];
    complexHeaderColumns: ComplexColumnInfo[];
    columnSelectionRange: Range | null;
    visibleColumns: ColumnInfo[];
    rowHeaderCount: number;
}
export declare const ComplexHeader: {
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
        setState<K extends "columns" | "headerHeight" | "rowHeaderCount" | "visibleColumns" | "complexHeaderColumns" | "columnSelectionRange">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "columns" | "headerHeight" | "rowHeaderCount" | "visibleColumns" | "complexHeaderColumns" | "columnSelectionRange">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
