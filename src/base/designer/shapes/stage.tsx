/* @ts-ignore */
import * as React from 'react';
import { ReactElement, useState, createContext } from 'react';
import Konva from 'konva';
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
        const { cursor, unselectAll } = useMst(store => ({
            cursor: store.cursor,
            unselectAll: store.unselectAll
        }));
        const unselectAllIfNeeded = (e: Konva.KonvaEventObject<MouseEvent>) => {
            const isClickedOnEmpty = e.target === e.target.getStage();

            if (isClickedOnEmpty) {
                unselectAll();
            }
        };

        return (
            <KonvaStage
                style={{ cursor }}
                className={className}
                width={width}
                height={height}
                onClick={unselectAllIfNeeded}>
                {children}
            </KonvaStage>
        );
    }
);
