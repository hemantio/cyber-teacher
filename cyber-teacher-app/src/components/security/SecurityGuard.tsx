'use client';

import { useState, ReactNode } from 'react';
import { IceOverlay } from './IceOverlay';

interface SecurityGuardProps {
    children: ReactNode;
}

export function SecurityGuard({ children }: SecurityGuardProps) {
    const [isIceActive, setIsIceActive] = useState(false);
    const [breachLevel, setBreachLevel] = useState(0);

    // ICE trigger is available for future use when sniffing logic is re-enabled
    // To activate: call setIsIceActive(true) and setBreachLevel(prev => prev + 1)
    void setIsIceActive;
    void setBreachLevel;

    return (
        <>
            {children}
            {isIceActive && <IceOverlay severity={breachLevel} />}
        </>
    );
}
