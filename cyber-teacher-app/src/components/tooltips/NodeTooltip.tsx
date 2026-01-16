'use client';

// Node/Device Tooltip
// Shows basic device info on hover

import { Tooltip, TooltipContent } from '@/components/ui/Tooltip';
import { StatusLED } from '@/components/ui/StatusLED';
import {
    PCIcon,
    RouterIcon,
    FirewallIcon,
    ServerIcon,
    AttackerIcon,
    CloudIcon,
    DNSIcon,
    ISPIcon,
    CyberIcon,
} from '@/components/ui/CyberIcons';
import { Shield, AlertTriangle, Lock, Wifi, WifiOff } from 'lucide-react';
import type { DeviceStatus } from '@/types/simulation-data';

interface NodeTooltipData {
    id: string;
    name: string;
    type: string;
    status: DeviceStatus;
    ip: string;
    health: number;
    role?: string;
}

interface NodeTooltipProps {
    visible: boolean;
    x: number;
    y: number;
    data: NodeTooltipData | null;
}

// Map entity type to icon component
const TYPE_ICONS: Record<string, React.ComponentType<any>> = {
    PC: PCIcon,
    Router: RouterIcon,
    Firewall: FirewallIcon,
    Server: ServerIcon,
    Attacker: AttackerIcon,
    Cloud: CloudIcon,
    DNS: DNSIcon,
    ISP: ISPIcon,
};

// Map status to display info
const STATUS_INFO: Record<DeviceStatus, { label: string; color: string; ledStatus: 'active' | 'warning' | 'critical' | 'idle' | 'offline' }> = {
    online: { label: 'Online', color: '#22C55E', ledStatus: 'active' },
    offline: { label: 'Offline', color: '#64748B', ledStatus: 'offline' },
    under_attack: { label: 'Under Attack', color: '#EF4444', ledStatus: 'critical' },
    isolated: { label: 'Isolated', color: '#F59E0B', ledStatus: 'warning' },
    compromised: { label: 'Compromised', color: '#DC2626', ledStatus: 'critical' },
    booting: { label: 'Booting...', color: '#3B82F6', ledStatus: 'idle' },
    shutting_down: { label: 'Shutting Down', color: '#64748B', ledStatus: 'idle' },
};

// Health bar color
function getHealthColor(health: number): string {
    if (health > 70) return '#22C55E';
    if (health > 40) return '#F59E0B';
    return '#EF4444';
}

export function NodeTooltip({ visible, x, y, data }: NodeTooltipProps) {
    if (!data) return null;

    const IconComponent = TYPE_ICONS[data.type] || PCIcon;
    const statusInfo = STATUS_INFO[data.status] || STATUS_INFO.online;
    const healthColor = getHealthColor(data.health);

    return (
        <Tooltip visible={visible} x={x} y={y} delay={200}>
            <TooltipContent variant={data.status === 'under_attack' ? 'error' : 'default'}>
                <div className="min-w-[200px]">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="p-2 rounded-lg"
                            style={{
                                background: 'rgba(34, 211, 238, 0.1)',
                                boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)',
                            }}
                        >
                            <IconComponent size="lg" glow glowIntensity={10} />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-white">{data.name}</div>
                            <div className="text-xs text-slate-400">{data.type}</div>
                        </div>
                        <StatusLED status={statusInfo.ledStatus} size="md" />
                    </div>

                    {/* Status Badge */}
                    <div
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium mb-3"
                        style={{
                            background: `${statusInfo.color}20`,
                            color: statusInfo.color,
                            border: `1px solid ${statusInfo.color}40`,
                        }}
                    >
                        {data.status === 'under_attack' && (
                            <CyberIcon icon={AlertTriangle} size="xs" color={statusInfo.color} />
                        )}
                        {data.status === 'isolated' && (
                            <CyberIcon icon={Lock} size="xs" color={statusInfo.color} />
                        )}
                        {data.status === 'online' && (
                            <CyberIcon icon={Wifi} size="xs" color={statusInfo.color} />
                        )}
                        {data.status === 'offline' && (
                            <CyberIcon icon={WifiOff} size="xs" color={statusInfo.color} />
                        )}
                        {statusInfo.label}
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-2">
                        {/* IP Address */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">IP Address</span>
                            <span className="text-xs font-mono text-cyan-400">{data.ip || 'N/A'}</span>
                        </div>

                        {/* Role */}
                        {data.role && (
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Role</span>
                                <span className="text-xs text-slate-300">{data.role}</span>
                            </div>
                        )}

                        {/* Health Bar */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-500">Health</span>
                                <span className="text-xs font-medium" style={{ color: healthColor }}>
                                    {data.health}%
                                </span>
                            </div>
                            <div
                                className="h-1.5 rounded-full overflow-hidden"
                                style={{ background: 'rgba(30, 41, 59, 0.8)' }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${data.health}%`,
                                        background: healthColor,
                                        boxShadow: `0 0 8px ${healthColor}`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Click hint */}
                    <div className="mt-3 pt-2 border-t border-slate-700/50">
                        <span className="text-[10px] text-slate-500">Click for details</span>
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

export type { NodeTooltipData };
