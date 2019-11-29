import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Rect as KonvaRect, Transformer } from 'react-konva';
import Konva from 'konva';
import { observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import { useMst } from '../utils';
import { RectModel } from '../models';

export const Rect = observer(({ id }: { id: number }) => {
    const { setDefaultCursor, setMoveCursor } = useMst(
        ({ setDefaultCursor, setMoveCursor }) => ({
            setDefaultCursor,
            setMoveCursor
        })
    );
    const rectObject = useMst(store => store.designObjects.get(id));
    const setCoords = ({ target }: { target: Konva.Node }) => {
        rectObject.setCoords({
            x: target.x(),
            y: target.y()
        });
    };
    const shapeRef = useRef();
    const trRef = useRef();
    const { isSelected } = rectObject;

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            // we need to attach transformer manually
            // @ts-ignore
            trRef.current.setNode(shapeRef.current);
            // @ts-ignore
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <KonvaRect
                {...rectObject}
                ref={shapeRef}
                draggable
                onDragMove={setCoords}
                onMouseDown={() => {
                    rectObject.toggleSelected(true);
                }}
                onMouseEnter={setMoveCursor}
                onMouseLeave={setDefaultCursor}
                onTransform={e => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end

                    // @ts-ignore
                    const node = shapeRef.current;

                    rectObject.setScale({
                        // @ts-ignore
                        scaleX: node.scaleX(),

                        // @ts-ignore
                        scaleY: node.scaleY()
                    });
                }}
            />
            {isSelected && <Transformer ref={trRef as any} />}
        </>
    );
});
