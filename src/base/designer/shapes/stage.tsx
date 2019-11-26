import * as React from 'react';
import { Stage as KonvaStage } from 'react-konva';
import { observer } from 'mobx-react';
import { RectModel } from '../models';

const { useState, createContext } = React;

const rectInstance = RectModel.create({
    id: 1,
    width: 50,
    height: 50,
    x: 20,
    y: 20,
    fill: '#2e0fd0'
});

const useCursor = () => {
    const [cursor, setCursor] = useState(cursorType.default);

    return {
        cursor,
        setDefaultCursor() {
            setCursor(cursorType.default);
        },
        setMoveCursor() {
            setCursor(cursorType.move);
        },
        setCoords(x, y) {
            rectInstance.setCoords(x, y);
        },
        instance: rectInstance
    };
};

export const cursorType = {
    default: 'default',
    move: 'move'
};

export const CursorContext = createContext();

const DebugInfo = observer(() => (
    <pre>Rect instance: {JSON.stringify(rectInstance, null, 2)}</pre>
));

export const Stage = ({ children, ...restProps }) => {
    const cursorCtrl = useCursor();
    // react context api doesn't properly work with react-konva
    // see also https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062

    return (
        <>
            <DebugInfo />
            <KonvaStage style={{ cursor: cursorCtrl.cursor }} {...restProps}>
                <CursorContext.Provider value={cursorCtrl}>
                    {children}
                </CursorContext.Provider>
            </KonvaStage>
        </>
    );
};
