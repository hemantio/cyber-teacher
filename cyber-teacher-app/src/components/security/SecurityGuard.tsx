'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { IceOverlay } from './IceOverlay';
import { HackerTroll } from './HackerTroll';
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
        // 1. DevTools Detection (Threshold method)
        const threshold = 160;
        const checkDevTools = () => {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;

            if (widthDiff > threshold || heightDiff > threshold) {
                triggerIce();
            }
        };

        // 2. Debugger Detection
        let lastTime = Date.now();
        const debuggerTimer = setInterval(() => {
            const currentTime = Date.now();
            if (currentTime - lastTime > 100) {
                // Potential debugger pause detected
                triggerIce();
            }
            lastTime = currentTime;
            // debugger;
            debugger;
        }, 500);

        // 3. Shortcut Blocking (Extended for Sniffers/Scrapers)
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (Source/Inspect)
            // Ctrl+S (Save), Ctrl+P (Print)
            const isInspect = e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'u');
            const isScrape = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p');

            if (isInspect || isScrape) {
                e.preventDefault();
                triggerIce();
            }
        };

        // 4. Copy Detection (Scraping deterrent)
        const handleCopy = () => {
            const selection = window.getSelection()?.toString();
            if (selection && selection.length > 500) {
                triggerIce();
            }
        };

        // 4. Context Menu Detection
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            triggerIce();
        };

        window.addEventListener('resize', checkDevTools);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('copy', handleCopy);

        return () => {
            window.removeEventListener('resize', checkDevTools);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('copy', handleCopy);
            clearInterval(debuggerTimer);
        };
    }, [triggerIce]);

    return (
        <>
            {children}
            {isIceActive && <IceOverlay severity={breachLevel} />}
            {breachLevel >= 5 && <HackerTroll />}
        </>
    );
}
