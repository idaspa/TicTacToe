const ESC = '\x1b';
const CSI = ESC + '[';
const BOLD = CSI + '1m';
const BOLD_OFF = CSI + '22m';
const CURSOR_UP = CSI + 'A';
const CURSOR_DOWN = CSI + 'B';
const CURSOR_RIGHT = CSI + 'C';
const CURSOR_LEFT = CSI + 'D';
const CLEAR_SCREEN = CSI + '2J';
const DELETE_SCREEN = CSI + '3J';
const CURSOR_HOME = CSI + '1;1H';
const SAVE_CURSOR = ESC + '7';
const RESTORE_CURSOR = ESC + '8';
const moveCursorTo = (row, col) => CSI + row + ';' + col + 'H';
const setCursorCol = (col) => `${ESC}[${col}G`;
const setCursorRow = (row) => `${ESC}[${row}d`;
const BELL = '\x07';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const BLACK = '\x1b[30m';
const WHITE = '\x1b[37m';
const COLOR_RESET = '\x1b[0m';
const BACK_GREEN = '\x1b[42m';
const BACK_RED = '\x1b[41m';
const BACK_YELLOW = '\x1b[43m';
const BACK_BLUE = '\x1b[44m';
const HIDE_CURSOR = '\u001B[?25l';
const SHOW_CURSOR = '\u001B[?25h';

const GRAPHICS_MODE = CSI + "=18h" //640 x 480 color (16-color graphics)

const ANSI = {
    ESC,
    CSI,
    CURSOR_UP,
    CURSOR_DOWN,
    CURSOR_RIGHT,
    CURSOR_LEFT,
    HIDE_CURSOR,
    SHOW_CURSOR,
    CLEAR_SCREEN,
    DELETE_SCREEN,
    CURSOR_HOME,
    SAVE_CURSOR,
    RESTORE_CURSOR,
    BELL,
    RESET,
    GRAPHICS_MODE,
    moveCursorTo,
    setCursorCol,
    setCursorRow,
    COLOR_RESET,
    COLOR: {
        GREEN,
        RED,
        YELLOW,
        BLUE,
        BLACK,
        WHITE,
    },
    BACKGROUND_COLOR: {
        GREEN: BACK_GREEN,
        RED: BACK_RED,
        YELLOW: BACK_YELLOW,
        BLUE: BACK_BLUE
    },
    TEXT: {
        BOLD,
        BOLD_OFF
    }
}

export default ANSI 