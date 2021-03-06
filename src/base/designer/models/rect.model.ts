import { types as t } from 'mobx-state-tree';

export const RectModel = t
    .model({
        id: t.identifierNumber,
        width: t.number,
        height: t.number,
        x: t.number,
        y: t.number,
        scaleX: t.optional(t.number, 1),
        scaleY: t.optional(t.number, 1),
        rotation: t.optional(t.number, 0), // in degrees
        fill: t.string,
        isSelected: t.optional(t.boolean, false)
    })
    .views(self => ({
        get offset() {
            const { width, height } = self;

            return {
                x: width / 2,
                y: height / 2
            };
        }
    }))
    .actions(self => ({
        setCoords({ x, y }: { x: number; y: number }): void {
            self.x = x;
            self.y = y;
        },
        setScale({ scaleX, scaleY }: { scaleX: number; scaleY: number }): void {
            self.scaleX = scaleX ?? self.scaleX;
            self.scaleY = scaleY ?? self.scaleY;
        },
        setRotation(angle: number): void {
            self.rotation = (360 + angle) % 360;
        },
        toggleSelected(isSelected: boolean): void {
            self.isSelected = isSelected;
        }
    }));
