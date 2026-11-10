# Intentional Fault

## Symptom
PC1 (10.10.10.50/24) can ping PC2 (10.10.10.51/24) on the same subnet but cannot reach the server at 10.10.30.5 or any remote network. Gateway ping from the PC fails.

## Expected Fault
PC1's default gateway is manually set to 10.10.10.2 which does not exist; the correct gateway address is 10.10.10.1 (R1's Gi0/0.10 subinterface).
