import * as React from 'react';
import { observer } from 'mobx-react';
import { useMst } from '../../../utils';

export const DebugInfo: React.FunctionComponent = observer(() => {
    const designObject = useMst();

    return (
        <pre>Current design state: {JSON.stringify(designObject, null, 2)}</pre>
    );
});
