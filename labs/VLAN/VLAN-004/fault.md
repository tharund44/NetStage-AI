# Intentional Fault

## Symptom
PC on Fa0/10 of SW2 has no network connectivity at all — link light is green, PC shows 'cable connected' but gets an APIPA address.

## Expected Fault
VLAN 40 has not been created on SW2 (it does not appear in show vlan brief), so the port is assigned to a non-existent VLAN and all traffic is dropped.
