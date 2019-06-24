import { CellEditor, CellEditorProps } from './types';
export declare class TextEditor implements CellEditor {
    el: HTMLInputElement;
    constructor(props: CellEditorProps);
    getElement(): HTMLInputElement;
    getValue(): string;
    mounted(): void;
}
