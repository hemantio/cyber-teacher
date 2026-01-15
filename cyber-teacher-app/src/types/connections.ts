// Connection type definitions for the 2D cybersecurity simulator

export type ConnectionStyle =
    | "solid"      // Normal traffic
    | "dotted"     // Discovery/probing
    | "pulsing"    // Attack in progress
    | "encrypted"  // TLS/HTTPS secure
    | "blocked";   // Blocked/disabled

export type ConnectionStatus =
    | "idle"
    | "active"
    | "attack"
    | "blocked"
    | "secure";

export interface Connection {
    id: string;
    sourceId: string;
    targetId: string;
    style: ConnectionStyle;
    status: ConnectionStatus;
    protocol?: string;
    bandwidth?: number; // Visual thickness
    animated?: boolean;
}

// Visual configuration for connection styles
export const CONNECTION_VISUALS: Record<ConnectionStyle, {
    strokeWidth: number;
    dashArray?: string;
    color: string;
    glowColor?: string;
    animationSpeed: number;
}> = {
    solid: {
        strokeWidth: 2,
        color: '#64748B', // slate
        animationSpeed: 0
    },
    dotted: {
        strokeWidth: 2,
        dashArray: '5,5',
        color: '#94A3B8', // slate-400
        animationSpeed: 1
    },
    pulsing: {
        strokeWidth: 3,
        color: '#EF4444', // red
        glowColor: '#FCA5A5',
        animationSpeed: 2
    },
    encrypted: {
        strokeWidth: 2,
        color: '#22C55E', // green
        glowColor: '#86EFAC',
        animationSpeed: 0.5
    },
    blocked: {
        strokeWidth: 2,
        dashArray: '6,4',
        color: '#F97316', // orange
        glowColor: '#FDBA74',
        animationSpeed: 0
    }
};
