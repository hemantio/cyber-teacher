'use client';

import { useEffect, useCallback } from 'react';
import { useSimulationStore } from '@/store/simulation-store';
import { useSound } from './use-sound';

interface KeyboardShortcutHandlers {
    onToggleHelp?: () => void;
    onToggleSettings?: () => void;
}

/**
 * Hook to handle keyboard shortcuts for the simulation
 */
export function useKeyboardShortcuts(handlers?: KeyboardShortcutHandlers) {
    const {
        isPlaying,
        isPaused,
        play,
        pause,
        nextStep,
        previousStep,
        setPlaybackSpeed,
        playbackSpeed,
        currentLesson,
        currentStepIndex
    } = useSimulationStore();

    const { playClick } = useSound();

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Ignore if user is typing in an input
        if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        const key = event.key.toLowerCase();
        const hasCtrl = event.ctrlKey || event.metaKey;
        const hasShift = event.shiftKey;

        switch (key) {
            // Playback controls
            case ' ': // Space - Play/Pause
                event.preventDefault();
                playClick();
                if (isPlaying && !isPaused) {
                    pause();
                } else {
                    play();
                }
                break;

            case 'arrowright': // Right Arrow - Next step
                if (!hasCtrl && currentLesson) {
                    event.preventDefault();
                    playClick();
                    nextStep();
                }
                break;

            case 'arrowleft': // Left Arrow - Previous step
                if (!hasCtrl && currentLesson) {
                    event.preventDefault();
                    playClick();
                    previousStep();
                }
                break;

            case '1': // Speed 0.5x
                if (!hasCtrl) {
                    playClick();
                    setPlaybackSpeed(0.5);
                }
                break;

            case '2': // Speed 1x
                if (!hasCtrl) {
                    playClick();
                    setPlaybackSpeed(1);
                }
                break;

            case '3': // Speed 2x
                if (!hasCtrl) {
                    playClick();
                    setPlaybackSpeed(2);
                }
                break;

            case 'r': // Reset to beginning
                if (!hasCtrl && currentLesson) {
                    playClick();
                    useSimulationStore.getState().setCurrentStep(0);
                }
                break;

            case 'h': // Help
            case '?':
                if (!hasCtrl) {
                    playClick();
                    handlers?.onToggleHelp?.();
                }
                break;

            case ',': // Settings (Cmd/Ctrl + ,)
                if (hasCtrl) {
                    event.preventDefault();
                    playClick();
                    handlers?.onToggleSettings?.();
                }
                break;

            case 'escape': // Close modals
                playClick();
                handlers?.onToggleHelp?.();
                break;

            case 'home': // Jump to first step
                if (currentLesson) {
                    event.preventDefault();
                    playClick();
                    useSimulationStore.getState().setCurrentStep(0);
                }
                break;

            case 'end': // Jump to last step
                if (currentLesson) {
                    event.preventDefault();
                    playClick();
                    useSimulationStore.getState().setCurrentStep(currentLesson.steps.length - 1);
                }
                break;
        }
    }, [isPlaying, isPaused, play, pause, nextStep, previousStep, setPlaybackSpeed, currentLesson, playClick, handlers]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return null;
}

// Keyboard shortcuts reference
export const KEYBOARD_SHORTCUTS = [
    { key: 'Space', description: 'Play / Pause simulation' },
    { key: '←', description: 'Previous step' },
    { key: '→', description: 'Next step' },
    { key: '1', description: 'Speed 0.5x' },
    { key: '2', description: 'Speed 1x (normal)' },
    { key: '3', description: 'Speed 2x' },
    { key: 'R', description: 'Reset to beginning' },
    { key: 'Home', description: 'Jump to first step' },
    { key: 'End', description: 'Jump to last step' },
    { key: 'H / ?', description: 'Toggle help' },
    { key: 'Ctrl + ,', description: 'Open settings' },
    { key: 'Esc', description: 'Close modals' },
];
