# Intentional Fault

## Symptom
PC3 in Accounting (Fa0/5 on SW1) cannot reach the file server on Fa0/20; all other Accounting PCs on the same switch communicate normally.

## Expected Fault
Port Fa0/5 is assigned to VLAN 30 (Marketing) instead of VLAN 20 (Accounting), so PC3 is in the wrong broadcast domain and cannot reach VLAN 20 resources.
