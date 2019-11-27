import * as React from 'react';
import { ReactElement, useState, createContext } from 'react';
import { Stage as KonvaStage } from 'react-konva';
import { RectModel } from '../models';

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

// @ts-ignore
export const CursorContext: React.Context<any> = createContext(null);

export const Stage = ({
    children,
    className,
    width,
    height
}: {
    children: ReactElement;
    className: string;
    width: number;
    height: number;
}) => {
    const cursorCtrl = useCursor();
    // react context api doesn't properly work with react-konva
    // see also https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062

    return (
        <KonvaStage
            style={{ cursor: cursorCtrl.cursor }}
            className={className}
            width={width}
            height={height}>
            {/* @ts-ignore */}
            <CursorContext.Provider value={cursorCtrl}>
                {children}
            </CursorContext.Provider>
        </KonvaStage>
    );
};
