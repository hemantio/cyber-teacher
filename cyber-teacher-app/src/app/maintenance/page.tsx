'use client';

import { TerminalIcon, ShieldAlertIcon } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-200 font-mono">
            <div className="max-w-md w-full bg-slate-900 border border-red-900/50 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                {/* Background pulse effect */}
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

                <div className="flex flex-col items-center text-center relative z-10">
                    <div className="mb-6 p-4 bg-red-950/30 rounded-full border border-red-500/20">
                        <ShieldAlertIcon className="w-12 h-12 text-red-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-red-400 mb-2 tracking-wider">
                        SYSTEM LOCKDOWN
                    </h1>

                    <div className="w-full h-px bg-red-900/50 my-4" />

                    <p className="text-slate-400 mb-6 leading-relaxed">
                        The Cyber Teacher simulation environment is currently unavailable due to maintenance or safety protocols.
                    </p>

                    <div className="w-full bg-slate-950 rounded border border-slate-800 p-4 text-left text-xs text-slate-500">
                        <div className="flex items-center gap-2 mb-2">
                            <TerminalIcon className="w-3 h-3" />
                            <span>SYSTEM_STATUS_LOG</span>
                        </div>
                        <div className="font-mono space-y-1">
                            <p>{'>'} ACCESS_DENIED</p>
                            <p>{'>'} PROTOCOL_OVERRIDE_ACTIVE</p>
                            <p>{'>'} CONNECTION_TERMINATED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
