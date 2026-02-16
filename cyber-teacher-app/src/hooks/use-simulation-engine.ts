'use client';

import { useEffect } from 'react';
import { useSimulationStore } from '@/store/simulation-store';
import { simulationEngine } from '@/engine';

export function useSimulationEngine() {
    const {
        setEntities,
        setConnections,
        setPackets,
        setNetworkHealth
    } = useSimulationStore();

    useEffect(() => {
        // Subscribe to engine world updates
        const unsubscribe = simulationEngine.subscribe((world) => {
            setEntities(world.nodes as any);
            setConnections(world.links as any);
            setPackets(world.packets as any);
            setNetworkHealth(100); // Or sync from world metrics if available

            // Optionally sync logs if not handled elsewhere
            if (world.logs && world.logs.length > 0) {
                // This might need a more sophisticated sync to avoid duplicates
            }
        });

        // Start the engine if it's not running
        if (!simulationEngine.isRunning()) {
            simulationEngine.start();
        }

        return () => {
            // Note: We DON'T stop the engine here because we want it to persist!
            // The simulation continues in the background even if the React UI unmounts/remounts.
            unsubscribe();
        };
    }, [setEntities, setConnections, setPackets, setNetworkHealth]);

    return simulationEngine;
}
