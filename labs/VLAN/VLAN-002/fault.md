# Intentional Fault

## Symptom
All inter-VLAN traffic between SW1 and SW2 works for VLANs 10 and 20, but CDP errors appear in logs and management VLAN frames on the native VLAN are dropped intermittently between the two switches.

## Expected Fault
Native VLAN mismatch on the trunk link between SW1 (native VLAN 1) and SW2 (native VLAN 99) causes untagged frames to be mishandled and management traffic to be dropped.
