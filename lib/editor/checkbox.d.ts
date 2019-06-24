import { CellEditor, CellEditorProps } from './types';
export declare class CheckboxEditor implements CellEditor {
    el: HTMLElement;
    constructor(props: CellEditorProps);
    private createLabel;
    private createCheckbox;
    private getFirstInput;
    getElement(): HTMLElement;
    private setValue;
    getValue(): string;
    mounted(): void;
}
