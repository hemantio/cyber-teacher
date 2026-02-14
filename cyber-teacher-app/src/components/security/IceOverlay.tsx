'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface IceOverlayProps {
    severity: number;
}

export function IceOverlay({ severity }: IceOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [glitchData, setGlitchData] = useState({ segfault: '', pid: 0, warning: '' }); // Updated initial state for warning

    useEffect(() => {
        setTimeout(() => {
            // The user's instruction included useMemo inside setTimeout, which is incorrect usage.
            // I'm interpreting the intent as generating the glitch data including the warning
            // and setting it once, which is achieved by directly calculating it here.
            const warnings = [
                'SECURITY BREACH',
                'NETSCRAPER DETECTED',
                'WIRESHARK INTERCEPTED',
                'PACKET SNIFFER ACTIVE',
                'UNAUTHORIZED DOWNLOAD'
            ];
            setGlitchData({
                segfault: `0x${Math.random().toString(16).slice(2, 10)} > SEGFAULT AT 0x0045FF`,
                pid: Math.floor(Math.random() * 9999),
                warning: warnings[Math.floor(Math.random() * warnings.length)]
            });
        }, 0);
        if (!overlayRef.current || !textRef.current) return;

        // Intense glitch animation
        const timeline = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 100,
            loop: true
        });

        timeline
            .add({
                targets: overlayRef.current,
                backgroundColor: ['rgba(239, 68, 68, 0.1)', 'rgba(5, 10, 21, 0.4)', 'rgba(239, 68, 68, 0.2)'],
                translateX: [0, -5, 5, 0],
                opacity: [0.8, 1, 0.9],
            })
            .add({
                targets: textRef.current,
                skew: [0, -10, 10, 0],
                scale: [1, 1.05, 0.98, 1],
                filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
            });

        return () => timeline.pause();
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none overflow-hidden"
            style={{
                background: 'rgba(5, 10, 21, 0.8)',
                backdropFilter: 'blur(4px) contrast(150%)',
            }}
        >
            {/* Scanlines Effect */}
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

            <div ref={textRef} className="text-center space-y-4">
                <div className="text-6xl font-black text-red-500 tracking-tighter filter drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] uppercase">
                    [!] {glitchData.warning} [!]
                </div>
                <div className="text-2xl font-mono text-cyan-400 font-bold">
                    INTRUSION COUNTERMEASURES ACTIVE
                </div>
                <div className="text-sm font-mono text-red-400 opacity-80 uppercase tracking-widest">
                    Level {severity} Intrusion Detected • IP Trace Initiated • Data Encryption Locked
                </div>

                {/* Random code bits floating */}
                <div className="absolute top-10 left-10 text-[10px] text-green-500/30 font-mono">
                    {glitchData.segfault}
                </div>
                <div className="absolute bottom-20 right-10 text-[10px] text-green-500/30 font-mono">
                    {`KILL_PROC --PID ${glitchData.pid} --FORCE`}
                </div>
            </div>

            {/* Red perimeter glow */}
            <div className="absolute inset-0 border-[20px] border-red-500/20 animate-pulse" />
        </div>
    );
}
