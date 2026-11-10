# Intentional Fault

## Symptom
PCs on VLAN 10 (10.10.10.0/24) receive IP addresses via DHCP but get addresses in the 10.10.20.x range. They cannot communicate with any other VLAN 10 host or the gateway.

## Expected Fault
DHCP pool VLAN10-POOL is configured with the wrong network statement — 10.10.20.0/24 instead of 10.10.10.0/24. Clients receive addresses from the wrong subnet and cannot communicate on their actual VLAN.
