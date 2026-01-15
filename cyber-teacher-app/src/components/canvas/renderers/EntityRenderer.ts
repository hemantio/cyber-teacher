// Enhanced Entity renderer with state-based visual feedback
// Implements: breathing glow, processing rings, attack pulsing, blocked states

import { NetworkEntity, ENTITY_VISUALS } from '@/types/entities';

// Animation time (updated externally for consistency)
let globalTime = 0;

export function updateEntityTime() {
    globalTime = Date.now();
}

const STATUS_COLORS: Record<string, string> = {
    idle: '#64748B',
    active: '#22C55E',
    under_attack: '#EF4444',
    blocked: '#F97316',
    connecting: '#22D3EE',
    disconnected: '#6B7280',
    overloaded: '#FBBF24',
    compromised: '#DC2626',
    processing: '#8B5CF6'
};

const STATUS_LABELS: Record<string, string> = {
    idle: 'IDLE',
    active: 'ACTIVE',
    under_attack: 'ATTACK',
    blocked: 'BLOCKED',
    connecting: 'CONNECTING',
    disconnected: 'OFFLINE',
    overloaded: 'OVERLOAD',
    compromised: 'BREACH',
    processing: 'PROCESSING'
};

export function drawEntity(
    ctx: CanvasRenderingContext2D,
    entity: NetworkEntity,
    isHighlighted: boolean = false
) {
    const visual = ENTITY_VISUALS[entity.type];
    const { x, y } = entity.position;
    const statusColor = STATUS_COLORS[entity.status] || STATUS_COLORS.idle;
    const time = globalTime / 1000;

    ctx.save();

    // Card dimensions
    const cardWidth = 100;
    const cardHeight = 120;
    const iconSize = 40;
    const cardLeft = x - cardWidth / 2;
    const cardTop = y - cardHeight / 2;

    // ============================================
    // STATE-BASED OUTER EFFECTS
    // ============================================

    // Draw state-specific background effects BEFORE the card
    drawStateEffects(ctx, entity, x, y, cardWidth, cardHeight, time, visual.color);

    // Highlight glow when node is related to log entry
    if (isHighlighted) {
        ctx.shadowColor = '#FACC15';
        ctx.shadowBlur = 40;
        ctx.fillStyle = 'rgba(250, 204, 21, 0.1)';
        ctx.beginPath();
        ctx.roundRect(cardLeft - 8, cardTop - 8, cardWidth + 16, cardHeight + 16, 14);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // ============================================
    // CARD BACKGROUND
    // ============================================

    // Card shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(cardLeft + 4, cardTop + 4, cardWidth, cardHeight, 10);
    ctx.fill();

    // Card background gradient
    const gradient = ctx.createLinearGradient(x, cardTop, x, cardTop + cardHeight);
    gradient.addColorStop(0, '#1E293B');
    gradient.addColorStop(0.5, '#151D2E');
    gradient.addColorStop(1, '#0F172A');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(cardLeft, cardTop, cardWidth, cardHeight, 10);
    ctx.fill();

    // Animated border based on state
    const borderColor = getAnimatedBorderColor(entity.status, visual.color, time);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = entity.status === 'under_attack' ? 3 : 2;

    // Dashed border for blocked state
    if (entity.status === 'blocked') {
        ctx.setLineDash([6, 4]);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // ============================================
    // ICON CONTAINER WITH STATE INDICATOR
    // ============================================

    const iconContainerSize = iconSize + 16;
    const iconContainerX = x - iconContainerSize / 2;
    const iconContainerY = cardTop + 10;

    // Icon container background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.roundRect(iconContainerX, iconContainerY, iconContainerSize, iconContainerSize, 8);
    ctx.fill();
    ctx.strokeStyle = `${visual.color}40`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Processing indicator ring
    if (entity.status === 'processing' || entity.status === 'connecting') {
        drawProcessingRing(ctx, x, iconContainerY + iconContainerSize / 2, iconContainerSize / 2 + 4, time);
    }

    // Draw entity icon
    drawEntityIcon(ctx, entity.type, x, iconContainerY + iconContainerSize / 2, iconSize, visual.color);

    // Blocked lock icon overlay
    if (entity.status === 'blocked') {
        drawLockIcon(ctx, x + iconContainerSize / 2 - 8, iconContainerY + 8, statusColor);
    }

    // ============================================
    // LABELS AND INFO
    // ============================================

    // Entity label
    const label = entity.metadata.label || entity.type;
    ctx.font = 'bold 12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#F1F5F9';

    const maxLabelWidth = cardWidth - 10;
    let displayLabel = label;
    if (ctx.measureText(label).width > maxLabelWidth) {
        while (ctx.measureText(displayLabel + '...').width > maxLabelWidth && displayLabel.length > 0) {
            displayLabel = displayLabel.slice(0, -1);
        }
        displayLabel += '...';
    }
    ctx.fillText(displayLabel, x, iconContainerY + iconContainerSize + 6);

    // IP Address
    const ipY = iconContainerY + iconContainerSize + 22;
    if (entity.metadata.ip) {
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(`IP: ${entity.metadata.ip}`, x, ipY);
    }

    // ============================================
    // STATUS BADGE
    // ============================================

    const statusLabel = STATUS_LABELS[entity.status] || 'IDLE';
    ctx.font = 'bold 9px monospace';
    const statusWidth = ctx.measureText(statusLabel).width + 14;
    const statusHeight = 16;
    const statusY = cardTop + cardHeight - statusHeight - 8;

    // Badge background with pulse for active states
    const badgeAlpha = entity.status === 'under_attack' || entity.status === 'compromised'
        ? 0.2 + Math.sin(time * 6) * 0.1
        : 0.15;

    ctx.fillStyle = statusColor.replace(')', `, ${badgeAlpha})`).replace('rgb', 'rgba').replace('#', '');
    // Convert hex to rgba
    ctx.fillStyle = hexToRgba(statusColor, badgeAlpha);
    ctx.strokeStyle = hexToRgba(statusColor, 0.6);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - statusWidth / 2, statusY, statusWidth, statusHeight, 4);
    ctx.fill();
    ctx.stroke();

    // Status text
    ctx.fillStyle = statusColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(statusLabel, x, statusY + statusHeight / 2);

    // ============================================
    // STATUS LED (Top Right)
    // ============================================

    const ledX = cardLeft + cardWidth - 12;
    const ledY = cardTop + 12;

    // Animated LED based on state
    const ledPulse = getStatusLedPulse(entity.status, time);

    // LED glow
    ctx.globalAlpha = 0.3 + ledPulse * 0.3;
    ctx.fillStyle = statusColor;
    ctx.beginPath();
    ctx.arc(ledX, ledY, 8 + ledPulse * 2, 0, Math.PI * 2);
    ctx.fill();

    // LED core
    ctx.globalAlpha = 0.7 + ledPulse * 0.3;
    ctx.beginPath();
    ctx.arc(ledX, ledY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.restore();
}

// ============================================
// STATE EFFECT RENDERERS
// ============================================

function drawStateEffects(
    ctx: CanvasRenderingContext2D,
    entity: NetworkEntity,
    x: number, y: number,
    width: number, height: number,
    time: number,
    baseColor: string
) {
    const status = entity.status;

    // Idle: Soft breathing glow
    if (status === 'idle') {
        const breath = 0.3 + Math.sin(time * 1.5) * 0.15;
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 12 * breath;
    }

    // Active: Brighter steady pulse
    else if (status === 'active') {
        const pulse = 0.7 + Math.sin(time * 3) * 0.2;
        ctx.shadowColor = '#22C55E';
        ctx.shadowBlur = 20 * pulse;
    }

    // Processing/Connecting: Rotating energy effect
    else if (status === 'processing' || status === 'connecting') {
        const pulse = 0.5 + Math.sin(time * 4) * 0.3;
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 25 * pulse;
    }

    // Overloaded: Amber flicker with jitter
    else if (status === 'overloaded') {
        const flicker = Math.random() > 0.7 ? 0.8 : 0.5; // Simulated flicker
        const jitter = Math.sin(time * 20) * 1.5;
        ctx.translate(jitter, jitter * 0.5);
        ctx.shadowColor = '#FBBF24';
        ctx.shadowBlur = 30 * flicker;
    }

    // Blocked: Red outline (no glow)
    else if (status === 'blocked') {
        ctx.shadowColor = '#F97316';
        ctx.shadowBlur = 15;

        // Draw lock overlay indicator
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#F97316';
        ctx.beginPath();
        ctx.roundRect(x - width / 2 - 4, y - height / 2 - 4, width + 8, height + 8, 12);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    // Under Attack: Red pulsing with intensity
    else if (status === 'under_attack') {
        const pulse = 0.5 + Math.sin(time * 6) * 0.4;
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 40 * pulse;

        // Draw danger ring
        ctx.globalAlpha = 0.1 + pulse * 0.15;
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, width / 1.5 + Math.sin(time * 4) * 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    // Compromised: Red pulsing ring with warning
    else if (status === 'compromised') {
        const pulse = 0.4 + Math.sin(time * 4) * 0.3;
        ctx.shadowColor = '#DC2626';
        ctx.shadowBlur = 35 * pulse;

        // Double danger ring
        ctx.globalAlpha = 0.15 + pulse * 0.1;
        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, width / 1.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, width / 1.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

function drawProcessingRing(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    radius: number,
    time: number
) {
    const rotation = time * 2;
    const dashCount = 8;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    for (let i = 0; i < dashCount; i++) {
        const angle = (Math.PI * 2 / dashCount) * i;
        const alpha = 0.3 + (i / dashCount) * 0.7;

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#22D3EE';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.arc(0, 0, radius, angle, angle + Math.PI / dashCount);
        ctx.stroke();
    }

    ctx.restore();
}

function drawLockIcon(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    // Lock body
    ctx.beginPath();
    ctx.roundRect(x - 5, y, 10, 8, 2);
    ctx.fill();

    // Lock shackle
    ctx.beginPath();
    ctx.arc(x, y, 4, Math.PI, 0);
    ctx.stroke();

    ctx.restore();
}

function getAnimatedBorderColor(status: string, baseColor: string, time: number): string {
    if (status === 'under_attack' || status === 'compromised') {
        const pulse = 0.5 + Math.sin(time * 6) * 0.5;
        return `rgba(239, 68, 68, ${pulse})`;
    }
    if (status === 'active') {
        return '#22C55E';
    }
    if (status === 'blocked') {
        return '#F97316';
    }
    if (status === 'overloaded') {
        const flicker = 0.6 + Math.sin(time * 10) * 0.4;
        return `rgba(251, 191, 36, ${flicker})`;
    }
    return baseColor;
}

function getStatusLedPulse(status: string, time: number): number {
    switch (status) {
        case 'idle':
            return 0.3 + Math.sin(time * 1.5) * 0.2; // Slow breathing
        case 'active':
            return 0.6 + Math.sin(time * 3) * 0.3; // Steady pulse
        case 'processing':
        case 'connecting':
            return 0.5 + Math.sin(time * 5) * 0.4; // Fast pulse
        case 'under_attack':
        case 'compromised':
            return 0.4 + Math.sin(time * 8) * 0.5; // Rapid pulse
        case 'overloaded':
            return Math.random() > 0.3 ? 0.8 : 0.3; // Flicker effect
        case 'blocked':
            return 0.5; // Steady
        default:
            return 0.4;
    }
}

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// ENTITY ICON DRAWING
// ============================================

function drawEntityIcon(
    ctx: CanvasRenderingContext2D,
    type: string,
    x: number, y: number,
    size: number,
    color: string
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const s = size / 2;

    switch (type) {
        case 'PC':
            // Monitor
            ctx.strokeRect(x - s * 0.7, y - s * 0.5, s * 1.4, s * 0.9);
            ctx.fillStyle = 'rgba(34, 211, 238, 0.2)';
            ctx.fillRect(x - s * 0.6, y - s * 0.4, s * 1.2, s * 0.7);
            // Stand
            ctx.beginPath();
            ctx.moveTo(x - s * 0.15, y + s * 0.4);
            ctx.lineTo(x + s * 0.15, y + s * 0.4);
            ctx.lineTo(x + s * 0.15, y + s * 0.6);
            ctx.lineTo(x - s * 0.15, y + s * 0.6);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - s * 0.35, y + s * 0.6);
            ctx.lineTo(x + s * 0.35, y + s * 0.6);
            ctx.stroke();
            break;

        case 'Router':
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.roundRect(x - s * 0.7, y - s * 0.25, s * 1.4, s * 0.5, 4);
            ctx.stroke();
            // Antennas
            ctx.beginPath();
            ctx.moveTo(x - s * 0.4, y - s * 0.25);
            ctx.lineTo(x - s * 0.5, y - s * 0.6);
            ctx.moveTo(x + s * 0.4, y - s * 0.25);
            ctx.lineTo(x + s * 0.5, y - s * 0.6);
            ctx.stroke();
            // Signal waves
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(x, y - s * 0.6, s * 0.2, Math.PI * 1.2, Math.PI * 1.8);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y - s * 0.6, s * 0.35, Math.PI * 1.2, Math.PI * 1.8);
            ctx.stroke();
            ctx.globalAlpha = 1;
            // LEDs
            ctx.fillStyle = '#22C55E';
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.arc(x + i * s * 0.2, y + s * 0.05, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            break;

        case 'Firewall':
            ctx.beginPath();
            ctx.moveTo(x, y - s * 0.6);
            ctx.lineTo(x + s * 0.5, y - s * 0.35);
            ctx.lineTo(x + s * 0.5, y + s * 0.15);
            ctx.quadraticCurveTo(x + s * 0.3, y + s * 0.5, x, y + s * 0.65);
            ctx.quadraticCurveTo(x - s * 0.3, y + s * 0.5, x - s * 0.5, y + s * 0.15);
            ctx.lineTo(x - s * 0.5, y - s * 0.35);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x - s * 0.2, y);
            ctx.lineTo(x - s * 0.05, y + s * 0.15);
            ctx.lineTo(x + s * 0.2, y - s * 0.1);
            ctx.stroke();
            break;

        case 'DNS':
            ctx.beginPath();
            ctx.ellipse(x, y - s * 0.35, s * 0.5, s * 0.2, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - s * 0.5, y - s * 0.35);
            ctx.lineTo(x - s * 0.5, y + s * 0.35);
            ctx.ellipse(x, y + s * 0.35, s * 0.5, s * 0.2, 0, Math.PI, 0, true);
            ctx.lineTo(x + s * 0.5, y - s * 0.35);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(x, y, s * 0.5, s * 0.15, 0, Math.PI, 0, true);
            ctx.stroke();
            break;

        case 'ISP':
            ctx.beginPath();
            ctx.arc(x, y, s * 0.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(x, y, s * 0.5, s * 0.2, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(x, y, s * 0.2, s * 0.5, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case 'Server':
            const layers = 3;
            const layerH = s * 0.35;
            for (let i = 0; i < layers; i++) {
                const ly = y - s * 0.5 + i * (layerH + 4);
                ctx.strokeRect(x - s * 0.55, ly, s * 1.1, layerH);
                ctx.fillStyle = i === 0 ? '#22C55E' : '#64748B';
                ctx.beginPath();
                ctx.arc(x + s * 0.35, ly + layerH / 2, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = color;
                ctx.globalAlpha = 0.4;
                ctx.beginPath();
                ctx.moveTo(x - s * 0.35, ly + layerH / 2);
                ctx.lineTo(x + s * 0.15, ly + layerH / 2);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
            break;

        case 'Attacker':
            ctx.fillStyle = '#0F172A';
            ctx.strokeStyle = '#EF4444';
            ctx.beginPath();
            ctx.moveTo(x, y - s * 0.55);
            ctx.lineTo(x + s * 0.55, y + s * 0.45);
            ctx.lineTo(x - s * 0.55, y + s * 0.45);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#EF4444';
            ctx.font = `bold ${s * 0.6}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('!', x, y + s * 0.1);
            break;

        case 'Cloud':
            ctx.beginPath();
            ctx.arc(x - s * 0.3, y + s * 0.1, s * 0.3, 0, Math.PI * 2);
            ctx.arc(x, y - s * 0.15, s * 0.4, 0, Math.PI * 2);
            ctx.arc(x + s * 0.35, y + s * 0.1, s * 0.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
            ctx.fill();
            break;

        default:
            ctx.beginPath();
            ctx.arc(x, y, s * 0.5, 0, Math.PI * 2);
            ctx.stroke();
    }

    ctx.restore();
}
