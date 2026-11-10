# Intentional Fault

## Symptom
PC1 cannot ping the server at 10.10.30.5 — all pings time out. However PC1 can open an HTTP session to 10.10.30.5 in the browser and SSH to it.

## Expected Fault
ACL 140 line 10 explicitly denies all ICMP traffic from VLAN 10 to VLAN 30, blocking ping while allowing TCP (HTTP/SSH) and UDP through subsequent permit rules.
