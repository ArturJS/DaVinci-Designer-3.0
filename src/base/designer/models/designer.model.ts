import { types as t, Instance } from 'mobx-state-tree';
import { RectModel } from './rect.model';

export const DesignerModel = t
    .model({
        designObjects: t.array(RectModel)
    })
    .actions(self => ({
        addObject(designObject: Instance<typeof RectModel>) {
            self.designObjects.push(designObject);
        }
    }));
