import { Component } from 'preact';
import { Store } from '../store/types';
import { Dispatch } from '../dispatch/create';
interface Props {
    rootElement: HTMLElement;
    store: Store;
    dispatch: Dispatch;
}
export declare class Root extends Component<Props> {
    getChildContext(): {
        store: Store;
        dispatch: Dispatch;
    };
    render(): JSX.Element;
}
export {};
