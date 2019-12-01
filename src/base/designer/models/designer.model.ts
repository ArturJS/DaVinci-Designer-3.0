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
        designObjects: t.map(RectModel)
    })
    .actions(self => ({
        addObject(designObject: Instance<typeof RectModel>): void {
            self.designObjects.set(String(designObject.id), designObject);
        },
        setDefaultCursor(): void {
            self.cursor = cursorType.default;
        },
        setMoveCursor(): void {
            self.cursor = cursorType.move;
        },
        unselectAll(): void {
            self.designObjects.forEach(designObject => {
                designObject.toggleSelected(false);
            });
        }
    }));
