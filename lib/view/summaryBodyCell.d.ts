import { Component } from 'preact';
import { DispatchProps } from '../dispatch/create';
import { SummaryColumnContentMap, SummaryValue } from '../store/types';
interface OwnProps {
    columnName: string;
}
interface StoreProps {
    content: SummaryColumnContentMap | null;
    summaryValue: SummaryValue;
}
declare type Props = OwnProps & StoreProps & DispatchProps;
export declare class SummaryBodyCellComp extends Component<Props> {
    shouldComponentUpdate(nextProps: Props): boolean;
    private getTemplate;
    render(): JSX.Element;
}
export declare const SummaryBodyCell: {
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
        setState<K extends "content" | "summaryValue">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "content" | "summaryValue">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
