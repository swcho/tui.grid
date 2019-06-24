import { DataProvider, DataSource } from './types';
import { Store } from '../store/types';
import { OptRow } from '../types';
import { Dispatch } from '../dispatch/create';
export declare function createProvider(store: Store, dispatch: Dispatch, data?: OptRow[] | DataSource): DataProvider;
