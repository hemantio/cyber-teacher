// Lesson Engine - Executes lesson steps and manages simulation state

import { useSimulationStore } from '@/store/simulation-store';
import { LessonStep, Lesson } from '@/types/lessons';
import { PACKET_SPEEDS } from '@/types/packets';

export class LessonEngine {
    private stepTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private packetIntervalIds: ReturnType<typeof setInterval>[] = [];

    constructor() {
        // Bind methods
        this.executeStep = this.executeStep.bind(this);
        this.cleanup = this.cleanup.bind(this);
    }

    /**
     * Initialize a lesson - sets up initial entities and connections
     */
    initializeLesson(lesson: Lesson) {
        const store = useSimulationStore.getState();

        // Clear existing state
        store.clearEntities();
        store.clearConnections();
        store.clearPackets();
        store.clearLogs();
        store.setNetworkHealth(100);

        // Spawn initial entities
        if (lesson.initialEntities) {
            lesson.initialEntities.forEach((spawn) => {
                store.addEntity({
                    id: spawn.id,
                    type: spawn.type,
                    position: spawn.position,
                    status: spawn.initialStatus || 'idle',
                    metadata: spawn.metadata || {}
                });
            });
        }

        // Create initial connections
        if (lesson.initialConnections) {
            lesson.initialConnections.forEach((conn) => {
                store.addConnection({
                    id: conn.id,
                    sourceId: conn.sourceId,
                    targetId: conn.targetId,
                    style: conn.style || 'solid',
                    status: 'idle'
                });
            });
        }

        store.loadLesson(lesson);
        store.addLog({
            type: 'info',
            message: `Lesson initialized: ${lesson.title}`
        });
    }

    /**
     * Execute a single lesson step
     */
    executeStep(step: LessonStep) {
        const store = useSimulationStore.getState();

        store.addLog({
            type: 'info',
            message: `Step: ${step.ui.title}`
        });

        // Spawn new entities
        if (step.spawn) {
            step.spawn.forEach((spawn) => {
                store.addEntity({
                    id: spawn.id,
                    type: spawn.type,
                    position: spawn.position,
                    status: spawn.initialStatus || 'idle',
                    metadata: spawn.metadata || {}
                });

                store.addLog({
                    type: 'success',
                    message: `${spawn.type} "${spawn.metadata?.label || spawn.id}" appeared`,
                    entityId: spawn.id
                });
            });
        }

        // Remove entities
        if (step.removeEntities) {
            step.removeEntities.forEach((id) => {
                store.removeEntity(id);
                store.addLog({
                    type: 'info',
                    message: `Entity ${id} removed`
                });
            });
        }

        // Create connections
        if (step.connections) {
            step.connections.forEach((conn) => {
                store.addConnection({
                    id: conn.id,
                    sourceId: conn.sourceId,
                    targetId: conn.targetId,
                    style: conn.style || 'solid',
                    status: 'active'
                });
            });
        }

        // Remove connections
        if (step.removeConnections) {
            step.removeConnections.forEach((id) => {
                store.removeConnection(id);
            });
        }

        // Update entities
        if (step.updateEntities) {
            step.updateEntities.forEach((update) => {
                if (update.status) {
                    store.updateEntityStatus(update.id, update.status);
                }
                // TODO: Handle metadata updates
            });
        }

        // Update connections
        if (step.updateConnections) {
            step.updateConnections.forEach((update) => {
                if (update.style) {
                    store.updateConnectionStyle(update.id, update.style);
                }
            });
        }

        // Spawn packets
        if (step.packets) {
            step.packets.forEach((packetWave) => {
                const baseInterval = packetWave.interval || 300;

                for (let i = 0; i < packetWave.count; i++) {
                    const intervalId = setTimeout(() => {
                        const currentStore = useSimulationStore.getState();
                        if (!currentStore.isPlaying || currentStore.isPaused) return;

                        currentStore.addPacket({
                            id: `packet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                            connectionId: packetWave.connectionId,
                            protocol: packetWave.protocol,
                            progress: 0,
                            speed: PACKET_SPEEDS[packetWave.protocol],
                            direction: packetWave.direction || 'forward'
                        });

                        currentStore.addLog({
                            type: 'info',
                            message: `${packetWave.protocol} packet sent`,
                            protocol: packetWave.protocol
                        });
                    }, i * baseInterval);

                    this.packetIntervalIds.push(intervalId as unknown as ReturnType<typeof setInterval>);
                }
            });
        }
    }

    /**
     * Advance to the next step after duration
     */
    scheduleNextStep(durationMs: number, onComplete: () => void) {
        this.stepTimeoutId = setTimeout(() => {
            onComplete();
        }, durationMs);
    }

    /**
     * Cleanup timers
     */
    cleanup() {
        if (this.stepTimeoutId) {
            clearTimeout(this.stepTimeoutId);
            this.stepTimeoutId = null;
        }

        this.packetIntervalIds.forEach((id) => clearTimeout(id));
        this.packetIntervalIds = [];
    }
}

// Singleton instance
export const lessonEngine = new LessonEngine();
