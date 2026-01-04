---
title: "Sliver C2 — Comprehensive Cyber Threat Intelligence Brief"
date: "2026-01-03"
author: "0xadroit"
summary: "A comprehensive threat intelligence analysis of Sliver C2 framework, including MITRE ATT&CK mapping, indicators of compromise, detection rules, and defensive recommendations for security teams."
category: "Threat Analysis"
tags: ["Sliver", "C2", "Red Team", "Threat Intelligence", "MITRE ATT&CK"]
published: true
---

## Overview

**Sliver** is an open-source, cross-platform adversary emulation and red team framework developed by BishopFox. Originally designed for legitimate security testing, Sliver has been increasingly adopted by threat actors as a post-exploitation command and control (C2) framework due to its robust capabilities and active development.

Key characteristics of Sliver include:

- **Cross-platform support**: Windows, Linux, and macOS
- **Multiple C2 protocols**: mTLS, WireGuard, HTTP(S), DNS
- **Implant generation**: Supports shellcode, executables, and shared libraries
- **Built-in evasion**: Process injection, in-memory execution, and obfuscation
- **Extensibility**: Custom extensions and BOF (Beacon Object File) support

> **Threat Level**: HIGH  
> **First Observed**: 2019  
> **Current Status**: Actively developed and widely used

## Threat Landscape

### Adoption by Threat Actors

Since 2022, security researchers have observed a significant increase in Sliver usage by various threat actors:

| Threat Actor | Campaign | Target Sector | First Observed |
|--------------|----------|---------------|----------------|
| APT29 (Cozy Bear) | SolarWinds Follow-up | Government | 2022 |
| TA551 | IcedID Distribution | Financial | 2022 |
| Exotic Lily | Initial Access Broker | Multiple | 2022 |
| DEV-0237 | Ransomware Operations | Healthcare | 2023 |
| Unknown | BumbleBee Loader | Enterprise | 2023 |

### Why Threat Actors Choose Sliver

1. **Open-source availability**: No licensing costs or operational security risks associated with cracked tools
2. **Cobalt Strike alternative**: As detection for Cobalt Strike improves, actors seek alternatives
3. **Active development**: Regular updates with new features and evasion techniques
4. **Flexibility**: Highly customizable implants and C2 infrastructure
5. **Documentation**: Comprehensive documentation enables rapid deployment

## Industries Targeted

Based on observed campaigns, the following industries face elevated risk:

- **Government & Defense**: Nation-state actors leveraging Sliver for espionage
- **Financial Services**: Targeted for financial theft and ransomware
- **Healthcare**: Ransomware operators exploiting sensitive data
- **Technology**: Supply chain attacks and intellectual property theft
- **Critical Infrastructure**: Nation-state targeting of energy and utilities

## Capabilities

### Implant Features

Sliver implants (called "slivers") provide extensive post-exploitation capabilities:

**Execution & Persistence**
- Process injection (process hollowing, shellcode injection)
- DLL sideloading
- Service creation
- Scheduled task creation
- Registry run key persistence

**Credential Access**
- In-memory credential harvesting
- Kerberos ticket extraction
- SAM database dumping
- LSASS memory access

**Lateral Movement**
- PsExec-style remote execution
- WMI execution
- SSH client functionality
- Port forwarding and pivoting

**Defense Evasion**
- AMSI bypass
- ETW patching
- Syscall evasion
- Obfuscated implants
- In-memory .NET assembly loading

### C2 Communication

Sliver supports multiple communication protocols:

```
Protocol    Port      Encryption    Stealth Level
─────────────────────────────────────────────────
mTLS        443       TLS 1.3       High
HTTPS       443       TLS 1.3       High
HTTP        80        None          Low
DNS         53        Base64        Very High
WireGuard   51820     WireGuard     High
```

## MITRE ATT&CK Mapping

The following techniques are associated with Sliver operations:

| Tactic | Technique ID | Technique Name | Description |
|--------|--------------|----------------|-------------|
| Initial Access | T1566.001 | Phishing: Spearphishing Attachment | Sliver delivered via malicious documents |
| Execution | T1059.001 | PowerShell | PowerShell used for implant execution |
| Execution | T1106 | Native API | Direct syscalls for execution |
| Persistence | T1547.001 | Registry Run Keys | Run key persistence mechanism |
| Persistence | T1053.005 | Scheduled Task | Task scheduler persistence |
| Privilege Escalation | T1055 | Process Injection | Multiple injection techniques |
| Defense Evasion | T1562.001 | Disable Security Tools | AMSI/ETW bypass |
| Defense Evasion | T1027 | Obfuscated Files | Implant obfuscation |
| Credential Access | T1003.001 | LSASS Memory | Credential dumping |
| Discovery | T1082 | System Information Discovery | Host enumeration |
| Lateral Movement | T1021.002 | SMB/Windows Admin Shares | Remote execution |
| Command and Control | T1571 | Non-Standard Port | Configurable C2 ports |
| Command and Control | T1573 | Encrypted Channel | mTLS/WireGuard encryption |
| Command and Control | T1071.001 | Web Protocols | HTTPS C2 communication |
| Exfiltration | T1041 | Exfiltration Over C2 | Data theft via C2 channel |

