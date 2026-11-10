# Intentional Fault

## Symptom
Guest wireless clients connected to 'Guest-WiFi' can discover and ping other guest devices. The security policy requires client-to-client isolation on the guest network.

## Expected Fault
Client isolation (peer-to-peer blocking) is not enabled on the Guest-WiFi SSID — the config shows 'no peer-to-peer blocking'. Guest clients can communicate directly with each other, violating the isolation security policy.
