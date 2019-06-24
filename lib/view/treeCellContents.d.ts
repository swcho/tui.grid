import { Component } from 'preact';
import { RowKey, TreeCellInfo } from '../store/types';
import { DispatchProps } from '../dispatch/create';
interface OwnProps {
    rowKey: RowKey;
    treeInfo: TreeCellInfo;
}
interface StoreProps {
    rowKey: RowKey;
    depth: number;
    indentWidth: number;
    leaf: boolean;
    expanded: boolean;
    useIcon: boolean;
}
declare type Props = OwnProps & StoreProps & DispatchProps;
export declare class TreeCellContentsComp extends Component<Props> {
    private handleClick;
    private getIndentComponent;
    render(): JSX.Element;
}
export declare const TreeCellContents: {
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
        setState<K extends "expanded" | "rowKey" | "useIcon" | "depth" | "indentWidth" | "leaf">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "expanded" | "rowKey" | "useIcon" | "depth" | "indentWidth" | "leaf">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
