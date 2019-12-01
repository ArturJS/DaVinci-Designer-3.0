import { createContext, useContext } from 'react';
import { Instance } from 'mobx-state-tree';
import { DesignerModel } from '../models';

const MSTContext = createContext({});

export const MSTProvider = MSTContext.Provider;

export function useMst(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapStateToProps?: (stote: Instance<typeof DesignerModel>) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
    const store = useContext(MSTContext);

    if (typeof mapStateToProps !== 'undefined') {
        return mapStateToProps(store as Instance<typeof DesignerModel>);
    }

    return store;
}
