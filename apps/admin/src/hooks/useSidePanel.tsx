import { useCallback, useState } from 'react';
import { SidePanel, Props } from '../components/SidePanel';

type UseSidePanel = () => {
    SidePanel: React.VFC<Props>;
    open: () => void;
    close: () => void;
    isOpen: boolean;
};

export const useSidePanel: UseSidePanel = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const open = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const close = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const sidePanel = useCallback(
        ({ children }) => {
            return isOpen ? <SidePanel close={close}>{children}</SidePanel> : null;
        },
        [isOpen, close]
    );

    return { SidePanel: sidePanel, open, close, isOpen };
};
