// Device Data Generator
// Generates realistic mock data for devices based on type

import type {
    DeviceData,
    DeviceStatus,
    DeviceMetrics,
    DeviceNetwork,
    DeviceSecurity,
    DeviceProcesses,
    DeviceEducation,
    SecurityLevel,
    PortInfo,
    ProcessInfo,
} from '@/types/simulation-data';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMAC(): string {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
        mac += hex[randomInt(0, 15)] + hex[randomInt(0, 15)];
        if (i < 5) mac += ':';
    }
    return mac;
}

function generateCPUHistory(): number[] {
    const base = randomInt(20, 60);
    return Array.from({ length: 60 }, () =>
        Math.max(0, Math.min(100, base + randomInt(-20, 20)))
    );
}

// ============================================================================
// DEVICE TYPE CONFIGS
// ============================================================================

interface DeviceTypeConfig {
    roles: string[];
    os: string[];
    ports: PortInfo[];
    protocols: string[];
    services: { name: string; cpu: number; memory: number }[];
    education: DeviceEducation;
}

const DEVICE_CONFIGS: Record<string, DeviceTypeConfig> = {
    PC: {
        roles: ['End User Workstation', 'Developer Machine', 'Admin Console', 'Guest Device'],
        os: ['Windows 11', 'Windows 10', 'macOS Sonoma', 'Ubuntu 22.04'],
        ports: [
            { port: 135, service: 'RPC', protocol: 'TCP', state: 'open' },
            { port: 445, service: 'SMB', protocol: 'TCP', state: 'open' },
            { port: 3389, service: 'RDP', protocol: 'TCP', state: 'filtered' },
        ],
        protocols: ['TCP', 'UDP', 'DNS', 'DHCP', 'HTTP', 'HTTPS'],
        services: [
            { name: 'explorer.exe', cpu: 2, memory: 150 },
            { name: 'chrome.exe', cpu: 15, memory: 800 },
            { name: 'svchost.exe', cpu: 1, memory: 50 },
            { name: 'Defender', cpu: 3, memory: 200 },
        ],
        education: {
            description: 'A Personal Computer (PC) is an end-user device that connects to the network to access resources, run applications, and communicate with other systems.',
            importance: 'PCs are primary targets for attacks because they contain user credentials, sensitive data, and provide entry points into corporate networks.',
            realWorldExamples: [
                'Employee workstations in an office environment',
                'Remote worker laptops connecting via VPN',
                'Developer machines with elevated privileges',
            ],
            commonAttacks: ['Phishing', 'Ransomware', 'Keyloggers', 'Drive-by Downloads', 'Social Engineering'],
            commonDefenses: ['Antivirus', 'EDR', 'Patch Management', 'User Training', 'MFA'],
        },
    },

    Router: {
        roles: ['Core Router', 'Edge Router', 'Access Router', 'Default Gateway'],
        os: ['Cisco IOS 17.3', 'Juniper Junos 22.4', 'RouterOS 7.8', 'OPNsense 23.7'],
        ports: [
            { port: 22, service: 'SSH', protocol: 'TCP', state: 'open' },
            { port: 23, service: 'Telnet', protocol: 'TCP', state: 'filtered' },
            { port: 80, service: 'HTTP', protocol: 'TCP', state: 'open' },
            { port: 443, service: 'HTTPS', protocol: 'TCP', state: 'open' },
            { port: 161, service: 'SNMP', protocol: 'UDP', state: 'open' },
        ],
        protocols: ['BGP', 'OSPF', 'RIP', 'NAT', 'DHCP', 'ARP'],
        services: [
            { name: 'routing-engine', cpu: 8, memory: 256 },
            { name: 'dhcpd', cpu: 2, memory: 64 },
            { name: 'nat-engine', cpu: 5, memory: 128 },
            { name: 'snmpd', cpu: 1, memory: 32 },
        ],
        education: {
            description: 'A router forwards data packets between networks, determining the best path for traffic to travel from source to destination.',
            importance: 'Routers are critical infrastructure components. Compromised routers can intercept all traffic, redirect users to malicious sites, or take down entire network segments.',
            realWorldExamples: [
                'Home WiFi routers connecting to ISP',
                'Enterprise core routers handling inter-VLAN traffic',
                'BGP routers managing internet routing tables',
            ],
            commonAttacks: ['Route Hijacking', 'ARP Spoofing', 'Default Credential Exploitation', 'DDoS Amplification'],
            commonDefenses: ['ACLs', 'Route Filtering', 'SSH Only', 'Firmware Updates', 'SNMP v3'],
        },
    },

    Firewall: {
        roles: ['Perimeter Firewall', 'Internal Firewall', 'WAF', 'Next-Gen Firewall'],
        os: ['Palo Alto PAN-OS 11', 'Fortinet FortiOS 7.4', 'pfSense 2.7', 'Checkpoint R81'],
        ports: [
            { port: 443, service: 'Management', protocol: 'TCP', state: 'open' },
            { port: 22, service: 'SSH', protocol: 'TCP', state: 'filtered' },
        ],
        protocols: ['TCP', 'UDP', 'ICMP', 'IPS', 'SSL-Inspection'],
        services: [
            { name: 'fw-daemon', cpu: 25, memory: 1024 },
            { name: 'ips-engine', cpu: 15, memory: 512 },
            { name: 'logging-agent', cpu: 5, memory: 256 },
            { name: 'ssl-proxy', cpu: 10, memory: 384 },
        ],
        education: {
            description: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between trusted and untrusted networks.',
            importance: 'Firewalls are the first line of defense. They block unauthorized access, filter malicious traffic, and log security events for analysis.',
            realWorldExamples: [
                'Corporate perimeter firewalls blocking internet threats',
                'Cloud security groups controlling VM access',
                'Host-based firewalls on each endpoint',
            ],
            commonAttacks: ['Firewall Bypass', 'Rule Exploitation', 'Fragmentation Attacks', 'Tunneling'],
            commonDefenses: ['Regular Rule Audits', 'Deny-by-Default', 'IPS Signatures', 'Geo-blocking'],
        },
    },

    Server: {
        roles: ['Web Server', 'Database Server', 'File Server', 'Application Server'],
        os: ['Ubuntu Server 22.04', 'Windows Server 2022', 'CentOS 8', 'Debian 12'],
        ports: [
            { port: 22, service: 'SSH', protocol: 'TCP', state: 'open' },
            { port: 80, service: 'HTTP', protocol: 'TCP', state: 'open' },
            { port: 443, service: 'HTTPS', protocol: 'TCP', state: 'open' },
            { port: 3306, service: 'MySQL', protocol: 'TCP', state: 'filtered' },
            { port: 5432, service: 'PostgreSQL', protocol: 'TCP', state: 'filtered' },
        ],
        protocols: ['HTTP', 'HTTPS', 'SSH', 'TCP', 'TLS'],
        services: [
            { name: 'nginx', cpu: 8, memory: 512 },
            { name: 'mysql', cpu: 20, memory: 2048 },
            { name: 'node', cpu: 12, memory: 768 },
            { name: 'sshd', cpu: 1, memory: 32 },
        ],
        education: {
            description: 'A server is a computer designed to process requests and deliver data to other computers over a network. Servers host applications, websites, databases, and files.',
            importance: 'Servers are high-value targets containing business-critical data and services. A compromised server can lead to data breaches, service outages, and lateral movement.',
            realWorldExamples: [
                'E-commerce web servers handling transactions',
                'Database servers storing customer information',
                'File servers hosting corporate documents',
            ],
            commonAttacks: ['SQL Injection', 'Remote Code Execution', 'Privilege Escalation', 'Data Exfiltration'],
            commonDefenses: ['Hardening', 'Patching', 'WAF', 'Database Encryption', 'Least Privilege'],
        },
    },

    DNS: {
        roles: ['Primary DNS', 'Secondary DNS', 'Recursive Resolver', 'Authoritative Server'],
        os: ['BIND 9.18', 'Unbound 1.17', 'Windows DNS', 'PowerDNS 4.8'],
        ports: [
            { port: 53, service: 'DNS', protocol: 'UDP', state: 'open' },
            { port: 53, service: 'DNS', protocol: 'TCP', state: 'open' },
            { port: 953, service: 'RNDC', protocol: 'TCP', state: 'filtered' },
        ],
        protocols: ['DNS', 'DoH', 'DoT', 'DNSSEC'],
        services: [
            { name: 'named', cpu: 5, memory: 256 },
            { name: 'dnscrypt-proxy', cpu: 2, memory: 64 },
        ],
        education: {
            description: 'DNS (Domain Name System) servers translate human-readable domain names into IP addresses, acting as the internet\'s phonebook.',
            importance: 'DNS is critical infrastructure. DNS attacks can redirect users to malicious sites, block access to services, or enable man-in-the-middle attacks.',
            realWorldExamples: [
                'Cloudflare 1.1.1.1 public resolver',
                'Corporate internal DNS servers',
                'Google 8.8.8.8 public DNS',
            ],
            commonAttacks: ['DNS Spoofing', 'DNS Amplification DDoS', 'DNS Tunneling', 'Cache Poisoning'],
            commonDefenses: ['DNSSEC', 'DNS over HTTPS', 'Rate Limiting', 'Response Policy Zones'],
        },
    },

    Attacker: {
        roles: ['External Attacker', 'Insider Threat', 'APT Actor', 'Script Kiddie'],
        os: ['Kali Linux 2023.4', 'Parrot OS 5.3', 'BlackArch', 'Custom'],
        ports: [],
        protocols: ['Any'],
        services: [
            { name: 'metasploit', cpu: 30, memory: 1024 },
            { name: 'nmap', cpu: 45, memory: 256 },
            { name: 'burpsuite', cpu: 20, memory: 512 },
        ],
        education: {
            description: 'An attacker is a malicious actor attempting to compromise systems, steal data, or disrupt services. This can be an external hacker or a malicious insider.',
            importance: 'Understanding attacker behavior helps defenders recognize attack patterns, build better defenses, and respond quickly to incidents.',
            realWorldExamples: [
                'Ransomware groups like LockBit',
                'Nation-state APT groups',
                'Hacktivists targeting organizations',
            ],
            commonAttacks: ['All attack types'],
            commonDefenses: ['Defense in depth', 'Zero Trust', 'Threat Intelligence', 'Incident Response'],
        },
    },

    Cloud: {
        roles: ['Cloud Gateway', 'CDN Edge', 'Cloud Storage', 'SaaS Endpoint'],
        os: ['AWS', 'Azure', 'GCP', 'CloudFlare'],
        ports: [
            { port: 443, service: 'HTTPS', protocol: 'TCP', state: 'open' },
        ],
        protocols: ['HTTPS', 'gRPC', 'WebSocket', 'REST'],
        services: [
            { name: 'cloudflare-worker', cpu: 10, memory: 128 },
            { name: 'cdn-proxy', cpu: 15, memory: 256 },
        ],
        education: {
            description: 'Cloud resources are computing services delivered over the internet, including storage, compute, networking, and applications.',
            importance: 'Cloud security differs from on-premises. Misconfigurations are the leading cause of cloud breaches, and shared responsibility models require understanding.',
            realWorldExamples: [
                'AWS S3 buckets storing application data',
                'Azure Active Directory for identity',
                'CloudFlare CDN protecting websites',
            ],
            commonAttacks: ['Misconfiguration Exploitation', 'Credential Theft', 'API Abuse', 'Container Escape'],
            commonDefenses: ['CSPM', 'IAM Best Practices', 'Encryption', 'Cloud-Native Security Tools'],
        },
    },

    ISP: {
        roles: ['Internet Service Provider', 'Carrier Gateway', 'Peering Point'],
        os: ['Carrier-grade NAT', 'MPLS Core'],
        ports: [],
        protocols: ['BGP', 'MPLS', 'PPPoE'],
        services: [
            { name: 'bgp-daemon', cpu: 5, memory: 512 },
        ],
        education: {
            description: 'An ISP (Internet Service Provider) connects your network to the internet, routing traffic between your local network and the global internet.',
            importance: 'ISPs can see all unencrypted traffic. They are targets for surveillance, traffic interception, and large-scale DDoS attacks.',
            realWorldExamples: [
                'Comcast, AT&T, Verizon in the US',
                'BT, Virgin Media in the UK',
                'Tier 1 carriers like Level3',
            ],
            commonAttacks: ['BGP Hijacking', 'Traffic Interception', 'DNS Manipulation'],
            commonDefenses: ['Encryption', 'VPN', 'RPKI', 'BGP Security'],
        },
    },
};