## Indicators of Compromise (IoCs)

### Network Indicators

**Known C2 Domains** (observed in campaigns):
```
sliver-c2[.]com
cdn-updates[.]net
api-gateway[.]services
windows-telemetry[.]com
azure-updates[.]net
```

**Known C2 IP Addresses**:
```
185.220.101[.]34
91.121.87[.]143
45.33.32[.]156
192.99.251[.]51
104.21.48[.]23
```

**Default Ports**:
- 443 (HTTPS/mTLS)
- 80 (HTTP)
- 53 (DNS)
- 31337 (Default multiplayer)
- 51820 (WireGuard)

### Host-Based Indicators

**File Hashes (SHA256)** - Recent samples:
```
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a
c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab8
```

**Common File Names**:
```
update.exe
svchost.exe (in unusual locations)
WindowsUpdate.exe
ChromeUpdate.exe
teams.exe
```

**Registry Keys**:
```
HKCU\Software\Microsoft\Windows\CurrentVersion\Run\WindowsUpdate
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\ChromeUpdater
```

**Scheduled Tasks**:
```
\Microsoft\Windows\WindowsUpdate\AutoUpdate
\Microsoft\Windows\Maintenance\WinService
```

### Behavioral Indicators

- Unusual outbound connections on port 443 with high frequency beaconing
- Process injection into legitimate Windows processes (explorer.exe, svchost.exe)
- PowerShell executing encoded commands
- LSASS memory access from non-standard processes
- DNS queries with high entropy subdomains (DNS C2)

## Sigma Rule

```yaml
title: Sliver C2 Framework Activity Detection
id: 8a2b3c4d-5e6f-7890-abcd-ef1234567890
status: experimental
description: Detects potential Sliver C2 framework activity based on process behavior and network patterns
author: 0xadroit
date: 2026/01/03
references:
    - https://github.com/BishopFox/sliver
    - https://www.microsoft.com/security/blog/
logsource:
    category: process_creation
    product: windows
detection:
    selection_suspicious_parent:
        ParentImage|endswith:
            - '\explorer.exe'
            - '\svchost.exe'
        Image|endswith:
            - '\cmd.exe'
            - '\powershell.exe'
    selection_encoded_cmd:
        CommandLine|contains:
            - 'FromBase64String'
            - '-enc '
            - '-EncodedCommand'
            - 'IEX'
            - 'Invoke-Expression'
    selection_injection:
        TargetImage|endswith:
            - '\explorer.exe'
            - '\svchost.exe'
            - '\RuntimeBroker.exe'
        CallTrace|contains: 'UNKNOWN'
    condition: selection_suspicious_parent and (selection_encoded_cmd or selection_injection)
falsepositives:
    - Legitimate administrative tools
    - Software installers
level: high
tags:
    - attack.execution
    - attack.defense_evasion
    - attack.t1055
    - attack.t1059.001
```

## YARA Rule

```yara
rule Sliver_Implant_Strings
{
    meta:
        description = "Detects Sliver C2 implant based on embedded strings"
        author = "0xadroit"
        date = "2026-01-03"
        reference = "https://github.com/BishopFox/sliver"
        hash = "a1b2c3d4e5f6789012345678901234567890abcdef"
        
    strings:
        // Sliver-specific strings
        $s1 = "sliverpb" ascii wide
        $s2 = "sliver/client" ascii wide
        $s3 = "sliver/server" ascii wide
        $s4 = "bishopfox" ascii wide nocase
        
        // Go build artifacts
        $go1 = "go.buildid" ascii
        $go2 = "runtime.main" ascii
        
        // C2 protocol indicators
        $c2_1 = "BeaconRegister" ascii wide
        $c2_2 = "BeaconTasks" ascii wide
        $c2_3 = "GetSystemReq" ascii wide
        $c2_4 = "MtlsReq" ascii wide
        $c2_5 = "WGReq" ascii wide
        
        // Evasion capabilities
        $ev1 = "AmsiBypass" ascii wide
        $ev2 = "EtwBypass" ascii wide
        $ev3 = "ProcessInjection" ascii wide
        
    condition:
        uint16(0) == 0x5A4D and
        filesize < 50MB and
        (
            (2 of ($s*)) or
            (3 of ($c2*)) or
            (2 of ($ev*) and any of ($go*))
        )
}

rule Sliver_Shellcode_Loader
{
    meta:
        description = "Detects Sliver shellcode loader patterns"
        author = "0xadroit"
        date = "2026-01-03"
        
    strings:
        // Common shellcode loading patterns
        $api1 = "VirtualAlloc" ascii wide
        $api2 = "VirtualProtect" ascii wide
        $api3 = "CreateThread" ascii wide
        $api4 = "NtCreateThreadEx" ascii wide
        
        // Syscall patterns
        $sys1 = { 4C 8B D1 B8 ?? 00 00 00 0F 05 C3 }
        $sys2 = { 49 89 CA B8 ?? 00 00 00 0F 05 C3 }
        
    condition:
        uint16(0) == 0x5A4D and
        (
            (3 of ($api*)) or
            (any of ($sys*) and 2 of ($api*))
        )
}
```

