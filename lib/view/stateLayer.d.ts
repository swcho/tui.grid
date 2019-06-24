import { State } from '../store/types';
export declare const StateLayer: {
    new (props?: {} | undefined, context?: any): {
        unobserve?: (() => void) | undefined;
        setStateUsingSelector(ownProps: {}): void;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: {}): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        state: Readonly<{
            state: State;
            top: number;
            height: number;
            left: number;
            right: number;
        }>;
        props: Readonly<import("preact").Attributes & {
            children?: string | number | boolean | object | import("preact").VNode<any> | import("preact").ComponentChild[] | null | undefined;
            ref?: import("preact").Ref<any> | undefined;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends "left" | "right" | "top" | "height" | "state">(state: Pick<{
            state: State;
            top: number;
            height: number;
            left: number;
            right: number;
        }, K>, callback?: (() => void) | undefined): void;
        setState<K extends "left" | "right" | "top" | "height" | "state">(fn: (prevState: {
            state: State;
            top: number;
            height: number;
            left: number;
            right: number;
        }, props: {}) => Pick<{
            state: State;
            top: number;
            height: number;
            left: number;
            right: number;
        }, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
