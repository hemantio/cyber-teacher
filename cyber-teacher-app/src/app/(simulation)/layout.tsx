'use client';

import { SimulationCanvas } from '@/components/canvas/SimulationCanvas';
import { EntityTooltip } from '@/components/canvas/EntityTooltip';
import { TopStatusBar } from '@/components/ui/TopStatusBar';
import { BottomControls } from '@/components/ui/BottomControls';
import { SvgOverlay } from '@/components/svg/SvgOverlay';
import { Navigation } from '@/components/layout/Navigation';
import { HelpOverlay } from '@/components/ui/HelpOverlay';
import { QuizModal } from '@/components/ui/QuizModal';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useSimulationStore } from '@/store/simulation-store';
import { useSimulationEngine } from '@/hooks/use-simulation-engine';
import { useState, useCallback } from 'react';

export default function SimulationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Initialize persistent simulation engine sync
    useSimulationEngine();

    const [showHelp, setShowHelp] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const { currentLesson } = useSimulationStore();

    const toggleHelp = useCallback(() => {
        setShowHelp(prev => !prev);
    }, []);

    const closeModals = useCallback(() => {
        setShowHelp(false);
        setShowQuiz(false);
    }, []);

    useKeyboardShortcuts({
        onToggleHelp: toggleHelp,
        onCloseModals: closeModals,
    });

    const handleQuizComplete = (score: number) => {
        console.log('Quiz completed with score:', score);
    };

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            <Navigation />
            <TopStatusBar />

            <div className="flex-1 flex overflow-hidden">
                {/* Side panels (children) */}
                {children}

                {/* Center - Canvas */}
                <div className="flex-1 relative overflow-hidden" style={{ background: 'var(--bg-canvas)' }}>
                    <SimulationCanvas />
                    <SvgOverlay />
                    <EntityTooltip />

                    {/* Help Button - Floating */}
                    <button
                        onClick={toggleHelp}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-20"
                        style={{
                            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                            border: '1px solid rgba(34, 211, 238, 0.4)',
                            boxShadow: '0 4px 15px rgba(34, 211, 238, 0.2)'
                        }}
                        title="Help (Press H)"
                    >
                        <span className="text-lg">❓</span>
                    </button>
                </div>
            </div>

            <BottomControls />

            <HelpOverlay isOpen={showHelp} onClose={() => setShowHelp(false)} />

            {currentLesson?.quiz && (
                <QuizModal
                    quiz={currentLesson.quiz}
                    isOpen={showQuiz}
                    onClose={() => setShowQuiz(false)}
                    onComplete={handleQuizComplete}
                />
            )}
        </div>
    );
}
