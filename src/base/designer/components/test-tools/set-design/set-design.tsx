import * as React from 'react';
import { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { applySnapshot, getSnapshot } from 'mobx-state-tree';
import { useMst } from '../../../utils';
import './styles.scss';

type TMouseHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export const SetDesign = observer(() => {
    const [error, setError] = useState('');
    const areaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const designObject = useMst();
    const withCatchError = (fn: Function): TMouseHandler => async (): Promise<
        void
    > => {
        try {
            await fn();
            setError('');
        } catch (err) {
            setError(`Failed to set design. Error info: ${err}`);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setDesign = (parsedDesignState: Record<string, any>): void => {
        applySnapshot(designObject, parsedDesignState);
    };
    const setDesignFromTextarea = withCatchError(() => {
        const parsedDesignState = JSON.parse(areaRef.current.value) as Record<
            string,
            any // eslint-disable-line @typescript-eslint/no-explicit-any
        >;

        setDesign(parsedDesignState);
    });
    const { clipboard } = window.navigator;
    const setDesignFromClipboard = withCatchError(async () => {
        const text = await clipboard.readText();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedDesignState = JSON.parse(text) as Record<string, any>;

        setDesign(parsedDesignState);
        areaRef.current.value = text;
    });
    const copyDesignToClipboard = (): void => {
        const designState = JSON.stringify(getSnapshot(designObject), null, 4);

        navigator.clipboard.writeText(designState);
    };

    return (
        <div className="set-design">
            {error && <div className="error-info">{error}</div>}
            <textarea className="design-input" ref={areaRef}></textarea>
            <div className="btn-block">
                <button type="button" onClick={copyDesignToClipboard}>
                    Copy design to clipboard
                </button>
                <button type="button" onClick={setDesignFromTextarea}>
                    Set design
                </button>
                <button type="button" onClick={setDesignFromClipboard}>
                    Set design from clipboard
                </button>
            </div>
        </div>
    );
});
