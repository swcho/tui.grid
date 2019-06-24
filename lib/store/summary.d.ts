import { Column, Data, Summary } from './types';
import { OptSummaryData } from '../types';
interface SummaryOption {
    column: Column;
    data: Data;
    summary: OptSummaryData;
}
export declare function create({ column, data, summary }: SummaryOption): Summary;
export {};
