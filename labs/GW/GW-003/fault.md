# Intentional Fault

## Symptom
PCs with IPs 10.10.20.1 through 10.10.20.14 can ping the gateway and reach remote networks. PCs with IPs above 10.10.20.15 (e.g. 10.10.20.20, .50, .100) can ping each other but cannot ping the gateway 10.10.20.1.

## Expected Fault
R1's Gi0/0.20 subinterface is configured with a /28 subnet mask (255.255.255.240) instead of /24 (255.255.255.0), so only hosts in the 10.10.20.0-10.10.20.15 range are considered local; hosts above .15 are unreachable from the gateway.
