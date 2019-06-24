import { AnyComponent } from 'preact';
import { Store } from '../store/types';
import { DeepReadonly } from 'utility-types';
import { DispatchProps } from '../dispatch/create';
export declare function connect<SelectedProps extends object = {}, OwnProps extends object = {}>(selector?: (store: DeepReadonly<Store>, props: DeepReadonly<OwnProps>) => DeepReadonly<SelectedProps>): (WrappedComponent: AnyComponent<OwnProps & SelectedProps & DispatchProps, {}>) => {
    new (props?: OwnProps | undefined, context?: any): {
        unobserve?: (() => void) | undefined;
        setStateUsingSelector(ownProps: OwnProps): void;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: OwnProps): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        state: Readonly<SelectedProps>;
        props: Readonly<OwnProps & import("preact").Attributes & {
            children?: string | number | boolean | object | import("preact").VNode<any> | import("preact").ComponentChild[] | null | undefined;
            ref?: import("preact").Ref<any> | undefined;
        }>;
        context: any;
        base?: HTMLElement | undefined;
        setState<K extends keyof SelectedProps>(state: Pick<SelectedProps, K>, callback?: (() => void) | undefined): void;
        setState<K extends keyof SelectedProps>(fn: (prevState: SelectedProps, props: OwnProps) => Pick<SelectedProps, K>, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
    };
    displayName: string;
    defaultProps?: any;
};
