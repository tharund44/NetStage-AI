# Intentional Fault

## Symptom
PCs in VLAN 10 can ping their gateway (10.10.10.1) and PCs in VLAN 20 can ping their gateway (10.10.20.1), but no PC in VLAN 10 can reach VLAN 20 and vice versa. Both SVIs are up/up. [RED HERRING: A trunk link shows some pruned VLANs that are unrelated.]

## Expected Fault
The 'ip routing' command has not been enabled on the L3 switch (show run confirms 'no ip routing'). Without it, the switch cannot route between VLANs even though both SVIs are up. The pruned VLAN 30 on the trunk is a red herring — it is irrelevant to the inter-VLAN routing failure.
