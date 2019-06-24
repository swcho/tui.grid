import { CellValue, SummaryColumnContent, SummaryColumnContentMap, SummaryValue } from '../store/types';
declare type ColumnContentType = string | SummaryColumnContentMap;
export declare function calculate(values: CellValue[]): SummaryValue;
export declare function castToSummaryColumnContent(content?: ColumnContentType): SummaryColumnContent;
export declare function createSummaryValue(content: SummaryColumnContentMap | null, columnValues: CellValue[]): SummaryValue;
export declare function extractSummaryColumnContent(content: SummaryColumnContent, defaultContent: SummaryColumnContent): SummaryColumnContent;
export {};
