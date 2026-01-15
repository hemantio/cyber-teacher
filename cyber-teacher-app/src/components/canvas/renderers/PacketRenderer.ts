// Enhanced Packet renderer with glow halos, motion trails, protocol-based behavior
// DHCP = medium, DNS = fast, HTTPS = steady, Attack = bursty clusters

import { PACKET_COLORS } from '@/types/packets';
import { Position } from '@/types/entities';

// Protocol-specific speeds (used externally)
export const ENHANCED_PACKET_SPEEDS: Record<string, number> = {
    DHCP: 0.012,      // Medium
    ARP: 0.018,       // Fast
    DNS: 0.022,       // Fast
    TCP: 0.015,       // Steady
    HTTPS: 0.014,     // Steady, secure
    ATTACK: 0.025,    // Bursty, aggressive
    SYN: 0.025,       // Attack variant
    DEFAULT: 0.015
};

export function drawPacket(
    ctx: CanvasRenderingContext2D,
    packet: { protocol: string; progress: number; direction: string },
    sourcePos: Position,
    targetPos: Position
) {
    const visual = PACKET_COLORS[packet.protocol as keyof typeof PACKET_COLORS] || PACKET_COLORS.TCP;
    const time = Date.now() / 1000;

    // Calculate direction
    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);

    // Offset from entity edges
    const offsetStart = 55;
    const offsetEnd = 55;
    const adjustedLength = length - offsetStart - offsetEnd;

    // Calculate packet position
    let progress = packet.progress;
    if (packet.direction === 'reverse') {
        progress = 1 - progress;
    }

    const startX = sourcePos.x + Math.cos(angle) * offsetStart;
    const startY = sourcePos.y + Math.sin(angle) * offsetStart;

    const x = startX + Math.cos(angle) * (adjustedLength * progress);
    const y = startY + Math.sin(angle) * (adjustedLength * progress);

    ctx.save();

    // ============================================
    // MOTION TRAIL (behind packet)
    // ============================================

    const trailLength = packet.protocol === 'ATTACK' ? 8 : 6;
    const trailSpacing = 0.015;

    for (let i = trailLength; i > 0; i--) {
        const trailProgress = Math.max(0, progress - i * trailSpacing);
        const trailX = startX + Math.cos(angle) * (adjustedLength * trailProgress);
        const trailY = startY + Math.sin(angle) * (adjustedLength * trailProgress);

        const alpha = ((trailLength - i) / trailLength) * 0.5;
        const size = visual.size * (1 - i * 0.1);

        // Trail glow
        ctx.fillStyle = visual.glow;
        ctx.globalAlpha = alpha * 0.4;
        ctx.beginPath();
        ctx.arc(trailX, trailY, size * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Trail core
        ctx.fillStyle = visual.fill;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(trailX, trailY, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    // ============================================
    // OUTER GLOW HALO
    // ============================================

    // Large outer halo
    const haloPulse = 1 + Math.sin(time * 8) * 0.2;
    ctx.shadowColor = visual.glow;
    ctx.shadowBlur = visual.size * 2 * haloPulse;

    // Glow ring
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = visual.glow;
    ctx.beginPath();
    ctx.arc(x, y, visual.size * 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    // ============================================
    // MAIN PACKET BODY
    // ============================================

    // Outer ring
    ctx.fillStyle = visual.fill;
    ctx.beginPath();
    ctx.arc(x, y, visual.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Inner highlight (3D effect without 3D)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x - visual.size / 6, y - visual.size / 6, visual.size / 4, 0, Math.PI * 2);
    ctx.fill();

    // ============================================
    // PROTOCOL-SPECIFIC DECORATORS
    // ============================================

    if (packet.protocol === 'ATTACK') {
        drawAttackPacketEffects(ctx, x, y, visual.size, time);
    } else if (packet.protocol === 'HTTPS') {
        drawSecurePacketIndicator(ctx, x, y, visual.size);
    } else if (packet.protocol === 'DNS') {
        drawDnsPacketIndicator(ctx, x, y, visual.size);
    }

    // ============================================
    // DIRECTIONAL INDICATOR (small arrow)
    // ============================================

    const arrowAngle = packet.direction === 'reverse' ? angle + Math.PI : angle;
    drawPacketDirectionArrow(ctx, x, y, visual.size, arrowAngle, visual.fill);

    ctx.restore();
}

// ============================================
// PROTOCOL-SPECIFIC EFFECTS
// ============================================

function drawAttackPacketEffects(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    size: number,
    time: number
) {
    // Rotating danger spikes
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    const spikeCount = 6;
    const rotation = time * 4;

    for (let i = 0; i < spikeCount; i++) {
        const spikeAngle = ((Math.PI * 2) / spikeCount) * i + rotation;
        const innerR = size * 0.6;
        const outerR = size * 1.2;

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(spikeAngle) * innerR, y + Math.sin(spikeAngle) * innerR);
        ctx.lineTo(x + Math.cos(spikeAngle) * outerR, y + Math.sin(spikeAngle) * outerR);
        ctx.stroke();
    }

    // Danger pulse ring
    const pulseSize = size * (1.5 + Math.sin(time * 10) * 0.3);
    ctx.globalAlpha = 0.2 + Math.sin(time * 10) * 0.1;
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 1;
}

function drawSecurePacketIndicator(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    size: number
) {
    // Green security ring
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
}

function drawDnsPacketIndicator(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    size: number
) {
    // Question mark-like dots for DNS query visualization
    ctx.fillStyle = '#A855F7';
    ctx.globalAlpha = 0.5;
    const dotCount = 3;
    for (let i = 0; i < dotCount; i++) {
        const dotAngle = (Math.PI * 2 / dotCount) * i - Math.PI / 2;
        const dotX = x + Math.cos(dotAngle) * size * 0.7;
        const dotY = y + Math.sin(dotAngle) * size * 0.7;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawPacketDirectionArrow(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    size: number,
    angle: number,
    color: string
) {
    const arrowSize = size * 0.4;
    const arrowX = x + Math.cos(angle) * size * 0.8;
    const arrowY = y + Math.sin(angle) * size * 0.8;

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(
        arrowX + Math.cos(angle) * arrowSize,
        arrowY + Math.sin(angle) * arrowSize
    );
    ctx.lineTo(
        arrowX + Math.cos(angle + Math.PI * 0.7) * arrowSize * 0.6,
        arrowY + Math.sin(angle + Math.PI * 0.7) * arrowSize * 0.6
    );
    ctx.lineTo(
        arrowX + Math.cos(angle - Math.PI * 0.7) * arrowSize * 0.6,
        arrowY + Math.sin(angle - Math.PI * 0.7) * arrowSize * 0.6
    );
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
}

// ============================================
// PACKET CLUSTER (for attack visualization)
// ============================================

export function drawPacketCluster(
    ctx: CanvasRenderingContext2D,
    centerX: number, centerY: number,
    count: number,
    protocol: string
) {
    const visual = PACKET_COLORS[protocol as keyof typeof PACKET_COLORS] || PACKET_COLORS.TCP;
    const clusterRadius = 15;
    const time = Date.now() / 1000;

    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + time * 2;
        const radius = clusterRadius * (0.5 + Math.random() * 0.5);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = visual.size * 0.6;

        // Mini packet
        ctx.fillStyle = visual.fill;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

// Create a burst of packets (for attack visualization)
export function createPacketBurst(
    connectionId: string,
    protocol: keyof typeof PACKET_COLORS,
    count: number,
    direction: 'forward' | 'reverse' = 'forward'
): Array<{
    id: string;
    connectionId: string;
    protocol: string;
    progress: number;
    speed: number;
    direction: 'forward' | 'reverse';
}> {
    const packets = [];
    const baseSpeed = ENHANCED_PACKET_SPEEDS[protocol] || ENHANCED_PACKET_SPEEDS.DEFAULT;

    for (let i = 0; i < count; i++) {
        packets.push({
            id: `packet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            connectionId,
            protocol,
            progress: i * 0.06, // Stagger packets
            speed: baseSpeed * (0.9 + Math.random() * 0.2), // Slight speed variation
            direction
        });
    }

    return packets;
}