// ============================================================================
// GENERATOR FUNCTION
// ============================================================================

export function generateDeviceData(
    id: string,
    name: string,
    type: string,
    ip: string,
    status: DeviceStatus = 'online',
    health: number = 100
): DeviceData {
    const config = DEVICE_CONFIGS[type] || DEVICE_CONFIGS.PC;

    const metrics: DeviceMetrics = {
        cpu: generateCPUHistory(),
        cpuCurrent: randomInt(5, 85),
        memory: randomInt(30, 80),
        memoryUsed: randomInt(512, 8192),
        memoryTotal: 16384,
        networkIn: randomInt(1000, 500000),
        networkOut: randomInt(500, 200000),
        packetRate: randomInt(10, 500),
        activeConnections: randomInt(1, 50),
        errorRate: randomFloat(0, 2),
    };

    const network: DeviceNetwork = {
        openPorts: config.ports,
        activeProtocols: config.protocols,
        routingTable: [
            { destination: '0.0.0.0/0', gateway: '192.168.1.1', interface: 'eth0', metric: 100 },
            { destination: '192.168.1.0/24', gateway: '0.0.0.0', interface: 'eth0', metric: 0 },
        ],
        arpTable: [
            { ip: '192.168.1.1', mac: generateMAC(), interface: 'eth0', type: 'dynamic' },
            { ip: '192.168.1.254', mac: generateMAC(), interface: 'eth0', type: 'dynamic' },
        ],
        dnsCache: [
            { domain: 'google.com', ip: '142.250.185.46', ttl: 300, type: 'A' },
            { domain: 'cloudflare.com', ip: '104.16.132.229', ttl: 3600, type: 'A' },
        ],
        dhcpStatus: randomItem(['active', 'static', 'active']),
        dhcpLease: randomInt(3600, 86400),
    };

    const security: DeviceSecurity = {
        currentThreats: status === 'under_attack' ? [
            { id: 't1', name: 'Brute Force Attempt', type: 'Authentication', severity: 'high', timestamp: Date.now() },
        ] : [],
        attackHistory: [
            { id: 'ah1', attackType: 'Port Scan', timestamp: Date.now() - 86400000, duration: 30, blocked: true, source: '45.33.32.156' },
        ],
        vulnerabilities: type === 'Server' ? [
            { id: 'v1', cve: 'CVE-2023-1234', name: 'OpenSSL Buffer Overflow', severity: 'medium', exploitable: false, patched: true },
        ] : [],
        firewallRules: [
            { id: 'r1', action: 'deny', direction: 'inbound', protocol: 'TCP', port: 23 },
            { id: 'r2', action: 'allow', direction: 'outbound', protocol: 'TCP', port: 443 },
        ],
        idsAlerts: [],
        quarantineStatus: status === 'isolated',
        lastScan: Date.now() - randomInt(3600000, 86400000),
    };

    const processes: DeviceProcesses = {
        services: config.services.map((s, i) => ({
            pid: 1000 + i,
            name: s.name,
            cpu: s.cpu + randomInt(-2, 5),
            memory: s.memory + randomInt(-50, 100),
            network: true,
            status: 'running',
        })),
        networkProcesses: config.services.filter((_, i) => i < 2).map((s, i) => ({
            pid: 2000 + i,
            name: s.name,
            cpu: randomInt(1, 10),
            memory: randomInt(50, 200),
            network: true,
            status: 'running',
        })),
        maliciousProcesses: status === 'compromised' ? [
            { pid: 9999, name: 'backdoor.exe', cpu: 5, memory: 64, network: true, status: 'running', malicious: true },
        ] : [],
    };

    return {
        id,
        name,
        type,
        status,
        ip,
        health,
        role: randomItem(config.roles),
        mac: generateMAC(),
        subnet: '255.255.255.0',
        gateway: '192.168.1.1',
        uptime: randomInt(3600, 2592000),
        os: randomItem(config.os),
        securityLevel: status === 'under_attack' ? 'low' : status === 'compromised' ? 'critical' : randomItem(['medium', 'high', 'high']),
        metrics,
        network,
        security,
        processes,
        education: config.education,
    };
}

// Quick data for tooltip only
export function generateTooltipData(
    id: string,
    name: string,
    type: string,
    ip: string,
    status: DeviceStatus = 'online',
    health: number = 100
) {
    return {
        id,
        name,
        type,
        status,
        ip,
        health,
        role: DEVICE_CONFIGS[type]?.roles[0] || 'Unknown',
    };
}
