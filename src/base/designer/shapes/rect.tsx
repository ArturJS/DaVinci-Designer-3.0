import * as React from 'react';
import { Rect as KonvaRect } from 'react-konva';
import { CursorContext } from './stage';

export const Rect = props => (
    <CursorContext.Consumer>
        {({ setDefaultCursor, setMoveCursor }) => (
            <KonvaRect
                {...props}
                onMouseEnter={setMoveCursor}
                onMouseLeave={setDefaultCursor}
            />
        )}
    </CursorContext.Consumer>
);
