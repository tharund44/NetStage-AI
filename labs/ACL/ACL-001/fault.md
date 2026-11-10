# Intentional Fault

## Symptom
PCs on VLAN 10 can ping the web server at 10.10.30.10 but cannot browse to it (HTTP connection times out). All other servers are reachable on all protocols.

## Expected Fault
ACL 101 line 20 explicitly denies TCP port 80 (HTTP) traffic from VLAN 10 to host 10.10.30.10. ICMP is permitted on line 10, which is why ping works. The deny rule should be removed or changed to permit.
