# Intentional Fault

## Symptom
PCs on VLAN 10 get IP addresses via DHCP (10.10.10.x) and can ping other local hosts, but cannot reach any remote network. Pinging the gateway 10.10.10.1 from the PC fails.

## Expected Fault
DHCP pool default-router is set to 10.10.10.254 (no device exists at that address) instead of 10.10.10.1 (R1's actual gateway interface). PCs receive the wrong gateway via DHCP and cannot route off-subnet.