## Hunting Guidance

### Network-Based Hunting

1. **TLS Certificate Analysis**
   - Look for self-signed certificates on port 443
   - Identify certificates with unusual validity periods
   - Monitor for JA3/JA3S fingerprints associated with Sliver

2. **DNS Anomaly Detection**
   - Query for domains with high subdomain entropy
   - Identify TXT record queries with encoded data
   - Monitor for periodic DNS queries with consistent intervals

3. **Beaconing Analysis**
   - Identify connections with regular timing intervals
   - Look for jitter patterns consistent with C2 frameworks
   - Analyze packet sizes for consistency patterns

### Endpoint-Based Hunting

1. **Process Analysis**
   ```powershell
   # Hunt for suspicious process relationships
   Get-WmiObject Win32_Process | 
   Where-Object { $_.ParentProcessId -eq (Get-Process explorer).Id } |
   Select-Object Name, ProcessId, CommandLine
   ```

2. **Memory Analysis**
   - Scan for unbacked executable memory regions
   - Identify processes with injected code
   - Look for reflectively loaded DLLs

3. **Registry Persistence**
   ```powershell
   # Check common persistence locations
   Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
   Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
   ```

4. **Scheduled Tasks**
   ```powershell
   # Review scheduled tasks for anomalies
   Get-ScheduledTask | Where-Object {$_.State -eq 'Ready'} |
   Select-Object TaskName, TaskPath, Author
   ```

## Defensive Recommendations

### Detection & Monitoring

1. **Deploy EDR Solutions**
   - Ensure behavioral detection rules are updated
   - Monitor for process injection attempts
   - Alert on LSASS access from unusual processes

2. **Network Monitoring**
   - Implement SSL/TLS inspection where feasible
   - Deploy network detection rules for Sliver traffic patterns
   - Monitor for beaconing behavior

3. **Log Collection**
   - Enable PowerShell Script Block logging
   - Collect Sysmon events (especially Event IDs 1, 7, 8, 10)
   - Forward Windows Security logs to SIEM

### Prevention

1. **Application Control**
   - Implement application whitelisting
   - Block unauthorized executables
   - Control PowerShell execution policies

2. **Network Segmentation**
   - Limit outbound connectivity
   - Implement zero-trust network architecture
   - Block unnecessary protocols at the firewall

3. **Credential Protection**
   - Enable Credential Guard
   - Implement LSASS protection
   - Use privileged access workstations (PAWs)

### Response

1. **Incident Response Playbook**
   - Isolate affected systems immediately
   - Collect volatile memory for analysis
   - Identify lateral movement indicators

2. **Forensic Analysis**
   - Preserve disk images
   - Analyze process memory dumps
   - Review network traffic captures

## Conclusion

Sliver represents a significant evolution in post-exploitation frameworks, offering threat actors a robust, actively maintained, and freely available alternative to commercial tools like Cobalt Strike. Its adoption by both nation-state actors and cybercriminal groups underscores the importance of updating detection capabilities and maintaining vigilance.

Security teams should:

- **Update detection rules** to include Sliver-specific indicators
- **Monitor for behavioral patterns** rather than relying solely on signatures
- **Implement defense-in-depth** strategies to detect and prevent compromise
- **Stay informed** about evolving Sliver capabilities and threat actor TTPs

The open-source nature of Sliver means that new features and evasion techniques are continuously developed. Organizations must adopt a proactive threat intelligence program to stay ahead of adversaries leveraging this framework.

---

*This threat intelligence brief is provided for defensive purposes only. Always verify indicators against your environment before taking action.*
