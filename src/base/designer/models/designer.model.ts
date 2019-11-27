import { types as t } from 'mobx-state-tree';
import { RectModel } from './rect.model';

export const DesignerModel = t
    .model({
        designObjects: t.array(RectModel)
    })
    .actions(self => ({
        addObject(designObject) {
            self.designObjects.push(designObject);
        }
    }));
