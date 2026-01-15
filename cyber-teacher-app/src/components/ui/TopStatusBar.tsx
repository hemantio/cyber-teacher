'use client';

import { useSimulationStore } from '@/store/simulation-store';

export function TopStatusBar() {
    const { currentLesson, currentStepIndex, isPlaying, isPaused, networkHealth } = useSimulationStore();

    const currentStep = currentLesson?.steps[currentStepIndex];
    const stepCount = currentLesson?.steps.length || 0;

    // Health color based on percentage
    const healthColor =
        networkHealth > 70 ? '#22C55E' :
            networkHealth > 40 ? '#F59E0B' : '#EF4444';

    // Status indicator
    const statusText = !isPlaying ? 'READY' : isPaused ? 'PAUSED' : 'RUNNING';
    const statusColor = !isPlaying ? '#64748B' : isPaused ? '#F59E0B' : '#22C55E';

    return (
        <header
            className="h-12 md:h-16 flex items-center justify-between px-2 md:px-4 border-b relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0D1B2A 0%, #0A1628 50%, #071220 100%)',
                borderColor: '#22D3EE40'
            }}
        >
            {/* Scan line effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #22D3EE 2px, #22D3EE 3px)'
                }}
            />

            {/* Left: Title & Lesson */}
            <div className="flex items-center gap-2 md:gap-5 relative z-10">
                {/* Logo/Brand */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div
                        className="w-7 h-7 md:w-9 md:h-9 rounded-lg flex items-center justify-center relative"
                        style={{
                            background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 50%, #8B5CF6 100%)',
                            boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                        }}
                    >
                        <span className="text-white text-sm md:text-lg">🛡️</span>
                    </div>
                    <div>
                        <h1
                            className="text-sm md:text-base font-black tracking-wider"
                            style={{
                                background: 'linear-gradient(90deg, #22D3EE 0%, #3B82F6 50%, #22D3EE 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
                            }}
                        >
                            CYBERGUARD
                        </h1>
                        <p
                            className="hidden md:block text-[9px] tracking-[0.2em] uppercase font-medium"
                            style={{ color: '#64748B' }}
                        >
                            Interactive Network Simulation
                        </p>
                    </div>
                </div>

                {/* Lesson Info - Hidden on mobile */}
                {currentLesson && (
                    <div
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{
                            background: 'rgba(34, 211, 238, 0.1)',
                            border: '1px solid rgba(34, 211, 238, 0.2)'
                        }}
                    >
                        <span className="text-xs" style={{ color: '#22D3EE' }}>
                            Step {currentStepIndex + 1} of {stepCount}
                        </span>
                        <span
                            className="text-[10px] px-2 py-0.5 rounded"
                            style={{ background: 'rgba(34, 211, 238, 0.2)', color: '#22D3EE' }}
                        >
                            {currentStep?.ui.title || 'Loading...'}
                        </span>
                    </div>
                )}
            </div>

            {/* Center: Step Title - Hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                <h2
                    className="text-lg font-bold tracking-wide"
                    style={{ color: '#E2E8F0' }}
                >
                    {currentStep?.ui.title || 'Select a Lesson'}
                </h2>
            </div>

            {/* Right: Status & Health */}
            <div className="flex items-center gap-2 md:gap-4">
                {/* Status */}
                <div className="flex items-center gap-1 md:gap-2">
                    <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: statusColor }}
                    />
                    <span
                        className="text-[10px] md:text-xs font-bold uppercase tracking-wider"
                        style={{ color: statusColor }}
                    >
                        {statusText}
                    </span>
                </div>

                {/* Health Bar */}
                <div className="flex items-center gap-1 md:gap-2">
                    <span className="hidden md:inline text-xs" style={{ color: '#64748B' }}>
                        Health:
                    </span>
                    <div
                        className="w-16 md:w-32 h-2 md:h-3 rounded-full overflow-hidden"
                        style={{
                            background: 'rgba(100, 116, 139, 0.2)',
                            border: '1px solid rgba(100, 116, 139, 0.3)'
                        }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${networkHealth}%`,
                                background: `linear-gradient(90deg, ${healthColor}80, ${healthColor})`
                            }}
                        />
                    </div>
                    <span
                        className="text-[10px] md:text-xs font-bold font-mono"
                        style={{ color: healthColor }}
                    >
                        {networkHealth}%
                    </span>
                </div>

                {/* FPS Indicator - Hidden on mobile */}
                <div
                    className="hidden md:block px-2 py-1 rounded text-[10px] font-mono"
                    style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        color: '#22C55E'
                    }}
                >
                    60 FPS
                </div>
            </div>
        </header>
    );
}
