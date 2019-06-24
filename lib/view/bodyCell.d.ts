import { Component } from 'preact';
import { ColumnInfo, ViewRow, CellRenderData, RowKey, TreeCellInfo } from '../store/types';
import { DispatchProps } from '../dispatch/create';
import Grid from '../grid';
interface OwnProps {
    viewRow: ViewRow;
    columnInfo: ColumnInfo;
    refreshRowHeight: Function | null;
    rowSpanAttr: {
        rowSpan: number;
    } | null;
}
interface StoreProps {
    grid: Grid;
    rowKey: RowKey;
    columnInfo: ColumnInfo;
    renderData: CellRenderData;
    disabled: boolean;
    treeInfo?: TreeCellInfo;
    selectedRow: boolean;
}
declare type Props = OwnProps & StoreProps & DispatchProps;
export declare class BodyCellComp extends Component<Props> {
    private renderer;
    private el;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    private handleMouseMove;
    private handleMouseDown;
    private clearDocumentEvents;
    private handleSelectStart;
    render(): JSX.Element;
}
export declare const BodyCell: {
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
        setState<K extends "disabled" | "rowKey" | "grid" | "treeInfo" | "columnInfo" | "renderData" | "selectedRow">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "disabled" | "rowKey" | "grid" | "treeInfo" | "columnInfo" | "renderData" | "selectedRow">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
