export declare const HeightResizeHandle: {
    new (props?: {} | undefined, context?: any): {
        unobserve?: (() => void) | undefined;
        setStateUsingSelector(ownProps: {}): void;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: {}): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        state: Readonly<{
            bodyHeight: number;
        }>;
        props: Readonly<import("preact").Attributes & {
            children?: string | number | boolean | object | import("preact").VNode<any> | import("preact").ComponentChild[] | null | undefined;
            ref?: import("preact").Ref<any> | undefined;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "bodyHeight">(state: Pick<{
            bodyHeight: number;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "bodyHeight">(fn: (prevState: {
            bodyHeight: number;
        }, props: {}) => Pick<{
            bodyHeight: number;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
