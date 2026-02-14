'use client';

import { useEffect, useState } from 'react';

export function HackerTroll() {
    const [phase, setPhase] = useState<'kernel' | 'troll' | 'bios'>('kernel');
    const [memoryDumpPercent, setMemoryDumpPercent] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setMemoryDumpPercent(Math.floor(Math.random() * 100));
        }, 0);
        const timer = setTimeout(() => {
            setPhase('troll');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (phase === 'troll') {
            const timer = setTimeout(() => {
                setPhase('bios');
            }, 6000);
            return () => clearTimeout(timer);
        }
        if (phase === 'bios') {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    if (phase === 'kernel') {
        return (
            <div className="fixed inset-0 z-[11000] bg-blue-700 text-white font-mono p-10 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-8">SYSTEM FAILURE [0xDEADBEEF]</h1>
                <p className="mb-4">A critical error has occurred and the system must be rebooted.</p>
                <p className="mb-4">Reason: INTRUSION_ATTEMPT_FROM_UNAUTHORIZED_ENTITY</p>
                <p className="mb-8">Memory dump in progress... {memoryDumpPercent}% complete</p>
                <p className="text-blue-200">*** STOP: 0x0000007B (0xF78D2524, 0xC0000034, 0x00000000, 0x00000000)</p>
            </div>
        );
    }

    if (phase === 'bios') {
        return (
            <div className="fixed inset-0 z-[11000] bg-black text-white font-mono p-10 flex flex-col items-start justify-start border-4 border-gray-800">
                <div className="w-full border-b border-gray-700 mb-6 pb-2 flex justify-between">
                    <span className="font-bold">Cyber-BIOS v2.0.77</span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>

                <div className="space-y-2 animate-pulse">
                    <p className="text-green-400">Initialize CPU............ OK</p>
                    <p className="text-green-400">Memory Test............... 64512KB OK</p>
                    <p className="text-red-500 font-bold underline">ERROR: PACKET_SNIFFER_DETECTED (0x00E4)</p>
                    <p className="text-red-500 font-bold">SYSTEM INTEGRITY COMPROMISED</p>
                    <p className="mt-8 text-white">RESTARTING SYSTEM TO PURGE UNKNOWN INTERFACE...</p>
                    <p className="mt-4">Press DEL to enter Setup (BLOCKED)</p>
                </div>

                <div className="mt-auto text-gray-500 text-[10px]">
                    (C) 2026 CYBER TEACHER CORP. ALL RIGHTS RESERVED.
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[11000] bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative px-7 py-4 bg-black rounded-lg leading-none flex flex-col items-center space-y-4">
                    <span className="text-4xl font-black text-white italic tracking-tighter">SURPRISE GIFT!</span>
                    <video
                        autoPlay
                        loop
                        className="w-full max-w-md rounded-lg shadow-2xl"
                        poster="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHprazZzMnRibW9jZnl3ZmV4ZndpZno1Z3M3Zmt6dm5ueXl3ZmdhZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif"
                    >
                        <source src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHprazZzMnRibW9jZnl3ZmV4ZndpZno1Z3M3Zmt6dm5ueXl3ZmdhZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.mp4" type="video/mp4" />
                    </video>
                    <p className="text-cyan-400 font-mono text-center">
                        Nice try, script kiddie! <br />
                        System has logged your IP: 127.0.0.1
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all"
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            </div>
        </div>
    );
}
