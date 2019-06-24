import { Side, ColumnInfo } from '../store/types';
interface OwnProps {
    side: Side;
    useViewport: boolean;
}
interface StoreProps {
    columns: ColumnInfo[];
    widths: number[];
    borderWidth: number;
}
export declare const ColGroup: {
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
        setState<K extends "columns" | "widths" | "borderWidth">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "columns" | "widths" | "borderWidth">(fn: (prevState: StoreProps, props: OwnProps) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
