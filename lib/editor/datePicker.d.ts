import { CellEditor, CellEditorProps } from './types';
export declare class DatePickerEditor implements CellEditor {
    el: HTMLDivElement;
    private inputEl;
    private datePickerEl;
    private createWrapper;
    private createInputElement;
    private createCalendarWrapper;
    constructor(props: CellEditorProps);
    getElement(): HTMLDivElement;
    getValue(): string;
    mounted(): void;
}
