# NetSage AI - Cisco Packet Tracer Troubleshooting Assistant

## Overview
NetSage AI is a tool designed to automatically troubleshoot and grade Cisco Packet Tracer network topologies by combining Large Language Models with a Deterministic Rule Checker.

## Cisco Packet Tracer Integration

NetSage AI provides support for genuine Cisco Packet Tracer (`.pkt`) lab files. We map each of the 36 automated troubleshooting cases to physical Packet Tracer lab topologies.

### Why use `.pkt` files?
While NetSage can process raw Cisco CLI output, providing an actual `.pkt` lab allows users to:
1. Open the broken network.
2. Run diagnostic commands to collect evidence.
3. Validate the AI's diagnosis by applying the fix manually.

### How it works
1. **Lab Storage**: All lab files must be stored in the `labs/<CATEGORY>/<CASE_ID>/` directory.
2. **Detection**: If an actual `<CASE_ID>.pkt` exists inside the case's lab directory, the NetSage dashboard will automatically detect it and display its status as **AVAILABLE**. If it does not exist, the dashboard will show a status of **REQUIRES CREATION** and will still provide the lab specifications (Topology, Configuration, Verification).
3. **Evidence Submission**: Users run `show` commands in Packet Tracer manually, copy the output, and provide it to the NetSage runner.
4. **Applying Fixes**: **NetSage does not automatically modify Cisco Packet Tracer configurations.** Once the AI provides a diagnosis and steps to fix the issue, the user must apply these fixes in Packet Tracer manually.
5. **Verification**: After applying the fix, run the verification commands specified in the `verification.md` file for that specific case to ensure the network issue has been resolved.

### Responsible AI Disclaimer
- AI recommendations are suggestions only. 
- Human review is required before applying network changes. 
- Packet Tracer configuration changes are performed manually by the user.

Always double-check the AI's root cause and proposed CLI commands, and utilize the dashboard's Responsible AI Log.
# NetStage-AI
