import TuiPagination from 'tui-pagination';
export interface PaginationManager {
    setPagination: (tuiPagination: TuiPagination) => void;
    getPagination: () => TuiPagination | null;
}
export declare function createPaginationManager(): PaginationManager;
