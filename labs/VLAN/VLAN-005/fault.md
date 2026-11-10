# Intentional Fault

## Symptom
PC on Fa0/12 of SW1 cannot get a DHCP address and has no connectivity. The link LED is solid green. Other PCs on VLAN 10 work fine. [RED HERRING: an ACL is present on R1 but permits the relevant traffic.]

## Expected Fault
Port Fa0/12 is configured as a trunk port instead of an access port in VLAN 10. The PC cannot interpret 802.1Q-tagged frames and fails to communicate. The ACL on R1 is a red herring — it correctly permits VLAN 10 traffic.
