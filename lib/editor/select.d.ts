import { CellEditor, CellEditorProps } from './types';
export declare class SelectEditor implements CellEditor {
    el: HTMLSelectElement;
    constructor(props: CellEditorProps);
    private createOptions;
    getElement(): HTMLSelectElement;
    getValue(): string;
    mounted(): void;
}
