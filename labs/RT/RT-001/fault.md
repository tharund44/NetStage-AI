# Intentional Fault

## Symptom
PCs on VLAN 10 (10.10.10.0/24) can reach VLAN 20 (10.10.20.0/24) but cannot reach the server farm on 10.10.30.0/24. Traceroute from PC stops at R1.

## Expected Fault
R1 has a static route to 10.10.30.0/24 via R2, but R2 has no return route to 10.10.10.0/24 or 10.10.20.0/24. Packets reach the server farm but replies are dropped by R2 because it has no route back.
