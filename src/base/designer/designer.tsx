import * as React from 'react';
import { Stage, Layer, Rect } from './shapes';
import './styles.scss';

const { useState } = React;

const stageSize = {
    width: screen.width / 2,
    height: screen.height / 2
};

export const Designer = () => {
    return (
        <Stage
            className="base-stage"
            width={stageSize.width}
            height={stageSize.height}>
            <Layer>
                <Rect />
            </Layer>
        </Stage>
    );
};
