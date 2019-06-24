import { Component } from 'preact';
import { DispatchProps } from '../dispatch/create';
import { SummaryPosition, ViewRow, EditingEvent } from '../store/types';
import { EventBus } from '../event/eventBus';
interface OwnProps {
    rootElement: HTMLElement;
}
interface StoreProps {
    gridId: number;
    width: number;
    autoWidth: boolean;
    editing: boolean;
    editingEvent: EditingEvent;
    scrollXHeight: number;
    fitToParentHeight: boolean;
    heightResizable: boolean;
    summaryHeight: number;
    summaryPosition: SummaryPosition;
    showLeftSide: boolean;
    disabled: boolean;
    viewData: ViewRow[];
    eventBus: EventBus;
    scrollX: boolean;
    scrollY: boolean;
}
declare type Props = OwnProps & StoreProps & DispatchProps;
export declare class ContainerComp extends Component<Props> {
    private el?;
    private handleMouseover;
    private handleClick;
    private handleMouseout;
    private handleMouseDown;
    private handleDblClick;
    private startEditing;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private syncWithDOMWidth;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element;
}
export declare const Container: {
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
        setState<K extends "disabled" | "width" | "viewData" | "heightResizable" | "scrollX" | "scrollY" | "editingEvent" | "summaryHeight" | "summaryPosition" | "scrollXHeight" | "autoWidth" | "fitToParentHeight" | "editing" | "gridId" | "showLeftSide" | "eventBus">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "disabled" | "width" | "viewData" | "heightResizable" | "scrollX" | "scrollY" | "editingEvent" | "summaryHeight" | "summaryPosition" | "scrollXHeight" | "autoWidth" | "fitToParentHeight" | "editing" | "gridId" | "showLeftSide" | "eventBus">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
