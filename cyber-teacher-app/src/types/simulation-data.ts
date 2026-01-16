// Simulation Data Types - Comprehensive schema for interactive information system

// ============================================================================
// EDUCATION LEVELS
// ============================================================================

export type EducationLevel = 'beginner' | 'intermediate' | 'expert';

// ============================================================================
// DEVICE / NODE TYPES
// ============================================================================

export type DeviceStatus =
    | 'online'
    | 'offline'
    | 'under_attack'
    | 'isolated'
    | 'compromised'
    | 'booting'
    | 'shutting_down';

export type SecurityLevel = 'low' | 'medium' | 'high' | 'critical';

export type RiskLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';

export interface ProcessInfo {
    pid: number;
    name: string;
    cpu: number;
    memory: number;
    network: boolean;
    status: 'running' | 'sleeping' | 'stopped' | 'zombie';
    malicious?: boolean;
}

export interface PortInfo {
    port: number;
    service: string;
    protocol: 'TCP' | 'UDP';
    state: 'open' | 'closed' | 'filtered';
}

export interface RouteEntry {
    destination: string;
    gateway: string;
    interface: string;
    metric: number;
}

export interface ArpEntry {
    ip: string;
    mac: string;
    interface: string;
    type: 'dynamic' | 'static';
}

export interface DnsCacheEntry {
    domain: string;
    ip: string;
    ttl: number;
    type: 'A' | 'AAAA' | 'CNAME' | 'MX';
}

export interface ThreatInfo {
    id: string;
    name: string;
    type: string;
    severity: RiskLevel;
    timestamp: number;
    source?: string;
}

export interface AttackEvent {
    id: string;
    attackType: string;
    timestamp: number;
    duration: number;
    blocked: boolean;
    source: string;
}

export interface Vulnerability {
    id: string;
    cve?: string;
    name: string;
    severity: RiskLevel;
    exploitable: boolean;
    patched: boolean;
}

export interface FirewallRule {
    id: string;
    action: 'allow' | 'deny' | 'drop';
    direction: 'inbound' | 'outbound' | 'both';
    protocol: string;
    port?: number;
    source?: string;
    destination?: string;
}

export interface Alert {
    id: string;
    type: string;
    message: string;
    severity: RiskLevel;
    timestamp: number;
    acknowledged: boolean;
}

export interface DeviceEducation {
    description: string;
    importance: string;
    realWorldExamples: string[];
    commonAttacks: string[];
    commonDefenses: string[];
}

export interface DeviceMetrics {
    cpu: number[];           // Historical CPU % (last 60 samples)
    cpuCurrent: number;      // Current CPU %
    memory: number;          // Current memory %
    memoryUsed: number;      // MB
    memoryTotal: number;     // MB
    networkIn: number;       // bytes/s
    networkOut: number;      // bytes/s
    packetRate: number;      // packets/s
    activeConnections: number;
    errorRate: number;       // errors/s
}

export interface DeviceNetwork {
    openPorts: PortInfo[];
    activeProtocols: string[];
    routingTable: RouteEntry[];
    arpTable: ArpEntry[];
    dnsCache: DnsCacheEntry[];
    dhcpStatus: 'active' | 'static' | 'expired' | 'none';
    dhcpLease?: number;      // seconds remaining
}

export interface DeviceSecurity {
    currentThreats: ThreatInfo[];
    attackHistory: AttackEvent[];
    vulnerabilities: Vulnerability[];
    firewallRules: FirewallRule[];
    idsAlerts: Alert[];
    quarantineStatus: boolean;
    lastScan?: number;
}

export interface DeviceProcesses {
    services: ProcessInfo[];
    networkProcesses: ProcessInfo[];
    maliciousProcesses: ProcessInfo[];
}

// Full device data
export interface DeviceData {
    // Basic (always shown on hover)
    id: string;
    name: string;
    type: string;
    status: DeviceStatus;
    ip: string;
    health: number;          // 0-100

    // Overview tab
    role: string;
    mac: string;
    subnet: string;
    gateway: string;
    uptime: number;          // seconds
    os: string;
    securityLevel: SecurityLevel;

    // Extended data
    metrics: DeviceMetrics;
    network: DeviceNetwork;
    security: DeviceSecurity;
    processes: DeviceProcesses;
    education: DeviceEducation;
}

