import { ColumnInfo, Side, Range, ComplexColumnInfo } from '../store/types';
import { DataProvider } from '../dataSource/types';
interface OwnProps {
    side: Side;
}
interface StoreProps {
    headerHeight: number;
    cellBorderWidth: number;
    columns: ColumnInfo[];
    scrollLeft: number;
    dataProvider: DataProvider;
    columnSelectionRange: Range | null;
    complexHeaderColumns: ComplexColumnInfo[];
}
export declare const HeaderArea: {
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
        setState<K extends "columns" | "headerHeight" | "cellBorderWidth" | "scrollLeft" | "complexHeaderColumns" | "dataProvider" | "columnSelectionRange">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "columns" | "headerHeight" | "cellBorderWidth" | "scrollLeft" | "complexHeaderColumns" | "dataProvider" | "columnSelectionRange">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
