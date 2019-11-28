import * as React from 'react';
import { ReactElement, useState, createContext } from 'react';
import { Stage as KonvaStage } from 'react-konva';
import { observer } from 'mobx-react';
import { RectModel } from '../models';
import { useMst } from '../utils';

export const Stage = observer(
    ({
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
        const cursor = useMst(store => store.cursor);

        return (
            <KonvaStage
                style={{ cursor }}
                className={className}
                width={width}
                height={height}>
                {children}
            </KonvaStage>
        );
    }
);
