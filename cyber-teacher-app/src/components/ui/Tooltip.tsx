'use client';

// Base Tooltip Component
// Floating tooltip with smart positioning and animations

import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';

interface TooltipProps {
    children: ReactNode;
    visible: boolean;
    x: number;
    y: number;
    offset?: { x: number; y: number };
    delay?: number;
    className?: string;
}

export function Tooltip({
    children,
    visible,
    x,
    y,
    offset = { x: 12, y: 12 },
    delay = 0,
    className = '',
}: TooltipProps) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [shouldRender, setShouldRender] = useState(false);
    const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Handle mounting for portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Calculate position avoiding screen edges
    const calculatePosition = useCallback(() => {
        if (!tooltipRef.current) return { x: 0, y: 0 };

        const tooltip = tooltipRef.current;
        const rect = tooltip.getBoundingClientRect();
        const padding = 16;

        let posX = x + offset.x;
        let posY = y + offset.y;

        // Flip horizontally if too close to right edge
        if (posX + rect.width > window.innerWidth - padding) {
            posX = x - rect.width - offset.x;
        }

        // Flip vertically if too close to bottom edge
        if (posY + rect.height > window.innerHeight - padding) {
            posY = y - rect.height - offset.y;
        }

        // Keep within left bound
        if (posX < padding) {
            posX = padding;
        }

        // Keep within top bound
        if (posY < padding) {
            posY = padding;
        }

        return { x: posX, y: posY };
    }, [x, y, offset]);

    // Handle visibility with delay
    useEffect(() => {
        if (visible) {
            clearTimeout(hideTimeoutRef.current);

            if (delay > 0) {
                showTimeoutRef.current = setTimeout(() => {
                    setShouldRender(true);
                }, delay);
            } else {
                setShouldRender(true);
            }
        } else {
            clearTimeout(showTimeoutRef.current);

            // Short delay before hiding for smoother experience
            hideTimeoutRef.current = setTimeout(() => {
                setShouldRender(false);
            }, 100);
        }

        return () => {
            clearTimeout(showTimeoutRef.current);
            clearTimeout(hideTimeoutRef.current);
        };
    }, [visible, delay]);

    // Update position when visible and recalculate
    useEffect(() => {
        if (shouldRender) {
            // Wait for render then calculate position
            requestAnimationFrame(() => {
                setPosition(calculatePosition());
            });
        }
    }, [shouldRender, calculatePosition, x, y]);

    // Animate in/out
    useEffect(() => {
        if (!tooltipRef.current) return;

        if (shouldRender) {
            anime({
                targets: tooltipRef.current,
                opacity: [0, 1],
                scale: [0.95, 1],
                translateY: [5, 0],
                duration: 200,
                easing: 'easeOutExpo',
            });
        }
    }, [shouldRender]);

    if (!mounted || !shouldRender) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            className={`fixed z-[9999] pointer-events-none ${className}`}
            style={{
                left: position.x,
                top: position.y,
                opacity: 0,
            }}
        >
            {children}
        </div>,
        document.body
    );
}

// Tooltip content wrapper with cyber styling
interface TooltipContentProps {
    children: ReactNode;
    variant?: 'default' | 'info' | 'warning' | 'error' | 'success';
    className?: string;
}

const VARIANT_STYLES = {
    default: {
        border: 'rgba(34, 211, 238, 0.3)',
        glow: 'rgba(34, 211, 238, 0.2)',
    },
    info: {
        border: 'rgba(59, 130, 246, 0.3)',
        glow: 'rgba(59, 130, 246, 0.2)',
    },
    warning: {
        border: 'rgba(245, 158, 11, 0.3)',
        glow: 'rgba(245, 158, 11, 0.2)',
    },
    error: {
        border: 'rgba(239, 68, 68, 0.3)',
        glow: 'rgba(239, 68, 68, 0.2)',
    },
    success: {
        border: 'rgba(34, 197, 94, 0.3)',
        glow: 'rgba(34, 197, 94, 0.2)',
    },
};

export function TooltipContent({
    children,
    variant = 'default',
    className = '',
}: TooltipContentProps) {
    const styles = VARIANT_STYLES[variant];

    return (
        <div
            className={`rounded-lg backdrop-blur-md p-3 ${className}`}
            style={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: `1px solid ${styles.border}`,
                boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px ${styles.glow}`,
                maxWidth: '320px',
            }}
        >
            {children}
        </div>
    );
}

// Hook for managing tooltip state
export function useTooltip(delay = 300) {
    const [state, setState] = useState({
        visible: false,
        x: 0,
        y: 0,
        data: null as unknown,
    });

    const show = useCallback((x: number, y: number, data?: unknown) => {
        setState({ visible: true, x, y, data: data ?? null });
    }, []);

    const hide = useCallback(() => {
        setState(prev => ({ ...prev, visible: false }));
    }, []);

    const updatePosition = useCallback((x: number, y: number) => {
        setState(prev => ({ ...prev, x, y }));
    }, []);

    return {
        ...state,
        show,
        hide,
        updatePosition,
        delay,
    };
}
