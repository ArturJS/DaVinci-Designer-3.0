import * as React from 'react';
import { Rect as KonvaRect } from 'react-konva';
import Konva from 'konva';
import { observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import { CursorContext } from './stage';
import { useMst } from '../utils';
import { RectModel } from '../models';

export const Rect = observer(({ id }: { id: number }) => {
    const rectObject = useMst(store =>
        store.designObjects.find(
            (object: Instance<typeof RectModel>) => object.id === id
        )
    );
    const setCoords = ({ target }: { target: Konva.Node }) => {
        rectObject.setCoords({
            x: target.x(),
            y: target.y()
        });
    };

    return (
        <CursorContext.Consumer>
            {({ setDefaultCursor, setMoveCursor }: any) => (
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
