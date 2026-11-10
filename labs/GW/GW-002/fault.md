# Intentional Fault

## Symptom
All PCs on VLAN 10 (10.10.10.0/24) can ping each other but cannot reach VLAN 20 or the internet. PCs on VLAN 20 can reach the internet fine.

## Expected Fault
Router subinterface Gi0/0.10 is administratively down (shutdown), so R1 cannot serve as the gateway for VLAN 10. VLAN 20 works because Gi0/0.20 is up/up.
