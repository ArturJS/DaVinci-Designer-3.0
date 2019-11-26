import * as React from 'react';
import { Rect as KonvaRect } from 'react-konva';
import { observer } from 'mobx-react';
import { CursorContext } from './stage';

export const Rect = observer(props => (
    <CursorContext.Consumer>
        {({ setDefaultCursor, setMoveCursor, setCoords, instance }) => (
            <KonvaRect
                {...props}
                {...instance}
                draggable
                onDragMove={e => {
                    setCoords(e.target.x(), e.target.y());
                }}
                onMouseEnter={setMoveCursor}
                onMouseLeave={setDefaultCursor}
            />
        )}
    </CursorContext.Consumer>
));
