# Intentional Fault

## Symptom
PCs on 10.10.10.0/24 (VLAN 10) can reach the internet. PCs on 10.10.20.0/24 (VLAN 20) cannot reach any internet site, though they can reach all internal networks including VLAN 10.

## Expected Fault
NAT access list 10 only permits the 10.10.10.0/24 network. The 10.10.20.0/24 network is not included, so VLAN 20 traffic is never translated and is dropped at the ISP edge.
