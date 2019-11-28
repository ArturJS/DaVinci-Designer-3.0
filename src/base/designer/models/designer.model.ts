import { types as t, Instance } from 'mobx-state-tree';
import { RectModel } from './rect.model';

const cursorType = {
    default: 'default',
    move: 'move'
};

export const DesignerModel = t
    .model({
        cursor: t.optional(
            t.union(
                // prettier-ignore
                t.literal(cursorType.default),
                t.literal(cursorType.move)
            ),
            cursorType.default
        ),
        designObjects: t.array(RectModel)
    })
    .actions(self => ({
        addObject(designObject: Instance<typeof RectModel>) {
            self.designObjects.push(designObject);
        },
        setDefaultCursor() {
            self.cursor = cursorType.default;
        },
        setMoveCursor() {
            self.cursor = cursorType.move;
        }
    }));
