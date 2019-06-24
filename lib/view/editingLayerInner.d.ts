import { Component } from 'preact';
import { CellValue, RowKey, ColumnInfo, SortOptions } from '../store/types';
import { DispatchProps } from '../dispatch/create';
import Grid from '../grid';
interface StoreProps {
    left: number;
    top: number;
    width: number;
    height: number;
    contentHeight: number;
    columnInfo: ColumnInfo;
    grid: Grid;
    value: CellValue;
    sortOptions: SortOptions;
}
interface OwnProps {
    rowKey: RowKey;
    columnName: string;
}
declare type Props = StoreProps & OwnProps & DispatchProps;
export declare class EditingLayerInnerComp extends Component<Props> {
    private editor?;
    private contentEl?;
    private handleKeyDown;
    private handleMouseDownDocument;
    private finishEditing;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare const EditingLayerInner: {
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
        setState<K extends "left" | "top" | "height" | "width" | "value" | "grid" | "sortOptions" | "columnInfo" | "contentHeight">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "left" | "top" | "height" | "width" | "value" | "grid" | "sortOptions" | "columnInfo" | "contentHeight">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
