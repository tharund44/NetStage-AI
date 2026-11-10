# Intentional Fault

## Symptom
PCs in VLAN 50 (Engineering) on SW2 cannot reach the Engineering file server in VLAN 50 on SW1, but PCs in VLAN 10 and 20 on SW2 reach their servers on SW1 without issues.

## Expected Fault
VLAN 50 is not in the allowed VLAN list on the trunk port Gi0/1 (only VLANs 1, 10, 20 are allowed), so VLAN 50 traffic cannot cross between SW1 and SW2.
