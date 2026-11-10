# Intentional Fault

## Symptom
PCs in VLAN 30 (10.10.30.0/24) have IP addresses and the correct gateway 10.10.30.1 configured, but cannot ping the gateway or reach any remote network. PCs in VLAN 10 and 20 work perfectly on the same L3 switch.

## Expected Fault
The SVI for VLAN 30 has IP address 10.10.30.2 but the PCs are configured with default gateway 10.10.30.1. No device owns 10.10.30.1 so the gateway is unreachable.
