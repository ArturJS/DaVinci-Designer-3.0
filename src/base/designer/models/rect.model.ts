import { types as t } from 'mobx-state-tree';

export const RectModel = t
    .model({
        id: t.identifierNumber,
        width: t.number,
        height: t.number,
        x: t.number,
        y: t.number,
        fill: t.string
    })
    .actions(self => ({
        setCoords({ x, y }) {
            self.x = x;
            self.y = y;
        }
    }));
