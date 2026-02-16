'use client';

import { LeftPanel } from '@/components/ui/LeftPanel';
import { RightPanel } from '@/components/ui/RightPanel';
import { useEffect } from 'react';
import { useSimulationStore } from '@/store/simulation-store';

export default function SandboxPage() {
    const { resetToSandbox } = useSimulationStore();

    useEffect(() => {
        resetToSandbox();
    }, [resetToSandbox]);

    return (
        <>
            <div className="w-64 flex-shrink-0">
                <LeftPanel />
            </div>
            {/* The canvas is in the layout, we just provide the sidebars here */}
            <div className="flex-1" />
            <div className="w-72 flex-shrink-0">
                <RightPanel />
            </div>
        </>
    );
}
