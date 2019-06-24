import { Component } from 'preact';
import { DispatchProps } from '../dispatch/create';
import { RowKey } from '../store/types';
interface StoreProps {
    editingAddress: {
        rowKey: RowKey;
        columnName: string;
    } | null;
}
declare type Props = StoreProps & DispatchProps;
export declare class EditingLayerComp extends Component<Props> {
    render({ editingAddress }: Props): JSX.Element | null;
}
export declare const EditingLayer: {
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
        setState<K extends "editingAddress">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "editingAddress">(fn: (prevState: StoreProps, props: {}) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
