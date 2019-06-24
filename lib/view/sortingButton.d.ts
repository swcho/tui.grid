import { SortOptions } from '../store/types';
import { DataProvider } from '../dataSource/types';
interface StoreProps {
    sortOptions: SortOptions;
    dataProvider: DataProvider;
}
export declare const SortingButton: {
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
        setState<K extends "sortOptions" | "dataProvider">(state: Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends "sortOptions" | "dataProvider">(fn: (prevState: StoreProps, props: {}) => Pick<StoreProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
export {};
