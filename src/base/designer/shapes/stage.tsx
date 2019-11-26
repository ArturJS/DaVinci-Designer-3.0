import * as React from 'react';
import { Stage as KonvaStage } from 'react-konva';

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

const BaseStage = ({ children, ...restProps }) => {
    // react context api doesn't properly work with react-konva
    // see also https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062
    return (
        <CursorContext.Consumer>
            {cursorCtrl => (
                <KonvaStage
                    style={{ cursor: cursorCtrl.cursor }}
                    {...restProps}>
                    <CursorContext.Provider value={cursorCtrl}>
                        {children}
                    </CursorContext.Provider>
                </KonvaStage>
            )}
        </CursorContext.Consumer>
    );
};

export const Stage = ({ children, ...restProps }) => {
    const cursorCtrl = useCursor();

    return (
        <CursorContext.Provider value={cursorCtrl}>
            <BaseStage {...restProps}>{children}</BaseStage>
        </CursorContext.Provider>
    );
};
