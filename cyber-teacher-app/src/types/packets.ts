// Packet type definitions for the 2D cybersecurity simulator

export type PacketProtocol =
    | "DHCP"
    | "ARP"
    | "DNS"
    | "TCP"
    | "HTTPS"
    | "HTTP"
    | "ICMP"
    | "ATTACK";

export interface Packet {
    id: string;
    connectionId: string;
    protocol: PacketProtocol;
    progress: number; // 0-1, position along connection
    speed: number;    // Units per frame
    direction: 'forward' | 'reverse';
    metadata?: {
        payload?: string;
        size?: number;
    };
}

// Visual configuration for packet protocols
export const PACKET_COLORS: Record<PacketProtocol, {
    fill: string;
    glow: string;
    size: number;
}> = {
    DHCP: {
        fill: '#FACC15',  // yellow
        glow: '#FEF08A',
        size: 8
    },
    ARP: {
        fill: '#22D3EE',  // cyan
        glow: '#A5F3FC',
        size: 6
    },
    DNS: {
        fill: '#A855F7',  // purple
        glow: '#D8B4FE',
        size: 7
    },
    TCP: {
        fill: '#3B82F6',  // blue
        glow: '#93C5FD',
        size: 6
    },
    HTTPS: {
        fill: '#22C55E',  // green
        glow: '#86EFAC',
        size: 7
    },
    HTTP: {
        fill: '#64748B',  // slate
        glow: '#94A3B8',
        size: 6
    },
    ICMP: {
        fill: '#F97316',  // orange
        glow: '#FDBA74',
        size: 5
    },
    ATTACK: {
        fill: '#EF4444',  // red
        glow: '#FCA5A5',
        size: 10
    }
};

// Packet speed by protocol (relative units)
export const PACKET_SPEEDS: Record<PacketProtocol, number> = {
    DHCP: 0.01,
    ARP: 0.015,
    DNS: 0.02,
    TCP: 0.018,
    HTTPS: 0.015,
    HTTP: 0.02,
    ICMP: 0.025,
    ATTACK: 0.03
};
