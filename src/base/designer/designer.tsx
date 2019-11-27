import * as React from 'react';
import { observer } from 'mobx-react';
import { Stage, Layer, Rect } from './shapes';
import { MSTProvider } from './utils';
import { DesignerModel, RectModel } from './models';
import './styles.scss';

const { useState } = React;

const stageSize = {
    width: screen.width / 2,
    height: screen.height / 2
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    const color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

const rectObject = RectModel.create({
    id: 1,
    width: 50,
    height: 50,
    x: 20,
    y: 20,
    fill: getRandomColor()
});

const designerObject = DesignerModel.create({
    designObjects: [rectObject]
});

const DebugInfo = observer(() => (
    <pre>Designer state: {JSON.stringify(designerObject, null, 2)}</pre>
));

export const Designer = () => {
    return (
        <>
            <DebugInfo />
            <Stage
                className="base-stage"
                width={stageSize.width}
                height={stageSize.height}>
                <MSTProvider value={designerObject}>
                    <Layer>
                        {designerObject.designObjects.map(({ id }) => (
                            <Rect id={id} key={id} />
                        ))}
                    </Layer>
                </MSTProvider>
            </Stage>
        </>
    );
};
