import * as React from 'react';
import { Rect as KonvaRect } from 'react-konva';
import { observer } from 'mobx-react';
import { CursorContext } from './stage';
import { useMst } from '../utils';

export const Rect = observer(({ id }: { id: number }) => {
    const rectObject = useMst(store =>
        store.designObjects.find(object => object.id === id)
    );
    const setCoords = ({ target }) => {
        rectObject.setCoords({
            x: target.x(),
            y: target.y()
        });
    };

    return (
        <CursorContext.Consumer>
            {({ setDefaultCursor, setMoveCursor }) => (
                <KonvaRect
                    {...rectObject}
                    draggable
                    onDragMove={setCoords}
                    onMouseEnter={setMoveCursor}
                    onMouseLeave={setDefaultCursor}
                />
            )}
        </CursorContext.Consumer>
    );
});
