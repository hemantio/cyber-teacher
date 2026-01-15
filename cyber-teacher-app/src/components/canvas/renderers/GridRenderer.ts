// Enhanced Grid renderer with health-based status layer
// Normal = blue, Under attack = red tint, Recovering = amber fade

const GRID_SIZE = 40;
const MAJOR_GRID_INTERVAL = 5;

// Health colors interpolation
const COLORS = {
    healthy: { r: 56, g: 189, b: 248 },    // Cyan blue
    warning: { r: 251, g: 191, b: 36 },    // Amber
    danger: { r: 239, g: 68, b: 68 }       // Red
};

export function drawGrid(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    offsetX: number,
    offsetY: number,
    networkHealth: number = 100,
    isUnderAttack: boolean = false
) {
    const halfWidth = canvasWidth / 2;
    const halfHeight = canvasHeight / 2;

    // Calculate the grid offset
    const gridOffsetX = offsetX % GRID_SIZE;
    const gridOffsetY = offsetY % GRID_SIZE;

    // Calculate start and end points for grid lines
    const startX = -halfWidth - GRID_SIZE * 2;
    const endX = halfWidth + GRID_SIZE * 2;
    const startY = -halfHeight - GRID_SIZE * 2;
    const endY = halfHeight + GRID_SIZE * 2;

    ctx.save();

    // ============================================
    // HEALTH-BASED COLOR CALCULATION
    // ============================================

    const time = Date.now() / 1000;

    // Interpolate color based on health
    let gridColor: { r: number; g: number; b: number };
    let brightness = 0.08; // Base brightness

    if (networkHealth > 70) {
        // Healthy: Blue with slight breathing
        gridColor = COLORS.healthy;
        brightness = 0.06 + Math.sin(time * 0.5) * 0.02;
    } else if (networkHealth > 40) {
        // Warning: Transition to amber
        const t = (70 - networkHealth) / 30;
        gridColor = interpolateColor(COLORS.healthy, COLORS.warning, t);
        brightness = 0.08 + Math.sin(time * 1.5) * 0.03;
    } else {
        // Danger: Red with faster pulse
        const t = Math.min(1, (40 - networkHealth) / 40);
        gridColor = interpolateColor(COLORS.warning, COLORS.danger, t);
        brightness = 0.1 + Math.sin(time * 3) * 0.05;
    }

    // Attack mode intensifies everything
    if (isUnderAttack) {
        gridColor = interpolateColor(gridColor, COLORS.danger, 0.4);
        brightness += 0.04 + Math.sin(time * 6) * 0.03;
    }

    const colorStr = `rgba(${gridColor.r}, ${gridColor.g}, ${gridColor.b}`;
    const gridLineColor = `${colorStr}, ${brightness})`;
    const majorLineColor = `${colorStr}, ${brightness * 2})`;

    // ============================================
    // VIGNETTE GRADIENT FOR HEALTH
    // ============================================

    // Draw subtle vignette that intensifies with low health
    const vignetteIntensity = Math.max(0, 0.5 - networkHealth / 200);
    if (vignetteIntensity > 0) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(halfWidth, halfHeight));
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.7, `rgba(${COLORS.danger.r}, ${COLORS.danger.g}, ${COLORS.danger.b}, ${vignetteIntensity * 0.1})`);
        gradient.addColorStop(1, `rgba(${COLORS.danger.r}, ${COLORS.danger.g}, ${COLORS.danger.b}, ${vignetteIntensity * 0.25})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(-halfWidth, -halfHeight, canvasWidth, canvasHeight);
    }

    // ============================================
    // GRID LINES
    // ============================================

    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = startX - gridOffsetX; x <= endX; x += GRID_SIZE) {
        const gridIndex = Math.round((x - gridOffsetX) / GRID_SIZE);
        const isMajor = gridIndex % MAJOR_GRID_INTERVAL === 0;

        ctx.strokeStyle = isMajor ? majorLineColor : gridLineColor;
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = startY - gridOffsetY; y <= endY; y += GRID_SIZE) {
        const gridIndex = Math.round((y - gridOffsetY) / GRID_SIZE);
        const isMajor = gridIndex % MAJOR_GRID_INTERVAL === 0;

        ctx.strokeStyle = isMajor ? majorLineColor : gridLineColor;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
    }

    // ============================================
    // ORIGIN CROSSHAIR
    // ============================================

    ctx.strokeStyle = `${colorStr}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 4]);

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(0, 30);
    ctx.stroke();

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // Center dot
    ctx.setLineDash([]);
    ctx.fillStyle = `${colorStr}, 0.5)`;
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    // ============================================
    // HEALTH INDICATOR CORNERS
    // ============================================

    // Draw subtle health gradient in corners when health is low
    if (networkHealth < 80) {
        const cornerIntensity = (80 - networkHealth) / 80 * 0.15;

        // Top-left corner glow
        const tlGradient = ctx.createRadialGradient(
            -halfWidth, -halfHeight, 0,
            -halfWidth, -halfHeight, 200
        );
        tlGradient.addColorStop(0, `${colorStr}, ${cornerIntensity})`);
        tlGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = tlGradient;
        ctx.fillRect(-halfWidth, -halfHeight, 200, 200);

        // Bottom-right corner glow
        const brGradient = ctx.createRadialGradient(
            halfWidth, halfHeight, 0,
            halfWidth, halfHeight, 200
        );
        brGradient.addColorStop(0, `${colorStr}, ${cornerIntensity})`);
        brGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = brGradient;
        ctx.fillRect(halfWidth - 200, halfHeight - 200, 200, 200);
    }

    // Origin label
    ctx.font = '10px monospace';
    ctx.fillStyle = `${colorStr}, 0.4)`;
    ctx.textAlign = 'left';
    ctx.fillText('(0, 0)', 8, -8);

    ctx.restore();
}

// Helper function to interpolate between two colors
function interpolateColor(
    c1: { r: number; g: number; b: number },
    c2: { r: number; g: number; b: number },
    t: number
): { r: number; g: number; b: number } {
    return {
        r: Math.round(c1.r + (c2.r - c1.r) * t),
        g: Math.round(c1.g + (c2.g - c1.g) * t),
        b: Math.round(c1.b + (c2.b - c1.b) * t)
    };
}

// Draw a local attack indicator at a specific position
export function drawAttackZone(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    radius: number = 150
) {
    const time = Date.now() / 1000;
    const pulse = 0.1 + Math.sin(time * 4) * 0.05;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(239, 68, 68, ${pulse})`);
    gradient.addColorStop(0.5, `rgba(239, 68, 68, ${pulse * 0.5})`);
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Draw recovery indicator
export function drawRecoveryZone(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    radius: number = 100
) {
    const time = Date.now() / 1000;
    const fade = 0.05 + Math.sin(time * 2) * 0.03;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(34, 197, 94, ${fade})`);
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}
