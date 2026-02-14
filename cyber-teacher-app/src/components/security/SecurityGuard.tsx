'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { IceOverlay } from './IceOverlay';
import { soundManager } from '@/lib/sound-engine';

interface SecurityGuardProps {
    children: ReactNode;
}

export function SecurityGuard({ children }: SecurityGuardProps) {
    const [isIceActive, setIsIceActive] = useState(false);
    const [breachLevel, setBreachLevel] = useState(0);

    const triggerIce = useCallback(() => {
        if (isIceActive) return;

        setIsIceActive(true);
        setBreachLevel(prev => prev + 1);

        // Play ICE sounds
        soundManager.play('ice', { volume: 0.8 });

        // Periodic glitch sounds
        const glitchInterval = setInterval(() => {
            soundManager.play('glitch', { volume: 0.4 });
        }, 300);

        // Visual reset timer
        setTimeout(() => {
            setIsIceActive(false);
            clearInterval(glitchInterval);
        }, 5000);
    }, [isIceActive]);

    useEffect(() => {
        // Active sniffing logic removed as requested to prioritize stability.
        // The component now only serves as a container for safety effects triggered manually.
    }, []);

    return (
        <>
            {children}
            {isIceActive && <IceOverlay severity={breachLevel} />}
        </>
    );
}
