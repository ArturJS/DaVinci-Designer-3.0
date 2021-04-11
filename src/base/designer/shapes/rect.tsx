import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Rect as KonvaRect, Transformer } from 'react-konva';
import Konva from 'konva';
import { observer } from 'mobx-react';
import { pick } from 'lodash';
import { useMst } from '../utils';
import { TDesignerModel } from '../models';

const selectObjectById = (id: number) => (store: TDesignerModel) =>
    store.designObjects.get(String(id));

export const Rect = observer(({ id }: { id: number }) => {
    const { setDefaultCursor, setMoveCursor } = useMst(
        ({ setDefaultCursor, setMoveCursor }) => ({
            setDefaultCursor,
            setMoveCursor
        })
    );
    const rectObject = useMst(selectObjectById(id));
    const setCoords = ({ target }: { target: Konva.Node }): void => {
        rectObject.setCoords({
            x: target.x(),
            y: target.y()
        });
    };
    const shapeRef = useRef() as React.MutableRefObject<Konva.Rect>;
    const trRef = useRef() as React.MutableRefObject<Konva.Transformer>;
    const { isSelected } = rectObject;

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            // we need to attach transformer manually
            const transformer = (trRef.current as unknown) as Konva.Transformer;

            transformer.setNode(shapeRef.current);
            transformer.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const rectConfig = pick(rectObject, [
        'width',
        'height',
        'x',
        'y',
        'scaleX',
        'scaleY',
        'rotation',
        'fill',
        'isSelected',
        'offset'
    ]);

    return (
        <>
            <KonvaRect
                {...rectConfig}
                ref={shapeRef}
                draggable
                onDragMove={setCoords}
                onMouseDown={(): void => {
                    rectObject.toggleSelected(true);
                }}
                onMouseEnter={setMoveCursor}
                onMouseLeave={setDefaultCursor}
                onTransform={(): void => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = (shapeRef.current as unknown) as Konva.Node;

                    rectObject.setScale({
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY()
                    });
                    rectObject.setRotation(node.rotation());
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </>
    );
});
