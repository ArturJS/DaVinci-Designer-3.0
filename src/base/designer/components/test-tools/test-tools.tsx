import * as React from 'react';
import { SetDesign } from './set-design';
import { DebugInfo } from './debug-info';
import './styles.scss';

export const TestTools: React.FunctionComponent = () => {
    return (
        <div className="test-tools">
            <DebugInfo />
            <SetDesign />
        </div>
    );
};
