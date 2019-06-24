import { CellRenderer, CellRendererProps } from './types';
export declare class DefaultRenderer implements CellRenderer {
    private el;
    constructor(props: CellRendererProps);
    getElement(): HTMLDivElement;
    render(props: CellRendererProps): void;
}
