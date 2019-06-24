import { Params } from './types';
import { EventBus } from '../event/eventBus';
export interface Options {
    method: string;
    url: string;
    withCredentials: boolean;
    params?: Params;
    callback?: Function;
    callbackWhenever: Function;
    eventBus: EventBus;
}
export default class GridAjax {
    private method;
    private url;
    private params;
    private callback;
    private callbackWhenever;
    private eventBus;
    private xhr;
    constructor(options: Options);
    private shouldEncode;
    private handleReadyStateChange;
    open(): void;
    send(): void;
}
