'use client';

import { useEffect, useCallback, useRef } from 'react';
import { soundManager, SoundCategory } from '@/lib/sound-engine';

/**
 * Hook to use the sound engine in React components
 */
export function useSound() {
    const initializedRef = useRef(false);

    // Initialize sound engine on first user interaction
    useEffect(() => {
        if (initializedRef.current) return;

        const handleInteraction = () => {
            soundManager.initialize();
            initializedRef.current = true;
            // Remove listeners after first interaction
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    const playClick = useCallback(() => {
        soundManager.play('click');
    }, []);

    const playHover = useCallback(() => {
        soundManager.play('hover');
    }, []);

    const playSuccess = useCallback(() => {
        soundManager.play('success');
    }, []);

    const playError = useCallback(() => {
        soundManager.play('error');
    }, []);

    const playNotification = useCallback(() => {
        soundManager.play('notification');
    }, []);

    const playBoot = useCallback(() => {
        soundManager.playBootSequence();
    }, []);

    const playConnect = useCallback(() => {
        soundManager.playConnectionSequence();
    }, []);

    const playAttack = useCallback((type?: 'ddos' | 'sql' | 'malware' | 'phishing' | 'mitm') => {
        soundManager.playAttackSequence(type);
    }, []);

    const playDefense = useCallback(() => {
        soundManager.playDefenseSequence();
    }, []);

    const playVictory = useCallback(() => {
        soundManager.playVictory();
    }, []);

    const playDefeat = useCallback(() => {
        soundManager.playDefeat();
    }, []);

    const setVolume = useCallback((category: SoundCategory, volume: number) => {
        soundManager.setVolume(category, volume);
    }, []);

    const setEnabled = useCallback((category: SoundCategory, enabled: boolean) => {
        soundManager.setEnabled(category, enabled);
    }, []);

    const getSettings = useCallback(() => {
        return soundManager.getSettings();
    }, []);

    const stopAll = useCallback(() => {
        soundManager.stopAll();
    }, []);

    return {
        // Basic sounds
        playClick,
        playHover,
        playSuccess,
        playError,
        playNotification,
        // Simulation sounds
        playBoot,
        playConnect,
        playAttack,
        playDefense,
        playVictory,
        playDefeat,
        // Settings
        setVolume,
        setEnabled,
        getSettings,
        stopAll,
    };
}
