import * as React from 'react';
import { Stage as KonvaStage } from 'react-konva';
import { RectModel } from '../models';

const { useState, createContext } = React;

const useCursor = () => {
    const [cursor, setCursor] = useState(cursorType.default);

    return {
        cursor,
        setDefaultCursor() {
            setCursor(cursorType.default);
        },
        setMoveCursor() {
            setCursor(cursorType.move);
        }
    };
};

export const cursorType = {
    default: 'default',
    move: 'move'
};

export const CursorContext = createContext();

export const Stage = ({ children, ...restProps }) => {
    const cursorCtrl = useCursor();
    // react context api doesn't properly work with react-konva
    // see also https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062

    return (
        <KonvaStage style={{ cursor: cursorCtrl.cursor }} {...restProps}>
            <CursorContext.Provider value={cursorCtrl}>
                {children}
            </CursorContext.Provider>
        </KonvaStage>
    );
};
