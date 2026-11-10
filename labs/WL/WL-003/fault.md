# Intentional Fault

## Symptom
Guests connect to 'Guest-WiFi' and see 'connected' status but get APIPA addresses (169.254.x.x). Corporate SSID on the same AP works fine and clients get 10.10.10.x addresses. [RED HERRING: DHCP pool for VLAN 99 exists and is correctly configured on R1.]

## Expected Fault
The trunk port Fa0/24 on SW1 (connecting to the AP) only allows VLANs 1 and 10 — VLAN 99 (Guest) is not in the allowed list. Guest-WiFi DHCP DISCOVERs tagged for VLAN 99 are dropped at the switch. The correctly configured DHCP pool on R1 is a red herring.
