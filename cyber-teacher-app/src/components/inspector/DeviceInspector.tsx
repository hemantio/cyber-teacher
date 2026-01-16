'use client';

// Device Inspector Panel
// Full detail view with 6 tabs: Overview, Metrics, Network, Security, Processes, Education

import { useState, useEffect } from 'react';
import {
    InspectorPanel,
    InspectorTabs,
    InspectorSection,
    InfoRow,
    Badge,
} from './InspectorPanel';
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
    HealthIcon,
} from '@/components/ui/CyberIcons';
import {
    Monitor,
    Activity,
    Network,
    ShieldAlert,
    Cpu,
    BookOpen,
    HardDrive,
    Wifi,
    Clock,
    Server,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Lock,
    Unlock,
} from 'lucide-react';
import type { DeviceData, SecurityLevel, RiskLevel } from '@/types/simulation-data';

interface DeviceInspectorProps {
    open: boolean;
    onClose: () => void;
    device: DeviceData | null;
}

// Map entity type to icon
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

// Tab definitions
const TABS = [
    { id: 'overview', label: 'Overview', icon: <CyberIcon icon={Monitor} size="sm" /> },
    { id: 'metrics', label: 'Metrics', icon: <CyberIcon icon={Activity} size="sm" /> },
    { id: 'network', label: 'Network', icon: <CyberIcon icon={Network} size="sm" /> },
    { id: 'security', label: 'Security', icon: <CyberIcon icon={ShieldAlert} size="sm" /> },
    { id: 'processes', label: 'Processes', icon: <CyberIcon icon={Cpu} size="sm" /> },
    { id: 'education', label: 'Learn', icon: <CyberIcon icon={BookOpen} size="sm" /> },
];

// Security level colors
const SECURITY_COLORS: Record<SecurityLevel, { color: string; variant: 'success' | 'warning' | 'error' | 'info' }> = {
    low: { color: '#EF4444', variant: 'error' },
    medium: { color: '#F59E0B', variant: 'warning' },
    high: { color: '#22C55E', variant: 'success' },
    critical: { color: '#8B5CF6', variant: 'info' },
};

const RISK_COLORS: Record<RiskLevel, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    none: 'success',
    low: 'info',
    medium: 'warning',
    high: 'error',
    critical: 'error',
};

// Format uptime
function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

