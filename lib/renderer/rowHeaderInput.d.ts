import { CellRenderer, CellRendererProps } from './types';
export declare class RowHeaderInputRenderer implements CellRenderer {
    private el;
    constructor(props: CellRendererProps);
    getElement(): HTMLInputElement;
    render(props: CellRendererProps): void;
}
