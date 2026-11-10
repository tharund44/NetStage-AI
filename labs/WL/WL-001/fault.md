# Intentional Fault

## Symptom
Guests connecting to the 'Guest-WiFi' SSID are able to browse internal corporate file shares and access sensitive servers on VLAN 10 (Corporate). The security policy requires guest isolation to internet-only access.

## Expected Fault
The 'Guest-WiFi' SSID is mapped to VLAN 10 (Corporate) instead of VLAN 99 (Guest). Guest users are placed directly on the corporate network with full access to internal resources.
