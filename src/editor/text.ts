import { CellEditor, CellEditorProps } from './types';
import { cls } from '../helper/dom';

interface Options {
  type: 'text' | 'password';
}

export class TextEditor implements CellEditor {
  public el: HTMLInputElement;

  public constructor(props: CellEditorProps) {
    const el = document.createElement('input');
    const options = props.columnInfo.editor!.options as Options;

    el.className = cls('content-text');
    el.type = options.type;
    el.value = String(props.value);

    this.el = el;
  }

  public getElement() {
    return this.el;
  }

  public getValue() {
    return this.el.value;
  }

  public mounted() {
    this.el.select();
  }
}
