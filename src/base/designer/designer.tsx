import * as React from 'react';
import { observer } from 'mobx-react';
import { Stage, Layer, Rect } from './shapes';
import { MSTProvider, useMst } from './utils';
import { DesignerModel, RectModel } from './models';
import { TestTools } from './components';
import './styles.scss';

const { useState } = React;

const stageSize = {
    width: screen.width / 2,
    height: screen.height / 2
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    const colors = ['#'];

    for (let i = 0; i < 6; i++) {
        colors.push(letters[Math.floor(Math.random() * 16)]);
    }

    return colors.join('');
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
    designObjects: {}
});

designerObject.addObject(rectObject);

export const Designer = () => {
    return (
        <>
            <MSTProvider value={designerObject}>
                <TestTools />
                <Stage
                    className="base-stage"
                    width={stageSize.width}
                    height={stageSize.height}>
                    <MSTProvider value={designerObject}>
                        <Layer>
                            {Array.from(
                                designerObject.designObjects.keys()
                            ).map(id => (
                                <Rect id={Number(id)} key={id} />
                            ))}
                        </Layer>
                    </MSTProvider>
                </Stage>
            </MSTProvider>
        </>
    );
};
