# Intentional Fault

## Symptom
PCs on VLAN 40 (10.10.40.0/24) receive APIPA addresses. PCs on VLAN 10 on the same switch get DHCP addresses from R1 immediately.

## Expected Fault
The ip helper-address command is missing on MLS1's SVI Vlan40 interface. DHCP broadcast DISCOVERs from VLAN 40 clients are not relayed to the DHCP server (R1) on the remote subnet. VLAN 10 works because it is on the same subnet as R1.
