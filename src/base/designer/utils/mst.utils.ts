import { createContext, useContext } from 'react';

const MSTContext = createContext(null);

export const MSTProvider = MSTContext.Provider;

export function useMst(mapStateToProps?: (stote: any) => any) {
    const store = useContext(MSTContext);

    if (typeof mapStateToProps !== 'undefined') {
        return mapStateToProps(store);
    }

    return store;
}
