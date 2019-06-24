export declare const keyNameMap: {
    8: string;
    9: string;
    13: string;
    17: string;
    27: string;
    37: string;
    38: string;
    39: string;
    40: string;
    65: string;
    67: string;
    86: string;
    32: string;
    33: string;
    34: string;
    36: string;
    35: string;
    46: string;
};
export declare const keyboardEventTypeMap: {
    move: string;
    edit: string;
    remove: string;
    select: string;
    clipboard: string;
};
export declare const keyboardEventCommandMap: {
    up: string;
    down: string;
    left: string;
    right: string;
    pageUp: string;
    pageDown: string;
    firstColumn: string;
    lastColumn: string;
    currentCell: string;
    nextCell: string;
    prevCell: string;
    firstCell: string;
    lastCell: string;
    all: string;
    copy: string;
    paste: string;
};
/**
 * K-V object for matching keystroke and event command
 * K: keystroke (order : ctrl -> shift -> keyName)
 * V: [key event type, command]
 * @type {Object}
 * @ignore
 */
export declare const keyStrokeCommandMap: {
    [key: string]: [KeyboardEventType] | [KeyboardEventType, KeyboardEventCommandType];
};
export declare type KeyCodeType = keyof typeof keyNameMap;
export declare type KeyStrokeCommandType = keyof typeof keyStrokeCommandMap;
export declare type KeyboardEventType = keyof (typeof keyboardEventTypeMap);
export declare type KeyboardEventCommandType = keyof (typeof keyboardEventCommandMap);
/**
 * Returns the keyStroke string
 * @param {Event} ev - Keyboard event
 * @returns {String}
 * @ignore
 */
export declare function getKeyStrokeString(ev: KeyboardEvent): KeyStrokeCommandType;
export declare function keyEventGenerate(ev: KeyboardEvent): {
    type: "select" | "clipboard" | "move" | "edit" | "remove";
    command: "all" | "left" | "right" | "copy" | "paste" | "up" | "down" | "pageUp" | "pageDown" | "firstColumn" | "lastColumn" | "currentCell" | "nextCell" | "prevCell" | "firstCell" | "lastCell" | undefined;
} | {
    type?: undefined;
    command?: undefined;
};
export declare function getPageMovedPosition(rowIndex: number, offsets: number[], bodyHeight: number, isPrevDir: boolean): number;
export declare function getPageMovedIndex(offsets: number[], cellBorderWidth: number, movedPosition: number): number;
export declare function getPrevRowIndex(rowIndex: number, heights: number[]): number;
export declare function getNextRowIndex(rowIndex: number, heights: number[]): number;
