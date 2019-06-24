import { Row } from '../store/types';
import { ModifiedRowsOptions, ModifiedDataManager } from './types';
export declare function getDataWithOptions(targetRows: Row[], options?: ModifiedRowsOptions): (string | number)[] | Row[];
export declare function createManager(): ModifiedDataManager;
