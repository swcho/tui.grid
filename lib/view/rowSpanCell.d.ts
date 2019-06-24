import { Component } from 'preact';
import { ViewRow, RowSpan, ColumnInfo } from '../store/types';
import { DispatchProps } from '../dispatch/create';
interface OwnProps {
    viewRow: ViewRow;
    columnInfo: ColumnInfo;
    refreshRowHeight: Function | null;
}
interface StoreProps {
    rowSpan: RowSpan | null;
    enableRowSpan: boolean;
}
declare type Props = OwnProps & StoreProps & DispatchProps;
export declare class RowSpanCellComp extends Component<Props> {
    render(): JSX.Element | null;
}
export declare const RowSpanCell: {
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
        setState<K extends "rowSpan" | "enableRowSpan">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "rowSpan" | "enableRowSpan">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