// ============================================================================
// CONNECTION / PACKET TYPES
// ============================================================================

export type ProtocolType =
    | 'ARP'
    | 'DHCP'
    | 'DNS'
    | 'TCP'
    | 'UDP'
    | 'HTTP'
    | 'HTTPS'
    | 'TLS'
    | 'ICMP'
    | 'SSH'
    | 'FTP';

export interface OsiLayerInfo {
    layer: number;
    name: string;
    protocol: string;
    data: string;
    size: number;
}

export interface ConnectionData {
    id: string;
    sourceId: string;
    sourceName: string;
    targetId: string;
    targetName: string;
    protocol: ProtocolType;
    packetType: string;
    size: number;            // bytes
    encrypted: boolean;
    latency: number;         // ms
    direction: 'outbound' | 'inbound' | 'bidirectional';

    // Inspector data
    osiBreakdown: OsiLayerInfo[];
    headers: Record<string, string>;
    payloadType: string;
    handshakeState: string;
    sessionDuration: number; // seconds
    riskLevel: RiskLevel;
}

// ============================================================================
// ATTACK TYPES
// ============================================================================

export type AttackCategory = 'network' | 'web' | 'endpoint' | 'social';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Impact = 'low' | 'medium' | 'high' | 'critical';

export interface AttackPhase {
    name: string;
    description: string;
    duration: number;        // seconds
}

export interface AttackData {
    id: string;
    name: string;
    type: AttackCategory;
    difficulty: Difficulty;
    impact: Impact;
    targets: string[];
    symptoms: string[];
    realWorldIncident: string;

    // Details
    phases: AttackPhase[];
    technicalMethod: string;
    packetBehavior: string;
    networkChanges: string[];
    whatBreaks: string[];
    whatToObserve: string[];
    detection: string[];
    defense: string[];

    // Education
    description: string;
    howItWorks: string;
}

// ============================================================================
// DEFENSE TYPES
// ============================================================================

export type PerformanceImpact = 'none' | 'low' | 'medium' | 'high';

export interface DefenseData {
    id: string;
    name: string;
    protectionType: string;
    blocks: string[];
    doesNotBlock: string[];
    performanceImpact: PerformanceImpact;
    whenToUse: string;

    // Details
    howItWorks: string;
    osiLayer: number;
    affectedDevices: string[];
    configuration: Record<string, string | number | boolean>;
    beforeAfter: {
        before: string;
        after: string;
    };

    // Education
    description: string;
    realWorldExample: string;
}

// ============================================================================
// PROTOCOL STEP TYPES
// ============================================================================

export interface ProtocolStep {
    id: string;
    name: string;
    purpose: string;
    technicalDescription: string;
    whyRequired: string;
    whatCouldGoWrong: string[];
    attacksTargetingStep: string[];

    // Details
    diagram?: string;
    messageFlow: { from: string; to: string; message: string }[];
    examplePacket?: string;
    failureScenarios: string[];
    securityImplications: string[];
    realWorldAnalogy: string;
}

// ============================================================================
// GLOBAL NETWORK STATE
// ============================================================================

export interface NetworkOverview {
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    activeAttacks: number;
    networkHealth: number;   // 0-100
    securityPosture: SecurityLevel;
    riskScore: number;       // 0-100
    trafficVolume: number;   // bytes/s
    packetsPerSecond: number;
}

// ============================================================================
// LOG TYPES
// ============================================================================

export type LogCategory = 'protocol' | 'security' | 'system' | 'attack' | 'defense';
export type LogSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface LogEntry {
    id: string;
    timestamp: number;
    category: LogCategory;
    severity: LogSeverity;
    source: string;
    message: string;
    details?: Record<string, unknown>;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export type InspectorType =
    | 'device'
    | 'connection'
    | 'attack'
    | 'defense'
    | 'protocol'
    | null;

export interface TooltipState {
    visible: boolean;
    x: number;
    y: number;
    type: 'node' | 'connection' | 'attack' | 'defense' | 'protocol' | null;
    data: unknown;
}

export interface InspectorState {
    open: boolean;
    type: InspectorType;
    data: DeviceData | ConnectionData | AttackData | DefenseData | ProtocolStep | null;
}