// Format bytes
function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB/s`;
}

export function DeviceInspector({ open, onClose, device }: DeviceInspectorProps) {
    const [activeTab, setActiveTab] = useState('overview');

    // Reset tab when device changes
    useEffect(() => {
        if (device) setActiveTab('overview');
    }, [device?.id]);

    if (!device) return null;

    const IconComponent = TYPE_ICONS[device.type] || PCIcon;
    const securityInfo = SECURITY_COLORS[device.securityLevel];

    return (
        <InspectorPanel
            open={open}
            onClose={onClose}
            title={device.name}
            icon={<IconComponent size="lg" glow />}
        >
            {/* Device Header */}
            <div className="px-5 py-4 flex items-center gap-4 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-400">{device.type}</span>
                        <StatusLED status={device.status === 'online' ? 'active' : device.status === 'under_attack' ? 'critical' : 'warning'} size="sm" />
                    </div>
                    <div className="text-xs font-mono text-cyan-400">{device.ip}</div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: device.health > 70 ? '#22C55E' : device.health > 40 ? '#F59E0B' : '#EF4444' }}>
                        {device.health}%
                    </div>
                    <div className="text-xs text-slate-500">Health</div>
                </div>
            </div>

            {/* Tabs */}
            <InspectorTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'overview' && <OverviewTab device={device} securityInfo={securityInfo} />}
                {activeTab === 'metrics' && <MetricsTab device={device} />}
                {activeTab === 'network' && <NetworkTab device={device} />}
                {activeTab === 'security' && <SecurityTab device={device} />}
                {activeTab === 'processes' && <ProcessesTab device={device} />}
                {activeTab === 'education' && <EducationTab device={device} />}
            </div>
        </InspectorPanel>
    );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

function OverviewTab({ device, securityInfo }: { device: DeviceData; securityInfo: typeof SECURITY_COLORS[SecurityLevel] }) {
    return (
        <>
            <InspectorSection title="Device Information">
                <div className="space-y-1">
                    <InfoRow label="Name" value={device.name} />
                    <InfoRow label="Role" value={device.role} />
                    <InfoRow label="Type" value={device.type} />
                    <InfoRow label="Status" value={
                        <Badge variant={device.status === 'online' ? 'success' : device.status === 'under_attack' ? 'error' : 'warning'}>
                            {device.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                    } />
                </div>
            </InspectorSection>

            <InspectorSection title="Network Configuration">
                <div className="space-y-1">
                    <InfoRow label="IP Address" value={device.ip} mono />
                    <InfoRow label="MAC Address" value={device.mac} mono />
                    <InfoRow label="Subnet" value={device.subnet} mono />
                    <InfoRow label="Gateway" value={device.gateway} mono />
                </div>
            </InspectorSection>

            <InspectorSection title="System">
                <div className="space-y-1">
                    <InfoRow label="Operating System" value={device.os} />
                    <InfoRow label="Uptime" value={formatUptime(device.uptime)} />
                    <InfoRow label="Security Level" value={
                        <Badge variant={securityInfo.variant}>{device.securityLevel.toUpperCase()}</Badge>
                    } />
                </div>
            </InspectorSection>
        </>
    );
}

function MetricsTab({ device }: { device: DeviceData }) {
    const { metrics } = device;

    return (
        <>
            <InspectorSection title="CPU & Memory">
                <div className="space-y-4">
                    {/* CPU */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-400">CPU Usage</span>
                            <span className="text-xs font-medium text-cyan-400">{metrics.cpuCurrent}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30, 41, 59, 0.8)' }}>
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${metrics.cpuCurrent}%`,
                                    background: metrics.cpuCurrent > 80 ? '#EF4444' : metrics.cpuCurrent > 60 ? '#F59E0B' : '#22C55E',
                                }}
                            />
                        </div>
                        {/* Mini graph */}
                        <div className="flex items-end gap-0.5 h-8 mt-2">
                            {metrics.cpu.slice(-30).map((val, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded-t"
                                    style={{
                                        height: `${val}%`,
                                        background: val > 80 ? '#EF4444' : val > 60 ? '#F59E0B' : '#22D3EE',
                                        opacity: 0.6,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Memory */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-400">Memory</span>
                            <span className="text-xs font-medium text-cyan-400">
                                {metrics.memoryUsed}MB / {metrics.memoryTotal}MB ({metrics.memory}%)
                            </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30, 41, 59, 0.8)' }}>
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${metrics.memory}%`,
                                    background: metrics.memory > 80 ? '#EF4444' : metrics.memory > 60 ? '#F59E0B' : '#8B5CF6',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </InspectorSection>

            <InspectorSection title="Network Activity">
                <div className="space-y-1">
                    <InfoRow label="Inbound" value={formatBytes(metrics.networkIn)} />
                    <InfoRow label="Outbound" value={formatBytes(metrics.networkOut)} />
                    <InfoRow label="Packet Rate" value={`${metrics.packetRate} pkt/s`} />
                    <InfoRow label="Active Connections" value={metrics.activeConnections.toString()} />
                    <InfoRow label="Error Rate" value={`${metrics.errorRate}/s`} />
                </div>
            </InspectorSection>
        </>
    );
}

function NetworkTab({ device }: { device: DeviceData }) {
    const { network } = device;

    return (
        <>
            <InspectorSection title="Open Ports">
                <div className="space-y-2">
                    {network.openPorts.length === 0 ? (
                        <div className="text-xs text-slate-500 italic">No open ports</div>
                    ) : (
                        network.openPorts.map((port) => (
                            <div key={port.port} className="flex items-center justify-between p-2 rounded" style={{ background: 'rgba(30, 41, 59, 0.5)' }}>
                                <div>
                                    <span className="font-mono text-xs text-cyan-400">{port.port}</span>
                                    <span className="text-xs text-slate-400 ml-2">{port.service}</span>
                                </div>
                                <Badge variant={port.state === 'open' ? 'success' : 'default'}>{port.protocol}</Badge>
                            </div>
                        ))
                    )}
                </div>
            </InspectorSection>

            <InspectorSection title="Active Protocols" collapsible defaultOpen={false}>
                <div className="flex flex-wrap gap-1">
                    {network.activeProtocols.map((proto) => (
                        <Badge key={proto} variant="info">{proto}</Badge>
                    ))}
                </div>
            </InspectorSection>

            <InspectorSection title="DHCP Status">
                <InfoRow label="Status" value={<Badge variant={network.dhcpStatus === 'active' ? 'success' : 'default'}>{network.dhcpStatus.toUpperCase()}</Badge>} />
                {network.dhcpLease && <InfoRow label="Lease Remaining" value={formatUptime(network.dhcpLease)} />}
            </InspectorSection>
        </>
    );
}

function SecurityTab({ device }: { device: DeviceData }) {
    const { security } = device;

    return (
        <>
            <InspectorSection title="Current Threats">
                {security.currentThreats.length === 0 ? (
                    <div className="flex items-center gap-2 text-green-400">
                        <CyberIcon icon={CheckCircle} size="sm" />
                        <span className="text-xs">No active threats detected</span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {security.currentThreats.map((threat) => (
                            <div key={threat.id} className="p-2 rounded border" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-red-400">{threat.name}</span>
                                    <Badge variant={RISK_COLORS[threat.severity]}>{threat.severity.toUpperCase()}</Badge>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">{threat.type}</div>
                            </div>
                        ))}
                    </div>
                )}
            </InspectorSection>

            <InspectorSection title="Vulnerabilities" collapsible>
                {security.vulnerabilities.length === 0 ? (
                    <div className="text-xs text-slate-500 italic">No known vulnerabilities</div>
                ) : (
                    <div className="space-y-2">
                        {security.vulnerabilities.map((vuln) => (
                            <div key={vuln.id} className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-slate-300">{vuln.name}</span>
                                    {vuln.cve && <span className="text-xs text-slate-500 ml-2">({vuln.cve})</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={RISK_COLORS[vuln.severity]}>{vuln.severity}</Badge>
                                    {vuln.patched && <CyberIcon icon={CheckCircle} size="xs" color="#22C55E" />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </InspectorSection>

            <InspectorSection title="Quarantine Status">
                <div className="flex items-center gap-2">
                    <CyberIcon icon={security.quarantineStatus ? Lock : Unlock} size="sm" color={security.quarantineStatus ? '#F59E0B' : '#22C55E'} />
                    <span className="text-xs text-slate-300">
                        {security.quarantineStatus ? 'Device is quarantined' : 'Device is not quarantined'}
                    </span>
                </div>
            </InspectorSection>
        </>
    );
}

function ProcessesTab({ device }: { device: DeviceData }) {
    const { processes } = device;

    const renderProcess = (proc: typeof processes.services[0]) => (
        <div key={proc.pid} className="flex items-center justify-between p-2 rounded" style={{ background: proc.malicious ? 'rgba(239, 68, 68, 0.1)' : 'rgba(30, 41, 59, 0.5)' }}>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">PID {proc.pid}</span>
                    <span className="text-xs text-slate-200 truncate">{proc.name}</span>
                    {proc.malicious && <Badge variant="error">MALICIOUS</Badge>}
                </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
                <span className="text-cyan-400">{proc.cpu}%</span>
                <span className="text-purple-400">{proc.memory}MB</span>
            </div>
        </div>
    );

    return (
        <>
            <InspectorSection title="Running Services">
                <div className="space-y-1">
                    {processes.services.length === 0 ? (
                        <div className="text-xs text-slate-500 italic">No services running</div>
                    ) : (
                        processes.services.map(renderProcess)
                    )}
                </div>
            </InspectorSection>

            {processes.maliciousProcesses.length > 0 && (
                <InspectorSection title="Malicious Processes">
                    <div className="space-y-1">
                        {processes.maliciousProcesses.map(renderProcess)}
                    </div>
                </InspectorSection>
            )}

            <InspectorSection title="Network Processes" collapsible defaultOpen={false}>
                <div className="space-y-1">
                    {processes.networkProcesses.map(renderProcess)}
                </div>
            </InspectorSection>
        </>
    );
}

function EducationTab({ device }: { device: DeviceData }) {
    const { education } = device;

    return (
        <>
            <InspectorSection title="What is this device?">
                <p className="text-sm text-slate-300 leading-relaxed">{education.description}</p>
            </InspectorSection>

            <InspectorSection title="Why it matters">
                <p className="text-sm text-slate-300 leading-relaxed">{education.importance}</p>
            </InspectorSection>

            <InspectorSection title="Real-World Examples" collapsible>
                <ul className="space-y-2">
                    {education.realWorldExamples.map((example, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            {example}
                        </li>
                    ))}
                </ul>
            </InspectorSection>

            <InspectorSection title="Common Attacks" collapsible>
                <div className="flex flex-wrap gap-1">
                    {education.commonAttacks.map((attack) => (
                        <Badge key={attack} variant="error">{attack}</Badge>
                    ))}
                </div>
            </InspectorSection>

            <InspectorSection title="Recommended Defenses" collapsible>
                <div className="flex flex-wrap gap-1">
                    {education.commonDefenses.map((defense) => (
                        <Badge key={defense} variant="success">{defense}</Badge>
                    ))}
                </div>
            </InspectorSection>
        </>
    );
}
