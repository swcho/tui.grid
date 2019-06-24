import { CellEditorClass } from './types';
import { Dictionary } from '../store/types';
export interface EditorMap {
    [editorName: string]: [CellEditorClass, Dictionary<any>?];
}
export declare const editorMap: EditorMap;
