# Intentional Fault

## Symptom
PCs in VLAN 20 (10.10.20.0/24) cannot reach any resource — not even their own gateway after the first hop. VLAN 10 PCs work normally. An administrator recently added an ACL.

## Expected Fault
ACL 130 only has permit statements for the 10.10.10.0/24 (VLAN 10) source network. There is no permit statement for 10.10.20.0/24 traffic. The implicit deny all at the end of the ACL drops all VLAN 20 traffic. The administrator applied a VLAN 10 ACL to the VLAN 20 interface by mistake.
