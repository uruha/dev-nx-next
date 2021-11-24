import { ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './SidePanel.module.css';

export type Props = {
    children: React.ReactNode;
    close?: () => void;
};

export const SidePanel: React.VFC<Props> = ({
    children,
    close
}): ReactPortal | null => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (!isBrowser) return null;

    const ref = document.getElementById('side-panel');
    const element = (
        <div role="dialog" className={styles.container}>
          <button onClick={close}>とじる</button>
          {children}
        </div>
    );

    return ref ? createPortal(element, ref) : null;
};
