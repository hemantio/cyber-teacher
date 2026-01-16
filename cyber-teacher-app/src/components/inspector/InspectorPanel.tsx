'use client';

// Inspector Panel - Slide-in detail panel from right
// Base component for all inspector variants

import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';
import { X } from 'lucide-react';
import { CyberIcon } from '@/components/ui/CyberIcons';

interface InspectorPanelProps {
    open: boolean;
    onClose: () => void;
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    width?: number;
}

export function InspectorPanel({
    open,
    onClose,
    title,
    icon,
    children,
    width = 480,
}: InspectorPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Handle open/close animations
    useEffect(() => {
        if (open) {
            setShouldRender(true);

            // Animate in
            requestAnimationFrame(() => {
                if (panelRef.current) {
                    anime({
                        targets: panelRef.current,
                        translateX: [width, 0],
                        opacity: [0, 1],
                        duration: 400,
                        easing: 'easeOutExpo',
                    });
                }
                if (backdropRef.current) {
                    anime({
                        targets: backdropRef.current,
                        opacity: [0, 1],
                        duration: 300,
                        easing: 'easeOutQuad',
                    });
                }
            });
        } else if (shouldRender) {
            // Animate out
            const panelAnimation = panelRef.current
                ? anime({
                    targets: panelRef.current,
                    translateX: [0, width],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInQuad',
                }).finished
                : Promise.resolve();

            const backdropAnimation = backdropRef.current
                ? anime({
                    targets: backdropRef.current,
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeOutQuad',
                }).finished
                : Promise.resolve();

            Promise.all([panelAnimation, backdropAnimation]).then(() => {
                setShouldRender(false);
            });
        }
    }, [open, shouldRender, width]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    if (!mounted || !shouldRender) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                style={{ opacity: 0 }}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                className="absolute top-0 right-0 h-full flex flex-col"
                style={{
                    width: `min(${width}px, 100vw)`,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 25, 0.99) 100%)',
                    borderLeft: '1px solid rgba(34, 211, 238, 0.2)',
                    boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(34, 211, 238, 0.1)',
                    transform: `translateX(${width}px)`,
                    opacity: 0,
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-5 py-4 border-b"
                    style={{ borderColor: 'rgba(34, 211, 238, 0.15)' }}
                >
                    <div className="flex items-center gap-3">
                        {icon}
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-slate-700/50"
                    >
                        <CyberIcon icon={X} size="sm" color="#94A3B8" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

// Tab system for inspector panels
interface Tab {
    id: string;
    label: string;
    icon?: ReactNode;
}

interface InspectorTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function InspectorTabs({ tabs, activeTab, onTabChange }: InspectorTabsProps) {
    return (
        <div
            className="flex border-b overflow-x-auto scrollbar-hide"
            style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}
        >
            {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${isActive
                                ? 'text-cyan-400 border-b-2 border-cyan-400'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                            }`}
                        style={isActive ? { marginBottom: '-1px' } : {}}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

// Section component for organizing content
interface InspectorSectionProps {
    title: string;
    children: ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
}

export function InspectorSection({
    title,
    children,
    collapsible = false,
    defaultOpen = true,
}: InspectorSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b" style={{ borderColor: 'rgba(71, 85, 105, 0.3)' }}>
            <button
                className={`w-full flex items-center justify-between px-5 py-3 text-left ${collapsible ? 'hover:bg-slate-800/30 cursor-pointer' : 'cursor-default'
                    }`}
                onClick={() => collapsible && setIsOpen(!isOpen)}
            >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {title}
                </span>
                {collapsible && (
                    <span className="text-slate-500">{isOpen ? '−' : '+'}</span>
                )}
            </button>
            {(!collapsible || isOpen) && (
                <div className="px-5 pb-4">{children}</div>
            )}
        </div>
    );
}

// Info row component
interface InfoRowProps {
    label: string;
    value: ReactNode;
    mono?: boolean;
}

export function InfoRow({ label, value, mono = false }: InfoRowProps) {
    return (
        <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-slate-500">{label}</span>
            <span className={`text-xs text-slate-200 ${mono ? 'font-mono' : ''}`}>
                {value}
            </span>
        </div>
    );
}

// Badge component
interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const BADGE_COLORS = {
    default: { bg: 'rgba(100, 116, 139, 0.2)', text: '#94A3B8', border: 'rgba(100, 116, 139, 0.3)' },
    success: { bg: 'rgba(34, 197, 94, 0.2)', text: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' },
    warning: { bg: 'rgba(245, 158, 11, 0.2)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' },
    error: { bg: 'rgba(239, 68, 68, 0.2)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
    info: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.3)' },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
    const colors = BADGE_COLORS[variant];
    return (
        <span
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
            style={{
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
            }}
        >
            {children}
        </span>
    );
}
